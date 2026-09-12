import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import { Task } from '@/models';

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
    const tasks = await Task.findAll({
      where: { businessId: payload.businessId },
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
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
    const { title, description, dueDate, priority } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const task = await Task.create({
      businessId: payload.businessId,
      assignedTo: payload.userId,
      title,
      description: description || null,
      dueDate: dueDate || null,
      priority: priority || 'medium',
      status: 'pending',
      relatedTo: null,
      relatedType: null,
    } as any);

    return NextResponse.json({ task }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
