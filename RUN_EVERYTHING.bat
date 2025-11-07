@echo off
echo.
echo ========================================
echo   CROWNWORKSNL AUTO-LAUNCH
echo ========================================
echo.
echo This will:
echo   1. Build the project
echo   2. Deploy to Vercel
echo   3. Send email campaign
echo.
pause

powershell -ExecutionPolicy Bypass -File "AUTO_LAUNCH.ps1"

pause

