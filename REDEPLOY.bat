@echo off
echo ========================================
echo   CROWNWORKSNL - REDEPLOY SCRIPT
echo ========================================
echo.

echo [1/4] Checking Git status...
git status
echo.

echo [2/4] Pushing latest changes to GitHub...
git add -A
git commit -m "Redeploy - %date% %time%" 2>nul
git push
echo.

echo [3/4] Checking Vercel CLI...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Opening Vercel dashboard for manual deployment...
    start https://vercel.com/dashboard
    echo.
    echo Please deploy manually from the Vercel dashboard.
    pause
    exit /b
)

echo [4/4] Deploying to Vercel...
vercel --prod
echo.

echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site should be live at: https://crownworksnl.com
echo.
pause

