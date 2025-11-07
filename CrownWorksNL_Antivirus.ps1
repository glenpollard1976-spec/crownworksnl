# CrownWorksNL Antivirus Scanner
# Runs comprehensive security scan every 6 hours

param(
    [switch]$Quiet = $false
)

$ErrorActionPreference = "SilentlyContinue"
$LogFile = "$env:USERPROFILE\Documents\CrownWorksNL_Antivirus_Log.txt"
$ScanDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$ThreatsFound = 0
$FilesScanned = 0
$Threats = @()

# Known malware signatures and patterns
$MalwareSignatures = @(
    "trojan",
    "virus",
    "malware",
    "spyware",
    "adware",
    "ransomware",
    "keylogger",
    "backdoor",
    ".exe.vbs",
    ".exe.js",
    ".exe.bat",
    "autorun.inf",
    "desktop.ini"
)

# Suspicious file extensions
$SuspiciousExtensions = @(
    ".scr",
    ".vbs",
    ".js",
    ".bat",
    ".cmd",
    ".pif",
    ".com"
)

# Suspicious registry locations
$SuspiciousRegPaths = @(
    "HKLM:\Software\Microsoft\Windows\CurrentVersion\Run",
    "HKLM:\Software\Microsoft\Windows\CurrentVersion\RunOnce",
    "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run",
    "HKCU:\Software\Microsoft\Windows\CurrentVersion\RunOnce"
)

# Suspicious process names
$SuspiciousProcesses = @(
    "svchost.exe",
    "explorer.exe",
    "winlogon.exe"
)

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Add-Content -Path $LogFile -Value $LogEntry
    if (-not $Quiet) {
        Write-Host $LogEntry
    }
}

function Scan-File {
    param([string]$FilePath)
    
    $FilesScanned++
    $FileInfo = Get-Item $FilePath -ErrorAction SilentlyContinue
    if (-not $FileInfo) { return }
    
    $FileName = $FileInfo.Name.ToLower()
    $FileExtension = $FileInfo.Extension.ToLower()
    
    # Check for suspicious extensions
    if ($SuspiciousExtensions -contains $FileExtension) {
        $ThreatsFound++
        $Threat = @{
            Type = "Suspicious Extension"
            Path = $FilePath
            Details = "File has suspicious extension: $FileExtension"
            Severity = "Medium"
        }
        $script:Threats += $Threat
        Write-Log "THREAT: Suspicious extension found - $FilePath" "WARNING"
        return $true
    }
    
    # Check for malware signatures in filename
    foreach ($Signature in $MalwareSignatures) {
        if ($FileName -like "*$Signature*") {
            $ThreatsFound++
            $Threat = @{
                Type = "Malware Signature"
                Path = $FilePath
                Details = "Filename contains malware signature: $Signature"
                Severity = "High"
            }
            $script:Threats += $Threat
            Write-Log "THREAT: Malware signature detected - $FilePath" "CRITICAL"
            return $true
        }
    }
    
    # Check file size (very large or very small executables can be suspicious)
    if ($FileExtension -eq ".exe") {
        $FileSize = $FileInfo.Length
        if ($FileSize -lt 1024 -or $FileSize -gt 100MB) {
            $Threat = @{
                Type = "Suspicious File Size"
                Path = $FilePath
                Details = "Executable has unusual size: $([math]::Round($FileSize/1MB, 2)) MB"
                Severity = "Low"
            }
            $script:Threats += $Threat
            Write-Log "WARNING: Suspicious file size - $FilePath" "WARNING"
        }
    }
    
    return $false
}

function Scan-Directory {
    param([string]$Directory, [int]$MaxDepth = 3, [int]$CurrentDepth = 0)
    
    if ($CurrentDepth -ge $MaxDepth) { return }
    if (-not (Test-Path $Directory)) { return }
    
    try {
        $Items = Get-ChildItem -Path $Directory -ErrorAction SilentlyContinue
        foreach ($Item in $Items) {
            if ($Item.PSIsContainer) {
                # Skip system directories to speed up scan
                if ($Item.Name -notin @("System Volume Information", "$Recycle.Bin", "Windows", "Program Files", "Program Files (x86)")) {
                    Scan-Directory -Directory $Item.FullName -MaxDepth $MaxDepth -CurrentDepth ($CurrentDepth + 1)
                }
            } else {
                Scan-File -FilePath $Item.FullName
            }
        }
    } catch {
        Write-Log "Error scanning directory $Directory : $_" "ERROR"
    }
}

