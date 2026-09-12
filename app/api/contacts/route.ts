import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Contact } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    
    const contacts = await Contact.findAll({
      where: { organizationId },
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ contacts });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { error: 'Failed to get contacts', details: error.message },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();

    const contact = await Contact.create({
      ...body,
      organizationId,
    });

    return NextResponse.json({ contact }, { status: 201 });
  } catch (error: any) {
    console.error('Create contact error:', error);
    return NextResponse.json(
      { error: 'Failed to create contact', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
export const dynamic = 'force-dynamic';
