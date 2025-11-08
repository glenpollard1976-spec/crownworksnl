/**
 * Send Bulk Launch Emails via Resend
 * Uses your existing Resend API key to send launch campaign emails
 */

require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.error('❌ RESEND_API_KEY not found in .env.local');
  console.log('\n📝 To set it up:');
  console.log('1. Get your API key from https://resend.com/api-keys');
  console.log('2. Add to .env.local: RESEND_API_KEY=re_xxxxxxxxxxxxx');
  process.exit(1);
}

const resend = new Resend(resendApiKey);

// Email template
function createEmailTemplate(name, business = '') {
  const personalizedBusiness = business ? `I noticed ${business} and thought you might be interested.` : '';
  
  return {
    subject: '🎉 CrownWorksNL Launch Special - Free Consultation for First 10 Businesses!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .offer { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 CrownWorksNL Launch Special!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            
            <p>I'm <strong>Glen Pollard</strong>, founder of <strong>CrownWorksNL</strong>, a business consulting firm based in Corner Brook, Newfoundland.</p>
            
            ${personalizedBusiness ? `<p>${personalizedBusiness}</p>` : ''}
            
            <p>We just launched, and I'm offering a <strong>special deal for the first 10 businesses</strong>:</p>
            
            <div class="offer">
              <h3>🎁 LAUNCH SPECIAL:</h3>
              <ul>
                <li>✅ <strong>FREE</strong> 30-minute business consultation (normally $299)</li>
                <li>✅ <strong>20% off</strong> first month of Business Growth Package</li>
                <li>✅ <strong>FREE</strong> AI Business Audit Report ($99 value)</li>
              </ul>
            </div>
            
            <h3>WHAT WE DO:</h3>
            <ul>
              <li>📊 Strategic business planning & roadmaps</li>
              <li>⚖️ AI-powered legal services (iLawyer)</li>
              <li>🐾 Veterinary practice management (ProVet)</li>
              <li>🤖 Custom AI solutions & automation</li>
              <li>🎨 Brand development & creative services</li>
              <li>📈 Business growth consulting</li>
            </ul>
            
            <h3>WHY CROWNWORKSNL:</h3>
            <ul>
              <li>📍 Based in Corner Brook - we understand the NL market</li>
              <li>🏛️ Qalipu First Nation owned - supporting Indigenous business</li>
              <li>🤖 AI-powered solutions - modern, efficient, cost-effective</li>
              <li>✅ Proven track record - helping businesses grow</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://www.crownworksnl.com/#contact" class="cta-button">Claim Your Free Consultation</a>
            </div>
            
            <p><strong>SPECIAL OFFER (First 10 Only):</strong></p>
            <p>Reply to this email or call me at <strong>+1 (709) 721-0340</strong> to claim your:</p>
            <ul>
              <li>Free consultation</li>
              <li>20% discount</li>
              <li>Free AI audit</li>
            </ul>
            
            <p>Visit: <a href="https://www.crownworksnl.com">www.crownworksnl.com</a></p>
            
            <p>Looking forward to helping your business grow!</p>
            
            <p>Best regards,<br>
            <strong>Glen Pollard</strong><br>
            Founder, CrownWorksNL<br>
            +1 (709) 721-0340<br>
            <a href="mailto:crownworksnl@gmail.com">crownworksnl@gmail.com</a></p>
            
            <div class="footer">
              <p><em>This offer expires in 7 days. Don't miss out!</em></p>
              <p>CrownWorksNL | Corner Brook, NL | <a href="https://www.crownworksnl.com">www.crownworksnl.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🎉 CrownWorksNL Launch Special - Free Consultation for First 10 Businesses!

Hi ${name},

I'm Glen Pollard, founder of CrownWorksNL, a business consulting firm based in Corner Brook, Newfoundland.

${personalizedBusiness ? personalizedBusiness + '\n' : ''}

We just launched, and I'm offering a special deal for the first 10 businesses:

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
    `.trim()
  };
}

// Read contacts from generated emails file
function getContacts() {
  const emailsPath = path.join(__dirname, '..', 'launch-emails.json');
  
  if (!fs.existsSync(emailsPath)) {
    console.error('❌ launch-emails.json not found!');
    console.log('💡 Run: node scripts/send-launch-email.js first');
    process.exit(1);
  }
  
  const emails = JSON.parse(fs.readFileSync(emailsPath, 'utf-8'));
  return emails;
}

// Send emails with rate limiting
async function sendBulkEmails(contacts, delayMs = 2000, batchSize = 10) {
  console.log(`\n📧 Sending ${contacts.length} emails via Resend...\n`);
  console.log(`⏱️  Delay between emails: ${delayMs}ms`);
  console.log(`📦 Batch size: ${batchSize}\n`);
  
  const results = {
    sent: 0,
    failed: 0,
    errors: []
  };
  
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const emailTemplate = createEmailTemplate(contact.name, contact.business);
    
    try {
      console.log(`[${i + 1}/${contacts.length}] Sending to ${contact.name} (${contact.to})...`);
      
      const { data, error } = await resend.emails.send({
        from: 'CrownWorksNL <noreply@crownworksnl.com>',
        to: contact.to,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
        replyTo: 'crownworksnl@gmail.com'
      });
      
      if (error) {
        console.error(`   ❌ Error: ${error.message}`);
        results.failed++;
        results.errors.push({ contact: contact.name, error: error.message });
      } else {
        console.log(`   ✅ Sent! (ID: ${data?.id || 'N/A'})`);
        results.sent++;
      }
      
      // Rate limiting - wait between emails
      if (i < contacts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
      
      // Batch pause every N emails
      if ((i + 1) % batchSize === 0 && i < contacts.length - 1) {
        console.log(`\n⏸️  Pausing for 5 seconds after batch of ${batchSize}...\n`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
    } catch (error) {
      console.error(`   ❌ Exception: ${error.message}`);
      results.failed++;
      results.errors.push({ contact: contact.name, error: error.message });
    }
  }
  
  return results;
}

// Main
async function main() {
  console.log('========================================');
  console.log('  BULK LAUNCH EMAIL CAMPAIGN');
  console.log('  Using Resend API');
  console.log('========================================\n');
  
  const contacts = getContacts();
  console.log(`✅ Loaded ${contacts.length} contacts\n`);
  
  // Limit to first 100 for safety (Resend free tier: 3,000/month)
  const contactsToSend = contacts.slice(0, 100);
  console.log(`📊 Sending to first ${contactsToSend.length} contacts\n`);
  
  // Confirm before sending
  console.log('⚠️  READY TO SEND EMAILS');
  console.log(`   Recipients: ${contactsToSend.length}`);
  console.log(`   Estimated time: ${Math.ceil((contactsToSend.length * 2) / 60)} minutes\n`);
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to start...\n');
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const results = await sendBulkEmails(contactsToSend, 2000, 10);
  
  console.log('\n========================================');
  console.log('  CAMPAIGN COMPLETE');
  console.log('========================================\n');
  console.log(`✅ Sent: ${results.sent}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Success rate: ${((results.sent / contactsToSend.length) * 100).toFixed(1)}%\n`);
  
  if (results.errors.length > 0) {
    console.log('❌ Errors:');
    results.errors.slice(0, 5).forEach(err => {
      console.log(`   - ${err.contact}: ${err.error}`);
    });
    if (results.errors.length > 5) {
      console.log(`   ... and ${results.errors.length - 5} more`);
    }
  }
  
  console.log('\n🎉 Campaign sent! Check your Resend dashboard for delivery status.\n');
  console.log('💡 Next steps:');
  console.log('   1. Monitor replies to crownworksnl@gmail.com');
  console.log('   2. Follow up with interested businesses');
  console.log('   3. Track conversions');
  console.log('   4. Send follow-up emails in 3-5 days\n');
}

main().catch(console.error);

