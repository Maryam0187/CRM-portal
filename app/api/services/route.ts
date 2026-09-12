import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import db from '@/lib/db';
import Service from '@/models/Service';

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

    const services = await Service.findAll({
      where: { businessId: payload.businessId },
      order: [['createdAt', 'DESC']]
    });

    return NextResponse.json({ services });
  } catch (error: any) {
    console.error('Services GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
    const { name, description, duration, price, active } = body;

    if (!name || !duration || price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const service = await Service.create({
      businessId: payload.businessId,
      name,
      description: description || null,
      duration: parseInt(duration),
      price: parseFloat(price),
      active: active !== undefined ? active : true
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error: any) {
    console.error('Services POST error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
