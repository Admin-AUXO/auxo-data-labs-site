# Claude Code Prompt: Build the AUXO Score (10-card test) on auxodata.com

> Paste everything below into Claude Code from the root of the auxodata.com repo (Astro).
> Put `auxo-score-prototype.html` in the repo at `docs/auxo-score/prototype.html` first. It is the approved working reference for behaviour and look.

---

## 0. How to work

1. **Read before writing.** Inspect the repo first: Astro version, `astro.config.*`, whether any UI integration (React/Preact/Svelte/Solid) is already installed, the global stylesheet and CSS custom properties, self-hosted fonts, layout components, the existing `/self-check` page and everything it imports, cookie-consent and analytics code, `public/llms.txt`, `public/llms-full.txt`, OG images, and any nav "score badge" logic.
2. **Show me a plan before changing files.** List the files you will create, change and delete. Wait for my "go".
3. **Work on a new branch:** `feat/auxo-score-v2`. Never push to `main`.
4. **Don't add a UI framework** if the repo doesn't already use one. Build the test as an Astro page plus one vanilla TypeScript client script (a `<script>` in the component, bundled by Astro). If a framework is already installed, you may use it for this island.
5. **Don't add new font requests.** Use the fonts the site already self-hosts (Montserrat 800, Plus Jakarta Sans, JetBrains Mono).
6. **Use the site's existing design tokens.** Map the prototype's tokens (section 9) onto the site's existing CSS variables. Only add new variables where nothing equivalent exists, and namespace them `--score-*`.
7. **Ask me rather than guess** about anything this prompt doesn't cover.
8. When finished, run the build, the unit tests and the acceptance checklist (section 16), then report back.

---

## 1. What we're building

The **AUXO Score** is a 10-question, evidence-based data health test. It measures hard operational facts (days, percentages, frequencies, where data lives) across **5 dimensions**. The result is an absolute score from 0 to 100, a band, a 5-spoke radar and the weakest dimension.

- **Route:** `/self-check/`. It **replaces** the old 28-statement, four-pillar self-check completely.
- **Audience:** any business. Generic language, nothing specific to real estate.
- **Access:** open. No sign-up is needed to take the test or see the result.
- **After the result:** two actions:
  1. **Email my full report** (main action). A work email goes to an n8n webhook, and n8n sends the report.
  2. **Take the extended version** (quiet, qualified link). The extended test **is not defined yet.** For now the link leads to an interest / early-access request that is sent to a second n8n webhook. Build it so the real extended test can be added later without rework.

### Out of scope for this pass (don't build)
- The swipe game (quick version)
- The extended test itself
- Shareable result URL / permalink, OG result image, PDF export, benchmarks
- Seat counters or cohort logic on the site (n8n may handle queueing later)

---

## 2. Framework

| Dimension | Question it answers |
|---|---|
| Accurate | Is the data correct? |
| Complete | Is anything missing? |
| Consistent | Does it agree across systems? |
| Timely | Is it current when you need it? |
| Trusted | Do people actually rely on it when they decide? |

- 2 cards per dimension, 10 cards in total, always in the order `id 1 → 10`.
- Each dimension scores 0–20 points. The total is 0–100.
- Radar value per spoke = `dimensionPoints × 5`, a 0–100 scale.

---

## 3. Scoring rules

| Answer | Points |
|---|---|
| Tier 1 (Healthy) | 10 |
| Tier 2 (Stable) | 7 |
| Tier 3 (Fragile) | 3 |
| Tier 4 (Critical) | 0 |
| "I don't know" (tier 5) | 3 |

- Whole numbers only, never floats.
- **Bands** (on the total):

| Range | Band | One-liner |
|---|---|---|
| 80–100 | Healthy | Your data is ready for the decisions that matter. |
| 60–79 | Stable | Good foundations with a few blind spots. |
| 40–59 | Fragile | It works until someone asks a hard question. |
| 0–39 | Critical | Decisions are being made in the dark. |

- **Weakest dimension** = the lowest dimension score. If dimensions tie, the first in this order wins: `Trusted → Consistent → Accurate → Complete → Timely`.
- **"I don't know" limit:** when the number of cards answered "I don't know" reaches **3**, skip scoring and go **straight** to the Inconclusive screen, the moment the third one is chosen. The count covers the current answers only: if someone goes back and changes an IDK answer to a real one, the count goes down.

---

## 4. Question bank (use exactly as written)

Create `src/lib/auxo-score/cards.ts`:

