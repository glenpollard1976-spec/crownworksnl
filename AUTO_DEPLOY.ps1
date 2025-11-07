# 🚀 CROWNWORKSNL AUTO DEPLOY
# Builds and deploys to Vercel automatically

Write-Host "`n🚀 CROWNWORKSNL AUTO DEPLOY`n" -ForegroundColor Cyan

Set-Location $PSScriptRoot

# Step 1: Build
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!`n" -ForegroundColor Green

# Step 2: Git commit and push
if (Test-Path ".git") {
    Write-Host "📤 Committing and pushing to GitHub..." -ForegroundColor Yellow
    git add -A
    git commit -m "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" 2>$null
    git push 2>$null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Code pushed - Vercel will auto-deploy!" -ForegroundColor Green
        Write-Host "`n🌐 Check deployment at: https://vercel.com/dashboard" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Git push failed - Deploy manually:" -ForegroundColor Yellow
        Write-Host "   vercel --prod" -ForegroundColor Gray
    }
} else {
    Write-Host "⚠️  Git not initialized" -ForegroundColor Yellow
    Write-Host "   Deploy manually: vercel --prod" -ForegroundColor Gray
}

Write-Host "`n✅ Deployment process started!`n" -ForegroundColor Green

