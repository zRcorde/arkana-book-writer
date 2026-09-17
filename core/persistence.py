"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
import json
import os
from .paths import PathManager

class PersistenceManager:
    STATE_FILE = PathManager.get_state_file()

    @staticmethod
    def save(ebook, settings):
        """Salva o estado atual do ebook e das configurações em um arquivo JSON."""
        state = {
            "settings": settings,
            "ebook": None
        }
        if ebook:
            state["ebook"] = {
                "title": ebook.title,
                "author": ebook.author,
                "chapters": [
                    {
                        "title": c.title,
                        "content": c.content,
                        "id": c.id,
                        "level": c.level,
                        "images": c.images
                    } for c in ebook.chapters
                ],
                "metadata": ebook.metadata
            }
        
        try:
            with open(PersistenceManager.STATE_FILE, "w", encoding="utf-8") as f:
                json.dump(state, f, indent=4, ensure_ascii=False)
        except Exception as e:
            print(f"Erro ao salvar estado: {e}")

    @staticmethod
    def load():
        """Carrega o estado do ebook e configurações a partir do arquivo JSON."""
        if not os.path.exists(PersistenceManager.STATE_FILE):
            return None, {}
        
        try:
            with open(PersistenceManager.STATE_FILE, "r", encoding="utf-8") as f:
                state = json.load(f)
            
            settings = state.get("settings", {})
            ebook_data = state.get("ebook")
            
            ebook = None
            if ebook_data:
                ebook = EbookContent(
                    title=ebook_data["title"],
                    author=ebook_data["author"],
                    metadata=ebook_data.get("metadata", {})
                )
                for c_data in ebook_data.get("chapters", []):
                    chapter = Chapter(
                        title=c_data["title"],
                        content=c_data["content"],
                        id=c_data["id"],
                        level=c_data.get("level", 1),
                        images=c_data.get("images", [])
                    )
                    ebook.chapters.append(chapter)
            
            return ebook, settings
        except Exception as e:
            print(f"Erro ao carregar estado: {e}")
            return None, {}

    @staticmethod
    def clear():
        """Remove o arquivo de estado, limpando todos os dados salvos."""
        try:
            if os.path.exists(PersistenceManager.STATE_FILE):
                os.remove(PersistenceManager.STATE_FILE)
            return True
        except Exception as e:
            print(f"Erro ao limpar estado: {e}")
            return False

