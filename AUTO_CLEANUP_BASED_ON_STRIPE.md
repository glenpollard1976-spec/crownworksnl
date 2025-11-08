# 🤖 Auto Cleanup Based on Stripe Project

## 🎯 Smart Guess

Based on your Vercel dashboard screenshot:

**`crownworksnl-23f4`** is MOST LIKELY the one with Stripe because:
- ✅ It has the production domain: `www.crownworksnl.com`
- ✅ Production sites usually have payment keys configured
- ✅ It's the one actively serving your live site

---

## ✅ Recommended Action Plan

### If `crownworksnl-23f4` has Stripe (MOST LIKELY):

**KEEP:**
- ✅ `crownworksnl-23f4` (has Stripe + domain)

**DELETE:**
- ❌ `crownworksnl` (duplicate, no domain)
- ❌ `crownworksnl-6eez` (duplicate)
- ❌ `crownworksnl-9wte` (duplicate)

**Steps:**
1. Verify `crownworksnl-23f4` has Stripe keys in Environment Variables
2. If yes → Delete the other 3 projects
3. Done! ✅

---

### If `crownworksnl` has Stripe (LESS LIKELY):

**KEEP:**
- ✅ `crownworksnl` (has Stripe)

**TRANSFER DOMAIN:**
- From `crownworksnl-23f4` → To `crownworksnl`

**DELETE:**
- ❌ `crownworksnl-23f4` (after transferring domain)
- ❌ `crownworksnl-6eez` (duplicate)
- ❌ `crownworksnl-9wte` (duplicate)

**Steps:**
1. Verify `crownworksnl` has Stripe keys
2. Transfer domain: `crownworksnl-23f4` → Remove domain → Add to `crownworksnl`
3. Delete `crownworksnl-23f4`
4. Delete `crownworksnl-6eez`
5. Delete `crownworksnl-9wte`
6. Done! ✅

---

## 🚀 Quick Decision

**Check Environment Variables:**
- Open: https://vercel.com/websitenl/crownworksnl-23f4/settings/environment-variables
- Look for: `STRIPE_SECRET_KEY`

**If you see it:**
- ✅ Keep `crownworksnl-23f4`
- ❌ Delete the other 3

**If you DON'T see it:**
- Check `crownworksnl` project
- If it has Stripe → Transfer domain and keep that one

---

## 📝 Script Opened

I've opened the Environment Variables pages for you to verify. Check which one has `STRIPE_SECRET_KEY` and that's your keeper!

---

**Most likely: `crownworksnl-23f4` is your Stripe project!** 🎯

