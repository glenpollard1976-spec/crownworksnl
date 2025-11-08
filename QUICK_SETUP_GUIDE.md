# 🚀 QUICK SETUP GUIDE - 10 MINUTES
## CrownWorksNL - Get Everything Working

---

## ⚡ FASTEST WAY TO SETUP

### Run This:
```bash
# Double-click this file:
SETUP_NOW.bat
```

**OR** run: `powershell -ExecutionPolicy Bypass -File AUTO_SETUP.ps1`

This will open all the pages you need!

---

## 📋 STEP-BY-STEP (10 MINUTES)

### 1️⃣ Stripe Setup (5 min) - REQUIRED FOR PAYMENTS

**Get Your Keys:**
1. **Stripe Dashboard:** https://dashboard.stripe.com/apikeys
   - Copy **Secret Key** (`sk_live_...` or `sk_test_...`)

2. **Stripe Webhooks:** https://dashboard.stripe.com/webhooks
   - Click **"Add endpoint"**
   - **URL:** `https://crownworksnl.com/api/webhook`
   - **Events:** Select all payment events
   - Copy **Webhook Secret** (`whsec_...`)

**Add to Vercel:**
- Go to: https://vercel.com/dashboard
- Your Project → Settings → Environment Variables
- Add:
  - `STRIPE_SECRET_KEY` = `sk_live_...`
  - `STRIPE_WEBHOOK_SECRET` = `whsec_...`

---

### 2️⃣ Resend Setup (3 min) - REQUIRED FOR EMAIL

**Get Your Key:**
1. **Resend:** https://resend.com
   - Sign up (free - 3,000 emails/month)
   - Get API key from dashboard (`re_...`)

**Add to Vercel:**
- `RESEND_API_KEY` = `re_...`

**Optional:** Verify your domain in Resend (or use their test domain)

---

### 3️⃣ OpenAI Setup (2 min) - OPTIONAL

**Get Your Key:**
1. **OpenAI:** https://platform.openai.com/api-keys
   - Create API key (`sk-...`)

**Add to Vercel:**
- `OPENAI_API_KEY` = `sk-...`

**Note:** AI Agent works without this (uses rule-based responses), but OpenAI makes it smarter.

---

## ✅ VERIFY SETUP

### Test Contact Form:
1. Fill out contact form on your site
2. Submit
3. Check your email (should receive message)
4. Customer should receive confirmation email

### Test Stripe:
1. Click "Subscribe - $1,499/month"
2. Use test card: `4242 4242 4242 4242`
3. Complete payment
4. Check Stripe dashboard for payment

### Test AI Agent:
1. Click chat widget
2. Ask a question
3. Should get intelligent response

---

## 🎯 ENVIRONMENT VARIABLES CHECKLIST

Add these in Vercel:

| Variable | Value | Status |
|----------|-------|--------|
| `STRIPE_SECRET_KEY` | `sk_live_...` | ⬜ |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | ⬜ |
| `RESEND_API_KEY` | `re_...` | ⬜ |
| `OPENAI_API_KEY` | `sk-...` | ⬜ Optional |
| `CONTACT_EMAIL` | `crownworksnl@gmail.com` | ⬜ Optional |

---

## 🚀 AFTER ADDING KEYS

1. **Vercel will auto-redeploy** (or manually redeploy)
2. **Wait 2-3 minutes** for deployment
3. **Test everything** on live site
4. **Done!** Your site is fully functional

---

## 📞 NEED HELP?

- **Stripe Issues:** https://support.stripe.com
- **Resend Issues:** https://resend.com/docs
- **Vercel Issues:** https://vercel.com/docs

---

**Setup Time:** 10 minutes  
**Status:** ⚠️ **REQUIRED FOR FULL FUNCTIONALITY**

