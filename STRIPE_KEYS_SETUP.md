# 💳 STRIPE KEYS SETUP - URGENT
## Get Your Stripe Keys in 5 Minutes

---

## ⚠️ YOUR SITE NEEDS THESE TO ACCEPT PAYMENTS

**Without Stripe keys, the payment button will show an error.**

---

## 🚀 QUICK SETUP (5 MINUTES)

### Step 1: Get Your Stripe Keys

1. **Go to:** https://dashboard.stripe.com/apikeys
2. **If you don't have an account:**
   - Sign up at https://stripe.com (free)
   - Complete business verification
   - Add bank account (to receive payments)

3. **Copy these keys:**
   - **Secret Key:** `sk_live_xxxxxxxxxxxxx` (for production)
   - **OR Test Key:** `sk_test_xxxxxxxxxxxxx` (for testing)

### Step 2: Get Webhook Secret

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Click:** "Add endpoint"
3. **Endpoint URL:** `https://crownworksnl.com/api/webhook`
4. **Events to send:**
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. **Click:** "Add endpoint"
6. **Copy the webhook secret:** `whsec_xxxxxxxxxxxxx`

### Step 3: Add to Vercel

1. **Go to:** https://vercel.com/dashboard
2. **Click:** Your "crownworksnl" project
3. **Go to:** Settings → Environment Variables
4. **Add these 3 variables:**

   | Variable Name | Value | Example |
   |--------------|-------|---------|
   | `STRIPE_SECRET_KEY` | Your Stripe secret key | `sk_live_51AbC...` |
   | `STRIPE_WEBHOOK_SECRET` | Your webhook secret | `whsec_1234...` |
   | `NEXT_PUBLIC_SITE_URL` | Your site URL | `https://crownworksnl.com` |

5. **Click:** "Save"
6. **Redeploy** your site (or wait for auto-deploy)

---

## ✅ TESTING

### Test Mode (Recommended First):
1. Use **test keys** (`sk_test_...`)
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVC
5. Test the payment flow

### Go Live:
1. Switch to **live keys** (`sk_live_...`)
2. Update webhook to use live endpoint
3. Test with real card (small amount)
4. Verify payment in Stripe dashboard

---

## 🔗 QUICK LINKS

- **Stripe Dashboard:** https://dashboard.stripe.com
- **API Keys:** https://dashboard.stripe.com/apikeys
- **Webhooks:** https://dashboard.stripe.com/webhooks
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## ⚠️ IMPORTANT

- **Never commit** Stripe keys to GitHub
- **Use test keys** for development
- **Use live keys** only in production (Vercel)
- **Keep webhook secret** secure

---

## ✅ AFTER SETUP

1. ✅ Test payment button
2. ✅ Complete a test payment
3. ✅ Check Stripe dashboard for payment
4. ✅ Verify webhook receives events
5. ✅ Check success page works

---

**Setup Time:** 5 minutes  
**Status:** ⚠️ **REQUIRED FOR PAYMENTS**

