# 💳 Stripe Payment Setup Guide

## ✅ What I Just Added

1. ✅ **Stripe installed** - `stripe` and `@stripe/stripe-js` packages
2. ✅ **Checkout API route** - `/app/api/checkout/route.js`
3. ✅ **Webhook handler** - `/app/api/webhook/route.js` (for payment confirmations)
4. ✅ **Success page** - `/app/success/page.js` (after payment)
5. ✅ **Payment buttons** - Added to pricing cards

---

## 🚀 Setup Steps (15 minutes)

### Step 1: Create Stripe Account

1. **Go to:** https://stripe.com
2. **Sign up** (free)
3. **Complete business verification**
4. **Add bank account** (to receive payments)

### Step 2: Get Your API Keys

1. **Go to:** https://dashboard.stripe.com/apikeys
2. **Copy these keys:**
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### Step 3: Add Keys to Environment Variables

**For Local Development:**
1. Create file: `.env.local` in your project root
2. Add:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**For Vercel (Production):**
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `STRIPE_SECRET_KEY` = `sk_live_your_live_key` (use live key in production)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_your_live_key`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_your_webhook_secret`
   - `NEXT_PUBLIC_SITE_URL` = `https://glenp-websitenl.vercel.app`

### Step 4: Set Up Webhook (For Payment Confirmations)

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Click:** "Add endpoint"
3. **Endpoint URL:** `https://glenp-websitenl.vercel.app/api/webhook`
4. **Events to send:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. **Copy webhook secret** (starts with `whsec_`)
6. **Add to environment variables** as `STRIPE_WEBHOOK_SECRET`

### Step 5: Create Products in Stripe Dashboard

1. **Go to:** https://dashboard.stripe.com/products
2. **Create Product 1:**
   - Name: "Crown Land Consultation"
   - Price: $299 CAD
   - One-time payment
   - Copy the Price ID (starts with `price_`)

3. **Create Product 2:**
   - Name: "Business Growth Package"
   - Price: $1,499 CAD
   - Recurring: Monthly
   - Copy the Price ID (starts with `price_`)

### Step 6: Update Code with Price IDs (Optional)

If you want to use Stripe Price IDs instead of amounts, update the checkout calls in `app/page.js`:

```javascript
body: JSON.stringify({
  priceId: 'price_your_price_id_here',
  packageName: 'Crown Land Consultation',
  isRecurring: false,
}),
```

---

## 🧪 Testing

### Test Mode:
- Use test keys (start with `pk_test_` and `sk_test_`)
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any CVC

### Test the Flow:
1. Click "Buy Now" on pricing card
2. Should redirect to Stripe checkout
3. Enter test card details
4. Complete payment
5. Should redirect to success page

---

## 🔒 Security Notes

1. **Never commit** `.env.local` to GitHub
2. **Use test keys** for development
3. **Use live keys** only in production (Vercel)
4. **Webhook secret** must match exactly

---

## 📊 Payment Flow

1. **Customer clicks** "Buy Now" button
2. **Frontend calls** `/api/checkout`
3. **Backend creates** Stripe checkout session
4. **Customer redirected** to Stripe checkout page
5. **Customer pays** on Stripe's secure page
6. **Stripe redirects** to `/success` page
7. **Webhook fires** to confirm payment (optional)

---

## 💰 Pricing Packages

### Package 1: Crown Land Consultation
- **Price:** $299 CAD (one-time)
- **Stripe Mode:** Payment
- **Button:** "Buy Now - $299"

### Package 2: Business Growth Package
- **Price:** $1,499 CAD/month (recurring)
- **Stripe Mode:** Subscription
- **Button:** "Subscribe - $1,499/month"

### Package 3: AI Solutions
- **Price:** Custom (contact form)
- **No payment button** (custom pricing)

---

## 🐛 Troubleshooting

### "Stripe key not found"
- Check `.env.local` file exists
- Check keys are correct
- Restart dev server after adding keys

### "Webhook verification failed"
- Check webhook secret matches
- Ensure webhook URL is correct
- Test in Stripe dashboard

### Payment not processing
- Check you're using test keys in test mode
- Verify Stripe account is activated
- Check browser console for errors

---

## ✅ Checklist

- [ ] Stripe account created
- [ ] API keys obtained
- [ ] Environment variables set (local)
- [ ] Environment variables set (Vercel)
- [ ] Webhook endpoint created
- [ ] Products created in Stripe
- [ ] Test payment completed
- [ ] Success page working

---

## 🚀 Once Setup is Complete

1. **Test a payment** with test card
2. **Check Stripe dashboard** - should see payment
3. **Check success page** - should redirect correctly
4. **Go live** - switch to live keys in Vercel

---

**Your payment system is ready! Just add your Stripe keys and you're good to go! 💳**

