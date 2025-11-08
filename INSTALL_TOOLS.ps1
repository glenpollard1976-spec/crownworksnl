# CrownWorksNL - Auto Install Essential Tools
# Run this script to install recommended development tools

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALLING ESSENTIAL TOOLS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  Some tools require admin rights." -ForegroundColor Yellow
    Write-Host "Right-click PowerShell and 'Run as Administrator' for full install." -ForegroundColor Yellow
    Write-Host ""
}

# Function to check if command exists
function Test-Command {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

# 1. Install Scoop (if not installed)
Write-Host "1. Checking Scoop package manager..." -ForegroundColor Yellow
if (-not (Test-Command "scoop")) {
    Write-Host "   Installing Scoop..." -ForegroundColor Green
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    irm get.scoop.sh | iex
    Write-Host "   ✅ Scoop installed!" -ForegroundColor Green
} else {
    Write-Host "   ✅ Scoop already installed" -ForegroundColor Green
}
Write-Host ""

# 2. Install Stripe CLI
Write-Host "2. Installing Stripe CLI..." -ForegroundColor Yellow
if (-not (Test-Command "stripe")) {
    if (Test-Command "scoop") {
        scoop install stripe-cli
        Write-Host "   ✅ Stripe CLI installed!" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Install manually: https://stripe.com/docs/stripe-cli" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✅ Stripe CLI already installed" -ForegroundColor Green
}
Write-Host ""

# 3. Install ngrok
Write-Host "3. Installing ngrok..." -ForegroundColor Yellow
if (-not (Test-Command "ngrok")) {
    if (Test-Command "scoop") {
        scoop install ngrok
        Write-Host "   ✅ ngrok installed!" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Install manually: https://ngrok.com/download" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✅ ngrok already installed" -ForegroundColor Green
}
Write-Host ""

# 4. Install Vercel CLI
Write-Host "4. Installing Vercel CLI..." -ForegroundColor Yellow
if (-not (Test-Command "vercel")) {
    npm install -g vercel
    Write-Host "   ✅ Vercel CLI installed!" -ForegroundColor Green
} else {
    Write-Host "   ✅ Vercel CLI already installed" -ForegroundColor Green
}
Write-Host ""

# 5. Open download pages for GUI tools
Write-Host "5. Opening download pages for GUI tools..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Opening Postman..." -ForegroundColor Cyan
Start-Process "https://www.postman.com/downloads/"
Start-Sleep -Seconds 1

Write-Host "   Opening GitHub Desktop..." -ForegroundColor Cyan
Start-Process "https://desktop.github.com/"
Start-Sleep -Seconds 1

Write-Host "   Opening Insomnia (alternative to Postman)..." -ForegroundColor Cyan
Start-Process "https://insomnia.rest/download"
Start-Sleep -Seconds 1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALLATION SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Installed via script:" -ForegroundColor Green
Write-Host "   - Scoop (package manager)" -ForegroundColor White
Write-Host "   - Stripe CLI" -ForegroundColor White
Write-Host "   - ngrok" -ForegroundColor White
Write-Host "   - Vercel CLI" -ForegroundColor White
Write-Host ""
Write-Host "📥 Download manually (pages opened):" -ForegroundColor Yellow
Write-Host "   - Postman (API testing)" -ForegroundColor White
Write-Host "   - GitHub Desktop (Git GUI)" -ForegroundColor White
Write-Host "   - Insomnia (API testing alternative)" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Download Postman or Insomnia for API testing" -ForegroundColor White
Write-Host "Test installed tools with their version commands" -ForegroundColor White
Write-Host ""

