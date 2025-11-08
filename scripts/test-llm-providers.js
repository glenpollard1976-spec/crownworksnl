/**
 * Test script for multi-LLM provider system
 * Tests all available providers and fallback logic
 */

const { 
  getAvailableProviders, 
  generateWithFallback,
  isProviderAvailable 
} = require('../lib/llm-providers');

async function testProviders() {
  console.log('🧪 Testing Multi-LLM Provider System\n');
  
  // Check available providers
  console.log('📊 Available Providers:');
  const providers = getAvailableProviders();
  if (providers.length === 0) {
    console.log('❌ No providers available. Check your API keys.\n');
    return;
  }
  
  providers.forEach(p => {
    console.log(`  ✅ ${p.name} (${p.models.length} models)`);
  });
  console.log('');
  
  // Test each service
  const services = ['ilawyer', 'provet', 'business', 'creative'];
  
  for (const service of services) {
    console.log(`\n🔍 Testing ${service} service...`);
    
    try {
      const messages = [
        {
          role: 'system',
          content: `You are a helpful assistant for ${service}.`
        },
        {
          role: 'user',
          content: 'Hello, can you help me?'
        }
      ];
      
      const result = await generateWithFallback(
        service,
        'Hello, can you help me?',
        messages,
        { maxTokens: 100, temperature: 0.7 }
      );
      
      console.log(`  ✅ Success!`);
      console.log(`  Provider: ${result.provider}`);
      console.log(`  Model: ${result.model}`);
      console.log(`  Response: ${result.response.substring(0, 100)}...`);
      
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
    }
  }
  
  console.log('\n✅ Testing complete!\n');
}

// Run tests
testProviders().catch(console.error);

