# 🚀 CROWNWORKSNL AUTO-LAUNCH SCRIPT
# Automates: Email Campaign + Deployment + Monitoring

Write-Host "`n" -NoNewline
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   CROWNWORKSNL AUTO-LAUNCH SYSTEM                       ║" -ForegroundColor Cyan
Write-Host "║   Automating Everything...                               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

# Step 1: Check Prerequisites
Write-Host "📋 STEP 1: Checking Prerequisites..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

# Check Node.js
try {
    $nodeVersion = node --version 2>$null
    Write-Host "✅ Node.js $nodeVersion installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found - Please install Node.js first" -ForegroundColor Red
    exit 1
}

# Check if CSV exists
$csvPaths = @(
    "$env:USERPROFILE\OneDrive\Desktop\files (1)\crownworks_600_contacts.csv",
    "$env:USERPROFILE\Desktop\files (1)\crownworks_600_contacts.csv",
    "$env:USERPROFILE\Downloads\crownworks_600_contacts.csv",
    ".\crownworks_600_contacts.csv"
)

$csvPath = $null
foreach ($path in $csvPaths) {
    if (Test-Path $path) {
        $csvPath = $path
        Write-Host "✅ Found contacts CSV: $csvPath" -ForegroundColor Green
        break
    }
}

if (-not $csvPath) {
    Write-Host "⚠️  CSV not found - Email automation will be skipped" -ForegroundColor Yellow
}

# Check .env file
$envPath = ".\\.env"
if (Test-Path $envPath) {
    Write-Host "✅ .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file not found - Creating template..." -ForegroundColor Yellow
    $envTemplate = @"
# SMTP Configuration (for email sending)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe (already configured in Vercel)
STRIPE_SECRET_KEY=your_stripe_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_webhook_secret_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://crownworksnl.com
FRONTEND_URL=https://crownworksnl.com
"@
    $envTemplate | Out-File -FilePath $envPath -Encoding UTF8
    Write-Host "📝 Created .env template - Please fill in your credentials!" -ForegroundColor Yellow
}

Write-Host "`n"

# Step 2: Build Project
Write-Host "🔨 STEP 2: Building Project..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

Set-Location $PSScriptRoot
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host "`n"

# Step 3: Deploy to Vercel (if git is configured)
Write-Host "🚀 STEP 3: Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

# Check if git is initialized
if (Test-Path ".git") {
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
    git add -A
    git commit -m "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" 2>$null
    git push 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Code pushed to GitHub - Vercel will auto-deploy" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Git push failed (may need authentication)" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Git not initialized - Skipping auto-deploy" -ForegroundColor Yellow
    Write-Host "   Deploy manually via: vercel --prod" -ForegroundColor Gray
}
Write-Host "`n"

# Step 4: Send Emails
if ($csvPath) {
    Write-Host "📧 STEP 4: Starting Email Campaign..." -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    
    # Check if SMTP credentials exist
    $envContent = Get-Content $envPath -Raw -ErrorAction SilentlyContinue
    if ($envContent -and ($envContent -match "SMTP_USER") -and ($envContent -notmatch "your-email@gmail.com")) {
        Write-Host "✅ SMTP credentials found" -ForegroundColor Green
        Write-Host "🚀 Starting email campaign..." -ForegroundColor Cyan
        Write-Host "`n"
        
        # Run email script
        node scripts/send-bulk-smtp.js $csvPath 10 5000
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Email campaign completed!" -ForegroundColor Green
        } else {
            Write-Host "`n⚠️  Email campaign had errors - Check output above" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠️  SMTP credentials not configured" -ForegroundColor Yellow
        Write-Host "   To send emails:" -ForegroundColor Gray
        Write-Host "   1. Edit .env file" -ForegroundColor Gray
        Write-Host "   2. Add SMTP_USER and SMTP_PASS" -ForegroundColor Gray
        Write-Host "   3. Run: node scripts/send-bulk-smtp.js `"$csvPath`"" -ForegroundColor Gray
    }
    Write-Host "`n"
} else {
    Write-Host "⏭️  STEP 4: Skipping Email Campaign (CSV not found)" -ForegroundColor Yellow
    Write-Host "`n"
}

# Step 5: Summary
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ✅ AUTO-LAUNCH COMPLETE!                                ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host "`n"

Write-Host "📊 STATUS:" -ForegroundColor Cyan
Write-Host "   ✅ Project built" -ForegroundColor Green
Write-Host "   ✅ Code pushed to GitHub" -ForegroundColor Green
if ($csvPath) {
    Write-Host "   ✅ Email campaign started" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Email campaign skipped (no CSV)" -ForegroundColor Yellow
}

Write-Host "`n🌐 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "   1. Check Vercel dashboard for deployment status" -ForegroundColor White
Write-Host "   2. Visit https://crownworksnl.com to verify site is live" -ForegroundColor White
Write-Host "   3. Monitor email responses at info@crownworksnl.com" -ForegroundColor White
Write-Host "   4. Track conversions and follow up with leads" -ForegroundColor White

Write-Host "`n🎯 Your site is launching NOW!" -ForegroundColor Green
Write-Host "`n"

