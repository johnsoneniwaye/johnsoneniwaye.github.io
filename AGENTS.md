# Coding assistant handoff

This repository is Johnson’s independent, static GitHub Pages portfolio. Preserve the approved white/cobalt design, minimal Home/Work/Contact navigation, 19 original YouTube projects, CSS 3D film stack and reel, scroll entrances, accessible modal, and reduced-motion behavior unless the user asks for changes.

`content.json` is the content authority. `app.js` applies its settings to the initial HTML and loads its projects. If changing the initial HTML copy, keep the content authority consistent. Public visitors see only published projects. The editor at `/admin.html` prepares local changes; publishing requires the repository owner/collaborator to commit the downloaded content file through authenticated GitHub. Do not add a fake browser login, public write API, hardcoded token, password or ChatGPT dependency. No backend runs on Pages.

All new user text must be inserted as DOM text, not unescaped HTML. Validate YouTube hosts and 11-character IDs. Keep email and WhatsApp links usable, modal keyboard focus working, iframe removed on close, and content visible with reduced motion or without IntersectionObserver.

Run JS syntax checks and validate JSON. For UI edits, check navigation, filtering, load more, video dialog, keyboard access, and mobile layout as available. Use no paid services without authorization. Only publish content intended for public viewing. Never include private drafts, tokens, cookies, auth bindings or credentials. The original server-backed source remains in the separate private `jason-portfolio` repository and must not be made public.
