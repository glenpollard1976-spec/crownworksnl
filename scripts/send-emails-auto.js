// FULLY AUTOMATED Email Sender using Gmail API
// Requires: npm install googleapis nodemailer
// Setup: https://developers.google.com/gmail/api/quickstart/nodejs

const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Email template
const EMAIL_TEMPLATE = {
  subject: "CrownWorksNL is Open - Free Consultation for NL Businesses",
  body: (name) => `Hi ${name || 'there'},

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
Corner Brook, NL`
};

// Parse CSV (same as send-emails.js)
function parseCSV(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const hasHeader = headers.some(h => h.includes('email') || h.includes('name'));
    const startIndex = hasHeader ? 1 : 0;
    const contacts = [];
    
    for (let i = startIndex; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      let email = '', name = '', phone = '';
      
      if (hasHeader) {
        const emailIndex = headers.findIndex(h => h.includes('email'));
        const nameIndex = headers.findIndex(h => h.includes('name') && !h.includes('email'));
        if (emailIndex >= 0) email = values[emailIndex]?.trim() || '';
        if (nameIndex >= 0) name = values[nameIndex]?.trim() || '';
      } else {
        if (values[0]?.includes('@')) email = values[0].trim();
        else if (values[1]?.includes('@')) { name = values[0]?.trim() || ''; email = values[1].trim(); }
      }
      
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        contacts.push({ name: name || 'there', email: email.toLowerCase(), phone });
      }
    }
    return contacts;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

// Setup Gmail transporter
async function setupGmail() {
  // Check for credentials
  const credsPath = path.join(process.cwd(), 'gmail-credentials.json');
  if (!fs.existsSync(credsPath)) {
    console.log('❌ Gmail credentials not found.');
    console.log('📝 To use automated sending, you need to:');
    console.log('1. Go to: https://console.cloud.google.com/');
    console.log('2. Create a project');
    console.log('3. Enable Gmail API');
    console.log('4. Create OAuth credentials');
    console.log('5. Save as: gmail-credentials.json');
    console.log('\n💡 For now, use: node scripts/send-emails.js (creates HTML file)');
    return null;
  }
  
  const credentials = JSON.parse(fs.readFileSync(credsPath));
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
  // Check for token
  const tokenPath = path.join(process.cwd(), 'gmail-token.json');
  if (!fs.existsSync(tokenPath)) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.send'],
    });
    console.log('🔐 Authorize this app by visiting:', authUrl);
    return null;
  }
  
  const token = JSON.parse(fs.readFileSync(tokenPath));
  oAuth2Client.setCredentials(token);
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: token.email || 'crownworksnl@gmail.com',
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken: token.refresh_token,
      accessToken: token.access_token,
    },
  });
}

// Send emails with rate limiting
async function sendEmails(transporter, contacts, delayMs = 2000) {
  let sent = 0;
  let failed = 0;
  
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    
    try {
      await transporter.sendMail({
        from: 'Glen Pollard <crownworksnl@gmail.com>',
        to: contact.email,
        subject: EMAIL_TEMPLATE.subject,
        text: EMAIL_TEMPLATE.body(contact.name),
      });
      
      sent++;
      console.log(`✅ [${i + 1}/${contacts.length}] Sent to: ${contact.email}`);
      
      // Rate limiting - wait between emails
      if (i < contacts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      failed++;
      console.error(`❌ [${i + 1}/${contacts.length}] Failed: ${contact.email} - ${error.message}`);
    }
  }
  
  return { sent, failed };
}

// Main
async function main() {
  console.log('🚀 CrownWorksNL Fully Automated Email Sender\n');
  
  // Find CSV
  const csvPath = process.argv[2] || path.join(process.env.USERPROFILE || process.env.HOME, 'Desktop', 'crownworks_600_contacts.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.log('❌ CSV file not found:', csvPath);
    console.log('Usage: node scripts/send-emails-auto.js <path-to-csv>');
    process.exit(1);
  }
  
  const contacts = parseCSV(csvPath);
  console.log(`✅ Found ${contacts.length} contacts\n`);
  
  const transporter = await setupGmail();
  if (!transporter) {
    console.log('\n💡 Use the HTML method instead: node scripts/send-emails.js');
    process.exit(0);
  }
  
  console.log('📧 Starting automated email send...\n');
  const result = await sendEmails(transporter, contacts.slice(0, 100)); // Limit to 100 for first run
  
  console.log(`\n✅ Complete!`);
  console.log(`   Sent: ${result.sent}`);
  console.log(`   Failed: ${result.failed}`);
}

main().catch(console.error);

