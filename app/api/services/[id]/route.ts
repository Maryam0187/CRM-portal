import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import db from '@/lib/db';
import Service from '@/models/Service';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const service = await Service.findOne({
      where: {
        id: params.id,
        businessId: payload.businessId
      }
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    await service.update({
      name: name || service.name,
      description: description !== undefined ? description : service.description,
      duration: duration !== undefined ? parseInt(duration) : service.duration,
      price: price !== undefined ? parseFloat(price) : service.price,
      active: active !== undefined ? active : service.active
    });

    return NextResponse.json({ service });
  } catch (error: any) {
    console.error('Services PUT error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const service = await Service.findOne({
      where: {
        id: params.id,
        businessId: payload.businessId
      }
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    await service.destroy();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Services DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
