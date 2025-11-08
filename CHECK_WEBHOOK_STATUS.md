# 🔍 Check Webhook Endpoint Status

## Quick Check: Is Your Webhook Created?

### Method 1: Check Stripe Dashboard (Easiest)

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Look for:** An endpoint with URL `https://crownworksnl.com/api/webhook`
3. **If you see it:** ✅ Webhook is created!
4. **If you don't see it:** Follow the steps below to create it

---

## Create Webhook Endpoint (Manual Method)

### Step 1: Go to Webhooks Page
- **URL:** https://dashboard.stripe.com/webhooks
- **Click:** "Add endpoint" (top right button)

### Step 2: Configure Endpoint
1. **Endpoint URL:** 
   ```
   https://crownworksnl.com/api/webhook
   ```
2. **Description (optional):** `CrownWorksNL Payment Webhook`

### Step 3: Select Events
**Click "Select events"** and check these:
- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `payment_intent.payment_failed`

**OR** click **"Select all events"** to receive everything

### Step 4: Create Endpoint
- **Click:** "Add endpoint"
- **Wait** for Stripe to create it

### Step 5: Get Webhook Secret
1. **Click** on the newly created endpoint
2. **Find:** "Signing secret" section
3. **Click:** "Reveal" or "Click to reveal"
4. **Copy** the secret (starts with `whsec_`)
5. **Save it** - you'll need it for Vercel!

**Example:** `whsec_1234567890abcdef...`

---

## ✅ Verification Checklist

- [ ] Webhook endpoint exists in Stripe dashboard
- [ ] Endpoint URL is: `https://crownworksnl.com/api/webhook`
- [ ] Webhook secret copied (starts with `whsec_`)
- [ ] Webhook secret added to Vercel as `STRIPE_WEBHOOK_SECRET`
- [ ] Site redeployed after adding secret

---

## 🧪 Test Your Webhook

### Option 1: Use Webhook.site (What you're looking at)
1. **Copy** your Webhook.site URL: `https://webhook.site/b71b6d20-1c12-45d7-9a55-07d7085ceaca`
2. **Temporarily** create a test endpoint in Stripe pointing to this URL
3. **Trigger** a test payment
4. **See** the webhook data arrive at Webhook.site
5. **Switch back** to your real endpoint: `https://crownworksnl.com/api/webhook`

### Option 2: Test on Live Site
1. **Go to:** https://crownworksnl.com
2. **Click** a payment button
3. **Use test card:** `4242 4242 4242 4242`
4. **Complete** payment
5. **Check** Vercel logs for webhook events

---

## 🎯 Next Steps After Creating Webhook

1. **Add Webhook Secret to Vercel:**
   - Go to: https://vercel.com/dashboard
   - Select your project
   - Settings → Environment Variables
   - Add `STRIPE_WEBHOOK_SECRET` with your `whsec_...` value
   - Set to **Production** environment

2. **Redeploy:**
   - Vercel will auto-redeploy, or manually trigger it

3. **Test Payment:**
   - Go to your site
   - Click a payment button
   - Complete test payment
   - Check Vercel logs to see webhook events

---

## 🐛 Troubleshooting

### "Webhook not receiving events"
- ✅ Check endpoint URL is correct
- ✅ Check webhook secret is in Vercel
- ✅ Check site is redeployed
- ✅ Check Vercel logs for errors

### "Webhook signature verification failed"
- ✅ Make sure `STRIPE_WEBHOOK_SECRET` is correct
- ✅ Make sure it's the secret from the **correct endpoint**
- ✅ Make sure it starts with `whsec_`

---

**Quick Links:**
- **Stripe Webhooks:** https://dashboard.stripe.com/webhooks
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Site:** https://crownworksnl.com

