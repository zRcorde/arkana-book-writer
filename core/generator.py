"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
import os
from jinja2 import Environment, FileSystemLoader
from ebooklib import epub
from .models import EbookContent
from templates.themes import THEMES
from .paths import PathManager

import importlib.util
WEASYPRINT_AVAILABLE = importlib.util.find_spec("weasyprint") is not None

if WEASYPRINT_AVAILABLE:
    pass

# Book-content strings (table of contents, byline, chapter label) that get
# baked into the exported PDF/EPUB itself, not just the editor UI.
EXPORT_I18N = {
    "pt": {
        "toc": "Sumário", "by": "Por", "chapter": "Capítulo", "cover_alt": "Capa",
        "page_label": "Página ", "unknown_author": "Autor Desconhecido",
        "intro": "Introdução", "main_content": "Conteúdo Principal",
        "extracted_content": "Conteúdo Extraído",
    },
    "en": {
        "toc": "Table of Contents", "by": "By", "chapter": "Chapter", "cover_alt": "Cover",
        "page_label": "Page ", "unknown_author": "Unknown Author",
        "intro": "Introduction", "main_content": "Main Content",
        "extracted_content": "Extracted Content",
    },
    "es": {
        "toc": "Índice", "by": "Por", "chapter": "Capítulo", "cover_alt": "Portada",
        "page_label": "Página ", "unknown_author": "Autor Desconocido",
        "intro": "Introducción", "main_content": "Contenido Principal",
        "extracted_content": "Contenido Extraído",
    },
}


def resolve_export_lang(lang: str) -> str:
    lang = (lang or "pt").split("-")[0].lower()
    return lang if lang in EXPORT_I18N else "pt"