```ts
import type { Card } from "./types";

export const CARDS: Card[] = [
  {
    id: 1, dimension: "Accurate", type: "scale_ascending",
    question: "What percentage of numbers shown to leadership or the board are touched, calculated, or adjusted by hand in spreadsheets first?",
    options: [
      { label: "None", sub: "100% pulled directly from dashboards/systems", tier: 1, points: 10 },
      { label: "Under 25%", sub: "Minor formatting and cosmetic assembly only", tier: 2, points: 7 },
      { label: "25% – 75%", sub: "Heavy copy-pasting, VLOOKUPs, and manual tweaks", tier: 3, points: 3 },
      { label: "Over 75%", sub: "Almost entirely built and manipulated manually", tier: 4, points: 0 },
    ],
  },
  {
    id: 2, dimension: "Accurate", type: "scale_descending",
    question: "In the past 6 months, how often has a reported number or slide deck had to be re-sent or corrected after a leadership meeting?",
    options: [
      { label: "Almost every cycle", sub: "Re-issuing corrected decks is normal", tier: 4, points: 0 },
      { label: "Every month or two", sub: "Noticeable calculation errors slip through", tier: 3, points: 3 },
      { label: "Once or twice", sub: "Minor footnote or typo fixes only", tier: 2, points: 7 },
      { label: "Zero times", sub: "What gets presented stays final", tier: 1, points: 10 },
    ],
  },
  {
    id: 3, dimension: "Complete", type: "descriptive_shuffle",
    question: "Where does critical operational data (e.g. pipeline status, inventory, pricing, cost tracking) actually live?",
    options: [
      { label: "Central systems", sub: "Fully tracked in CRM, ERP, or warehouse", tier: 1, points: 10 },
      { label: "Mostly central", sub: "Some teams keep private side notes", tier: 2, points: 7 },
      { label: "Scattered", sub: "Key metrics sit in personal sheets or Slack", tier: 3, points: 3 },
      { label: "In people's heads", sub: "Lost forever if 2 key people leave", tier: 4, points: 0 },
    ],
  },
  {
    id: 4, dimension: "Complete", type: "scale_descending",
    question: "When leadership asks 'Why is this metric up or down?', how long does it take to pull the full breakdown?",
    options: [
      { label: "A week or more", sub: "Turns into an internal investigation", tier: 4, points: 0 },
      { label: "2 to 3 days", sub: "Manual multi-system stitching required", tier: 3, points: 3 },
      { label: "A few hours", sub: "Someone just runs and filters an export", tier: 2, points: 7 },
      { label: "Under 5 minutes", sub: "Instant drill-down on current tools", tier: 1, points: 10 },
    ],
  },
  {
    id: 5, dimension: "Consistent", type: "descriptive_shuffle",
    question: "Does your company have single, documented definitions for core KPIs (e.g. 'Active Customer', 'Gross Margin', 'Churn')?",
    options: [
      { label: "Centrally locked", sub: "Documented and coded across systems", tier: 1, points: 10 },
      { label: "Written down", sub: "But different teams still interpret loosely", tier: 2, points: 7 },
      { label: "Tribal knowledge", sub: "Unwritten; people assume definitions", tier: 3, points: 3 },
      { label: "No standard", sub: "Teams calculate the same metric differently", tier: 4, points: 0 },
    ],
  },
  {
    id: 6, dimension: "Consistent", type: "scale_descending",
    question: "How often do two different department heads show up to a meeting with conflicting numbers for the same thing?",
    options: [
      { label: "Every cycle", sub: "Discrepancies are an expected headache", tier: 4, points: 0 },
      { label: "Frequently", sub: "Meeting time is spent debating who is right", tier: 3, points: 3 },
      { label: "Rarely", sub: "Only if there's a clear cut-off timing difference", tier: 2, points: 7 },
      { label: "Never", sub: "All teams report off the same baseline", tier: 1, points: 10 },
    ],
  },
  {
    id: 7, dimension: "Timely", type: "scale_ascending",
    question: "How many calendar days after month-end until executive metrics and financials are locked and shared?",
    options: [
      { label: "5 days or less", sub: "Fast, repeatable close", tier: 1, points: 10 },
      { label: "6 to 10 days", sub: "Standard, predictable turnaround", tier: 2, points: 7 },
      { label: "11 to 20 days", sub: "Significant lag before visibility", tier: 3, points: 3 },
      { label: "21+ days", sub: "Or numbers are never officially locked", tier: 4, points: 0 },
    ],
  },
  {
    id: 8, dimension: "Timely", type: "scale_descending",
    question: "How old is the operational data managers look at when making day-to-day decisions?",
    options: [
      { label: "Monthly or older", sub: "Flying blind between cycles", tier: 4, points: 0 },
      { label: "Last week's data", sub: "Weekly summary cadences only", tier: 3, points: 3 },
      { label: "Yesterday's close", sub: "Refreshed nightly via batch", tier: 2, points: 7 },
      { label: "Real-time / Hourly", sub: "Live view of current business", tier: 1, points: 10 },
    ],
  },
  {
    id: 9, dimension: "Trusted", type: "scale_descending",
    question: "How common is it for managers to maintain private 'shadow' spreadsheets because they don't fully trust central dashboards?",
    options: [
      { label: "Universal", sub: "Official tools are ignored; private sheets run things", tier: 4, points: 0 },
      { label: "Common", sub: "Most managers maintain a side sheet to be safe", tier: 3, points: 3 },
      { label: "Isolated", sub: "1 or 2 niche teams do this for special cases", tier: 2, points: 7 },
      { label: "Practically zero", sub: "Official tools are the only reference", tier: 1, points: 10 },
    ],
  },
  {
    id: 10, dimension: "Trusted", type: "descriptive_shuffle",
    question: "Before leadership makes a major strategic bet, what happens to the underlying data?",
    options: [
      { label: "Accepted instantly", sub: "High confidence, zero audit drills", tier: 1, points: 10 },
      { label: "Quick gut check", sub: "Light verification, accepted quickly", tier: 2, points: 7 },
      { label: "Heavy audit", sub: "Days spent validating before trusting", tier: 3, points: 3 },
      { label: "Ignored", sub: "Calls are made on gut feel; data is suspect", tier: 4, points: 0 },
    ],
  },
];

export const FOCUS_COPY: Record<string, string> = {
  Accurate: "Numbers reaching leadership are being fixed by hand, so errors slip through. Start by finding where the manual edits happen.",
  Complete: "Key data sits outside your systems or takes days to pull together. Start by mapping where it actually lives.",
  Consistent: "Teams calculate the same metric in different ways. Start by writing down one definition for each of your top KPIs.",
  Timely: "Numbers arrive after the decisions they should inform. Start with how long your month-end close really takes.",
  Trusted: "People check or rebuild the numbers before they rely on them. Start by finding out why the official reports get second-guessed.",
};
```

