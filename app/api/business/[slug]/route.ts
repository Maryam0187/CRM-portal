import { NextRequest, NextResponse } from 'next/server';
import { Business, Service, Staff, WorkingHours } from '@/models';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const business = await Business.findOne({
      where: { slug: context.params.slug },
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
        {
          model: WorkingHours,
          as: 'workingHours',
        },
      ],
    });

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    return NextResponse.json({ business });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get business', details: error.message },
      { status: 500 }
    );
  }
}
