import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Deal, DealStage, User, Contact, Lead } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    
    const deals = await Deal.findAll({
      where: { organizationId },
      include: [
        {
          model: DealStage,
          as: 'stage',
          attributes: ['id', 'name', 'color', 'order'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model: Contact,
          as: 'contact',
          attributes: ['id', 'firstName', 'lastName', 'email', 'company'],
        },
        {
          model: Lead,
          as: 'lead',
          attributes: ['id', 'firstName', 'lastName', 'email', 'company'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ deals });
  } catch (error: any) {
    console.error('Get deals error:', error);
    return NextResponse.json(
      { error: 'Failed to get deals', details: error.message },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();

    const deal = await Deal.create({
      ...body,
      organizationId,
    });

    return NextResponse.json({ deal }, { status: 201 });
  } catch (error: any) {
    console.error('Create deal error:', error);
    return NextResponse.json(
      { error: 'Failed to create deal', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
export const dynamic = 'force-dynamic';
