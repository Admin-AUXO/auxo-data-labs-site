# AUXO Data Labs — Website

Marketing site for AUXO Data Labs, an end-to-end data and AI service platform for startups (seed to Series B), growing companies (50–500 people) and large organisations in the UAE, the US and Europe. Built with Astro, deployed to Netlify.

## Stack

- **Astro 6** — static output, prerendered pages, view transitions (`ClientRouter`)
- **TypeScript**
- **Tailwind CSS v4** — CSS-first; design tokens in `src/styles/tokens.css`
- **Pagefind** — client-side search (lazy-loaded)
- **GTM / GA4** — loaded deferred (first interaction or 2.5s after load); Consent Mode v2 inline
- **Playwright** — smoke and accessibility tests; **Vitest** — AUXO Score unit tests

## Getting started

Node 22.12+.

```bash
npm install
npm run dev      # http://localhost:4340
```

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build locally |
| `npm run type-check` | `astro sync` + `tsc --noEmit` |
| `npm run lint` | type-check + CSS + JS lint |
| `npm run validate` | lint + build |
| `npm run test` | Playwright tests |
| `npm run test:unit` | Vitest unit tests (AUXO Score) |
| `npm run icons` | Regenerate favicon/PWA icons from `public/favicon.svg` |
| `npm run wallet` | Build business-card Wallet passes ([`docs/business-card/wallet.md`](docs/business-card/wallet.md)) |

## Structure

```
src/
  pages/        Routes (also generates manifest.json, sw.js, llms-full.txt, OG images)
  layouts/      Page shells
  components/   UI, layout, sections, forms, auxo-score, blog
  data/         Page content (edit copy here)
  lib/          AUXO Score logic, blog and structured-data helpers
  config/       env.ts (GTM container ID)
  scripts/      Browser behaviour, analytics
  styles/       Tokens + layered CSS (main.css); page CSS in styles/pages/
  content/      Blog posts and insights (MDX)
public/         Static files: fonts, icons, vCards, robots/llms/ai/humans txt
scripts/        Icon and Wallet pass generators
tests/          Playwright specs; tests/auxo-score/ for Vitest
docs/           AUXO Score + n8n, business card (Wallet notes, /v QR print files), colour palette
```

## Editing content

Page copy lives in `src/data/*.ts` (home, how-it-works, pricing, marketplace, about, blog, insights, contact, legal, navigation, footer, footnotes, not-found, card-links, site). Pages in `src/pages/*.astro` render that data. AUXO Score questions are in `src/lib/auxo-score/cards.ts` and its screen copy in `src/components/auxo-score/copy.ts`. Blog posts are MDX in `src/content/blog/`, insights in `src/content/insights/`.

## Design

Single dark theme with a lime accent. `src/styles/tokens.css` is the source of truth for colour and type; `docs/design/color-palette.html` is a visual reference of those tokens (open it locally). For the full brand reference (logos, voice, usage), see `brand/` in the `auxo-marketing` repo.

Fonts are self-hosted `woff2` in `public/fonts/`:

| Role | Font |
|---|---|
| Headings | AUXO Display (`AUXODisplay-Variable.woff2`): Mona Sans, OFL, instanced at width 112 and renamed per its Reserved Font Name. Licence in `AUXODisplay-OFL.txt`. Weights 800/700 via `--font-weight-display-strong` / `--font-weight-display`. |
| Body | Plus Jakarta Sans |
| Mono | JetBrains Mono |
| Logo | Montserrat AUXO |

## Deployment

Netlify (`auxo-data-labs.netlify.app`, custom domain `auxodata.com`). The site is fully static — every route prerenders; the contact form posts client-side via EmailJS. Pushing to `main` on `origin` (`Admin-AUXO/auxo-data-labs-site`) auto-deploys; build settings, redirects and security headers live in `netlify.toml`. GitHub Actions (`.github/workflows/ci.yml`) only checks: `npm run validate` and `npm run test:unit` on pushes to `main` and on PRs.

Build-time env vars (set in Netlify, not committed; `.env.local` for local work):

| Var | Used by |
|---|---|
| `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, `PUBLIC_EMAILJS_PUBLIC_KEY` | Contact form (`src/scripts/forms/contact.ts`). Template params include the optional `fit` ("Which fits you best?") value. |
| `PUBLIC_N8N_REPORT_WEBHOOK` | AUXO Score report emails |
| `PUBLIC_GTM_CONTAINER_ID` | Optional; `src/config/env.ts` defaults to `GTM-5TKFHDH5` |

## Analytics

GTM `GTM-5TKFHDH5` feeds GA4 `G-WBMKHRWS7Z`. Events are pushed to `dataLayer` with `track()` from `src/scripts/analytics/track.ts`, which also sends the automatic ones (page_view on every `astro:page-load`, cta_click, navigation_click, outbound click, file_download, scroll, engagement_milestone, rage_click, exception, search). Other sources:

- `src/scripts/forms/contact.ts` — form_start, form_abandonment, generate_lead
- `src/components/auxo-score/controller.ts` via `src/lib/auxo-score/analytics.ts` — consent-gated `score_*`; GTM maps score_start / score_complete to GA4 `assessment_start` / `assessment_complete`
- `src/scripts/marketplace.ts` — marketplace_details, stack_add, stack_remove
- `src/pages/hello.astro` — card_founder_select, card_link_click
- `src/pages/404.astro` — page_not_found; `src/scripts/analytics/webVitals.ts` — web_vitals

A new event reaches GA4 only after a matching trigger and tag are published in GTM.

## AUXO Score

The `/auxo-score/` test and its n8n webhooks are documented in [`docs/auxo-score/README.md`](docs/auxo-score/README.md). `/self-check/` 301s to it.
