"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
import os
import sys
import subprocess
import requests
import tempfile

# URL do instalador estável do GTK para Windows
GTK_INSTALLER_URL = "https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases/download/2022-01-04/gtk3-runtime-3.24.31-2022-01-04-ts-kb-x64.exe"

def is_gtk_installed():
    """Tenta detectar se o GTK está no PATH ou se o WeasyPrint consegue carregar."""
    try:
        from weasyprint import HTML
        return True
    except (ImportError, OSError):
        return False

def download_file(url, dest_path):
    print(f"Baixando instalador GTK de: {url}")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(dest_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    print("Download concluído.")

def install_gtk():
    if sys.platform != "win32":
        print("Instalação automática de GTK só é necessária no Windows.")
        return True

    if is_gtk_installed():
        print("✅ GTK já está instalado e funcional.")
        return True

    print("⚠️ GTK não detectado. Iniciando instalação automática...")
    
    with tempfile.TemporaryDirectory() as tmpdir:
        installer_path = os.path.join(tmpdir, "gtk_installer.exe")
        try:
            download_file(GTK_INSTALLER_URL, installer_path)
            
            print("Executando instalador... Por favor, siga as instruções na tela.")
            print("DICA: Aceite os termos e mantenha as opções padrão.")
            
            # Executa o instalador de forma síncrona
            # /S é o flag comum para silent install em NSIS, mas vamos rodar normal para garantir que o usuário veja
            subprocess.run([installer_path], check=True)
            
            print("✅ Instalação concluída. Verificando...")
            # Note: Pode ser necessário reiniciar o app para o PATH atualizar
            return True
        except Exception as e:
            print(f"❌ Erro durante a instalação do GTK: {e}")
            return False

if __name__ == "__main__":
    if install_gtk():
        print("Tudo pronto! Reinicie o aplicativo para garantir que o PDF funcione.")
    else:
        print("Falha na instalação. Tente baixar manualmente em: https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases")
