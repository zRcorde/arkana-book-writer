/* =============================================
   Arkana Book Writer — front-end engine
   https://github.com/ (Arkana Book Writer)
   Support: buymeacoffee.com/re_code | USDC (Solana): 4qroECsHYTqk7Sda412LiiXofuMj5xhYRHmrKqXbKM8X
   Partnerships / contact: contact@rewebfolio.xyz
============================================= */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Arkana Book Writer Active');

    const t = window.ArkanaI18n.t;
    window.ArkanaI18n.applyStaticI18n();

    // Tell the backend which language to bake into the exported PDF/EPUB
    // (table of contents, "by <author>", chapter labels).
    fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: window.ArkanaI18n.lang })
    }).catch(() => { /* non-critical */ });

    // =============================================
    // DONATION / SUPPORT MODAL
    // =============================================
    window.openDonationModal = () => {
        const modal = document.getElementById('donation-modal');
        if (modal) modal.style.display = 'flex';
    };

    window.closeDonationModal = () => {
        const modal = document.getElementById('donation-modal');
        if (modal) modal.style.display = 'none';
    };

    window.copyWalletAddress = async (elId) => {
        const el = document.getElementById(elId || 'donation-wallet-sol');
        if (!el) return;
        try {
            await navigator.clipboard.writeText(el.textContent.trim());
            showToast(t('donate.copied'), 'success');
        } catch (e) {
            // Fallback for environments without clipboard permission
            const range = document.createRange();
            range.selectNode(el);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            showToast(t('donate.copied'), 'success');
        }
    };

    // =============================================
    // STATS & AUTO-SAVE SYSTEM
    // =============================================
    let lastExportedFile = null;

    async function refreshStats() {
        try {
            const stats = await fetch('/api/stats').then(r => r.json());
            const wordsEl = document.getElementById('stat-words');
            const pagesEl = document.getElementById('stat-pages');
            const timeEl = document.getElementById('stat-time');

            if (wordsEl) wordsEl.textContent = `📝 ${stats.word_count.toLocaleString()}`;
            if (pagesEl) pagesEl.textContent = `📄 ${stats.page_estimate}`;
            if (timeEl) timeEl.textContent = `⏱️ ${stats.reading_time}`;
        } catch (e) {
            // Silent fail for stats
        }
    }

    function setSaveStatus(status) {
        const el = document.getElementById('save-status');
        if (!el) return;

        el.classList.remove('saving', 'saved');
        if (status === 'saving') {
            el.textContent = t('save.saving');
            el.classList.add('saving');
        } else if (status === 'saved') {
            el.textContent = t('save.saved');
            el.classList.add('saved');
            setTimeout(() => {
                el.textContent = t('save.ready');
                el.classList.remove('saved');
            }, 2000);
        } else {
            el.textContent = t('save.ready');
        }
    }

    function showLoadingOverlay(message) {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="spinner"></div>
            <div class="loading-text">${message || t('loading.default')}</div>
        `;
        document.body.appendChild(overlay);
    }

    function hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.remove();
    }

    // Refresh stats every 5 seconds
    setInterval(refreshStats, 5000);
    // Initial load
    setTimeout(refreshStats, 1000);

    // =============================================
    // LIVE PREVIEW & TEXT CLEANUP
    // =============================================
    let isPreviewVisible = false;

    window.togglePreview = () => {
        const panel = document.getElementById('live-preview-panel');
        isPreviewVisible = !isPreviewVisible;
        if (isPreviewVisible) {
            panel.classList.add('visible');
            updatePreview();
        } else {
            panel.classList.remove('visible');
        }
    };

    // Debounce for live updates
    let previewTimeout = null;
    function debouncePreview() {
        if (!isPreviewVisible) return;
        clearTimeout(previewTimeout);
        previewTimeout = setTimeout(updatePreview, 1500);
    }

    async function updatePreview() {
        const frame = document.getElementById('preview-frame');
        if (!frame || !isPreviewVisible) return;

        try {
            const response = await fetch('/api/preview');
            const data = await response.json();

            // Use blob for cleaner iframe loading
            const blob = new Blob([data.html], { type: 'text/html' });
            frame.src = URL.createObjectURL(blob);
        } catch (error) {
            console.error('Preview update error:', error);
        }
    }

    window.refineWithAI = async () => {
        const contentEl = document.getElementById('editor-chapter-content');
        if (!contentEl) return;

        const originalHTML = contentEl.innerHTML;
        showToast(t('ai.cleaning'), 'success');

        try {
            const response = await fetch('/api/ai/refine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: originalHTML })
            });
            const result = await response.json();

            if (response.ok) {
                contentEl.innerHTML = result.refined_content;
                showToast(t('ai.cleaned'), 'success');
                debouncePreview();
            }
        } catch (error) {
            showToast(t('ai.error'), 'error');
        }
    };

    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item[data-step]');
    const stepTitle = document.getElementById('step-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const step = item.getAttribute('data-step');
            updateStepView(step, item);
        });
    });

    async function updateStepView(step, activeItem) {
        // Update active state in sidebar
        navItems.forEach(n => n.classList.remove('active'));
        activeItem.classList.add('active');

        const labels = {
            '1': t('step.title.1'),
            '2': t('step.title.2'),
            '3': t('step.title.3'),
            '4': t('step.title.4')
        };
        stepTitle.innerText = labels[step] || 'Workspace';

        const contentArea = document.getElementById('workspace-content');
        contentArea.classList.remove('content-fade');
        void contentArea.offsetWidth; // Trigger reflow
        contentArea.classList.add('content-fade');

        if (step === '1') {
            renderStep1();
        } else if (step === '2') {
            const themes = await fetch('/api/themes').then(r => r.json());
            renderStep2(themes);
        } else if (step === '3') {
            const state = await fetch('/api/state').then(r => r.json());
            renderStep3(state.ebook);
        } else if (step === '4') {
            renderStep4();
        }
    }

    function renderStep1() {
        const contentArea = document.getElementById('workspace-content');
        contentArea.innerHTML = `
            <div class="hero-section">
                <h1 class="hero-glow">${t('hero.title')}</h1>
                <p class="hero-sub">${t('hero.sub')}</p>
                <div class="upload-container" id="drop-zone">
                    <div class="upload-glass">
                        <div class="upload-icon">✨</div>
                        <h3>${t('upload.title')}</h3>
                        <p>${t('upload.sub')}</p>
                        <input type="file" id="file-input" accept=".pdf,.docx,.md,.markdown" hidden>
                    </div>
                </div>
            </div>
        `;
        // Re-attach listeners to NEW elements
        initDropZone();
    }

    async function renderStep2(themes) {
        const contentArea = document.getElementById('workspace-content');
        const state = await fetch('/api/state').then(r => r.json());
        const currentTitle = state.ebook?.title || '';
        const currentAuthor = state.settings?.author || '';

        let html = `
            <div class="customization-section">
                <!-- Book Metadata -->
                <div class="metadata-panel glass-panel">
                    <h3>${t('metadata.heading')}</h3>
                    <div class="form-group">
                        <label>${t('metadata.titleLabel')}</label>
                        <input type="text" id="book-title" class="input-glass"
                               value="${currentTitle}" placeholder="${t('metadata.titlePlaceholder')}">
                    </div>
                    <div class="form-group">
                        <label>${t('metadata.authorLabel')}</label>
                        <input type="text" id="book-author" class="input-glass"
                               value="${currentAuthor}" placeholder="${t('metadata.authorPlaceholder')}">
                    </div>
                    <button class="btn-glass btn-primary" onclick="saveMetadata()">${t('metadata.save')}</button>
                </div>

                <!-- Cover Image Upload -->
                <div class="cover-panel glass-panel">
                    <h3>${t('cover.heading')}</h3>
                    <div class="cover-upload-area" id="cover-drop-zone">
                        <input type="file" id="cover-input" accept="image/*" hidden>
                        <div id="cover-preview">
                            <span class="upload-icon">📷</span>
                            <p>${t('cover.dropHint')}</p>
                            <p class="hint">${t('cover.sizeHint')}</p>
                        </div>
                    </div>
                    <button class="btn-glass secondary" onclick="removeCover()" id="btn-remove-cover" style="display:none;">
                        ${t('cover.remove')}
                    </button>
                </div>
            </div>

            <h3 style="margin: 30px 0 20px; color: var(--text-main);">${t('theme.chooseHeading')}</h3>
            <div class="theme-grid">
        `;

        for (const [id, theme] of Object.entries(themes)) {
            const isSelected = state.settings?.selected_theme === id;
            html += `
                <div class="theme-card-glass ${isSelected ? 'selected' : ''}" onclick="selectTheme('${id}')">
                    <div class="theme-preview" style="background: ${theme.page_background || theme.bg_color || '#fff'}">
                        <div class="preview-title" style="background: ${theme.title_gradient}; color: ${theme.text_color}">Aa</div>
                        <div class="preview-bar" style="background: ${theme.primary_color}"></div>
                    </div>
                    <h4>${theme.name || id.replace(/_/g, ' ')}</h4>
                    <p class="theme-desc">${theme.description || ''}</p>
                </div>
            `;
        }
        html += '</div>';
        contentArea.innerHTML = html;

        // Setup cover upload
        setupCoverUpload();

        // Load existing cover if any
        if (state.settings?.cover_image) {
            showCoverPreview(state.settings.cover_image);
        }
    }

    function setupCoverUpload() {
        const dropZone = document.getElementById('cover-drop-zone');
        const input = document.getElementById('cover-input');

        if (!dropZone || !input) return;

        dropZone.addEventListener('click', () => input.click());
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files[0]) handleCoverUpload(e.dataTransfer.files[0]);
        });
        input.addEventListener('change', (e) => {
            if (e.target.files[0]) handleCoverUpload(e.target.files[0]);
        });
    }

    async function handleCoverUpload(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload-cover', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                showCoverPreview(result.path);
                showToast(t('cover.uploaded'), 'success');
            }
        } catch (error) {
            showToast(t('cover.uploadError'), 'error');
        }
    }

    function showCoverPreview(path) {
        const preview = document.getElementById('cover-preview');
        const removeBtn = document.getElementById('btn-remove-cover');
        if (preview) {
            preview.innerHTML = `<img src="${path}" style="max-height: 200px; border-radius: 8px;">`;
        }
        if (removeBtn) removeBtn.style.display = 'inline-block';
    }

    window.removeCover = async () => {
        await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cover_image: null })
        });
        const preview = document.getElementById('cover-preview');
        const removeBtn = document.getElementById('btn-remove-cover');
        if (preview) {
            preview.innerHTML = `
                <span class="upload-icon">📷</span>
                <p>${t('cover.dropHint')}</p>
                <p class="hint">${t('cover.sizeHint')}</p>
            `;
        }
        if (removeBtn) removeBtn.style.display = 'none';
        showToast(t('cover.removed'));
    };

    window.saveMetadata = async () => {
        const title = document.getElementById('book-title').value;
        const author = document.getElementById('book-author').value;

        try {
            await fetch('/api/update-metadata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, author })
            });
            showToast(t('metadata.saved'), 'success');
            refreshStats();
        } catch (error) {
            showToast(t('metadata.saveError'), 'error');
        }
    };

    function renderStep3(ebook) {
        if (!ebook) return renderStep1();
        const contentArea = document.getElementById('workspace-content');
        let html = `
            <div class="chapter-list-glass">
                <div class="chapter-actions-bar">
                    <button class="btn-glass" onclick="addNewChapter()">${t('chapter.add')}</button>
                </div>
        `;
        ebook.chapters.forEach((ch, index) => {
            html += `
                <div class="chapter-card-glass" data-index="${index}">
                    <div class="chapter-drag-handle">⋮⋮</div>
                    <div class="chapter-info">
                        <h3>${ch.title}</h3>
                        <p>${ch.content.substring(0, 100).replace(/<[^>]*>/g, '')}...</p>
                    </div>
                    <div class="chapter-buttons">
                        <button class="btn-icon btn-visual" onclick="openVisualEditor(${index})" title="${t('chapter.visualEditor')}">📄</button>
                        <button class="btn-icon" onclick="openChapterEditor(${index})" title="${t('chapter.quickEdit')}">✏️</button>
                        <button class="btn-icon btn-danger" onclick="deleteChapter(${index})" title="${t('chapter.delete')}">🗑️</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        // Add the editor modal
        html += `
            <div id="chapter-editor-modal" class="modal-overlay" style="display: none;">
                <div class="modal-glass">
                    <div class="modal-header">
                        <h2 id="modal-title">${t('chapter.editDefault')}</h2>
                        <button class="btn-icon" onclick="closeChapterEditor()">✖</button>
                    </div>
                    <div class="modal-body">
                        <label>${t('chapter.titleLabel')}</label>
                        <input type="text" id="editor-chapter-title" class="input-glass" placeholder="${t('chapter.titlePlaceholder')}">

                        <label>${t('chapter.imageLabel')}</label>
                        <div class="image-upload-area" id="chapter-image-drop">
                            <input type="file" id="chapter-image-input" accept="image/*" hidden>
                            <div id="chapter-image-preview"></div>
                            <button class="btn-glass-small" onclick="document.getElementById('chapter-image-input').click()">${t('chapter.addImage')}</button>
                        </div>

                        <label>${t('chapter.contentLabel')}</label>
                        <div class="editor-toolbar">
                            <button type="button" onclick="formatText('bold')"><b>B</b></button>
                            <button type="button" onclick="formatText('italic')"><i>I</i></button>
                            <button type="button" onclick="formatText('underline')"><u>U</u></button>
                            <button type="button" onclick="formatText('insertUnorderedList')">${t('chapter.list')}</button>
                        </div>
                        <div id="editor-chapter-content" class="rich-editor" contenteditable="true"></div>

                        <!-- Formatting cleanup panel -->
                        <div class="ai-assistant-bar">
                            <button class="btn-ai" onclick="refineWithAI()">${t('ai.button')}</button>
                            <button class="btn-ai" onclick="formatText('removeFormat')">${t('ai.suggest')}</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-glass" onclick="closeChapterEditor()">${t('chapter.cancel')}</button>
                        <button class="btn-glass btn-primary" onclick="saveChapter()">${t('chapter.save')}</button>
                    </div>
                </div>
            </div>
        `;
        contentArea.innerHTML = html;

        // Setup image upload handler
        const imgInput = document.getElementById('chapter-image-input');
        if (imgInput) {
            imgInput.addEventListener('change', handleChapterImageUpload);
        }
    }

    // Chapter editor state
    let currentEditingIndex = null;
    let currentChapterImage = null;

    window.openChapterEditor = async (index) => {
        currentEditingIndex = index;
        currentChapterImage = null;

        try {
            const state = await fetch('/api/state').then(r => r.json());
            const chapter = state.ebook.chapters[index];

            const modal = document.getElementById('chapter-editor-modal');
            if (modal) {
                document.getElementById('modal-title').textContent = t('chapter.editTitle', { title: chapter.title });
                document.getElementById('editor-chapter-title').value = chapter.title;
                document.getElementById('editor-chapter-content').innerHTML = chapter.content;
                document.getElementById('chapter-image-preview').innerHTML = '';
                modal.style.display = 'flex';

                // Real-time preview update
                document.getElementById('editor-chapter-content').addEventListener('input', () => {
                    debouncePreview();
                });
            }
        } catch (error) {
            console.error('Error opening chapter editor:', error);
            showToast(t('chapter.openError'), 'error');
        }
    };

    window.closeChapterEditor = () => {
        const modal = document.getElementById('chapter-editor-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        currentEditingIndex = null;
        currentChapterImage = null;
    };

    window.saveChapter = async () => {
        if (currentEditingIndex === null) return;

        const title = document.getElementById('editor-chapter-title').value;
        const content = document.getElementById('editor-chapter-content').innerHTML;

        try {
            const response = await fetch('/api/chapter/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    index: currentEditingIndex,
                    title: title,
                    content: content,
                    image: currentChapterImage
                })
            });

            if (response.ok) {
                showToast(t('chapter.saved'), 'success');
                closeChapterEditor();
                // Refresh step 3
                const state = await fetch('/api/state').then(r => r.json());
                renderStep3(state.ebook);
            } else {
                throw new Error('Save failed');
            }
        } catch (error) {
            console.error('Error saving chapter:', error);
            showToast(t('chapter.saveError'), 'error');
        }
    };

    window.deleteChapter = async (index) => {
        if (!confirm(t('chapter.deleteConfirm'))) return;

        try {
            const response = await fetch('/api/chapter/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index: index })
            });

            if (response.ok) {
                showToast(t('chapter.deleted'));
                const state = await fetch('/api/state').then(r => r.json());
                renderStep3(state.ebook);
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            console.error('Error deleting chapter:', error);
            showToast(t('chapter.deleteError'), 'error');
        }
    };

    window.addNewChapter = async () => {
        try {
            const response = await fetch('/api/chapter/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: t('chapter.newDefaultTitle'),
                    content: t('chapter.newDefaultContent')
                })
            });

            if (response.ok) {
                showToast(t('chapter.added'));
                const state = await fetch('/api/state').then(r => r.json());
                renderStep3(state.ebook);
            }
        } catch (error) {
            console.error('Add Chapter Error:', error);
            showToast(t('chapter.addError'), 'error');
        }
    };

    window.formatText = (command) => {
        document.execCommand(command, false, null);
    };

    function initDropZone() {
        const dropZone = document.getElementById('drop-zone');
        if (!dropZone) {
            console.error('[Arkana] Drop zone not found!');
            return;
        }

        const fileInput = document.getElementById('file-input');

        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.querySelector('.upload-glass').style.borderColor = '#38bdf8'; });
        dropZone.addEventListener('dragleave', () => { dropZone.querySelector('.upload-glass').style.borderColor = 'rgba(255, 255, 255, 0.08)'; });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]);
        });
        dropZone.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });

        // Attach change listener to the newly created file input
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                }
            });
        } else {
            console.error('[Arkana] File input not found!');
        }
    }

    // Export helpers for HTML onclicks
    window.selectTheme = async (id) => {
        showToast(t('theme.selected', { id }));

        try {
            await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selected_theme: id })
            });

            // Auto-advance to Editor
            setTimeout(() => {
                const step3Nav = document.querySelector('.nav-item[data-step="3"]');
                if (step3Nav) updateStepView('3', step3Nav);
                updatePreview(); // Update preview with new theme
            }, 800);
        } catch (error) {
            console.error('Theme Selection Error:', error);
        }
    };

    // Connect next button with smart logic
    const btnNext = document.getElementById('btn-next');
    if (btnNext) {
        btnNext.addEventListener('click', async () => {
            const currentStep = document.querySelector('.nav-item.active').getAttribute('data-step');

            // Validate before proceeding
            if (currentStep === '1') {
                const state = await fetch('/api/state').then(r => r.json());
                if (!state.ebook) {
                    showToast(t('nextBtn.needsImport'), 'error');
                    return;
                }
            }

            const nextStep = (parseInt(currentStep) + 1).toString();
            const nextNav = document.querySelector(`.nav-item[data-step="${nextStep}"]`);
            if (nextNav) {
                updateStepView(nextStep, nextNav);
                updateNextButton(nextStep);
            }
        });
    }

    const btnTogglePreview = document.getElementById('btn-toggle-preview');
    if (btnTogglePreview) {
        btnTogglePreview.addEventListener('click', () => {
            window.togglePreview();
        });
    }

    function updateNextButton(currentStep) {
        const btnNext = document.getElementById('btn-next');
        if (!btnNext) return;

        const labels = {
            '1': t('nextBtn.step1'),
            '2': t('nextBtn.step2'),
            '3': t('nextBtn.step3'),
            '4': '' // Hide on last step
        };

        if (currentStep === '4') {
            btnNext.style.display = 'none';
        } else {
            btnNext.style.display = 'inline-flex';
            btnNext.textContent = labels[currentStep] || t('header.next.default');
        }
    }

    async function renderStep4() {
        const contentArea = document.getElementById('workspace-content');
        contentArea.innerHTML = `
            <div class="export-dashboard">
                <h2 class="hero-glow" style="font-size: 2rem;">${t('export.heading')}</h2>
                <div class="export-grid">
                    <button class="export-card-glass" onclick="exportEbook('pdf')">
                        <div class="export-icon">📄</div>
                        <h3>${t('export.pdfTitle')}</h3>
                        <p>${t('export.pdfDesc')}</p>
                    </button>
                    <button class="export-card-glass" onclick="exportEbook('epub')">
                        <div class="export-icon">📱</div>
                        <h3>${t('export.epubTitle')}</h3>
                        <p>${t('export.epubDesc')}</p>
                    </button>
                </div>
            </div>
        `;
    }

    window.exportEbook = async (format) => {
        showLoadingOverlay(t('export.generating', { format: format.toUpperCase() }));
        try {
            const response = await fetch(`/api/export?format=${format}`, { method: 'POST' });
            const result = await response.json();
            hideLoadingOverlay();

            if (response.ok) {
                lastExportedFile = result;
                showToast(t('export.success'), 'success');

                // Show download area in Step 4
                const contentArea = document.getElementById('workspace-content');
                const existingDownload = document.getElementById('download-area');
                if (existingDownload) existingDownload.remove();

                const downloadHTML = `
                    <div id="download-area" class="download-area">
                        <h3>${t('export.doneHeading', { format: format.toUpperCase() })}</h3>
                        <p>${t('export.ready')}</p>
                        <a href="${result.path}" download="${result.file}" class="btn-download">
                            ${t('export.download', { file: result.file })}
                        </a>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 10px;">
                            ${t('export.savedAt', { file: result.file })}
                        </p>
                    </div>
                `;
                contentArea.insertAdjacentHTML('beforeend', downloadHTML);

                // Refresh stats after export
                refreshStats();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            hideLoadingOverlay();
            showToast(t('export.error', { message: error.message }), 'error');
        }
    };

    window.startNewSession = async () => {
        if (confirm(t('session.newConfirm'))) {
            showToast(t('session.starting'));
            try {
                await fetch('/api/new-session', { method: 'POST' });
                // Reset to step 1
                const navItem = document.querySelector('.nav-item[data-step="1"]');
                if (navItem) {
                    navItem.click();
                }
                showToast(t('session.started'), 'success');
            } catch (e) {
                showToast(t('session.error'), 'error');
            }
        }
    };

    window.shutdownApp = async () => {
        if (confirm(t('shutdown.confirm'))) {
            showToast(t('shutdown.closing'));
            try {
                await fetch('/api/shutdown', { method: 'POST' });
                window.close();
            } catch (e) {
                // If the server dies, the fetch might fail, which is expected
                window.close();
            }
        }
    };

    async function handleFileUpload(file) {
        const dropZone = document.getElementById('drop-zone');
        if (!dropZone) {
            console.error('[Arkana] Drop zone not found during upload!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const uploadInner = dropZone.querySelector('.upload-glass');
        const originalHTML = uploadInner.innerHTML;
        uploadInner.innerHTML = `<div class="upload-icon">⏳</div><h3>${t('upload.processing.title')}</h3><p>${t('upload.processing.sub')}</p>`;

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (response.ok) {
                showToast(t('importSuccess', { title: result.title }));
                // Smooth transition to Step 2
                setTimeout(() => {
                    const step2Nav = document.querySelector('.nav-item[data-step="2"]');
                    if (step2Nav) updateStepView('2', step2Nav);
                }, 1000);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Upload Error:', error);
            showToast(t('importError', { message: error.message }), 'error');
            uploadInner.innerHTML = originalHTML;
        }
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // Connect hidden input (initial static markup)
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }

    function handleChapterImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            currentChapterImage = event.target.result;
            document.getElementById('chapter-image-preview').innerHTML =
                `<img src="${currentChapterImage}" style="max-width: 200px; border-radius: 8px; margin: 10px 0;">`;
        };
        reader.readAsDataURL(file);
    }

    // =============================================
    // VISUAL PAGE EDITOR (Canva-Style)
    // =============================================
    let visualEditorChapterIndex = null;
    let visualEditorImages = [];
    let selectedImageIndex = null;
    let isDragging = false;
    let isResizing = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    window.openVisualEditor = async (chapterIndex) => {
        visualEditorChapterIndex = chapterIndex;
        visualEditorImages = [];

        try {
            const state = await fetch('/api/state').then(r => r.json());
            const chapter = state.ebook.chapters[chapterIndex];
            const settings = state.settings || {};

            // Load existing images if any
            if (chapter.images) {
                visualEditorImages = chapter.images;
            }

            renderVisualEditor(chapter, settings, state.ebook.chapters);
        } catch (error) {
            console.error('Error opening visual editor:', error);
            showToast(t('visual.openError'), 'error');
        }
    };

    function renderVisualEditor(chapter, settings, allChapters) {
        const contentArea = document.getElementById('workspace-content');

        contentArea.innerHTML = `
            <div class="visual-editor-container">
                <!-- Sidebar with chapters -->
                <div class="visual-sidebar">
                    <h3>${t('visual.chaptersHeading')}</h3>
                    <div class="chapter-nav-list">
                        ${allChapters.map((ch, i) => `
                            <button class="chapter-nav-btn ${i === visualEditorChapterIndex ? 'active' : ''}"
                                    onclick="switchVisualChapter(${i})">
                                ${ch.title.substring(0, 25)}${ch.title.length > 25 ? '...' : ''}
                            </button>
                        `).join('')}
                    </div>
                    <hr class="divider">
                    <h3>${t('visual.toolsHeading')}</h3>
                    <button class="tool-btn" onclick="document.getElementById('visual-image-input').click()">
                        ${t('visual.addImage')}
                    </button>
                    <input type="file" id="visual-image-input" accept="image/*" hidden>
                    <button class="tool-btn" onclick="insertTextBlock()">${t('visual.textBlock')}</button>
                    <hr class="divider">
                    <h3>${t('visual.zoomHeading')}</h3>
                    <div class="zoom-controls">
                        <button class="zoom-btn" onclick="zoomCanvas(0.9)">−</button>
                        <span id="zoom-level">100%</span>
                        <button class="zoom-btn" onclick="zoomCanvas(1.1)">+</button>
                    </div>
                </div>

                <!-- Main canvas area -->
                <div class="visual-canvas-wrapper" id="canvas-wrapper">
                    <div class="page-canvas" id="page-canvas" style="transform: scale(1);">
                        <!-- Page margins overlay -->
                        <div class="margin-overlay"></div>

                        <!-- Page header -->
                        <div class="page-header">
                            <span class="chapter-number">${t('visual.chapterLabel', { n: visualEditorChapterIndex + 1 })}</span>
                        </div>

                        <!-- Chapter title -->
                        <h1 class="page-title" contenteditable="true" id="visual-title">${chapter.title}</h1>

                        <!-- Page content - editable -->
                        <div class="page-content" contenteditable="true" id="visual-content">
                            ${chapter.content}
                        </div>

                        <!-- Dropped images container -->
                        <div id="images-layer"></div>

                        <!-- Page footer -->
                        <div class="page-footer">
                            <span class="page-number">${visualEditorChapterIndex + 1}</span>
                        </div>
                    </div>
                </div>

                <!-- Floating toolbar -->
                <div class="floating-format-toolbar" id="format-toolbar">
                    <button onclick="formatVisual('bold')"><b>B</b></button>
                    <button onclick="formatVisual('italic')"><i>I</i></button>
                    <button onclick="formatVisual('underline')"><u>U</u></button>
                    <button onclick="formatVisual('justifyLeft')">⬅</button>
                    <button onclick="formatVisual('justifyCenter')">⬌</button>
                    <button onclick="formatVisual('justifyRight')">➡</button>
                </div>

                <!-- Action bar -->
                <div class="visual-action-bar">
                    <button class="btn-glass" onclick="closeVisualEditor()">${t('visual.back')}</button>
                    <div class="action-group">
                        <button class="btn-glass" onclick="previewPage()">${t('visual.preview')}</button>
                        <button class="btn-glass btn-primary" onclick="saveVisualChanges()">${t('visual.save')}</button>
                    </div>
                </div>
            </div>
        `;

        // Render existing images
        renderImagesOnCanvas();

        // Setup event listeners
        setupVisualEditorEvents();
    }

    function renderImagesOnCanvas() {
        const imagesLayer = document.getElementById('images-layer');
        if (!imagesLayer) return;

        imagesLayer.innerHTML = visualEditorImages.map((img, index) => `
            <div class="canvas-image ${selectedImageIndex === index ? 'selected' : ''}"
                 data-index="${index}"
                 style="left: ${img.x}px; top: ${img.y}px; width: ${img.width}px; height: ${img.height}px;">
                <img src="${img.src}" alt="Image ${index}">
                <div class="resize-handle" data-index="${index}"></div>
                <button class="delete-image-btn" onclick="deleteVisualImage(${index})">✖</button>
            </div>
        `).join('');
    }

    function setupVisualEditorEvents() {
        // Image input change
        const imgInput = document.getElementById('visual-image-input');
        if (imgInput) {
            imgInput.addEventListener('change', handleVisualImageAdd);
        }

        // Canvas drop zone for images
        const canvas = document.getElementById('page-canvas');
        if (canvas) {
            canvas.addEventListener('dragover', (e) => {
                e.preventDefault();
                canvas.classList.add('drag-over');
            });
            canvas.addEventListener('dragleave', () => {
                canvas.classList.remove('drag-over');
            });
            canvas.addEventListener('drop', handleCanvasDrop);

            // Image dragging
            canvas.addEventListener('mousedown', handleImageMouseDown);
            canvas.addEventListener('mousemove', handleImageMouseMove);
            canvas.addEventListener('mouseup', handleImageMouseUp);
        }

        // Show format toolbar on text selection
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            const toolbar = document.getElementById('format-toolbar');
            if (!toolbar) return;
            if (selection.rangeCount > 0 && !selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                toolbar.style.display = 'flex';
                toolbar.style.top = (rect.top - 50) + 'px';
                toolbar.style.left = rect.left + 'px';
            } else {
                toolbar.style.display = 'none';
            }
        });
    }

    function handleVisualImageAdd(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const newImage = {
                src: event.target.result,
                x: 50,
                y: 200,
                width: 200,
                height: 150
            };
            visualEditorImages.push(newImage);
            renderImagesOnCanvas();
            showToast(t('visual.imageAddedDrag'));
        };
        reader.readAsDataURL(file);
    }

    function handleCanvasDrop(e) {
        e.preventDefault();
        const canvas = document.getElementById('page-canvas');
        canvas.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const rect = canvas.getBoundingClientRect();
                const newImage = {
                    src: event.target.result,
                    x: e.clientX - rect.left - 100,
                    y: e.clientY - rect.top - 75,
                    width: 200,
                    height: 150
                };
                visualEditorImages.push(newImage);
                renderImagesOnCanvas();
                showToast(t('visual.imageAdded'));
            };
            reader.readAsDataURL(files[0]);
        }
    }

    function handleImageMouseDown(e) {
        // Check if clicking on resize handle
        const resizeHandle = e.target.closest('.resize-handle');
        if (resizeHandle) {
            e.preventDefault();
            e.stopPropagation();
            selectedImageIndex = parseInt(resizeHandle.dataset.index);
            isResizing = true;
            isDragging = false;
            return;
        }

        const imageEl = e.target.closest('.canvas-image');
        if (imageEl) {
            e.preventDefault();
            selectedImageIndex = parseInt(imageEl.dataset.index);
            isDragging = true;
            isResizing = false;
            const rect = imageEl.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            renderImagesOnCanvas();
        }
    }

    function handleImageMouseMove(e) {
        const canvas = document.getElementById('page-canvas');
        const rect = canvas.getBoundingClientRect();

        // Handle resizing
        if (isResizing && selectedImageIndex !== null) {
            const img = visualEditorImages[selectedImageIndex];
            const newWidth = Math.max(50, e.clientX - rect.left - img.x);
            const newHeight = Math.max(50, e.clientY - rect.top - img.y);

            visualEditorImages[selectedImageIndex].width = newWidth;
            visualEditorImages[selectedImageIndex].height = newHeight;

            const imageEl = document.querySelector(`.canvas-image[data-index="${selectedImageIndex}"]`);
            if (imageEl) {
                imageEl.style.width = newWidth + 'px';
                imageEl.style.height = newHeight + 'px';
            }
            return;
        }

        // Handle dragging
        if (isDragging && selectedImageIndex !== null) {
            const x = e.clientX - rect.left - dragOffsetX;
            const y = e.clientY - rect.top - dragOffsetY;

            visualEditorImages[selectedImageIndex].x = Math.max(0, x);
            visualEditorImages[selectedImageIndex].y = Math.max(0, y);

            const imageEl = document.querySelector(`.canvas-image[data-index="${selectedImageIndex}"]`);
            if (imageEl) {
                imageEl.style.left = visualEditorImages[selectedImageIndex].x + 'px';
                imageEl.style.top = visualEditorImages[selectedImageIndex].y + 'px';
            }
        }
    }

    function handleImageMouseUp() {
        isDragging = false;
        isResizing = false;
    }

    window.deleteVisualImage = (index) => {
        visualEditorImages.splice(index, 1);
        selectedImageIndex = null;
        renderImagesOnCanvas();
        showToast(t('visual.imageRemoved'));
    };

    window.formatVisual = (command) => {
        document.execCommand(command, false, null);
    };

    window.zoomCanvas = (factor) => {
        const canvas = document.getElementById('page-canvas');
        const currentScale = parseFloat(canvas.style.transform.replace('scale(', '').replace(')', '')) || 1;
        const newScale = Math.min(Math.max(currentScale * factor, 0.5), 2);
        canvas.style.transform = `scale(${newScale})`;
        document.getElementById('zoom-level').textContent = Math.round(newScale * 100) + '%';
    };

    window.switchVisualChapter = async (index) => {
        // Save current changes first
        await saveVisualChanges(false);
        // Open new chapter
        openVisualEditor(index);
    };

    window.insertTextBlock = () => {
        const content = document.getElementById('visual-content');
        if (content) {
            const newBlock = document.createElement('p');
            newBlock.textContent = t('visual.newTextBlock');
            newBlock.style.padding = '10px';
            newBlock.style.border = '1px dashed rgba(255,255,255,0.2)';
            content.appendChild(newBlock);
        }
    };

    window.previewPage = async () => {
        try {
            const response = await fetch('/api/preview');
            const data = await response.json();

            // Open preview in new window
            const previewWindow = window.open('', '_blank', 'width=800,height=1000');
            previewWindow.document.write(data.html);
        } catch (error) {
            console.error('Preview error:', error);
            showToast(t('visual.previewError'), 'error');
        }
    };

    window.saveVisualChanges = async (showNotification = true) => {
        const title = document.getElementById('visual-title')?.textContent || '';
        const content = document.getElementById('visual-content')?.innerHTML || '';

        try {
            const response = await fetch('/api/chapter/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    index: visualEditorChapterIndex,
                    title: title,
                    content: content,
                    images: visualEditorImages
                })
            });

            if (response.ok && showNotification) {
                showToast(t('visual.changesSaved'));
            }
        } catch (error) {
            console.error('Save error:', error);
            if (showNotification) showToast(t('visual.saveError'), 'error');
        }
    };

    window.closeVisualEditor = async () => {
        // Auto-save before closing
        await saveVisualChanges(false);

        // Return to chapter list
        const state = await fetch('/api/state').then(r => r.json());
        renderStep3(state.ebook);
    };

    // Initialize
    initDropZone();
});
