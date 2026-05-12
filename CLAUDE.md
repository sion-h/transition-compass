# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test suite is configured.

Deployment is automatic: pushing to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages at the base path `/transition-compass/`.

## Architecture

React 19 SPA built with Vite, styled with Tailwind CSS 4. The app is a Korean gender transition self-assessment guide supporting two languages (Korean/English) and two pathways (MTF/FTM).

**Navigation model:** `App.jsx` manages a three-mode view (`home` → `assessment` or `info`) without a router — mode is tracked in local state.

**State management via React Context:**
- `src/contexts/AssessmentContext.jsx` — All assessment data (per-category scores, mental health conditions, pathway selection, cost estimates) managed with `useReducer`. State is persisted to `localStorage` under the key `assessment-state`.
- `src/contexts/LanguageContext.jsx` — Active language (`ko`/`en`) with browser detection and `localStorage` persistence under key `language`. Provides a `t(key)` helper that resolves strings from `src/locales/translations.js`.

**Feature modules** (`src/features/`):
- `home/` — Landing page
- `assessment/` — 6-step wizard: dysphoria (8 items) → euphoria (5) → context (5) → mental health (7 conditions) → costs → results
- `info/` — Pathway-specific reference pages (timeline, medical, cost calculator, social/legal)

**Shared utilities** (`src/shared/`):
- `constants/defaults.js` — Default scores, KRW cost values for MTF and FTM, mental health condition list, time patterns
- `utils/calculations.js` — Score and cost computations
- `utils/recommendations.js` — Recommendation logic based on assessment results
- `components/` — `ProgressBar`, `ScoreSlider`, `Warning`

**i18n:** All user-facing strings live in `src/locales/translations.js` as a flat key → `{ko, en}` map (400+ keys). Always add both `ko` and `en` entries when adding new strings, and access them through the `t()` helper from `LanguageContext`.

**Base path:** `vite.config.js` sets `base: '/transition-compass/'` — all asset paths must be relative or use the Vite `import.meta.env.BASE_URL` convention.
