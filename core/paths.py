"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
import os
import sys
from pathlib import Path

class PathManager:
    """
    Handles decentralized path management for bundled and development environments.
    """
    
    @staticmethod
    def get_base_path():
        """Returns the base path for read-only assets (static, templates)."""
        if getattr(sys, 'frozen', False):
            # Running as a PyInstaller bundle
            return Path(sys._MEIPASS)
        # Running in development
        return Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    @staticmethod
    def get_user_data_path():
        """Returns the writable user data path (%APPDATA% on Windows)."""
        if sys.platform == "win32":
            base = Path(os.environ.get("APPDATA", os.path.expanduser("~")))
        elif sys.platform == "darwin":
            base = Path(os.path.expanduser("~/Library/Application Support"))
        else:
            base = Path(os.path.expanduser("~/.config"))
            
        path = base / "ArkanaBookWriter"
        path.mkdir(parents=True, exist_ok=True)
        return path

    @classmethod
    def get_asset_path(cls, subpath):
        """Returns the absolute path to a read-only asset."""
        return cls.get_base_path() / subpath

    @classmethod
    def get_writable_path(cls, subpath):
        """Returns the absolute path to a writable file/folder in user data."""
        path = cls.get_user_data_path() / subpath
        if not subpath.endswith(('.json', '.db', '.txt', '.pdf', '.epub')):
             path.mkdir(parents=True, exist_ok=True)
        return path

    @classmethod
    def get_static_dir(cls):
        return cls.get_asset_path("static")

    @classmethod
    def get_templates_dir(cls):
        return cls.get_asset_path("templates")

    @classmethod
    def get_output_dir(cls):
        return cls.get_writable_path("output")

    @classmethod
    def get_uploads_dir(cls):
        return cls.get_writable_path("uploads")

    @classmethod
    def get_state_file(cls):
        return cls.get_writable_path("state.json")
