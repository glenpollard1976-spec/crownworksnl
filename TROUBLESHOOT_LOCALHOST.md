# 🔧 Troubleshoot localhost:3000 Not Loading

## ✅ Server Status
- **Port 3000:** ✅ Running (confirmed)
- **Process:** Node.js is active

## 🔍 Common Issues & Fixes

### Issue 1: Page Loads But Blank/White Screen

**Fix:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Look for red error messages
4. Common errors:
   - Module not found
   - Import errors
   - React hydration errors

**Solution:**
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .next
# Restart
npm run dev
```

### Issue 2: "Cannot GET /" or 404 Error

**Fix:**
```bash
# Make sure you're in the project directory
cd C:\Users\glenp\Downloads\CrownQuestNL

# Restart server
npm run dev
```

### Issue 3: Port Already in Use

**Fix:**
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Or use different port
npm run dev -- -p 3001
```

### Issue 4: Build Errors

**Fix:**
```bash
# Check for errors
npm run build

# If errors, fix them, then:
npm run dev
```

### Issue 5: Browser Cache

**Fix:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Try incognito/private mode

### Issue 6: Firewall/Antivirus Blocking

**Fix:**
- Check Windows Firewall
- Check antivirus settings
- Allow Node.js through firewall

---

## 🚀 Quick Fix Commands

```bash
# 1. Stop all Node processes
taskkill /F /IM node.exe

# 2. Clear Next.js cache
rm -rf .next
# Or on Windows:
Remove-Item -Recurse -Force .next

# 3. Reinstall dependencies (if needed)
npm install

# 4. Start fresh
npm run dev
```

---

## 📋 Check These

1. **Is server actually running?**
   - Check terminal for "Ready" message
   - Should see: "Local: http://localhost:3000"

2. **Browser console errors?**
   - Press F12
   - Check Console tab
   - Look for red errors

3. **Network tab?**
   - Press F12 → Network tab
   - Refresh page
   - Check if files are loading (200 status)

4. **Try different browser?**
   - Chrome
   - Firefox
   - Edge

---

## ✅ Working Solution

**Try this step by step:**

1. **Stop server:** Press `Ctrl+C` in terminal

2. **Clear cache:**
   ```bash
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   ```

3. **Restart:**
   ```bash
   npm run dev
   ```

4. **Wait for "Ready" message** (should take 10-30 seconds)

5. **Open browser:**
   - Go to: http://localhost:3000
   - Or: http://127.0.0.1:3000

6. **If still not working:**
   - Check browser console (F12)
   - Look for specific error messages
   - Share the error with me

---

## 🎯 Alternative: Use Production Build

If dev server won't work:

```bash
# Build production version
npm run build

# Start production server
npm start
```

Then open: http://localhost:3000

---

**Let me know what error you see in the browser console (F12)!**