---

## 5. Types and pure logic

`src/lib/auxo-score/types.ts`:

```ts
export type Dimension = "Accurate" | "Complete" | "Consistent" | "Timely" | "Trusted";
export type CardType = "scale_ascending" | "scale_descending" | "descriptive_shuffle";
export type Tier = 1 | 2 | 3 | 4;
export type Quadrant = "A" | "U" | "X" | "O";

export interface Option { label: string; sub: string; tier: Tier; points: 10 | 7 | 3 | 0; }
export interface Card { id: number; dimension: Dimension; type: CardType; question: string; options: Option[]; }

export interface Answer {
  tier: Tier | 5;            // 5 = I don't know
  points: number;            // 10 | 7 | 3 | 0, or 3 for IDK
  selectedQuadrant: Quadrant | null;
  isIdk: boolean;
}
export type Answers = Record<number, Answer>;
export type Layout = Record<number, Tier[]>; // per card: tiers in quadrant order A,U,X,O

export interface Band { min: number; name: "Healthy" | "Stable" | "Fragile" | "Critical"; line: string; }
export interface Result {
  total: number;
  dims: Record<Dimension, number>;      // 0–20 each
  radar: Record<Dimension, number>;     // 0–100 each
  weakest: Dimension;
  band: Band;
  idkCount: number;
}
```

`src/lib/auxo-score/scoring.ts`:

```ts
import { CARDS } from "./cards";
import type { Answers, Band, Dimension, Layout, Result, Tier } from "./types";

export const DIMENSIONS: Dimension[] = ["Accurate", "Complete", "Consistent", "Timely", "Trusted"];
export const TIE_ORDER: Dimension[] = ["Trusted", "Consistent", "Accurate", "Complete", "Timely"];
export const QUADS = ["A", "U", "X", "O"] as const;
export const IDK_POINTS = 3;
export const IDK_LIMIT = 3;

export const BANDS: Band[] = [
  { min: 80, name: "Healthy", line: "Your data is ready for the decisions that matter." },
  { min: 60, name: "Stable", line: "Good foundations with a few blind spots." },
  { min: 40, name: "Fragile", line: "It works until someone asks a hard question." },
  { min: 0, name: "Critical", line: "Decisions are being made in the dark." },
];

export const idkCount = (a: Answers) => Object.values(a).filter(x => x.isIdk).length;

export function computeResult(answers: Answers): Result {
  const dims = Object.fromEntries(DIMENSIONS.map(d => [d, 0])) as Record<Dimension, number>;
  let total = 0;
  for (const card of CARDS) {
    const a = answers[card.id];
    if (!a) continue;
    dims[card.dimension] += a.points;
    total += a.points;
  }
  const min = Math.min(...DIMENSIONS.map(d => dims[d]));
  const weakest = TIE_ORDER.find(d => dims[d] === min)!;
  const band = BANDS.find(b => total >= b.min)!;
  const radar = Object.fromEntries(DIMENSIONS.map(d => [d, dims[d] * 5])) as Record<Dimension, number>;
  return { total, dims, radar, weakest, band, idkCount: idkCount(answers) };
}

// Fisher–Yates; rng injectable for tests
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Built once per attempt, stored in state, so Back shows the same order
export function buildLayout(rng: () => number = Math.random): Layout {
  const layout: Layout = {};
  for (const c of CARDS) {
    if (c.type === "descriptive_shuffle") layout[c.id] = shuffle([1, 2, 3, 4] as Tier[], rng);
    else if (c.type === "scale_ascending") layout[c.id] = [1, 2, 3, 4];
    else layout[c.id] = [4, 3, 2, 1];
  }
  return layout;
}
```

**Answer-order rules (anti-bias):**
- Cards 3, 5, 10 (`descriptive_shuffle`): Fisher–Yates shuffle, **once per attempt** (at Start or Retake), never on re-render.
- Cards 1, 7 (`scale_ascending`): Tier 1→A, 2→U, 3→X, 4→O.
- Cards 2, 4, 6, 8, 9 (`scale_descending`): Tier 4→A, 3→U, 2→X, 1→O.
- "I don't know" is always a fixed pill below the grid.
- Quadrants are **not** colour-coded by tier. All four blocks look the same until one is selected.

