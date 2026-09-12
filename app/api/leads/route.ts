import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Lead, User } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    
    const leads = await Lead.findAll({
      where: { organizationId },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ leads });
  } catch (error: any) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { error: 'Failed to get leads', details: error.message },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();

    const lead = await Lead.create({
      ...body,
      organizationId,
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error: any) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { error: 'Failed to create lead', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
export const dynamic = 'force-dynamic';
