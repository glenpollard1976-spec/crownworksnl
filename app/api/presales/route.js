import { NextResponse } from 'next/server';

/**
 * CrownWorks AI Agent Presales API
 * Handles presales registrations and tracking
 */

// Presales tiers configuration
const PRESALES_TIERS = {
  founder: {
    price: 4999,
    spots: 50,
    sold: 0, // In production, get from database
    name: 'Founder'
  },
  pioneer: {
    price: 1999,
    spots: 100,
    sold: 0,
    name: 'Pioneer'
  },
  early: {
    price: 999,
    spots: 200,
    sold: 0,
    name: 'Early Adopter'
  },
  starter: {
    price: 499,
    spots: 500,
    sold: 0,
    name: 'Starter'
  }
};

// Track presales (in production, use database)
const presalesStore = new Map();

export async function POST(request) {
  try {
    const { tier, email, name, phone } = await request.json();

    if (!tier || !PRESALES_TIERS[tier]) {
      return NextResponse.json(
        { error: 'Invalid tier selected' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const tierInfo = PRESALES_TIERS[tier];
    
    // Check if tier is sold out (in production, check database)
    // For now, we'll allow all registrations
    
    // Store presale interest (in production, save to database)
    const presaleId = `presale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    presalesStore.set(presaleId, {
      tier,
      email,
      name,
      phone,
      amount: tierInfo.price,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Create Stripe checkout session
    // 4. Track in analytics

    return NextResponse.json({
      success: true,
      presaleId,
      tier: tierInfo.name,
      amount: tierInfo.price,
      checkoutUrl: `/api/checkout?tier=${tier}&amount=${tierInfo.price}&presale=true&presaleId=${presaleId}`
    });

  } catch (error) {
    console.error('Presales API error:', error);
    return NextResponse.json(
      { error: 'Failed to process presale registration', message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      // Return presales statistics
      const stats = {
        totalPresales: presalesStore.size,
        revenue: Array.from(presalesStore.values()).reduce((sum, p) => sum + p.amount, 0),
        byTier: {}
      };

      // Calculate by tier
      Object.keys(PRESALES_TIERS).forEach(tier => {
        const tierPresales = Array.from(presalesStore.values()).filter(p => p.tier === tier);
        stats.byTier[tier] = {
          count: tierPresales.length,
          revenue: tierPresales.reduce((sum, p) => sum + p.amount, 0)
        };
      });

      return NextResponse.json({ success: true, stats });
    }

    // Return tier information
    return NextResponse.json({
      success: true,
      tiers: PRESALES_TIERS,
      totalSpots: Object.values(PRESALES_TIERS).reduce((sum, t) => sum + t.spots, 0),
      totalRevenue: Object.values(PRESALES_TIERS).reduce((sum, t) => sum + (t.spots * t.price), 0)
    });

  } catch (error) {
    console.error('Presales GET error:', error);
    return NextResponse.json(
      { error: 'Failed to get presales information', message: error.message },
      { status: 500 }
    );
  }
}

