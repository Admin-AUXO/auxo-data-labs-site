# AUXO Score (`/auxo-score/`)

A 10-question, evidence-based data health test. Five dimensions (Accurate, Complete, Consistent, Timely, Trusted), two cards each. Answers score 10 / 7 / 3 / 0, "I don't know" scores 3. Total 0–100, banded Healthy / Stable / Fragile / Critical. Three "I don't know" answers end the test as Inconclusive.

## Where things live

| Path | What |
|---|---|
| `src/pages/auxo-score/index.astro` | Route (`/auxo-score/`; `/self-check/` 301s here) |
| `src/lib/auxo-score/cards.ts` | Question bank and focus copy. **Edit questions here.** |
| `src/lib/auxo-score/types.ts` | Shared types |
| `src/lib/auxo-score/scoring.ts` | Scoring, bands, tie order, answer layout (pure, unit-tested) |
| `src/lib/auxo-score/email.ts` | Work-email check and free-domain list |
| `src/lib/auxo-score/storage.ts` | Safe localStorage/sessionStorage helpers, UTM capture, legacy key cleanup |
| `src/lib/auxo-score/submit.ts` | Context builder, submit limits and error messages |
| `src/lib/auxo-score/analytics.ts` | `scoreEvent()`: consent-gated `score_*` events (only when `auxo_consent=granted`), fired from `controller.ts`. GTM maps `score_start` / `score_complete` to GA4 `assessment_start` / `assessment_complete`. |
| `src/components/auxo-score/AuxoScore.astro` | All screens (markup) |
| `src/components/auxo-score/copy.ts` | Screen copy, including the result's next-step block. **Edit wording here.** |
| `src/components/auxo-score/controller.ts` | Client state machine, keyboard, saving, forms |
| `src/styles/pages/auxo-score.css` | Page styles, mapped onto site tokens |
| `tests/auxo-score/*.test.ts` | Vitest unit tests (`npm run test:unit`) |

## Changing questions

Edit `cards.ts`. Keep two cards per dimension and four options per card with tiers 1–4 and points 10/7/3/0. `type` controls answer order: `scale_ascending` (best at A), `scale_descending` (worst at A) or `descriptive_shuffle` (shuffled once per attempt). Run `npm run test:unit` after.

If you change questions or scoring, bump the storage key in `storage.ts` so saved attempts don't mix.

## Report email

The Score asks for a work email before the result, then posts the result to `/api/lead` (`netlify/functions/lead.mts`). The function logs the row in the pipeline sheet and sends the report from `hello@auxodata.com` through Sequenzy (template in `netlify/lib/emails.mts`). See [`../lead-pipeline.md`](../lead-pipeline.md). There is no n8n.

## Storage

- `auxo-score-v2`: in-progress attempt (screen, index, answers, layout, startedAt, attemptId)
- `auxo-score-v2-result`: last completed result; feeds the nav score badge
- `auxo-score-utm` (sessionStorage): UTM params from first page load
- The old self-check keys (`auxo-self-check-*`) are deleted on first load.

All reads/writes are wrapped in try/catch; with storage blocked the test still works, it just can't resume.
