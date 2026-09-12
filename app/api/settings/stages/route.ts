import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { DealStage } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    
    const stages = await DealStage.findAll({
      where: { organizationId },
      order: [['order', 'ASC']],
    });

    return NextResponse.json({ stages });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get stages', details: error.message },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();

    const stage = await DealStage.create({
      ...body,
      organizationId,
    });

    return NextResponse.json({ stage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create stage', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
export const dynamic = 'force-dynamic';
