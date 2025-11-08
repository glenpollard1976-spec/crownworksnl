# CrownWorksNL - Add Keys Helper Script
# This script helps you add keys to Vercel

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ADD STRIPE KEYS TO VERCEL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Open Vercel Environment Variables page
Write-Host "Opening Vercel Environment Variables page..." -ForegroundColor Yellow
Start-Process "https://vercel.com/dashboard"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STEP-BY-STEP INSTRUCTIONS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "IN VERCEL DASHBOARD:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Click your 'crownworksnl' project" -ForegroundColor White
Write-Host "2. Click 'Settings' tab" -ForegroundColor White
Write-Host "3. Click 'Environment Variables' in left sidebar" -ForegroundColor White
Write-Host ""
Write-Host "ADD THESE 3 VARIABLES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Variable 1:" -ForegroundColor Cyan
Write-Host "  Name: STRIPE_SECRET_KEY" -ForegroundColor White
Write-Host "  Value: [Paste your Stripe secret key from Stripe dashboard]" -ForegroundColor Gray
Write-Host "  Environment: Production (check this)" -ForegroundColor White
Write-Host "  Click: Save" -ForegroundColor White
Write-Host ""
Write-Host "Variable 2:" -ForegroundColor Cyan
Write-Host "  Name: STRIPE_WEBHOOK_SECRET" -ForegroundColor White
Write-Host "  Value: [Paste your webhook secret from Stripe]" -ForegroundColor Gray
Write-Host "  Environment: Production (check this)" -ForegroundColor White
Write-Host "  Click: Save" -ForegroundColor White
Write-Host ""
Write-Host "Variable 3:" -ForegroundColor Cyan
Write-Host "  Name: NEXT_PUBLIC_SITE_URL" -ForegroundColor White
Write-Host "  Value: https://crownworksnl.com" -ForegroundColor White
Write-Host "  Environment: Production (check this)" -ForegroundColor White
Write-Host "  Click: Save" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  WHERE TO GET YOUR KEYS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "STRIPE SECRET KEY:" -ForegroundColor Yellow
Write-Host "  https://dashboard.stripe.com/apikeys" -ForegroundColor White
Write-Host "  - Click 'Reveal test key' or 'Reveal live key'" -ForegroundColor Gray
Write-Host "  - Copy the key (starts with sk_live_ or sk_test_)" -ForegroundColor Gray
Write-Host ""
Write-Host "STRIPE WEBHOOK SECRET:" -ForegroundColor Yellow
Write-Host "  https://dashboard.stripe.com/webhooks" -ForegroundColor White
Write-Host "  - Create endpoint: https://crownworksnl.com/api/webhook" -ForegroundColor Gray
Write-Host "  - Copy the 'Signing secret' (starts with whsec_)" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AFTER ADDING KEYS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Vercel will auto-redeploy (or manually redeploy)" -ForegroundColor White
Write-Host "2. Wait 2-3 minutes" -ForegroundColor White
Write-Host "3. Test payment button on your site" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Opening Stripe pages for you..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Start-Sleep -Seconds 2
Start-Process "https://dashboard.stripe.com/apikeys"
Start-Sleep -Seconds 1
Start-Process "https://dashboard.stripe.com/webhooks"

Write-Host ""
Write-Host "All pages opened! Follow the steps above." -ForegroundColor Green
Write-Host ""
Write-Host "Press any key when done..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

