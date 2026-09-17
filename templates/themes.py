"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
# -*- coding: utf-8 -*-
"""
ARKANA PROFESSIONAL EBOOK THEMES v2.0
=====================================
25+ publishing-quality themes for professional ebook output.
Designed following professional book publishing standards.

Categories:
- Classic Publishing (Traditional book aesthetics)
- Modern Clean (Contemporary minimalist)
- Business/Corporate (Professional documents)
- Creative/Artistic (Bold and expressive)
- Specialty (Niche use cases)
"""

THEMES = {
    # ============================================
    # PREMIUM CATEGORY - High-End Digital Aesthetics
    # ============================================
    
    "glass_dark": {
        "name": "Glass Dark (Premium)",
        "description": "Estética futurista ultra-premium com efeito de vidro e tons neon.",
        "primary_color": "#00f2ff",
        "secondary_color": "#7000ff",
        "font_family": "'Inter', 'Outfit', sans-serif",
        "header_font": "'Orbitron', sans-serif",
        "bg_color": "#020617",
        "text_color": "#f1f5f9",
        "title_gradient": "linear-gradient(135deg, #00f2ff 0%, #7000ff 100%)",
        "page_background": "#020617",
        "card_style": "glass",
        "shadow_style": "0 8px 32px 0 rgba(0, 242, 255, 0.1)",
        "border_accent": "1px solid rgba(255, 255, 255, 0.1)",
        "text_transform": "uppercase",
        "glow": "0 0 15px rgba(0, 242, 255, 0.4)"
    },

    "minimal_serif_pro": {
        "name": "Minimal Serif Pro",
        "description": "Design editorial de luxo. Máxima sofisticação e legibilidade.",
        "primary_color": "#1a1a1a",
        "secondary_color": "#c5a028",
        "font_family": "'Libre Baskerville', serif",
        "header_font": "'Playfair Display', serif",
        "bg_color": "#ffffff",
        "text_color": "#111827",
        "title_gradient": "none",
        "page_background": "#ffffff",
        "card_style": "clean",
        "shadow_style": "none",
        "border_accent": "2px solid #1a1a1a",
        "text_transform": "none",
        "glow": "none"
    },

    "nordic_light_pro": {
        "name": "Nordic Light Pro",
        "description": "Estilo escandinavo moderno. Tons pastéis, clareza e frescor.",
        "primary_color": "#0f172a",
        "secondary_color": "#64748b",
        "font_family": "'Outfit', sans-serif",
        "header_font": "'Outfit', sans-serif",
        "bg_color": "#f8fafc",
        "text_color": "#334155",
        "title_gradient": "linear-gradient(90deg, #0f172a 0%, #334155 100%)",
        "page_background": "#f8fafc",
        "card_style": "soft",
        "shadow_style": "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
        "border_accent": "1px solid #e2e8f0",
        "text_transform": "none",
        "glow": "none"
    },

    "cyber_future": {
        "name": "Cyber Future",
        "description": "Inspirado em interfaces de alta tecnologia. Ousado e impactante.",
        "primary_color": "#f87171",
        "secondary_color": "#fb923c",
        "font_family": "'Roboto Mono', monospace",
        "header_font": "'Orbitron', sans-serif",
        "bg_color": "#09090b",
        "text_color": "#fafafa",
        "title_gradient": "linear-gradient(90deg, #f87171 0%, #fb923c 100%)",
        "page_background": "#09090b",
        "card_style": "tech",
        "shadow_style": "0 0 20px rgba(248, 113, 113, 0.2)",
        "border_accent": "1px solid #f87171",
        "text_transform": "uppercase",
        "glow": "0 0 10px rgba(248, 113, 113, 0.3)"
    },

    "royal_navy": {
        "name": "Royal Navy & Gold",
        "description": "Elegância clássica imperial. Azul profundo com detalhes em ouro.",
        "primary_color": "#c5a028",
        "secondary_color": "#b8a888",
        "font_family": "'Cinzel', serif",
        "header_font": "'Cinzel', serif",
        "bg_color": "#0f172a",
        "text_color": "#f8fafc",
        "title_gradient": "linear-gradient(135deg, #c5a028 0%, #eab308 100%)",
        "page_background": "#0f172a",
        "card_style": "royal",
        "shadow_style": "0 4px 20px rgba(0, 0, 0, 0.5)",
        "border_accent": "2px solid #c5a028",
        "text_transform": "none",
        "glow": "0 0 8px rgba(197, 160, 40, 0.3)"
    },

    "arctic_ghost": {
        "name": "Arctic Ghost",
        "description": "Ultra-minimalista. Tons de cinza e azul gelo. Sutil e etéreo.",
        "primary_color": "#334155",
        "secondary_color": "#94a3b8",
        "font_family": "'Inter', sans-serif",
        "header_font": "'Inter', sans-serif",
        "bg_color": "#ffffff",
        "text_color": "#1e293b",
        "title_gradient": "none",
        "page_background": "#f1f5f9",
        "card_style": "clean",
        "shadow_style": "none",
        "border_accent": "1px solid #e2e8f0",
        "text_transform": "none",
        "glow": "none"
    },

    "rose_quartz": {
        "name": "Rose Quartz",
        "description": "Suave, moderno e inspirador. Perfeito para lifestyle e moda.",
        "primary_color": "#db2777",
        "secondary_color": "#f472b6",
        "font_family": "'Outfit', sans-serif",
        "header_font": "'Playfair Display', serif",
        "bg_color": "#fff1f2",
        "text_color": "#4c0519",
        "title_gradient": "linear-gradient(90deg, #db2777 0%, #f472b6 100%)",
        "page_background": "#fff1f2",
        "card_style": "floating",
        "shadow_style": "0 20px 25px -5px rgba(219, 39, 119, 0.1)",
        "border_accent": "none",
        "text_transform": "none",
        "glow": "none"
    },

    "emerald_city": {
        "name": "Emerald City",
        "description": "Verde esmeralda sofisticado. Luxo e vitalidade.",
        "primary_color": "#059669",
        "secondary_color": "#34d399",
        "font_family": "'Inter', sans-serif",
        "header_font": "'Cinzel', serif",
        "bg_color": "#064e3b",
        "text_color": "#ecfdf5",
        "title_gradient": "linear-gradient(90deg, #34d399 0%, #059669 100%)",
        "page_background": "#064e3b",
        "card_style": "bordered",
        "shadow_style": "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        "border_accent": "1px solid #059669",
        "text_transform": "uppercase",
        "glow": "0 0 12px rgba(52, 211, 153, 0.4)"
    },

    "sunset_gradient": {
        "name": "Sunset Gradient",
        "description": "Explosão de cores vibrantes. Para criativos e visionários.",
        "primary_color": "#f97316",
        "secondary_color": "#ec4899",
        "font_family": "'Outfit', sans-serif",
        "header_font": "'Outfit', sans-serif",
        "bg_color": "#431407",
        "text_color": "#fff7ed",
        "title_gradient": "linear-gradient(90deg, #f97316 0%, #ec4899 100%)",
        "page_background": "#431407",
        "card_style": "glass",
        "shadow_style": "0 0 40px rgba(0,0,0,0.4)",
        "border_accent": "1px solid rgba(255,255,255,0.05)",
        "text_transform": "none",
        "glow": "0 0 20px rgba(249, 115, 22, 0.3)"
    },

    "monochrome_industrial": {
        "name": "Monochrome Industrial",
        "description": "Brutalista e direto. Alto contraste para impacto máximo.",
        "primary_color": "#000000",
        "secondary_color": "#4d4d4d",
        "font_family": "'Roboto Mono', monospace",
        "header_font": "'Inter', sans-serif",
        "bg_color": "#ffffff",
        "text_color": "#000000",
        "title_gradient": "none",
        "page_background": "#ffffff",
        "card_style": "brutalist",
        "shadow_style": "10px 10px 0 #000000",
        "border_accent": "4px solid #000000",
        "text_transform": "uppercase",
        "glow": "none"
    },

    # ============================================
    # CLASSIC PUBLISHING - Traditional Book Aesthetics
    # ============================================
    
    "penguin_classic": {
        "name": "Penguin Classic",
        "description": "Inspirado nos clássicos da Penguin Books. Atemporal e elegante.",
        "primary_color": "#000000",
        "secondary_color": "#ed7014",
        "font_family": "'Libre Baskerville', serif",
        "header_font": "'Playfair Display', serif",
        "bg_color": "#fffbf2",
        "text_color": "#1a1a1a",
        "title_gradient": "none",
        "page_background": "#fffbf2",
        "card_style": "clean",
        "shadow_style": "none",
        "border_accent": "1px solid #000000",
        "text_transform": "none",
        "glow": "none"
    },
    
    "oxford_academic": {
        "name": "Oxford Academic",
        "description": "Estilo acadêmico tradicional. Perfeito para não-ficção e estudos.",
        "primary_color": "#002147",
        "secondary_color": "#1a3f6f",
        "font_family": "'Georgia', 'Palatino Linotype', serif",
        "header_font": "'Georgia', serif",
        "bg_color": "#fefefe",
        "text_color": "#2c2c2c",
        "title_gradient": "none",
        "page_background": "#fefefe",
        "chapter_accent": "underline",
        "border_accent": "2px solid #002147",
        "text_transform": "none",
        "glow": "none"
    },
    
    "victorian_elegance": {
        "name": "Victorian Elegance",
        "description": "Ornamentado e sofisticado. Para romances e ficção histórica.",
        "primary_color": "#4a3728",
        "secondary_color": "#6b4423",
        "font_family": "'Palatino Linotype', 'Book Antiqua', serif",
        "header_font": "'Palatino Linotype', serif",
        "bg_color": "#f9f5ef",
        "text_color": "#3d2914",
        "title_gradient": "none",
        "page_background": "#f9f5ef",
        "chapter_accent": "double",
        "border_accent": "3px double #4a3728",
        "text_transform": "none",
        "glow": "none"
    },
    
    "sepia_vintage": {
        "name": "Sépia Vintage",
        "description": "Tom envelhecido acolhedor. Nostálgico e confortável para leitura.",
        "primary_color": "#5d4037",
        "secondary_color": "#795548",
        "font_family": "'Cambria', 'Georgia', serif",
        "header_font": "'Cambria', serif",
        "bg_color": "#faf0dc",
        "text_color": "#3e2723",
        "title_gradient": "none",
        "page_background": "#faf0dc",
        "chapter_accent": "classic",
        "border_accent": "2px solid #5d4037",
        "text_transform": "none",
        "glow": "none"
    },
    
    "literary_cream": {
        "name": "Literary Cream",
        "description": "Papel levemente creme. Reduz fadiga ocular, ideal para leitura longa.",
        "primary_color": "#2c3e50",
        "secondary_color": "#34495e",
        "font_family": "'Georgia', serif",
        "header_font": "'Georgia', serif",
        "bg_color": "#fdfcf7",
        "text_color": "#2c3e50",
        "title_gradient": "none",
        "page_background": "#fdfcf7",
        "chapter_accent": "none",
        "border_accent": "1px solid #bdc3c7",
        "text_transform": "none",
        "glow": "none"
    },

    # ============================================
    # MODERN CLEAN - Contemporary Minimalist
    # ============================================
    
    "swiss_minimal": {
        "name": "Swiss Minimal",
        "description": "Design suíço minimalista. Clareza absoluta e espaço branco generoso.",
        "primary_color": "#1a1a1a",
        "secondary_color": "#4a4a4a",
        "font_family": "'Helvetica Neue', 'Arial', sans-serif",
        "header_font": "'Helvetica Neue', sans-serif",
        "bg_color": "#ffffff",
        "text_color": "#333333",
        "title_gradient": "none",
        "page_background": "#ffffff",
        "chapter_accent": "none",
        "border_accent": "none",
        "text_transform": "none",
        "glow": "none"
    },
    
    "nordic_clean": {
        "name": "Nordic Clean",
        "description": "Estética escandinava. Limpo, funcional e acolhedor.",
        "primary_color": "#2d3436",
        "secondary_color": "#636e72",
        "font_family": "'Segoe UI', 'Roboto', sans-serif",
        "header_font": "'Segoe UI', sans-serif",
        "bg_color": "#f8f9fa",
        "text_color": "#2d3436",
        "title_gradient": "none",
        "page_background": "#f8f9fa",
        "chapter_accent": "left",
        "border_accent": "4px solid #2d3436",
        "text_transform": "none",
        "glow": "none"
    },
    
    "paper_white": {
        "name": "Paper White",
        "description": "Branco puro como papel de impressão. Máxima legibilidade.",
        "primary_color": "#212121",
        "secondary_color": "#424242",
        "font_family": "'Georgia', serif",
        "header_font": "'Georgia', serif",
        "bg_color": "#ffffff",
        "text_color": "#212121",
        "title_gradient": "none",
        "page_background": "#ffffff",
        "chapter_accent": "classic",
        "border_accent": "1px solid #e0e0e0",
        "text_transform": "none",
        "glow": "none"
    },
    
    "zen_garden": {
        "name": "Zen Garden",
        "description": "Tranquilidade japonesa. Espaço, equilíbrio e harmonia.",
        "primary_color": "#37474f",
        "secondary_color": "#546e7a",
        "font_family": "'Trebuchet MS', sans-serif",
        "header_font": "'Trebuchet MS', sans-serif",
        "bg_color": "#fafafa",
        "text_color": "#37474f",
        "title_gradient": "none",
        "page_background": "#fafafa",
        "chapter_accent": "none",
        "border_accent": "1px solid #cfd8dc",
        "text_transform": "none",
        "glow": "none"
    },
    
    "stone_gray": {
        "name": "Stone Gray",
        "description": "Cinza suave e neutro. Profissional sem ser frio.",
        "primary_color": "#455a64",
        "secondary_color": "#607d8b",
        "font_family": "'Calibri', 'Arial', sans-serif",
        "header_font": "'Calibri', sans-serif",
        "bg_color": "#fafafa",
        "text_color": "#263238",
        "title_gradient": "none",
        "page_background": "#fafafa",
        "chapter_accent": "left",
        "border_accent": "3px solid #455a64",
        "text_transform": "none",
        "glow": "none"
    },

    # ============================================
    # BUSINESS & CORPORATE
    # ============================================
    
    "corporate_blue": {
        "name": "Corporate Blue",
        "description": "Azul corporativo confiável. Relatórios, manuais e documentos empresariais.",
        "primary_color": "#1565c0",
        "secondary_color": "#1976d2",
        "font_family": "'Calibri', 'Arial', sans-serif",
        "header_font": "'Calibri', sans-serif",
        "bg_color": "#ffffff",
        "text_color": "#212121",
        "title_gradient": "none",
        "page_background": "#ffffff",
        "chapter_accent": "left",
        "border_accent": "4px solid #1565c0",
        "text_transform": "none",
        "glow": "none"
    },
    
    "executive_navy": {
        "name": "Executive Navy",
        "description": "Azul marinho executivo. Autoridade e profissionalismo.",
        "primary_color": "#0d47a1",
        "secondary_color": "#1565c0",
        "font_family": "'Times New Roman', serif",
        "header_font": "'Times New Roman', serif",
        "bg_color": "#fafafa",
        "text_color": "#1a237e",
        "title_gradient": "none",
        "page_background": "#fafafa",
        "chapter_accent": "underline",
        "border_accent": "2px solid #0d47a1",
        "text_transform": "uppercase",
        "glow": "none"
    },
    
    "consulting_gray": {
        "name": "Consulting Gray",
        "description": "Cinza consultoria. Sóbrio e confiável como grandes consultorias.",
        "primary_color": "#424242",
        "secondary_color": "#616161",
        "font_family": "'Arial', sans-serif",
        "header_font": "'Arial', sans-serif",
        "bg_color": "#ffffff",
        "text_color": "#212121",
        "title_gradient": "none",
        "page_background": "#ffffff",
        "chapter_accent": "left",
        "border_accent": "3px solid #424242",
        "text_transform": "none",
        "glow": "none"
    },
    
    "law_firm": {
        "name": "Law Firm",
        "description": "Estilo jurídico tradicional. Formalidade e precisão.",
        "primary_color": "#1b2631",
        "secondary_color": "#2c3e50",
        "font_family": "'Times New Roman', serif",
        "header_font": "'Times New Roman', serif",
        "bg_color": "#ffffff",
        "text_color": "#1b2631",
        "title_gradient": "none",
        "page_background": "#ffffff",
        "chapter_accent": "none",
        "border_accent": "1px solid #1b2631",
        "text_transform": "none",
        "glow": "none"
    },

    # ============================================
    # PREMIUM & LUXURY
    # ============================================
    
    "black_gold": {
        "name": "Black & Gold",
        "description": "Preto e dourado premium. Edições especiais e luxo máximo.",
        "primary_color": "#d4af37",
        "secondary_color": "#c5a028",
        "font_family": "'Garamond', 'Georgia', serif",
        "header_font": "'Garamond', serif",
        "bg_color": "#0a0a0a",
        "text_color": "#f5f5dc",
        "title_gradient": "none",
        "page_background": "#0a0a0a",
        "chapter_accent": "double",
        "border_accent": "3px double #d4af37",
        "text_transform": "uppercase",
        "glow": "none"
    },
    
    "midnight_silver": {
        "name": "Midnight Silver",
        "description": "Prata sobre noite. Moderno e sofisticado.",
        "primary_color": "#c0c0c0",
        "secondary_color": "#a0a0a0",
        "font_family": "'Trebuchet MS', sans-serif",
        "header_font": "'Trebuchet MS', sans-serif",
        "bg_color": "#1a1a2e",
        "text_color": "#e8e8e8",
        "title_gradient": "none",
        "page_background": "#1a1a2e",
        "chapter_accent": "underline",
        "border_accent": "2px solid #c0c0c0",
        "text_transform": "none",
        "glow": "none"
    },
    
    "burgundy_classic": {
        "name": "Burgundy Classic",
        "description": "Vinho bordô clássico. Elegância literária atemporal.",
        "primary_color": "#722f37",
        "secondary_color": "#8b0000",
        "font_family": "'Palatino Linotype', serif",
        "header_font": "'Palatino Linotype', serif",
        "bg_color": "#fdf5f5",
        "text_color": "#4a1c1c",
        "title_gradient": "none",
        "page_background": "#fdf5f5",
        "chapter_accent": "classic",
        "border_accent": "2px solid #722f37",
        "text_transform": "none",
        "glow": "none"
    },

    # ============================================
    # NATURE & WELLNESS
    # ============================================
    
    "forest_green": {
        "name": "Forest Green",
        "description": "Verde floresta natural. Saúde, bem-estar e natureza.",
        "primary_color": "#2e7d32",
        "secondary_color": "#388e3c",
        "font_family": "'Georgia', serif",
        "header_font": "'Georgia', serif",
        "bg_color": "#f1f8e9",
        "text_color": "#1b5e20",
        "title_gradient": "none",
        "page_background": "#f1f8e9",
        "chapter_accent": "left",
        "border_accent": "3px solid #2e7d32",
        "text_transform": "none",
        "glow": "none"
    },
    
    "ocean_blue": {
        "name": "Ocean Blue",
        "description": "Azul oceano calmante. Meditação e autoajuda.",
        "primary_color": "#0277bd",
        "secondary_color": "#0288d1",
        "font_family": "'Verdana', sans-serif",
        "header_font": "'Verdana', sans-serif",
        "bg_color": "#e1f5fe",
        "text_color": "#01579b",
        "title_gradient": "none",
        "page_background": "#e1f5fe",
        "chapter_accent": "left",
        "border_accent": "3px solid #0277bd",
        "text_transform": "none",
        "glow": "none"
    },
    
    "earth_tone": {
        "name": "Earth Tone",
        "description": "Tons terrosos acolhedores. Culinária, viagens e lifestyle.",
        "primary_color": "#6d4c41",
        "secondary_color": "#8d6e63",
        "font_family": "'Cambria', serif",
        "header_font": "'Cambria', serif",
        "bg_color": "#efebe9",
        "text_color": "#4e342e",
        "title_gradient": "none",
        "page_background": "#efebe9",
        "chapter_accent": "double",
        "border_accent": "3px double #6d4c41",
        "text_transform": "none",
        "glow": "none"
    },
    
    "sage_wellness": {
        "name": "Sage Wellness",
        "description": "Verde sálvia suave. Yoga, mindfulness e bem-estar.",
        "primary_color": "#558b2f",
        "secondary_color": "#689f38",
        "font_family": "'Tahoma', sans-serif",
        "header_font": "'Tahoma', sans-serif",
        "bg_color": "#f9fbe7",
        "text_color": "#33691e",
        "title_gradient": "none",
        "page_background": "#f9fbe7",
        "chapter_accent": "none",
        "border_accent": "2px solid #558b2f",
        "text_transform": "none",
        "glow": "none"
    },

    # ============================================
    # CREATIVE & ARTISTIC
    # ============================================
    
    "lavender_dream": {
        "name": "Lavender Dream",
        "description": "Lavanda suave e sonhadora. Poesia, romance e espiritualidade.",
        "primary_color": "#7b1fa2",
        "secondary_color": "#9c27b0",
        "font_family": "'Georgia', serif",
        "header_font": "'Georgia', serif",
        "bg_color": "#f3e5f5",
        "text_color": "#4a148c",
        "title_gradient": "none",
        "page_background": "#f3e5f5",
        "chapter_accent": "left",
        "border_accent": "3px solid #7b1fa2",
        "text_transform": "none",
        "glow": "none"
    },
    
    "coral_sunset": {
        "name": "Coral Sunset",
        "description": "Coral quente e vibrante. Criativo e inspirador.",
        "primary_color": "#e64a19",
        "secondary_color": "#ff5722",
        "font_family": "'Verdana', sans-serif",
        "header_font": "'Verdana', sans-serif",
        "bg_color": "#fbe9e7",
        "text_color": "#bf360c",
        "title_gradient": "none",
        "page_background": "#fbe9e7",
        "chapter_accent": "left",
        "border_accent": "3px solid #e64a19",
        "text_transform": "none",
        "glow": "none"
    },
    
    "teal_modern": {
        "name": "Teal Modern",
        "description": "Teal contemporâneo. Moderno e profissional com personalidade.",
        "primary_color": "#00796b",
        "secondary_color": "#00897b",
        "font_family": "'Segoe UI', sans-serif",
        "header_font": "'Segoe UI', sans-serif",
        "bg_color": "#e0f2f1",
        "text_color": "#004d40",
        "title_gradient": "none",
        "page_background": "#e0f2f1",
        "chapter_accent": "underline",
        "border_accent": "2px solid #00796b",
        "text_transform": "none",
        "glow": "none"
    },

    # ============================================
    # TECH & DIGITAL
    # ============================================
    
    "tech_dark": {
        "name": "Tech Dark",
        "description": "Modo escuro para tecnologia. Programação e guias técnicos.",
        "primary_color": "#00e676",
        "secondary_color": "#69f0ae",
        "font_family": "'Consolas', 'Monaco', monospace",
        "header_font": "'Consolas', monospace",
        "bg_color": "#121212",
        "text_color": "#e0e0e0",
        "title_gradient": "none",
        "page_background": "#121212",
        "chapter_accent": "left",
        "border_accent": "2px solid #00e676",
        "text_transform": "uppercase",
        "glow": "none"
    },
    
    "blueprint": {
        "name": "Blueprint",
        "description": "Azul técnico blueprint. Engenharia e documentação técnica.",
        "primary_color": "#ffffff",
        "secondary_color": "#b3e5fc",
        "font_family": "'Courier New', monospace",
        "header_font": "'Courier New', monospace",
        "bg_color": "#0d47a1",
        "text_color": "#e3f2fd",
        "title_gradient": "none",
        "page_background": "#0d47a1",
        "chapter_accent": "none",
        "border_accent": "1px solid #ffffff",
        "text_transform": "uppercase",
        "glow": "none"
    },
    
    "digital_ink": {
        "name": "Digital Ink",
        "description": "Estilo e-ink como Kindle. Otimizado para leitura digital.",
        "primary_color": "#1a1a1a",
        "secondary_color": "#333333",
        "font_family": "'Georgia', serif",
        "header_font": "'Georgia', serif",
        "bg_color": "#f5f5f5",
        "text_color": "#1a1a1a",
        "title_gradient": "none",
        "page_background": "#f5f5f5",
        "chapter_accent": "none",
        "border_accent": "1px solid #cccccc",
        "text_transform": "none",
        "glow": "none"
    },

    # ============================================
    # SPECIAL EDITIONS
    # ============================================
    
    "rose_gold": {
        "name": "Rose Gold",
        "description": "Rosa dourado elegante. Feminino e sofisticado.",
        "primary_color": "#b76e79",
        "secondary_color": "#c9a0a5",
        "font_family": "'Georgia', serif",
        "header_font": "'Georgia', serif",
        "bg_color": "#fff5f5",
        "text_color": "#6b3a3a",
        "title_gradient": "none",
        "page_background": "#fff5f5",
        "chapter_accent": "classic",
        "border_accent": "2px solid #b76e79",
        "text_transform": "none",
        "glow": "none"
    },
    
    "deep_purple": {
        "name": "Deep Purple",
        "description": "Roxo profundo misterioso. Fantasia e ficção científica.",
        "primary_color": "#e1bee7",
        "secondary_color": "#ce93d8",
        "font_family": "'Palatino Linotype', serif",
        "header_font": "'Palatino Linotype', serif",
        "bg_color": "#311b92",
        "text_color": "#ede7f6",
        "title_gradient": "none",
        "page_background": "#311b92",
        "chapter_accent": "underline",
        "border_accent": "2px solid #e1bee7",
        "text_transform": "none",
        "glow": "none"
    },
    
    "amber_warmth": {
        "name": "Amber Warmth",
        "description": "Âmbar dourado quente. Confortável e convidativo.",
        "primary_color": "#ff8f00",
        "secondary_color": "#ffa000",
        "font_family": "'Cambria', serif",
        "header_font": "'Cambria', serif",
        "bg_color": "#fff8e1",
        "text_color": "#e65100",
        "title_gradient": "none",
        "page_background": "#fff8e1",
        "chapter_accent": "left",
        "border_accent": "3px solid #ff8f00",
        "text_transform": "none",
        "glow": "none"
    }
}
