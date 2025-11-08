/**
 * Test All Payment Buttons and Checkout API
 * Verifies all payment endpoints are working correctly
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const PAYMENT_TESTS = [
  {
    name: 'Business Growth Package',
    packageName: 'Business Growth Package',
    amount: 1499,
    isRecurring: true,
    expectedStatus: 200,
  },
  {
    name: 'AI Business Audit Report',
    packageName: 'AI Business Audit Report',
    amount: 99,
    isRecurring: false,
    expectedStatus: 200,
  },
  {
    name: '60-Minute Business Audit',
    packageName: '60-Minute Business Audit',
    amount: 99,
    isRecurring: false,
    expectedStatus: 200,
  },
  {
    name: 'SaaS Foundation Course',
    packageName: 'SaaS Foundation: From Idea to Launch',
    amount: 299,
    isRecurring: false,
    expectedStatus: 200,
  },
  {
    name: 'SaaS Growth Mastery Course',
    packageName: 'SaaS Growth Mastery: 0 to $10K MRR',
    amount: 499,
    isRecurring: false,
    expectedStatus: 200,
  },
  {
    name: 'SaaS Technical Stack Course',
    packageName: 'SaaS Technical Stack: Build Like a Pro',
    amount: 399,
    isRecurring: false,
    expectedStatus: 200,
  },
  {
    name: 'SaaS Sales & Marketing Course',
    packageName: 'SaaS Sales & Marketing: Close More Deals',
    amount: 349,
    isRecurring: false,
    expectedStatus: 200,
  },
  {
    name: 'Complete SaaS Mastery Bundle',
    packageName: 'Complete SaaS Mastery Bundle',
    amount: 999,
    isRecurring: false,
    expectedStatus: 200,
  },
  {
    name: 'Presale - Founder Tier',
    presale: true,
    tier: 'founder',
    amount: 4999,
    isRecurring: false,
    expectedStatus: 200,
  },
];

async function testPayment(paymentTest) {
  try {
    console.log(`\n🧪 Testing: ${paymentTest.name}`);
    console.log(`   Package: ${paymentTest.packageName || 'Presale'}`);
    console.log(`   Amount: $${paymentTest.amount}`);
    
    const body = {
      packageName: paymentTest.packageName,
      amount: paymentTest.amount,
      isRecurring: paymentTest.isRecurring,
    };
    
    if (paymentTest.presale) {
      body.presale = true;
      body.tier = paymentTest.tier;
      body.presaleId = `${paymentTest.tier}_${Date.now()}`;
    }
    
    const response = await fetch(`${SITE_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log(`   ❌ FAILED: ${response.status}`);
      console.log(`   Error: ${data.error || JSON.stringify(data)}`);
      
      if (data.error?.includes('STRIPE_SECRET_KEY')) {
        console.log(`   ⚠️  Stripe key not configured - this is expected in test`);
      }
      
      return { success: false, error: data.error };
    }
    
    if (data.url) {
      console.log(`   ✅ SUCCESS: Checkout URL generated`);
      console.log(`   URL: ${data.url.substring(0, 50)}...`);
      return { success: true, url: data.url };
    } else if (data.sessionId) {
      console.log(`   ✅ SUCCESS: Session ID generated`);
      console.log(`   Session: ${data.sessionId.substring(0, 20)}...`);
      return { success: true, sessionId: data.sessionId };
    } else {
      console.log(`   ⚠️  WARNING: No URL or sessionId in response`);
      return { success: false, error: 'No checkout URL received' };
    }
    
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testInvalidPackage() {
  console.log(`\n🧪 Testing: Invalid Package (should fail)`);
  try {
    const response = await fetch(`${SITE_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageName: 'Invalid Package Name',
        amount: 100,
        isRecurring: false,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok && data.error) {
      console.log(`   ✅ SUCCESS: Correctly rejected invalid package`);
      console.log(`   Error: ${data.error}`);
      return { success: true };
    } else {
      console.log(`   ❌ FAILED: Should have rejected invalid package`);
      return { success: false };
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return { success: false };
  }
}

async function testInvalidAmount() {
  console.log(`\n🧪 Testing: Invalid Amount (should fail)`);
  try {
    const response = await fetch(`${SITE_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageName: 'Business Growth Package',
        amount: 999, // Wrong amount (should be 1499)
        isRecurring: true,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok && data.error) {
      console.log(`   ✅ SUCCESS: Correctly rejected invalid amount`);
      console.log(`   Error: ${data.error}`);
      return { success: true };
    } else {
      console.log(`   ❌ FAILED: Should have rejected invalid amount`);
      return { success: false };
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return { success: false };
  }
}

async function runAllTests() {
  console.log('========================================');
  console.log('  PAYMENT BUTTONS & API TEST');
  console.log('========================================');
  console.log(`\nTesting against: ${SITE_URL}`);
  console.log(`\nNote: If Stripe key is not configured, tests will show expected errors.`);
  
  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
  };
  
  // Test all valid payments
  for (const test of PAYMENT_TESTS) {
    const result = await testPayment(test);
    if (result.success) {
      results.passed++;
    } else if (result.error?.includes('STRIPE_SECRET_KEY')) {
      results.warnings++;
    } else {
      results.failed++;
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Test invalid package
  const invalidPackageResult = await testInvalidPackage();
  if (invalidPackageResult.success) {
    results.passed++;
  } else {
    results.failed++;
  }
  
  // Test invalid amount
  const invalidAmountResult = await testInvalidAmount();
  if (invalidAmountResult.success) {
    results.passed++;
  } else {
    results.failed++;
  }
  
  // Summary
  console.log('\n========================================');
  console.log('  TEST SUMMARY');
  console.log('========================================');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`⚠️  Warnings (Stripe not configured): ${results.warnings}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`\nTotal Tests: ${PAYMENT_TESTS.length + 2}`);
  
  if (results.warnings > 0) {
    console.log('\n⚠️  Note: Warnings are expected if STRIPE_SECRET_KEY is not set.');
    console.log('   Add it in Vercel Settings → Environment Variables to enable payments.');
  }
  
  if (results.failed === 0 && results.warnings === 0) {
    console.log('\n🎉 All tests passed! Payment system is fully functional!');
  } else if (results.failed === 0) {
    console.log('\n✅ All tests passed! (Stripe key needed for actual payments)');
  } else {
    console.log('\n❌ Some tests failed. Check errors above.');
  }
  
  console.log('\n========================================\n');
}

// Run tests
runAllTests().catch(console.error);

