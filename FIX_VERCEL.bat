@echo off
echo ========================================
echo   FIX VERCEL DOMAIN - URGENT
echo ========================================
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard

echo.
echo ========================================
echo   DO THIS NOW:
echo ========================================
echo.
echo 1. Find the WRONG project (old one)
echo 2. Click on it
echo 3. Go to Settings ^> Delete Project
echo 4. Delete it
echo.
echo 5. Click on the CORRECT project (crownworksnl)
echo 6. Go to Settings ^> Domains
echo 7. Add: crownworksnl.com
echo 8. Configure DNS if needed
echo 9. Redeploy the project
echo.

timeout /t 3 /nobreak >nul
start https://vercel.com/dashboard?settings=domains

echo.
echo See FIX_VERCEL_DOMAIN.md for full instructions
echo.
pause

