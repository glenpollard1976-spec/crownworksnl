# 📱 OPEN MOBILE APP PROJECTS
# Opens Android Studio or Xcode for building

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("android", "ios", "both")]
    [string]$Platform = "android"
)

Write-Host "`n📱 CROWNWORKSNL - OPEN APP PROJECTS`n" -ForegroundColor Cyan

# Ensure build is done
Write-Host "🔨 Checking build..." -ForegroundColor Yellow
if (-not (Test-Path "out")) {
    Write-Host "⚠️  Building app first..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    }
}

# Sync Capacitor
Write-Host "🔄 Syncing Capacitor..." -ForegroundColor Yellow
npx cap sync
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Sync failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build and sync complete!`n" -ForegroundColor Green

# Open projects
if ($Platform -eq "android" -or $Platform -eq "both") {
    Write-Host "📱 Opening Android Studio..." -ForegroundColor Cyan
    Write-Host "   → Build → Generate Signed Bundle/APK" -ForegroundColor White
    Write-Host "   → Create keystore and sign" -ForegroundColor White
    Write-Host "   → Upload to Play Console`n" -ForegroundColor White
    
    # Try to open Android Studio
    $androidPath = "android"
    if (Test-Path $androidPath) {
        npx cap open android
    } else {
        Write-Host "❌ Android project not found!" -ForegroundColor Red
    }
}

if ($Platform -eq "ios" -or $Platform -eq "both") {
    Write-Host "🍎 Opening Xcode (Mac only)..." -ForegroundColor Cyan
    Write-Host "   → Product → Archive" -ForegroundColor White
    Write-Host "   → Distribute App → App Store Connect" -ForegroundColor White
    Write-Host "   → Upload to App Store Connect`n" -ForegroundColor White
    
    # Try to open Xcode
    $iosPath = "ios"
    if (Test-Path $iosPath) {
        npx cap open ios
    } else {
        Write-Host "❌ iOS project not found!" -ForegroundColor Red
    }
}

Write-Host "`n📋 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "   1. Sign/Archive the app in Android Studio or Xcode" -ForegroundColor White
Write-Host "   2. Upload to Play Console or App Store Connect" -ForegroundColor White
Write-Host "   3. Complete store listings" -ForegroundColor White
Write-Host "   4. Submit for review`n" -ForegroundColor White

Write-Host "📚 See SUBMIT_TO_STORES.md for detailed instructions`n" -ForegroundColor Cyan

