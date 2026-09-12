import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Deal, DealStage, User, Contact } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = getOrganizationId(req);
    const deal = await Deal.findOne({
      where: { id: params.id, organizationId },
      include: [
        { model: DealStage, as: 'stage' },
        { model: User, as: 'owner', attributes: { exclude: ['password'] } },
        { model: Contact, as: 'contact' },
      ],
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    return NextResponse.json({ deal });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get deal', details: error.message },
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

    const deal = await Deal.findOne({
      where: { id: params.id, organizationId },
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    await deal.update(body);
    return NextResponse.json({ deal });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update deal', details: error.message },
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
    const deal = await Deal.findOne({
      where: { id: params.id, organizationId },
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    await deal.destroy();
    return NextResponse.json({ message: 'Deal deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete deal', details: error.message },
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
