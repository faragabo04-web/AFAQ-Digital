# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at http://127.0.0.1:5173
npm run build     # Production build to dist/
npm run preview   # Serve the built output
```

No linting, testing, or TypeScript is configured.

## Architecture

Single-page React + Vite landing site for AFAQ Digital agency (Dubai). No CSS framework — all styles live in `src/index.css` using custom CSS variables.

**State management** — `App.jsx` owns `lang` (`"en"` | `"ar"`) and `theme` (`"dark"` | `"light"`) state, persists both to `localStorage`, and sets `document.documentElement.dir`/`lang` for RTL support. Every section component receives a single `t` prop (the current-language content slice).

**Content** — all UI copy for both languages is in `src/data/content.js`, which exports:
- `content` — nested object with `en` and `ar` keys; each mirrors the same shape so components stay language-agnostic
- Contact/social constants (`WHATSAPP_NUMBER`, `WHATSAPP_URL`, `LINKEDIN_URL`, `PHONE_DISPLAY`, etc.)
- `navLinks` — shared nav items with both `en`/`ar` labels

To add or change any visible text, edit only `src/data/content.js` — both language blocks must stay in sync.

**Component pattern** — each page section is a standalone component in `src/components/` that destructures what it needs from `t`. No global state library; no context.

**RTL** — Arabic layout is handled entirely via CSS (`body[data-lang="ar"]` selectors and the `dir` attribute set by App). When adding new layout styles, verify they render correctly in both directions.

## Known TODOs in the code

- `Contact.jsx` — the form submission is not wired to a backend yet (`// TODO: Connect this form...`)
- `content.js` — `GOOGLE_FORM_URL` is set to `"TODO_ADD_GOOGLE_FORM_URL"`
- Portfolio items `M&M's Play Area` and `Beauty Pets` have `todo: "TODO_ADD_*_URL"` properties; their buttons show "Coming Soon"
