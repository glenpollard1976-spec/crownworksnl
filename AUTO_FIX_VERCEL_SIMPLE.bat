@echo off
echo ========================================
echo   AUTO FIX VERCEL - SIMPLE VERSION
echo ========================================
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard

timeout /t 3 /nobreak >nul

echo.
echo Opening project domains page...
start https://vercel.com/dashboard?settings=domains

timeout /t 2 /nobreak >nul

echo.
echo Opening GitHub repo to verify connection...
start https://github.com/glenpollard1976-spec/crownworksnl

echo.
echo ========================================
echo   AUTOMATED STEPS:
echo ========================================
echo.
echo 1. In Vercel Dashboard:
echo    - Find the WRONG project (old one)
echo    - Click Settings ^> Delete Project
echo    - Delete it
echo.
echo 2. Click on CORRECT project (crownworksnl)
echo    - Should be connected to: glenpollard1976-spec/crownworksnl
echo.
echo 3. Go to Settings ^> Domains
echo    - Add: crownworksnl.com
echo    - Follow DNS setup if needed
echo.
echo 4. Go to Deployments
echo    - Click Redeploy on latest
echo.
echo ========================================
echo   DONE! Check the browser windows.
echo ========================================
echo.
pause

