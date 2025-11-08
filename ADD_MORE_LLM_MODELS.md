# 🚀 Adding More LLM Models - Complete Guide

## Overview

Your AI system currently uses **OpenAI (GPT-3.5 & GPT-4)**. This guide shows you how to add:
- **Anthropic Claude** (Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku)
- **Google Gemini** (Gemini Pro, Gemini 1.5 Pro, Gemini 1.5 Flash)
- **More providers** (easily extensible)

---

## 📦 Step 1: Install Required Packages

```bash
npm install @anthropic-ai/sdk @google/generative-ai
```

Or add to `package.json`:
```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.27.0",
    "@google/generative-ai": "^0.21.0"
  }
}
```

---

## 🔑 Step 2: Get API Keys

### Anthropic Claude
1. Go to https://console.anthropic.com/
2. Sign up / Log in
3. Navigate to **API Keys**
4. Create a new API key
5. Copy the key

### Google Gemini
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create API key
4. Copy the key

---

## ⚙️ Step 3: Add Environment Variables

Add to your `.env.local` file (or Vercel Environment Variables):

```env
# Existing
OPENAI_API_KEY=sk-...

# New - Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# New - Google Gemini
GOOGLE_API_KEY=AIza...
```

**For Vercel:**
1. Go to your project → Settings → Environment Variables
2. Add each key
3. Redeploy

---

## 🎯 Step 4: Model Selection Strategy

The system automatically selects the best model for each service:

### iLawyer (Legal)
- **Primary:** GPT-4 (most accurate)
- **Fallback:** Claude 3.5 Sonnet → GPT-4o → Gemini 1.5 Pro

### ProVet (Veterinary)
- **Primary:** GPT-3.5-turbo (fast, cost-effective)
- **Fallback:** Gemini 1.5 Flash → Claude 3 Haiku → GPT-4o-mini

### Business Consulting
- **Primary:** GPT-3.5-turbo
- **Fallback:** Gemini Pro → Claude 3 Haiku

### Creative Services
- **Primary:** GPT-4o (creative, balanced)
- **Fallback:** Claude 3.5 Sonnet → Gemini 1.5 Pro

---

## 🔄 Step 5: Automatic Fallback

The system automatically:
1. Tries the primary model
2. If it fails, tries fallback models in order
3. Returns the first successful response
4. Logs which model was used

---

## 📊 Step 6: Usage Examples

### Basic Usage (Automatic)
```javascript
const { generateWithFallback } = require('./lib/llm-providers');

const result = await generateWithFallback(
  'ilawyer',  // service
  'What is an NDA?',  // query
  [
    { role: 'system', content: 'You are a legal assistant...' },
    { role: 'user', content: 'What is an NDA?' }
  ],
  { maxTokens: 500, temperature: 0.3 }
);

console.log(result.response);  // AI response
console.log(result.provider);  // "OpenAI" or "Anthropic Claude" or "Google Gemini"
console.log(result.model);     // "gpt-4" or "claude-3-5-sonnet-20241022" etc.
```

### Check Available Providers
```javascript
const { getAvailableProviders } = require('./lib/llm-providers');

const providers = getAvailableProviders();
console.log(providers);
// [
//   { key: 'openai', name: 'OpenAI', models: ['gpt-4', 'gpt-3.5-turbo', ...] },
//   { key: 'anthropic', name: 'Anthropic Claude', models: [...] },
//   { key: 'google', name: 'Google Gemini', models: [...] }
// ]
```

---

## 🎨 Step 7: Customize Model Selection

Edit `lib/llm-providers.js` to customize:

```javascript
const serviceModelMap = {
  ilawyer: {
    primary: { provider: 'anthropic', model: 'claude-3-5-sonnet-20241022' },  // Use Claude instead
    fallback: [
      { provider: 'openai', model: 'gpt-4' },
      { provider: 'google', model: 'gemini-1.5-pro' }
    ]
  },
  // ... customize other services
};
```

---

## 💰 Cost Comparison

| Model | Cost (per 1M tokens) | Speed | Best For |
|-------|---------------------|-------|----------|
| GPT-4 | $30 input / $60 output | Medium | Legal, complex reasoning |
| GPT-3.5-turbo | $0.50 / $1.50 | Fast | General, cost-effective |
| Claude 3.5 Sonnet | $3 / $15 | Fast | Long context, accuracy |
| Claude 3 Haiku | $0.25 / $1.25 | Very Fast | Simple tasks, speed |
| Gemini 1.5 Pro | $1.25 / $5 | Fast | Multimodal, long context |
| Gemini 1.5 Flash | $0.075 / $0.30 | Very Fast | Simple, cost-effective |

---

## 🚀 Benefits of Multi-Model System

1. **Reliability** - If one provider is down, others work
2. **Cost Optimization** - Use cheaper models for simple tasks
3. **Performance** - Use faster models when speed matters
4. **Quality** - Use best models for critical tasks (legal)
5. **Flexibility** - Easy to add new providers

---

## 🔧 Troubleshooting

### "Provider not available"
- Check API key is set correctly
- Verify package is installed: `npm list @anthropic-ai/sdk`
- Check environment variables are loaded

### "All providers failed"
- Check API keys are valid
- Check rate limits
- Check internet connection
- Review error logs

### "Model not found"
- Check model name is correct
- Some models may require specific API access
- Check provider documentation

---

## 📝 Next Steps

1. ✅ Install packages: `npm install @anthropic-ai/sdk @google/generative-ai`
2. ✅ Get API keys from Anthropic and Google
3. ✅ Add to `.env.local` and Vercel
4. ✅ Test with: `node scripts/test-llm-providers.js`
5. ✅ Deploy and monitor usage

---

## 🎯 Advanced: Add More Providers

To add a new provider (e.g., Cohere, Mistral):

1. Add to `PROVIDERS` in `lib/llm-providers.js`:
```javascript
cohere: {
  name: 'Cohere',
  models: { 'command': { maxTokens: 4096, cost: 'low', speed: 'fast' } },
  init: () => {
    if (process.env.COHERE_API_KEY) {
      const Cohere = require('cohere-ai');
      return new Cohere({ apiKey: process.env.COHERE_API_KEY });
    }
    return null;
  },
  generate: async (client, model, messages, options) => {
    // Implementation
  }
}
```

2. Add environment variable: `COHERE_API_KEY=...`
3. Add to service model maps
4. Done! ✅

---

**Your AI system is now multi-model ready! 🎉**

