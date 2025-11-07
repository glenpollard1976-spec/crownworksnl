# 📧 BULK EMAIL SETUP - CrownWorksNL

## ✅ This is the REAL bulk sender - actually sends emails via SMTP!

**Website:** https://crownworksnl.com  
**Project:** CrownWorksNL (NOT CrownQuestNL)

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Install nodemailer
```bash
npm install
```

### Step 2: Set up your email credentials

Create a `.env` file in the project root:

```env
# Gmail Setup (Recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# OR Outlook/Hotmail Setup
# SMTP_HOST=smtp-mail.outlook.com
# SMTP_PORT=587
# SMTP_USER=your-email@outlook.com
# SMTP_PASS=your-password
```

### Step 3: Get Gmail App Password (if using Gmail)

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with your Gmail account
3. Select "Mail" and "Other (Custom name)"
4. Enter "CrownWorksNL Bulk Sender"
5. Click "Generate"
6. Copy the 16-character password
7. Paste it in `.env` as `SMTP_PASS`

**Important:** You MUST enable 2-factor authentication first!

### Step 4: Place your CSV file

Put your contacts CSV in one of these locations:
- `contacts.csv` (project root)
- `crownworks_600_contacts.csv` (project root)
- `Desktop/crownworks_600_contacts.csv`
- `Downloads/crownworks_600_contacts.csv`

CSV format:
```csv
email,name
contact@example.com,John Doe
another@example.com,Jane Smith
```

### Step 5: Run the bulk sender

```bash
npm run send-bulk
```

Or with custom settings:
```bash
node scripts/send-bulk-smtp.js [path-to-csv] [batch-size] [delay-seconds]
```

Example:
```bash
node scripts/send-bulk-smtp.js contacts.csv 10 5
```
- `10` = send 10 emails per batch
- `5` = wait 5 seconds between batches

---

## 📧 Email Content

The script sends this email about **CrownWorksNL**:

**Subject:** CrownWorksNL is Open - Free Consultation for NL Businesses

**Body:**
```
Hi {name},

I'm Glen Pollard, founder of CrownWorksNL in Corner Brook, Newfoundland.

I help businesses and individuals with:
✅ Crown Land acquisition in Newfoundland & Labrador
✅ Business growth consulting
✅ Strategic planning and development

As a member of the Qalipu First Nation with deep local knowledge, I understand the unique challenges of doing business in NL.

**SPECIAL LAUNCH OFFER:**
Free 30-minute consultation for the first 10 businesses that respond.

No obligation. Just a chance to see if I can help you.

Reply to this email or call me directly:
📞 +1 (709) 721-0340
📧 info@crownworksnl.com
🌐 https://crownworksnl.com

Looking forward to helping you succeed,

Glen Pollard
CrownWorksNL
Corner Brook, NL
```

---

## ⚙️ How It Works

1. **Parses your CSV** - Reads contacts from your file
2. **Connects to SMTP** - Verifies your email credentials
3. **Sends test email** - Sends one test email first (to first contact)
4. **Batches sending** - Sends in batches with delays (to avoid spam filters)
5. **Tracks results** - Shows success/failure for each email

---

## 🛡️ Spam Prevention Tips

- **Send 50-100 emails per hour** (use batch size 10, delay 5 seconds)
- **Don't send more than 500 per day** from a personal email
- **Use a business email** for better deliverability
- **Personalize emails** (the script does this with {name})
- **Include unsubscribe option** (add to email template if needed)

---

## 🐛 Troubleshooting

### "SMTP connection failed"
- Check your email and password are correct
- For Gmail: Make sure you're using an App Password (not regular password)
- Check 2-factor authentication is enabled (Gmail)

### "Test email failed"
- Verify SMTP credentials in `.env`
- Check your internet connection
- Try a different email provider (Outlook, etc.)

### "Too many emails sent"
- Gmail limits: 500 emails/day for free accounts
- Outlook limits: 300 emails/day
- Use a professional email service (SendGrid, Mailgun) for more

---

## ✅ Checklist

- [ ] Installed nodemailer (`npm install`)
- [ ] Created `.env` file with SMTP credentials
- [ ] Got Gmail App Password (if using Gmail)
- [ ] CSV file with contacts ready
- [ ] Tested with small batch first (10 emails)
- [ ] Verified email content is correct (CrownWorksNL, crownworksnl.com)

---

## 🎯 Ready to Send!

```bash
npm run send-bulk
```

**This will ACTUALLY SEND emails via SMTP - not just open mailto links!**

All emails are about **CrownWorksNL** and link to **https://crownworksnl.com** ✅

