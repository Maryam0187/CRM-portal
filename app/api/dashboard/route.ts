import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Deal, Lead, Task, DealStage } from '@/models';
import { getOrganizationId } from '@/middleware/tenant';
import { Op } from 'sequelize';
import sequelize from '@/lib/db';

async function getHandler(req: AuthenticatedRequest) {
  try {
    const organizationId = getOrganizationId(req);
    
    const totalPipelineValue = await Deal.sum('value', {
      where: {
        organizationId,
        stageId: {
          [Op.notIn]: await DealStage.findAll({
            where: { organizationId, name: ['Won', 'Lost'] },
            attributes: ['id'],
          }).then(stages => stages.map(s => s.id)),
        },
      },
    }) || 0;

    const openDeals = await Deal.count({
      where: {
        organizationId,
        stageId: {
          [Op.notIn]: await DealStage.findAll({
            where: { organizationId, name: ['Won', 'Lost'] },
            attributes: ['id'],
          }).then(stages => stages.map(s => s.id)),
        },
      },
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const leadsThisWeek = await Lead.count({
      where: {
        organizationId,
        createdAt: {
          [Op.gte]: sevenDaysAgo,
        },
      },
    });

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const tasksDueToday = await Task.count({
      where: {
        organizationId,
        status: {
          [Op.ne]: 'completed',
        },
        dueDate: {
          [Op.lte]: today,
        },
      },
    });

    const dealsByStage = await Deal.findAll({
      where: { organizationId },
      attributes: [
        'stageId',
        [sequelize.fn('COUNT', sequelize.col('Deal.id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('value')), 'totalValue'],
      ],
      include: [
        {
          model: DealStage,
          as: 'stage',
          attributes: ['id', 'name', 'color', 'order'],
        },
      ],
      group: ['stageId', 'stage.id'],
      raw: false,
    });

    return NextResponse.json({
      totalPipelineValue: parseFloat(totalPipelineValue.toFixed(2)),
      openDeals,
      leadsThisWeek,
      tasksDueToday,
      dealsByStage: dealsByStage.map((deal: any) => ({
        stage: deal.stage,
        count: parseInt(deal.get('count') as string),
        totalValue: parseFloat((deal.get('totalValue') || 0) as string),
      })),
    });
  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to get dashboard data', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getHandler);
export const dynamic = 'force-dynamic';
