import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Task, User, Lead, Deal } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';

async function getHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    
    const tasks = await Task.findAll({
      where: { organizationId },
      include: [
        {
          model: User,
          as: 'assignedTo',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
        {
          model: Lead,
          as: 'lead',
          attributes: ['id', 'firstName', 'lastName', 'company'],
        },
        {
          model: Deal,
          as: 'deal',
          attributes: ['id', 'name', 'value'],
        },
      ],
      order: [['dueDate', 'ASC'], ['createdAt', 'DESC']],
    });

    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to get tasks', details: error.message },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    const body = await req.json();

    const task = await Task.create({
      ...body,
      organizationId,
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error: any) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { error: 'Failed to create task', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
export const dynamic = 'force-dynamic';
