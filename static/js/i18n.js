/* Arkana Book Writer — i18n (PT / EN / ES)
   Language is auto-detected from the browser (navigator.language).
   No manual switcher by design — see README. */
(function () {
    const DICT = {
        pt: {
            'nav.import': 'Importar',
            'nav.style': 'Estilo',
            'nav.edit': 'Editar',
            'nav.settings': 'Ajustes',
            'nav.newSession': 'Nova Sessão',
            'nav.shutdown': 'Encerrar App',

            'stat.words.title': 'Palavras',
            'stat.pages.title': 'Páginas estimadas',
            'stat.time.title': 'Tempo de leitura',

            'header.preview': 'Preview 👁️',
            'header.next.default': 'Prosseguir 🚀',

            'hero.title': 'Seu Manuscrito, Elevado.',
            'hero.sub': 'Transforme rascunhos em obras de arte com a fluidez do Arkana Book Writer.',
            'upload.title': 'Arraste seu arquivo aqui',
            'upload.sub': 'PDF, DOCX ou Markdown',
            'upload.processing.title': 'Processando...',
            'upload.processing.sub': 'Construindo seu workspace',

            'preview.title': 'Visualização Real',

            'step.title.1': 'Workspace Inicial',
            'step.title.2': 'Identidade Visual',
            'step.title.3': 'Refino de Conteúdo',
            'step.title.4': 'Configurações de Exportação',

            'save.saving': '💾 Salvando...',
            'save.saved': '✅ Salvo',
            'save.ready': '💾 Pronto',

            'loading.default': 'Gerando arquivo...',

            'ai.cleaning': '🧹 Limpando formatação...',
            'ai.cleaned': '✨ Texto limpo e formatado!',
            'ai.error': 'Erro ao limpar o texto',
            'ai.button': '🧹 Limpar Formatação',
            'ai.suggest': '🧼 Sugerir Ajustes',

            'metadata.heading': '📚 Informações do Livro',
            'metadata.titleLabel': 'Título do Livro',
            'metadata.titlePlaceholder': 'Digite o título do livro',
            'metadata.authorLabel': 'Nome do Autor',
            'metadata.authorPlaceholder': 'Digite o nome do autor',
            'metadata.save': '💾 Salvar Informações',
            'metadata.saved': 'Informações salvas!',
            'metadata.saveError': 'Erro ao salvar',

            'cover.heading': '🖼️ Capa do Livro (Opcional)',
            'cover.dropHint': 'Arraste uma imagem ou clique para selecionar',
            'cover.sizeHint': 'Recomendado: 1600x2400 pixels (proporção 2:3)',
            'cover.remove': '🗑️ Remover Capa',
            'cover.uploaded': 'Capa carregada!',
            'cover.uploadError': 'Erro ao carregar capa',
            'cover.removed': 'Capa removida',

            'theme.chooseHeading': '🎨 Escolha um Tema Visual',
            'theme.selected': 'Tema {id} selecionado!',

            'chapter.add': '➕ Adicionar Capítulo',
            'chapter.visualEditor': 'Editor Visual',
            'chapter.quickEdit': 'Editar Rápido',
            'chapter.delete': 'Excluir',
            'chapter.editDefault': 'Editar Capítulo',
            'chapter.editTitle': 'Editar: {title}',
            'chapter.titleLabel': 'Título do Capítulo',
            'chapter.titlePlaceholder': 'Título do capítulo',
            'chapter.imageLabel': 'Imagem do Capítulo (opcional)',
            'chapter.addImage': '📷 Adicionar Imagem',
            'chapter.contentLabel': 'Conteúdo',
            'chapter.list': '• Lista',
            'chapter.cancel': 'Cancelar',
            'chapter.save': '💾 Salvar',
            'chapter.saved': 'Capítulo salvo!',
            'chapter.saveError': 'Erro ao salvar capítulo',
            'chapter.openError': 'Erro ao abrir editor',
            'chapter.deleteConfirm': 'Deseja realmente excluir este capítulo?',
            'chapter.deleted': 'Capítulo excluído!',
            'chapter.deleteError': 'Erro ao excluir capítulo',
            'chapter.added': 'Novo capítulo adicionado!',
            'chapter.addError': 'Erro ao adicionar capítulo',
            'chapter.newDefaultTitle': 'Novo Capítulo',
            'chapter.newDefaultContent': '<p>Escreva o conteúdo aqui...</p>',

            'nextBtn.needsImport': '📥 Importe um documento primeiro!',
            'nextBtn.step1': 'Escolher Estilo 🎨',
            'nextBtn.step2': 'Editar Conteúdo ✍️',
            'nextBtn.step3': 'Exportar 📄',

            'export.heading': 'Pronto para Publicação?',
            'export.pdfTitle': 'Gerar PDF',
            'export.pdfDesc': 'Ideal para impressão e leitura fixa',
            'export.epubTitle': 'Gerar EPUB',
            'export.epubDesc': 'Formatado para Kindle e Mobiles',
            'export.generating': 'Gerando {format}... Aguarde.',
            'export.success': '🚀 Arquivo gerado com sucesso!',
            'export.doneHeading': '✅ {format} Gerado com Sucesso!',
            'export.ready': 'Seu arquivo está pronto para download.',
            'export.download': '⬇️ Baixar {file}',
            'export.savedAt': 'Arquivo salvo em: output/{file}',
            'export.error': 'Erro na exportação: {message}',

            'session.newConfirm': 'Iniciar uma nova sessão? Isso irá limpar o documento atual.',
            'session.starting': 'Iniciando nova sessão...',
            'session.started': 'Nova sessão iniciada!',
            'session.error': 'Erro ao iniciar nova sessão',

            'shutdown.confirm': 'Deseja realmente encerrar o Arkana Book Writer?',
            'shutdown.closing': 'Encerrando Arkana...',

            'importSuccess': 'Sucesso: {title} importado!',
            'importError': 'Erro: {message}',

            'visual.chaptersHeading': '📚 Capítulos',
            'visual.toolsHeading': '🛠️ Ferramentas',
            'visual.addImage': '📷 Adicionar Imagem',
            'visual.textBlock': '📝 Bloco de Texto',
            'visual.zoomHeading': '⚙️ Zoom',
            'visual.chapterLabel': 'Capítulo {n}',
            'visual.back': '← Voltar',
            'visual.preview': '👁️ Preview',
            'visual.save': '💾 Salvar',
            'visual.imageAddedDrag': 'Imagem adicionada! Arraste para posicionar.',
            'visual.imageAdded': 'Imagem adicionada!',
            'visual.imageRemoved': 'Imagem removida',
            'visual.changesSaved': 'Alterações salvas!',
            'visual.saveError': 'Erro ao salvar',
            'visual.openError': 'Erro ao abrir editor visual',
            'visual.previewError': 'Erro ao gerar preview',
            'visual.newTextBlock': 'Novo bloco de texto...',

            'donate.navLabel': 'Apoiar o Projeto',
            'donate.title': '💛 Apoie o Arkana Book Writer',
            'donate.blurb': 'O Arkana é gratuito, local e sem rastreamento — não vendemos o software. Se ele te ajudou a publicar seu e-book, considere apoiar quem mantém o projeto.',
            'donate.bmcLabel': 'Buy Me a Coffee',
            'donate.solanaLabel': 'USDC (rede Solana)',
            'donate.btcLabel': 'BTC (rede Bitcoin)',
            'donate.copy': 'Copiar',
            'donate.copied': 'Endereço copiado!',
            'donate.contactLabel': 'Parcerias / Contato',
            'donate.close': 'Fechar'
        },
        en: {
            'nav.import': 'Import',
            'nav.style': 'Style',
            'nav.edit': 'Edit',
            'nav.settings': 'Settings',
            'nav.newSession': 'New Session',
            'nav.shutdown': 'Quit App',

            'stat.words.title': 'Words',
            'stat.pages.title': 'Estimated pages',
            'stat.time.title': 'Reading time',

            'header.preview': 'Preview 👁️',
            'header.next.default': 'Continue 🚀',

            'hero.title': 'Your Manuscript, Elevated.',
            'hero.sub': 'Turn drafts into polished works with the fluidity of Arkana Book Writer.',
            'upload.title': 'Drop your file here',
            'upload.sub': 'PDF, DOCX or Markdown',
            'upload.processing.title': 'Processing...',
            'upload.processing.sub': 'Building your workspace',

            'preview.title': 'Live Preview',

            'step.title.1': 'Initial Workspace',
            'step.title.2': 'Visual Identity',
            'step.title.3': 'Content Editing',
            'step.title.4': 'Export Settings',

            'save.saving': '💾 Saving...',
            'save.saved': '✅ Saved',
            'save.ready': '💾 Ready',

            'loading.default': 'Generating file...',

            'ai.cleaning': '🧹 Cleaning formatting...',
            'ai.cleaned': '✨ Text cleaned and formatted!',
            'ai.error': 'Error cleaning text',
            'ai.button': '🧹 Clean Formatting',
            'ai.suggest': '🧼 Suggest Adjustments',

            'metadata.heading': '📚 Book Information',
            'metadata.titleLabel': 'Book Title',
            'metadata.titlePlaceholder': 'Enter the book title',
            'metadata.authorLabel': 'Author Name',
            'metadata.authorPlaceholder': 'Enter the author name',
            'metadata.save': '💾 Save Information',
            'metadata.saved': 'Information saved!',
            'metadata.saveError': 'Error saving',

            'cover.heading': '🖼️ Book Cover (Optional)',
            'cover.dropHint': 'Drag an image or click to select',
            'cover.sizeHint': 'Recommended: 1600x2400 pixels (2:3 ratio)',
            'cover.remove': '🗑️ Remove Cover',
            'cover.uploaded': 'Cover uploaded!',
            'cover.uploadError': 'Error uploading cover',
            'cover.removed': 'Cover removed',

            'theme.chooseHeading': '🎨 Choose a Visual Theme',
            'theme.selected': 'Theme {id} selected!',

            'chapter.add': '➕ Add Chapter',
            'chapter.visualEditor': 'Visual Editor',
            'chapter.quickEdit': 'Quick Edit',
            'chapter.delete': 'Delete',
            'chapter.editDefault': 'Edit Chapter',
            'chapter.editTitle': 'Edit: {title}',
            'chapter.titleLabel': 'Chapter Title',
            'chapter.titlePlaceholder': 'Chapter title',
            'chapter.imageLabel': 'Chapter Image (optional)',
            'chapter.addImage': '📷 Add Image',
            'chapter.contentLabel': 'Content',
            'chapter.list': '• List',
            'chapter.cancel': 'Cancel',
            'chapter.save': '💾 Save',
            'chapter.saved': 'Chapter saved!',
            'chapter.saveError': 'Error saving chapter',
            'chapter.openError': 'Error opening editor',
            'chapter.deleteConfirm': 'Are you sure you want to delete this chapter?',
            'chapter.deleted': 'Chapter deleted!',
            'chapter.deleteError': 'Error deleting chapter',
            'chapter.added': 'New chapter added!',
            'chapter.addError': 'Error adding chapter',
            'chapter.newDefaultTitle': 'New Chapter',
            'chapter.newDefaultContent': '<p>Write your content here...</p>',

            'nextBtn.needsImport': '📥 Import a document first!',
            'nextBtn.step1': 'Choose Style 🎨',
            'nextBtn.step2': 'Edit Content ✍️',
            'nextBtn.step3': 'Export 📄',

            'export.heading': 'Ready to Publish?',
            'export.pdfTitle': 'Generate PDF',
            'export.pdfDesc': 'Ideal for printing and fixed-layout reading',
            'export.epubTitle': 'Generate EPUB',
            'export.epubDesc': 'Formatted for Kindle and mobile devices',
            'export.generating': 'Generating {format}... Please wait.',
            'export.success': '🚀 File generated successfully!',
            'export.doneHeading': '✅ {format} Generated Successfully!',
            'export.ready': 'Your file is ready for download.',
            'export.download': '⬇️ Download {file}',
            'export.savedAt': 'File saved at: output/{file}',
            'export.error': 'Export error: {message}',

            'session.newConfirm': 'Start a new session? This will clear the current document.',
            'session.starting': 'Starting new session...',
            'session.started': 'New session started!',
            'session.error': 'Error starting new session',

            'shutdown.confirm': 'Are you sure you want to quit Arkana Book Writer?',
            'shutdown.closing': 'Shutting down Arkana...',

            'importSuccess': 'Success: {title} imported!',
            'importError': 'Error: {message}',

            'visual.chaptersHeading': '📚 Chapters',
            'visual.toolsHeading': '🛠️ Tools',
            'visual.addImage': '📷 Add Image',
            'visual.textBlock': '📝 Text Block',
            'visual.zoomHeading': '⚙️ Zoom',
            'visual.chapterLabel': 'Chapter {n}',
            'visual.back': '← Back',
            'visual.preview': '👁️ Preview',
            'visual.save': '💾 Save',
            'visual.imageAddedDrag': 'Image added! Drag to position.',
            'visual.imageAdded': 'Image added!',
            'visual.imageRemoved': 'Image removed',
            'visual.changesSaved': 'Changes saved!',
            'visual.saveError': 'Error saving',
            'visual.openError': 'Error opening visual editor',
            'visual.previewError': 'Error generating preview',
            'visual.newTextBlock': 'New text block...',

            'donate.navLabel': 'Support the Project',
            'donate.title': '💛 Support Arkana Book Writer',
            'donate.blurb': 'Arkana is free, local, and tracking-free — we do not sell this software. If it helped you publish your ebook, consider supporting the people who maintain it.',
            'donate.bmcLabel': 'Buy Me a Coffee',
            'donate.solanaLabel': 'USDC (Solana network)',
            'donate.btcLabel': 'BTC (Bitcoin network)',
            'donate.copy': 'Copy',
            'donate.copied': 'Address copied!',
            'donate.contactLabel': 'Partnerships / Contact',
            'donate.close': 'Close'
        },
        es: {
            'nav.import': 'Importar',
            'nav.style': 'Estilo',
            'nav.edit': 'Editar',
            'nav.settings': 'Ajustes',
            'nav.newSession': 'Nueva Sesión',
            'nav.shutdown': 'Cerrar App',

            'stat.words.title': 'Palabras',
            'stat.pages.title': 'Páginas estimadas',
            'stat.time.title': 'Tiempo de lectura',

            'header.preview': 'Vista previa 👁️',
            'header.next.default': 'Continuar 🚀',

            'hero.title': 'Tu Manuscrito, Elevado.',
            'hero.sub': 'Convierte borradores en obras pulidas con la fluidez de Arkana Book Writer.',
            'upload.title': 'Arrastra tu archivo aquí',
            'upload.sub': 'PDF, DOCX o Markdown',
            'upload.processing.title': 'Procesando...',
            'upload.processing.sub': 'Creando tu espacio de trabajo',

            'preview.title': 'Vista Previa en Vivo',

            'step.title.1': 'Espacio Inicial',
            'step.title.2': 'Identidad Visual',
            'step.title.3': 'Edición de Contenido',
            'step.title.4': 'Configuración de Exportación',

            'save.saving': '💾 Guardando...',
            'save.saved': '✅ Guardado',
            'save.ready': '💾 Listo',

            'loading.default': 'Generando archivo...',

            'ai.cleaning': '🧹 Limpiando formato...',
            'ai.cleaned': '✨ ¡Texto limpio y formateado!',
            'ai.error': 'Error al limpiar el texto',
            'ai.button': '🧹 Limpiar Formato',
            'ai.suggest': '🧼 Sugerir Ajustes',

            'metadata.heading': '📚 Información del Libro',
            'metadata.titleLabel': 'Título del Libro',
            'metadata.titlePlaceholder': 'Ingresa el título del libro',
            'metadata.authorLabel': 'Nombre del Autor',
            'metadata.authorPlaceholder': 'Ingresa el nombre del autor',
            'metadata.save': '💾 Guardar Información',
            'metadata.saved': '¡Información guardada!',
            'metadata.saveError': 'Error al guardar',

            'cover.heading': '🖼️ Portada del Libro (Opcional)',
            'cover.dropHint': 'Arrastra una imagen o haz clic para seleccionar',
            'cover.sizeHint': 'Recomendado: 1600x2400 píxeles (proporción 2:3)',
            'cover.remove': '🗑️ Quitar Portada',
            'cover.uploaded': '¡Portada cargada!',
            'cover.uploadError': 'Error al cargar la portada',
            'cover.removed': 'Portada eliminada',

            'theme.chooseHeading': '🎨 Elige un Tema Visual',
            'theme.selected': '¡Tema {id} seleccionado!',

            'chapter.add': '➕ Añadir Capítulo',
            'chapter.visualEditor': 'Editor Visual',
            'chapter.quickEdit': 'Edición Rápida',
            'chapter.delete': 'Eliminar',
            'chapter.editDefault': 'Editar Capítulo',
            'chapter.editTitle': 'Editar: {title}',
            'chapter.titleLabel': 'Título del Capítulo',
            'chapter.titlePlaceholder': 'Título del capítulo',
            'chapter.imageLabel': 'Imagen del Capítulo (opcional)',
            'chapter.addImage': '📷 Añadir Imagen',
            'chapter.contentLabel': 'Contenido',
            'chapter.list': '• Lista',
            'chapter.cancel': 'Cancelar',
            'chapter.save': '💾 Guardar',
            'chapter.saved': '¡Capítulo guardado!',
            'chapter.saveError': 'Error al guardar el capítulo',
            'chapter.openError': 'Error al abrir el editor',
            'chapter.deleteConfirm': '¿Seguro que deseas eliminar este capítulo?',
            'chapter.deleted': '¡Capítulo eliminado!',
            'chapter.deleteError': 'Error al eliminar el capítulo',
            'chapter.added': '¡Nuevo capítulo añadido!',
            'chapter.addError': 'Error al añadir el capítulo',
            'chapter.newDefaultTitle': 'Nuevo Capítulo',
            'chapter.newDefaultContent': '<p>Escribe tu contenido aquí...</p>',

            'nextBtn.needsImport': '📥 ¡Importa un documento primero!',
            'nextBtn.step1': 'Elegir Estilo 🎨',
            'nextBtn.step2': 'Editar Contenido ✍️',
            'nextBtn.step3': 'Exportar 📄',

            'export.heading': '¿Listo para Publicar?',
            'export.pdfTitle': 'Generar PDF',
            'export.pdfDesc': 'Ideal para imprimir y lectura de diseño fijo',
            'export.epubTitle': 'Generar EPUB',
            'export.epubDesc': 'Formateado para Kindle y móviles',
            'export.generating': 'Generando {format}... Espera un momento.',
            'export.success': '🚀 ¡Archivo generado con éxito!',
            'export.doneHeading': '✅ ¡{format} Generado con Éxito!',
            'export.ready': 'Tu archivo está listo para descargar.',
            'export.download': '⬇️ Descargar {file}',
            'export.savedAt': 'Archivo guardado en: output/{file}',
            'export.error': 'Error en la exportación: {message}',

            'session.newConfirm': '¿Iniciar una nueva sesión? Esto borrará el documento actual.',
            'session.starting': 'Iniciando nueva sesión...',
            'session.started': '¡Nueva sesión iniciada!',
            'session.error': 'Error al iniciar nueva sesión',

            'shutdown.confirm': '¿Seguro que deseas cerrar Arkana Book Writer?',
            'shutdown.closing': 'Cerrando Arkana...',

            'importSuccess': '¡Éxito: {title} importado!',
            'importError': 'Error: {message}',

            'visual.chaptersHeading': '📚 Capítulos',
            'visual.toolsHeading': '🛠️ Herramientas',
            'visual.addImage': '📷 Añadir Imagen',
            'visual.textBlock': '📝 Bloque de Texto',
            'visual.zoomHeading': '⚙️ Zoom',
            'visual.chapterLabel': 'Capítulo {n}',
            'visual.back': '← Volver',
            'visual.preview': '👁️ Vista previa',
            'visual.save': '💾 Guardar',
            'visual.imageAddedDrag': '¡Imagen añadida! Arrástrala para posicionarla.',
            'visual.imageAdded': '¡Imagen añadida!',
            'visual.imageRemoved': 'Imagen eliminada',
            'visual.changesSaved': '¡Cambios guardados!',
            'visual.saveError': 'Error al guardar',
            'visual.openError': 'Error al abrir el editor visual',
            'visual.previewError': 'Error al generar la vista previa',
            'visual.newTextBlock': 'Nuevo bloque de texto...',

            'donate.navLabel': 'Apoyar el Proyecto',
            'donate.title': '💛 Apoya a Arkana Book Writer',
            'donate.blurb': 'Arkana es gratuito, local y sin rastreo — no vendemos este software. Si te ayudó a publicar tu ebook, considera apoyar a quienes lo mantienen.',
            'donate.bmcLabel': 'Buy Me a Coffee',
            'donate.solanaLabel': 'USDC (red Solana)',
            'donate.btcLabel': 'BTC (red Bitcoin)',
            'donate.copy': 'Copiar',
            'donate.copied': '¡Dirección copiada!',
            'donate.contactLabel': 'Alianzas / Contacto',
            'donate.close': 'Cerrar'
        }
    };

    function detectLang() {
        try {
            const stored = window.localStorage && window.localStorage.getItem('arkana_lang');
            if (stored && DICT[stored]) return stored;
        } catch (e) { /* localStorage may be unavailable */ }

        const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        if (nav.startsWith('pt')) return 'pt';
        if (nav.startsWith('es')) return 'es';
        return 'en';
    }

    const LANG = detectLang();

    function t(key, vars) {
        let str = (DICT[LANG] && DICT[LANG][key]) || (DICT.en && DICT.en[key]) || DICT.pt[key] || key;
        if (vars) {
            Object.keys(vars).forEach((k) => {
                str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
            });
        }
        return str;
    }

    function applyStaticI18n(root) {
        (root || document).querySelectorAll('[data-i18n]').forEach((el) => {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        (root || document).querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
        });
        (root || document).querySelectorAll('[data-i18n-title]').forEach((el) => {
            el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
        });
    }

    window.ArkanaI18n = { t, lang: LANG, applyStaticI18n };
})();
