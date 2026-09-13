import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { parseCookie } from 'cookie';
import { Business, User } from '@/models';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-08-26.dahlia' })
  : null;

// Price mapping - use env vars if set, otherwise will need to be created
const PRICE_IDS = {
  growth_monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY || 'price_growth_monthly',
  growth_annual: process.env.STRIPE_PRICE_GROWTH_ANNUAL || 'price_growth_annual',
  business_monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY || 'price_business_monthly',
  business_annual: process.env.STRIPE_PRICE_BUSINESS_ANNUAL || 'price_business_annual',
};

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

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { plan, billingCycle } = body;

    if (!plan || !['growth', 'business'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    if (!billingCycle || !['monthly', 'annual'].includes(billingCycle)) {
      return NextResponse.json({ error: 'Invalid billing cycle' }, { status: 400 });
    }

    const business = await Business.findByPk(payload.businessId);
    const user = await User.findByPk(payload.userId);

    if (!business || !user) {
      return NextResponse.json({ error: 'Business or user not found' }, { status: 404 });
    }

    // Get or create Stripe customer
    let customerId = business.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          businessId: business.id.toString(),
          userId: user.id.toString(),
        },
      });
      customerId = customer.id;
      await business.update({ stripeCustomerId: customerId });
    }

    // Determine price ID
    const priceKey = `${plan}_${billingCycle}` as keyof typeof PRICE_IDS;
    const priceId = PRICE_IDS[priceKey];

    // Create Checkout Session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}/checkout?plan=${plan}&cycle=${billingCycle}&cancelled=true`,
      metadata: {
        businessId: business.id.toString(),
        plan,
        billingCycle,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    
    // Provide helpful error messages
    if (error.code === 'resource_missing') {
      return NextResponse.json(
        { 
          error: 'Stripe price not found. Please create products in Stripe Dashboard or set price IDs in environment variables.',
          details: error.message 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
