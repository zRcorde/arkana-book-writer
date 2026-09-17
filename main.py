"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
import os
import sys
import time
import webbrowser
import threading
import uvicorn
from web_app import app

from core.paths import PathManager

def start_server():
    """Starts the FastAPI server."""
    # We use 127.0.0.1 for maximum compatibility and security
    uvicorn.run(app, host="127.0.0.1", port=8501, log_level="info")

def main():
    # Detect base path and user data path
    base_path = PathManager.get_base_path()
    user_data_path = PathManager.get_user_data_path()

    # Change working directory to a writable folder to avoid permission issues
    # with temporary files or logs created by libraries
    os.chdir(user_data_path)

    # Hide console window if running as exe on Windows
    if sys.platform == "win32":
        import ctypes
        kernel32 = ctypes.windll.kernel32
        user32 = ctypes.windll.user32
        hWnd = kernel32.GetConsoleWindow()
        if hWnd:
            user32.ShowWindow(hWnd, 0)

    # Start the server in a separate thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # Wait for server to initialize
    time.sleep(2)

    # Open the browser
    webbrowser.open("http://127.0.0.1:8501")

    # Keep the main thread alive as long as the server thread is running
    while server_thread.is_alive():
        time.sleep(1)

if __name__ == "__main__":
    main()
