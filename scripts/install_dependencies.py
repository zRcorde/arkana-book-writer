"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
import os
import sys
import subprocess
import venv

def run_command(cmd, cwd=None):
    print(f"Executando: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=cwd, shell=True)
    if result.returncode != 0:
        print(f"Erro ao executar: {' '.join(cmd)}")
        return False
    return True

def setup_venv():
    if not os.path.exists("venv"):
        print("Criando ambiente virtual (venv)...")
        venv.create("venv", with_pip=True)
    
    # Path para o pip do venv
    if sys.platform == "win32":
        pip_exe = os.path.join("venv", "Scripts", "pip.exe")
    else:
        pip_exe = os.path.join("venv", "bin", "pip")
    
    print("Instalando dependências Python...")
    run_command([pip_exe, "install", "-r", "requirements.txt"])

def setup_gtk():
    """Para Windows, o WeasyPrint precisa do GTK."""
    if sys.platform == "win32":
        print("--- CONFIGURAÇÃO GTK (Windows) ---")
        try:
            import scripts.setup_gtk as setup_gtk
            setup_gtk.install_gtk()
        except ImportError:
            print("Dica: Se o gerador de PDF falhar, instale o GTK3 Runtime.")
            print("Link: https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases")

if __name__ == "__main__":
    print("=== Arkana Ebook Artisan - Setup Automático ===")
    setup_venv()
    setup_gtk()
    print("=== Setup concluído com sucesso! ===")
