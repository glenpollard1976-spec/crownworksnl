/**
 * Multi-LLM Provider System
 * Supports OpenAI, Anthropic Claude, Google Gemini, and more
 * Automatic fallback and model selection
 */

// Provider configurations
const PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: {
      'gpt-4': { maxTokens: 8192, cost: 'high', speed: 'medium' },
      'gpt-4-turbo': { maxTokens: 128000, cost: 'high', speed: 'fast' },
      'gpt-3.5-turbo': { maxTokens: 16385, cost: 'low', speed: 'fast' },
      'gpt-4o': { maxTokens: 128000, cost: 'medium', speed: 'fast' },
      'gpt-4o-mini': { maxTokens: 128000, cost: 'low', speed: 'very-fast' }
    },
    init: () => {
      if (process.env.OPENAI_API_KEY) {
        const OpenAI = require('openai').default;
        return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      }
      return null;
    },
    generate: async (client, model, messages, options = {}) => {
      const completion = await client.chat.completions.create({
        model: model,
        messages: messages,
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
      });
      return completion.choices[0]?.message?.content || '';
    }
  },
  
  anthropic: {
    name: 'Anthropic Claude',
    models: {
      'claude-3-5-sonnet-20241022': { maxTokens: 200000, cost: 'medium', speed: 'fast' },
      'claude-3-opus-20240229': { maxTokens: 200000, cost: 'high', speed: 'medium' },
      'claude-3-sonnet-20240229': { maxTokens: 200000, cost: 'medium', speed: 'fast' },
      'claude-3-haiku-20240307': { maxTokens: 200000, cost: 'low', speed: 'very-fast' }
    },
    init: () => {
      if (process.env.ANTHROPIC_API_KEY) {
        const Anthropic = require('@anthropic-ai/sdk').default;
        return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      }
      return null;
    },
    generate: async (client, model, messages, options = {}) => {
      // Convert OpenAI format to Anthropic format
      const systemMessage = messages.find(m => m.role === 'system')?.content || '';
      const userMessages = messages.filter(m => m.role !== 'system');
      
      const response = await client.messages.create({
        model: model,
        max_tokens: options.maxTokens || 1024,
        temperature: options.temperature || 0.7,
        system: systemMessage,
        messages: userMessages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))
      });
      
      return response.content[0]?.text || '';
    }
  },
  
  google: {
    name: 'Google Gemini',
    models: {
      'gemini-pro': { maxTokens: 32768, cost: 'low', speed: 'fast' },
      'gemini-pro-vision': { maxTokens: 16384, cost: 'low', speed: 'medium' },
      'gemini-1.5-pro': { maxTokens: 1048576, cost: 'medium', speed: 'fast' },
      'gemini-1.5-flash': { maxTokens: 1048576, cost: 'low', speed: 'very-fast' }
    },
    init: () => {
      if (process.env.GOOGLE_API_KEY) {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        return new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
      }
      return null;
    },
    generate: async (client, model, messages, options = {}) => {
      const genModel = client.getGenerativeModel({ model: model });
      
      // Convert messages to Gemini format
      const systemMessage = messages.find(m => m.role === 'system')?.content || '';
      const conversation = messages
        .filter(m => m.role !== 'system')
        .map(m => m.content)
        .join('\n\n');
      
      const prompt = systemMessage ? `${systemMessage}\n\n${conversation}` : conversation;
      
      const result = await genModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: options.maxTokens || 1024,
          temperature: options.temperature || 0.7,
        }
      });
      
      return result.response.text() || '';
    }
  }
};

// Initialize all available providers
const initializedProviders = {};
Object.keys(PROVIDERS).forEach(providerKey => {
  try {
    const provider = PROVIDERS[providerKey];
    const client = provider.init();
    if (client) {
      initializedProviders[providerKey] = {
        client,
        provider,
        available: true
      };
      console.log(`✅ ${provider.name} initialized`);
    }
  } catch (error) {
    console.log(`⚠️ ${PROVIDERS[providerKey].name} not available: ${error.message}`);
  }
});

