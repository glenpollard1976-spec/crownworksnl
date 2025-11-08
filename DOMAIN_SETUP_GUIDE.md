# 🌐 Domain Setup Guide - www.crownworksnl.com

## ✅ What I've Done

1. **Added automatic redirects** - `crownworksnl.com` → `www.crownworksnl.com`
2. **Updated all URLs** in the codebase to use `www.crownworksnl.com`
3. **Configured Next.js** to handle domain redirects
4. **Updated Vercel config** for proper redirects

## 🔧 DNS Setup (Do This in Your Domain Registrar)

### Step 1: Add Both Domains to Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. Add both domains:
   - `crownworksnl.com`
   - `www.crownworksnl.com`

### Step 2: Configure DNS Records

In your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:

#### For `crownworksnl.com` (Root Domain):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### For `www.crownworksnl.com` (Subdomain):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**OR** if your registrar doesn't support CNAME for root:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: SSL Certificate

Vercel automatically provisions SSL certificates for both domains. Wait 5-10 minutes after adding domains.

## 🧪 Test the Setup

1. **Test redirect**: Visit `http://crownworksnl.com` → Should redirect to `https://www.crownworksnl.com`
2. **Test www**: Visit `https://www.crownworksnl.com` → Should load normally
3. **Test HTTPS**: Both should use HTTPS automatically

## 📝 Environment Variables

Make sure in **Vercel Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://www.crownworksnl.com
```

## ✅ Verification Checklist

- [ ] Both domains added to Vercel
- [ ] DNS records configured correctly
- [ ] SSL certificates active (check in Vercel dashboard)
- [ ] `crownworksnl.com` redirects to `www.crownworksnl.com`
- [ ] `www.crownworksnl.com` loads the site
- [ ] All payment buttons work
- [ ] Contact forms work
- [ ] No mixed content warnings

## 🚨 Common Issues

### Issue: Redirect Loop
**Fix**: Make sure `NEXT_PUBLIC_SITE_URL` is set to `https://www.crownworksnl.com` (not without www)

### Issue: SSL Not Working
**Fix**: Wait 10-15 minutes for Vercel to provision SSL, or manually trigger in Vercel dashboard

### Issue: DNS Not Propagating
**Fix**: DNS can take 24-48 hours. Use `nslookup crownworksnl.com` to check propagation

## 📞 Need Help?

If DNS setup is confusing, your domain registrar's support can help you add the A and CNAME records.

