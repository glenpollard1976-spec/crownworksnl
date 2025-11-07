# 🛡️ CrownWorksNL Antivirus Scanner

## Overview

A comprehensive automated antivirus scanner that runs every 6 hours to protect your system from malware, viruses, and security threats.

---

## 🚀 Quick Start

### Option 1: Setup Automated Scanning (Recommended)
1. **Right-click** `Setup_Antivirus.bat`
2. Select **"Run as Administrator"**
3. Follow the prompts
4. Done! Scanner runs every 6 hours automatically

### Option 2: Run Manual Scan
- Double-click `Run_Antivirus_Now.bat`
- Or run: `powershell -ExecutionPolicy Bypass -File CrownWorksNL_Antivirus.ps1`

---

## 🔍 What It Scans

### 1. **File System**
- Suspicious file extensions (.scr, .vbs, .js, .bat, etc.)
- Malware signatures in filenames
- Unusual file sizes
- Temporary directories
- Downloads folder
- Desktop files

### 2. **Startup Programs**
- Registry startup entries
- Suspicious auto-run programs
- Non-existent startup files

### 3. **Running Processes**
- Currently running processes
- Process file locations
- Suspicious executables

### 4. **Security Checks**
- Known malware patterns
- Suspicious registry paths
- Potentially unwanted programs

---

## 📊 Scan Results

### Log File Location
```
%USERPROFILE%\Documents\CrownWorksNL_Antivirus_Log.txt
```

### What Gets Logged
- Scan date and time
- Files scanned count
- Threats detected
- Threat details (type, path, severity)
- Scan completion status

### Threat Severity Levels
- **CRITICAL** - Immediate action required
- **High** - Serious threat detected
- **Medium** - Suspicious activity
- **Low** - Minor concern

---

## ⚙️ Configuration

### Change Scan Frequency
1. Open **Task Scheduler**
2. Find task: `CrownWorksNL_Antivirus_Scanner`
3. Right-click → **Properties**
4. Go to **Triggers** tab
5. Edit trigger → Change **Repeat task every** to desired interval
6. Click **OK**

### Run Different Scan Types
Edit `CrownWorksNL_Antivirus.ps1` to:
- Add more directories to scan
- Modify threat signatures
- Change scan depth
- Add custom checks

---

## 🛠️ Manual Operations

### Run Scan Now
```powershell
powershell -ExecutionPolicy Bypass -File CrownWorksNL_Antivirus.ps1
```

### Run Quiet Scan (No Output)
```powershell
powershell -ExecutionPolicy Bypass -File CrownWorksNL_Antivirus.ps1 -Quiet
```

### View Log File
```powershell
notepad $env:USERPROFILE\Documents\CrownWorksNL_Antivirus_Log.txt
```

### Check Scheduled Task
```powershell
Get-ScheduledTask -TaskName "CrownWorksNL_Antivirus_Scanner"
```

### Remove Scheduled Task
```powershell
Unregister-ScheduledTask -TaskName "CrownWorksNL_Antivirus_Scanner" -Confirm:$false
```

---

## 📋 Features

### ✅ Automated Scanning
- Runs every 6 hours automatically
- No user interaction required
- Runs in background

### ✅ Comprehensive Detection
- Multiple threat detection methods
- Signature-based scanning
- Behavioral analysis
- Heuristic detection

### ✅ Detailed Logging
- Complete scan history
- Threat details logged
- Timestamp for all events
- Easy to review

### ✅ Low Resource Usage
- Efficient scanning algorithm
- Skips system directories
- Limited depth scanning
- Fast execution

---

## ⚠️ Important Notes

### What This Scanner Does
- ✅ Detects suspicious files and patterns
- ✅ Scans startup programs
- ✅ Monitors running processes
- ✅ Logs all findings
- ✅ Runs automatically

### What This Scanner Does NOT Do
- ❌ Remove threats automatically (logs them for review)
- ❌ Replace commercial antivirus (complementary tool)
- ❌ Real-time protection (scheduled scans only)
- ❌ Update virus definitions (uses pattern matching)

### Recommendations
1. **Keep your main antivirus** - This is a supplementary tool
2. **Review logs regularly** - Check for detected threats
3. **Manual review required** - You decide what to do with threats
4. **Keep updated** - Update signatures as needed

---

## 🔒 Security Best Practices

### Use With
- Windows Defender (built-in)
- Commercial antivirus software
- Firewall protection
- Regular system updates

### Additional Protection
- Keep Windows updated
- Use strong passwords
- Be cautious with downloads
- Avoid suspicious websites
- Don't open unknown email attachments

---

## 📈 Performance

### Scan Speed
- Quick scan: ~2-5 minutes
- Full scan: ~10-15 minutes
- Depends on system size

### Resource Usage
- Low CPU usage
- Minimal memory footprint
- Runs during idle time
- Doesn't slow down system

---

## 🐛 Troubleshooting

### Task Not Running
1. Check Task Scheduler
2. Verify task is enabled
3. Check task history for errors
4. Re-run setup script

### No Log File
- Check if script has write permissions
- Verify Documents folder exists
- Run script manually to test

### False Positives
- Some legitimate files may trigger warnings
- Review each threat individually
- Add exceptions if needed

### Script Errors
- Ensure PowerShell execution policy allows scripts
- Run as Administrator if needed
- Check file paths are correct

---

## 📞 Support

### Check Logs First
Most issues are logged in the log file.

### Common Solutions
- Re-run setup script
- Check Task Scheduler
- Verify file permissions
- Run manual scan to test

---

## 🎯 Summary

**CrownWorksNL Antivirus** provides:
- ✅ Automated security scanning
- ✅ Every 6 hours schedule
- ✅ Comprehensive threat detection
- ✅ Detailed logging
- ✅ Easy to use

**Perfect for:**
- Additional security layer
- Regular system health checks
- Threat monitoring
- Peace of mind

---

**Stay protected! 🛡️**

