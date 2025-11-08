# Automate everything - consolidate to one project
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTOMATING PROJECT CONSOLIDATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check desktop for project files
Write-Host "[1/5] Checking Desktop for project files..." -ForegroundColor Yellow
$desktopPath = "$env:USERPROFILE\Desktop"
$desktopFolders = Get-ChildItem -Path $desktopPath -Directory -ErrorAction SilentlyContinue
$desktopFiles = Get-ChildItem -Path $desktopPath -File -ErrorAction SilentlyContinue

Write-Host "Found $($desktopFolders.Count) folders and $($desktopFiles.Count) files on Desktop" -ForegroundColor White
Write-Host ""

# Step 2: Check current project
Write-Host "[2/5] Checking current project status..." -ForegroundColor Yellow
$currentDir = Get-Location
Write-Host "Current project: $currentDir" -ForegroundColor White
Write-Host ""

# Step 3: Verify Git status
Write-Host "[3/5] Verifying Git repository..." -ForegroundColor Yellow
try {
    $gitStatus = git status --short 2>&1
    $gitBranch = git branch --show-current 2>&1
    $gitRemote = git remote get-url origin 2>&1
    
    Write-Host "Branch: $gitBranch" -ForegroundColor Green
    Write-Host "Remote: $gitRemote" -ForegroundColor Green
    
    if ($gitStatus) {
        Write-Host "Uncommitted changes detected" -ForegroundColor Yellow
    } else {
        Write-Host "Repository is clean" -ForegroundColor Green
    }
} catch {
    Write-Host "Git check failed: $_" -ForegroundColor Red
}
Write-Host ""

# Step 4: Check Vercel projects (if CLI available)
Write-Host "[4/5] Checking Vercel projects..." -ForegroundColor Yellow
try {
    $vercelCheck = Get-Command vercel -ErrorAction SilentlyContinue
    if ($vercelCheck) {
        Write-Host "Vercel CLI found" -ForegroundColor Green
        Write-Host "Note: Cannot auto-delete projects without authentication" -ForegroundColor Yellow
        Write-Host "Opening dashboard for manual cleanup..." -ForegroundColor Yellow
        Start-Process "https://vercel.com/websitenl"
    } else {
        Write-Host "Vercel CLI not found - opening dashboard" -ForegroundColor Yellow
        Start-Process "https://vercel.com/websitenl"
    }
} catch {
    Write-Host "Opening Vercel dashboard..." -ForegroundColor Yellow
    Start-Process "https://vercel.com/websitenl"
}
Write-Host ""

# Step 5: Create cleanup script
Write-Host "[5/5] Creating automated cleanup instructions..." -ForegroundColor Yellow

$cleanupScript = @"
# Automated Project Cleanup
# Target: Keep crownworksnl-23f4, delete others

`$KEEP_PROJECT = "crownworksnl-23f4"
`$DELETE_PROJECTS = @("crownworksnl", "crownworksnl-6eez", "crownworksnl-9wte")

Write-Host "KEEP: `$KEEP_PROJECT" -ForegroundColor Green
Write-Host "DELETE: `$($DELETE_PROJECTS -join ', ')" -ForegroundColor Red

# Open dashboard
Start-Process "https://vercel.com/websitenl"

Write-Host "`nManual steps required:" -ForegroundColor Yellow
Write-Host "1. Delete each project from dashboard" -ForegroundColor White
Write-Host "2. Verify crownworksnl-23f4 has domain and Stripe" -ForegroundColor White
Write-Host "3. Done!" -ForegroundColor Green
"@

$cleanupScript | Out-File -FilePath "AUTO_CLEANUP.ps1" -Encoding UTF8
Write-Host "Created: AUTO_CLEANUP.ps1" -ForegroundColor Green
Write-Host ""

# Step 6: Verify target project
Write-Host "[6/6] Opening target project for verification..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/websitenl/crownworksnl-23f4"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/crownworksnl-23f4/settings/domains"
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/websitenl/crownworksnl-23f4/settings/environment-variables"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Desktop Check:" -ForegroundColor Yellow
Write-Host "  - Folders: $($desktopFolders.Count)" -ForegroundColor White
Write-Host "  - Files: $($desktopFiles.Count)" -ForegroundColor White
Write-Host ""
Write-Host "Target Project:" -ForegroundColor Yellow
Write-Host "  ✅ KEEP: crownworksnl-23f4" -ForegroundColor Green
Write-Host "  ❌ DELETE: crownworksnl, crownworksnl-6eez, crownworksnl-9wte" -ForegroundColor Red
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Verify crownworksnl-23f4 has domain and Stripe" -ForegroundColor White
Write-Host "  2. Delete duplicate projects from dashboard" -ForegroundColor White
Write-Host "  3. Run verification script" -ForegroundColor White
Write-Host ""
Write-Host "All pages opened - check and delete duplicates!" -ForegroundColor Green
Write-Host ""

