# 🚀 LAUNCH CROWNWORKSNL.COM - 3 MINUTES

## ✅ Build Status: READY!

Your website is built and ready to deploy.

---

## 🚀 DEPLOY NOW (Choose One Method)

### Method 1: Vercel Dashboard (FASTEST - 3 minutes)

1. **Open:** https://vercel.com/new
2. **Sign in** (or create free account)
3. **Click:** "Add New Project"
4. **Drag & Drop:** Your `CrownQuestNL` folder
   - OR click "Import Git Repository" if you have GitHub
5. **Configure:**
   - Framework: Next.js (auto-detected) ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅
6. **Click:** "Deploy"
7. **Wait:** 2-3 minutes
8. **DONE!** Your site is live!

**Your site will be at:** `crownworksnl-xxxxx.vercel.app`

---

### Method 2: Vercel CLI (If logged in)

```bash
vercel --prod
```

Follow the prompts.

---

## 🔑 Add Environment Variables (After Deploy)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these:

```
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
NEXT_PUBLIC_SITE_URL=https://crownworksnl.com
```

**Get Stripe Keys:**
- https://dashboard.stripe.com/apikeys
- https://dashboard.stripe.com/webhooks

---

## 🌐 Add Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add: `crownworksnl.com`
3. Follow DNS instructions
4. Wait 5-30 minutes for DNS

---

## ✅ TEST YOUR LIVE SITE

1. Visit your Vercel URL
2. Test all links
3. Test contact form
4. Test payment (use test card: `4242 4242 4242 4242`)

---

## 🎉 YOU'RE LIVE!

**Go to https://vercel.com/new and deploy NOW!**

**It takes 3 minutes. Your business is ready! 🚀**

