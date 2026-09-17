"""
Arkana Book Writer — local ebook studio (PDF/EPUB).
https://github.com/ (Arkana Book Writer project)
Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X | BTC: bc1puezkfpq7eea6whzrh68qmhvw9gmxynwpe8mr5w509ycqcn3y64hq9ywjrn
Partnerships / contact: contact@rewebfolio.xyz
"""
import os
import uvicorn
import signal
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from core.generator import EbookGenerator, EXPORT_I18N, resolve_export_lang
from core.persistence import PersistenceManager
from core.parser import (
    get_parser, UNKNOWN_AUTHOR, INTRO_TITLE, MAIN_CONTENT_TITLE, EXTRACTED_CONTENT_TITLE
)
from core.paths import PathManager

app = FastAPI(title="Arkana Book Writer")
templates = Jinja2Templates(directory=str(PathManager.get_templates_dir()))

# Configuração de Caminhos
static_dir = PathManager.get_static_dir()
output_dir = PathManager.get_output_dir()
uploads_dir = PathManager.get_uploads_dir()
covers_dir = PathManager.get_writable_path("uploads/covers")

# Garantir que apenas diretórios graváveis sejam criados
# (static e templates são somente leitura no bundle)
output_dir.mkdir(parents=True, exist_ok=True)
uploads_dir.mkdir(parents=True, exist_ok=True)
covers_dir.mkdir(parents=True, exist_ok=True)

app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")
app.mount("/output", StaticFiles(directory=str(output_dir)), name="output")
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# Estado em Memória (Sync com Persistence)
current_ebook = None
current_settings = {
    "page_size": "A4",
    "margin_top": "25mm",
    "margin_bottom": "25mm",
    "margin_left": "20mm",
    "margin_right": "20mm",
    "author": "",
    "title": "",
    "custom_css": "",
    "cover_image": None
}

def load_initial_state():
    """Legacy function - kept for manual restore if needed."""
    global current_ebook, current_settings
    ebook, settings = PersistenceManager.load()
    if ebook:
        current_ebook = ebook
    if settings:
        current_settings = settings

