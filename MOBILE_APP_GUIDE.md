# 📱 CROWNWORKSNL MOBILE APP GUIDE

## ✅ SETUP COMPLETE

Your mobile apps are ready! Both Android and iOS projects are created.

---

## 🚀 QUICK START

### Build & Sync (One Command)
```bash
npm run build:mobile
```

Or manually:
```bash
npm run build
npm run cap:sync
```

---

## 📱 ANDROID APP (Google Play Store)

### Open in Android Studio
```bash
npm run cap:android
```

### Build Release APK/AAB

1. **In Android Studio:**
   - Build → Generate Signed Bundle/APK
   - Choose "Android App Bundle" (for Play Store)
   - Create keystore (save password!)
   - Build

2. **Upload to Play Store:**
   - Go to: https://play.google.com/console
   - Create app
   - Upload `app-release.aab`
   - Fill store listing
   - Submit

### App Info
- **Package:** `com.crownworksnl.app`
- **Version:** `1.0.0`
- **Version Code:** `1`

---

## 🍎 iOS APP (Apple App Store)

### Open in Xcode (Mac Only)
```bash
npm run cap:ios
```

### Build for App Store

1. **In Xcode:**
   - Product → Archive
   - Distribute App → App Store Connect
   - Upload

2. **Submit to App Store:**
   - Go to: https://appstoreconnect.apple.com
   - Create app
   - Fill app information
   - Submit for review

### App Info
- **Bundle ID:** `com.crownworksnl.app`
- **Version:** `1.0.0`
- **Build:** `1`

---

## 🎨 APP ICONS

### Generate Icons
Use: https://www.appicon.co

**Required:**
- Android: 512x512px (Play Store)
- iOS: 1024x1024px (App Store)

**Add Icons:**
- Android: `android/app/src/main/res/` folders
- iOS: Xcode → Assets → AppIcon

---

## 📋 STORE LISTINGS

### Google Play Store

**App Name:** CrownWorksNL  
**Short Description:** Business consulting and growth services in NL  
**Full Description:**
```
CrownWorksNL provides expert business consulting, strategy, and AI solutions to help businesses grow and succeed in Newfoundland & Labrador.

Founded by Glen Pollard of the Qalipu First Nation, we offer:
• Business consulting and strategy
• Brand development and creative services
• AI-powered solutions
• iLawyer legal assistance
• ProVet practice management

Get your free consultation today!
```

**Category:** Business  
**Screenshots:** Take from website  

---

### Apple App Store

**App Name:** CrownWorksNL  
**Subtitle:** Business Consulting & Growth  
**Description:** (Same as Play Store)  
**Keywords:** business, consulting, Newfoundland, strategy, AI  
**Category:** Business  

---

## 🔧 CONFIGURATION

### App Settings
- **App ID:** `com.crownworksnl.app`
- **App Name:** `CrownWorksNL`
- **Web URL:** `https://crownworksnl.com`

### API Endpoints
The app uses the live website API:
- Checkout: `https://crownworksnl.com/api/checkout`
- Webhook: `https://crownworksnl.com/api/webhook`

---

## ✅ CHECKLIST

### Before Building:

**Android:**
- [ ] App icon added (512x512)
- [ ] Keystore created
- [ ] Version number set
- [ ] Package name correct

**iOS:**
- [ ] App icon added (1024x1024)
- [ ] Signing configured
- [ ] Bundle ID correct
- [ ] Version number set

### Before Submitting:

**Both:**
- [ ] App tested on device
- [ ] All features working
- [ ] Screenshots ready
- [ ] Store listing written
- [ ] Privacy policy URL (if needed)

---

## 🚀 BUILD COMMANDS

```bash
# Build everything
npm run build:mobile

# Open Android
npm run cap:android

# Open iOS (Mac)
npm run cap:ios

# Sync only
npm run cap:sync
```

---

## 📱 YOUR APPS ARE READY!

**Android:** `android/` folder  
**iOS:** `ios/` folder  

**Next:** Open in Android Studio or Xcode and build!

