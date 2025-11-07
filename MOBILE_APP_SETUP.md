# 📱 Mobile App Setup Guide - CrownWorksNL

## Overview

Your website is now ready to be converted into native mobile apps for both iOS (App Store) and Android (Google Play Store) using Capacitor.

## What's Been Set Up

✅ **PWA (Progressive Web App)**
- Manifest.json created
- Service worker for offline support
- Installable on mobile devices
- Works on both iOS and Android

✅ **Mobile App Structure**
- Capacitor configuration ready
- Setup files created
- Ready for native deployment

## Next Steps

### Option 1: PWA (Easiest - No App Store Needed)

Your site is already a PWA! Users can:
1. Visit your website on mobile
2. See "Add to Home Screen" prompt
3. Install it like a native app
4. Works offline with service worker

**No additional setup needed!** Just deploy your site.

### Option 2: Native Apps (App Store & Play Store)

#### Step 1: Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

#### Step 2: Initialize
```bash
npx cap init
```
- App name: `CrownWorksNL`
- App ID: `com.crownworksnl.app`
- Web dir: `.next`

#### Step 3: Add Platforms
```bash
npx cap add ios
npx cap add android
```

#### Step 4: Build & Sync
```bash
npm run build
npx cap sync
```

#### Step 5: Open in Native IDEs
```bash
# iOS (requires Mac + Xcode)
npx cap open ios

# Android (requires Android Studio)
npx cap open android
```

#### Step 6: Build & Submit

**iOS:**
1. Open in Xcode
2. Configure signing
3. Archive → Upload to App Store Connect
4. Submit for review ($99/year developer account)

**Android:**
1. Open in Android Studio
2. Build → Generate Signed Bundle/APK
3. Upload to Google Play Console
4. Submit for review ($25 one-time fee)

## Icon Requirements

You need app icons. Create these files in `/public`:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

**Quick Icon Creation:**
- Use Canva (free)
- Use Figma (free)
- Use online icon generators
- Hire a designer on Fiverr ($10-50)

## App Store Assets Needed

### iOS App Store:
- App icon (1024x1024)
- Screenshots (various sizes)
- App description
- Privacy policy URL
- Support URL

### Google Play:
- App icon (512x512)
- Feature graphic (1024x500)
- Screenshots
- App description
- Privacy policy URL

## Costs

- **PWA:** FREE (no app stores needed)
- **iOS Developer Account:** $99/year
- **Google Play:** $25 one-time

## Recommendation

**Start with PWA** - It's free, works immediately, and gives you 90% of native app benefits. You can always add native apps later if needed.

## Support

See `mobile-app/README.md` for detailed technical setup.

