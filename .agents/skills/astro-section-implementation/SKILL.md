---
name: astro-section-implementation
description: Use when creating or refactoring Astro sections, reusable section modules, section-specific markup, or section-level CSS in this repository. Trigger for section extraction, repeated section cleanup, CTA block restructuring, and static-vs-client decisions inside Astro components.
---

# Astro Section Implementation

Build sections that stay readable, mostly static, and easy to maintain.

## Workflow

1. Inspect the nearest matching section, component, and stylesheet pattern.
2. Decide whether the work belongs in an existing family or needs one focused file.
3. Define the section contract before writing markup.
4. Keep section data and repeated markup out of tangled template conditionals.

## Rules

- Keep markup semantic and readable.
- Prefer shared data, arrays, and focused helpers over repeated section blocks.
- Use explicit typed fields for semantic content that other components depend on.
- Do not key business meaning off array indexes or label text unless the UI is purely presentational.
- Add a client `<script>` only when the section has real client behavior (there are no framework islands).
- Keep copy in `src/data/*.ts`, not in templates. Icons must be in the `astro-icon` allowlist in `astro.config.mjs`.
- Match the repo's CSS organization so styles remain discoverable: shared component CSS in `src/styles/components/`, page-only CSS in `src/styles/pages/` imported from the page frontmatter.
- Keep responsive behavior deliberate; do not let desktop composition collapse into random mobile stacking.
- Split desktop and mobile markup when the reading pattern genuinely changes; do not force one DOM shape to do two incompatible jobs.
- For accordions and carousels, keep a static fallback structure that remains readable if JS is delayed or absent.
- Scope scripts to the section they serve.
- Guard DOM queries and event listeners.
- View transitions are on: initialise on `astro:page-load`, make init safe to run again, and clear timers on `astro:before-swap`.
- Keep the codebase comment-free.
- Remove or rename stale selectors when section markup changes.

## Section Audit Checklist

- Can a new reader understand the section job from its heading and first sentence?
- Are the most important labels, outputs, or actions visible without markup gymnastics?
- Is the mobile pattern chosen intentionally: stack, accordion, or carousel?
- Does the data model still make sense if content editors reorder items later?
