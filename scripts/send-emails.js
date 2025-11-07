// Automated Email Sender for CrownWorksNL
// Run: node scripts/send-emails.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Email template
const EMAIL_TEMPLATE = {
  subject: "CrownWorksNL is Open - Free Consultation for NL Businesses",
  body: `Hi {name},

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

// Parse CSV file
function parseCSV(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) return [];
    
    // Detect headers
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const hasHeader = headers.some(h => h.includes('email') || h.includes('name'));
    
    const startIndex = hasHeader ? 1 : 0;
    const contacts = [];
    
    for (let i = startIndex; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      
      let email = '';
      let name = '';
      let phone = '';
      
      if (hasHeader) {
        const emailIndex = headers.findIndex(h => h.includes('email'));
        const nameIndex = headers.findIndex(h => h.includes('name') && !h.includes('email'));
        const phoneIndex = headers.findIndex(h => h.includes('phone') || h.includes('tel'));
        
        if (emailIndex >= 0 && values[emailIndex]) email = values[emailIndex].trim();
        if (nameIndex >= 0 && values[nameIndex]) name = values[nameIndex].trim();
        if (phoneIndex >= 0 && values[phoneIndex]) phone = values[phoneIndex].trim();
      } else {
        // Assume format: email, name, phone
        if (values[0] && values[0].includes('@')) {
          email = values[0].trim();
          if (values[1]) name = values[1].trim();
          if (values[2]) phone = values[2].trim();
        } else if (values[1] && values[1].includes('@')) {
          name = values[0]?.trim() || '';
          email = values[1].trim();
          phone = values[2]?.trim() || '';
        }
      }
      
      // Validate email
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        contacts.push({ name: name || 'there', email: email.toLowerCase(), phone });
      }
    }
    
    return contacts;
  } catch (error) {
    console.error('Error reading CSV:', error.message);
    return [];
  }
}

// Generate mailto links
function generateMailtoLinks(contacts, subject, body) {
  return contacts.map(contact => {
    const personalizedBody = body.replace(/\{name\}/g, contact.name);
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(personalizedBody);
    return `mailto:${contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
  });
}

// Save mailto links to HTML file for easy sending
function saveMailtoHTML(links, outputPath) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>CrownWorksNL Email Campaign</title>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
    .email-link { display: block; padding: 10px; margin: 5px 0; background: #4f46e5; color: white; text-decoration: none; border-radius: 5px; }
    .email-link:hover { background: #4338ca; }
    .stats { background: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    .instructions { background: #fef3c7; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
  </style>
</head>
<body>
  <h1>🚀 CrownWorksNL Email Campaign</h1>
  
  <div class="stats">
    <h2>📊 Stats</h2>
    <p><strong>Total Emails:</strong> ${links.length}</p>
    <p><strong>Status:</strong> Ready to send</p>
  </div>
  
  <div class="instructions">
    <h2>📧 How to Send</h2>
    <ol>
      <li>Click each email link below</li>
      <li>Your email client will open with the email pre-filled</li>
      <li>Click "Send"</li>
      <li>Repeat for all emails</li>
      <li><strong>Tip:</strong> Send 50-100 per hour to avoid spam filters</li>
    </ol>
  </div>
  
  <h2>📬 Email Links (${links.length} total)</h2>
  ${links.map((link, index) => 
    `<a href="${link}" class="email-link" target="_blank">Email #${index + 1} - Click to Send</a>`
  ).join('\n')}
  
  <script>
    // Auto-open emails one by one (optional - uncomment to enable)
    // let currentIndex = 0;
    // const links = ${JSON.stringify(links)};
    // function openNext() {
    //   if (currentIndex < links.length) {
    //     window.open(links[currentIndex], '_blank');
    //     currentIndex++;
    //     setTimeout(openNext, 2000); // 2 second delay between emails
    //   }
    // }
    // setTimeout(openNext, 3000); // Start after 3 seconds
  </script>
</body>
</html>`;
  
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Saved ${links.length} email links to: ${outputPath}`);
}

// Main function
async function main() {
  console.log('🚀 CrownWorksNL Automated Email Sender\n');
  
  // Find CSV file
  const possiblePaths = [
    path.join(process.cwd(), 'contacts.csv'),
    path.join(process.cwd(), 'crownworks_600_contacts.csv'),
    path.join(process.env.USERPROFILE || process.env.HOME, 'Desktop', 'crownworks_600_contacts.csv'),
    path.join(process.env.USERPROFILE || process.env.HOME, 'OneDrive', 'Desktop', 'crownworks_600_contacts.csv'),
    path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads', 'crownworks_600_contacts.csv'),
  ];
  
  let csvPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      csvPath = p;
      break;
    }
  }
  
  if (!csvPath) {
    console.log('❌ CSV file not found. Please provide the path to your contacts CSV file.');
    console.log('\nLooking in:');
    possiblePaths.forEach(p => console.log(`  - ${p}`));
    console.log('\nUsage: node scripts/send-emails.js <path-to-csv-file>');
    process.exit(1);
  }
  
  console.log(`📁 Found CSV: ${csvPath}`);
  
  // Parse contacts
  console.log('📊 Parsing contacts...');
  const contacts = parseCSV(csvPath);
  
  if (contacts.length === 0) {
    console.log('❌ No valid contacts found in CSV file.');
    process.exit(1);
  }
  
  console.log(`✅ Found ${contacts.length} valid contacts\n`);
  
  // Generate mailto links
  console.log('📧 Generating email links...');
  const links = generateMailtoLinks(contacts, EMAIL_TEMPLATE.subject, EMAIL_TEMPLATE.body);
  
  // Save to HTML file
  const outputPath = path.join(process.cwd(), 'email-campaign.html');
  saveMailtoHTML(links, outputPath);
  
  console.log('\n✅ DONE!');
  console.log(`\n📬 Next Steps:`);
  console.log(`1. Open: ${outputPath}`);
  console.log(`2. Click each email link to send`);
  console.log(`3. Send 50-100 per hour (to avoid spam filters)`);
  console.log(`\n🎯 You're ready to send ${contacts.length} emails!`);
}

// Run
main().catch(console.error);

