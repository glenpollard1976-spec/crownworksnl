# 📧 CROWNWORKSNL AUTO EMAIL SENDER
# Automatically finds CSV and sends emails

Write-Host "`n📧 CROWNWORKSNL AUTO EMAIL SENDER`n" -ForegroundColor Cyan

# Find CSV file
$csvPaths = @(
    "$env:USERPROFILE\OneDrive\Desktop\files (1)\crownworks_600_contacts.csv",
    "$env:USERPROFILE\Desktop\files (1)\crownworks_600_contacts.csv",
    "$env:USERPROFILE\Downloads\crownworks_600_contacts.csv",
    ".\crownworks_600_contacts.csv"
)

$csvPath = $null
foreach ($path in $csvPaths) {
    if (Test-Path $path) {
        $csvPath = $path
        Write-Host "✅ Found CSV: $csvPath" -ForegroundColor Green
        break
    }
}

if (-not $csvPath) {
    Write-Host "❌ CSV file not found!" -ForegroundColor Red
    Write-Host "`nLooking in:" -ForegroundColor Yellow
    foreach ($path in $csvPaths) {
        Write-Host "   - $path" -ForegroundColor Gray
    }
    exit 1
}

# Check .env
$envPath = ".\\.env"
if (-not (Test-Path $envPath)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "`nCreate .env file with:" -ForegroundColor Yellow
    Write-Host "   SMTP_HOST=smtp.gmail.com" -ForegroundColor Gray
    Write-Host "   SMTP_PORT=587" -ForegroundColor Gray
    Write-Host "   SMTP_USER=your-email@gmail.com" -ForegroundColor Gray
    Write-Host "   SMTP_PASS=your-app-password" -ForegroundColor Gray
    exit 1
}

# Check if credentials are set
$envContent = Get-Content $envPath -Raw
if ($envContent -match "your-email@gmail.com" -or $envContent -notmatch "SMTP_USER") {
    Write-Host "⚠️  SMTP credentials not configured in .env" -ForegroundColor Yellow
    Write-Host "   Please add your email credentials first!" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env file found`n" -ForegroundColor Green

# Run email script
Write-Host "🚀 Starting email campaign...`n" -ForegroundColor Cyan
Set-Location $PSScriptRoot
node scripts/send-bulk-smtp.js $csvPath 10 5000

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Email campaign completed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Email campaign failed - Check errors above" -ForegroundColor Red
}

