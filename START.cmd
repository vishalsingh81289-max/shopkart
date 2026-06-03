@echo off
echo ============================================
echo  ShopKart Frontend Setup
echo ============================================
echo.

echo [1/3] Fixing npm version (downgrading npm 11 to npm 8)...
call npm install -g npm@8.19.4
if %errorlevel% neq 0 (
    echo ERROR: Could not downgrade npm. Try running this as Administrator.
    pause
    exit /b 1
)
echo npm downgraded successfully.
echo.

echo [2/3] Installing dependencies...
cd /d "%~dp0frontend"
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed.
    pause
    exit /b 1
)
echo Dependencies installed successfully.
echo.

echo [3/3] Starting frontend dev server...
echo Open http://localhost:3000 in your browser
echo (Make sure Spring Boot backend is running on port 8080)
echo.
call npm run dev
