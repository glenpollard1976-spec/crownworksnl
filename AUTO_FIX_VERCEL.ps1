# Auto Fix Vercel Domain Linking
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTO FIX VERCEL DOMAIN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelCheck = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelCheck) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host ""
}

Write-Host "[1/5] Checking Vercel login status..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in. Logging in..." -ForegroundColor Yellow
    vercel login
    Write-Host ""
}

Write-Host "[2/5] Listing Vercel projects..." -ForegroundColor Yellow
$projects = vercel ls --json 2>&1 | ConvertFrom-Json
if ($projects) {
    Write-Host ""
    Write-Host "Found Projects:" -ForegroundColor Green
    $projectList = @()
    $index = 1
    foreach ($project in $projects) {
        Write-Host "$index. $($project.name) - $($project.url)" -ForegroundColor White
        $projectList += $project
        $index++
    }
    Write-Host ""
    
    # Find crownworksnl project
    $crownworksProject = $projects | Where-Object { $_.name -like "*crownworks*" -or $_.name -like "*crown*" }
    
    if ($crownworksProject) {
        Write-Host "[3/5] Found CrownWorksNL project: $($crownworksProject.name)" -ForegroundColor Green
        Write-Host "Project URL: $($crownworksProject.url)" -ForegroundColor Cyan
        Write-Host ""
        
        Write-Host "[4/5] Checking domains..." -ForegroundColor Yellow
        $domains = vercel domains ls $crownworksProject.name --json 2>&1 | ConvertFrom-Json
        if ($domains) {
            Write-Host "Current domains:" -ForegroundColor White
            foreach ($domain in $domains) {
                Write-Host "  - $($domain.name)" -ForegroundColor White
            }
        }
        
        Write-Host ""
        Write-Host "[5/5] Adding crownworksnl.com domain..." -ForegroundColor Yellow
        Write-Host "Attempting to add domain..." -ForegroundColor Yellow
        
        # Try to add domain
        $addDomain = vercel domains add crownworksnl.com $crownworksProject.name 2>&1
        Write-Host $addDomain
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "  DOMAIN ADDED SUCCESSFULLY!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "Domain may already exist or need manual configuration." -ForegroundColor Yellow
            Write-Host "Opening Vercel dashboard for manual setup..." -ForegroundColor Yellow
            Start-Process "https://vercel.com/dashboard/$($crownworksProject.name)/settings/domains"
        }
    } else {
        Write-Host "CrownWorksNL project not found automatically." -ForegroundColor Yellow
        Write-Host "Opening Vercel dashboard for manual selection..." -ForegroundColor Yellow
        Start-Process "https://vercel.com/dashboard"
    }
} else {
    Write-Host "Could not list projects. Opening Vercel dashboard..." -ForegroundColor Yellow
    Start-Process "https://vercel.com/dashboard"
}

Write-Host ""
Write-Host "Opening project settings..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/dashboard?settings=domains"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Delete the WRONG project" -ForegroundColor White
Write-Host "2. Verify crownworksnl.com is added to CORRECT project" -ForegroundColor White
Write-Host "3. Configure DNS if needed" -ForegroundColor White
Write-Host "4. Redeploy" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"

