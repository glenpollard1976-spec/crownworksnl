@echo off
echo ========================================
echo   AUTOMATE STRIPE WEBHOOK CREATION
echo ========================================
echo.
echo This will:
echo - Check if Stripe CLI is installed
echo - Login to Stripe (if needed)
echo - Create webhook endpoint automatically
echo - Get webhook secret
echo.
pause

powershell -ExecutionPolicy Bypass -File AUTO_CREATE_WEBHOOK.ps1

pause


