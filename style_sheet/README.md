# AUXO Data Labs — Brand & Style Sheet

The single reference for AUXO's visual identity: logo, colour, type, and the core design rules. Pulled from the live site (`rebuild/v2`). The site itself is **dark-only**; OKLCH tokens in `src/styles/tokens.css` are the source of truth, hex values below are practical equivalents for tools that need them.

---

## 1. Logo

Files in [`logos/`](./logos). The mark is the **AUXO monogram** — four lime tiles in a 2×2 grid, each carrying a letter (A·U·X·O) in the dark ink colour.

| File | Use |
|---|---|
| `auxo-monogram.svg` | Monogram only, transparent background. Default mark. |
| `auxo-monogram-on-dark.svg` | Monogram on a rounded dark tile (app icon / avatar / favicon at large sizes). |
| `auxo-lockup-dark.svg` | Full lockup (monogram + "AUXO Data Labs") **for dark backgrounds** — light wordmark. |
| `auxo-lockup-light.svg` | Full lockup **for light backgrounds** — dark wordmark. |
| `auxo-favicon.svg` | Simplified monogram for favicon / tiny sizes. |

Each logo ships as a scalable **SVG** (preferred) and rasterised **PNG** exports with transparent backgrounds:

| Asset | PNG sizes |
|---|---|
| `auxo-monogram` | 512, 1024 px (square) |
| `auxo-monogram-on-dark` | 512, 1024 px (square) |
| `auxo-favicon` | 64, 256 px (square) |
| `auxo-lockup-dark` / `auxo-lockup-light` | 1000, 2000 px wide |

> The dark lockup's wordmark is near-white — it is meant for **dark backgrounds**, so it appears faint when previewed on white. Use `auxo-lockup-light` on light backgrounds. PNGs are regenerated with `node style_sheet/_build-png.mjs` (embeds the Sora woff2 so text rasterises in the brand font).

**Lockup wordmark:** `AUXO` set in **Sora 800**, uppercase, tracking ≈ `0.13em`; the descriptor `DATA LABS` follows in **Sora 400** in the muted grey. Tiles are always lime; the letters inside the tiles are always the near-black ink (`#080808`), never recoloured.

**Rules**
- Keep clear space around the mark equal to one tile's height.
- Never recolour the tiles to anything other than the lime accent (or a single flat colour for one-colour print).
- Never stretch, rotate, add shadows/gradients, or re-space the 2×2 grid.
- Minimum mark size: 24px. Below that use `auxo-favicon.svg`.
- On photography or busy backgrounds, use `auxo-monogram-on-dark.svg` for guaranteed contrast.

---

## 2. Colour

Four-colour system: **grayscale neutrals + lime accent + clay secondary + functional danger/success.** Zero-chroma neutrals (pure grey), one warm lime, one warm clay.

### Brand colours (dark theme — the live site)

| Role | Token | Hex | Use |
|---|---|---|---|
| **Accent — lime** | `--accent` | `#A3E635` | Primary content accent: heading highlights, links, icons, dots/rules, focus ring, primary CTA. |
| **Secondary — clay** | `--accent-2` | `#E8995C` | Structure / wayfinding: section rules, **all numerals** (01–04, step numbers), kickers, logo tagline. |
| Foreground | `--foreground` | `#FAFAFA` | Body text / headings. |
| Background | `--background` | `#080808` | Page background. |
| Muted text | `--muted` | `#A8A8A8` | Secondary copy, descriptions. |
| Subtle text | `--subtle` | `#8F8F8F` | Captions, mono-data, fine print. |
| Surface | `--surface` | `#1F1F1F` | Cards. |
| Surface (sunken) | `--surface-sunken` | `#131313` | Inputs, code blocks. |
| Border | `--border` | `rgba(250,250,250,0.15)` | Hairline card grids, dividers. |

### Light-theme brand values (retained for print / inverted "ink" sections)

| Role | Hex |
|---|---|
| Accent lime (on light) | `#6F9E2D` |
| Clay (on light) | `#B4531F` |

> ⚠️ Light lime `#6F9E2D` is ~3.1:1 on white — fine for large text, UI, and the logo, but **below WCAG AA (4.5:1)** for small accent text/links. Darken if AA matters there. Clay `#B4531F` passes (~4.6:1).

### Functional

| Role | Token | Hue |
|---|---|---|
| Danger | `--color-danger` | red `oklch(64% 0.205 25deg)` |
| Success | `--color-success` | green `oklch(62% 0.140 150deg)` |

### Colour rules
- **One** lime full-phrase highlight per heading — never partial-word or list-item highlights.
- **Lime = content** accents. **Clay = structure** (rules + every numeral). Don't mix the two roles.
- Neutrals carry zero chroma — keep greys neutral, never tint.

---

## 3. Typography

Variable fonts in [`fonts/`](./fonts). Self-host as `woff2` with `font-display: swap`.

| Role | Family | File | Weights |
|---|---|---|---|
| Body / UI | **Plus Jakarta Sans** | `PlusJakartaSans-VariableFont_wght.woff2` | 200–800 |
| Brand / display (h1–h3, logo) | **Sora** | `Sora-Variable.woff2` | 100–800 |
| Mono / data / labels | **JetBrains Mono** | `JetBrainsMono-Variable.woff2` | 400–700 |

- Headings: Sora, weight 700, tight tracking (`-0.02em` to `-0.03em`), `text-wrap: balance`.
- Display weight tokens: `--font-weight-display: 600`, `--font-weight-display-strong: 700`.
- Type scale is **fluid** (`clamp()`), `--text-xs` → `--text-6xl`. Don't hardcode font sizes — use the scale tokens.
- Mono is used for eyebrows, data labels (`mono-label` / `mono-datum`), and all numerals, with tabular + slashed-zero figures and `0.08em` tracking.

---

## 4. Core design rules

- **Dark-only, bold-minimal.** Flat dark sections separated by hairline rules — no grey bands.
- **Section rhythm:** no two adjacent sections share the same layout skeleton; alternate archetypes.
- **Signature devices:** hairline card grids (`gap-px` over a border), numbered step-flows, framework "trust-strip" mono pill chips, bold clay numbered ledgers.
- **Numerals are always clay**, mono, and sized consistently (`text-sm` / `mono-datum`) — top-aligned to their heading with a small `pt-1` nudge.
- **Spacing & sizing come from tokens** (`--gutter`, `--container: 80rem`, radius/`--blur`/`--ease`/`--dur` scales). The nav, footer, and content all share `--container` so edges align.
- **Touch targets ≥ 44px** for interactive controls.
- **Motion:** ASMR feel — slow, soft, `--ease-asmr` `cubic-bezier(0.22,0.68,0.24,1)`. Scroll-driven CSS reveals + a clay "wand" sweep on headings.
- **Voice:** plain executive / Gulf real-estate; no jargon, no invented metrics, no chart figures.

---

## 5. Source of truth

- Tokens: `src/styles/tokens.css` (`@theme` block + `:root`)
- Authored CSS: `src/styles/{base,components}/*` via `src/styles/main.css`
- Logo component: `src/components/layout/{Logo,Mark}.astro`

When in doubt, the live CSS wins — this sheet is the human-readable mirror.
