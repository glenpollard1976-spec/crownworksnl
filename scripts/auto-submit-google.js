/**
 * CrownWorksNL - Automated Google Submission Helper
 * Opens all Google submission pages and provides pre-filled information
 */

const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

const businessInfo = {
  name: 'CrownWorksNL',
  website: 'https://crownworksnl.com',
  email: 'crownworksnl@gmail.com',
  phone: '+1 (709) 721-0340',
  address: 'Corner Brook, Newfoundland & Labrador, Canada',
  sitemap: 'https://crownworksnl.com/sitemap.xml',
  androidApp: 'https://play.google.com/store/apps/details?id=com.crownworksnl.app',
  iosApp: 'https://apps.apple.com/app/crownworksnl/id1234567890'
};

const urls = {
  googleMyBusiness: 'https://www.google.com/business',
  googleSearchConsole: 'https://search.google.com/search-console',
  googlePlayConsole: 'https://play.google.com/console',
  appStoreConnect: 'https://appstoreconnect.apple.com',
  googleAnalytics: 'https://analytics.google.com',
  bingWebmaster: 'https://www.bing.com/webmasters'
};

console.log('\n🔍 CROWNWORKSNL - AUTOMATED GOOGLE SUBMISSION\n');
console.log('Opening all Google submission pages...\n');

// Function to open URL based on OS
function openURL(url) {
  const platform = os.platform();
  
  if (platform === 'win32') {
    // Windows
    exec(`start ${url}`, (error) => {
      if (error) console.error(`Error opening ${url}:`, error);
    });
  } else if (platform === 'darwin') {
    // macOS
    exec(`open ${url}`, (error) => {
      if (error) console.error(`Error opening ${url}:`, error);
    });
  } else {
    // Linux
    exec(`xdg-open ${url}`, (error) => {
      if (error) console.error(`Error opening ${url}:`, error);
    });
  }
}

// Open all URLs with delay
const urlsList = [
  { name: 'Google My Business', url: urls.googleMyBusiness },
  { name: 'Google Search Console', url: urls.googleSearchConsole },
  { name: 'Google Play Console', url: urls.googlePlayConsole },
  { name: 'App Store Connect', url: urls.appStoreConnect },
  { name: 'Google Analytics', url: urls.googleAnalytics },
  { name: 'Bing Webmaster Tools', url: urls.bingWebmaster }
];

let delay = 0;
urlsList.forEach((item, index) => {
  setTimeout(() => {
    console.log(`${index + 1}. Opening ${item.name}...`);
    openURL(item.url);
  }, delay);
  delay += 2000; // 2 second delay between each
});

// Create clipboard-ready information
const clipboardInfo = `
CrownWorksNL Business Information
================================

Business Name: ${businessInfo.name}
Website: ${businessInfo.website}
Email: ${businessInfo.email}
Phone: ${businessInfo.phone}
Address: ${businessInfo.address}
Sitemap: ${businessInfo.sitemap}

Services:
- Business Consulting
- Strategic Planning
- AI Solutions & Automation
- Legal Document Assistance (iLawyer)
- Veterinary Practice Management (ProVet)
- Brand Development
- Marketing Services

App Store Links:
- Android: ${businessInfo.androidApp}
- iOS: ${businessInfo.iosApp}
`;

// Save to file for easy copy-paste
fs.writeFileSync('BUSINESS_INFO_CLIPBOARD.txt', clipboardInfo);

setTimeout(() => {
  console.log('\n✅ All pages opened!\n');
  console.log('📋 NEXT STEPS:\n');
  console.log('1. Sign in to each page with your accounts');
  console.log('2. Follow the prompts to add/verify your business');
  console.log('3. Submit sitemap:', businessInfo.sitemap);
  console.log('4. Check GOOGLE_SUBMISSION_CHECKLIST.md for detailed steps\n');
  console.log('📝 Business information saved to: BUSINESS_INFO_CLIPBOARD.txt\n');
  console.log('✅ Ready to submit! Good luck! 🚀\n');
}, delay + 1000);

