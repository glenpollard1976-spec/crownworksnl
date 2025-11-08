# Verify we have one working project
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VERIFYING ONE PROJECT STATUS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$TARGET_PROJECT = "crownworksnl-23f4"

Write-Host "Checking project: $TARGET_PROJECT" -ForegroundColor Yellow
Write-Host ""

# Open verification pages
Write-Host "Opening verification pages..." -ForegroundColor Yellow
Start-Process "https://vercel.com/websitenl/$TARGET_PROJECT"
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/websitenl/$TARGET_PROJECT/settings/domains"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/$TARGET_PROJECT/settings/environment-variables"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/$TARGET_PROJECT/settings/git"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/$TARGET_PROJECT/deployments"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHECKLIST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Verify $TARGET_PROJECT has:" -ForegroundColor Yellow
Write-Host "  [ ] Domain: www.crownworksnl.com" -ForegroundColor White
Write-Host "  [ ] Domain: crownworksnl.com" -ForegroundColor White
Write-Host "  [ ] STRIPE_SECRET_KEY in Environment Variables" -ForegroundColor White
Write-Host "  [ ] Connected to: glenpollard1976-spec/crownworksnl" -ForegroundColor White
Write-Host "  [ ] Recent deployment (latest code)" -ForegroundColor White
Write-Host ""
Write-Host "Verify dashboard has:" -ForegroundColor Yellow
Write-Host "  [ ] Only 1 crownworksnl project (crownworksnl-23f4)" -ForegroundColor White
Write-Host "  [ ] No duplicate projects" -ForegroundColor White
Write-Host ""
Write-Host "Test live site:" -ForegroundColor Yellow
Write-Host "  [ ] https://www.crownworksnl.com loads" -ForegroundColor White
Write-Host "  [ ] ProVet buttons work" -ForegroundColor White
Write-Host "  [ ] Payment buttons work" -ForegroundColor White
Write-Host ""
Write-Host "All verification pages opened!" -ForegroundColor Green
Write-Host "Check each one and confirm everything is working." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter when verification is complete"

