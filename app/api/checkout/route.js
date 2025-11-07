import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    })
  : null;

// Allowed package configurations for security
const ALLOWED_PACKAGES = {
  'Business Growth Package': { amount: 1499, isRecurring: true },
};

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

function checkRateLimit(ip, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const key = `checkout_${ip}`;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  rateLimitStore.set(key, record);
  return true;
}

export async function POST(request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Rate limiting check
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { priceId, packageName, amount, isRecurring, presale, tier, presaleId } = body;

    // Validate package name and amount match
    if (packageName && ALLOWED_PACKAGES[packageName]) {
      const allowed = ALLOWED_PACKAGES[packageName];
      // Enforce correct amount and recurring status
      if (amount !== allowed.amount || isRecurring !== allowed.isRecurring) {
        return NextResponse.json(
          { error: 'Invalid package configuration' },
          { status: 400 }
        );
      }
    } else if (packageName) {
      return NextResponse.json(
        { error: 'Invalid package name' },
        { status: 400 }
      );
    }

    // Validate amount if provided
    if (amount !== undefined) {
      if (typeof amount !== 'number' || amount <= 0 || amount > 100000) {
        return NextResponse.json(
          { error: 'Invalid amount' },
          { status: 400 }
        );
      }
      // Round to 2 decimal places and convert to cents
      const amountInCents = Math.round(amount * 100);
      if (amountInCents < 50) { // Minimum $0.50
        return NextResponse.json(
          { error: 'Amount too small' },
          { status: 400 }
        );
      }
    }

    if (!priceId && !amount) {
      return NextResponse.json(
        { error: 'Price ID or amount is required' },
        { status: 400 }
      );
    }

    // Handle presales
    let sanitizedPackageName;
    if (presale && tier) {
      const tierNames = {
        founder: 'CrownWorks AI Agent - Founder Tier (Presale)',
        pioneer: 'CrownWorks AI Agent - Pioneer Tier (Presale)',
        early: 'CrownWorks AI Agent - Early Adopter (Presale)',
        starter: 'CrownWorks AI Agent - Starter (Presale)'
      };
      sanitizedPackageName = tierNames[tier] || 'CrownWorks AI Agent - Presale';
    } else {
      // Sanitize package name
      sanitizedPackageName = packageName 
        ? packageName.replace(/[<>]/g, '').slice(0, 100)
        : 'CrownWorksNL Service';
    }

    // Create checkout session
    const sessionParams = {
      payment_method_types: ['card'],
      mode: isRecurring ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://crownworksnl.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://crownworksnl.com'}/pricing?canceled=true`,
      metadata: {
        packageName: sanitizedPackageName,
        timestamp: new Date().toISOString(),
        presale: presale ? 'true' : 'false',
        tier: tier || '',
        presaleId: presaleId || ''
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
            currency: 'usd',
            product_data: {
              name: sanitizedPackageName,
              description: sanitizedPackageName,
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

