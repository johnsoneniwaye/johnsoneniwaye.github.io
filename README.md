# Jason’s portfolio

Public website: https://clarion128838.github.io/

This is the active GitHub Pages website source. The complete previous server-backed app remains in the private `clarion128838/jason-portfolio` repository. This static version uses no ChatGPT services, database, account, or subscription. Videos are embedded from YouTube.

## Update videos and page text

1. Open https://clarion128838.github.io/admin.html and edit the form.
2. Choose **Download update** to get `content.json`.
3. Choose **Publish on GitHub**, sign in to your GitHub account, upload `content.json` at the repository root, and commit the change.
4. Wait for GitHub Pages to publish, then refresh the public website.

Only repository collaborators with write permission can publish changes. Anyone can see the static editor, but it cannot write to the repository or affect the public site without GitHub authorization. Drafts are saved only in the current browser. Hidden projects remain in local drafts and are excluded from the downloaded public content. The repository contains only published data; do not commit private client work or credentials.

The old ChatGPT admin edits only the old website. Use this GitHub editor for this website.

## Future edits with Claude, ChatGPT or another coding assistant

Connect your GitHub account and select `clarion128838/clarion128838.github.io`, or clone/download this repository. Tell the assistant to read `AGENTS.md` and preserve the YouTube editing workflow. Review its changes and commit them here. GitHub Pages republishes the site. A repository integration in another assistant may be read-only; use its coding tool or upload the changed files to GitHub in that case.

Example request:

> Read this repository and AGENTS.md. Update [describe the change], preserve the existing design, video player and content editor, and show me the changes before publishing.

## Structure

- `index.html`: public page markup and initial content.
- `content.json`: published page settings and YouTube project links. This file is the content authority.
- `app.js`: gallery, video playback, content loading and interactions.
- `styles.css`: responsive design and reduced-motion support.
- Local fonts and fallback artwork are stored at the repository root.
- `admin.html`, `editor.js`, `editor.css`: local content editor with GitHub publishing instructions.

No build step is required. Serve the root with any static server to preview. Relative site location is the root GitHub user site. Pages publishes `main` from `/ (root)`. `.nojekyll` disables Jekyll processing. No secrets or credentials belong in this repository.
