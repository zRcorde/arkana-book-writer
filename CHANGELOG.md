<!-- Arkana Book Writer — buymeacoffee.com/re_code | contact@rewebfolio.xyz -->

# Changelog

All notable changes to Arkana Book Writer are documented here.

## [1.5.0] — 2026-09-17

### Added
- English and Spanish support (auto-detected from the browser language, no manual switcher).
- In-app donation panel (Buy Me a Coffee, USDC/Solana, BTC) and a partnerships contact.
- Official application icon (window, packaged executable, and favicon).
- `ABOUT.md`, `INSTALL_GUIDE.md`, and `CHANGELOG.md`.

### Fixed
- Theme styles not applying correctly to imported documents in some cases.
- Cover title and author text not rendering in exported PDFs.
- Two theme color combinations with insufficient contrast between text and background.
- Special characters extracted from `.docx`/`.pdf` sources not being escaped before rendering.
- Ctrl+R / F5 not reloading the Electron window.
- E-book title defaulting to a placeholder instead of the original file name.

### Removed
- Unused licensing and update-check code paths that weren't reachable from the UI.
- Duplicate PyInstaller + Inno Setup packaging path; Electron is the only supported installer.

## [1.0.0] and earlier

Initial development of the document parser, PDF/EPUB generator, and the 40-theme catalog.
