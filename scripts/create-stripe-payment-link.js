/**
 * Create Stripe Payment Link for AI Business Audit Report
 * 
 * Run: node scripts/create-stripe-payment-link.js
 * 
 * Requires: STRIPE_SECRET_KEY in environment variables
 */

const Stripe = require('stripe');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
  console.log('\n💡 Add it to .env.local:');
  console.log('   STRIPE_SECRET_KEY=sk_test_xxxxx');
  console.log('\nOr set it in your terminal:');
  console.log('   export STRIPE_SECRET_KEY=sk_test_xxxxx');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-12-18.acacia',
});

async function createPaymentLink() {
  try {
    console.log('🚀 Creating Stripe Payment Link for AI Business Audit Report...\n');

    // Step 1: Create or find product
    console.log('📦 Step 1: Creating product...');
    let product;
    
    // Try to find existing product first
    const products = await stripe.products.list({
      limit: 100,
    });
    
    const existingProduct = products.data.find(
      p => p.name === 'AI Business Audit Report'
    );
    
    if (existingProduct) {
      console.log('✅ Found existing product:', existingProduct.id);
      product = existingProduct;
    } else {
      product = await stripe.products.create({
        name: 'AI Business Audit Report',
        description: 'Instant AI-powered business audit with actionable recommendations. 5-minute automated analysis across 4 key business areas (Marketing, Operations, Financial, Growth).',
      });
      console.log('✅ Created new product:', product.id);
    }

    // Step 2: Create or find price
    console.log('\n💰 Step 2: Creating price...');
    let price;
    
    const prices = await stripe.prices.list({
      product: product.id,
      limit: 100,
    });
    
    const existingPrice = prices.data.find(
      p => p.unit_amount === 9900 && p.currency === 'usd' && !p.recurring
    );
    
    if (existingPrice) {
      console.log('✅ Found existing price:', existingPrice.id);
      price = existingPrice;
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: 9900, // $99.00 in cents
        currency: 'usd',
      });
      console.log('✅ Created new price:', price.id);
    }

    // Step 3: Create payment link
    console.log('\n🔗 Step 3: Creating payment link...');
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crownworksnl.com';
    
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${siteUrl}/success?source=payment_link`,
        },
      },
      metadata: {
        product: 'ai_business_audit_report',
        source: 'payment_link',
      },
    });

    console.log('\n✅ SUCCESS! Payment link created!\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔗 YOUR PAYMENT LINK:');
    console.log('═══════════════════════════════════════════════════════');
    console.log(paymentLink.url);
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('📋 Payment Link Details:');
    console.log('   Product:', product.name);
    console.log('   Price: $99.00 USD');
    console.log('   Payment Link ID:', paymentLink.id);
    console.log('   Active:', paymentLink.active);
    console.log('\n💡 Share this link anywhere:');
    console.log('   - Social media');
    console.log('   - Email campaigns');
    console.log('   - Website');
    console.log('   - Text messages');
    console.log('\n🧪 Test it:');
    console.log('   1. Click the link');
    console.log('   2. Use test card: 4242 4242 4242 4242');
    console.log('   3. Any future date, any CVC');
    console.log('   4. Complete payment');
    console.log('\n💰 Start selling! 🚀\n');

    return paymentLink;
  } catch (error) {
    console.error('\n❌ Error creating payment link:', error.message);
    if (error.type === 'StripeAuthenticationError') {
      console.log('\n💡 Make sure your STRIPE_SECRET_KEY is correct');
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createPaymentLink();
}

module.exports = { createPaymentLink };

