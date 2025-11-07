// BATCH EMAIL SENDER - Fully Automated
// Opens emails in batches automatically

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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

// Generate mailto link
function generateMailto(contact, subject, body) {
  const personalizedBody = body(contact.name);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(personalizedBody);
  return `mailto:${contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
}

// Open mailto link (Windows)
function openMailto(link) {
  return new Promise((resolve) => {
    exec(`start "" "${link}"`, (error) => {
      if (error) {
        // Try alternative method
        exec(`cmd /c start "" "${link}"`, () => resolve());
      } else {
        resolve();
      }
    });
  });
}

// Batch send with delays
async function batchSend(contacts, batchSize = 10, delayMs = 5000) {
  // Limit to 111 emails as requested
  const maxEmails = 111;
  const contactsToSend = contacts.slice(0, maxEmails);
  if (contacts.length > maxEmails) {
    console.log(`📊 Limiting to first ${maxEmails} contacts (out of ${contacts.length} total)\n`);
  }
  
  console.log(`\n🚀 Starting batch send...`);
  console.log(`📊 Total contacts: ${contactsToSend.length}`);
  console.log(`📦 Batch size: ${batchSize}`);
  console.log(`⏱️  Delay between batches: ${delayMs / 1000} seconds\n`);
  
  let sent = 0;
  const batches = [];
  
  // Create batches from limited contacts
  for (let i = 0; i < contactsToSend.length; i += batchSize) {
    batches.push(contactsToSend.slice(i, i + batchSize));
  }
  
  console.log(`📋 Created ${batches.length} batches\n`);
  
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`\n📦 Batch ${batchIndex + 1}/${batches.length} (${batch.length} emails)`);
    
    // Open all emails in this batch
    for (let i = 0; i < batch.length; i++) {
      const contact = batch[i];
      const mailto = generateMailto(contact, EMAIL_TEMPLATE.subject, EMAIL_TEMPLATE.body);
      
      console.log(`  📧 [${i + 1}/${batch.length}] Opening: ${contact.email}`);
      await openMailto(mailto);
      sent++;
      
      // Small delay between emails in same batch
      if (i < batch.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`  ✅ Batch ${batchIndex + 1} complete - ${sent}/${contactsToSend.length} total`);
    
    // Delay between batches (except last one)
    if (batchIndex < batches.length - 1) {
      console.log(`  ⏳ Waiting ${delayMs / 1000} seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  console.log(`\n✅ COMPLETE! Opened ${sent} emails (out of ${contactsToSend.length} requested)`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Your email client should have opened with all emails`);
  console.log(`   2. Review and click "Send" on each one`);
  console.log(`   3. Or use your email client's batch send feature`);
  console.log(`\n🎯 You're done! Just send them now.`);
}

// Main
async function main() {
  console.log('🤖 CrownWorksNL Batch Email Sender\n');
  
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
    console.log('\nUsage: node scripts/send-batch.js [path-to-csv]');
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
  
  // Get batch settings
  const batchSize = parseInt(process.argv[3]) || 10;
  const delayMs = parseInt(process.argv[4]) || 5000;
  
  console.log('⚙️  Settings:');
  console.log(`   Batch size: ${batchSize} emails per batch`);
  console.log(`   Delay: ${delayMs / 1000} seconds between batches`);
  console.log(`\n⚠️  This will open ${contacts.length} emails in your default email client.`);
  console.log('   Make sure your email client is ready!\n');
  
  // Wait 3 seconds
  console.log('Starting in 3 seconds...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Start batch send
  await batchSend(contacts, batchSize, delayMs);
}

main().catch(console.error);

