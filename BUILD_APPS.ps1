# 📱 BUILD MOBILE APPS SCRIPT
# Automates building Android and iOS apps

Write-Host "`n📱 CROWNWORKSNL MOBILE APP BUILDER`n" -ForegroundColor Cyan

# Step 1: Build Next.js
Write-Host "🔨 Step 1: Building Next.js app..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!`n" -ForegroundColor Green

# Step 2: Sync Capacitor
Write-Host "🔄 Step 2: Syncing with Capacitor..." -ForegroundColor Yellow
npx cap sync
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Sync failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Sync complete!`n" -ForegroundColor Green

# Step 3: Summary
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ✅ MOBILE APPS READY!                                   ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host "`n"

Write-Host "📱 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "`nAndroid (Play Store):" -ForegroundColor Yellow
Write-Host "   1. Run: npm run cap:android" -ForegroundColor White
Write-Host "   2. In Android Studio: Build → Generate Signed Bundle/APK" -ForegroundColor White
Write-Host "   3. Upload AAB to Google Play Console" -ForegroundColor White

Write-Host "`niOS (App Store) - Mac only:" -ForegroundColor Yellow
Write-Host "   1. Run: npm run cap:ios" -ForegroundColor White
Write-Host "   2. In Xcode: Product → Archive" -ForegroundColor White
Write-Host "   3. Upload to App Store Connect" -ForegroundColor White

Write-Host "`n📋 App Details:" -ForegroundColor Cyan
Write-Host "   App ID: com.crownworksnl.app" -ForegroundColor White
Write-Host "   App Name: CrownWorksNL" -ForegroundColor White
Write-Host "   Version: 1.0.0" -ForegroundColor White

Write-Host "`n✅ Your mobile apps are ready to build!`n" -ForegroundColor Green