# Clear state on startup - app starts fresh every time
PersistenceManager.clear()

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Renderiza a interface principal do Glass Engine."""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/status")
async def get_status():
    """Retorna o status do sistema (disponibilidade de exportação em PDF)."""
    return {"pdf_ready": EbookGenerator.is_pdf_ready()}

@app.get("/api/state")
async def get_state():
    """Retorna o estado atual do ebook e das configurações."""
    return {
        "ebook": current_ebook.__dict__ if current_ebook else None,
        "settings": current_settings
    }

@app.get("/api/themes")
async def get_themes():
    """Retorna a lista de temas artísticos disponíveis."""
    from templates.themes import THEMES
    return THEMES

@app.get("/api/stats")
async def get_stats():
    """Retorna estatísticas do documento atual."""
    if not current_ebook:
        return {
            "word_count": 0,
            "char_count": 0,
            "chapter_count": 0,
            "page_estimate": 0,
            "reading_time": "0 min"
        }
    
    import re
    total_words = 0
    total_chars = 0
    
    for chapter in current_ebook.chapters:
        # Remove HTML tags for counting
        clean_content = re.sub(r'<[^>]+>', '', chapter.content)
        words = len(clean_content.split())
        chars = len(clean_content)
        total_words += words
        total_chars += chars
    
    # Estimate pages (250 words per page average)
    page_estimate = max(1, round(total_words / 250))
    
    # Reading time (200 words per minute average)
    reading_minutes = max(1, round(total_words / 200))
    if reading_minutes >= 60:
        hours = reading_minutes // 60
        mins = reading_minutes % 60
        reading_time = f"{hours}h {mins}min"
    else:
        reading_time = f"{reading_minutes} min"
    
    return {
        "word_count": total_words,
        "char_count": total_chars,
        "chapter_count": len(current_ebook.chapters),
        "page_estimate": page_estimate,
        "reading_time": reading_time
    }

@app.post("/api/new-session")
async def new_session():
    """Limpa todos os dados e inicia uma nova sessão."""
    global current_ebook, current_settings
    current_ebook = None
    current_settings = {
        "page_size": "A4",
        "margin_top": "25mm",
        "margin_bottom": "25mm",
        "margin_left": "20mm",
        "margin_right": "20mm",
        "author": "",
        "title": "",
        "custom_css": "",
        "cover_image": None,
        "selected_theme": "penguin_classic"
    }
    # Clear persistence
    PersistenceManager.clear()
    return {"status": "success", "message": "Nova sessão iniciada"}

@app.post("/api/settings")
async def update_settings(settings: dict):
    """Atualiza as configurações globais."""
    global current_settings
    current_settings.update(settings)
    PersistenceManager.save(current_ebook, current_settings)
    return {"status": "success"}

@app.post("/api/upload-cover")
async def upload_cover(file: UploadFile = File(...)):
    """Upload de imagem de capa."""
    global current_settings
    
    os.makedirs("uploads/covers", exist_ok=True)
    
    # Generate unique filename
    import uuid
    ext = os.path.splitext(file.filename)[1] or ".jpg"
    filename = f"cover_{uuid.uuid4().hex[:8]}{ext}"
    filepath = covers_dir / filename
    
    with open(filepath, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Store absolute path for WeasyPrint
    abs_path = os.path.abspath(filepath)
    current_settings["cover_image"] = abs_path
    PersistenceManager.save(current_ebook, current_settings)
    
    # Return relative path for preview
    return {"status": "success", "path": f"/uploads/covers/{filename}"}

@app.post("/api/update-metadata")
async def update_metadata(request: Request):
    """Atualiza título e autor do ebook."""
    global current_ebook, current_settings
    
    data = await request.json()
    
    if current_ebook and "title" in data:
        current_ebook.title = data["title"]
    
    if "author" in data:
        current_settings["author"] = data["author"]
        if current_ebook:
            current_ebook.author = data["author"]
    
    PersistenceManager.save(current_ebook, current_settings)
    return {"status": "success"}

@app.post("/api/chapter/update")
async def update_chapter(request: Request):
    """Atualiza um capítulo específico."""
    global current_ebook
    if not current_ebook:
        return JSONResponse(status_code=400, content={"message": "Nenhum ebook carregado."})
    
    data = await request.json()
    index = data.get("index")
    
    if index is None or index < 0 or index >= len(current_ebook.chapters):
        return JSONResponse(status_code=400, content={"message": "Índice inválido."})
    
    if "title" in data:
        current_ebook.chapters[index].title = data["title"]
    if "content" in data:
        current_ebook.chapters[index].content = data["content"]
    if "images" in data:
        current_ebook.chapters[index].images = data["images"]
    
    PersistenceManager.save(current_ebook, current_settings)
    return {"status": "success"}

@app.post("/api/chapter/delete")
async def delete_chapter(request: Request):
    """Remove um capítulo específico."""
    global current_ebook
    if not current_ebook:
        return JSONResponse(status_code=400, content={"message": "Nenhum ebook carregado."})
    
    data = await request.json()
    index = data.get("index")
    
    if index is None or index < 0 or index >= len(current_ebook.chapters):
        return JSONResponse(status_code=400, content={"message": "Índice inválido."})
    
    del current_ebook.chapters[index]
    PersistenceManager.save(current_ebook, current_settings)
    return {"status": "success"}

@app.get("/api/preview")
async def get_preview():
    """Gera o HTML de preview artístico."""
    if not current_ebook:
        return JSONResponse(status_code=400, content={"message": "Nenhum ebook carregado."})
    
    generator = EbookGenerator()
    theme_id = current_settings.get("selected_theme", "penguin_classic")
    html = generator.render_html(current_ebook, theme_id, current_settings)
    return {"html": html}

@app.post("/api/export")
async def export_ebook(format: str):
    """Gera o arquivo final (PDF ou EPUB)."""
    if not current_ebook:
        return JSONResponse(status_code=400, content={"message": "Nenhum ebook carregado."})
    
    generator = EbookGenerator()
    theme_id = current_settings.get("selected_theme", "penguin_classic")
    
    os.makedirs("output", exist_ok=True)
    
    # Sanitize filename - remove special chars and use proper title
    import re
    title = current_ebook.title or "Ebook"
    # Remove 'temp' if it's the full title
    if title.lower() == "temp":
        title = "Meu_Ebook"
    # Sanitize: replace spaces with underscore, remove special chars
    safe_title = re.sub(r'[^\w\s-]', '', title)
    safe_title = re.sub(r'[\s]+', '_', safe_title)
    safe_title = safe_title[:50]  # Limit length
    
    from datetime import datetime
    timestamp = datetime.now().strftime("%Y%m%d_%H%M")
    filename = f"{safe_title}_{timestamp}.{format}"
    filepath = output_dir / filename
    
    try:
        if format == "pdf":
            generator.generate_pdf(current_ebook, theme_id, filepath, current_settings)
        elif format == "epub":
            generator.generate_epub(current_ebook, theme_id, filepath, current_settings)
        
        # Verify file was created
        if not os.path.exists(filepath):
            return JSONResponse(status_code=500, content={"message": "Arquivo não foi gerado."})
        
        file_size = os.path.getsize(filepath)
        return {
            "status": "success", 
            "file": filename, 
            "path": f"/output/{filename}",
            "size": f"{file_size / 1024:.1f} KB"
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"message": str(e)})
@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    """Recebe o arquivo, salva temporariamente e processa com o parser correto."""
    global current_ebook
    
    file_ext = os.path.splitext(file.filename)[1].lower()
    temp_path = uploads_dir / f"temp{file_ext}"
    
    with open(temp_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    parser = get_parser(file_ext)
    if not parser:
        return JSONResponse(status_code=400, content={"message": "Formato de arquivo não suportado."})
    
    try:
        current_ebook = parser.parse(temp_path)
        # Use original filename for the title (parser only sees the "temp" staging path)
        original_name = os.path.splitext(file.filename)[0].strip()
        if original_name:
            current_ebook.title = original_name

        # Resolve the parser's language-neutral placeholders (unknown author,
        # untitled chapter) to the reader's detected UI language.
        i18n = EXPORT_I18N[resolve_export_lang(current_settings.get("lang"))]
        if current_ebook.author == UNKNOWN_AUTHOR:
            current_ebook.author = i18n["unknown_author"]
        chapter_title_map = {
            INTRO_TITLE: i18n["intro"],
            MAIN_CONTENT_TITLE: i18n["main_content"],
            EXTRACTED_CONTENT_TITLE: i18n["extracted_content"],
        }
        for chapter in current_ebook.chapters:
            if chapter.title in chapter_title_map:
                chapter.title = chapter_title_map[chapter.title]

        current_settings["title"] = current_ebook.title
        PersistenceManager.save(current_ebook, current_settings)
        return {"status": "success", "title": current_ebook.title, "chapters_count": len(current_ebook.chapters)}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"message": str(e)})


@app.post("/api/chapter/add")
async def add_chapter(request: Request):
    """Adiciona um novo capítulo."""
    global current_ebook
    data = await request.json()
    
    if current_ebook:
        from core.models import Chapter
        new_chapter = Chapter(
            id=f"chapter_{len(current_ebook.chapters) + 1}",
            title=data.get("title", "Novo Capítulo"),
            content=data.get("content", "<p>Escreva o conteúdo aqui...</p>")
        )
        current_ebook.chapters.append(new_chapter)
        PersistenceManager.save(current_ebook, current_settings)
        return {"status": "success", "index": len(current_ebook.chapters) - 1}
    return JSONResponse(status_code=400, content={"message": "Nenhum ebook carregado."})

@app.post("/api/ai/refine")
async def ai_refine(request: Request):
    """
    Simula o refinamento de texto via IA (Arkana IA).
    No futuro, isto se conectará a uma API (OpenAI/Gemini).
    """
    data = await request.json()
    content = data.get("content", "")
    
    # Simple algorithmic refinement for demo/initial phase
    # (Fixing common spacing, double tags, simple polish)
    import re
    refined = content
    refined = re.sub(r'\s{2,}', ' ', refined) # Remove double spaces
    refined = refined.replace("<p></p>", "") # Remove empty paras
    
    # Simulate a "professional tone" enhancement (mock)
    if "Escreva o conteúdo aqui" in refined:
        refined = refined.replace("Escreva o conteúdo aqui", "Inicie sua jornada literária aqui com clareza e propósito.")
    
    return {"status": "success", "refined_content": refined}

@app.post("/api/shutdown")
async def shutdown():
    """Encerra o servidor e fecha os processos em background."""
    os.kill(os.getpid(), signal.SIGTERM)
    return {"status": "shutting down"}

@app.on_event("startup")
async def startup_event():
    """Abre o navegador automaticamente ao iniciar (Desativado para Electron)."""
    # Em modo Desktop, o Electron cuida de abrir a janela.
    pass

if __name__ == "__main__":
    uvicorn.run("web_app:app", host="127.0.0.1", port=8000, reload=False)
