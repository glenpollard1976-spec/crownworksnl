# ✅ Vercel Projects Merge - Verification Checklist

## 🔍 Current Status Check

### Step 1: Count Your Projects
Open: https://vercel.com/dashboard

**How many projects do you see?**
- [ ] 1 project
- [ ] 2 projects
- [ ] More than 2

**Project names:**
1. _______________________
2. _______________________

---

### Step 2: Identify CORRECT Project

**For each project, check:**

**Project 1:**
- [ ] Settings → Git → Connected to: `glenpollard1976-spec/crownworksnl`?
- [ ] Has recent deployments?
- [ ] Shows iLawyer and ProVet in code?

**Project 2:**
- [ ] Settings → Git → Connected to: `glenpollard1976-spec/crownworksnl`?
- [ ] Has recent deployments?
- [ ] Shows iLawyer and ProVet in code?

**✅ CORRECT PROJECT =** The one connected to `glenpollard1976-spec/crownworksnl` with latest code

---

### Step 3: Check Domain Configuration

**Project 1:**
- [ ] Settings → Domains → Has `crownworksnl.com`?
- [ ] Settings → Domains → Has `www.crownworksnl.com`?

**Project 2:**
- [ ] Settings → Domains → Has `crownworksnl.com`?
- [ ] Settings → Domains → Has `www.crownworksnl.com`?

---

### Step 4: Verify Live Site

Visit: https://www.crownworksnl.com

**What do you see?**
- [ ] iLawyer section (AI legal consultations)
- [ ] ProVet section (AI veterinary care)
- [ ] All buttons working
- [ ] Payment buttons functional
- [ ] Contact form works

**If YES →** That's the CORRECT project ✅  
**If NO →** That's the WRONG project ❌

---

## 🎯 Action Plan

### If You Have 2 Projects:

**✅ CORRECT PROJECT (Keep This):**
- Name: _______________________
- Connected to: `glenpollard1976-spec/crownworksnl` ✅
- Has latest code ✅

**❌ WRONG PROJECT (Delete This):**
- Name: _______________________
- Old/wrong code ❌

**Actions:**
1. [ ] Remove `crownworksnl.com` from WRONG project
2. [ ] Remove `www.crownworksnl.com` from WRONG project
3. [ ] Add `crownworksnl.com` to CORRECT project
4. [ ] Add `www.crownworksnl.com` to CORRECT project
5. [ ] Delete WRONG project
6. [ ] Redeploy CORRECT project
7. [ ] Test live site

### If You Have 1 Project:

**Check:**
- [ ] Connected to correct GitHub repo?
- [ ] Has both domains added?
- [ ] Latest code deployed?
- [ ] Live site working correctly?

**If anything is wrong:**
- [ ] Fix Git connection
- [ ] Add missing domains
- [ ] Redeploy

---

## ✅ Final Verification

After merging:

- [ ] Only 1 project in Vercel dashboard
- [ ] Project connected to `glenpollard1976-spec/crownworksnl`
- [ ] Both domains added (`crownworksnl.com` and `www.crownworksnl.com`)
- [ ] Live site shows iLawyer and ProVet
- [ ] All buttons work
- [ ] Payment system works
- [ ] Contact form works

---

## 🚀 Quick Commands

**Check projects:**
```powershell
.\CHECK_VERCEL_PROJECTS.ps1
```

**Merge projects:**
```powershell
.\MARRY_PROJECTS.bat
```

---

## 📞 Need Help?

If stuck, the scripts will open all necessary pages. Just follow the on-screen instructions!

