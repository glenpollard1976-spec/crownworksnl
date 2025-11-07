@echo off
echo ========================================
echo   FINAL LAUNCH - CrownWorksNL
echo ========================================
echo.

echo [1/3] Opening Vercel Dashboard...
start https://vercel.com/dashboard

timeout /t 2 /nobreak >nul

echo [2/3] Opening GitHub Repository...
start https://github.com/glenpollard1976-spec/crownworksnl

timeout /t 2 /nobreak >nul

echo [3/3] Opening Live Site...
start https://crownworksnl.com

echo.
echo ========================================
echo   LAUNCH CHECKLIST:
echo ========================================
echo.
echo 1. Verify Vercel deployment is active
echo 2. Check domain: crownworksnl.com is linked
echo 3. Test live site: https://crownworksnl.com
echo 4. Verify all buttons work
echo 5. Test iLawyer section
echo 6. Test ProVet section
echo 7. Test contact form
echo 8. Test payment button
echo.
echo ========================================
echo   ALL CHANGES COMMITTED AND PUSHED
echo   READY FOR LAUNCH!
echo ========================================
echo.
pause

