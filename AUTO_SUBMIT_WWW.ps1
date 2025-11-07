# Auto Submit CrownWorksNL to World Wide Web
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTO SUBMIT TO WORLD WIDE WEB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$siteUrl = "https://crownworksnl.com"
$siteName = "CrownWorksNL"
$email = "crownworksnl@gmail.com"
$phone = "+1 (709) 721-0340"
$location = "Corner Brook, Newfoundland & Labrador"

Write-Host "[1/10] Opening Search Engine Submission Pages..." -ForegroundColor Yellow

# Google Search Console
Write-Host "  - Google Search Console..." -ForegroundColor White
Start-Process "https://search.google.com/search-console/submit?url=$siteUrl"

Start-Sleep -Seconds 2

# Bing Webmaster Tools
Write-Host "  - Bing Webmaster Tools..." -ForegroundColor White
Start-Process "https://www.bing.com/webmasters/about?urls=$siteUrl"

Start-Sleep -Seconds 2

# Yandex Webmaster
Write-Host "  - Yandex Webmaster..." -ForegroundColor White
Start-Process "https://webmaster.yandex.com/site/add/?hostName=$siteUrl"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[2/10] Opening Business Directories..." -ForegroundColor Yellow

# Google My Business
Write-Host "  - Google My Business..." -ForegroundColor White
Start-Process "https://www.google.com/business/"

Start-Sleep -Seconds 2

# Bing Places
Write-Host "  - Bing Places..." -ForegroundColor White
Start-Process "https://www.bingplaces.com/"

Start-Sleep -Seconds 2

# Yelp for Business
Write-Host "  - Yelp for Business..." -ForegroundColor White
Start-Process "https://biz.yelp.com/"

Start-Sleep -Seconds 2

# Yellow Pages
Write-Host "  - Yellow Pages..." -ForegroundColor White
Start-Process "https://www.yellowpages.ca/"

Start-Sleep -Seconds 2

# Foursquare
Write-Host "  - Foursquare..." -ForegroundColor White
Start-Process "https://foursquare.com/"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[3/10] Opening Canadian Business Directories..." -ForegroundColor Yellow

# Canada411
Write-Host "  - Canada411..." -ForegroundColor White
Start-Process "https://www.canada411.ca/"

Start-Sleep -Seconds 2

# Canadian Business Directory
Write-Host "  - Canadian Business Directory..." -ForegroundColor White
Start-Process "https://www.canadianbusinessdirectory.ca/"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[4/10] Opening Social Media Platforms..." -ForegroundColor Yellow

# Facebook Business
Write-Host "  - Facebook Business..." -ForegroundColor White
Start-Process "https://www.facebook.com/business/"

Start-Sleep -Seconds 2

# LinkedIn Company Page
Write-Host "  - LinkedIn Company Page..." -ForegroundColor White
Start-Process "https://www.linkedin.com/company/setup/new/"

Start-Sleep -Seconds 2

# Twitter Business
Write-Host "  - Twitter Business..." -ForegroundColor White
Start-Process "https://business.twitter.com/"

Start-Sleep -Seconds 2

# Instagram Business
Write-Host "  - Instagram Business..." -ForegroundColor White
Start-Process "https://business.instagram.com/"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[5/10] Opening Sitemap Submission..." -ForegroundColor Yellow

# Google Sitemap Submission
Write-Host "  - Google Sitemap..." -ForegroundColor White
Start-Process "https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3A$siteUrl"

Start-Sleep -Seconds 2

# Bing Sitemap Submission
Write-Host "  - Bing Sitemap..." -ForegroundColor White
Start-Process "https://www.bing.com/webmasters/sitemaps?url=$siteUrl"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[6/10] Opening Local Business Directories..." -ForegroundColor Yellow

# Newfoundland Business Directory
Write-Host "  - NL Business Directory..." -ForegroundColor White
Start-Process "https://www.newfoundlandlabrador.com/business-directory"

Start-Sleep -Seconds 2

# Corner Brook Business Directory
Write-Host "  - Corner Brook Directory..." -ForegroundColor White
Start-Process "https://www.cornerbrook.com/"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[7/10] Opening Industry-Specific Directories..." -ForegroundColor Yellow

# Business Consulting Directories
Write-Host "  - Business Consulting Directories..." -ForegroundColor White
Start-Process "https://www.business.com/"

Start-Sleep -Seconds 2

# AI Services Directories
Write-Host "  - AI Services Directories..." -ForegroundColor White
Start-Process "https://www.producthunt.com/"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[8/10] Opening App Store Submission..." -ForegroundColor Yellow

# Google Play Console
Write-Host "  - Google Play Console..." -ForegroundColor White
Start-Process "https://play.google.com/console/"

Start-Sleep -Seconds 2

# Apple App Store Connect
Write-Host "  - App Store Connect..." -ForegroundColor White
Start-Process "https://appstoreconnect.apple.com/"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[9/10] Opening Analytics & Tracking..." -ForegroundColor Yellow

# Google Analytics
Write-Host "  - Google Analytics..." -ForegroundColor White
Start-Process "https://analytics.google.com/"

Start-Sleep -Seconds 2

# Google Tag Manager
Write-Host "  - Google Tag Manager..." -ForegroundColor White
Start-Process "https://tagmanager.google.com/"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[10/10] Opening Additional Platforms..." -ForegroundColor Yellow

# Reddit
Write-Host "  - Reddit..." -ForegroundColor White
Start-Process "https://www.reddit.com/submit?url=$siteUrl&title=$siteName"

Start-Sleep -Seconds 2

# Pinterest
Write-Host "  - Pinterest..." -ForegroundColor White
Start-Process "https://www.pinterest.com/pin/create/button/?url=$siteUrl"

Start-Sleep -Seconds 2

# StumbleUpon
Write-Host "  - StumbleUpon..." -ForegroundColor White
Start-Process "https://www.stumbleupon.com/submit?url=$siteUrl"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SUBMISSION PAGES OPENED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "All submission pages have been opened in your browser." -ForegroundColor White
Write-Host "Please complete the forms with the following information:" -ForegroundColor White
Write-Host ""
Write-Host "Website URL: $siteUrl" -ForegroundColor Cyan
Write-Host "Business Name: $siteName" -ForegroundColor Cyan
Write-Host "Email: $email" -ForegroundColor Cyan
Write-Host "Phone: $phone" -ForegroundColor Cyan
Write-Host "Location: $location" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sitemap URL: $siteUrl/sitemap.xml" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"

