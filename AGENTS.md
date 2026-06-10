# Working in this repo

Marketing site for AUXO Data Labs. Astro 6 + TypeScript + Tailwind v4, deployed to Vercel.

Audience: skeptical B2B buyers in Gulf real estate and family offices. They skim, compare, then contact only once the page earns trust. Build for clarity, not animation noise or hydration bloat.

## Stack

- **Astro 6**, static output (`output: 'static'`). Pages prerender; only the Astro Actions in `src/actions/` run server-side.
- **Tailwind v4**, CSS-first (`@import "tailwindcss"`). Tokens in `src/styles/tokens.css` are the source of truth.
- **Pagefind** search (lazy-loaded), **Partytown** for GTM, **astro-icon**, **MDX** for Insights, **astro-og-canvas** for OG images.
- Single dark theme. Self-hosted, subset `woff2` fonts in `public/fonts/`.

## Layout

- `src/pages`, `src/layouts`, `src/components` — routes and composition
- `src/data` — page copy (edit content here, not in templates)
- `src/scripts` — browser behaviour
- `src/styles` — tokens + layered CSS via `main.css`
- `src/content/insights` — MDX articles
- `public` — static files shipped as-is (icons, manifest, service worker, fonts)
- `style_sheet` — brand reference

## Rules

- Default to static markup. Hydrate only where the interaction is real.
- Follow the existing structure before adding abstractions. Edit copy in `src/data/*.ts`.
- The `astro-icon` allowlist in `astro.config.mjs` is exact — add an icon name there before using it, or the build fails.
- Page-only CSS belongs in that page's frontmatter import, not global `main.css`.
- Motion is CSS-first and respects `prefers-reduced-motion`. Keep that intact.
- `public/` bypasses the build pipeline — keep it standards-based and self-contained.

## Content

- One job per page. No generic awareness copy.
- Lead with the buyer's problem, deliverables, and proof — not vision language.
- Write for skimmers: headings and first sentences carry the argument.
- Plain language, no jargon, no invented metrics.
- One primary CTA ("Book a meeting", opens the booking modal); secondary CTAs only where a long page needs them.

## Commands

`npm run dev` · `build` · `preview` · `type-check` · `lint` (type-check + CSS + JS) · `validate` (lint + build) · `test`

## Done means

- Run the narrowest check that proves the change: `npm run lint` for code edits, `npm run build` for layout/routing/`public/` changes, `npm run validate` for repo-wide work.
- For layout or page-composition changes, also check desktop and mobile in the browser.
- State what you verified and what you did not.
