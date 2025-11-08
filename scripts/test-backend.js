/**
 * Comprehensive Backend Test Script
 * Tests all API endpoints to ensure backend is working
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Test results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function recordTest(name, passed, message, warning = false) {
  results.tests.push({ name, passed, message, warning });
  if (warning) {
    results.warnings++;
    logWarning(`${name}: ${message}`);
  } else if (passed) {
    results.passed++;
    logSuccess(`${name}: ${message}`);
  } else {
    results.failed++;
    logError(`${name}: ${message}`);
  }
}

// Test 1: Contact API
async function testContactAPI() {
  logInfo('\n📧 Testing Contact API...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1 (709) 123-4567',
        message: 'This is a test message to verify the contact API is working correctly.'
      })
    });

    const data = await response.json();

    if (response.ok) {
      if (data.note && data.note.includes('not configured')) {
        recordTest('Contact API', true, 'Working (Resend not configured - using fallback)', true);
      } else {
        recordTest('Contact API', true, 'Working - Email sent successfully');
      }
    } else {
      recordTest('Contact API', false, `Failed: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    recordTest('Contact API', false, `Error: ${error.message}`);
  }
}

// Test 2: AI Agent API
async function testAIAgentAPI() {
  logInfo('\n🤖 Testing AI Agent API...');
  
  try {
    // Test POST
    const response = await fetch(`${BASE_URL}/api/ai-agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'I need help with a business contract',
        context: { page: '/test' }
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      recordTest('AI Agent API (POST)', true, `Working - Routed to: ${data.service}`);
    } else {
      recordTest('AI Agent API (POST)', false, `Failed: ${data.error || 'Unknown error'}`);
    }

    // Test GET (health check)
    const healthResponse = await fetch(`${BASE_URL}/api/ai-agent`);
    const healthData = await healthResponse.json();

    if (healthResponse.ok && healthData.status === 'online') {
      recordTest('AI Agent API (GET)', true, 'Health check passed');
    } else {
      recordTest('AI Agent API (GET)', false, 'Health check failed');
    }
  } catch (error) {
    recordTest('AI Agent API', false, `Error: ${error.message}`);
  }
}

// Test 3: Business Audit Agent API
async function testBusinessAuditAPI() {
  logInfo('\n📊 Testing Business Audit Agent API...');
  
  try {
    // Test GET (categories)
    const getResponse = await fetch(`${BASE_URL}/api/business-audit-agent`);
    const getData = await getResponse.json();

    if (getResponse.ok && getData.success && getData.categories) {
      recordTest('Business Audit API (GET)', true, `Working - ${getData.categories.length} categories available`);
    } else {
      recordTest('Business Audit API (GET)', false, 'Failed to get categories');
    }

    // Test POST (generate report)
    const postResponse = await fetch(`${BASE_URL}/api/business-audit-agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        responses: {
          marketing: { 0: 'yes', 1: 'partial', 2: 'no', 3: 'yes', 4: 'no' },
          operations: { 0: 'yes', 1: 'yes', 2: 'partial', 3: 'no', 4: 'yes' },
          financial: { 0: 'yes', 1: 'yes', 2: 'yes', 3: 'partial', 4: 'no' },
          growth: { 0: 'yes', 1: 'yes', 2: 'yes', 3: 'yes', 4: 'partial' }
        },
        businessInfo: {
          name: 'Test Business',
          industry: 'Technology',
          size: 'Small'
        }
      })
    });

    const postData = await postResponse.json();

    if (postResponse.ok && postData.success && postData.report) {
      recordTest('Business Audit API (POST)', true, `Working - Report generated (Score: ${postData.scores.overall}%)`);
    } else {
      recordTest('Business Audit API (POST)', false, `Failed: ${postData.error || 'Unknown error'}`);
    }
  } catch (error) {
    recordTest('Business Audit API', false, `Error: ${error.message}`);
  }
}

// Test 4: Checkout API
async function testCheckoutAPI() {
  logInfo('\n💳 Testing Checkout API...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageName: 'AI Business Audit Report',
        amount: 99,
        isRecurring: false,
        customerEmail: 'test@example.com',
        customerName: 'Test User'
      })
    });

    const data = await response.json();

    if (response.ok && data.sessionId && data.url) {
      recordTest('Checkout API', true, 'Working - Stripe session created');
    } else if (data.error && data.error.includes('not configured')) {
      recordTest('Checkout API', true, 'Working (Stripe not configured - expected)', true);
    } else {
      recordTest('Checkout API', false, `Failed: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    recordTest('Checkout API', false, `Error: ${error.message}`);
  }
}

// Test 5: Presales API
async function testPresalesAPI() {
  logInfo('\n🎫 Testing Presales API...');
  
  try {
    // Test GET
    const getResponse = await fetch(`${BASE_URL}/api/presales`);
    const getData = await getResponse.json();

    if (getResponse.ok && getData.success && getData.tiers) {
      recordTest('Presales API (GET)', true, `Working - ${Object.keys(getData.tiers).length} tiers available`);
    } else {
      recordTest('Presales API (GET)', false, 'Failed to get presales tiers');
    }

    // Test POST
    const postResponse = await fetch(`${BASE_URL}/api/presales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: 'starter',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+1 (709) 123-4567'
      })
    });

    const postData = await postResponse.json();

    if (postResponse.ok && postData.success && postData.presaleId) {
      recordTest('Presales API (POST)', true, `Working - Presale registered (ID: ${postData.presaleId})`);
    } else {
      recordTest('Presales API (POST)', false, `Failed: ${postData.error || 'Unknown error'}`);
    }
  } catch (error) {
    recordTest('Presales API', false, `Error: ${error.message}`);
  }
}

// Test 6: Webhook API (just check if it exists)
async function testWebhookAPI() {
  logInfo('\n🔔 Testing Webhook API...');
  
  try {
    // Webhook should accept POST requests
    const response = await fetch(`${BASE_URL}/api/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true })
    });

    const data = await response.json();

    if (response.ok) {
      recordTest('Webhook API', true, 'Working - Endpoint accessible');
    } else {
      recordTest('Webhook API', false, `Failed: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    recordTest('Webhook API', false, `Error: ${error.message}`);
  }
}

// Test 7: Environment Variables Check
function testEnvironmentVariables() {
  logInfo('\n🔐 Checking Environment Variables...');
  
  const requiredVars = {
    'RESEND_API_KEY': 'Email service (optional - has fallback)',
    'STRIPE_SECRET_KEY': 'Payment processing (required for payments)',
    'OPENAI_API_KEY': 'AI features (optional - has fallback)',
    'STRIPE_WEBHOOK_SECRET': 'Webhook verification (optional)'
  };

  let allConfigured = true;
  let someConfigured = false;

  Object.keys(requiredVars).forEach(varName => {
    const isSet = !!process.env[varName];
    if (isSet) {
      someConfigured = true;
      logInfo(`  ✓ ${varName} is set`);
    } else {
      logWarning(`  ✗ ${varName} is not set - ${requiredVars[varName]}`);
    }
  });

  if (someConfigured) {
    recordTest('Environment Variables', true, 'Some variables configured', !allConfigured);
  } else {
    recordTest('Environment Variables', true, 'Using fallback modes (no env vars set)', true);
  }
}

// Test 8: Dependencies Check
function testDependencies() {
  logInfo('\n📦 Checking Dependencies...');
  
  const dependencies = {
    'stripe': 'Stripe SDK',
    'resend': 'Resend email service',
    'openai': 'OpenAI SDK'
  };

  let allInstalled = true;

  Object.keys(dependencies).forEach(dep => {
    try {
      require(dep);
      logInfo(`  ✓ ${dependencies[dep]} installed`);
    } catch (error) {
      logError(`  ✗ ${dependencies[dep]} not installed`);
      allInstalled = false;
    }
  });

  recordTest('Dependencies', allInstalled, allInstalled ? 'All dependencies installed' : 'Some dependencies missing');
}

// Main test runner
async function runAllTests() {
  log('\n' + '='.repeat(60), 'cyan');
  log('  BACKEND TEST SUITE - CrownWorksNL', 'cyan');
  log('='.repeat(60) + '\n', 'cyan');

  logInfo(`Testing against: ${BASE_URL}\n`);

  // Run all tests
  await testContactAPI();
  await testAIAgentAPI();
  await testBusinessAuditAPI();
  await testCheckoutAPI();
  await testPresalesAPI();
  await testWebhookAPI();
  testEnvironmentVariables();
  testDependencies();

  // Print summary
  log('\n' + '='.repeat(60), 'cyan');
  log('  TEST SUMMARY', 'cyan');
  log('='.repeat(60), 'cyan');
  log(`\n✅ Passed: ${results.passed}`, 'green');
  log(`⚠️  Warnings: ${results.warnings}`, 'yellow');
  log(`❌ Failed: ${results.failed}`, 'red');
  log(`\nTotal Tests: ${results.tests.length}\n`);

  // Detailed results
  if (results.failed > 0 || results.warnings > 0) {
    log('\n📋 Detailed Results:', 'cyan');
    results.tests.forEach(test => {
      if (!test.passed || test.warning) {
        const icon = test.passed ? '⚠️' : '❌';
        const color = test.passed ? 'yellow' : 'red';
        log(`${icon} ${test.name}: ${test.message}`, color);
      }
    });
  }

  // Final status
  log('\n' + '='.repeat(60), 'cyan');
  if (results.failed === 0) {
    log('✅ BACKEND IS WORKING!', 'green');
    if (results.warnings > 0) {
      log('⚠️  Some features using fallback modes (check warnings above)', 'yellow');
    }
  } else {
    log('❌ SOME TESTS FAILED - Check errors above', 'red');
  }
  log('='.repeat(60) + '\n', 'cyan');

  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
});

