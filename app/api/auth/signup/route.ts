import { NextRequest, NextResponse } from 'next/server';
import { Business, User } from '@/models';
import { hashPassword, generateToken } from '@/lib/auth';
import { UserRole } from '@/models/User';
import { BusinessCategory } from '@/models/Business';
import * as cookie from 'cookie';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      email, 
      password, 
      firstName, 
      lastName,
      businessName,
      plan = 'free',
      enableBookings = true,
      enableSales = false
    } = body;

    if (!email || !password || !firstName || !lastName || !businessName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!enableBookings && !enableSales) {
      return NextResponse.json(
        { error: 'At least one module must be enabled' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create business with selected modules
    const business = await Business.create({
      name: businessName,
      slug: `temp-${Date.now()}`,
      category: BusinessCategory.SALON,
      location: 'Global',
      currency: 'USD',
      plan: plan || 'free',
      enableBookings,
      enableSales,
    });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      businessId: business.id,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.OWNER,
    });

    const token = generateToken({
      userId: user.id,
      businessId: user.businessId,
      email: user.email,
      role: user.role,
    });

    const cookieStr = cookie.stringifySetCookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    const response = NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        businessId: user.businessId,
      },
      business: {
        id: business.id,
        name: business.name,
        enableBookings,
        enableSales,
      },
      needsOnboarding: enableBookings,
    }, { status: 201 });

    response.headers.set('Set-Cookie', cookieStr);
    return response;
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}
