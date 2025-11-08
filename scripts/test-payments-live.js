/**
 * Test Payment Buttons on Live Site
 * Tests the actual deployed site
 */

const LIVE_URL = 'https://www.crownworksnl.com';

const PAYMENT_TESTS = [
  {
    name: 'Business Growth Package',
    packageName: 'Business Growth Package',
    amount: 1499,
    isRecurring: true,
  },
  {
    name: 'AI Business Audit Report',
    packageName: 'AI Business Audit Report',
    amount: 99,
    isRecurring: false,
  },
  {
    name: '60-Minute Business Audit',
    packageName: '60-Minute Business Audit',
    amount: 99,
    isRecurring: false,
  },
];

async function testLivePayment(test) {
  try {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`   URL: ${LIVE_URL}/api/checkout`);
    
    const response = await fetch(`${LIVE_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageName: test.packageName,
        amount: test.amount,
        isRecurring: test.isRecurring,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (data.error?.includes('STRIPE_SECRET_KEY')) {
        console.log(`   ⚠️  Stripe key not configured`);
        return { status: 'warning', message: 'Stripe key needed' };
      }
      console.log(`   ❌ Error: ${data.error || response.status}`);
      return { status: 'error', message: data.error };
    }
    
    if (data.url) {
      console.log(`   ✅ SUCCESS: Checkout URL generated!`);
      console.log(`   ✅ Payment button is WORKING!`);
      return { status: 'success', url: data.url };
    }
    
    return { status: 'unknown', data };
    
  } catch (error) {
    console.log(`   ❌ Network Error: ${error.message}`);
    return { status: 'error', message: error.message };
  }
}

async function runLiveTests() {
  console.log('========================================');
  console.log('  LIVE PAYMENT BUTTONS TEST');
  console.log('========================================');
  console.log(`\nTesting: ${LIVE_URL}`);
  console.log(`\nThis tests the actual deployed site.\n`);
  
  const results = {
    success: 0,
    warning: 0,
    error: 0,
  };
  
  for (const test of PAYMENT_TESTS) {
    const result = await testLivePayment(test);
    if (result.status === 'success') {
      results.success++;
    } else if (result.status === 'warning') {
      results.warning++;
    } else {
      results.error++;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n========================================');
  console.log('  RESULTS');
  console.log('========================================');
  console.log(`✅ Working: ${results.success}`);
  console.log(`⚠️  Needs Stripe Key: ${results.warning}`);
  console.log(`❌ Errors: ${results.error}`);
  
  if (results.success > 0) {
    console.log('\n🎉 Payment buttons are WORKING on live site!');
  } else if (results.warning > 0) {
    console.log('\n⚠️  Payment API is working, but Stripe key needed.');
    console.log('   Add STRIPE_SECRET_KEY in Vercel to enable payments.');
  } else {
    console.log('\n❌ Check errors above.');
  }
  
  console.log('\n========================================\n');
}

runLiveTests().catch(console.error);

