# Automated Multi-LLM Provider Setup (PowerShell)
# Installs packages and guides setup

Write-Host "Automated Multi-LLM Provider Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install packages
Write-Host "Installing packages..." -ForegroundColor Yellow
Write-Host ""

try {
    Write-Host "Installing @anthropic-ai/sdk..." -ForegroundColor Gray
    npm install @anthropic-ai/sdk@^0.27.0
    Write-Host "[OK] Anthropic SDK installed" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[WARN] Anthropic SDK installation issue (may already be installed)" -ForegroundColor Yellow
    Write-Host ""
}

try {
    Write-Host "Installing @google/generative-ai..." -ForegroundColor Gray
    npm install @google/generative-ai@^0.21.0
    Write-Host "[OK] Google Gemini SDK installed" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[WARN] Google Gemini SDK installation issue (may already be installed)" -ForegroundColor Yellow
    Write-Host ""
}

# Step 2: Check .env.local
Write-Host "Checking environment variables..." -ForegroundColor Yellow
Write-Host ""

$envPath = ".env.local"
$envContent = ""

if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    Write-Host "[OK] Found .env.local file" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[WARN] .env.local not found, will create it" -ForegroundColor Yellow
    Write-Host ""
}

# Check for keys
$hasOpenAI = $envContent -match "OPENAI_API_KEY=sk-" -and $envContent -notmatch "OPENAI_API_KEY=sk-\.\.\."
$hasAnthropic = $envContent -match "ANTHROPIC_API_KEY=sk-ant-" -and $envContent -notmatch "ANTHROPIC_API_KEY=sk-ant-\.\.\."
$hasGoogle = $envContent -match "GOOGLE_API_KEY=AIza" -and $envContent -notmatch "GOOGLE_API_KEY=AIza\.\.\."

Write-Host "Current API Keys Status:" -ForegroundColor Cyan
if ($hasOpenAI) { Write-Host "  [OK] OpenAI API Key" -ForegroundColor Green } else { Write-Host "  [X] OpenAI API Key" -ForegroundColor Red }
if ($hasAnthropic) { Write-Host "  [OK] Anthropic API Key" -ForegroundColor Green } else { Write-Host "  [X] Anthropic API Key" -ForegroundColor Red }
if ($hasGoogle) { Write-Host "  [OK] Google API Key" -ForegroundColor Green } else { Write-Host "  [X] Google API Key" -ForegroundColor Red }
Write-Host ""

# Guide user
$needsKeys = (-not $hasAnthropic) -or (-not $hasGoogle)
if ($needsKeys) {
    Write-Host "Get API Keys:" -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $hasAnthropic) {
        Write-Host "Anthropic Claude API Key:" -ForegroundColor Cyan
        Write-Host "   1. Go to: https://console.anthropic.com/" -ForegroundColor Gray
        Write-Host "   2. Sign up / Log in" -ForegroundColor Gray
        Write-Host "   3. Navigate to API Keys" -ForegroundColor Gray
        Write-Host "   4. Create a new API key" -ForegroundColor Gray
        Write-Host "   5. Copy the key (starts with sk-ant-)" -ForegroundColor Gray
        Write-Host ""
        
        # Open browser
        Write-Host "   Opening browser..." -ForegroundColor Gray
        Start-Process "https://console.anthropic.com/"
    }
    
    if (-not $hasGoogle) {
        Write-Host "Google Gemini API Key:" -ForegroundColor Cyan
        Write-Host "   1. Go to: https://makersuite.google.com/app/apikey" -ForegroundColor Gray
        Write-Host "   2. Sign in with Google account" -ForegroundColor Gray
        Write-Host "   3. Create API key" -ForegroundColor Gray
        Write-Host "   4. Copy the key (starts with AIza)" -ForegroundColor Gray
        Write-Host ""
        
        # Open browser
        Write-Host "   Opening browser..." -ForegroundColor Gray
        Start-Process "https://makersuite.google.com/app/apikey"
    }
    
    Write-Host "After getting your keys, add them to .env.local:" -ForegroundColor Yellow
    Write-Host "   ANTHROPIC_API_KEY=sk-ant-your-key-here" -ForegroundColor Gray
    Write-Host "   GOOGLE_API_KEY=AIza-your-key-here" -ForegroundColor Gray
    Write-Host ""
}

# Update .env.local
$needsUpdate = (-not $hasAnthropic) -or (-not $hasGoogle)
if ($needsUpdate) {
    Write-Host "Updating .env.local..." -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $envContent) {
        $envContent = ""
    }
    
    if ($envContent -notmatch "ANTHROPIC_API_KEY=") {
        $envContent += "`n# Anthropic Claude API Key`n"
        $envContent += "# Get from: https://console.anthropic.com/`n"
        $envContent += "ANTHROPIC_API_KEY=sk-ant-your-key-here`n"
    }
    
    if ($envContent -notmatch "GOOGLE_API_KEY=") {
        $envContent += "`n# Google Gemini API Key`n"
        $envContent += "# Get from: https://makersuite.google.com/app/apikey`n"
        $envContent += "GOOGLE_API_KEY=AIza-your-key-here`n"
    }
    
    Set-Content -Path $envPath -Value $envContent
    Write-Host "[OK] .env.local updated with placeholder keys" -ForegroundColor Green
    Write-Host "[WARN] Remember to replace placeholder keys with actual API keys!" -ForegroundColor Yellow
    Write-Host ""
}

# Test providers
Write-Host "Testing providers..." -ForegroundColor Yellow
Write-Host ""

try {
    node scripts/test-llm-providers.js
} catch {
    Write-Host "[WARN] Could not test providers (this is normal if keys are not set yet)" -ForegroundColor Yellow
    Write-Host ""
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Get your API keys (browsers opened above)" -ForegroundColor Gray
Write-Host "2. Add them to .env.local" -ForegroundColor Gray
Write-Host "3. Run: npm run test-llm" -ForegroundColor Gray
Write-Host "4. Deploy to Vercel" -ForegroundColor Gray
Write-Host ""
Write-Host "Full guide: ADD_MORE_LLM_MODELS.md" -ForegroundColor Cyan
Write-Host ""
