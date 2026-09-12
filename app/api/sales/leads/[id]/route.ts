import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import { Lead } from '@/models';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const cookies = parseCookie(req.headers.get('cookie') || '');
  const token = cookies.token || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const lead = await Lead.findOne({
      where: {
        id: parseInt(id),
        businessId: payload!.businessId,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, company, title, source, notes, status } = body;

    await lead.update({
      firstName: firstName || lead.firstName,
      lastName: lastName || lead.lastName,
      email: email !== undefined ? email : lead.email,
      phone: phone !== undefined ? phone : lead.phone,
      company: company !== undefined ? company : lead.company,
      title: title !== undefined ? title : lead.title,
      source: source !== undefined ? source : lead.source,
      notes: notes !== undefined ? notes : lead.notes,
      status: status || lead.status,
    });

    return NextResponse.json({ lead });
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const cookies = parseCookie(req.headers.get('cookie') || '');
  const token = cookies.token || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const lead = await Lead.findOne({
      where: {
        id: parseInt(id),
        businessId: payload.businessId,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    await lead.destroy();

    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
