# CrownWorksNL - Automated Setup Script
# This script opens all necessary pages for setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CROWNWORKSNL - AUTOMATED SETUP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening setup pages..." -ForegroundColor Yellow
Write-Host ""

# Open Stripe Dashboard
Write-Host "1. Opening Stripe Dashboard..." -ForegroundColor Green
Start-Process "https://dashboard.stripe.com/apikeys"
Start-Sleep -Seconds 2

# Open Stripe Webhooks
Write-Host "2. Opening Stripe Webhooks..." -ForegroundColor Green
Start-Process "https://dashboard.stripe.com/webhooks"
Start-Sleep -Seconds 2

# Open Resend
Write-Host "3. Opening Resend (Email Service)..." -ForegroundColor Green
Start-Process "https://resend.com"
Start-Sleep -Seconds 2

# Open OpenAI (Optional)
Write-Host "4. Opening OpenAI (Optional - for AI Agent)..." -ForegroundColor Green
Start-Process "https://platform.openai.com/api-keys"
Start-Sleep -Seconds 2

# Open Vercel Dashboard
Write-Host "5. Opening Vercel Dashboard (Add keys here)..." -ForegroundColor Green
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SETUP INSTRUCTIONS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "STEP 1: Get Stripe Keys" -ForegroundColor Yellow
Write-Host "  - Copy Secret Key from Stripe Dashboard"
Write-Host "  - Create webhook endpoint: https://crownworksnl.com/api/webhook"
Write-Host "  - Copy webhook secret"
Write-Host ""
Write-Host "STEP 2: Get Resend Key" -ForegroundColor Yellow
Write-Host "  - Sign up at Resend (free)"
Write-Host "  - Get API key from dashboard"
Write-Host ""
Write-Host "STEP 3: Add to Vercel" -ForegroundColor Yellow
Write-Host "  - Go to Vercel Dashboard → Your Project → Settings → Environment Variables"
Write-Host "  - Add these variables:"
Write-Host "    • STRIPE_SECRET_KEY = sk_live_..."
Write-Host "    • STRIPE_WEBHOOK_SECRET = whsec_..."
Write-Host "    • RESEND_API_KEY = re_..."
Write-Host "    • OPENAI_API_KEY = sk-... (optional)"
Write-Host ""
Write-Host "STEP 4: Redeploy" -ForegroundColor Yellow
Write-Host "  - Vercel will auto-redeploy after adding variables"
Write-Host "  - Or manually redeploy in Vercel dashboard"
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All pages opened!" -ForegroundColor Green
Write-Host "  Follow the steps above to complete setup." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

