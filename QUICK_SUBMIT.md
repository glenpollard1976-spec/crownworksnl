# 🚀 QUICK SUBMIT GUIDE

## ✅ BUILD COMPLETE!

Your apps are built and synced. Now submit them.

---

## 🤖 ANDROID (5 MINUTES)

### 1. Open Project
```bash
npm run cap:android
```

### 2. Build Signed Bundle
- **Build** → **Generate Signed Bundle/APK**
- **Create keystore** (save password!)
- **Build** → Output: `app-release.aab`

### 3. Upload to Play Store
1. Go to: https://play.google.com/console
2. **Create app** (if first time)
3. **Production** → **Create new release**
4. **Upload** `app-release.aab`
5. **Fill store listing:**
   - Name: CrownWorksNL
   - Description: (see below)
   - Icon: 512x512px
   - Screenshots: 2+ phone screenshots
6. **Submit for review**

**Cost:** $25 one-time  
**Time:** 1-3 days for approval

---

## 🍎 iOS (10 MINUTES)

### 1. Open Project (Mac Only)
```bash
npm run cap:ios
```

### 2. Archive
- **Product** → **Archive**
- **Distribute App** → **App Store Connect**
- **Upload**

### 3. Submit to App Store
1. Go to: https://appstoreconnect.apple.com
2. **My Apps** → **+** → **New App**
3. **Fill app info:**
   - Name: CrownWorksNL
   - Bundle ID: com.crownworksnl.app
   - Description: (see below)
   - Icon: 1024x1024px
   - Screenshots: All required sizes
4. **Submit for review**

**Cost:** $99/year  
**Time:** 1-7 days for approval

---

## 📝 STORE LISTING TEXT

### App Description (Use for both stores):

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

### Keywords (iOS):
`business, consulting, Newfoundland, Labrador, strategy, AI, iLawyer, ProVet`

### Category:
**Business**

---

## ✅ CHECKLIST

**Before Submitting:**
- [ ] App tested on device
- [ ] App icon ready (512x512 Android, 1024x1024 iOS)
- [ ] Screenshots taken
- [ ] Developer account created
- [ ] App signed/archived
- [ ] Store listing complete

---

## 🎯 YOU'RE READY!

**Android:** Open with `npm run cap:android`  
**iOS:** Open with `npm run cap:ios` (Mac only)

**See `SUBMIT_TO_STORES.md` for detailed steps!**

