# Marry Both Vercel Projects - Consolidate into One
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MARRY VERCEL PROJECTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelCheck = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelCheck) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host ""
}

Write-Host "[1/4] Checking Vercel login..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please log in to Vercel..." -ForegroundColor Yellow
    vercel login
    Write-Host ""
}

Write-Host "[2/4] Listing all Vercel projects..." -ForegroundColor Yellow
Write-Host ""

try {
    $projectsJson = vercel ls --json 2>&1
    $projects = $projectsJson | ConvertFrom-Json
    
    if ($projects -and $projects.Count -gt 0) {
        Write-Host "Found Projects:" -ForegroundColor Green
        Write-Host ""
        
        $crownProjects = @()
        $index = 1
        
        foreach ($project in $projects) {
            $isCrown = $project.name -like "*crown*" -or $project.name -like "*works*" -or $project.name -like "*quest*"
            
            if ($isCrown) {
                Write-Host "$index. $($project.name)" -ForegroundColor Cyan
                Write-Host "   URL: $($project.url)" -ForegroundColor White
                Write-Host "   ID: $($project.id)" -ForegroundColor Gray
                Write-Host ""
                $crownProjects += $project
                $index++
            }
        }
        
        if ($crownProjects.Count -eq 0) {
            Write-Host "No CrownWorksNL projects found automatically." -ForegroundColor Yellow
            Write-Host "Opening Vercel dashboard..." -ForegroundColor Yellow
            Start-Process "https://vercel.com/dashboard"
        } elseif ($crownProjects.Count -eq 1) {
            Write-Host "[3/4] Found 1 project. This should be the main one." -ForegroundColor Green
            $mainProject = $crownProjects[0]
            Write-Host "Project: $($mainProject.name)" -ForegroundColor Cyan
            Write-Host ""
            
            Write-Host "[4/4] Opening project settings..." -ForegroundColor Yellow
            Start-Process "https://vercel.com/dashboard/$($mainProject.name)/settings"
            Start-Sleep -Seconds 2
            Start-Process "https://vercel.com/dashboard/$($mainProject.name)/settings/domains"
        } else {
            Write-Host "[3/4] Found $($crownProjects.Count) projects!" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "PROJECT 1 (Keep This One):" -ForegroundColor Green
            Write-Host "  Name: $($crownProjects[0].name)" -ForegroundColor White
            Write-Host "  URL: $($crownProjects[0].url)" -ForegroundColor White
            Write-Host ""
            Write-Host "PROJECT 2 (Delete This One):" -ForegroundColor Red
            Write-Host "  Name: $($crownProjects[1].name)" -ForegroundColor White
            Write-Host "  URL: $($crownProjects[1].url)" -ForegroundColor White
            Write-Host ""
            
            Write-Host "[4/4] Opening both projects..." -ForegroundColor Yellow
            Start-Process "https://vercel.com/dashboard/$($crownProjects[0].name)/settings"
            Start-Sleep -Seconds 1
            Start-Process "https://vercel.com/dashboard/$($crownProjects[1].name)/settings"
            Start-Sleep -Seconds 1
            Start-Process "https://vercel.com/dashboard/$($crownProjects[0].name)/settings/domains"
        }
    } else {
        Write-Host "Could not list projects. Opening Vercel dashboard..." -ForegroundColor Yellow
        Start-Process "https://vercel.com/dashboard"
    }
} catch {
    Write-Host "Error listing projects. Opening Vercel dashboard..." -ForegroundColor Yellow
    Start-Process "https://vercel.com/dashboard"
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HOW TO MARRY THE PROJECTS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "STEP 1: Identify the CORRECT project" -ForegroundColor Yellow
Write-Host "  - Should be connected to: glenpollard1976-spec/crownworksnl" -ForegroundColor White
Write-Host "  - Should have latest code" -ForegroundColor White
Write-Host ""
Write-Host "STEP 2: Transfer domain from wrong project" -ForegroundColor Yellow
Write-Host "  - Go to WRONG project > Settings > Domains" -ForegroundColor White
Write-Host "  - Remove crownworksnl.com (if it's there)" -ForegroundColor White
Write-Host ""
Write-Host "STEP 3: Add domain to CORRECT project" -ForegroundColor Yellow
Write-Host "  - Go to CORRECT project > Settings > Domains" -ForegroundColor White
Write-Host "  - Add: crownworksnl.com" -ForegroundColor White
Write-Host "  - Follow DNS setup if needed" -ForegroundColor White
Write-Host ""
Write-Host "STEP 4: Delete the wrong project" -ForegroundColor Yellow
Write-Host "  - Go to WRONG project > Settings" -ForegroundColor White
Write-Host "  - Scroll down > Delete Project" -ForegroundColor White
Write-Host "  - Confirm deletion" -ForegroundColor White
Write-Host ""
Write-Host "STEP 5: Verify connection" -ForegroundColor Yellow
Write-Host "  - Go to CORRECT project > Settings > Git" -ForegroundColor White
Write-Host "  - Verify it's connected to: glenpollard1976-spec/crownworksnl" -ForegroundColor White
Write-Host "  - If not, click 'Connect Git Repository' and select it" -ForegroundColor White
Write-Host ""
Write-Host "STEP 6: Redeploy" -ForegroundColor Yellow
Write-Host "  - Go to Deployments tab" -ForegroundColor White
Write-Host "  - Click 'Redeploy' on latest deployment" -ForegroundColor White
Write-Host ""
Write-Host "Opening GitHub repo to verify..." -ForegroundColor Yellow
Start-Process "https://github.com/glenpollard1976-spec/crownworksnl"
Write-Host ""
Read-Host "Press Enter to exit"

