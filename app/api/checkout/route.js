import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    })
  : null;

export async function POST(request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const { priceId, packageName, amount, isRecurring } = await request.json();

    if (!priceId && !amount) {
      return NextResponse.json(
        { error: 'Price ID or amount is required' },
        { status: 400 }
      );
    }

    // Create checkout session
    const sessionParams = {
      payment_method_types: ['card'],
      mode: isRecurring ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://crownworksnl.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://crownworksnl.com'}/pricing?canceled=true`,
      metadata: {
        packageName: packageName || 'Service Package',
      },
    };

    if (isRecurring && priceId) {
      // Subscription
      sessionParams.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
    } else {
      // One-time payment
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: packageName || 'CrownWorksNL Service',
              description: packageName || 'Service Package',
            },
            unit_amount: amount ? Math.round(amount * 100) : 29900, // $299 default in cents
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

