/**
 * Test Payment System
 * 
 * Run: node scripts/test-payment.js
 * 
 * Tests the checkout API to verify payment system is working
 * 
 * Note: Requires Node.js 18+ (native fetch) or install node-fetch
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const testProducts = [
  {
    name: 'AI Business Audit Report',
    packageName: 'AI Business Audit Report',
    amount: 99,
    isRecurring: false
  },
  {
    name: 'SaaS Foundation Course',
    packageName: 'SaaS Foundation: From Idea to Launch',
    amount: 299,
    isRecurring: false
  },
  {
    name: 'Business Growth Package',
    packageName: 'Business Growth Package',
    amount: 1499,
    isRecurring: true
  }
];

async function testCheckout(product) {
  try {
    console.log(`\n🧪 Testing: ${product.name} ($${product.amount})`);
    
    const response = await fetch(`${BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        packageName: product.packageName,
        amount: product.amount,
        isRecurring: product.isRecurring,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ FAILED: ${data.error || 'Unknown error'}`);
      if (data.details) {
        console.error(`   Details: ${data.details}`);
      }
      return false;
    }

    if (data.url && data.sessionId) {
      console.log(`✅ SUCCESS: Checkout URL generated`);
      console.log(`   Session ID: ${data.sessionId}`);
      console.log(`   URL: ${data.url.substring(0, 60)}...`);
      return true;
    } else {
      console.error(`❌ FAILED: No URL or session ID in response`);
      console.error(`   Response:`, data);
      return false;
    }
  } catch (error) {
    console.error(`❌ ERROR: ${error.message}`);
    return false;
  }
}

async function testHealthCheck() {
  try {
    console.log('🔍 Testing API health...');
    const response = await fetch(`${BASE_URL}/api/checkout`, {
      method: 'GET',
    });
    
    // GET might not be implemented, that's okay
    console.log(`   Status: ${response.status}`);
    return true;
  } catch (error) {
    console.error(`❌ Health check failed: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('💳 PAYMENT SYSTEM TEST');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Testing: ${BASE_URL}`);
  console.log('');

  // Test health check
  await testHealthCheck();

  // Test each product
  let passed = 0;
  let failed = 0;

  for (const product of testProducts) {
    const result = await testCheckout(product);
    if (result) {
      passed++;
    } else {
      failed++;
    }
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 TEST RESULTS');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📦 Total: ${testProducts.length}`);
  console.log('');

  if (failed === 0) {
    console.log('🎉 All tests passed! Payment system is working.');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Test with real Stripe test card: 4242 4242 4242 4242');
    console.log('   2. Check Stripe dashboard for payments');
    console.log('   3. Switch to live keys for production');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
    console.log('');
    console.log('💡 Common fixes:');
    console.log('   1. Make sure STRIPE_SECRET_KEY is set');
    console.log('   2. Check that server is running');
    console.log('   3. Verify package names match ALLOWED_PACKAGES');
  }
  console.log('');
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

