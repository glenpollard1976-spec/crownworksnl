# 🚀 DEPLOY NOW - CrownWorksNL

## ✅ Pre-Launch Checklist

- [x] Build successful
- [x] All links tested
- [x] Currency set to USD
- [x] Mobile optimized
- [x] Security implemented
- [x] Payment system ready

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1: Go to Vercel
1. Visit: https://vercel.com
2. Sign in (or create account)
3. Click "Add New Project"

### Step 2: Import Repository
1. Connect your GitHub account
2. Select repository: `crownquestnl` (or your repo name)
3. Click "Import"

### Step 3: Configure Project
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./` (default)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)

### Step 4: Add Environment Variables
Click "Environment Variables" and add:

```
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_SITE_URL=https://crownworksnl.com
```

**Important:**
- Use **LIVE** Stripe keys (not test keys)
- Get keys from: https://dashboard.stripe.com/apikeys
- Get webhook secret from: https://dashboard.stripe.com/webhooks

### Step 5: Add Custom Domain
1. Go to **Settings** → **Domains**
2. Add: `crownworksnl.com`
3. Follow DNS instructions
4. Wait for DNS propagation (5-30 minutes)

### Step 6: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site will be live!

---

## 🔧 Post-Deployment Checklist

### Test These:
- [ ] Homepage loads: https://crownworksnl.com
- [ ] All navigation links work
- [ ] Contact form works
- [ ] Payment buttons work (test with test card)
- [ ] Email list page works
- [ ] Success page works
- [ ] Mobile responsive

### Stripe Setup:
- [ ] Add webhook endpoint in Stripe:
  - URL: `https://crownworksnl.com/api/webhook`
  - Events: `checkout.session.completed`, `customer.subscription.*`
- [ ] Test payment with test card: `4242 4242 4242 4242`
- [ ] Verify payment appears in Stripe dashboard

---

## 📊 Quick Test

### Test Payment Flow:
1. Go to: https://crownworksnl.com/#pricing
2. Click "Buy Now - $299"
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry date
5. Any CVC
6. Complete payment
7. Should redirect to success page

---

## ✅ You're Live!

**Website:** https://crownworksnl.com

**Next Steps:**
1. Share on social media
2. Send emails to contacts
3. Start getting customers!

---

## 🆘 Troubleshooting

### Build Fails:
- Check environment variables are set
- Check Stripe keys are correct
- Check Node.js version (should be 18+)

### Domain Not Working:
- Check DNS settings
- Wait 30 minutes for propagation
- Verify domain in Vercel dashboard

### Payments Not Working:
- Check Stripe keys are LIVE (not test)
- Check webhook is configured
- Check environment variables in Vercel

---

## 🎯 LAUNCH NOW!

Everything is ready. Just deploy to Vercel and you're live!

**GO TIME! 🚀**
