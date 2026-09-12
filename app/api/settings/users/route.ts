import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { User } from '@/models';
import { hashPassword } from '@/lib/auth';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    
    const users = await User.findAll({
      where: { organizationId },
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get users', details: error.message },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();
    const { email, password, firstName, lastName, role } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      organizationId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'sales_rep',
    });

    const userWithoutPassword = user.toJSON();
    delete (userWithoutPassword as any).password;

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
export const dynamic = 'force-dynamic';
