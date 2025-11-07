# CrownWorksNL Mobile App

This directory contains the mobile app setup for CrownWorksNL using Capacitor, which allows you to deploy the web app to iOS and Android.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- For iOS: Xcode and macOS
- For Android: Android Studio

### Installation

1. **Install Capacitor CLI globally:**
```bash
npm install -g @capacitor/cli
```

2. **Install Capacitor in the project:**
```bash
cd ..
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

3. **Initialize Capacitor:**
```bash
npx cap init
```
- App name: `CrownWorksNL`
- App ID: `com.crownworksnl.app`
- Web dir: `.next` (or `out` if using static export)

4. **Add platforms:**
```bash
npx cap add ios
npx cap add android
```

5. **Build the Next.js app:**
```bash
npm run build
```

6. **Sync with Capacitor:**
```bash
npx cap sync
```

7. **Open in native IDEs:**
```bash
# iOS
npx cap open ios

# Android
npx cap open android
```

## Building for Production

### iOS (App Store)
1. Open project in Xcode: `npx cap open ios`
2. Configure signing and certificates
3. Archive and upload to App Store Connect
4. Submit for review

### Android (Google Play)
1. Open project in Android Studio: `npx cap open android`
2. Generate signed APK/AAB
3. Upload to Google Play Console
4. Submit for review

## Configuration Files

- `capacitor.config.ts` - Capacitor configuration
- `ios/` - iOS native project
- `android/` - Android native project

## Notes

- The app uses the Next.js web build
- All web features work in the native app
- Native plugins can be added as needed
- Push notifications, camera, etc. require additional setup