/**
 * Get best model for a service
 * @param {string} service - Service type (ilawyer, provet, business, creative)
 * @param {object} preferences - Model preferences (cost, speed, quality)
 */
function getBestModel(service, preferences = {}) {
  const serviceModelMap = {
    ilawyer: {
      primary: { provider: 'openai', model: 'gpt-4' },
      fallback: [
        { provider: 'anthropic', model: 'claude-3-5-sonnet-20241022' },
        { provider: 'openai', model: 'gpt-4o' },
        { provider: 'google', model: 'gemini-1.5-pro' }
      ]
    },
    provet: {
      primary: { provider: 'openai', model: 'gpt-3.5-turbo' },
      fallback: [
        { provider: 'google', model: 'gemini-1.5-flash' },
        { provider: 'anthropic', model: 'claude-3-haiku-20240307' },
        { provider: 'openai', model: 'gpt-4o-mini' }
      ]
    },
    business: {
      primary: { provider: 'openai', model: 'gpt-3.5-turbo' },
      fallback: [
        { provider: 'google', model: 'gemini-pro' },
        { provider: 'anthropic', model: 'claude-3-haiku-20240307' }
      ]
    },
    creative: {
      primary: { provider: 'openai', model: 'gpt-4o' },
      fallback: [
        { provider: 'anthropic', model: 'claude-3-5-sonnet-20241022' },
        { provider: 'google', model: 'gemini-1.5-pro' }
      ]
    }
  };
  
  const config = serviceModelMap[service] || serviceModelMap.business;
  
  // Check if primary provider is available
  if (initializedProviders[config.primary.provider]) {
    return {
      provider: config.primary.provider,
      model: config.primary.model,
      fallbacks: config.fallback
    };
  }
  
  // Use first available fallback
  for (const fallback of config.fallback) {
    if (initializedProviders[fallback.provider]) {
      return {
        provider: fallback.provider,
        model: fallback.model,
        fallbacks: config.fallback.filter(f => f.provider !== fallback.provider)
      };
    }
  }
  
  return null;
}

/**
 * Generate response using multiple LLM providers with automatic fallback
 * @param {string} service - Service type
 * @param {string} query - User query
 * @param {array} messages - Message history
 * @param {object} options - Generation options
 */
async function generateWithFallback(service, query, messages, options = {}) {
  const modelConfig = getBestModel(service);
  
  if (!modelConfig) {
    throw new Error('No LLM providers available');
  }
  
  const providers = [modelConfig, ...modelConfig.fallbacks];
  
  for (const providerConfig of providers) {
    const { provider: providerKey, model } = providerConfig;
    
    if (!initializedProviders[providerKey]) {
      console.log(`⚠️ ${PROVIDERS[providerKey].name} not available, trying next...`);
      continue;
    }
    
    try {
      const provider = PROVIDERS[providerKey];
      const client = initializedProviders[providerKey].client;
      
      console.log(`🤖 Using ${provider.name} ${model} for ${service}`);
      
      const response = await provider.generate(client, model, messages, {
        maxTokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
        ...options
      });
      
      return {
        response,
        provider: provider.name,
        model,
        success: true
      };
    } catch (error) {
      console.error(`❌ ${PROVIDERS[providerKey].name} error:`, error.message);
      // Try next provider
      continue;
    }
  }
  
  throw new Error('All LLM providers failed');
}

/**
 * Get available providers
 */
function getAvailableProviders() {
  return Object.keys(initializedProviders).map(key => ({
    key,
    name: PROVIDERS[key].name,
    models: Object.keys(PROVIDERS[key].models)
  }));
}

/**
 * Check if a provider is available
 */
function isProviderAvailable(providerKey) {
  return !!initializedProviders[providerKey];
}

module.exports = {
  PROVIDERS,
  initializedProviders,
  getBestModel,
  generateWithFallback,
  getAvailableProviders,
  isProviderAvailable
};

