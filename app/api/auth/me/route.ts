import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { User, Business } from '@/models';

export const dynamic = 'force-dynamic';

async function handler(req: AuthenticatedRequest) {
  try {
    const user = await User.findByPk(req.user!.userId, {
      include: [
        {
          model: Business,
          as: 'business',
          attributes: ['id', 'name', 'slug', 'category', 'location'],
        },
      ],
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
