# Consolidate all projects into one
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CONSOLIDATING TO ONE PROJECT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Based on analysis: crownworksnl-23f4 has domain and is likely production
$KEEP_PROJECT = "crownworksnl-23f4"
$DELETE_PROJECTS = @("crownworksnl", "crownworksnl-6eez", "crownworksnl-9wte")

Write-Host "KEEPING PROJECT: $KEEP_PROJECT" -ForegroundColor Green
Write-Host "  - Has domain: www.crownworksnl.com" -ForegroundColor White
Write-Host "  - Likely has Stripe configured" -ForegroundColor White
Write-Host ""

Write-Host "DELETING PROJECTS:" -ForegroundColor Red
foreach ($project in $DELETE_PROJECTS) {
    Write-Host "  - $project" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "Step 1: Verifying main project..." -ForegroundColor Yellow
Start-Process "https://vercel.com/websitenl/$KEEP_PROJECT/settings"
Start-Sleep -Seconds 2

Write-Host "Step 2: Opening projects to delete..." -ForegroundColor Yellow
foreach ($project in $DELETE_PROJECTS) {
    Write-Host "  Opening $project for deletion..." -ForegroundColor White
    Start-Process "https://vercel.com/websitenl/$project/settings"
    Start-Sleep -Seconds 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ACTION REQUIRED" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "For EACH project to delete:" -ForegroundColor Yellow
Write-Host "  1. Click on the project" -ForegroundColor White
Write-Host "  2. Go to Settings (gear icon)" -ForegroundColor White
Write-Host "  3. Scroll to very bottom" -ForegroundColor White
Write-Host "  4. Click 'Delete Project'" -ForegroundColor White
Write-Host "  5. Type project name exactly" -ForegroundColor White
Write-Host "  6. Click Delete" -ForegroundColor White
Write-Host ""
Write-Host "Projects to delete:" -ForegroundColor Red
foreach ($project in $DELETE_PROJECTS) {
    Write-Host "  ❌ $project" -ForegroundColor Red
}
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VERIFY MAIN PROJECT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Before deleting, verify $KEEP_PROJECT has:" -ForegroundColor Yellow
Write-Host "  ✅ Domain: www.crownworksnl.com" -ForegroundColor Green
Write-Host "  ✅ Stripe keys in Environment Variables" -ForegroundColor Green
Write-Host "  ✅ Connected to: glenpollard1976-spec/crownworksnl" -ForegroundColor Green
Write-Host ""
Write-Host "If anything is missing, fix it first!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opening main project settings..." -ForegroundColor Yellow
Start-Process "https://vercel.com/websitenl/$KEEP_PROJECT/settings/environment-variables"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/$KEEP_PROJECT/settings/domains"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/$KEEP_PROJECT/settings/git"
Write-Host ""
Read-Host "Press Enter when done deleting duplicate projects"

