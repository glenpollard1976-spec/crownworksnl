@echo off
echo.
echo 🔍 CROWNWORKSNL - AUTOMATED GOOGLE SUBMISSION
echo.
echo Opening all Google submission pages...
echo.

start https://www.google.com/business
timeout /t 2 /nobreak >nul

start https://search.google.com/search-console
timeout /t 2 /nobreak >nul

start https://play.google.com/console
timeout /t 2 /nobreak >nul

start https://appstoreconnect.apple.com
timeout /t 2 /nobreak >nul

start https://analytics.google.com
timeout /t 2 /nobreak >nul

start https://www.bing.com/webmasters

echo.
echo ✅ All pages opened!
echo.
echo 📋 NEXT STEPS:
echo 1. Sign in to each page with your accounts
echo 2. Follow the prompts to add/verify your business
echo 3. Submit sitemap: https://crownworksnl.com/sitemap.xml
echo 4. Check GOOGLE_SUBMISSION_CHECKLIST.md for detailed steps
echo.
echo 📝 BUSINESS INFORMATION:
echo    Name: CrownWorksNL
echo    Website: https://crownworksnl.com
echo    Email: crownworksnl@gmail.com
echo    Phone: +1 (709) 721-0340
echo    Address: Corner Brook, Newfoundland & Labrador, Canada
echo    Sitemap: https://crownworksnl.com/sitemap.xml
echo.
echo ✅ Ready to submit! Good luck! 🚀
echo.
pause

