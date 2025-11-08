/**
 * Launch Email Campaign - Get 50 Customers
 * Sends launch special email to contact list
 */

const fs = require('fs');
const path = require('path');

// Email template
const emailTemplate = `
Subject: 🎉 CrownWorksNL Launch Special - Free Consultation for First 10 Businesses!

Hi [Name],

I'm Glen Pollard, founder of CrownWorksNL, a business consulting firm based in Corner Brook, Newfoundland.

I'm reaching out because we just launched, and I'm offering a special deal for the first 10 businesses:

🎁 LAUNCH SPECIAL:
✅ FREE 30-minute business consultation (normally $299)
✅ 20% off first month of Business Growth Package
✅ FREE AI Business Audit Report ($99 value)

WHAT WE DO:
• Strategic business planning & roadmaps
• AI-powered legal services (iLawyer)
• Veterinary practice management (ProVet)
• Custom AI solutions & automation
• Brand development & creative services
• Business growth consulting

WHY CROWNWORKSNL:
• Based in Corner Brook - we understand the NL market
• Qalipu First Nation owned - supporting Indigenous business
• AI-powered solutions - modern, efficient, cost-effective
• Proven track record - helping businesses grow

SPECIAL OFFER (First 10 Only):
Reply to this email or call me at +1 (709) 721-0340 to claim your:
- Free consultation
- 20% discount
- Free AI audit

Visit: https://www.crownworksnl.com

Looking forward to helping your business grow!

Best regards,
Glen Pollard
Founder, CrownWorksNL
+1 (709) 721-0340
crownworksnl@gmail.com
www.crownworksnl.com

---
P.S. This offer expires in 7 days. Don't miss out!
`;

// Read contact list
function getContacts() {
  const contactFiles = [
    'corner_brook_contacts.csv',
    'corner_brook_real_contacts.csv',
    'crownworks_600_contacts.csv'
  ];
  
  const contacts = [];
  
  contactFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      // Skip header
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length >= 2) {
          contacts.push({
            name: parts[0]?.trim() || 'Business Owner',
            email: parts[1]?.trim() || parts[0]?.trim(),
            business: parts[2]?.trim() || ''
          });
        }
      }
    }
  });
  
  return contacts;
}

// Generate personalized emails
function generateEmails() {
  const contacts = getContacts();
  console.log(`\n📧 Found ${contacts.length} contacts\n`);
  
  const emails = contacts.slice(0, 100).map(contact => {
    const personalized = emailTemplate
      .replace('[Name]', contact.name)
      .replace('[Business]', contact.business || 'your business');
    
    return {
      to: contact.email,
      subject: '🎉 CrownWorksNL Launch Special - Free Consultation!',
      body: personalized,
      name: contact.name
    };
  });
  
  return emails;
}

// Main
console.log('========================================');
console.log('  LAUNCH EMAIL CAMPAIGN GENERATOR');
console.log('========================================\n');

const emails = generateEmails();

console.log(`✅ Generated ${emails.length} personalized emails\n`);
console.log('📋 Sample Email:');
console.log('----------------------------------------');
console.log(emails[0].body.substring(0, 500) + '...\n');

// Save to file
const outputPath = path.join(__dirname, '..', 'launch-emails.json');
fs.writeFileSync(outputPath, JSON.stringify(emails, null, 2));

console.log(`💾 Saved to: ${outputPath}\n`);
console.log('📧 Next Steps:');
console.log('1. Review the emails in launch-emails.json');
console.log('2. Use your email service (Resend, SendGrid, etc.) to send');
console.log('3. Or use the send-bulk script to send automatically\n');

console.log('🚀 Ready to send! This could get you 5-10 customers!\n');

