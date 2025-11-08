import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia',
    })
  : null;

export async function POST(request) {
  // Webhook is OPTIONAL - payments work without it
  // Stripe checkout handles payments directly
  if (!stripe) {
    console.log('ℹ️ Webhook received but Stripe not configured - ignoring');
    return NextResponse.json(
      { received: true, message: 'Stripe not configured - webhook ignored' },
      { status: 200 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  // If no webhook secret, just log the event (optional feature)
  if (!webhookSecret) {
    console.log('ℹ️ Webhook received without secret - logging only');
    try {
      event = JSON.parse(body);
      console.log('📦 Webhook event (unverified):', event.type);
      // Still process it, just without verification
    } catch (err) {
      console.log('⚠️ Could not parse webhook body');
      return NextResponse.json({ received: true }, { status: 200 });
    }
  } else if (!signature) {
    console.log('ℹ️ Webhook received without signature - ignoring');
    return NextResponse.json({ received: true }, { status: 200 });
  } else {
    // Verify signature if secret is provided
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('✅ Payment successful for session:', session.id);
      console.log('📦 Package:', session.metadata?.packageName || 'Unknown');
      console.log('👤 Customer:', session.customer_email || session.customer_details?.email || 'Unknown');
      console.log('💰 Amount:', session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : 'Unknown');
      console.log('🎯 Presale:', session.metadata?.presale === 'true' ? 'Yes' : 'No');
      if (session.metadata?.tier) {
        console.log('🏆 Tier:', session.metadata.tier);
      }
      // Here you would:
      // - Send confirmation email
      // - Update database
      // - Activate service
      // - Notify customer
      break;

    case 'customer.subscription.created':
      const newSubscription = event.data.object;
      console.log('✅ New subscription created:', newSubscription.id);
      console.log('👤 Customer:', newSubscription.customer);
      console.log('💰 Amount:', newSubscription.items.data[0]?.price?.unit_amount ? `$${(newSubscription.items.data[0].price.unit_amount / 100).toFixed(2)}` : 'Unknown');
      // Handle new subscription
      break;

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object;
      console.log('🔄 Subscription updated:', updatedSubscription.id);
      console.log('📊 Status:', updatedSubscription.status);
      // Handle subscription updates
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log('❌ Subscription canceled:', deletedSubscription.id);
      console.log('👤 Customer:', deletedSubscription.customer);
      // Handle subscription cancellation
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('💳 Payment intent succeeded:', paymentIntent.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.error('❌ Payment failed:', failedPayment.id);
      console.error('Reason:', failedPayment.last_payment_error?.message || 'Unknown');
      break;

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

