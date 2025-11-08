# 🚀 Auto-Setup Multi-LLM Models - ONE COMMAND

## Quick Start

### Option 1: PowerShell (Recommended)
```bash
npm run auto-setup-llm
```

### Option 2: Batch File
```bash
scripts\auto-setup-llm.bat
```

### Option 3: Node Script
```bash
npm run setup-llm
```

---

## What It Does Automatically

1. ✅ **Installs packages** (`@anthropic-ai/sdk`, `@google/generative-ai`)
2. ✅ **Checks your API keys** (shows what you have/missing)
3. ✅ **Opens browser** to get API keys (if needed)
4. ✅ **Updates .env.local** with placeholder keys
5. ✅ **Tests providers** to verify everything works
6. ✅ **Shows next steps**

---

## After Running

1. **Get your API keys** (browsers will open automatically):
   - Anthropic: https://console.anthropic.com/
   - Google: https://makersuite.google.com/app/apikey

2. **Add keys to `.env.local`**:
   ```env
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   GOOGLE_API_KEY=AIza-your-actual-key-here
   ```

3. **Test it**:
   ```bash
   npm run test-llm
   ```

4. **Deploy to Vercel** (add keys in Vercel dashboard)

---

## That's It! 🎉

Your AI system now has:
- ✅ OpenAI (GPT-4, GPT-3.5)
- ✅ Anthropic Claude (Claude 3.5 Sonnet, Claude 3 Haiku)
- ✅ Google Gemini (Gemini Pro, Gemini 1.5)

**Automatic fallback** - if one fails, others work!

---

## Troubleshooting

**"No providers available"**
- Make sure API keys are set in `.env.local`
- Check keys are correct (no typos)
- Restart dev server: `npm run dev`

**"Package install failed"**
- Run: `npm install` first
- Check internet connection
- Try: `npm cache clean --force`

---

**Just run: `npm run auto-setup-llm` and follow the prompts!** 🚀

