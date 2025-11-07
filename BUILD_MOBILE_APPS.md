# 📱 BUILD MOBILE APPS - PLAY STORE & APP STORE

## ✅ SETUP COMPLETE

Capacitor is installed and configured! Now build your apps.

---

## 🚀 QUICK START

### Step 1: Build Next.js App
```bash
npm run build
```

This creates the `out` folder with static files.

---

### Step 2: Sync with Capacitor
```bash
npx cap sync
```

This copies your web app to native projects.

---

### Step 3: Open Native Projects

**For Android (Play Store):**
```bash
npx cap open android
```

**For iOS (App Store) - Mac only:**
```bash
npx cap open ios
```

---

## 📱 ANDROID APP (Google Play Store)

### Prerequisites
- Android Studio installed
- Java JDK 11+
- Android SDK

### Build Steps

1. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

2. **Configure App:**
   - App name: `CrownWorksNL`
   - Package: `com.crownworksnl.app`
   - Version: `1.0.0`
   - Version code: `1`

3. **Create Keystore (for release):**
   - In Android Studio: Build → Generate Signed Bundle/APK
   - Create new keystore
   - Save keystore password securely

4. **Build Release APK/AAB:**
   - Build → Generate Signed Bundle/APK
   - Choose "Android App Bundle" (recommended for Play Store)
   - Sign with your keystore
   - Output: `app-release.aab`

5. **Upload to Play Store:**
   - Go to: https://play.google.com/console
   - Create new app
   - Upload AAB file
   - Fill in store listing
   - Submit for review

---

## 🍎 iOS APP (Apple App Store)

### Prerequisites
- **Mac computer required**
- Xcode installed (from App Store)
- Apple Developer account ($99/year)
- macOS 12+

### Build Steps

1. **Open in Xcode:**
   ```bash
   npx cap open ios
   ```

2. **Configure Signing:**
   - Select project in Xcode
   - Go to "Signing & Capabilities"
   - Select your team
   - Enable "Automatically manage signing"

3. **Set App Info:**
   - Bundle Identifier: `com.crownworksnl.app`
   - Version: `1.0.0`
   - Build: `1`
   - Display Name: `CrownWorksNL`

4. **Add App Icons:**
   - In Xcode: Assets → AppIcon
   - Add icons (1024x1024, 512x512, etc.)
   - Or use: https://www.appicon.co

5. **Build for App Store:**
   - Product → Archive
   - Wait for archive to complete
   - Click "Distribute App"
   - Choose "App Store Connect"
   - Upload

6. **Submit to App Store:**
   - Go to: https://appstoreconnect.apple.com
   - Create new app
   - Fill in app information
   - Submit for review

---

## 🎨 APP ICONS & ASSETS

### Required Sizes

**Android:**
- Icon: 512x512px (Play Store)
- Adaptive icon: 1024x1024px
- Splash screen: 1920x1080px

**iOS:**
- App icon: 1024x1024px (App Store)
- All sizes: Use Xcode asset catalog
- Splash screen: 2048x2048px

### Generate Icons
Use: https://www.appicon.co or https://icon.kitchen

---

## 📋 APP STORE LISTINGS

### Google Play Store

**App Name:** CrownWorksNL  
**Short Description:** Business consulting and growth services in Newfoundland & Labrador  
**Full Description:**
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

**Screenshots:** Take screenshots of your website  
**Category:** Business  
**Content Rating:** Everyone  

---

### Apple App Store

**App Name:** CrownWorksNL  
**Subtitle:** Business Consulting & Growth Services  
**Description:** (Same as Play Store)  
**Keywords:** business, consulting, Newfoundland, Labrador, strategy, AI  
**Category:** Business  
**Age Rating:** 4+  

---

## 🔧 CONFIGURATION

### App ID
- **Android:** `com.crownworksnl.app`
- **iOS:** `com.crownworksnl.app`

### Version
- Current: `1.0.0`
- Update in `package.json` and native projects

### Permissions
Currently no special permissions needed (web app).

---

## 🚀 BUILD COMMANDS

```bash
# 1. Build web app
npm run build

# 2. Sync to native
npx cap sync

# 3. Open Android
npx cap open android

# 4. Open iOS (Mac only)
npx cap open ios
```

---

## 📝 SUBMISSION CHECKLIST

### Before Submitting:

**Android:**
- [ ] App icon (512x512)
- [ ] Screenshots (phone, tablet)
- [ ] Privacy policy URL
- [ ] Signed AAB file
- [ ] Store listing complete

**iOS:**
- [ ] App icon (1024x1024)
- [ ] Screenshots (all required sizes)
- [ ] Privacy policy URL
- [ ] App Store listing complete
- [ ] TestFlight testing (optional)

---

## 🎯 QUICK BUILD SCRIPT

Create `build-apps.ps1`:

```powershell
# Build web app
npm run build

# Sync Capacitor
npx cap sync

Write-Host "`n✅ Apps ready!`n" -ForegroundColor Green
Write-Host "Android: npx cap open android" -ForegroundColor Cyan
Write-Host "iOS: npx cap open ios (Mac only)`n" -ForegroundColor Cyan
```

---

## ✅ YOU'RE READY!

1. Run: `npm run build`
2. Run: `npx cap sync`
3. Open: `npx cap open android` or `npx cap open ios`
4. Build and submit!

**Your mobile apps are ready to build!** 📱

