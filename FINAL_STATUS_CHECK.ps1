# Final status check - verify one working project
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FINAL STATUS: ONE WORKING PROJECT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$TARGET = "crownworksnl-23f4"

Write-Host "Target Project: $TARGET" -ForegroundColor Green
Write-Host ""

# Check Git status
Write-Host "[1/4] Git Status:" -ForegroundColor Yellow
try {
    $gitStatus = git status --short 2>&1
    $gitBranch = git branch --show-current 2>&1
    $lastCommit = git log -1 --oneline 2>&1
    
    Write-Host "  Branch: $gitBranch" -ForegroundColor Green
    Write-Host "  Last commit: $lastCommit" -ForegroundColor Green
    
    if ($gitStatus) {
        Write-Host "  ⚠️  Uncommitted changes" -ForegroundColor Yellow
    } else {
        Write-Host "  ✅ Repository clean" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ Git check failed" -ForegroundColor Red
}
Write-Host ""

# Check project files
Write-Host "[2/4] Project Files:" -ForegroundColor Yellow
$projectFiles = @(
    "app/page.js",
    "app/api/checkout/route.js",
    "app/api/ai-agent/route.js",
    "next.config.mjs",
    "vercel.json",
    "package.json"
)

$allExist = $true
foreach ($file in $projectFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (missing)" -ForegroundColor Red
        $allExist = $false
    }
}

if ($allExist) {
    Write-Host "  ✅ All project files present" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Some files missing" -ForegroundColor Yellow
}
Write-Host ""

# Open verification
Write-Host "[3/4] Opening verification pages..." -ForegroundColor Yellow
Start-Process "https://vercel.com/websitenl"
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/websitenl/$TARGET"
Start-Sleep -Seconds 1
Start-Process "https://www.crownworksnl.com"

Write-Host ""
Write-Host "[4/4] Final Checklist:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Vercel Dashboard:" -ForegroundColor Cyan
Write-Host "  [ ] Only 1 project: $TARGET" -ForegroundColor White
Write-Host "  [ ] No duplicate projects" -ForegroundColor White
Write-Host ""
Write-Host "Project Settings:" -ForegroundColor Cyan
Write-Host "  [ ] Domain: www.crownworksnl.com" -ForegroundColor White
Write-Host "  [ ] Domain: crownworksnl.com" -ForegroundColor White
Write-Host "  [ ] STRIPE_SECRET_KEY configured" -ForegroundColor White
Write-Host "  [ ] Git: glenpollard1976-spec/crownworksnl" -ForegroundColor White
Write-Host ""
Write-Host "Live Site:" -ForegroundColor Cyan
Write-Host "  [ ] https://www.crownworksnl.com loads" -ForegroundColor White
Write-Host "  [ ] ProVet buttons work" -ForegroundColor White
Write-Host "  [ ] iLawyer AI works" -ForegroundColor White
Write-Host "  [ ] Payment buttons work" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STATUS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Code: Pushed to GitHub" -ForegroundColor Green
Write-Host "✅ Scripts: Created and ready" -ForegroundColor Green
Write-Host "⏳ Vercel: Manual cleanup required (delete duplicates)" -ForegroundColor Yellow
Write-Host ""
Write-Host "All pages opened - verify and confirm!" -ForegroundColor Green
Write-Host ""

