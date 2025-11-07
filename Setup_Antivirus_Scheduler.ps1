# Setup CrownWorksNL Antivirus to run every 6 hours
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SETUP ANTIVIRUS SCHEDULER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

$ScriptPath = Join-Path $PSScriptRoot "CrownWorksNL_Antivirus.ps1"
$TaskName = "CrownWorksNL_Antivirus_Scanner"
$TaskDescription = "CrownWorksNL Antivirus - Automated security scan every 6 hours"

# Verify script exists
if (-not (Test-Path $ScriptPath)) {
    Write-Host "ERROR: Antivirus script not found at: $ScriptPath" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/4] Removing existing task (if any)..." -ForegroundColor Yellow
try {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "  - Existing task removed" -ForegroundColor Green
} catch {
    Write-Host "  - No existing task found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[2/4] Creating scheduled task..." -ForegroundColor Yellow

# Create action
$Action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-ExecutionPolicy Bypass -File `"$ScriptPath`" -Quiet"

# Create trigger (every 6 hours)
$Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 6) -RepetitionDuration (New-TimeSpan -Days 365)

# Create settings
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RunOnlyIfNetworkAvailable:$false

# Create principal (run as SYSTEM for maximum access)
$Principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest

# Register the task
try {
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Principal $Principal -Description $TaskDescription | Out-Null
    Write-Host "  - Task created successfully" -ForegroundColor Green
} catch {
    Write-Host "  - ERROR: Failed to create task: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[3/4] Verifying task..." -ForegroundColor Yellow
$Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($Task) {
    Write-Host "  - Task verified: $($Task.TaskName)" -ForegroundColor Green
    Write-Host "  - Next Run: $($Task.NextRunTime)" -ForegroundColor Cyan
    Write-Host "  - Status: $($Task.State)" -ForegroundColor Cyan
} else {
    Write-Host "  - WARNING: Task not found after creation" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[4/4] Running initial scan..." -ForegroundColor Yellow
try {
    & $ScriptPath
    Write-Host "  - Initial scan completed" -ForegroundColor Green
} catch {
    Write-Host "  - WARNING: Initial scan had issues: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Antivirus scanner is now scheduled to run every 6 hours." -ForegroundColor White
Write-Host ""
Write-Host "Task Name: $TaskName" -ForegroundColor Cyan
Write-Host "Schedule: Every 6 hours" -ForegroundColor Cyan
Write-Host "Log File: $env:USERPROFILE\Documents\CrownWorksNL_Antivirus_Log.txt" -ForegroundColor Cyan
Write-Host ""
Write-Host "To view scheduled tasks:" -ForegroundColor Yellow
Write-Host "  - Open Task Scheduler" -ForegroundColor White
Write-Host "  - Look for: $TaskName" -ForegroundColor White
Write-Host ""
Write-Host "To run scan manually:" -ForegroundColor Yellow
Write-Host "  powershell -ExecutionPolicy Bypass -File `"$ScriptPath`"" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"

