@echo off
echo ========================================
echo   SETUP CROWNWORKSNL ANTIVIRUS
echo ========================================
echo.
echo This will set up the antivirus to run every 6 hours.
echo You must run this as Administrator!
echo.
pause

powershell -ExecutionPolicy Bypass -File "%~dp0Setup_Antivirus_Scheduler.ps1"

pause

