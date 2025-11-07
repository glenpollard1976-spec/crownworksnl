const fs = require('fs');
const path = require('path');

// Read Corner Brook contacts
const contacts = [];
const csvPath = path.join(__dirname, 'corner_brook_contacts.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Skip header
for (let i = 1; i < lines.length; i++) {
  const [businessName, email, industry, city, phone] = lines[i].split(',');
  if (email && email.includes('@')) {
    contacts.push({
      name: businessName || 'Business Owner',
      email: email.trim(),
      business: businessName,
      industry: industry || 'Business',
      city: city || 'Corner Brook',
      phone: phone || ''
    });
  }
}

console.log(`\n📧 CROWNWORKSNL - CORNER BROOK EMAIL CAMPAIGN\n`);
console.log(`Found ${contacts.length} Corner Brook businesses\n`);

// Email template
const emailTemplate = (contact) => {
  const subject = `Local Business Growth Services in Corner Brook - Free Consultation`;
  
  const body = `Hi ${contact.name || 'there'},

I'm Glen Pollard, founder of CrownWorksNL, and I'm based right here in Corner Brook, Newfoundland.

I help local businesses in Corner Brook and across Newfoundland & Labrador:
✓ Grow revenue by 20-40% in 6 months
✓ Streamline operations with AI automation
✓ Build stronger brands and marketing systems
✓ Automate legal document prep (iLawyer)
✓ Manage veterinary practices (ProVet)

**SPECIAL OFFER FOR CORNER BROOK BUSINESSES:**

Free 30-minute business growth consultation for the first 3 Corner Brook businesses that respond this week.

No obligation. Just a chance to see if I can help you:
- Increase revenue
- Reduce operational costs
- Scale faster with automation
- Build a stronger brand

**What you'll get in the free consultation:**
✓ Custom growth roadmap for your business
✓ AI automation opportunities assessment
✓ Marketing strategy recommendations
✓ Legal/vet practice optimization (if applicable)
✓ All FREE (normally $299)

**Only 3 spots available this week. First come, first served.**

**How to claim your spot:**

📞 Call me: +1 (709) 721-0340
📧 Reply to this email: crownworksnl@gmail.com
🌐 Book online: https://crownworksnl.com

**About me:**
- Based in Corner Brook, NL (local business owner)
- Member of Qalipu First Nation
- Helped 12+ businesses this month
- Specialize in AI-powered business growth
- Understand the unique challenges of doing business in Corner Brook

**My Services:**
• Business Growth Package: $1,499/month (strategy, branding, content)
• AI Solutions: Custom automation for your business
• iLawyer: AI-powered legal document assistance
• ProVet: Veterinary practice management

Looking forward to helping you grow your Corner Brook business,

Glen Pollard
CrownWorksNL
Corner Brook, Newfoundland & Labrador

📞 +1 (709) 721-0340
📧 crownworksnl@gmail.com
🌐 https://crownworksnl.com

P.S. - Even if you're not ready right now, reply and I'll send you a free business growth checklist with 20+ actionable tips specifically for Corner Brook businesses.`;

  return { subject, body };
};

// Generate mailto links
console.log('📧 Generating email links for Corner Brook businesses...\n');

let html = `<!DOCTYPE html>
<html>
<head>
  <title>CrownWorksNL - Corner Brook Email Campaign</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
    .email { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
    .business { font-weight: bold; color: #4f46e5; }
    .link { display: inline-block; margin: 10px 5px; padding: 10px 20px; background: #4f46e5; color: white; text-decoration: none; border-radius: 5px; }
    .link:hover { background: #4338ca; }
    h1 { color: #4f46e5; }
  </style>
</head>
<body>
  <h1>📧 CrownWorksNL - Corner Brook Email Campaign</h1>
  <p><strong>${contacts.length} Corner Brook businesses</strong></p>
  <p>Click each link to open email in your default email client.</p>
  <hr>
`;

contacts.forEach((contact, index) => {
  const { subject, body } = emailTemplate(contact);
  const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  html += `
  <div class="email">
    <div class="business">${index + 1}. ${contact.business}</div>
    <div>${contact.industry} • ${contact.city}</div>
    <div>${contact.email}</div>
    <a href="${mailtoLink}" class="link">📧 Send Email to ${contact.business}</a>
  </div>
  `;
});

html += `
</body>
</html>`;

// Save HTML file
fs.writeFileSync('corner-brook-email-campaign.html', html);
console.log('✅ Generated: corner-brook-email-campaign.html\n');

// Also create a text summary
let summary = `CROWNWORKSNL - CORNER BROOK EMAIL CAMPAIGN\n`;
summary += `==========================================\n\n`;
summary += `Total Contacts: ${contacts.length}\n\n`;

contacts.forEach((contact, index) => {
  summary += `${index + 1}. ${contact.business}\n`;
  summary += `   Email: ${contact.email}\n`;
  summary += `   Industry: ${contact.industry}\n\n`;
});

fs.writeFileSync('corner-brook-contacts-summary.txt', summary);
console.log('✅ Generated: corner-brook-contacts-summary.txt\n');

console.log('📋 NEXT STEPS:\n');
console.log('1. Open: corner-brook-email-campaign.html');
console.log('2. Click each email link to send');
console.log('3. Or use your email client to send to all contacts\n');
console.log(`Total: ${contacts.length} Corner Brook businesses ready to contact!\n`);

