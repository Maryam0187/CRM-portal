import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Task } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function putHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();

    const task = await Task.findOne({
      where: { id: params.id, organizationId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    await task.update(body);
    return NextResponse.json({ task });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update task', details: error.message },
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
    const task = await Task.findOne({
      where: { id: params.id, organizationId },
    });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    await task.destroy();
    return NextResponse.json({ message: 'Task deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete task', details: error.message },
      { status: 500 }
    );
  }
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