function Scan-StartupPrograms {
    Write-Log "Scanning startup programs..." "INFO"
    
    foreach ($RegPath in $SuspiciousRegPaths) {
        try {
            $StartupItems = Get-ItemProperty -Path $RegPath -ErrorAction SilentlyContinue
            if ($StartupItems) {
                $StartupItems.PSObject.Properties | ForEach-Object {
                    if ($_.Name -notin @("PSPath", "PSParentPath", "PSChildName", "PSDrive", "PSProvider")) {
                        $Value = $_.Value
                        if ($Value -and $Value -like "*.exe*") {
                            # Check if file exists and scan it
                            if (Test-Path $Value) {
                                Scan-File -FilePath $Value
                            } else {
                                $ThreatsFound++
                                $Threat = @{
                                    Type = "Suspicious Startup"
                                    Path = $RegPath
                                    Details = "Startup program points to non-existent file: $Value"
                                    Severity = "High"
                                }
                                $script:Threats += $Threat
                                Write-Log "THREAT: Suspicious startup entry - $Value" "CRITICAL"
                            }
                        }
                    }
                }
            }
        } catch {
            Write-Log "Error scanning registry path $RegPath : $_" "ERROR"
        }
    }
}

function Scan-RunningProcesses {
    Write-Log "Scanning running processes..." "INFO"
    
    $Processes = Get-Process -ErrorAction SilentlyContinue
    foreach ($Proc in $Processes) {
        try {
            $ProcPath = $Proc.Path
            if ($ProcPath -and (Test-Path $ProcPath)) {
                Scan-File -FilePath $ProcPath
            }
        } catch {
            # Some system processes can't be accessed
        }
    }
}

function Scan-TempDirectories {
    Write-Log "Scanning temporary directories..." "INFO"
    
    $TempDirs = @(
        $env:TEMP,
        "$env:USERPROFILE\AppData\Local\Temp",
        "$env:USERPROFILE\Downloads",
        "$env:USERPROFILE\Desktop"
    )
    
    foreach ($TempDir in $TempDirs) {
        if (Test-Path $TempDir) {
            Scan-Directory -Directory $TempDir -MaxDepth 2
        }
    }
}

function Generate-Report {
    Write-Log "========================================" "INFO"
    Write-Log "CrownWorksNL Antivirus Scan Report" "INFO"
    Write-Log "Scan Date: $ScanDate" "INFO"
    Write-Log "Files Scanned: $FilesScanned" "INFO"
    Write-Log "Threats Found: $ThreatsFound" "INFO"
    Write-Log "========================================" "INFO"
    
    if ($Threats.Count -gt 0) {
        Write-Log "" "INFO"
        Write-Log "THREATS DETECTED:" "WARNING"
        foreach ($Threat in $Threats) {
            Write-Log "  [$($Threat.Severity)] $($Threat.Type)" "WARNING"
            Write-Log "    Path: $($Threat.Path)" "WARNING"
            Write-Log "    Details: $($Threat.Details)" "WARNING"
            Write-Log "" "INFO"
        }
    } else {
        Write-Log "No threats detected. System appears clean." "INFO"
    }
    
    Write-Log "========================================" "INFO"
    Write-Log "Scan completed at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" "INFO"
    Write-Log "========================================" "INFO"
}

# Main scan execution
Write-Log "========================================" "INFO"
Write-Log "CrownWorksNL Antivirus Scanner Starting" "INFO"
Write-Log "Scan Date: $ScanDate" "INFO"
Write-Log "========================================" "INFO"

# Perform scans
Scan-StartupPrograms
Scan-RunningProcesses
Scan-TempDirectories

# Generate report
Generate-Report

# Exit with appropriate code
if ($ThreatsFound -gt 0) {
    exit 1
} else {
    exit 0
}

