import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import { Business } from '@/models';

export const dynamic = 'force-dynamic';

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
    const { plan, billingCycle } = body;

    if (!plan || !['free', 'growth', 'business'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const business = await Business.findByPk(payload.businessId);
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // In real Stripe: would create/update subscription here
    // For mock: just update the plan
    await business.update({
      plan,
      planStatus: 'active',
      planBillingCycle: billingCycle || 'monthly',
    });

    return NextResponse.json({
      message: 'Plan updated successfully',
      business: {
        id: business.id,
        name: business.name,
        plan: business.plan,
        planStatus: business.planStatus,
        planBillingCycle: business.planBillingCycle,
      },
    });
  } catch (error: any) {
    console.error('Error upgrading plan:', error);
    return NextResponse.json({ error: 'Failed to upgrade plan' }, { status: 500 });
  }
}
