/**
 * Interactive API Key Setup
 * Prompts user for API keys and adds them to .env.local automatically
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n🔑 Interactive API Key Setup\n');
  console.log('========================================\n');
  
  const envPath = path.join(__dirname, '..', '.env.local');
  let envContent = '';
  
  // Read existing .env.local
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }
  
  // Check existing keys
  const hasOpenAI = envContent.includes('OPENAI_API_KEY=sk-') && !envContent.includes('OPENAI_API_KEY=sk-...');
  const hasAnthropic = envContent.includes('ANTHROPIC_API_KEY=sk-ant-') && !envContent.includes('ANTHROPIC_API_KEY=sk-ant-...');
  const hasGoogle = envContent.includes('GOOGLE_API_KEY=AIza') && !envContent.includes('GOOGLE_API_KEY=AIza...');
  
  console.log('Current Status:');
  console.log(`  ${hasOpenAI ? '✅' : '❌'} OpenAI API Key`);
  console.log(`  ${hasAnthropic ? '✅' : '❌'} Anthropic API Key`);
  console.log(`  ${hasGoogle ? '✅' : '❌'} Google API Key\n`);
  
  // OpenAI
  if (!hasOpenAI) {
    console.log('📝 OpenAI API Key:');
    console.log('   Get from: https://platform.openai.com/api-keys\n');
    const openAIKey = await question('   Paste your OpenAI API key (or press Enter to skip): ');
    if (openAIKey && openAIKey.trim() && openAIKey.startsWith('sk-')) {
      if (envContent.includes('OPENAI_API_KEY=')) {
        envContent = envContent.replace(/OPENAI_API_KEY=.*/g, `OPENAI_API_KEY=${openAIKey.trim()}`);
      } else {
        envContent += `\nOPENAI_API_KEY=${openAIKey.trim()}\n`;
      }
      console.log('   ✅ OpenAI key added!\n');
    } else if (openAIKey.trim()) {
      console.log('   ⚠️ Invalid key format (should start with sk-)\n');
    }
  }
  
  // Anthropic
  if (!hasAnthropic) {
    console.log('📝 Anthropic Claude API Key:');
    console.log('   Get from: https://console.anthropic.com/\n');
    const anthropicKey = await question('   Paste your Anthropic API key (or press Enter to skip): ');
    if (anthropicKey && anthropicKey.trim() && anthropicKey.startsWith('sk-ant-')) {
      if (envContent.includes('ANTHROPIC_API_KEY=')) {
        envContent = envContent.replace(/ANTHROPIC_API_KEY=.*/g, `ANTHROPIC_API_KEY=${anthropicKey.trim()}`);
      } else {
        envContent += `\nANTHROPIC_API_KEY=${anthropicKey.trim()}\n`;
      }
      console.log('   ✅ Anthropic key added!\n');
    } else if (anthropicKey.trim()) {
      console.log('   ⚠️ Invalid key format (should start with sk-ant-)\n');
    }
  }
  
  // Google
  if (!hasGoogle) {
    console.log('📝 Google Gemini API Key:');
    console.log('   Get from: https://makersuite.google.com/app/apikey\n');
    const googleKey = await question('   Paste your Google API key (or press Enter to skip): ');
    if (googleKey && googleKey.trim() && googleKey.startsWith('AIza')) {
      if (envContent.includes('GOOGLE_API_KEY=')) {
        envContent = envContent.replace(/GOOGLE_API_KEY=.*/g, `GOOGLE_API_KEY=${googleKey.trim()}`);
      } else {
        envContent += `\nGOOGLE_API_KEY=${googleKey.trim()}\n`;
      }
      console.log('   ✅ Google key added!\n');
    } else if (googleKey.trim()) {
      console.log('   ⚠️ Invalid key format (should start with AIza)\n');
    }
  }
  
  // Save .env.local
  if (envContent) {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local updated!\n');
  }
  
  // Test providers
  console.log('🧪 Testing providers...\n');
  try {
    const { getAvailableProviders } = require('../lib/llm-providers');
    const providers = getAvailableProviders();
    
    if (providers.length > 0) {
      console.log('✅ Available Providers:');
      providers.forEach(p => {
        console.log(`   ✅ ${p.name} (${p.models.length} models)`);
      });
    } else {
      console.log('❌ No providers available yet');
      console.log('   Make sure you added valid API keys\n');
    }
  } catch (error) {
    console.log('⚠️ Could not test providers');
  }
  
  console.log('\n✅ Setup complete!\n');
  rl.close();
}

main().catch(console.error);

