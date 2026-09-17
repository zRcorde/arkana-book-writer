@echo off
chcp 65001 >nul 2>&1
title Arkana - Setup
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
echo                    DEPENDENCY INSTALLER
echo     _______________________________________________________________
echo.

echo     This wizard will install every component needed for
echo     Arkana Book Writer to run correctly.
echo.
echo     Press any key to continue...
pause >nul

echo.
echo     [1/4] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo     [X] Node.js not found!
    echo         Install it from: https://nodejs.org/
    pause
    exit /b 1
)
echo           OK!

echo     [2/4] Checking Python...
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo     [X] Python not found!
    echo         Install it from: https://python.org/
    pause
    exit /b 1
)
echo           OK!

echo     [3/4] Installing interface components...
call npm install --silent
if %errorlevel% neq 0 (
    echo     [X] Failed to install components!
    pause
    exit /b 1
)
echo           OK!

echo     [4/4] Installing the e-book generation engine...
if not exist "venv" (
    python -m venv venv
)
call venv\Scripts\pip install -r requirements.txt -q
if %errorlevel% neq 0 (
    echo     [X] Failed to install libraries!
    pause
    exit /b 1
)
echo           OK!

echo.
echo     _______________________________________________________________
echo.
echo     SETUP COMPLETE!
echo.
echo     You can now run "Start Arkana.bat"
echo     _______________________________________________________________
echo.
pause
