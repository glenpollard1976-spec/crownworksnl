# 🔗 Merge 2 Vercel Projects - Simple Guide

## 🎯 What You Need to Do

You have **2 Vercel projects** and need to merge them into **ONE**.

---

## ⚡ Quick Steps (5 minutes)

### 1. Open Vercel Dashboard
👉 https://vercel.com/dashboard

### 2. Find Both Projects
You'll see 2 projects. Identify which is which:

**CORRECT PROJECT (Keep This):**
- ✅ Connected to GitHub: `glenpollard1976-spec/crownworksnl`
- ✅ Has latest code (iLawyer, ProVet sections)
- ✅ Recent deployments

**WRONG PROJECT (Delete This):**
- ❌ Old code or wrong repo
- ❌ Not connected to correct GitHub

### 3. Transfer Domain
**In WRONG project:**
- Settings → Domains
- Remove `crownworksnl.com` (if there)
- Remove `www.crownworksnl.com` (if there)

**In CORRECT project:**
- Settings → Domains
- Add `crownworksnl.com`
- Add `www.crownworksnl.com`

### 4. Delete Wrong Project
- Go to WRONG project
- Settings → Scroll down
- Click "Delete Project"
- Type name to confirm
- Delete

### 5. Verify Git Connection
- Go to CORRECT project
- Settings → Git
- Should show: `glenpollard1976-spec/crownworksnl`
- If not, click "Connect Git Repository" and select it

### 6. Redeploy
- Go to CORRECT project → Deployments
- Click "Redeploy" on latest deployment
- Wait for completion

### 7. Test
- Visit `https://www.crownworksnl.com`
- Should show iLawyer, ProVet, all buttons working ✅

---

## 🚀 Run Automated Script

Just run this:
```powershell
.\MARRY_PROJECTS.bat
```

It will:
- List your projects
- Open Vercel dashboard
- Show you which to keep/delete
- Open all necessary pages

---

## ✅ Checklist

- [ ] Identified CORRECT project
- [ ] Removed domains from WRONG project
- [ ] Added domains to CORRECT project
- [ ] Deleted WRONG project
- [ ] Verified Git connection
- [ ] Redeployed
- [ ] Tested live site

---

## 🆘 Need Help?

The script will open everything for you. Just follow the steps!

