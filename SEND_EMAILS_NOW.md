# 🚀 SEND BULK EMAILS NOW - CrownWorksNL

## ✅ REAL Bulk Sender - Actually Sends Emails!

**This sends emails via SMTP - not just opening mailto links!**

---

## ⚡ Quick Start (3 Steps)

### 1. Set up email credentials

Create `.env` file in project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

**Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-factor auth first (if not already)
3. Generate app password
4. Copy the 16-character password to `.env`

### 2. Place your CSV file

Put `crownworks_600_contacts.csv` on your Desktop or in project folder.

### 3. Run it!

```bash
npm run send-bulk
```

**That's it!** It will:
- ✅ Send a test email first (to verify)
- ✅ Send emails in batches (10 per batch, 5 second delay)
- ✅ Show progress for each email
- ✅ Track successes and failures

---

## 📧 Email Content (Verified)

**Subject:** CrownWorksNL is Open - Free Consultation for NL Businesses

**About:** CrownWorksNL (https://crownworksnl.com) ✅  
**NOT:** CrownQuestNL or CrownLand ✅

**Includes:**
- Glen Pollard, founder
- Crown Land services
- Business consulting
- Contact info: info@crownworksnl.com
- Website: https://crownworksnl.com

---

## 🎯 Custom Settings

```bash
node scripts/send-bulk-smtp.js [csv-path] [batch-size] [delay-seconds]
```

Example:
```bash
node scripts/send-bulk-smtp.js Desktop/contacts.csv 20 10
```
- `20` = 20 emails per batch
- `10` = 10 seconds delay between batches

---

## ⚠️ Important

- **Gmail limit:** 500 emails/day
- **Send 50-100 per hour** to avoid spam filters
- **Test first** with small batch (10 emails)
- **Check spam folder** for test email

---

## ✅ Ready? Run This:

```bash
npm run send-bulk
```

**All emails are about CrownWorksNL and link to crownworksnl.com!** 🎯

