import { NextRequest, NextResponse } from 'next/server';
import { User, Business } from '@/models';
import { comparePassword, generateToken } from '@/lib/auth';
import * as cookie from 'cookie';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ 
      where: { email },
      include: [{
        model: Business,
        as: 'business',
        attributes: ['slug'],
      }],
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

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
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        businessId: user.businessId,
      },
    });

    response.headers.set('Set-Cookie', cookieStr);
    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login', details: error.message },
      { status: 500 }
    );
  }
}
