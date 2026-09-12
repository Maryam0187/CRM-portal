import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Booking, Service, Staff, Business } from '@/models';
import { Op } from 'sequelize';
import { formatLocalDate } from '@/lib/helpers';

export const dynamic = 'force-dynamic';

async function handler(req: AuthenticatedRequest) {
  try {
    const businessId = req.user!.businessId;

    const today = formatLocalDate();

    const bookingsToday = await Booking.findAll({
      where: {
        businessId,
        bookingDate: today,
      },
      include: [
        {
          model: Service,
          as: 'service',
          attributes: ['name', 'price'],
        },
        {
          model: Staff,
          as: 'staff',
          attributes: ['name'],
        },
      ],
      order: [['startTime', 'ASC']],
    });

    const business = await Business.findByPk(businessId, {
      include: [
        {
          model: Service,
          as: 'services',
          where: { active: true },
          required: false,
        },
        {
          model: Staff,
          as: 'staff',
          where: { active: true },
          required: false,
        },
      ],
    });

    const upcomingBookings = await Booking.count({
      where: {
        businessId,
        bookingDate: {
          [Op.gte]: today,
        },
        status: {
          [Op.in]: ['pending', 'confirmed'],
        },
      },
    });

    return NextResponse.json({
      bookingsToday,
      business,
      upcomingBookings,
    });
  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to get dashboard data', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
