"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
# -*- coding: utf-8 -*-
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.generator import EbookGenerator
from core.models import EbookContent
from templates.themes import THEMES

def test_all_premium_themes():
    premium_themes = [
        "glass_dark", "minimal_serif_pro", "nordic_light_pro", 
        "cyber_future", "royal_navy", "arctic_ghost", 
        "rose_quartz", "emerald_city", "sunset_gradient", 
        "monochrome_industrial"
    ]
    
    ebook = EbookContent(
        title="O Guia do Escritor Digital",
        author="Arkana Professional"
    )
    ebook.add_chapter(
        title="A Arte da Escrita Moderna",
        content="""
        <p>A escrita é uma forma de arte que transcende o tempo, mas as ferramentas que usamos moldam o resultado final.</p>
        <p>Neste capítulo, exploramos como a estética visual de um livro afeta a percepção do leitor e a clareza da mensagem.</p>
        <blockquote>"Um livro bem desenhado é um sussurro que se torna um grito de autoridade."</blockquote>
        <h3>Destaques do Capítulo</h3>
        <ul>
            <li>Tipografia e legibilidade</li>
            <li>O uso do espaço em branco</li>
            <li>A psicologia das cores no design editorial</li>
        </ul>
        """
    )
    
    generator = EbookGenerator()
    os.makedirs("output/gallery", exist_ok=True)
    
    for theme_id in premium_themes:
        print(f"Gerando PDF para o tema: {theme_id}...")
        output_path = os.path.join("output/gallery", f"{theme_id}.pdf")
        try:
            generator.generate_pdf(ebook, theme_id, output_path, {"page_size": "A4"})
            print(f"  ✅ {theme_id} gerado com sucesso.")
        except Exception as e:
            print(f"  ❌ Erro no tema {theme_id}: {e}")

if __name__ == "__main__":
    test_all_premium_themes()
