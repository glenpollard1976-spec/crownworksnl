@echo off
echo ========================================
echo   INSTALLING ESSENTIAL TOOLS
echo ========================================
echo.
echo This will install:
echo - Scoop (package manager)
echo - Stripe CLI
echo - ngrok
echo - Vercel CLI
echo.
echo And open download pages for:
echo - Postman
echo - GitHub Desktop
echo - Insomnia
echo.
pause

powershell -ExecutionPolicy Bypass -File INSTALL_TOOLS.ps1

pause