`src/lib/auxo-score/email.ts`:

```ts
export const FREE_DOMAINS = [
  "gmail.com","googlemail.com","outlook.com","hotmail.com","live.com","msn.com","yahoo.com","ymail.com",
  "icloud.com","me.com","mac.com","aol.com","proton.me","protonmail.com","gmx.com","gmx.net","mail.com",
  "zoho.com","zohomail.com","yandex.com","yandex.ru","rediffmail.com","qq.com","163.com","hey.com","fastmail.com",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function checkWorkEmail(raw: string): string {
  const email = raw.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return "Enter a valid email address, like name@company.com.";
  if (FREE_DOMAINS.includes(email.split("@")[1])) return "Please use your company email. Personal addresses like Gmail or Outlook can't be used.";
  return ""; // empty = valid
}
```

---

## 6. Screens and copy (exact)

Everything lives on one page at `/self-check/`. Screens are sections toggled with the `hidden` attribute. Move focus to each new screen's heading when it appears (for accessibility), and scroll to the top.

### 6.1 Intro
- Eyebrow: `Evidence-based data health check`
- H1: `Answer with facts, not feelings.`
- Lede: `Ten questions about how your company actually handles its numbers: days, percentages, how often things go wrong. Pick the answer that describes a normal month, not your best one.`
- Dimension chips: Accurate · Complete · Consistent · Timely · Trusted
- Fact strip (3 cells): `10` questions · `~3` minutes · `0–100` score
- Primary button: `Start the full test →`
- Note: `If you don't know an answer, say so. Choosing "I don't know" 3 or more times ends the test with a visibility finding instead of a score.`
- Privacy line (small, muted): `Your answers stay in your browser. Nothing is sent unless you ask us to email your report.`
- If a saved attempt is in progress (section 8), show a small bar above Start: `You have a test in progress (card X of 10).` with buttons `Resume` and `Start over`.

### 6.2 Card screen
- **Header row:** `← Back` on the left (hidden on card 1 but keeps its space; `visibility:hidden`, `tabindex=-1`), dimension pill in the centre (uppercase, e.g. `CONSISTENT`), counter `X / 10` on the right (tabular numbers).
- Progress bar, 3px: width = `index / 10`.
- Question: bold, 18–20px, `aria-live="polite"`. Reserve a minimum height (about 3.2em) so the grid doesn't jump between cards.
- **2×2 AUXO grid:** 4 equal blocks, 2 columns, 10px gap. Each block has:
  - The quadrant letter in a lime square tile in the top-left corner (A top-left, U top-right, X bottom-left, O bottom-right), in the display font, like the AUXO logo.
  - Bold label (15px) plus muted sub-line (12.5px).
  - Selected state: lime border plus soft lime fill, `aria-pressed="true"`.
- **Footer:** `I don't know` pill. When the current card already has an answer (review mode), also show `Keep & Continue →`.
- Hint line (small, mono, muted, hidden on touch devices via `@media (hover: none)`): `Keys: A · U · X · O · I for "I don't know"`

### 6.3 Loader (exactly 3 seconds)
- Block all input.
- Pulsing 2×2 AUXO cube (letters A U X O). With `prefers-reduced-motion`: no animation, but the same 3-second timing.
- Messages, `aria-live="polite"`:
  - 0–1.5s: `Scoring each dimension…`
  - 1.5–3.0s: `Building your report…`
- At 3.0s, go to Result. Clear timers if the user restarts.

### 6.4 Result
- Eyebrow: `Your verified AUXO Score`
- Big score (display font, clamp 72–104px, tabular numbers) + `/100`
- Band chip (outlined, mono, uppercase). Critical uses the critical colour, Fragile amber, Stable and Healthy lime (a darker lime-green text on the light theme for contrast). Band one-liner next to it.
- **Panel:** title `Score by dimension (0–100)`:
  - 5-spoke SVG radar (section 10)
  - A table under it, one row per dimension: name | meter bar | value (0–100). The weakest row's bar is amber. This table is also the text alternative for the radar.
- **Focus callout** (amber left border): `Weakest: {Dimension}` + `FOCUS_COPY[dimension]`.
- **Main action:**
  - Full-width lime button: `Email my full report` (toggles the form open; `aria-expanded`)
  - Centred note under it: `Your full breakdown, sent to your work email.`
  - Form (hidden until toggled): label `Work email`, input (`type=email`, `autocomplete=email`, placeholder `name@company.com`), button `Send`, a consent line: `We'll email your report and may follow up once. No spam.` with a link to the site's privacy page, a hidden honeypot field (section 11), and a status line (`role="status"`).
- **Divider, then the extended block** (it must look secondary and qualified):
  - Small bold muted title: `Need to go deeper?`
  - Note: `The extended assessment is for leadership teams planning to fix their data in the next 6 months. It takes longer than this test, and our team reviews every submission.`
  - Underlined text link (not a button): `Take the extended version →`, which toggles:
  - **"Is this for you?" check** (bordered box): two checkboxes:
    - `We're planning a data project this year.`
    - `I can answer for both finance and operations.`
    - `Continue` button, **disabled until both are ticked**. Continue opens the Extended screen.
