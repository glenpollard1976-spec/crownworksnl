@echo off
echo ========================================
echo   CROWNWORKSNL - REDEPLOY
echo ========================================
echo.

echo Pushing latest changes to GitHub...
git add -A
git commit -m "Redeploy - %date% %time%" 2>nul
git push
echo.

echo Opening Vercel Dashboard...
echo.
echo 1. Click on your "crownworksnl" project
echo 2. Click "Redeploy" button
echo 3. Wait for deployment to complete
echo.

start https://vercel.com/dashboard

echo.
echo ========================================
echo   Deployment initiated!
echo ========================================
echo.
echo Your site: https://crownworksnl.com
echo.
pause
