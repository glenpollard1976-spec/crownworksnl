// BULK EMAIL SENDER - ACTUAL SMTP SENDING
// This actually SENDS emails via SMTP, not just opening mailto links
// Run: node scripts/send-bulk-smtp.js [path-to-csv]

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// EMAIL TEMPLATE - CrownWorksNL
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

// Parse CSV
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
      let email = '', name = '';
      
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
        contacts.push({ name: name || 'there', email: email.toLowerCase() });
      }
    }
    return contacts;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

// Setup email transporter
function createTransporter() {
  // Get SMTP config from environment or prompt
  const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD,
    },
  };

  // Check if credentials are provided
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.error('\n❌ ERROR: SMTP credentials not found!');
    console.error('\n📧 Setup Instructions:');
    console.error('   1. Create a .env file in the project root');
    console.error('   2. Add your email credentials:');
    console.error('      SMTP_HOST=smtp.gmail.com');
    console.error('      SMTP_PORT=587');
    console.error('      SMTP_USER=your-email@gmail.com');
    console.error('      SMTP_PASS=your-app-password');
    console.error('\n   For Gmail:');
    console.error('   - Enable 2-factor authentication');
    console.error('   - Generate an App Password: https://myaccount.google.com/apppasswords');
    console.error('   - Use the App Password (not your regular password)');
    console.error('\n   For Outlook/Hotmail:');
    console.error('   - SMTP_HOST=smtp-mail.outlook.com');
    console.error('   - SMTP_PORT=587');
    console.error('   - Use your email and password');
    process.exit(1);
  }

  return nodemailer.createTransport(smtpConfig);
}

// Send single email
async function sendEmail(transporter, contact, subject, body) {
  try {
    const mailOptions = {
      from: `"Glen Pollard - CrownWorksNL" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: subject,
      text: body(contact.name),
      replyTo: 'info@crownworksnl.com',
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, email: contact.email, messageId: info.messageId };
  } catch (error) {
    return { success: false, email: contact.email, error: error.message };
  }
}

// Batch send with delays
async function batchSend(transporter, contacts, batchSize = 10, delayMs = 5000) {
  console.log(`\n🚀 Starting BULK EMAIL SEND...`);
  console.log(`📊 Total contacts: ${contacts.length}`);
  console.log(`📦 Batch size: ${batchSize} emails per batch`);
  console.log(`⏱️  Delay between batches: ${delayMs / 1000} seconds`);
  console.log(`📧 From: ${process.env.SMTP_USER || process.env.EMAIL_USER}`);
  console.log(`🌐 About: CrownWorksNL (https://crownworksnl.com)\n`);
  
  let sent = 0;
  let failed = 0;
  const batches = [];
  
  // Create batches
  for (let i = 0; i < contacts.length; i += batchSize) {
    batches.push(contacts.slice(i, i + batchSize));
  }
  
  console.log(`📋 Created ${batches.length} batches\n`);
  
  // Test email first
  console.log('🧪 Sending test email to first contact...');
  const testResult = await sendEmail(transporter, contacts[0], EMAIL_TEMPLATE.subject, EMAIL_TEMPLATE.body);
  if (testResult.success) {
    console.log(`✅ Test email sent successfully to ${testResult.email}\n`);
    console.log('⚠️  Check your inbox to verify the email looks correct!');
    console.log('   Press Ctrl+C to stop, or wait 5 seconds to continue...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));
  } else {
    console.error(`❌ Test email failed: ${testResult.error}`);
    console.error('   Please check your SMTP credentials and try again.');
    process.exit(1);
  }
  
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`\n📦 Batch ${batchIndex + 1}/${batches.length} (${batch.length} emails)`);
    
    // Send all emails in this batch
    const promises = batch.map(contact => 
      sendEmail(transporter, contact, EMAIL_TEMPLATE.subject, EMAIL_TEMPLATE.body)
    );
    
    const results = await Promise.all(promises);
    
    // Count successes and failures
    results.forEach(result => {
      if (result.success) {
        sent++;
        console.log(`  ✅ [${sent}/${contacts.length}] Sent to: ${result.email}`);
      } else {
        failed++;
        console.log(`  ❌ Failed: ${result.email} - ${result.error}`);
      }
    });
    
    console.log(`  📊 Batch ${batchIndex + 1} complete - ${sent} sent, ${failed} failed`);
    
    // Delay between batches (except last one)
    if (batchIndex < batches.length - 1) {
      console.log(`  ⏳ Waiting ${delayMs / 1000} seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  console.log(`\n✅ COMPLETE!`);
  console.log(`   📧 Sent: ${sent} emails`);
  console.log(`   ❌ Failed: ${failed} emails`);
  console.log(`   📊 Success rate: ${((sent / contacts.length) * 100).toFixed(1)}%`);
  console.log(`\n🎯 All emails sent about CrownWorksNL (https://crownworksnl.com)!`);
}

// Main
async function main() {
  console.log('🤖 CrownWorksNL BULK Email Sender (SMTP)\n');
  
  // Load .env if exists
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
          process.env[key.trim()] = value;
        }
      });
      console.log('✅ Loaded .env file\n');
    }
  } catch (error) {
    // Ignore if .env doesn't exist
  }
  
  // Find CSV
  const possiblePaths = [
    path.join(process.cwd(), 'contacts.csv'),
    path.join(process.cwd(), 'crownworks_600_contacts.csv'),
    path.join(process.env.USERPROFILE || process.env.HOME, 'Desktop', 'crownworks_600_contacts.csv'),
    path.join(process.env.USERPROFILE || process.env.HOME, 'OneDrive', 'Desktop', 'crownworks_600_contacts.csv'),
    path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads', 'crownworks_600_contacts.csv'),
  ];
  
  let csvPath = process.argv[2];
  if (!csvPath) {
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        csvPath = p;
        break;
      }
    }
  }
  
  if (!csvPath || !fs.existsSync(csvPath)) {
    console.log('❌ CSV file not found.');
    console.log('\nUsage: node scripts/send-bulk-smtp.js [path-to-csv]');
    console.log('\nOr place your CSV file in one of these locations:');
    possiblePaths.forEach(p => console.log(`  - ${p}`));
    process.exit(1);
  }
  
  console.log(`📁 Found CSV: ${csvPath}`);
  
  // Parse contacts
  console.log('📊 Parsing contacts...');
  const contacts = parseCSV(csvPath);
  
  if (contacts.length === 0) {
    console.log('❌ No valid contacts found.');
    process.exit(1);
  }
  
  console.log(`✅ Found ${contacts.length} valid contacts\n`);
  
  // Create transporter
  const transporter = createTransporter();
  
  // Verify connection
  console.log('🔌 Verifying SMTP connection...');
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified!\n');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    console.error('   Please check your credentials and try again.');
    process.exit(1);
  }
  
  // Get batch settings
  const batchSize = parseInt(process.argv[3]) || 10;
  const delayMs = parseInt(process.argv[4]) || 5000;
  
  console.log('⚙️  Settings:');
  console.log(`   Batch size: ${batchSize} emails per batch`);
  console.log(`   Delay: ${delayMs / 1000} seconds between batches`);
  console.log(`\n⚠️  This will ACTUALLY SEND ${contacts.length} emails via SMTP!`);
  console.log('   Make sure you want to proceed!\n');
  
  // Wait 3 seconds
  console.log('Starting in 3 seconds...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Start batch send
  await batchSend(transporter, contacts, batchSize, delayMs);
  
  // Close transporter
  transporter.close();
}

main().catch(console.error);

