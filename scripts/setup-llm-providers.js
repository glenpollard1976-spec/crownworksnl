/**
 * Automated Multi-LLM Provider Setup
 * Installs packages, guides API key setup, and tests everything
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Automated Multi-LLM Provider Setup\n');
console.log('========================================\n');

// Step 1: Install packages
console.log('📦 Step 1: Installing packages...\n');
try {
  console.log('Installing @anthropic-ai/sdk...');
  execSync('npm install @anthropic-ai/sdk@^0.27.0', { stdio: 'inherit' });
  console.log('✅ Anthropic SDK installed\n');
} catch (error) {
  console.log('⚠️ Failed to install Anthropic SDK (may already be installed)\n');
}

try {
  console.log('Installing @google/generative-ai...');
  execSync('npm install @google/generative-ai@^0.21.0', { stdio: 'inherit' });
  console.log('✅ Google Gemini SDK installed\n');
} catch (error) {
  console.log('⚠️ Failed to install Google Gemini SDK (may already be installed)\n');
}

// Step 2: Check for .env.local
console.log('🔑 Step 2: Checking environment variables...\n');
const envPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', '.env.example');

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf-8');
  console.log('✅ Found .env.local file\n');
} else {
  console.log('⚠️ .env.local not found, will create it\n');
}

// Step 3: Check existing keys
const hasOpenAI = envContent.includes('OPENAI_API_KEY=') && !envContent.includes('OPENAI_API_KEY=sk-...');
const hasAnthropic = envContent.includes('ANTHROPIC_API_KEY=') && !envContent.includes('ANTHROPIC_API_KEY=sk-ant-...');
const hasGoogle = envContent.includes('GOOGLE_API_KEY=') && !envContent.includes('GOOGLE_API_KEY=AIza...');

console.log('📊 Current API Keys Status:');
console.log(`  ${hasOpenAI ? '✅' : '❌'} OpenAI API Key`);
console.log(`  ${hasAnthropic ? '✅' : '❌'} Anthropic API Key`);
console.log(`  ${hasGoogle ? '✅' : '❌'} Google API Key\n`);

// Step 4: Guide user to get missing keys
if (!hasAnthropic || !hasGoogle) {
  console.log('🔗 Step 3: Get API Keys\n');
  
  if (!hasAnthropic) {
    console.log('📝 Anthropic Claude API Key:');
    console.log('   1. Go to: https://console.anthropic.com/');
    console.log('   2. Sign up / Log in');
    console.log('   3. Navigate to API Keys');
    console.log('   4. Create a new API key');
    console.log('   5. Copy the key (starts with sk-ant-)\n');
  }
  
  if (!hasGoogle) {
    console.log('📝 Google Gemini API Key:');
    console.log('   1. Go to: https://makersuite.google.com/app/apikey');
    console.log('   2. Sign in with Google account');
    console.log('   3. Create API key');
    console.log('   4. Copy the key (starts with AIza)\n');
  }
  
  console.log('💡 After getting your keys, run this script again or add them to .env.local:\n');
  console.log('   ANTHROPIC_API_KEY=sk-ant-your-key-here');
  console.log('   GOOGLE_API_KEY=AIza-your-key-here\n');
}

// Step 5: Update .env.local
if (!hasAnthropic || !hasGoogle) {
  console.log('📝 Step 4: Updating .env.local...\n');
  
  let newEnvContent = envContent;
  
  if (!envContent.includes('ANTHROPIC_API_KEY=')) {
    newEnvContent += '\n# Anthropic Claude API Key\n';
    newEnvContent += '# Get from: https://console.anthropic.com/\n';
    newEnvContent += 'ANTHROPIC_API_KEY=sk-ant-your-key-here\n';
  }
  
  if (!envContent.includes('GOOGLE_API_KEY=')) {
    newEnvContent += '\n# Google Gemini API Key\n';
    newEnvContent += '# Get from: https://makersuite.google.com/app/apikey\n';
    newEnvContent += 'GOOGLE_API_KEY=AIza-your-key-here\n';
  }
  
  fs.writeFileSync(envPath, newEnvContent);
  console.log('✅ .env.local updated with placeholder keys\n');
  console.log('⚠️ Remember to replace the placeholder keys with your actual API keys!\n');
}

// Step 6: Test providers
console.log('🧪 Step 5: Testing providers...\n');

try {
  const { getAvailableProviders } = require('../lib/llm-providers');
  const providers = getAvailableProviders();
  
  if (providers.length === 0) {
    console.log('❌ No providers available. Make sure API keys are set correctly.\n');
  } else {
    console.log('✅ Available Providers:');
    providers.forEach(p => {
      console.log(`   ✅ ${p.name} (${p.models.length} models available)`);
    });
    console.log('');
  }
} catch (error) {
  console.log('⚠️ Could not test providers (this is normal if keys are not set yet)');
  console.log(`   Error: ${error.message}\n`);
}

// Step 7: Create Vercel setup guide
console.log('☁️ Step 6: Vercel Setup\n');
console.log('To add API keys to Vercel:');
console.log('1. Go to: https://vercel.com/your-project/settings/environment-variables');
console.log('2. Add each key:');
console.log('   - ANTHROPIC_API_KEY');
console.log('   - GOOGLE_API_KEY');
console.log('3. Redeploy your project\n');

// Summary
console.log('========================================\n');
console.log('✅ Setup Complete!\n');
console.log('📋 Next Steps:');
console.log('1. Get your API keys (see links above)');
console.log('2. Add them to .env.local (or Vercel)');
console.log('3. Run: npm run test-llm');
console.log('4. Deploy to Vercel\n');
console.log('📖 Full guide: ADD_MORE_LLM_MODELS.md\n');

