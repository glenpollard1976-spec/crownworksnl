@echo off
REM Automated Multi-LLM Provider Setup (Batch)
echo.
echo 🚀 Automated Multi-LLM Provider Setup
echo ========================================
echo.

REM Step 1: Install packages
echo 📦 Installing packages...
echo.

echo Installing @anthropic-ai/sdk...
call npm install @anthropic-ai/sdk@^0.27.0
if %errorlevel% equ 0 (
    echo ✅ Anthropic SDK installed
) else (
    echo ⚠️ Anthropic SDK installation issue (may already be installed)
)
echo.

echo Installing @google/generative-ai...
call npm install @google/generative-ai@^0.21.0
if %errorlevel% equ 0 (
    echo ✅ Google Gemini SDK installed
) else (
    echo ⚠️ Google Gemini SDK installation issue (may already be installed)
)
echo.

REM Step 2: Check .env.local
echo 🔑 Checking environment variables...
echo.

if exist .env.local (
    echo ✅ Found .env.local file
) else (
    echo ⚠️ .env.local not found
)
echo.

REM Guide user
echo 🔗 Get API Keys:
echo.
echo 📝 Anthropic Claude API Key:
echo    1. Go to: https://console.anthropic.com/
echo    2. Sign up / Log in
echo    3. Navigate to API Keys
echo    4. Create a new API key
echo    5. Copy the key (starts with sk-ant-)
echo.
echo 📝 Google Gemini API Key:
echo    1. Go to: https://makersuite.google.com/app/apikey
echo    2. Sign in with Google account
echo    3. Create API key
echo    4. Copy the key (starts with AIza)
echo.

REM Open browsers
echo Opening browsers...
start https://console.anthropic.com/
timeout /t 2 /nobreak >nul
start https://makersuite.google.com/app/apikey
echo.

echo 💡 After getting your keys, add them to .env.local:
echo    ANTHROPIC_API_KEY=sk-ant-your-key-here
echo    GOOGLE_API_KEY=AIza-your-key-here
echo.

REM Test
echo 🧪 Testing providers...
echo.
call npm run test-llm
echo.

echo ========================================
echo ✅ Setup Complete!
echo.
echo 📋 Next Steps:
echo 1. Get your API keys (browsers opened above)
echo 2. Add them to .env.local
echo 3. Run: npm run test-llm
echo 4. Deploy to Vercel
echo.
echo 📖 Full guide: ADD_MORE_LLM_MODELS.md
echo.
pause

