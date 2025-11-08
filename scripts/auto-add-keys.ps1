# Fully Automated API Key Setup
# Opens browsers, guides user, then runs interactive script

Write-Host "Fully Automated API Key Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Open browser tabs for API keys
Write-Host "Opening browser tabs for API key pages..." -ForegroundColor Yellow
Write-Host ""

Start-Process "https://platform.openai.com/api-keys"
Start-Sleep -Seconds 1
Start-Process "https://console.anthropic.com/"
Start-Sleep -Seconds 1
Start-Process "https://makersuite.google.com/app/apikey"
Write-Host "[OK] Browser tabs opened" -ForegroundColor Green
Write-Host ""

Write-Host "Get your API keys from the browser tabs above" -ForegroundColor Yellow
Write-Host "Then run the interactive script:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  npm run add-keys" -ForegroundColor Cyan
Write-Host ""

# Check if user wants to run interactive script now
$response = Read-Host "Run interactive key setup now? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "Running interactive setup..." -ForegroundColor Yellow
    Write-Host ""
    node scripts/add-api-keys.js
} else {
    Write-Host ""
    Write-Host "Run 'npm run add-keys' when you have your keys ready" -ForegroundColor Cyan
    Write-Host ""
}

