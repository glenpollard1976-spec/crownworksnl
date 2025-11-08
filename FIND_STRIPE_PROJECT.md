# 🔍 Find the Project with Stripe Setup

## 🎯 Goal

Keep the project that has Stripe configured, delete the rest.

---

## ✅ Step 1: Check Each Project for Stripe

### Check `crownworksnl`:
1. Click on **`crownworksnl`** project
2. Go to **Settings → Environment Variables**
3. Look for:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (if used)
4. **Does it have Stripe keys?** Yes/No

### Check `crownworksnl-23f4`:
1. Click on **`crownworksnl-23f4`** project
2. Go to **Settings → Environment Variables**
3. Look for:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (if used)
4. **Does it have Stripe keys?** Yes/No

### Check `crownworksnl-6eez`:
1. Click on **`crownworksnl-6eez`** project
2. Go to **Settings → Environment Variables**
3. Look for Stripe keys
4. **Does it have Stripe keys?** Yes/No

### Check `crownworksnl-9wte`:
1. Click on **`crownworksnl-9wte`** project
2. Go to **Settings → Environment Variables**
3. Look for Stripe keys
4. **Does it have Stripe keys?** Yes/No

---

## 🎯 Step 2: Identify the Stripe Project

**Which project has Stripe keys?**
- [ ] `crownworksnl`
- [ ] `crownworksnl-23f4`
- [ ] `crownworksnl-6eez`
- [ ] `crownworksnl-9wte`
- [ ] Multiple projects have Stripe keys

---

## ✅ Step 3: Action Plan

### If `crownworksnl` has Stripe:
1. ✅ **KEEP:** `crownworksnl`
2. Transfer domain from `crownworksnl-23f4` to `crownworksnl`
3. ❌ **DELETE:** `crownworksnl-23f4`
4. ❌ **DELETE:** `crownworksnl-6eez`
5. ❌ **DELETE:** `crownworksnl-9wte`

### If `crownworksnl-23f4` has Stripe:
1. ✅ **KEEP:** `crownworksnl-23f4` (already has domain!)
2. ❌ **DELETE:** `crownworksnl`
3. ❌ **DELETE:** `crownworksnl-6eez`
4. ❌ **DELETE:** `crownworksnl-9wte`

### If Multiple Have Stripe:
- Keep the one with the domain `www.crownworksnl.com`
- Delete the others

---

## 🚀 Quick Steps

1. **Check Environment Variables** in each project
2. **Find which one has Stripe keys**
3. **Keep that one**
4. **Transfer domain to it** (if not already there)
5. **Delete all others**

---

## 📝 Tell Me

**Which project has Stripe keys?**
- Project name: _______________________

Then I'll give you exact steps to clean up!

---

**Check the Environment Variables in each project and let me know which one has Stripe!** 🔍

