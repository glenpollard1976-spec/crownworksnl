# PowerShell script to find contact files on your computer
Write-Host "Searching for contact files..." -ForegroundColor Cyan

# Common locations to search
$searchPaths = @(
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\Documents",
    "$env:USERPROFILE\Downloads",
    "$env:USERPROFILE\OneDrive\Desktop",
    "$env:USERPROFILE\OneDrive\Documents"
)

# File patterns to look for
$patterns = @("*.csv", "*.xlsx", "*.xls", "*contact*", "*email*", "*list*")

$foundFiles = @()

foreach ($path in $searchPaths) {
    if (Test-Path $path) {
        Write-Host "`nSearching in: $path" -ForegroundColor Yellow
        foreach ($pattern in $patterns) {
            $files = Get-ChildItem -Path $path -Filter $pattern -ErrorAction SilentlyContinue
            foreach ($file in $files) {
                $foundFiles += $file
                Write-Host "  Found: $($file.Name)" -ForegroundColor Green
            }
        }
    }
}

# Also search in current directory
Write-Host "`nSearching in current directory..." -ForegroundColor Yellow
foreach ($pattern in $patterns) {
    $files = Get-ChildItem -Path "." -Filter $pattern -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        $foundFiles += $file
        Write-Host "  Found: $($file.FullName)" -ForegroundColor Green
    }
}

if ($foundFiles.Count -eq 0) {
    Write-Host "`nNo contact files found." -ForegroundColor Red
    Write-Host "`nTo create a CSV file, use this format:" -ForegroundColor Cyan
    Write-Host "Name,Email,Phone" -ForegroundColor White
    Write-Host "John Doe,john@example.com,709-555-1234" -ForegroundColor White
    Write-Host "Jane Smith,jane@example.com,709-555-5678" -ForegroundColor White
} else {
    Write-Host "`n`nFound $($foundFiles.Count) file(s):" -ForegroundColor Green
    for ($i = 0; $i -lt $foundFiles.Count; $i++) {
        Write-Host "[$($i+1)] $($foundFiles[$i].FullName)" -ForegroundColor Cyan
    }
    Write-Host "`nYou can import these files in the Email List page at: http://localhost:3000/email-list" -ForegroundColor Yellow
}

