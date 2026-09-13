import { NextRequest, NextResponse } from 'next/server';
import { Business } from '@/models';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-08-26.dahlia' })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment succeeded:', invoice.id);
        // Could send email notification here
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', invoice.id);
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const businessId = session.metadata?.businessId;
  const plan = session.metadata?.plan;
  const billingCycle = session.metadata?.billingCycle;

  if (!businessId || !plan) {
    console.error('Missing metadata in checkout session');
    return;
  }

  const business = await Business.findByPk(parseInt(businessId));
  if (!business) {
    console.error('Business not found:', businessId);
    return;
  }

  // Get subscription ID from session
  const subscriptionId = session.subscription as string;

  await business.update({
    plan,
    planStatus: 'active',
    planBillingCycle: billingCycle || 'monthly',
    stripeSubscriptionId: subscriptionId,
  });

  console.log(`✅ Checkout completed for business ${businessId}: ${plan} (${billingCycle})`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const business = await Business.findOne({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!business) {
    console.error('Business not found for subscription:', subscription.id);
    return;
  }

  // Update plan status based on subscription status
  let planStatus = 'active';
  if (subscription.status === 'canceled') planStatus = 'cancelled';
  else if (subscription.status === 'past_due') planStatus = 'past_due';
  else if (subscription.status === 'unpaid') planStatus = 'past_due';

  await business.update({
    planStatus,
  });

  console.log(`✅ Subscription updated for business ${business.id}: status=${planStatus}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const business = await Business.findOne({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!business) {
    console.error('Business not found for subscription:', subscription.id);
    return;
  }

  await business.update({
    plan: 'free',
    planStatus: 'cancelled',
    stripeSubscriptionId: undefined,
  });

  console.log(`✅ Subscription cancelled for business ${business.id}, reverted to Free plan`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Subscription might be a string ID or expanded object depending on Stripe API version
  const subscriptionId = (invoice as any).subscription as string | undefined;
  if (!subscriptionId) return;

  const business = await Business.findOne({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!business) {
    console.error('Business not found for subscription:', subscriptionId);
    return;
  }

  await business.update({
    planStatus: 'past_due',
  });

  console.log(`⚠️ Payment failed for business ${business.id}, marked as past_due`);
}
