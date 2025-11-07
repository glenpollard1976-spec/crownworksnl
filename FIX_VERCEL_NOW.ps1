# Fix Vercel Domain Linking
Write-Host "========================================" -ForegroundColor Red
Write-Host "  FIX VERCEL DOMAIN LINKING" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""

Write-Host "Opening Vercel Dashboard..." -ForegroundColor Yellow
Start-Process "https://vercel.com/dashboard"

Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host "1. Find the WRONG project (old one)" -ForegroundColor White
Write-Host "2. Delete it (Settings → Delete Project)" -ForegroundColor White
Write-Host "3. Click on the CORRECT project (crownworksnl)" -ForegroundColor White
Write-Host "4. Go to Settings → Domains" -ForegroundColor White
Write-Host "5. Add crownworksnl.com" -ForegroundColor White
Write-Host "6. Configure DNS if needed" -ForegroundColor White
Write-Host "7. Redeploy the project" -ForegroundColor White
Write-Host ""

Write-Host "Opening project settings..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/dashboard?settings=domains"

Write-Host ""
Write-Host "See FIX_VERCEL_DOMAIN.md for detailed instructions" -ForegroundColor Green
Read-Host "Press Enter to exit"

