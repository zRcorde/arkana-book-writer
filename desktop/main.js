/* Arkana Book Writer — Electron desktop shell
   Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
   Partnerships / contact: contact@rewebfolio.xyz */
const { app, BrowserWindow, shell, dialog, Menu } = require('electron');
const path = require('path');
const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');

let mainWindow;
let pythonProcess;
const PORT = 8000;
const URL = `http://127.0.0.1:${PORT}`;

// Custom User Data Path to avoid cache permission issues
const userDataPath = path.join(app.getPath('appData'), 'ArkanaBookWriter');
app.setPath('userData', userDataPath);

// Disable GPU cache to prevent permission errors
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disable-gpu-program-cache');

// Session directory for projects
const sessionsDir = path.join(userDataPath, 'sessions');

function ensureDirectories() {
    if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath, { recursive: true });
    }
    if (!fs.existsSync(sessionsDir)) {
        fs.mkdirSync(sessionsDir, { recursive: true });
    }
}

function killExistingBackend() {
    try {
        // Windows-specific: kill any process using port 8000
        execSync(`for /f "tokens=5" %a in ('netstat -aon ^| findstr :${PORT} ^| findstr LISTENING') do taskkill /F /PID %a`, {
            shell: 'cmd.exe',
            stdio: 'ignore'
        });
    } catch (e) {
        // No process found - that's fine
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#020617',
        show: false,
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // Hide standard menu bar
    mainWindow.setMenuBarVisibility(false);
    Menu.setApplicationMenu(null);

    // Removing the app menu also removes its built-in Ctrl+R/F5 reload
    // accelerator, so re-wire it by hand.
    mainWindow.webContents.on('before-input-event', (event, input) => {
        const isReload = input.key === 'F5' ||
            ((input.control || input.meta) && input.key.toLowerCase() === 'r');
        if (isReload && input.type === 'keyDown') {
            mainWindow.webContents.reload();
        }
    });

    // Poll server status before loading
    let attempts = 0;
    const maxAttempts = 30; // 15 seconds max wait

    const pollServer = () => {
        attempts++;
        http.get(URL, (res) => {
            mainWindow.loadURL(URL);
            mainWindow.once('ready-to-show', () => {
                mainWindow.show();
            });
        }).on('error', () => {
            if (attempts < maxAttempts) {
                setTimeout(pollServer, 500);
            } else {
                dialog.showErrorBox(
                    'Erro ao iniciar',
                    'O servidor backend não respondeu. Por favor, reinicie o aplicativo.'
                );
                app.quit();
            }
        });
    };

    pollServer();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Open external links in real browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });
}

function startBackend() {
    // First kill any existing backend process
    killExistingBackend();

    // Use pythonw.exe to avoid any console window if possible
    const pythonBin = path.join(__dirname, '..', 'venv', 'Scripts', 'pythonw.exe');

    // Check if pythonw exists, fallback to python.exe
    const actualPython = fs.existsSync(pythonBin)
        ? pythonBin
        : path.join(__dirname, '..', 'venv', 'Scripts', 'python.exe');

    pythonProcess = spawn(actualPython, ['-m', 'uvicorn', 'web_app:app', '--host', '127.0.0.1', '--port', PORT.toString()], {
        cwd: path.join(__dirname, '..'),
        stdio: ['ignore', 'pipe', 'pipe']
    });

    pythonProcess.stdout.on('data', (data) => {
        const msg = data.toString().trim();
        if (msg) console.log(`[Backend] ${msg}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        const msg = data.toString().trim();
        // Filter out common non-error messages
        if (msg && !msg.includes('INFO:')) {
            console.error(`[Backend Error] ${msg}`);
        }
    });

    pythonProcess.on('error', (err) => {
        console.error('Failed to start backend:', err);
        dialog.showErrorBox(
            'Erro ao iniciar backend',
            'Não foi possível iniciar o servidor. Verifique se o Python está instalado corretamente.'
        );
    });
}

app.whenReady().then(() => {
    ensureDirectories();
    startBackend();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (pythonProcess) {
            pythonProcess.kill('SIGTERM');
        }
        app.quit();
    }
});

app.on('before-quit', () => {
    if (pythonProcess) {
        pythonProcess.kill('SIGTERM');
    }
});

app.on('will-quit', () => {
    if (pythonProcess) {
        try {
            pythonProcess.kill('SIGKILL');
        } catch (e) {
            // Process may already be dead
        }
    }
});
