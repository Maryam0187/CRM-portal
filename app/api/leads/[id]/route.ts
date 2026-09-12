import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Lead } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = getOrganizationId(req);
    const lead = await Lead.findOne({
      where: { id: params.id, organizationId },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get lead', details: error.message },
      { status: 500 }
    );
  }
}

async function putHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();

    const lead = await Lead.findOne({
      where: { id: params.id, organizationId },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    await lead.update(body);
    return NextResponse.json({ lead });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update lead', details: error.message },
      { status: 500 }
    );
  }
}

async function deleteHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = getOrganizationId(req);
    const lead = await Lead.findOne({
      where: { id: params.id, organizationId },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    await lead.destroy();
    return NextResponse.json({ message: 'Lead deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete lead', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: AuthenticatedRequest,
  context: { params: { id: string } }
) {
  return withAuth((req) => getHandler(req, context))(req);
}

export async function PUT(
  req: AuthenticatedRequest,
  context: { params: { id: string } }
) {
  return withAuth((req) => putHandler(req, context))(req);
}

export async function DELETE(
  req: AuthenticatedRequest,
  context: { params: { id: string } }
) {
  return withAuth((req) => deleteHandler(req, context))(req);
}
export const dynamic = 'force-dynamic';
