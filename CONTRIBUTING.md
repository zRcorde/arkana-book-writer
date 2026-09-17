<!-- Arkana Book Writer — buymeacoffee.com/re_code | contact@rewebfolio.xyz -->

# Contributing to Arkana Book Writer

Thanks for your interest in contributing! Arkana is maintained independently and any help is welcome.

## Reporting bugs

Open an [issue](../../issues) describing:

- What you expected to happen versus what actually happened.
- Steps to reproduce (which document was imported, which theme, which export format).
- Operating system and Python/Node version.
- If possible, the sample file that caused the problem (with no sensitive data).

## Suggesting features

Open an issue explaining the problem the feature would solve — not just the implementation you have in mind. This helps evaluate whether it fits the project's philosophy (local-first, no cloud dependency, no cost).

## Submitting a Pull Request

1. Fork the repo and create a branch from `main`.
2. Set up your local environment following [INSTALL_GUIDE.md](INSTALL_GUIDE.md).
3. Run the app and manually test the affected flow (import → style → export) before opening the PR — there's no automated test suite yet.
4. Describe in the PR what changed and why, not just a line-by-line diff summary.
5. Keep the PR focused on a single logical change.

## Code style

- Python: follow the `.ruff.toml` already configured in the repo (`ruff check .`).
- Avoid introducing new dependencies without a real need — the project values staying light and 100% local.
- Code comments should explain *why*, not *what* (function/variable names should already make that clear).

## Project scope

Arkana is intentionally local-first and free. PRs that introduce telemetry, user accounts, dependency on paid external services, or data collection will not be accepted.

## Questions

Partnerships or questions outside the normal issue flow: [contact@rewebfolio.xyz](mailto:contact@rewebfolio.xyz)
