@echo off
echo ========================================
echo   ADD STRIPE KEYS TO VERCEL
echo ========================================
echo.
echo Opening helper pages...
echo.

powershell -ExecutionPolicy Bypass -File ADD_KEYS_HELPER.ps1

pause

