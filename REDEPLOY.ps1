# CrownWorksNL - Redeploy Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CROWNWORKSNL - REDEPLOY SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Checking Git status..." -ForegroundColor Yellow
git status
Write-Host ""

Write-Host "[2/4] Pushing latest changes to GitHub..." -ForegroundColor Yellow
git add -A
git commit -m "Redeploy - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" 2>$null
git push
Write-Host ""

Write-Host "[3/4] Checking Vercel CLI..." -ForegroundColor Yellow
$vercelCheck = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelCheck) {
    Write-Host "Vercel CLI not found. Opening Vercel dashboard for manual deployment..." -ForegroundColor Yellow
    Start-Process "https://vercel.com/dashboard"
    Write-Host ""
    Write-Host "Please deploy manually from the Vercel dashboard." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "[4/4] Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your site should be live at: https://crownworksnl.com" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"

