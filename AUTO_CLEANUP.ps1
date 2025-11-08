# Automated Project Cleanup
# Target: Keep crownworksnl-23f4, delete others

$KEEP_PROJECT = "crownworksnl-23f4"
$DELETE_PROJECTS = @("crownworksnl", "crownworksnl-6eez", "crownworksnl-9wte")

Write-Host "KEEP: $KEEP_PROJECT" -ForegroundColor Green
Write-Host "DELETE: $( -join ', ')" -ForegroundColor Red

# Open dashboard
Start-Process "https://vercel.com/websitenl"

Write-Host "
Manual steps required:" -ForegroundColor Yellow
Write-Host "1. Delete each project from dashboard" -ForegroundColor White
Write-Host "2. Verify crownworksnl-23f4 has domain and Stripe" -ForegroundColor White
Write-Host "3. Done!" -ForegroundColor Green
