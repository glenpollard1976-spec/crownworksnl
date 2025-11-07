# 📱 SUBMIT TO PLAY STORE & APP STORE

## ✅ BUILD COMPLETE

Your apps are built and ready! Now submit them to stores.

---

## 🤖 ANDROID - GOOGLE PLAY STORE

### Step 1: Open in Android Studio
```bash
npm run cap:android
```

### Step 2: Create Signed Bundle (AAB)

1. **In Android Studio:**
   - Click: **Build** → **Generate Signed Bundle / APK**
   - Select: **Android App Bundle**
   - Click: **Next**

2. **Create Keystore:**
   - Click: **Create new...**
   - **Key store path:** Choose location (save this!)
   - **Password:** Create strong password (save it!)
   - **Key alias:** `crownworksnl`
   - **Key password:** Create password (save it!)
   - **Validity:** 25 years
   - **Certificate info:** Fill in your details
   - Click: **OK**

3. **Build:**
   - Select: **release**
   - Click: **Finish**
   - Wait for build to complete
   - **Output:** `android/app/release/app-release.aab`

### Step 3: Create Google Play Developer Account

1. **Go to:** https://play.google.com/console
2. **Sign up:** $25 one-time fee
3. **Complete:** Account setup and verification

### Step 4: Create App in Play Console

1. **Click:** "Create app"
2. **Fill in:**
   - **App name:** CrownWorksNL
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free
   - Click: **Create**

### Step 5: Upload AAB

1. **Go to:** Production → Create new release
2. **Upload:** `app-release.aab` file
3. **Release name:** 1.0.0 (First release)
4. **Release notes:**
   ```
   Initial release of CrownWorksNL mobile app.
   Access business consulting and growth services on the go.
   ```
5. **Click:** Review → Start rollout to Production

### Step 6: Complete Store Listing

**Required:**
- **App name:** CrownWorksNL
- **Short description:** Business consulting and growth services in Newfoundland & Labrador
- **Full description:**
  ```
  CrownWorksNL provides expert business consulting, strategy, and AI solutions to help businesses grow and succeed in Newfoundland & Labrador.

  Founded by Glen Pollard of the Qalipu First Nation, we offer:
  • Business consulting and strategy
  • Brand development and creative services
  • AI-powered solutions
  • iLawyer legal assistance
  • ProVet practice management

  Get your free consultation today and start growing your business with confidence.
  ```
- **App icon:** 512x512px (upload)
- **Screenshots:** At least 2 phone screenshots
- **Category:** Business
- **Contact:** info@crownworksnl.com
- **Privacy policy:** https://crownworksnl.com (or create one)

### Step 7: Submit for Review

1. **Complete all sections:**
   - Store listing ✅
   - Content rating ✅
   - Target audience ✅
   - App access ✅
   - Ads ✅
   - Data safety ✅

2. **Click:** "Submit for review"
3. **Wait:** Usually 1-3 days for approval

---

## 🍎 iOS - APPLE APP STORE

### Step 1: Open in Xcode (Mac Required)
```bash
npm run cap:ios
```

### Step 2: Configure Signing

1. **In Xcode:**
   - Select project: **App**
   - Go to: **Signing & Capabilities**
   - **Team:** Select your Apple Developer account
   - **Bundle Identifier:** `com.crownworksnl.app`
   - ✅ **Automatically manage signing**

### Step 3: Add App Icon

1. **In Xcode:**
   - Go to: **Assets** → **AppIcon**
   - **Add:** 1024x1024px icon
   - Or use: https://www.appicon.co to generate all sizes

### Step 4: Create Apple Developer Account

1. **Go to:** https://developer.apple.com
2. **Enroll:** $99/year
3. **Complete:** Account setup

### Step 5: Archive & Upload

1. **In Xcode:**
   - Select: **Any iOS Device** (not simulator)
   - Click: **Product** → **Archive**
   - Wait for archive to complete

2. **Distribute:**
   - Click: **Distribute App**
   - Select: **App Store Connect**
   - Click: **Next** → **Upload**
   - Wait for upload to complete

### Step 6: Create App in App Store Connect

1. **Go to:** https://appstoreconnect.apple.com
2. **Click:** "My Apps" → "+" → "New App"
3. **Fill in:**
   - **Platform:** iOS
   - **Name:** CrownWorksNL
   - **Primary Language:** English
   - **Bundle ID:** com.crownworksnl.app
   - **SKU:** crownworksnl-ios-001
   - Click: **Create**

### Step 7: Complete App Information

**Required:**
- **App Name:** CrownWorksNL
- **Subtitle:** Business Consulting & Growth Services
- **Description:**
  ```
  CrownWorksNL provides expert business consulting, strategy, and AI solutions to help businesses grow and succeed in Newfoundland & Labrador.

  Founded by Glen Pollard of the Qalipu First Nation, we offer:
  • Business consulting and strategy
  • Brand development and creative services
  • AI-powered solutions
  • iLawyer legal assistance
  • ProVet practice management

  Get your free consultation today and start growing your business with confidence.
  ```
- **Keywords:** business, consulting, Newfoundland, Labrador, strategy, AI, iLawyer, ProVet
- **Category:** Business
- **App Icon:** 1024x1024px
- **Screenshots:** Required for all device sizes
- **Privacy Policy URL:** https://crownworksnl.com
- **Support URL:** https://crownworksnl.com
- **Marketing URL:** https://crownworksnl.com

### Step 8: Submit for Review

1. **Version:** 1.0.0
2. **Build:** Select uploaded build
3. **Export Compliance:** Answer questions
4. **Click:** "Submit for Review"
5. **Wait:** Usually 1-7 days for approval

---

## 📋 CHECKLIST

### Before Building:
- [ ] App tested on device
- [ ] All features working
- [ ] App icons ready (512x512 Android, 1024x1024 iOS)
- [ ] Screenshots taken

### Before Submitting:
- [ ] Developer account created
- [ ] App signed (Android) / Archived (iOS)
- [ ] Store listing complete
- [ ] Privacy policy URL ready
- [ ] Support email configured

---

## 🎯 QUICK REFERENCE

**Android:**
- Developer: https://play.google.com/console ($25)
- Upload: AAB file
- Review: 1-3 days

**iOS:**
- Developer: https://developer.apple.com ($99/year)
- Upload: Via Xcode Archive
- Review: 1-7 days

---

## ✅ YOU'RE READY!

1. **Build:** `npm run build:mobile` ✅ (Done)
2. **Open:** `npm run cap:android` or `npm run cap:ios`
3. **Sign/Archive:** In Android Studio or Xcode
4. **Submit:** To Play Console or App Store Connect

**Good luck! 🚀**

