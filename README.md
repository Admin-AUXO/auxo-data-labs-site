# AUXO Data Labs — Website

Marketing site for AUXO Data Labs, a data and AI studio for Gulf real estate. Built with Astro, deployed to Vercel.

## Stack

- **Astro 6** — static output, prerendered pages
- **TypeScript**
- **Tailwind CSS v4** — CSS-first; design tokens in `src/styles/tokens.css`
- **Pagefind** — client-side search (lazy-loaded)
- **Partytown** — offloads Google Tag Manager
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
  actions/      Server actions (contact form)
public/         Static files: fonts, icons, manifest, service worker
style_sheet/    Brand and design reference
```

## Editing content

Page copy lives in `src/data/*.ts` (home, about, services-overview, contact, navigation, footer, site). Pages in `src/pages/*.astro` render that data. Insights articles are MDX in `src/content/insights/`.

## Design

Single dark theme. `src/styles/tokens.css` is the source of truth for colour and type. See `style_sheet/README.md` for the brand reference.

## Deployment

Vercel. Every route prerenders; only the contact-form action runs server-side. The canonical remote is `auxo-site`; ship from `rebuild/v2`:

```bash
git push auxo-site rebuild/v2:main
```