- **No** "Book a read-out" and **no** "Retake" button on this screen.

### 6.5 Extended (early-access placeholder)
- Eyebrow: `Extended assessment`
- H2: `Limited seats each month.`
- Lede: `We keep the number of extended assessments small so our team can review each one properly. Request a seat with your work email and we'll confirm your place.`
- Form: label `Work email`, input, button `Request a seat`, consent line, honeypot, status line.
- Text link: `← Back to my score` (returns to Result with its state intact).
- No seat counter, no queue numbers on the site.
- Put this screen in its own component (`ExtendedGate`) so it can later be swapped for the real extended test.

### 6.6 Inconclusive
- Badge (amber outline, mono): `STATUS: UNVERIFIED — VISIBILITY GAP`
- H2: `Score Inconclusive: Data Visibility Blind Spot`
- Copy: `You selected "I don't know" on 3 or more operational baseline questions. In data operations, lack of visibility is itself a critical finding. You cannot optimize, automate, or trust data assets that have not been audited or mapped.`
- Primary button: `Schedule Data Discovery Audit` → the site's contact page (use the existing route).
- Secondary (ghost) button: `Retake Assessment with Core Team` → starts a fresh attempt (new layout, answers cleared).

---

## 7. State machine and navigation

```
intro ──Start/Resume──▶ quiz ──(card 10 answered, idk<3)──▶ loader ──3s──▶ result ──extended link+check──▶ extended
                          │                                                  ▲                              │
                          └──(idkCount reaches 3, any card)──▶ inconclusive   └────────── Back to my score ───┘
inconclusive ──Retake──▶ quiz (fresh)
```

**State:**
```ts
interface State {
  screen: "intro" | "quiz" | "loader" | "result" | "extended" | "inconclusive";
  index: number;          // 0–9
  answers: Answers;
  layout: Layout;         // fixed for the attempt
  startedAt: string;      // ISO
  attemptId: string;      // crypto.randomUUID()
}
```

**Selecting an answer:**
1. If input is locked, ignore it.
2. Write the answer, unless it's the same one already selected (tapping the selected block doesn't change data).
3. Lock input and give the tapped element a 150ms highlight (flash).
4. After 150ms, unlock and advance:
   - If `idkCount(answers) >= 3`, go to **Inconclusive**.
   - Else if `index < 9`, go to `index + 1`.
   - Else go to **Loader**.

**Back:** `index − 1`, and the card renders with the previous choice highlighted (the block, or the IDK pill). Picking a different option updates the answer and advances. `Keep & Continue →` advances without changing the answer.

**Keyboard** (quiz screen only, ignored when Ctrl/Cmd/Alt is held or focus is in an input):
- `A` `U` `X` `O` pick the quadrant, `I` picks "I don't know", `Backspace` goes back.
- All blocks are real `<button>`s, so Tab/Enter/Space work.

---

## 8. Saving progress (localStorage)

- Key: `auxo-score-v2`. Wrap **every** read and write in try/catch. If storage fails, the test still works; it just doesn't resume.
- Save `{ screen, index, answers, layout, startedAt, attemptId }` after every answer.
- Save the last completed result under `auxo-score-v2-result`: `{ total, band, weakest, radar, completedAt }`.
- On load:
  - An in-progress quiz shows the Resume bar on Intro (6.1).
  - If the screen was the loader, treat it as finished and show Result.
  - A saved result/extended/inconclusive screen restores that screen.
- Delete the old self-check's storage keys (find their names in the old code) once, so returning visitors don't see leftovers.
- **Nav score badge:** if the old site shows a score badge in the nav after completion, keep the feature but feed it from `auxo-score-v2-result` (show `{total}` and link to `/self-check/`). If there isn't one, don't add one.

---

## 9. Visual design

Match the live site: a dark-first theme with near-black, lime and amber, and the AUXO logo's 2×2 tiles. Map these prototype tokens onto the site's existing variables:

```css
/* dark (default) */
--bg: #080808;  --surface: #121411;  --surface-2: #1a1d18;  --line: #2a2e26;
--fg: #f2f4ee;  --fg-2: #a9b0a1;  --fg-3: #7d8476;
--lime: #a3e635;  --lime-ink: #111111;  --lime-soft: rgba(163,230,53,.12);
--amber: #f5b83d;  --crit: #f0645a;
/* light (only if the site supports a light theme) */
--bg: #f7f8f4;  --surface: #ffffff;  --surface-2: #eef1e8;  --line: #d9ddd1;
--fg: #111111;  --fg-2: #4a5043;  --fg-3: #6b7263;
--lime-soft: rgba(132,190,30,.16);  --amber: #b87a00;  --crit: #c23b30;
--lime-text-on-light: #4d7a00;   /* lime used AS TEXT on light backgrounds */
```

