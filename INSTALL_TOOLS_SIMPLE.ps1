# CrownWorksNL - Auto Install Essential Tools
Write-Host "Installing essential tools..." -ForegroundColor Cyan
Write-Host ""

# Install Scoop if not present
if (-not (Get-Command scoop -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Scoop..." -ForegroundColor Yellow
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    irm get.scoop.sh | iex
}

# Install tools via Scoop
Write-Host "Installing Stripe CLI..." -ForegroundColor Yellow
scoop install stripe-cli

Write-Host "Installing ngrok..." -ForegroundColor Yellow
scoop install ngrok

# Install Vercel CLI via npm
Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
npm install -g vercel

# Open download pages
Write-Host "Opening download pages..." -ForegroundColor Yellow
Start-Process "https://www.postman.com/downloads/"
Start-Sleep -Seconds 1
Start-Process "https://desktop.github.com/"
Start-Sleep -Seconds 1
Start-Process "https://insomnia.rest/download"

Write-Host ""
Write-Host "Done! Check RECOMMENDED_TOOLS.md for full list." -ForegroundColor Green

