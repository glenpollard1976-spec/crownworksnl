@echo off
echo ========================================
echo   INSTALL STRIPE CLI & CREATE WEBHOOK
echo ========================================
echo.
echo This will:
echo 1. Install Stripe CLI (if needed)
echo 2. Login to Stripe
echo 3. Create webhook endpoint automatically
echo 4. Get webhook secret
echo.
pause

powershell -ExecutionPolicy Bypass -File INSTALL_AND_CREATE_WEBHOOK.ps1

pause


