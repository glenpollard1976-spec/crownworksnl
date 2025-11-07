# 🚀 LAUNCH CROWNWORKSNL.COM NOW!

## ✅ Everything is Ready!

- ✅ Build successful
- ✅ All code committed
- ✅ USD currency set
- ✅ Mobile optimized
- ✅ Payment system ready

---

## 🚀 DEPLOY IN 3 WAYS (Choose One)

### Option 1: Vercel Dashboard (Easiest - 5 minutes)

1. **Go to:** https://vercel.com
2. **Sign in** (or create account)
3. **Click:** "Add New Project"
4. **Import from Git:**
   - Connect GitHub (or drag & drop your project folder)
   - Select your repository
5. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root: `./`
6. **Add Environment Variables:**
   ```
   STRIPE_SECRET_KEY=sk_live_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_secret
   NEXT_PUBLIC_SITE_URL=https://crownworksnl.com
   ```
7. **Add Domain:** `crownworksnl.com`
8. **Click:** "Deploy"
9. **Done!** Site is live in 2-3 minutes

---

### Option 2: Vercel CLI (Fast - 3 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_SITE_URL

# Add domain
vercel domains add crownworksnl.com
```

---

### Option 3: GitHub + Vercel (Recommended)

1. **Create GitHub Repo:**
   - Go to: https://github.com/new
   - Name: `crownworksnl` (or any name)
   - Create repository

2. **Push Code:**
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/crownworksnl.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Import from GitHub
   - Auto-deploys on every push

---

## 🔑 Environment Variables Needed

Add these in Vercel Dashboard → Settings → Environment Variables:

```
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://crownworksnl.com
```

**Get Stripe Keys:**
- https://dashboard.stripe.com/apikeys (LIVE keys)
- https://dashboard.stripe.com/webhooks (webhook secret)

---

## 🌐 Domain Setup

1. **In Vercel:** Settings → Domains → Add `crownworksnl.com`
2. **Update DNS:**
   - Add CNAME record: `cname.vercel-dns.com`
   - Or follow Vercel's DNS instructions
3. **Wait:** 5-30 minutes for DNS propagation

---

## ✅ Post-Launch Checklist

- [ ] Site loads: https://crownworksnl.com
- [ ] All links work
- [ ] Payment buttons work
- [ ] Test payment with: `4242 4242 4242 4242`
- [ ] Mobile responsive
- [ ] Contact form works

---

## 🎯 YOU'RE READY TO LAUNCH!

**Choose one method above and deploy!**

**Your site will be live in minutes! 🚀**

