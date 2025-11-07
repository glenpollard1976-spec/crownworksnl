/**
 * Google Submission Helper Script
 * 
 * This script helps automate some Google submission tasks.
 * Note: Some steps require manual action in Google's web interfaces.
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 CROWNWORKSNL - GOOGLE SUBMISSION HELPER\n');
console.log('This script will help you prepare files for Google submission.\n');

// Business information
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

// Create submission checklist
const checklist = `
# ✅ GOOGLE SUBMISSION CHECKLIST

## 📋 PREPARATION (DONE)
- [x] Website deployed: ${businessInfo.website}
- [x] Sitemap created: ${businessInfo.sitemap}
- [x] Structured data added
- [x] Mobile app section added
- [x] App links configured

## 🚀 GOOGLE MY BUSINESS
- [ ] Go to: https://www.google.com/business
- [ ] Sign in with: ${businessInfo.email}
- [ ] Claim/Add business: ${businessInfo.name}
- [ ] Add address: ${businessInfo.address}
- [ ] Add phone: ${businessInfo.phone}
- [ ] Add website: ${businessInfo.website}
- [ ] Add services (see services list below)
- [ ] Upload photos
- [ ] Set business hours
- [ ] Verify business (phone or postcard)
- [ ] Create post about mobile apps

## 🔍 GOOGLE SEARCH CONSOLE
- [ ] Go to: https://search.google.com/search-console
- [ ] Sign in with: ${businessInfo.email}
- [ ] Add property: ${businessInfo.website}
- [ ] Verify ownership (choose method):
  - HTML file upload (upload google-site-verification.html)
  - HTML tag (add to <head>)
  - DNS verification
- [ ] Submit sitemap: ${businessInfo.sitemap}
- [ ] Request indexing for:
  - ${businessInfo.website}
  - ${businessInfo.website}/#mobile-apps
  - ${businessInfo.website}/#ilawyer
  - ${businessInfo.website}/#provet
  - ${businessInfo.website}/#pricing

## 📱 GOOGLE PLAY CONSOLE
- [ ] Go to: https://play.google.com/console
- [ ] Sign in with Google account
- [ ] Pay $25 registration fee
- [ ] Create app: CrownWorksNL
- [ ] Package: com.crownworksnl.app
- [ ] Upload AAB file (from Android Studio)
- [ ] Add store listing (see description below)
- [ ] Upload graphics (icon, screenshots)
- [ ] Submit for review
- [ ] Once approved, update website link: ${businessInfo.androidApp}

## 🍎 APP STORE CONNECT
- [ ] Go to: https://appstoreconnect.apple.com
- [ ] Sign in with Apple ID
- [ ] Enroll in Developer Program ($99/year)
- [ ] Create app: CrownWorksNL
- [ ] Bundle ID: com.crownworksnl.app
- [ ] Upload IPA file (from Xcode)
- [ ] Add store listing (see description below)
- [ ] Upload graphics (icon, screenshots)
- [ ] Submit for review
- [ ] Once approved, update website link: ${businessInfo.iosApp}

## 📊 GOOGLE ANALYTICS
- [ ] Go to: https://analytics.google.com
- [ ] Sign in with: ${businessInfo.email}
- [ ] Create account: CrownWorksNL
- [ ] Create property: ${businessInfo.website}
- [ ] Get tracking ID (G-XXXXXXXXXX)
- [ ] Add tracking code to app/layout.js
- [ ] Set up goals:
  - Contact form submissions
  - Payment button clicks
  - App download clicks

---

## 📝 SERVICES TO ADD TO GOOGLE MY BUSINESS

1. Business Consulting
2. Strategic Planning
3. AI Solutions & Automation
4. Legal Document Assistance (iLawyer)
5. Veterinary Practice Management (ProVet)
6. Brand Development
7. Marketing Services

---

## 📝 APP STORE DESCRIPTIONS

### Google Play Store Description:
CrownWorksNL provides expert business consulting, strategy, and AI solutions to help businesses grow and succeed in Newfoundland & Labrador.

APP FEATURES:
✓ Full website functionality
✓ Secure payment processing
✓ Contact forms & consultations
✓ iLawyer legal assistance
✓ ProVet practice management
✓ AI agent information
✓ Offline access support

SERVICES:
• Business Growth Package ($1,499/month)
• AI Solutions (custom pricing)
• iLawyer (legal document assistance)
• ProVet (veterinary practice management)

Download now to access all CrownWorksNL services on the go!

### App Store Description:
CrownWorksNL provides expert business consulting, strategy, and AI solutions to help businesses grow and succeed in Newfoundland & Labrador.

APP FEATURES:
✓ Full website functionality
✓ Secure payment processing
✓ Contact forms & consultations
✓ iLawyer legal assistance
✓ ProVet practice management
✓ AI agent information
✓ Offline access support

SERVICES:
• Business Growth Package ($1,499/month)
• AI Solutions (custom pricing)
• iLawyer (legal document assistance)
• ProVet (veterinary practice management)

Download now to access all CrownWorksNL services on the go!

---

## 🔗 QUICK LINKS

- Google My Business: https://www.google.com/business
- Google Search Console: https://search.google.com/search-console
- Google Play Console: https://play.google.com/console
- App Store Connect: https://appstoreconnect.apple.com
- Google Analytics: https://analytics.google.com

---

## ✅ NEXT STEPS

1. Open each link above
2. Sign in with your accounts
3. Follow the checklist items
4. Update website with actual app store links once apps are approved
5. Monitor Google Search Console for indexing status

Good luck! 🚀
`;

// Save checklist
fs.writeFileSync('GOOGLE_SUBMISSION_CHECKLIST.md', checklist);
console.log('✅ Created: GOOGLE_SUBMISSION_CHECKLIST.md\n');

// Create sitemap submission URLs
const sitemapUrls = `
# 📍 SITEMAP SUBMISSION URLs

## Google Search Console
After verifying your site, submit this sitemap:
${businessInfo.sitemap}

## Bing Webmaster Tools
https://www.bing.com/webmasters
Submit: ${businessInfo.sitemap}

## Yandex Webmaster
https://webmaster.yandex.com
Submit: ${businessInfo.sitemap}

## Direct Sitemap Access
${businessInfo.sitemap}
`;

fs.writeFileSync('SITEMAP_URLS.txt', sitemapUrls);
console.log('✅ Created: SITEMAP_URLS.txt\n');

// Create verification instructions
const verificationInstructions = `
# 🔐 GOOGLE SEARCH CONSOLE VERIFICATION

## Method 1: HTML File Upload (Easiest)

1. Go to: https://search.google.com/search-console
2. Add property: ${businessInfo.website}
3. Choose "HTML file upload"
4. Download the verification file Google provides
5. Upload it to: public/google-site-verification.html
6. Deploy website
7. Click "Verify" in Search Console

## Method 2: HTML Tag

1. Go to: https://search.google.com/search-console
2. Add property: ${businessInfo.website}
3. Choose "HTML tag"
4. Copy the meta tag Google provides
5. Add it to app/layout.js in the <head> section
6. Deploy website
7. Click "Verify" in Search Console

## Method 3: DNS Verification

1. Go to: https://search.google.com/search-console
2. Add property: ${businessInfo.website}
3. Choose "Domain name provider"
4. Follow DNS instructions
5. Add TXT record to your domain
6. Click "Verify" in Search Console

---

## Current Verification File

Location: public/google-site-verification.html

⚠️ Replace YOUR_VERIFICATION_CODE_HERE with the actual code from Google Search Console.
`;

fs.writeFileSync('VERIFICATION_INSTRUCTIONS.md', verificationInstructions);
console.log('✅ Created: VERIFICATION_INSTRUCTIONS.md\n');

console.log('📋 FILES CREATED:\n');
console.log('1. GOOGLE_SUBMISSION_CHECKLIST.md - Complete checklist');
console.log('2. SITEMAP_URLS.txt - Sitemap URLs for submission');
console.log('3. VERIFICATION_INSTRUCTIONS.md - Verification methods');
console.log('4. public/google-site-verification.html - Verification file template\n');

console.log('🚀 NEXT STEPS:\n');
console.log('1. Open GOOGLE_SUBMISSION_CHECKLIST.md');
console.log('2. Follow each step in order');
console.log('3. Start with Google My Business (most important)');
console.log('4. Then Google Search Console');
console.log('5. Then app stores (after apps are built)\n');

console.log('✅ Ready to submit to Google!\n');

