# 💳 GET YOUR STRIPE KEYS - STEP BY STEP
## You Have Stripe Dashboard Open - Let's Get Your Keys!

---

## 🎯 STEP 1: GET SECRET KEY (2 minutes)

### In Stripe Dashboard:

1. **You should see:** "API keys" section
2. **Look for:** "Secret key" (starts with `sk_live_...` or `sk_test_...`)
3. **Click:** "Reveal test key" or "Reveal live key"
4. **Copy the key:** It looks like `sk_live_51AbC123...` or `sk_test_51AbC123...`

**⚠️ IMPORTANT:**
- Use **test key** (`sk_test_...`) for testing first
- Use **live key** (`sk_live_...`) for real payments

---

## 🎯 STEP 2: CREATE WEBHOOK (3 minutes)

### In Stripe Dashboard:

1. **Click:** "Webhooks" in left sidebar (or go to: https://dashboard.stripe.com/webhooks)
2. **Click:** "Add endpoint" button
3. **Endpoint URL:** Type exactly: `https://crownworksnl.com/api/webhook`
4. **Description:** "CrownWorksNL Payment Webhook"
5. **Events to send:** Click "Select events" and choose:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
6. **Click:** "Add endpoint"
7. **Copy the "Signing secret":** It looks like `whsec_1234abcd...`

---

## 🎯 STEP 3: ADD TO VERCEL (2 minutes)

### Open Vercel Dashboard:

1. **Go to:** https://vercel.com/dashboard
2. **Click:** Your "crownworksnl" project
3. **Click:** "Settings" tab
4. **Click:** "Environment Variables" in left sidebar
5. **Add these 3 variables:**

   **Variable 1:**
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** Paste your secret key (`sk_live_...` or `sk_test_...`)
   - **Environment:** Production (and Preview if you want)
   - **Click:** "Save"

   **Variable 2:**
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** Paste your webhook secret (`whsec_...`)
   - **Environment:** Production (and Preview if you want)
   - **Click:** "Save"

   **Variable 3:**
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://crownworksnl.com`
   - **Environment:** Production
   - **Click:** "Save"

---

## ✅ STEP 4: REDEPLOY

### In Vercel Dashboard:

1. **Go to:** "Deployments" tab
2. **Click:** "Redeploy" on latest deployment
3. **OR:** Vercel will auto-redeploy after you add variables

**Wait 2-3 minutes for deployment to complete.**

---

## 🧪 STEP 5: TEST IT

### Test Payment:

1. **Go to:** https://crownworksnl.com
2. **Click:** "Subscribe - $1,499/month" button
3. **Should:** Open Stripe checkout (not show error)
4. **Use test card:** `4242 4242 4242 4242`
5. **Any future date, any CVC**
6. **Complete payment**
7. **Should redirect:** To success page

### Check Stripe Dashboard:

1. **Go to:** https://dashboard.stripe.com/payments
2. **Should see:** Your test payment
3. **Go to:** https://dashboard.stripe.com/webhooks
4. **Click:** Your webhook endpoint
5. **Should see:** Events being received

---

## ✅ YOU'RE DONE!

**Stripe is now fully configured!**

Your payment button will work and process real payments.

---

## 📋 QUICK REFERENCE

### Your Stripe Keys:
- **Secret Key:** `sk_live_...` or `sk_test_...`
- **Webhook Secret:** `whsec_...`

### Test Card:
- **Number:** `4242 4242 4242 4242`
- **Date:** Any future date
- **CVC:** Any 3 digits

---

**Next:** Set up Resend for email (3 minutes) - See `QUICK_SETUP_GUIDE.md`

