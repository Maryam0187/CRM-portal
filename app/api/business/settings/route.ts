import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import db from '@/lib/db';
import Business from '@/models/Business';

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parseCookie(cookieHeader);
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const business = await Business.findByPk(payload.businessId);
    
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    return NextResponse.json({ business });
  } catch (error: any) {
    console.error('Business settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parseCookie(cookieHeader);
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, currency, location } = body;

    const business = await Business.findByPk(payload.businessId);
    
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    await business.update({
      name: name || business.name,
      currency: currency || business.currency,
      location: location !== undefined ? location : business.location
    });

    return NextResponse.json({ business });
  } catch (error: any) {
    console.error('Business settings PUT error:', error);
    return NextResponse.json({ error: 'Failed to update business' }, { status: 500 });
  }
}
