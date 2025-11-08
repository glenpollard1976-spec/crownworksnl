# 🔗 Merge 2 Vercel Projects Into One

## 🎯 The Problem

You have **2 separate Vercel projects** deployed:
1. **Project 1** - Possibly old/wrong code
2. **Project 2** - Correct project with latest code (iLawyer, ProVet, etc.)

The domain `www.crownworksnl.com` might be linked to the wrong one.

## ✅ Solution: Merge Into One Project

### Step 1: Identify the CORRECT Project

**The correct project should have:**
- ✅ Latest code (iLawyer, ProVet sections)
- ✅ Connected to GitHub: `glenpollard1976-spec/crownworksnl`
- ✅ Recent deployments
- ✅ All the features you want

**How to check:**
1. Go to https://vercel.com/dashboard
2. Look at both projects
3. Check **Settings → Git** to see which repo is connected
4. Check **Deployments** to see which has recent activity

### Step 2: Transfer Domain to Correct Project

**If `www.crownworksnl.com` is on the WRONG project:**

1. Go to **WRONG PROJECT** → **Settings → Domains**
2. Find `crownworksnl.com` and `www.crownworksnl.com`
3. Click **Remove** or **Delete** on both
4. Confirm removal

**Then add to CORRECT project:**

1. Go to **CORRECT PROJECT** → **Settings → Domains**
2. Click **Add Domain**
3. Enter: `crownworksnl.com`
4. Click **Add**
5. Click **Add Domain** again
6. Enter: `www.crownworksnl.com`
7. Click **Add**
8. Follow DNS setup instructions if needed

### Step 3: Verify Git Connection

1. Go to **CORRECT PROJECT** → **Settings → Git**
2. Should show: `glenpollard1976-spec/crownworksnl`
3. **If NOT connected:**
   - Click **Connect Git Repository**
   - Select `glenpollard1976-spec/crownworksnl`
   - Confirm connection

### Step 4: Delete the Wrong Project

1. Go to **WRONG PROJECT** → **Settings**
2. Scroll to bottom
3. Click **Delete Project**
4. Type project name to confirm
5. Click **Delete**

### Step 5: Redeploy Correct Project

1. Go to **CORRECT PROJECT** → **Deployments**
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 6: Verify Everything Works

1. Visit `https://www.crownworksnl.com`
2. Check that it shows:
   - ✅ iLawyer section
   - ✅ ProVet section
   - ✅ Latest content
   - ✅ All buttons working
   - ✅ Payment buttons work

---

## 🚀 Quick Checklist

- [ ] Identified CORRECT project (has latest code)
- [ ] Removed `crownworksnl.com` from WRONG project
- [ ] Removed `www.crownworksnl.com` from WRONG project
- [ ] Added `crownworksnl.com` to CORRECT project
- [ ] Added `www.crownworksnl.com` to CORRECT project
- [ ] Verified Git connection on CORRECT project
- [ ] Deleted WRONG project
- [ ] Redeployed CORRECT project
- [ ] Tested live site at `www.crownworksnl.com`

---

## 🆘 Troubleshooting

**Domain already in use:**
- Remove it from the wrong project first
- Wait 1-2 minutes
- Then add to correct project

**Can't delete project:**
- Make sure domain is removed first
- Check for any active deployments
- Try again after a few minutes

**Git not connected:**
- Go to Settings → Git
- Click "Connect Git Repository"
- Select the correct repo
- Authorize if needed

---

## 📞 Need Help?

If you're stuck, the automated script will open all necessary pages. Just follow the on-screen instructions!