Rules:
- **Lime is never body or heading text on a light background.** Use it as a fill (buttons, tiles, meters) with `#111111` text on top. Lime text is fine on the dark background.
- Fonts: **Montserrat 800** for display (H1/H2, big score, quadrant letters), **Plus Jakarta Sans** for body and UI, **JetBrains Mono** for eyebrows, pills, counters, the loader and numbers.
- Column: `max-width: 560px`, centred, at least 16px side padding. It must work at 360px wide with no horizontal scroll.
- Blocks: 6px radius, 1.5px border, min-height 132px (124px at ≤380px wide). The quadrant tile is 26×26px, flush to the top-left corner with the radius `4px 0 4px 0`.
- Buttons: lime fill, `#111111` text, 8px radius, 700 weight. Ghost variant: transparent with a 1px line border.
- Visible focus ring: 2px lime outline, 3px offset.
- Respect `prefers-reduced-motion`: turn off all transitions and animations.
- Put the page inside the site's normal layout (header/footer), but hide or collapse anything that competes with the test (e.g. a hero) on this route.
- Use `docs/auxo-score/prototype.html` as the visual reference for spacing and treatment.

---

## 10. Radar chart (inline SVG, no library)

- `viewBox="0 0 360 330"`, width 100%, max-width 380px, centred. `role="img"` plus an `aria-label` listing all five values.
- Centre `(180, 172)`, radius `R = 112`. Spoke angle `i` = `−π/2 + i·2π/5`, in `DIMENSIONS` order (Accurate at the top, then clockwise).
- Point for value `v` (0–100) = `(cx + cos·R·v/100, cy + sin·R·v/100)`.
- Rings at 25/50/75/100 as polygons: stroke `--line`, no fill. Small tick labels (9px mono, `--fg-3`) just right of the top spoke.
- Spokes: `--line`, 1px.
- Score polygon: fill `--lime-soft`, stroke `--lime` 2px, round joins.
- Dots: r=5, fill `--lime` (the weakest dimension's dot is `--amber`), 2px stroke in `--surface`, with a `<title>` of `Dimension: value` for hover.
- Axis labels at radius 122%. Text anchor: `middle` if `|cos| < 0.2`, `start` if cos > 0, else `end`. Top label nudged −14px, bottom labels +10px. The name uses 12px/600 in `--fg`, and the value sits under it in 11px mono `--fg-2`.
- All SVG text colours come from tokens, so it reads in both themes. Nothing may be clipped at 360px wide.

---

## 11. Backend: n8n webhooks

### 11.1 Env variables (add to `.env.example` and document them in the README)
```
PUBLIC_N8N_REPORT_WEBHOOK=https://<n8n-host>/webhook/auxo-score-report
PUBLIC_N8N_EXTENDED_WEBHOOK=https://<n8n-host>/webhook/auxo-score-extended
```
If a variable is missing at build time, the form still validates, but on submit it shows: `Email isn't available right now. Please try again later.` Also log a console warning in dev.

### 11.2 Request (browser → n8n)
`POST`, `Content-Type: application/json`, 10-second timeout via `AbortController`.

**Report request** (`type: "full_report_request"`):
```json
{
  "type": "full_report_request",
  "version": "auxo-score-10card-v1",
  "submissionId": "uuid-v4 (new per submit)",
  "attemptId": "uuid-v4 (per attempt)",
  "submittedAt": "2026-10-01T09:30:00.000Z",
  "email": "name@company.com",
  "emailDomain": "company.com",
  "consent": true,
  "hp": "",
  "result": {
    "total": 62,
    "band": "Stable",
    "bandLine": "Good foundations with a few blind spots.",
    "weakest": "Trusted",
    "focus": "People check or rebuild the numbers before they rely on them. …",
    "idkCount": 1,
    "dimensions": { "Accurate": 17, "Complete": 14, "Consistent": 10, "Timely": 13, "Trusted": 8 },
    "radar": { "Accurate": 85, "Complete": 70, "Consistent": 50, "Timely": 65, "Trusted": 40 }
  },
  "answers": [
    { "cardId": 1, "dimension": "Accurate", "question": "…", "tier": 2, "points": 7, "isIdk": false, "label": "Under 25%", "sub": "Minor formatting and cosmetic assembly only", "quadrant": "U" }
  ],
  "context": {
    "page": "/self-check/",
    "referrer": "document.referrer or ''",
    "utm": { "source": "", "medium": "", "campaign": "", "content": "", "term": "" },
    "startedAt": "ISO",
    "durationSec": 142,
    "locale": "navigator.language",
    "timezone": "Intl.DateTimeFormat().resolvedOptions().timeZone"
  }
}
```
- The `answers` array holds all 10 cards in id order. For IDK answers: `tier: 5`, `points: 3`, `label: "I don't know"`, `sub: ""`, `quadrant: null`.
- Read UTM parameters on first page load and keep them in `sessionStorage` (try/catch).

**Extended interest** (`type: "extended_interest"`): same envelope (`version`, `submissionId`, `attemptId`, `submittedAt`, `email`, `emailDomain`, `consent`, `hp`, `context`) plus:
```json
{ "qualifiers": { "planningProjectThisYear": true, "canAnswerFinanceAndOps": true },
  "result": { "total": 62, "band": "Stable", "weakest": "Trusted", "dimensions": { … } } }
```

### 11.3 Frontend form behaviour (both forms)
1. Check `checkWorkEmail()` on submit. If invalid, show the message in the status line (critical colour), put `aria-invalid` on the input and focus it. Don't send.
2. **Honeypot:** a hidden input `name="company_website"` (off-screen, `tabindex=-1`, `autocomplete=off`). If it's filled, act as if it succeeded but send nothing.
3. While sending: disable the button, change its text to `Sending…`.
4. **Success** (HTTP 2xx with `{ "ok": true }`):
   - Report: `Sent. Check {email} in the next few minutes.` The button changes to `Sent ✓` and stays disabled. Change the main button's label to `Report sent`.
   - Extended: `Request received. We'll confirm your place at {email}.`
5. **Errors:**
   - 400 → `That didn't go through. Check your email and try again.`
   - 429 → `Too many requests. Please wait a minute and try again.`
   - Timeout / network / 5xx → `Something went wrong on our side. Please try again.` and re-enable the button.
6. Client rate limit: at most 3 submits per form per attempt. After that, show the 429 message.
7. Never show "sent" before n8n answers `ok`.

### 11.4 n8n workflow spec (build it in n8n; describe it in `docs/auxo-score/n8n.md`)

**Workflow A: `auxo-score-report`**
1. **Webhook** node: POST, path `auxo-score-report`, respond via a "Respond to Webhook" node. Set CORS so the allowed origins are `https://auxodata.com` and `https://www.auxodata.com` (plus localhost for dev).
2. **Validate** (Code node): `type` is correct, the email matches the regex and isn't a free domain (same list), `consent === true`, `hp === ""`, `result.total` is 0–100, and `answers.length === 10`. If invalid, respond `400 { ok:false, error:"invalid" }`.
3. **Rate limit:** at most 5 requests per email per hour and 20 per IP per hour (Redis or a Sheet lookup). Over the limit → `429`.
4. **Dedupe** on `submissionId`. If it's been seen, respond `200 { ok:true }` and stop.
5. **Store** a row in Google Sheet `AUXO Score – Submissions` (or BigQuery `auxo.score_submissions`). Columns: submittedAt, submissionId, attemptId, type, email, emailDomain, total, band, weakest, idkCount, the 5 dimension scores, answers_json, utm_*, referrer, durationSec, timezone, emailStatus.
6. **Build the email** (HTML plus a plain-text version) from `admin@auxodata.com`. Subject: `Your AUXO Score: {total}/100 ({band})`. Content:
   - Score, band and band line
   - A table of the 5 dimensions with 0–100 values (weakest highlighted)
   - Weakest dimension + focus copy
   - The 10 questions with the answer chosen, grouped by dimension
   - Next step: a short line and a link to the contact page ("Talk to us about your score")
   - Footer: company details, why they got this email, and an unsubscribe/opt-out line
   - Keep the brand look: near-black text, lime used only as a fill or rule, Montserrat/Arial fallback
7. **Send** (Gmail/SMTP node). Update `emailStatus` to `sent` or `failed`.
8. **Internal alert** to Vignesh (email or Slack): `New AUXO Score report: {emailDomain}, {total}/100 ({band}), weakest {weakest}`.
9. **Respond** `200 { ok:true }`. If sending fails after the row is stored, still respond `200` and flag the row for a manual resend.

**Workflow B: `auxo-score-extended`**
Same steps 1–5 (validate `qualifiers` are both true; store in the `Extended Interest` tab). Send a confirmation email: subject `Your AUXO extended assessment request`, body `We've received your request. We keep seats limited each month and will confirm your place by email.` Send an internal alert. Respond `200 { ok:true }`. No seat logic yet.

---

## 12. Analytics (only if the user accepted analytics cookies)

Hook into the site's existing consent and analytics setup. If there's none, skip this section entirely and tell me. Events:

| Event | When | Properties |
|---|---|---|
| `score_start` | Start or Resume clicked | `resumed: bool` |
| `score_card_answered` | each answer | `cardId, dimension, tier, isIdk, index` |
| `score_back` | Back clicked | `fromCard` |
| `score_complete` | result shown | `total, band, weakest, idkCount, durationSec` |
| `score_inconclusive` | inconclusive shown | `atCard, idkCount` |
| `score_email_open` | email form opened | |
| `score_email_submit` | successful submit | `band` (**never the email address**) |
| `score_email_error` | failed submit | `status` |
| `score_extended_click` | extended link opened | |
| `score_extended_qualified` | Continue clicked | |
| `score_extended_submit` | successful extended submit | |

No personal data goes into analytics.

---

## 13. Site-wide updates

1. **Remove the old self-check completely:** the page, its components, the 28 statements, the four-pillar scoring and the old band names (Shaky / Patchy / Manual / Strong). Show me the list before deleting.
2. **Homepage AUXO Score section:** keep the headline `Get your company's health report.` and the BlackLine stat with its footnote. Replace `No sign-up. Nothing leaves your browser.` with `No sign-up. Your answers stay in your browser unless you ask for your report by email.` Change the CTA to go to `/self-check/`, and update any mention of four pillars, 28 questions or "3 minutes" there.
3. **`/self-check/` meta:** title `AUXO Score: data health check in 10 questions | AUXO Data Labs` (under 60 characters if possible; otherwise propose a shorter one); description `Ten fact-based questions across accuracy, completeness, consistency, timeliness and trust. Get a 0–100 data health score in about 3 minutes.` Keep canonical, OG and JSON-LD patterns consistent with the rest of the site. Flag that the page's OG image needs refreshing (don't design one).
4. **`llms.txt` / `llms-full.txt`:** replace the old self-check description with the new framework (5 dimensions, 10 questions, scoring, bands). Don't include the question wording.
5. **Other mentions:** search the whole repo for `self-check`, `pillar`, `Patchy`, `Manual`, `28 statements` and `3 minutes`, and list every hit for me to review.

