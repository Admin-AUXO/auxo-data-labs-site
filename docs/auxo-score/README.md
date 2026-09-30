# AUXO Score (`/self-check/`)

A 10-question, evidence-based data health test. Five dimensions (Accurate, Complete, Consistent, Timely, Trusted), two cards each. Answers score 10 / 7 / 3 / 0, "I don't know" scores 3. Total 0–100, banded Healthy / Stable / Fragile / Critical. Three "I don't know" answers end the test as Inconclusive.

`spec.md` is the full build spec; `prototype.html` is the approved visual and behaviour reference.

## Where things live

| Path | What |
|---|---|
| `src/lib/auxo-score/cards.ts` | Question bank and focus copy. **Edit questions here.** |
| `src/lib/auxo-score/scoring.ts` | Scoring, bands, tie order, answer layout (pure, unit-tested) |
| `src/lib/auxo-score/email.ts` | Work-email check and free-domain list |
| `src/lib/auxo-score/storage.ts` | Safe localStorage/sessionStorage helpers, UTM capture, legacy key cleanup |
| `src/lib/auxo-score/submit.ts` | n8n payload builders, `fetch` with 10s timeout, error messages |
| `src/lib/auxo-score/analytics.ts` | Consent-gated `score_*` events (only when `auxo_consent=granted`) |
| `src/components/auxo-score/AuxoScore.astro` | All screens (markup) |
| `src/components/auxo-score/controller.ts` | Client state machine, keyboard, saving, forms |
| `src/components/auxo-score/Radar.ts` | Radar SVG builder (pure) |
| `src/components/auxo-score/ExtendedGate.astro` | Extended early-access screen. Swap this for the real extended test later. |
| `src/styles/pages/self-check.css` | Page styles, mapped onto site tokens |
| `tests/auxo-score/*.test.ts` | Vitest unit tests (`npm run test:unit`) |

## Changing questions

Edit `cards.ts`. Keep two cards per dimension and four options per card with tiers 1–4 and points 10/7/3/0. `type` controls answer order: `scale_ascending` (best at A), `scale_descending` (worst at A) or `descriptive_shuffle` (shuffled once per attempt). Run `npm run test:unit` after.

If you change questions or scoring, bump `VERSION` in `submit.ts` so n8n can tell old and new submissions apart, and bump the storage key in `storage.ts` so saved attempts don't mix.

## Environment variables

```
PUBLIC_N8N_REPORT_WEBHOOK=https://<n8n-host>/webhook/auxo-score-report
PUBLIC_N8N_EXTENDED_WEBHOOK=https://<n8n-host>/webhook/auxo-score-extended
```

Set both in Netlify (Site settings → Environment variables) and rebuild. If one is missing, its form still validates but shows "Email isn't available right now. Please try again later." and logs a warning in dev.

For local testing, put them in `.env.local` (git-ignored).

## Storage

- `auxo-score-v2`: in-progress attempt (screen, index, answers, layout, startedAt, attemptId)
- `auxo-score-v2-result`: last completed result; feeds the nav score badge
- `auxo-score-utm` (sessionStorage): UTM params from first page load
- The old self-check keys (`auxo-self-check-*`) are deleted on first load.

All reads/writes are wrapped in try/catch; with storage blocked the test still works, it just can't resume.
