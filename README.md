# AUXO Data Labs — Website

Marketing site for AUXO Data Labs, a data and AI studio for Gulf real estate. Built with Astro, deployed to Netlify.

## Stack

- **Astro 6** — static output, prerendered pages
- **TypeScript**
- **Tailwind CSS v4** — CSS-first; design tokens in `src/styles/tokens.css`
- **Pagefind** — client-side search (lazy-loaded)
- **GTM / GA4** — loaded deferred (first interaction or 2.5s after load); Consent Mode v2 inline
- **Playwright** — smoke and accessibility tests

## Getting started

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

## Structure

```
src/
  pages/        Routes
  layouts/      Page shells
  components/   UI, layout, sections, forms
  data/         Page content (edit copy here)
  scripts/      Browser behaviour
  styles/       Tokens + layered CSS (main.css)
  content/      Insights (MDX)
public/         Static files: fonts, icons, manifest, service worker
```

## Editing content

Page copy lives in `src/data/*.ts` (home, about, services-overview, contact, navigation, footer, site). Pages in `src/pages/*.astro` render that data. Insights articles are MDX in `src/content/insights/`.

## Design

Single dark theme. `src/styles/tokens.css` is the source of truth for colour and type. For the full human brand reference (logos, voice, usage), see the canonical kit in the marketing repo: `AUXO-Marketing/brand/`.

## Deployment

Netlify (`auxo-data-labs.netlify.app`, custom domain `auxodata.com`). The site is fully static — every route prerenders; the contact form posts client-side via EmailJS. Pushing to `main` on `origin` (`Admin-AUXO/auxo-data-labs-site`) auto-deploys; build settings and security headers live in `netlify.toml`.

EmailJS needs three build-time vars (set in Netlify, not committed): `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, `PUBLIC_EMAILJS_PUBLIC_KEY`.
