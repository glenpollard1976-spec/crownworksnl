# 🔧 FIX VERCEL DOMAIN LINKING - URGENT

**Problem:** 2 Vercel projects deployed, crownworksnl.com not linked correctly

---

## 🚨 IMMEDIATE FIX STEPS:

### Step 1: Go to Vercel Dashboard
**URL:** https://vercel.com/dashboard

---

### Step 2: Identify the Projects

You should see 2 projects:
1. **WRONG PROJECT** (old/wrong one) - DELETE THIS
2. **CORRECT PROJECT** (crownworksnl) - KEEP THIS

**How to identify:**
- Check the project names
- Check which one has the latest deployments
- Check which one is connected to `glenpollard1976-spec/crownworksnl` GitHub repo

---

### Step 3: Delete the Wrong Project

1. Click on the **WRONG PROJECT**
2. Go to **Settings** → **General**
3. Scroll down to **Delete Project**
4. Type the project name to confirm
5. Click **Delete**

---

### Step 4: Link Domain to Correct Project

1. Click on the **CORRECT PROJECT** (crownworksnl)
2. Go to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `crownworksnl.com`
5. Click **Add**
6. Follow DNS configuration instructions if needed

---

### Step 5: Verify Domain Configuration

**If domain is already added but not working:**

1. Go to **Settings** → **Domains**
2. Check if `crownworksnl.com` is listed
3. If it shows "Invalid Configuration":
   - Click on the domain
   - Follow the DNS setup instructions
   - Add the required DNS records to your domain registrar

**Required DNS Records:**
- Type: `A` or `CNAME`
- Value: Provided by Vercel (usually `cname.vercel-dns.com` or IP address)

---

### Step 6: Ensure Correct GitHub Connection

1. Go to **Settings** → **Git**
2. Verify it's connected to: `glenpollard1976-spec/crownworksnl`
3. If wrong:
   - Click **Disconnect**
   - Click **Connect Git Repository**
   - Select `glenpollard1976-spec/crownworksnl`
   - Click **Connect**

---

### Step 7: Redeploy Correct Project

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **⋯** (three dots) → **Redeploy**
4. Wait for deployment to complete

---

## 🔍 QUICK CHECKLIST:

- [ ] Identified wrong project
- [ ] Deleted wrong project
- [ ] Verified correct project is connected to GitHub
- [ ] Added crownworksnl.com domain to correct project
- [ ] Configured DNS records (if needed)
- [ ] Redeployed correct project
- [ ] Verified crownworksnl.com is working

---

## 🚀 ALTERNATIVE: Manual Domain Setup

If automatic setup doesn't work:

1. Go to your domain registrar (where you bought crownworksnl.com)
2. Go to DNS settings
3. Add/Update these records:

**For A Record:**
- Type: `A`
- Name: `@` or blank
- Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)

**For CNAME Record (www):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

**OR use Vercel's provided values from the Domains page**

---

## ✅ VERIFICATION:

After setup, verify:
1. Visit https://crownworksnl.com - should show your site
2. Visit https://www.crownworksnl.com - should redirect or show site
3. Check Vercel dashboard - domain should show "Valid Configuration"

---

## 🆘 IF STILL NOT WORKING:

1. Check domain registrar DNS settings
2. Wait 24-48 hours for DNS propagation
3. Clear browser cache
4. Try incognito/private browsing
5. Check Vercel deployment logs for errors

---

**FIX THIS NOW AND GET CROWNWORKSNL.COM WORKING! 🚀**

