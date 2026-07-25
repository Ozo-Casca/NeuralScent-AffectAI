# AGENTS.md

## Project

React 19 + TypeScript 6 + Vite SPA for "Spryb Digital" design studio. Tailwind CSS v4, framer-motion v12, Lenis smooth scroll, react-router-dom v7, react-helmet-async for SEO.

## Commands

- `npm run dev` — Vite dev server on port **5000** (`host: true`, `allowedHosts: true`)
- `npm run build` — `tsc -b && vite build` (fix TS first or build fails)
- `npm run lint` — **oxlint** (NOT eslint — no `.eslintrc`)
- `npm run preview` — serves `dist/`
- No test or format scripts exist.

Image optimization (manual, not wired to npm scripts):
- `node scripts/compress-images.mjs` — recompresses webp images via `sharp` (quality: 70)
- `node scripts/optimize-images.mjs`
- `node scripts/convert-public.mjs`

## TypeScript

Two tsconfigs linked by project references (`tsc -b`):
- `tsconfig.app.json` — `src/`, strict, `types: ["vite/client"]`, JSX react-jsx
- `tsconfig.node.json` — `vite.config.ts`, `module: "nodenext"`

**Fail the build if violated:**
- `verbatimModuleSyntax: true` — type-only imports MUST use `import type { X }`
- `erasableSyntaxOnly: true` — no `enum`, no parameter properties, no `namespace`

## Tailwind CSS v4

No config file. `@tailwindcss/vite` plugin. Custom theme via `@theme` in `src/index.css` (colors: lime-accent, bg-primary, bg-secondary, text-primary, text-muted, border, green, yellow).

## Linter

`.oxlintrc.json` — plugins: react, typescript, oxc. Rules: `react/rules-of-hooks` (error), `react/only-export-components` (warn, allows constant exports).

## Architecture

```
src/
  data/         — content.ts (all site text) + processData.ts (process cards)
  components/   — UI sections, animations/, Layout.tsx, Nav.tsx
  hooks/        — useLenis, useMousePosition, useScrollProgress, useIsMobile, useReducedMotion
  pages/        — Home (eager), PortfolioPage + FounderFeedPage (lazy via Suspense)
```

All routes under `/en` via `HashRouter`: `/#/en`, `/#/en/portfolio`, `/#/en/founder-feed`. Root `/` → `/#/en`. `*` → NotFound.

## Key patterns

- **Content source**: `src/data/content.ts` for site text; `src/data/processData.ts` for process cards.
- **Contact form**: uses `VITE_WEB3FORMS_KEY` from `.env` (see `.env.example`). Silently fails without it.
- **Images**: all local images are Vite-bundled via `src/assets/images/index.ts` barrel module. Do NOT use external image URLs. `public/images/` only has `hero-poster.jpg`/`.webp` and `og-image.png`/`.webp`.
- **Client logos**: `src/assets/logos/` holds 8 client logo webps used by the marquee component.
- **Hero video**: bundled as a local mp4 file in `src/assets/` (not from `public/`).
- **SEO**: use `react-helmet-async` `<Helmet>` for per-page meta tags.
- **Elfsight widget**: loaded in `index.html` via `platform.js` script.
- **Entry point**: `src/main.tsx` → `App.tsx`. `App.tsx` defines `LenisProvider`, `ErrorBoundary`, `NotFound`, and all routes.
- **Layout**: `Layout.tsx` wraps pages with `Nav` + `Footer` + `PageTransition` (framer-motion AnimatePresence). All pages use it.
- **Page composition**: each page uses `<> <Helmet>…</Helmet> <Layout>…</Layout> </>`.
- **Custom cursor**: `CustomCursor.tsx` — lime-accent dot, scales on hover, hidden on touch.
- **Lenis scroll**: `LenisProvider` in `App.tsx` wraps `<Routes>`. Access the instance via `useContext(LenisContext)` from `src/hooks/useLenis.ts`.
- **Error boundary**: class component in `App.tsx` catches runtime errors.
- **vite.config.ts quirk**: `@ts-ignore` used on `compression()` calls (gzip + brotli).

## Build output

`vite.config.ts` splits production JS into `vendor` (react, react-dom, react-router-dom), `motion` (framer-motion), `index` (app code), and lazy page chunks.

## Hostinger deployment

1. Copy `dist/` contents to `public_html` (or deploy via Hostinger Git).
2. SPA routing handled by `public/.htaccess` (Apache rewrite rules).
3. Set `VITE_WEB3FORMS_KEY` env var on Hostinger before building.
4. `public/_redirects` (Netlify) and `.htaccess` (Apache) can coexist — each host ignores the other's file.
5. External assets: hero video loads from same-domain WordPress (`wp-content/uploads/`), OG image from `public/images/`.

## Style notes

- No formatter — inconsistent semicolons/quotes across files is intentional.
