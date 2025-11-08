# 🧪 Webhook Testing Guide

## Your Webhook.site Testing URLs

You have these testing endpoints from Webhook.site:

- **Webhook URL:** `https://webhook.site/b71b6d20-1c12-45d7-9a55-07d7085ceaca`
- **Email Hook:** `b71b6d20-1c12-45d7-9a55-07d7085ceaca@emailhook.site`
- **DNS Hook:** `*.b71b6d20-1c12-45d7-9a55-07d7085ceaca.dnshook.site`
- **CLI Forward:** `whcli forward --token=b71b6d20-1c12-45d7-9a55-07d7085ceaca --target=https://localhost`

---

## ⚠️ Important: Testing vs Production

**Webhook.site is for TESTING only!**

- ✅ **Use Webhook.site** to see what Stripe sends (for debugging)
- ❌ **Don't use Webhook.site** for your live site
- ✅ **Use your real endpoint** for production: `https://crownworksnl.com/api/webhook`

---

## Step 1: Test with Webhook.site (Optional - For Learning)

If you want to see what Stripe sends:

1. **Go to Stripe Dashboard:** https://dashboard.stripe.com/webhooks
2. **Click "Add endpoint"**
3. **Endpoint URL:** `https://webhook.site/b71b6d20-1c12-45d7-9a55-07d7085ceaca`
4. **Select events:** Choose the events you want to test
5. **Click "Add endpoint"**
6. **Go to:** https://webhook.site/#!/view/b71b6d20-1c12-45d7-9a55-07d7085ceaca
7. **Trigger a test payment** on your site
8. **Watch** the webhook data arrive in real-time!

**After testing, DELETE this test endpoint** and create the real one below.

---

## Step 2: Create Your REAL Production Webhook

### 2a. Go to Stripe Webhooks
**Link:** https://dashboard.stripe.com/webhooks

### 2b. Add Endpoint
1. **Click:** "Add endpoint" (top right)
2. **Endpoint URL:** 
   ```
   https://crownworksnl.com/api/webhook
   ```
3. **Description (optional):** `CrownWorksNL Production Webhook`

### 2c. Select Events
**Click "Select events"** and check:
- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `payment_intent.payment_failed`

**OR** click **"Select all events"** to receive everything

### 2d. Create Endpoint
- **Click:** "Add endpoint"
- **Wait** for Stripe to create it

### 2e. Get Webhook Secret
1. **Click** on the newly created endpoint
2. **Find:** "Signing secret" section
3. **Click:** "Reveal" or "Click to reveal"
4. **Copy** the secret (starts with `whsec_`)
5. **Save it** - you'll need it for Vercel!

**Example:** `whsec_1234567890abcdef...`

---

## Step 3: Add Webhook Secret to Vercel

1. **Go to:** https://vercel.com/dashboard
2. **Click** your `crownworksnl` project
3. **Click** "Settings" tab
4. **Click** "Environment Variables" (left sidebar)
5. **Click** "Add New" button
6. **Name:** `STRIPE_WEBHOOK_SECRET`
7. **Value:** Paste your webhook secret (from Step 2e)
8. **Environment:** Check ✅ **Production**
9. **Click** "Save"

---

## Step 4: Verify You Have All Keys in Vercel

Make sure these are all set in Vercel:

- ✅ `STRIPE_SECRET_KEY` (your Stripe secret key)
- ✅ `STRIPE_WEBHOOK_SECRET` (your webhook secret)
- ✅ `NEXT_PUBLIC_SITE_URL` = `https://crownworksnl.com`
- ✅ `RESEND_API_KEY` (for contact form emails)
- ✅ `OPENAI_API_KEY` (optional, for AI agent)

---

## Step 5: Redeploy

After adding the webhook secret:
1. Vercel will **auto-redeploy** (or manually trigger redeploy)
2. **Wait 2-3 minutes** for deployment
3. **Test** by clicking a payment button on your site

---

## 🧪 Test Your Production Webhook

1. **Go to:** https://crownworksnl.com
2. **Click** "Subscribe - $1,499/month" button
3. **Use test card:** `4242 4242 4242 4242`
4. **Any future expiry date** (e.g., 12/25)
5. **Any CVC** (e.g., 123)
6. **Complete payment**
7. **Check Vercel logs** to see webhook events:
   - Go to: https://vercel.com/dashboard
   - Click your project → "Deployments" → Latest deployment → "Functions" → `/api/webhook` → "Logs"

---

## ✅ Verification Checklist

- [ ] Test endpoint created in Stripe (optional, for learning)
- [ ] Production endpoint created: `https://crownworksnl.com/api/webhook`
- [ ] Webhook secret copied (starts with `whsec_`)
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel
- [ ] Site redeployed
- [ ] Test payment completed
- [ ] Webhook events visible in Vercel logs

---

## 🎯 Quick Links

- **Stripe Webhooks:** https://dashboard.stripe.com/webhooks
- **Stripe API Keys:** https://dashboard.stripe.com/apikeys
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Site:** https://crownworksnl.com
- **Webhook.site (Testing):** https://webhook.site/#!/view/b71b6d20-1c12-45d7-9a55-07d7085ceaca

---

## 🐛 Troubleshooting

### "Webhook not receiving events"
- ✅ Check endpoint URL is: `https://crownworksnl.com/api/webhook` (not Webhook.site)
- ✅ Check webhook secret is in Vercel
- ✅ Check site is redeployed
- ✅ Check Vercel logs for errors

### "Webhook signature verification failed"
- ✅ Make sure `STRIPE_WEBHOOK_SECRET` is correct
- ✅ Make sure it's the secret from the **production endpoint** (not test)
- ✅ Make sure it starts with `whsec_`

---

**Remember:** Webhook.site is great for testing, but your live site needs the real endpoint! 🚀

