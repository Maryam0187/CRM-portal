import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import { Lead } from '@/models';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const cookies = parseCookie(req.headers.get('cookie') || '');
  const token = cookies.token || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const leads = await Lead.findAll({
      where: { businessId: payload.businessId },
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ leads });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookies = parseCookie(req.headers.get('cookie') || '');
  const token = cookies.token || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, company, title, source, notes } = body;

    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'First name and last name are required' }, { status: 400 });
    }

    const lead = await Lead.create({
      businessId: payload.businessId,
      ownerId: payload.userId,
      firstName,
      lastName,
      email: email || null,
      phone: phone || null,
      company: company || null,
      title: title || null,
      source: source || null,
      notes: notes || null,
      status: 'new',
    } as any);

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
