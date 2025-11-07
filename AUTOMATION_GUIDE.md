# 🚀 CROWNWORKSNL AUTOMATION GUIDE

## ✅ Everything is Automated!

### 🎯 Quick Start (One Command)

**Double-click:** `RUN_EVERYTHING.bat`

This will:
1. ✅ Build your project
2. ✅ Deploy to Vercel (via GitHub)
3. ✅ Send email campaign (if configured)

---

## 📋 Individual Automation Scripts

### 1. **AUTO_LAUNCH.ps1** - Full Automation
```powershell
npm run auto-launch
```
or
```powershell
.\AUTO_LAUNCH.ps1
```

**Does:**
- ✅ Checks prerequisites (Node.js, CSV, .env)
- ✅ Builds project
- ✅ Deploys to Vercel
- ✅ Sends email campaign

---

### 2. **AUTO_DEPLOY.ps1** - Deploy Only
```powershell
npm run auto-deploy
```
or
```powershell
.\AUTO_DEPLOY.ps1
```

**Does:**
- ✅ Builds project
- ✅ Commits to Git
- ✅ Pushes to GitHub
- ✅ Triggers Vercel auto-deploy

---

### 3. **AUTO_SEND_EMAILS.ps1** - Email Campaign Only
```powershell
npm run auto-email
```
or
```powershell
.\AUTO_SEND_EMAILS.ps1
```

**Does:**
- ✅ Finds CSV automatically
- ✅ Checks SMTP credentials
- ✅ Sends emails in batches
- ✅ Tracks results

---

## ⚙️ Setup Required (One Time)

### 1. Email Credentials (.env file)

Create `.env` file in project root:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe (already in Vercel)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site URL
NEXT_PUBLIC_SITE_URL=https://crownworksnl.com
FRONTEND_URL=https://crownworksnl.com
```

**For Gmail:**
1. Enable 2-factor authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use App Password (not regular password)

---

### 2. CSV File Location

The script automatically looks for:
- `c:\Users\glenp\OneDrive\Desktop\files (1)\crownworks_600_contacts.csv`
- `.\crownworks_600_contacts.csv` (project root)

Or specify manually:
```powershell
node scripts/send-bulk-smtp.js "path\to\your\contacts.csv"
```

---

## 📧 Email Template

**Subject:** "Never Miss Another Customer Call - AI Receptionist"

**Content:** AI Receptionist pitch (updated automatically)

**Limit:** 111 emails per run (configurable in script)

---

## 🎯 Usage Examples

### Send All 600 Emails
```powershell
node scripts/send-bulk-smtp.js ".\crownworks_600_contacts.csv" 10 5000
```

### Deploy Only
```powershell
.\AUTO_DEPLOY.ps1
```

### Full Launch (Build + Deploy + Email)
```powershell
.\AUTO_LAUNCH.ps1
```

---

## 📊 What Gets Automated

✅ **Project Building** - Runs `npm run build`  
✅ **Git Commits** - Auto-commits with timestamp  
✅ **GitHub Push** - Pushes to trigger Vercel  
✅ **Email Sending** - Batches of 10, 5-second delays  
✅ **Error Handling** - Checks prerequisites first  
✅ **Progress Tracking** - Shows real-time status  

---

## 🚨 Troubleshooting

### "CSV not found"
- Place CSV in one of the auto-detected locations
- Or specify path manually

### "SMTP credentials not found"
- Create `.env` file
- Add SMTP_USER and SMTP_PASS

### "Build failed"
- Run `npm install` first
- Check for errors in console

### "Git push failed"
- May need to authenticate GitHub
- Or deploy manually: `vercel --prod`

---

## 🎉 You're Ready!

Just run:
```powershell
.\RUN_EVERYTHING.bat
```

Or:
```powershell
npm run auto-launch
```

**Everything is automated!** 🚀

