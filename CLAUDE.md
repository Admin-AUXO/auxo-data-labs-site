@AGENTS.md

## Claude notes

- Task skills for this repo live in `.agents/skills/` (shared with Codex). Read the matching `SKILL.md` before the task:
  - `astro-section-implementation`: sections, section CSS
  - `landing-page-composition`: page structure, section order
  - `website-design-system`: tokens, type, component styling
  - `performance-and-motion`: animation, scripts, service worker
  - `public-assets-and-discovery`: `public/`, llms.txt, manifest, sw.js
- **Copy:** for any wording change, also load the `auxo-copy` skill (`A:/AUXO/.claude/skills/auxo-copy/SKILL.md`). Copy lives in `src/data/*.ts`.
- **Analytics:** load `auxo-ga4-gtm` before touching tracking.
- **Owner's design preferences:**
  - Light premium, not flashy. Terse copy, one idea per line.
  - Cards aligned with subgrid. No left/right split sections except the hero and FAQ.
  - Founders appear on About only. No blog authors or dates.
- **Deploys:** a push to `main` goes straight to production on Netlify. Run `npm run validate` and check desktop and mobile in the preview before pushing.
- Preview servers are in `A:/AUXO/.claude/launch.json` (`dev` on 4340) and this repo's `.claude/launch.json`.
- Never remove the `/v` → `/hello/` redirects in `netlify.toml` and the Astro config: printed business cards use them.
