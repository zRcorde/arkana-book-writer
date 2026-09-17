<!-- Arkana Book Writer — buymeacoffee.com/re_code | contact@rewebfolio.xyz -->

# About Arkana Book Writer

## What it is

Arkana Book Writer is an e-book creation studio that runs **100% on your machine** — nothing is sent to external servers. You import a document (`.docx`, `.pdf`, or `.md`), pick from 40 publishing themes, adjust the cover, title, and author, and export a **PDF** or **EPUB** ready to publish.

The goal is to solve a common problem: turning a plain manuscript into something that looks professional, without relying on paid tools, subscriptions, or uploading your content to the cloud.

## Why it exists

The project came out of the need for a fast, local, frictionless tool to format e-books — without waiting on cloud processing, without sending drafts to third-party servers, and without paying for a SaaS to do a job your own machine is already capable of.

## How it works (technical overview)

- **Backend**: a local FastAPI (Python) service handles document parsing and generates the final files.
- **PDF generation**: WeasyPrint renders each theme's HTML into a high-fidelity PDF.
- **EPUB generation**: `ebooklib` builds the EPUB package directly from the structured content.
- **Interface**: HTML/CSS/JS served locally, with automatic language detection (EN/PT/ES) and no account or login required.
- **Desktop packaging**: an optional Electron window wraps the same local backend, for anyone who prefers a native app over a browser tab.

No step in the process depends on an internet connection, except the optional download of the Google Fonts used by the themes.

## Sustainment model

Arkana **is not sold**. It's maintained independently and sustained only through voluntary donations (Buy Me a Coffee, USDC/Solana, or BTC — see the README). There's no paywall, no locked "pro" tier, and no data collection for monetization.

## Contact

Partnerships, suggestions, or bug reports: [contact@rewebfolio.xyz](mailto:contact@rewebfolio.xyz)
