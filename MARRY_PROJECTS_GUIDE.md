# 🔗 How to Marry Both Vercel Projects

## The Problem
You have **2 Vercel projects** deployed, and `crownworksnl.com` is linked to the wrong one.

## The Solution
**Merge/consolidate** both projects into ONE correct project.

---

## 🎯 Step-by-Step Guide

### Step 1: Identify the CORRECT Project
The correct project should:
- ✅ Be connected to GitHub: `glenpollard1976-spec/crownworksnl`
- ✅ Have the latest code (iLawyer, ProVet, etc.)
- ✅ Be the one you want to keep

### Step 2: Check Domain Status
1. Open **both projects** in Vercel Dashboard
2. Go to each project's **Settings → Domains**
3. Note which project has `crownworksnl.com` (if any)

### Step 3: Transfer Domain to Correct Project
**If domain is on WRONG project:**
1. Go to **WRONG project** → **Settings → Domains**
2. Find `crownworksnl.com`
3. Click **Remove** or **Delete**
4. Confirm removal

**Then add to CORRECT project:**
1. Go to **CORRECT project** → **Settings → Domains**
2. Click **Add Domain**
3. Enter: `crownworksnl.com`
4. Click **Add**
5. Follow DNS setup instructions if needed

### Step 4: Verify Git Connection
1. Go to **CORRECT project** → **Settings → Git**
2. Verify it shows: `glenpollard1976-spec/crownworksnl`
3. **If NOT connected:**
   - Click **Connect Git Repository**
   - Select `glenpollard1976-spec/crownworksnl`
   - Confirm connection

### Step 5: Delete the Wrong Project
1. Go to **WRONG project** → **Settings**
2. Scroll to bottom
3. Click **Delete Project**
4. Type project name to confirm
5. Click **Delete**

### Step 6: Redeploy
1. Go to **CORRECT project** → **Deployments**
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 7: Verify Live Site
1. Visit `https://crownworksnl.com`
2. Check that it shows:
   - ✅ iLawyer section
   - ✅ ProVet section
   - ✅ Latest content
   - ✅ All buttons working

---

## 🚀 Quick Commands

Run the automated script:
```bash
.\MARRY_PROJECTS.bat
```

Or use npm:
```bash
npm run auto-fix-vercel
```

---

## ✅ Checklist

- [ ] Identified CORRECT project (connected to right GitHub repo)
- [ ] Removed `crownworksnl.com` from WRONG project
- [ ] Added `crownworksnl.com` to CORRECT project
- [ ] Verified Git connection on CORRECT project
- [ ] Deleted WRONG project
- [ ] Redeployed CORRECT project
- [ ] Verified live site at `crownworksnl.com`

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

If you're stuck, the script will open all necessary pages automatically. Just follow the on-screen instructions!

