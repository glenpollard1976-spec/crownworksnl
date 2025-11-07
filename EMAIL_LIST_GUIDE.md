# 📧 Email List Manager - Quick Guide

## ✅ What's Ready

I've created a complete email list management system for you!

## 🎯 Found Your Contact Files

I found these contact files on your OneDrive Desktop:
- **crownworks_600_contacts.csv** (main file - 600 contacts!)
- CSV_sample.csv
- CSV_sample (1).csv
- Supabase Snippet Column Details for Users, Waitlists and Signups.csv

## 🚀 How to Use

### 1. Access the Email List Page

**Option A:** Click "Email List" in the navigation menu on your website
**Option B:** Go directly to: **http://localhost:3000/email-list**

### 2. Import Your Contacts

1. Click **"Import from CSV"** button
2. Navigate to: `C:\Users\glenp\OneDrive\Desktop\crownworks_600_contacts.csv`
3. Select the file and click Open
4. The system will automatically:
   - Parse the CSV file
   - Extract names, emails, and phone numbers
   - Add all contacts to your list
   - Skip any duplicates

### 3. CSV File Format

The system supports these formats:

**Format 1 (with headers):**
```
Name,Email,Phone
John Doe,john@example.com,709-555-1234
Jane Smith,jane@example.com,709-555-5678
```

**Format 2 (without headers):**
```
john@example.com,John Doe,709-555-1234
jane@example.com,Jane Smith,709-555-5678
```

**Format 3 (email only):**
```
john@example.com
jane@example.com
```

### 4. Send Bulk Emails

1. **Select Contacts:**
   - Check the boxes next to contacts you want to email
   - Or click "Select All" to select everyone

2. **Compose Email:**
   - Enter email subject
   - Enter email message
   - Use `{name}` to personalize (e.g., "Hello {name},")

3. **Send:**
   - Click "Send to X Contact(s)"
   - The system will open your email client with the first email
   - After sending, refresh the page to continue with remaining emails

### 5. Manual Contact Management

- **Add Contact:** Click "Add Contact Manually" and fill in the form
- **Delete Contact:** Click the trash icon next to any contact
- **Export:** Click "Export to CSV" to save your list

## 📋 Features

✅ **Import from CSV** - Automatically parse and import contacts
✅ **Manual Entry** - Add contacts one by one
✅ **Bulk Selection** - Select all or individual contacts
✅ **Bulk Email** - Send to multiple contacts at once
✅ **Export** - Download your contact list as CSV
✅ **Duplicate Prevention** - Automatically skips duplicate emails
✅ **Personalization** - Use {name} in emails for personalization

## 💡 Tips

1. **Large Lists:** If you have 600+ contacts, consider sending in batches of 50-100
2. **Email Limits:** Most email clients limit BCC recipients, so the system opens emails one at a time
3. **Personalization:** Always use {name} in your emails for better engagement
4. **Backup:** Export your list regularly to keep a backup

## 🔧 For Better Bulk Sending (Future Upgrade)

Currently, the system uses `mailto:` links which open your email client. For true bulk sending, you'll want to:

1. **Use an Email Service:**
   - **SendGrid** (free tier: 100 emails/day)
   - **Mailgun** (free tier: 5,000 emails/month)
   - **Resend** (free tier: 3,000 emails/month)
   - **Amazon SES** (very cheap, $0.10 per 1,000 emails)

2. **Set Up API Integration:**
   - Create API route: `app/api/send-email/route.js`
   - Connect to email service
   - Update the email list page to use API instead of mailto

3. **Add Features:**
   - Email templates
   - Scheduled sending
   - Open/click tracking
   - Unsubscribe management

## 🎯 Quick Start

1. Open: http://localhost:3000/email-list
2. Click "Import from CSV"
3. Select: `C:\Users\glenp\OneDrive\Desktop\crownworks_600_contacts.csv`
4. Select contacts you want to email
5. Write your message
6. Click "Send"

That's it! 🚀

