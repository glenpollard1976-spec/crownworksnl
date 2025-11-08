# 🔗 How to Create Stripe Webhook Endpoint

## Step-by-Step Instructions

### Step 1: Go to Stripe Webhooks
1. Open: https://dashboard.stripe.com/webhooks
2. You'll see a list of webhooks (or it will be empty if you haven't created any)

### Step 2: Add Endpoint
1. Click the **"Add endpoint"** button (top right)
2. A form will appear

### Step 3: Enter Endpoint URL
In the **"Endpoint URL"** field, enter:
```
https://crownworksnl.com/api/webhook
```

### Step 4: Select Events
You need to select which events Stripe should send to your webhook.

**Click "Select events"** and check these boxes:

✅ **Payment events:**
- `checkout.session.completed` (when payment succeeds)
- `payment_intent.succeeded` (payment confirmed)
- `payment_intent.payment_failed` (payment failed)

✅ **Subscription events:**
- `customer.subscription.created` (new subscription)
- `customer.subscription.updated` (subscription changed)
- `customer.subscription.deleted` (subscription canceled)

**OR** you can click **"Select all events"** to receive everything (easier option)

### Step 5: Save Endpoint
1. Click **"Add endpoint"** button at the bottom
2. Stripe will create the endpoint

### Step 6: Get Your Webhook Secret
1. After creating, you'll see the endpoint in the list
2. Click on the endpoint name to open it
3. You'll see a **"Signing secret"** section
4. Click **"Reveal"** or **"Click to reveal"** next to the secret
5. **Copy the secret** - it starts with `whsec_`
   - Example: `whsec_1234567890abcdef...`

### Step 7: Add to Vercel
1. Go to: https://vercel.com/dashboard
2. Click your **crownworksnl** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_...` (paste the secret you copied)
   - **Environment:** Check **Production**
5. Click **Save**

---

## 🎯 Quick Checklist

- [ ] Opened https://dashboard.stripe.com/webhooks
- [ ] Clicked "Add endpoint"
- [ ] Entered URL: `https://crownworksnl.com/api/webhook`
- [ ] Selected events (or selected all)
- [ ] Clicked "Add endpoint"
- [ ] Revealed and copied the signing secret (starts with `whsec_`)
- [ ] Added `STRIPE_WEBHOOK_SECRET` to Vercel environment variables
- [ ] Saved in Vercel

---

## 📸 Visual Guide

**In Stripe Dashboard:**
```
Webhooks
┌─────────────────────────────────────┐
│  [Add endpoint]  ← Click this     │
└─────────────────────────────────────┘

Add endpoint form:
┌─────────────────────────────────────┐
│ Endpoint URL:                       │
│ https://crownworksnl.com/api/webhook│
│                                     │
│ [Select events]  ← Click this       │
│                                     │
│ [Add endpoint]  ← Click to save    │
└─────────────────────────────────────┘

After creating, click endpoint:
┌─────────────────────────────────────┐
│ Signing secret                      │
│ whsec_...  [Reveal]  ← Click this  │
└─────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **Use Production URL:** Make sure you use `https://crownworksnl.com` (not localhost)
2. **Test Mode vs Live Mode:** 
   - If you're in **Test mode** (toggle in top right), the webhook secret will be for testing
   - If you're in **Live mode**, the webhook secret will be for production
   - Make sure you're in the right mode when copying the secret!
3. **After Adding to Vercel:** Vercel will automatically redeploy, or you can manually redeploy
4. **Test It:** After setup, try making a test payment to see if the webhook fires

---

## 🧪 Testing Your Webhook

After setup, you can test it:

1. Go to your webhook endpoint in Stripe
2. Click **"Send test webhook"**
3. Select event: `checkout.session.completed`
4. Click **"Send test webhook"**
5. Check your Vercel logs to see if it received the webhook

---

**That's it! Once you have the webhook secret, add it to Vercel and you're done!** 🎉

