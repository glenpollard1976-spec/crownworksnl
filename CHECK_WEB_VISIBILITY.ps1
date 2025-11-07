# Check CrownWorksNL Web Visibility
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHECKING WEB VISIBILITY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$siteUrl = "https://crownworksnl.com"
$siteName = "CrownWorksNL"

Write-Host "Opening search results for visibility check..." -ForegroundColor Yellow
Write-Host ""

# Google Search
Write-Host "[1/8] Google Search..." -ForegroundColor Yellow
Start-Process "https://www.google.com/search?q=CrownWorksNL"

Start-Sleep -Seconds 2

# Google Search with location
Write-Host "[2/8] Google Search (Corner Brook)..." -ForegroundColor Yellow
Start-Process "https://www.google.com/search?q=CrownWorksNL+Corner+Brook+Newfoundland"

Start-Sleep -Seconds 2

# Bing Search
Write-Host "[3/8] Bing Search..." -ForegroundColor Yellow
Start-Process "https://www.bing.com/search?q=CrownWorksNL"

Start-Sleep -Seconds 2

# DuckDuckGo Search
Write-Host "[4/8] DuckDuckGo Search..." -ForegroundColor Yellow
Start-Process "https://duckduckgo.com/?q=CrownWorksNL"

Start-Sleep -Seconds 2

# Domain Search
Write-Host "[5/8] Domain Search..." -ForegroundColor Yellow
Start-Process "https://www.google.com/search?q=crownworksnl.com"

Start-Sleep -Seconds 2

# Google Maps Search
Write-Host "[6/8] Google Maps..." -ForegroundColor Yellow
Start-Process "https://www.google.com/maps/search/CrownWorksNL+Corner+Brook"

Start-Sleep -Seconds 2

# Yelp Search
Write-Host "[7/8] Yelp Search..." -ForegroundColor Yellow
Start-Process "https://www.yelp.com/search?find_desc=CrownWorksNL&find_loc=Corner+Brook%2C+NL"

Start-Sleep -Seconds 2

# LinkedIn Search
Write-Host "[8/8] LinkedIn Search..." -ForegroundColor Yellow
Start-Process "https://www.linkedin.com/search/results/companies/?keywords=CrownWorksNL"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SEARCH PAGES OPENED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Check the search results to see if CrownWorksNL appears:" -ForegroundColor White
Write-Host ""
Write-Host "What to look for:" -ForegroundColor Cyan
Write-Host "  - Website: $siteUrl" -ForegroundColor White
Write-Host "  - Business Name: $siteName" -ForegroundColor White
Write-Host "  - Location: Corner Brook, NL" -ForegroundColor White
Write-Host "  - Services: Business consulting, iLawyer, ProVet" -ForegroundColor White
Write-Host ""
Write-Host "If you don't see results, you may need to:" -ForegroundColor Yellow
Write-Host "  1. Submit to Google Search Console" -ForegroundColor White
Write-Host "  2. Create Google My Business listing" -ForegroundColor White
Write-Host "  3. Submit to business directories" -ForegroundColor White
Write-Host "  4. Wait for indexing (can take 1-4 weeks)" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"

