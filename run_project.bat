@echo off
title Atelier Luxe E-Commerce Platform
echo =======================================================
echo   ✦ ATELIER LUXE - STARTING LOCAL PLATFORM
echo =======================================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%

if not exist node_modules (
  echo [Info] Installing dependencies (Express, SQLite3, Multer, CORS)...
  call "C:\Program Files\nodejs\npm.cmd" install --no-audit --no-fund
  echo.
)

echo [Info] Launching Atelier Luxe Node.js server...
echo.
echo =======================================================
echo   ✦ Opening in your default browser: http://localhost:3000
echo =======================================================
start http://localhost:3000

"C:\Program Files\nodejs\node.exe" server.js
pause
