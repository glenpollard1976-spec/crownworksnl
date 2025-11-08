# CrownWorksNL - Install Stripe CLI and Create Webhook
# This script installs Stripe CLI and automates webhook creation

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALL STRIPE CLI & CREATE WEBHOOK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Stripe CLI is installed
$stripeInstalled = Get-Command stripe -ErrorAction SilentlyContinue

if (-not $stripeInstalled) {
    Write-Host "Stripe CLI not found. Installing..." -ForegroundColor Yellow
    Write-Host ""
    
    # Try Scoop first
    $scoopInstalled = Get-Command scoop -ErrorAction SilentlyContinue
    if ($scoopInstalled) {
        Write-Host "Installing via Scoop..." -ForegroundColor Cyan
        scoop install stripe-cli
        
        # Refresh PATH
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        # Check again
        $stripeInstalled = Get-Command stripe -ErrorAction SilentlyContinue
    }
    
    if (-not $stripeInstalled) {
        Write-Host ""
        Write-Host "⚠️  Could not install via Scoop" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Please install Stripe CLI manually:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://github.com/stripe/stripe-cli/releases" -ForegroundColor White
        Write-Host "2. Download latest Windows .zip file" -ForegroundColor White
        Write-Host "3. Extract and add to PATH" -ForegroundColor White
        Write-Host ""
        Write-Host "Or use winget:" -ForegroundColor Yellow
        Write-Host "   winget install stripe.stripe-cli" -ForegroundColor White
        Write-Host ""
        
        Start-Process "https://github.com/stripe/stripe-cli/releases"
        Write-Host "Press any key after installing Stripe CLI..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        
        # Refresh PATH again
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        $stripeInstalled = Get-Command stripe -ErrorAction SilentlyContinue
    }
}

if ($stripeInstalled) {
    Write-Host "✅ Stripe CLI installed!" -ForegroundColor Green
    Write-Host ""
    
    # Check version
    $version = stripe --version 2>&1
    Write-Host "Version: $version" -ForegroundColor White
    Write-Host ""
    
    # Login check
    Write-Host "Checking login status..." -ForegroundColor Yellow
    $config = stripe config --list 2>&1
    
    if ($config -match "No API key" -or $LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Not logged in" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Logging in to Stripe..." -ForegroundColor Cyan
        Write-Host "This will open your browser for authorization." -ForegroundColor White
        Write-Host ""
        
        stripe login
        
        Write-Host ""
        Write-Host "Press any key after you've logged in..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    } else {
        Write-Host "✅ Already logged in!" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  CREATING WEBHOOK ENDPOINT" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    $webhookUrl = "https://crownworksnl.com/api/webhook"
    
    Write-Host "Creating webhook endpoint..." -ForegroundColor Yellow
    Write-Host "URL: $webhookUrl" -ForegroundColor White
    Write-Host ""
    
    # Create webhook with all events
    Write-Host "Executing: stripe webhook-endpoints create..." -ForegroundColor Cyan
    
    $webhookResult = stripe webhook-endpoints create `
        --url $webhookUrl `
        --enabled-events "*" `
        --description "CrownWorksNL Production Webhook" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Webhook created successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Output:" -ForegroundColor Cyan
        Write-Host $webhookResult
        Write-Host ""
        
        # Try to extract webhook secret
        $secretMatch = [regex]::Match($webhookResult, "whsec_[a-zA-Z0-9]+")
        if ($secretMatch.Success) {
            $webhookSecret = $secretMatch.Value
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host "  WEBHOOK SECRET FOUND!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Secret: $webhookSecret" -ForegroundColor Yellow
            Write-Host ""
            
            # Copy to clipboard
            $webhookSecret | Set-Clipboard
            Write-Host "✅ Secret copied to clipboard!" -ForegroundColor Green
            Write-Host ""
        } else {
            Write-Host "⚠️  Could not extract secret from output" -ForegroundColor Yellow
            Write-Host "   Check the output above for the secret" -ForegroundColor White
        }
        
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  NEXT: ADD TO VERCEL" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor White
        Write-Host "2. Your project → Settings → Environment Variables" -ForegroundColor White
        Write-Host "3. Add: STRIPE_WEBHOOK_SECRET = [paste secret]" -ForegroundColor White
        Write-Host ""
        
        Start-Process "https://vercel.com/dashboard"
        
    } else {
        Write-Host ""
        Write-Host "❌ Failed to create webhook" -ForegroundColor Red
        Write-Host ""
        Write-Host "Error output:" -ForegroundColor Yellow
        Write-Host $webhookResult
        Write-Host ""
        Write-Host "Troubleshooting:" -ForegroundColor Yellow
        Write-Host "- Make sure you're logged in: stripe login" -ForegroundColor White
        Write-Host "- Check your Stripe account is active" -ForegroundColor White
        Write-Host "- Try: stripe webhook-endpoints list (to see existing webhooks)" -ForegroundColor White
    }
    
} else {
    Write-Host "❌ Stripe CLI installation failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install manually:" -ForegroundColor Yellow
    Write-Host "https://github.com/stripe/stripe-cli/releases" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