---

## 14. File structure (adapt to the repo's conventions)

```
src/
  lib/auxo-score/
    types.ts
    cards.ts
    scoring.ts
    email.ts
    storage.ts        // safe localStorage/sessionStorage helpers
    submit.ts         // payload builders + fetch with timeout + error mapping
    analytics.ts      // consent-aware event helper
  components/auxo-score/
    AuxoScore.astro   // root: all screens + <script> client controller
    Radar.ts          // SVG builder (pure function → string)
    ExtendedGate.astro
  pages/self-check/index.astro
docs/auxo-score/
  prototype.html
  n8n.md
  README.md           // how it works, env vars, how to change questions
tests/auxo-score/
  scoring.test.ts
  email.test.ts
  layout.test.ts
```

---

## 15. Unit tests (Vitest; add it as a dev dependency only if there's no test runner)

- All answers tier 1 → total 100, Healthy, and weakest = Trusted (tie → first in tie order).
- All tier 4 → 0, Critical, weakest = Trusted.
- Cards 1–4 = 10, 5–8 = 7, 9–10 = 3 → total 74, Stable, dims `{Accurate:20, Complete:20, Consistent:14, Timely:14, Trusted:6}`, weakest Trusted.
- Band edges: 39 → Critical, 40 → Fragile, 59 → Fragile, 60 → Stable, 79 → Stable, 80 → Healthy.
- Tie-break: Consistent = Accurate = lowest → Consistent. Complete = Timely = lowest → Complete.
- IDK: 2 IDKs → normal scoring, each worth 3. A 3rd IDK → `idkCount === 3` (triggers inconclusive). Changing one IDK back → count goes down.
- Layout: ascending cards = `[1,2,3,4]`, descending = `[4,3,2,1]`, and shuffle cards are a permutation of 1–4 (a seeded rng gives the same result every time).
- Email: `a@b.co` valid; `x@gmail.com` rejected with the company-email message; `bad@` rejected with the format message; uppercase and whitespace trimmed.
- Radar: every value × 5 lands in 0–100.

