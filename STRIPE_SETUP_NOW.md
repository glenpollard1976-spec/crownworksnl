# 💳 STRIPE SETUP - STEP BY STEP

## 🎯 What You Need (2 Keys)

1. **Stripe Secret Key** (from API Keys page)
2. **Webhook Secret** (from Webhook endpoint)

---

## STEP 1: Get Your Stripe Secret Key

1. **Go to:** https://dashboard.stripe.com/apikeys
2. **Find:** "Secret key" section
3. **Click:** "Reveal test key" (for testing) OR "Reveal live key" (for production)
4. **Copy** the key (starts with `sk_test_` or `sk_live_`)
5. **Save it** somewhere safe (you'll need it in Step 3)

**Example:** `sk_live_51AbC123...` or `sk_test_51AbC123...`

---

## STEP 2: Create Webhook Endpoint

### 2a. Go to Webhooks Page
1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Click:** "Add endpoint" button (top right)

### 2b. Configure Endpoint
1. **Endpoint URL:** Enter `https://crownworksnl.com/api/webhook`
2. **Click:** "Select events" or "Select all events"
3. **Important events to select:**
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
4. **Click:** "Add endpoint"

### 2c. Get Webhook Secret
1. **After creating**, click on the endpoint name
2. **Find:** "Signing secret" section
3. **Click:** "Reveal" or "Click to reveal"
4. **Copy** the secret (starts with `whsec_`)
5. **Save it** somewhere safe

**Example:** `whsec_1234567890abcdef...`

---

## STEP 3: Add Keys to Vercel

### 3a. Go to Vercel
1. **Go to:** https://vercel.com/dashboard
2. **Click** your `crownworksnl` project
3. **Click** "Settings" tab
4. **Click** "Environment Variables" (left sidebar)

### 3b. Add Stripe Secret Key
1. **Click** "Add New" button
2. **Name:** `STRIPE_SECRET_KEY`
3. **Value:** Paste your Stripe secret key (from Step 1)
4. **Environment:** Check ✅ **Production**
5. **Click** "Save"

### 3c. Add Webhook Secret
1. **Click** "Add New" button again
2. **Name:** `STRIPE_WEBHOOK_SECRET`
3. **Value:** Paste your webhook secret (from Step 2c)
4. **Environment:** Check ✅ **Production**
5. **Click** "Save"

### 3d. Add Site URL (if not already there)
1. **Click** "Add New" button
2. **Name:** `NEXT_PUBLIC_SITE_URL`
3. **Value:** `https://crownworksnl.com`
4. **Environment:** Check ✅ **Production**
5. **Click** "Save"

---

## STEP 4: Redeploy

After adding keys:
1. Vercel will **auto-redeploy** (or manually trigger redeploy)
2. **Wait 2-3 minutes** for deployment
3. **Test** by clicking a payment button on your site

---

## ✅ Verification Checklist

- [ ] Stripe Secret Key copied (starts with `sk_`)
- [ ] Webhook endpoint created
- [ ] Webhook Secret copied (starts with `whsec_`)
- [ ] `STRIPE_SECRET_KEY` added to Vercel
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` added to Vercel
- [ ] Site redeployed
- [ ] Payment button tested

---

## 🧪 Test Payment

1. **Go to:** https://crownworksnl.com
2. **Click** "Subscribe - $1,499/month" button
3. **Use test card:** `4242 4242 4242 4242`
4. **Any future expiry date**
5. **Any CVC**
6. **Complete payment**
7. **Should redirect** to success page

---

## 🐛 Troubleshooting

### "Stripe is not configured"
- ✅ Check `STRIPE_SECRET_KEY` is in Vercel
- ✅ Check it's set for **Production** environment
- ✅ Redeploy after adding

### "Webhook verification failed"
- ✅ Check `STRIPE_WEBHOOK_SECRET` is in Vercel
- ✅ Check webhook URL is correct: `https://crownworksnl.com/api/webhook`
- ✅ Check webhook secret matches (starts with `whsec_`)

### Payment not processing
- ✅ Check you're using **live keys** in production (not test keys)
- ✅ Check Stripe account is activated
- ✅ Check browser console for errors

---

## 🎯 Quick Links

- **API Keys:** https://dashboard.stripe.com/apikeys
- **Webhooks:** https://dashboard.stripe.com/webhooks
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Site:** https://crownworksnl.com

---

**Once you complete these steps, your payment system will be fully functional!** 🚀