class EbookGenerator:
    def __init__(self, templates_dir: str = None):
        if templates_dir is None:
            templates_dir = str(PathManager.get_templates_dir())
        # autoescape=True so a stray <, >, & in a title/author (typed by the
        # user or extracted from a document) can't break the exported page.
        # Fields meant to carry real HTML (chapter content, dynamic CSS) are
        # marked "| safe" in base.html.
        self.env = Environment(loader=FileSystemLoader(templates_dir), autoescape=True)
        # Register custom filters
        self.env.filters['zfill'] = lambda s, n: str(s).zfill(n)
        self.template = self.env.get_template('base.html')

    @staticmethod
    def is_pdf_ready():
        return WEASYPRINT_AVAILABLE

    def render_html(self, content: EbookContent, theme_id: str, custom_settings: dict = None):
        theme = THEMES.get(theme_id, THEMES["penguin_classic"])
        settings = {**theme, **(custom_settings or {})}
        lang = resolve_export_lang((custom_settings or {}).get("lang"))
        i18n = EXPORT_I18N[lang]

        # Add a more comprehensive font list
        font_import = "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;700&family=Outfit:wght@300;400;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Roboto+Mono&family=Orbitron:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;700;800&display=swap');"
        
        dynamic_css_content = f"""
        {font_import}

        :root {{
            --primary-color: {settings.get('primary_color', '#2563eb')};
            --secondary-color: {settings.get('secondary_color', '#9ca3af')};
            --bg-color: {settings.get('bg_color', '#ffffff')};
            --text-color: {settings.get('text_color', '#333333')};
            --font-family: {settings.get('font_family', "'Inter', sans-serif")};
            --header-font: {settings.get('header_font', "'Inter', sans-serif")};
            --border-accent: {settings.get('border_accent', '1px solid #eee')};
            --text-transform: {settings.get('text_transform', 'none')};
            --glow: {settings.get('glow', 'none')};
            --title-gradient: {settings.get('title_gradient', 'none')};
            --page-background: {settings.get('page_background', settings.get('bg_color', '#ffffff'))};
            --shadow_style: {settings.get('shadow_style', 'none')};
        }}
        @page {{
            size: {settings.get('page_size', 'A4')};
            margin: {settings.get('margin_top', '25mm')} {settings.get('margin_right', '20mm')} {settings.get('margin_bottom', '25mm')} {settings.get('margin_left', '20mm')};
            background: {settings.get('page_background', settings.get('bg_color', '#ffffff'))};
            @bottom-right {{
                content: "{i18n['page_label']}" counter(page);
                font-family: {settings.get('font_family', "'Inter', sans-serif")};
                font-size: 10pt;
                color: {settings.get('secondary_color', '#9ca3af')};
            }}
        }}
        {settings.get('custom_css', '')}
        """
        dynamic_css = f"<style>{dynamic_css_content}</style>"

        render_data = {
            **settings,
            "dynamic_css": dynamic_css,
            "title": content.title,
            "author": content.author,
            "chapters": content.chapters,
            "cover_image": os.path.abspath(custom_settings.get("cover_image")) if custom_settings and custom_settings.get("cover_image") else None,
            "lang": lang,
            "i18n_toc": i18n["toc"],
            "i18n_by": i18n["by"],
            "i18n_chapter": i18n["chapter"],
            "i18n_cover_alt": i18n["cover_alt"],
        }
        
        return self.template.render(render_data)

    def generate_pdf(self, content: EbookContent, theme_id: str, output_path: str, custom_settings: dict = None):
        html_content = self.render_html(content, theme_id, custom_settings)
        
        # Determine base directory for images (use bundled assets path)
        base_dir = str(PathManager.get_base_path())
        
        from weasyprint import HTML
        HTML(string=html_content, base_url=base_dir).write_pdf(output_path)
        return output_path

    def generate_epub(self, content: EbookContent, theme_id: str, output_path: str, custom_settings: dict = None):
        theme = THEMES.get(theme_id, THEMES["penguin_classic"])
        settings = {**theme, **(custom_settings or {})}
        
        lang = resolve_export_lang((custom_settings or {}).get("lang"))

        book = epub.EpubBook()
        book.set_identifier(f"id_{content.title.lower().replace(' ', '_')}")
        book.set_title(content.title)
        book.set_language(lang)
        book.add_author(content.author)

        # Style for EPUB
        primary_color = settings.get('primary_color', '#2563eb')
        secondary_color = settings.get('secondary_color', '#9ca3af')
        font_family = settings.get('font_family', 'sans-serif')
        text_transform = settings.get('text_transform', 'none')
        border_accent = settings.get('border_accent', f'2px solid {primary_color}')
        custom_css = settings.get('custom_css', '')
        
        style = f'''
            body {{ font-family: {font_family}; padding: 0.5em; }}
            h1 {{ color: {primary_color}; text-align: center; border-bottom: {border_accent}; padding-bottom: 10px; text-transform: {text_transform}; }}
            h2 {{ color: {primary_color}; border-left: {border_accent}; padding-left: 10px; margin-top: 1.5em; text-transform: {text_transform}; }}
            h3 {{ color: {secondary_color}; }}
            .chapter-content {{ margin-top: 1em; text-align: justify; }}
            {custom_css}
        '''
        nav_css = epub.EpubItem(uid="style_nav", file_name="style/nav.css", media_type="text/css", content=style)
        book.add_item(nav_css)

        chapters = []
        for i, ch in enumerate(content.chapters):
            epub_ch = epub.EpubHtml(title=ch.title, file_name=f'chap_{i+1}.xhtml', lang=lang)
            epub_ch.content = f'<h1 id="{ch.id}">{ch.title}</h1>\n<div class="chapter-content">{ch.content}</div>'
            epub_ch.add_item(nav_css) # Link CSS to chapter
            book.add_item(epub_ch)
            chapters.append(epub_ch)

        book.toc = tuple(chapters)
        book.add_item(epub.EpubNcx())
        book.add_item(epub.EpubNav())

        # Basic spine
        book.spine = ['nav'] + chapters

        epub.write_epub(output_path, book, {})
        return output_path