---

## 16. Acceptance checklist (run through all of it and report)

- [ ] `/self-check/` loads the intro. The old test is gone and the site builds without errors.
- [ ] 10 cards in order, with the right dimension pill and counter. Back is hidden on card 1.
- [ ] Cards 1 and 7 go best → worst from A to O. Cards 2, 4, 6, 8, 9 go worst → best. Cards 3, 5, 10 are shuffled and keep the same order when you go Back.
- [ ] Tapping a block highlights it for 150ms, then moves on. Double taps don't skip a card.
- [ ] Back shows the previous choice highlighted. Same choice → advances with no change. Different choice → updates. `Keep & Continue →` works.
- [ ] The 3rd "I don't know" goes straight to Inconclusive. Retake starts fresh with a new shuffle.
- [ ] Loader lasts 3s with the two messages at 0s and 1.5s.
- [ ] Result: score, band chip + line, radar, table and focus callout all match the maths.
- [ ] Email: a free domain is blocked, an invalid format is blocked, success only after n8n `ok`, and the error states work (test with a mock server or by pointing the env to a request bin).
- [ ] Extended: the link is quiet, Continue stays disabled until both boxes are ticked, the seat form posts `extended_interest`, and Back to my score keeps the result.
- [ ] Refreshing mid-test offers Resume. Private mode (storage blocked) still works end to end.
- [ ] Keyboard only: A/U/X/O/I/Backspace, Tab order and visible focus all work.
- [ ] Screen reader: question announced, `aria-pressed` on blocks, status lines announced, radar has an aria-label plus the table.
- [ ] 360px wide: no horizontal scroll, the grid fits, radar labels aren't clipped. Desktop looks right too.
- [ ] Reduced motion: no animation.
- [ ] Lighthouse on `/self-check/`: Accessibility ≥ 95, no layout shift from the test (CLS stays 0), no new font requests.
- [ ] Homepage copy, meta and llms files updated. Repo search hits listed for me.
- [ ] Unit tests pass.

---

## 17. Deliverables when done

1. Branch `feat/auxo-score-v2` with small, clear commits.
2. A summary: files added / changed / removed, and any decisions you made that this prompt didn't cover.
3. `docs/auxo-score/n8n.md` with both workflows node by node, plus a sample payload for each (to paste into n8n's test webhook).
4. The list of repo search hits (section 13.5) and anything that needs my input.
5. Don't merge or deploy. I'll review first.
