# Check Vercel Projects Status
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHECKING VERCEL PROJECTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Open Vercel Dashboard
Write-Host "[1/3] Opening Vercel Dashboard..." -ForegroundColor Yellow
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2

# Open GitHub Repo
Write-Host "[2/3] Opening GitHub Repository..." -ForegroundColor Yellow
Start-Process "https://github.com/glenpollard1976-spec/crownworksnl"
Start-Sleep -Seconds 2

# Open Domain Settings (if we can find project name)
Write-Host "[3/3] Opening Domain Management..." -ForegroundColor Yellow
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  WHAT TO CHECK:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. COUNT YOUR PROJECTS:" -ForegroundColor Yellow
Write-Host "   - How many projects do you see?" -ForegroundColor White
Write-Host "   - Look for projects with 'crown' or 'works' in the name" -ForegroundColor White
Write-Host ""
Write-Host "2. IDENTIFY CORRECT PROJECT:" -ForegroundColor Yellow
Write-Host "   - Click on each project" -ForegroundColor White
Write-Host "   - Go to Settings → Git" -ForegroundColor White
Write-Host "   - CORRECT one should show: glenpollard1976-spec/crownworksnl" -ForegroundColor Green
Write-Host "   - CORRECT one should have recent deployments" -ForegroundColor Green
Write-Host ""
Write-Host "3. CHECK DOMAINS:" -ForegroundColor Yellow
Write-Host "   - Go to Settings → Domains in each project" -ForegroundColor White
Write-Host "   - See which project has crownworksnl.com" -ForegroundColor White
Write-Host "   - See which project has www.crownworksnl.com" -ForegroundColor White
Write-Host ""
Write-Host "4. VERIFY LIVE SITE:" -ForegroundColor Yellow
Write-Host "   - Visit: https://www.crownworksnl.com" -ForegroundColor White
Write-Host "   - Does it show iLawyer and ProVet sections?" -ForegroundColor White
Write-Host "   - If YES → That's the CORRECT project" -ForegroundColor Green
Write-Host "   - If NO → That's the WRONG project" -ForegroundColor Red
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you found 2 projects:" -ForegroundColor Yellow
Write-Host "  1. Remove domains from WRONG project" -ForegroundColor White
Write-Host "  2. Add domains to CORRECT project" -ForegroundColor White
Write-Host "  3. Delete WRONG project" -ForegroundColor White
Write-Host "  4. Redeploy CORRECT project" -ForegroundColor White
Write-Host ""
Write-Host "If you found 1 project:" -ForegroundColor Yellow
Write-Host "  - Make sure it's connected to correct GitHub repo" -ForegroundColor White
Write-Host "  - Make sure domains are added" -ForegroundColor White
Write-Host "  - Redeploy if needed" -ForegroundColor White
Write-Host ""
Write-Host "Opening live site to check..." -ForegroundColor Yellow
Start-Process "https://www.crownworksnl.com"
Write-Host ""
Read-Host "Press Enter when done checking"

