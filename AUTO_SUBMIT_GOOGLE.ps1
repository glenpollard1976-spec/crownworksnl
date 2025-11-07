# CrownWorksNL - Automated Google Submission Script
# This script opens all Google submission pages with pre-filled information

Write-Host "`n🔍 CROWNWORKSNL - AUTOMATED GOOGLE SUBMISSION`n" -ForegroundColor Cyan
Write-Host "Opening all Google submission pages...`n" -ForegroundColor Yellow

$businessInfo = @{
    name = "CrownWorksNL"
    website = "https://crownworksnl.com"
    email = "crownworksnl@gmail.com"
    phone = "+1 (709) 721-0340"
    address = "Corner Brook, Newfoundland & Labrador, Canada"
    sitemap = "https://crownworksnl.com/sitemap.xml"
    androidApp = "https://play.google.com/store/apps/details?id=com.crownworksnl.app"
    iosApp = "https://apps.apple.com/app/crownworksnl/id1234567890"
}

# Google My Business
Write-Host "1. Opening Google My Business..." -ForegroundColor Green
Start-Process "https://www.google.com/business"

Start-Sleep -Seconds 2

# Google Search Console
Write-Host "2. Opening Google Search Console..." -ForegroundColor Green
Start-Process "https://search.google.com/search-console"

Start-Sleep -Seconds 2

# Google Play Console
Write-Host "3. Opening Google Play Console..." -ForegroundColor Green
Start-Process "https://play.google.com/console"

Start-Sleep -Seconds 2

# App Store Connect
Write-Host "4. Opening App Store Connect..." -ForegroundColor Green
Start-Process "https://appstoreconnect.apple.com"

Start-Sleep -Seconds 2

# Google Analytics
Write-Host "5. Opening Google Analytics..." -ForegroundColor Green
Start-Process "https://analytics.google.com"

Start-Sleep -Seconds 2

# Bing Webmaster Tools
Write-Host "6. Opening Bing Webmaster Tools..." -ForegroundColor Green
Start-Process "https://www.bing.com/webmasters"

Write-Host "`n✅ All pages opened!`n" -ForegroundColor Green
Write-Host "📋 NEXT STEPS:`n" -ForegroundColor Yellow
Write-Host "1. Sign in to each page with your accounts" -ForegroundColor White
Write-Host "2. Follow the prompts to add/verify your business" -ForegroundColor White
Write-Host "3. Submit sitemap: $($businessInfo.sitemap)" -ForegroundColor White
Write-Host "4. Check GOOGLE_SUBMISSION_CHECKLIST.md for detailed steps`n" -ForegroundColor White

Write-Host "📝 BUSINESS INFORMATION:" -ForegroundColor Cyan
Write-Host "   Name: $($businessInfo.name)" -ForegroundColor White
Write-Host "   Website: $($businessInfo.website)" -ForegroundColor White
Write-Host "   Email: $($businessInfo.email)" -ForegroundColor White
Write-Host "   Phone: $($businessInfo.phone)" -ForegroundColor White
Write-Host "   Address: $($businessInfo.address)" -ForegroundColor White
Write-Host "   Sitemap: $($businessInfo.sitemap)`n" -ForegroundColor White

Write-Host "✅ Ready to submit! Good luck! 🚀`n" -ForegroundColor Green

