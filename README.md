# Johnson’s portfolio

Public website: https://johnsoneniwaye.github.io/

This is the active GitHub Pages website source. The complete previous server-backed app remains in the private `johnsoneniwaye/jason-portfolio` repository. This static version uses no ChatGPT services, database, account, or subscription. Videos are embedded from YouTube.

## Update videos and page text

The public editor is retired. The portfolio has no management link, and `/admin.html` redirects to the homepage. Make future updates through authenticated GitHub.

1. Upload videos to YouTube as public or unlisted, with embedding enabled.
2. Connect a coding assistant to `johnsoneniwaye/johnsoneniwaye.github.io` and tell it to read `AGENTS.md`.
3. Provide the video links and titles. Ask it to update `content.json` while preserving the current projects and design.
4. Review and commit the changes to `main`. If the assistant cannot write to GitHub, upload its changed files to this repository yourself.
5. Wait for GitHub Pages to publish, then refresh the portfolio.

Only people with repository write permission can publish changes. Do not commit private client work or credentials.

## Future edits with Claude, ChatGPT or another coding assistant

Connect your GitHub account and select `johnsoneniwaye/johnsoneniwaye.github.io`, or clone/download this repository. Tell the assistant to read `AGENTS.md` and preserve the YouTube editing workflow. Review its changes and commit them here. GitHub Pages republishes the site. A repository integration in another assistant may be read-only; use its coding tool or upload the changed files to GitHub in that case.

Example request:

> Read this repository and AGENTS.md. Update [describe the change], preserve the existing design, video player and GitHub publishing workflow, and show me the changes before publishing.

## Structure

- `index.html`: public page markup and initial content.
- `content.json`: published page settings and YouTube project links. This file is the content authority.
- `app.js`: gallery, video playback, content loading and interactions.
- `styles.css`: responsive design and reduced-motion support.
- Local fonts and fallback artwork are stored at the repository root.
- `admin.html`: redirects the retired editor URL to the portfolio. `editor.js` and `editor.css` are legacy assets, not loaded by any active page.

No build step is required. Serve the root with any static server to preview. Relative site location is the root GitHub user site. Pages publishes `main` from `/ (root)`. `.nojekyll` disables Jekyll processing. No secrets or credentials belong in this repository.

