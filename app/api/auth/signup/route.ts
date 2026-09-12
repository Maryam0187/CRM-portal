import { NextRequest, NextResponse } from 'next/server';
import { Organization, User } from '@/models';
import { hashPassword, generateToken } from '@/lib/auth';
import { UserRole } from '@/models/User';
import * as cookie from 'cookie';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, organizationName } = body;

    if (!email || !password || !firstName || !lastName || !organizationName) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    const organization = await Organization.create({
      name: organizationName,
    });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      organizationId: organization.id,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.OWNER,
    });

    const token = generateToken({
      userId: user.id,
      organizationId: user.organizationId,
      email: user.email,
      role: user.role,
    });

    const cookieStr = cookie.stringifySetCookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
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
        organizationId: user.organizationId,
      },
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
