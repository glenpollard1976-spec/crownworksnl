# Auto-find which Vercel project has Stripe configured
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FINDING STRIPE PROJECT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Based on the screenshot, crownworksnl-23f4 has the domain www.crownworksnl.com
# This is likely the production project with Stripe configured

Write-Host "Based on your Vercel dashboard:" -ForegroundColor Yellow
Write-Host ""
Write-Host "PROJECT WITH DOMAIN (Likely has Stripe):" -ForegroundColor Green
Write-Host "  - crownworksnl-23f4" -ForegroundColor White
Write-Host "  - Has domain: www.crownworksnl.com" -ForegroundColor White
Write-Host "  - This is likely your PRODUCTION project" -ForegroundColor White
Write-Host ""

Write-Host "Opening Environment Variables pages..." -ForegroundColor Yellow
Write-Host ""

# Open both main projects' environment variables
Start-Process "https://vercel.com/websitenl/crownworksnl-23f4/settings/environment-variables"
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/websitenl/crownworksnl/settings/environment-variables"
Start-Sleep -Seconds 2

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RECOMMENDATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Most likely: crownworksnl-23f4 has Stripe" -ForegroundColor Green
Write-Host "  - It has the production domain (www.crownworksnl.com)" -ForegroundColor White
Write-Host "  - Production projects usually have payment keys configured" -ForegroundColor White
Write-Host ""
Write-Host "Check the Environment Variables pages I opened:" -ForegroundColor Yellow
Write-Host "  - Look for STRIPE_SECRET_KEY" -ForegroundColor White
Write-Host "  - Look for STRIPE_WEBHOOK_SECRET" -ForegroundColor White
Write-Host ""
Write-Host "If crownworksnl-23f4 has Stripe keys:" -ForegroundColor Yellow
Write-Host "  ✅ KEEP: crownworksnl-23f4" -ForegroundColor Green
Write-Host "  ❌ DELETE: crownworksnl" -ForegroundColor Red
Write-Host "  ❌ DELETE: crownworksnl-6eez" -ForegroundColor Red
Write-Host "  ❌ DELETE: crownworksnl-9wte" -ForegroundColor Red
Write-Host ""
Write-Host "If crownworksnl has Stripe keys:" -ForegroundColor Yellow
Write-Host "  ✅ KEEP: crownworksnl" -ForegroundColor Green
Write-Host "  → Transfer domain from crownworksnl-23f4 to crownworksnl" -ForegroundColor Yellow
Write-Host "  ❌ DELETE: crownworksnl-23f4" -ForegroundColor Red
Write-Host "  ❌ DELETE: crownworksnl-6eez" -ForegroundColor Red
Write-Host "  ❌ DELETE: crownworksnl-9wte" -ForegroundColor Red
Write-Host ""
Write-Host "Opening project settings..." -ForegroundColor Yellow
Start-Process "https://vercel.com/websitenl/crownworksnl-23f4/settings"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/crownworksnl/settings"
Write-Host ""
Read-Host "Press Enter when you've checked which has Stripe"

