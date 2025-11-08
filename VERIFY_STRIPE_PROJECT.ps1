# Verify which project has Stripe configured
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VERIFYING STRIPE PROJECT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening Environment Variables for both main projects..." -ForegroundColor Yellow
Write-Host ""

# Open both projects' environment variables
Start-Process "https://vercel.com/websitenl/crownworksnl-23f4/settings/environment-variables"
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/websitenl/crownworksnl/settings/environment-variables"
Start-Sleep -Seconds 2

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHECKLIST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "For crownworksnl-23f4:" -ForegroundColor Yellow
Write-Host "  [ ] Has STRIPE_SECRET_KEY? (starts with sk_)" -ForegroundColor White
Write-Host "  [ ] Has STRIPE_WEBHOOK_SECRET? (starts with whsec_)" -ForegroundColor White
Write-Host ""
Write-Host "For crownworksnl:" -ForegroundColor Yellow
Write-Host "  [ ] Has STRIPE_SECRET_KEY? (starts with sk_)" -ForegroundColor White
Write-Host "  [ ] Has STRIPE_WEBHOOK_SECRET? (starts with whsec_)" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESULT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Which project has Stripe keys?" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. crownworksnl-23f4 has Stripe" -ForegroundColor Green
Write-Host "   → KEEP: crownworksnl-23f4" -ForegroundColor White
Write-Host "   → DELETE: crownworksnl, crownworksnl-6eez, crownworksnl-9wte" -ForegroundColor Red
Write-Host ""
Write-Host "2. crownworksnl has Stripe" -ForegroundColor Green
Write-Host "   → KEEP: crownworksnl" -ForegroundColor White
Write-Host "   → TRANSFER domain from crownworksnl-23f4" -ForegroundColor Yellow
Write-Host "   → DELETE: crownworksnl-23f4, crownworksnl-6eez, crownworksnl-9wte" -ForegroundColor Red
Write-Host ""
Write-Host "3. Both have Stripe" -ForegroundColor Yellow
Write-Host "   → Keep the one with domain (crownworksnl-23f4)" -ForegroundColor White
Write-Host "   → Delete the other" -ForegroundColor Red
Write-Host ""
Write-Host "4. Neither has Stripe" -ForegroundColor Red
Write-Host "   → Need to add Stripe keys to one project" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opening project dashboard..." -ForegroundColor Yellow
Start-Process "https://vercel.com/websitenl"
Write-Host ""
Read-Host "Press Enter after checking which project has Stripe"

