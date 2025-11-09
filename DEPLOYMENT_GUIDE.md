# 🚀 CrownWorksNL Deployment Guide

## Complete Guide to Deploying Your AI Toolkit & Learning Centre to www.crownworksnl.com

---

## 📋 Pre-Deployment Checklist

- [ ] All code reviewed and optimized
- [ ] Stripe keys configured in environment variables
- [ ] Domain DNS configured
- [ ] SSL certificate ready
- [ ] Google Analytics ID (if using)
- [ ] All pages tested locally

---

## 🌐 Option 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Add AI Toolkit and Learning Centre pages"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your repository: `CrownQuestNL/Pvivw`
5. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

### Step 3: Add Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SITE_URL=https://www.crownworksnl.com
```

### Step 4: Configure Custom Domain

1. Go to Settings → Domains
2. Add `www.crownworksnl.com`
3. Add `crownworksnl.com` (without www)
4. Follow DNS instructions:
   - Add CNAME record: `www` → `c1.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`

### Step 5: Deploy

Click "Deploy" and wait for build to complete. Your site will be live at:
- `https://www.crownworksnl.com`
- `https://crownworksnl.com`

---

## 🌐 Option 2: Deploy to Netlify

### Step 1: Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository

### Step 2: Build Settings

```
Build command: npm run build
Publish directory: .next
```

### Step 3: Environment Variables

Site settings → Environment variables:

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SITE_URL=https://www.crownworksnl.com
```

### Step 4: Custom Domain

1. Domain settings → Add custom domain
2. Enter `www.crownworksnl.com`
3. Follow DNS instructions

---

## 🌐 Option 3: Traditional Web Hosting (cPanel/FTP)

### Step 1: Build for Production

```bash
npm run build
npm run export  # If using static export
```

### Step 2: Upload Files

Upload the following to your web root (`public_html` or `www`):

```
.next/
public/
package.json
next.config.mjs
```

### Step 3: Configure Server

Create `.htaccess` file:

```apache
RewriteEngine On
RewriteRule ^(.*)$ /index.php [L]
```

### Step 4: Set Environment Variables

Create `.env.production`:

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SITE_URL=https://www.crownworksnl.com
```

---

## 🔧 Post-Deployment Configuration

### 1. Stripe Webhook Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Developers → Webhooks
3. Add endpoint: `https://www.crownworksnl.com/api/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copy webhook signing secret
6. Add to environment variables: `STRIPE_WEBHOOK_SECRET`

### 2. Google Analytics (Optional)

Add to `app/layout.js`:

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

### 3. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.crownworksnl.com`
3. Verify ownership (HTML file upload or DNS)
4. Submit sitemap: `https://www.crownworksnl.com/sitemap.xml`

### 4. Test All Pages

Visit and test:
- [ ] Homepage: `https://www.crownworksnl.com`
- [ ] AI Toolkit: `https://www.crownworksnl.com/ai-toolkit`
- [ ] Learning Centre: `https://www.crownworksnl.com/learning-center`
- [ ] Implementation Guide: `https://www.crownworksnl.com/ai-toolkit/guide`
- [ ] Pricing: `https://www.crownworksnl.com/ai-toolkit/pricing`
- [ ] Stripe checkout flow
- [ ] Contact form submission

---

## 🎨 Purple Color Scheme

Your new pages use the CrownWorksNL purple palette:

- **Crown Purple:** `#6B46C1` (Royal authority)
- **Electric Purple:** `#8B5CF6` (Dynamic learning)
- **Mentor Purple:** `#A78BFA` (Nurturing wisdom)
- **Foundation Purple:** `#4C1D95` (Solid base)
- **Royal Gold:** `#F59E0B` (Success accent)

These colors are already integrated into:
- `/app/ai-toolkit/page.js`
- `/app/learning-center/page.js`
- `/app/ai-toolkit/guide/page.js`
- `/app/ai-toolkit/pricing/page.js`

---

## 📊 Performance Optimization

### Already Implemented:

✅ Lazy loading for images
✅ Code splitting with Next.js
✅ Optimized animations (mobile-friendly)
✅ Error boundaries
✅ SEO meta tags
✅ Structured data (JSON-LD)

### Additional Optimizations:

1. **Image Optimization:**
   - Use Next.js Image component
   - Compress images before upload
   - Use WebP format

2. **Caching:**
   - Vercel/Netlify handle this automatically
   - For traditional hosting, configure browser caching

3. **CDN:**
   - Vercel/Netlify include CDN automatically
   - For traditional hosting, consider Cloudflare

---

## 🔒 Security Checklist

- [ ] Environment variables not exposed in client code
- [ ] Stripe keys only in server-side code
- [ ] Rate limiting on API routes
- [ ] Input validation on forms
- [ ] HTTPS enabled (SSL certificate)
- [ ] CORS configured correctly

---

## 📱 Mobile Testing

Test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)

---

## 🐛 Troubleshooting

### Issue: Pages not loading

**Solution:** Check Next.js build output for errors. Ensure all dependencies are installed.

### Issue: Stripe checkout not working

**Solution:** 
1. Verify `STRIPE_SECRET_KEY` is set correctly
2. Check webhook endpoint is configured
3. Test with Stripe test mode first

### Issue: Styles not loading

**Solution:** Ensure Tailwind CSS is configured correctly in `tailwind.config.js`

### Issue: 404 errors on routes

**Solution:** Ensure Next.js routing is configured correctly. Check `next.config.mjs`

---

## 📞 Support

If you encounter issues:

1. Check Vercel/Netlify build logs
2. Review browser console for errors
3. Check server logs
4. Contact: crownworksnl@gmail.com

---

## ✅ Final Checklist

Before going live:

- [ ] All pages load correctly
- [ ] Stripe checkout works
- [ ] Forms submit successfully
- [ ] Mobile responsive
- [ ] Fast page load times
- [ ] SEO meta tags present
- [ ] Analytics tracking (if enabled)
- [ ] SSL certificate active
- [ ] Domain redirects work (www and non-www)
- [ ] 404 page configured
- [ ] Sitemap submitted to Google

---

## 🎉 You're Live!

Once deployed, your AI Toolkit and Learning Centre will be available at:
- **Homepage:** https://www.crownworksnl.com
- **AI Toolkit:** https://www.crownworksnl.com/ai-toolkit
- **Learning Centre:** https://www.crownworksnl.com/learning-center
- **Implementation Guide:** https://www.crownworksnl.com/ai-toolkit/guide
- **Pricing:** https://www.crownworksnl.com/ai-toolkit/pricing

Congratulations! Your CrownWorksNL AI empire is now live! 🚀💜

