import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Contact } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = getOrganizationId(req);
    const contact = await Contact.findOne({
      where: { id: params.id, organizationId },
    });

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ contact });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get contact', details: error.message },
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

    const contact = await Contact.findOne({
      where: { id: params.id, organizationId },
    });

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    await contact.update(body);
    return NextResponse.json({ contact });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update contact', details: error.message },
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
    const contact = await Contact.findOne({
      where: { id: params.id, organizationId },
    });

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    await contact.destroy();
    return NextResponse.json({ message: 'Contact deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete contact', details: error.message },
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
