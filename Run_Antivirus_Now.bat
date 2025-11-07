@echo off
echo ========================================
echo   CROWNWORKSNL ANTIVIRUS SCAN
echo ========================================
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0CrownWorksNL_Antivirus.ps1"

echo.
echo ========================================
echo   SCAN COMPLETE
echo ========================================
echo.
echo Check log file for details:
echo %USERPROFILE%\Documents\CrownWorksNL_Antivirus_Log.txt
echo.
pause

