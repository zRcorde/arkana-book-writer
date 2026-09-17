"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
# -*- coding: utf-8 -*-
"""
Test script for PDF generation debugging
Validates the complete PDF creation pipeline
"""

import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.generator import EbookGenerator
from core.models import EbookContent, Chapter
from templates.themes import THEMES

def test_pdf_generation():
    print("=" * 60)
    print("ARKANA PDF GENERATION DEBUG TEST")
    print("=" * 60)
    
    # Step 1: Check WeasyPrint
    print("\n[1/5] Checking WeasyPrint availability...")
    if not EbookGenerator.is_pdf_ready():
        print("  ❌ ERROR: WeasyPrint not available!")
        print("  Run: pip install weasyprint")
        return False
    print("  ✅ WeasyPrint available")
    
    # Step 2: Check themes
    print("\n[2/5] Checking themes...")
    print(f"  ✅ {len(THEMES)} themes available")
    
    # Step 3: Create test content
    print("\n[3/5] Creating test content...")
    ebook = EbookContent(
        title="Teste de Geração PDF",
        author="Arkana Debug Tool"
    )
    ebook.add_chapter(
        title="Capítulo de Teste",
        content="<p>Este é um parágrafo de teste para validar a geração de PDF.</p><p>Se você está vendo este PDF, a geração funcionou corretamente!</p>"
    )
    ebook.add_chapter(
        title="Segundo Capítulo",
        content="<p>Conteúdo adicional para teste de múltiplos capítulos.</p>"
    )
    print(f"  ✅ Created ebook with {len(ebook.chapters)} chapters")
    
    # Step 4: Generate HTML
    print("\n[4/5] Generating HTML...")
    generator = EbookGenerator()
    theme_id = "penguin_classic"
    settings = {
        "page_size": "A4",
        "margin_top": "25mm",
        "margin_bottom": "25mm",
        "margin_left": "20mm",
        "margin_right": "20mm"
    }
    
    try:
        html = generator.render_html(ebook, theme_id, settings)
        print(f"  ✅ HTML generated ({len(html)} characters)")
    except Exception as e:
        print(f"  ❌ ERROR generating HTML: {e}")
        return False
    
    # Step 5: Generate PDF
    print("\n[5/5] Generating PDF...")
    os.makedirs("output", exist_ok=True)
    output_path = os.path.join("output", "debug_test.pdf")
    
    try:
        generator.generate_pdf(ebook, theme_id, output_path, settings)
        
        if os.path.exists(output_path):
            file_size = os.path.getsize(output_path)
            print(f"  ✅ PDF created successfully!")
            print(f"  📄 Path: {os.path.abspath(output_path)}")
            print(f"  📊 Size: {file_size / 1024:.1f} KB")
        else:
            print("  ❌ ERROR: PDF file not created!")
            return False
            
    except Exception as e:
        print(f"  ❌ ERROR generating PDF: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    print("\n" + "=" * 60)
    print("✅ ALL TESTS PASSED - PDF GENERATION WORKING!")
    print("=" * 60)
    return True

if __name__ == "__main__":
    success = test_pdf_generation()
    sys.exit(0 if success else 1)
