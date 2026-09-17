@echo off
chcp 65001 >nul 2>&1
title Arkana Book Writer
color 0F
cd /d "%~dp0.."

cls
echo.
echo     ___         _                         ____              _
echo    /   \  _ __ ^| ^| __ __ _  _ __   __ _  ^| __ )  ___   ___ ^| ^| __
echo   / /\ / ^| '__^|^| ^|/ // _` ^|^| '_ \ / _` ^| ^|  _ \ / _ \ / _ \^| ^|/ /
echo  / /_//  ^| ^|   ^|   ^<^| (_^| ^|^| ^| ^| ^| (_^| ^| ^| ^|_) ^| (_) ^| (_) ^|   ^<
echo /___,'   ^|_^|   ^|_^|\_\\__,_^|^|_^| ^|_^|\__,_^| ^|____/ \___/ \___/^|_^|\_\
echo.
echo                    PROFESSIONAL E-BOOK CREATOR
echo     _______________________________________________________________
echo.

REM Check if Node.js is available
echo     [*] Checking system requirements...
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo     [X] ERROR: Node.js not found!
    echo.
    echo     Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo     [OK] Node.js installed

where python >nul 2>&1
if %errorlevel% neq 0 (
    echo     [X] ERROR: Python not found!
    echo.
    echo     Please install Python from: https://python.org/
    echo.
    pause
    exit /b 1
)
echo     [OK] Python installed
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo     _______________________________________________________________
    echo.
    echo     [*] First run detected
    echo     [*] Installing system components...
    echo         This may take a few minutes the first time.
    echo.
    call npm install --silent
    if %errorlevel% neq 0 (
        echo     [X] ERROR: Failed to install components!
        pause
        exit /b 1
    )
    echo     [OK] Components installed successfully!
    echo.
)

REM Check if venv exists
if not exist "venv" (
    echo     [*] Setting up the e-book generation engine...
    python -m venv venv
    echo     [*] Installing formatting libraries...
    call venv\Scripts\pip install -r requirements.txt -q
    if %errorlevel% neq 0 (
        echo     [X] ERROR: Failed to install libraries!
        pause
        exit /b 1
    )
    echo     [OK] Generation engine configured!
    echo.
)

echo     _______________________________________________________________
echo.
echo     [*] Starting Arkana Book Writer...
echo     [*] The application will open in a new window.
echo     _______________________________________________________________
echo.

REM Start the app
call npm start

echo.
echo     Arkana Book Writer has closed.
echo     Thanks for using our software!
echo.
pause
