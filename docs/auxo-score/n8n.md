# AUXO Score: n8n workflows

Two workflows. The site POSTs JSON to each webhook and only shows "sent" when n8n answers `200 { "ok": true }`.

Responses the site understands:

| Status | Body | Site shows |
|---|---|---|
| 200 | `{ "ok": true }` | Success message |
| 400 | `{ "ok": false, "error": "invalid" }` | "That didn't go through. Check your email and try again." |
| 429 | `{ "ok": false, "error": "rate_limited" }` | "Too many requests. Please wait a minute and try again." |
| 5xx / timeout (10s) | — | "Something went wrong on our side. Please try again." |

---

## Workflow A: `auxo-score-report`

1. **Webhook**
   - Method `POST`, path `auxo-score-report`, Respond: "Using 'Respond to Webhook' node".
   - Options → Allowed origins (CORS): `https://auxodata.com,https://www.auxodata.com,http://localhost:4340`.
2. **Validate** (Code node). Reject with 400 unless all hold:
   - `type === "full_report_request"`
   - `email` matches `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` and its domain isn't in the free-domain list (copy it from `src/lib/auxo-score/email.ts`)
   - `consent === true`, `hp === ""`
   - `result.total` is an integer 0–100
   - `answers.length === 10`
   ```js
   const b = $json.body;
   const FREE = [/* paste FREE_DOMAINS */];
   const email = String(b.email || "").trim().toLowerCase();
   const ok = b.type === "full_report_request"
     && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
     && !FREE.includes(email.split("@")[1])
     && b.consent === true && b.hp === ""
     && Number.isInteger(b.result?.total) && b.result.total >= 0 && b.result.total <= 100
     && Array.isArray(b.answers) && b.answers.length === 10;
   return [{ json: { ...b, email, valid: ok, ip: $json.headers["x-forwarded-for"] || "" } }];
   ```
   - **IF** `valid` is false → **Respond to Webhook** `400 { "ok": false, "error": "invalid" }`.
3. **Rate limit**: max 5 per email per hour, 20 per IP per hour (Redis `INCR` + `EXPIRE 3600`, or count rows in the Sheet with `submittedAt` in the last hour). Over the limit → Respond `429 { "ok": false, "error": "rate_limited" }`.
4. **Dedupe** on `submissionId` (lookup in the Sheet). Already seen → Respond `200 { "ok": true }` and stop.
5. **Store**: append a row to Google Sheet `AUXO Score – Submissions`, tab `Reports`. Columns:
   `submittedAt, submissionId, attemptId, type, email, emailDomain, total, band, weakest, idkCount, Accurate, Complete, Consistent, Timely, Trusted, answers_json, utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer, durationSec, timezone, emailStatus` (`emailStatus` = `pending`).
6. **Build email** (Code node → HTML + plain text). From `admin@auxodata.com`, subject `Your AUXO Score: {total}/100 ({band})`. Include:
   - Score, band, band line
   - Table of the 5 dimensions with 0–100 values (`result.radar`), weakest row highlighted
   - Weakest dimension + `result.focus`, the three `result.focusSteps` and `result.focusGood` (these steps are only shown in the email, not on the site)
   - The 10 questions with the chosen answer, grouped by dimension (from `answers`)
   - "Talk to us about your score" → `https://auxodata.com/contact/`
   - Footer: company details, why they got the email, opt-out line
   - Brand: near-black text, lime (`#A3E635`) only as a fill or rule, `Montserrat, Arial, sans-serif`
7. **Send** (Gmail / SMTP node). Update the row's `emailStatus` to `sent` or `failed`.
8. **Internal alert** (email or Slack) to Vignesh: `New AUXO Score report: {emailDomain}, {total}/100 ({band}), weakest {weakest}`.
9. **Respond to Webhook** `200 { "ok": true }`. If sending failed after the row was stored, still respond 200 and leave `emailStatus = failed` for a manual resend.

### Sample payload (paste into the test webhook)

```json
{
  "type": "full_report_request",
  "version": "auxo-score-10card-v1",
  "submissionId": "7f7a1c1e-6c1b-4a8e-9d53-2f3a6d0c9b11",
  "attemptId": "0b6f2a0e-3c1d-4f7e-8a2b-9d1c4e5f6a7b",
  "submittedAt": "2026-10-01T09:30:00.000Z",
  "email": "name@company.com",
  "emailDomain": "company.com",
  "consent": true,
  "hp": "",
  "result": {
    "total": 74,
    "band": "Stable",
    "bandLine": "Good foundations with a few blind spots.",
    "weakest": "Trusted",
    "focus": "People check or rebuild the numbers before they rely on them. Start by finding out why the official reports get second-guessed.",
    "idkCount": 0,
    "dimensions": { "Accurate": 20, "Complete": 20, "Consistent": 14, "Timely": 14, "Trusted": 6 },
    "radar": { "Accurate": 100, "Complete": 100, "Consistent": 70, "Timely": 70, "Trusted": 30 }
  },
  "answers": [
    { "cardId": 1, "dimension": "Accurate", "question": "What percentage of numbers shown to leadership or the board are touched, calculated, or adjusted by hand in spreadsheets first?", "tier": 1, "points": 10, "isIdk": false, "label": "None", "sub": "100% pulled directly from dashboards/systems", "quadrant": "A" },
    { "cardId": 2, "dimension": "Accurate", "question": "In the past 6 months, how often has a reported number or slide deck had to be re-sent or corrected after a leadership meeting?", "tier": 1, "points": 10, "isIdk": false, "label": "Zero times", "sub": "What gets presented stays final", "quadrant": "O" },
    { "cardId": 3, "dimension": "Complete", "question": "Where does critical operational data (e.g. pipeline status, inventory, pricing, cost tracking) actually live?", "tier": 1, "points": 10, "isIdk": false, "label": "Central systems", "sub": "Fully tracked in CRM, ERP, or warehouse", "quadrant": "U" },
    { "cardId": 4, "dimension": "Complete", "question": "When leadership asks 'Why is this metric up or down?', how long does it take to pull the full breakdown?", "tier": 1, "points": 10, "isIdk": false, "label": "Under 5 minutes", "sub": "Instant drill-down on current tools", "quadrant": "O" },
    { "cardId": 5, "dimension": "Consistent", "question": "Does your company have single, documented definitions for core KPIs (e.g. 'Active Customer', 'Gross Margin', 'Churn')?", "tier": 2, "points": 7, "isIdk": false, "label": "Written down", "sub": "But different teams still interpret loosely", "quadrant": "X" },
    { "cardId": 6, "dimension": "Consistent", "question": "How often do two different department heads show up to a meeting with conflicting numbers for the same thing?", "tier": 2, "points": 7, "isIdk": false, "label": "Rarely", "sub": "Only if there's a clear cut-off timing difference", "quadrant": "X" },
    { "cardId": 7, "dimension": "Timely", "question": "How many calendar days after month-end until executive metrics and financials are locked and shared?", "tier": 2, "points": 7, "isIdk": false, "label": "6 to 10 days", "sub": "Standard, predictable turnaround", "quadrant": "U" },
    { "cardId": 8, "dimension": "Timely", "question": "How old is the operational data managers look at when making day-to-day decisions?", "tier": 2, "points": 7, "isIdk": false, "label": "Yesterday's close", "sub": "Refreshed nightly via batch", "quadrant": "X" },
    { "cardId": 9, "dimension": "Trusted", "question": "How common is it for managers to maintain private 'shadow' spreadsheets because they don't fully trust central dashboards?", "tier": 3, "points": 3, "isIdk": false, "label": "Common", "sub": "Most managers maintain a side sheet to be safe", "quadrant": "U" },
    { "cardId": 10, "dimension": "Trusted", "question": "Before leadership makes a major strategic bet, what happens to the underlying data?", "tier": 3, "points": 3, "isIdk": false, "label": "Heavy audit", "sub": "Days spent validating before trusting", "quadrant": "A" }
  ],
  "context": {
    "page": "/auxo-score/",
    "referrer": "",
    "utm": { "source": "linkedin", "medium": "social", "campaign": "score-launch", "content": "", "term": "" },
    "startedAt": "2026-10-01T09:27:38.000Z",
    "durationSec": 142,
    "locale": "en-GB",
    "timezone": "Asia/Dubai"
  }
}
```

"I don't know" answers arrive as `{ "tier": 5, "points": 3, "isIdk": true, "label": "I don't know", "sub": "", "quadrant": null }`.

---

## Workflow B: `auxo-score-extended`

Steps 1–5 as above, with these differences:

- Webhook path `auxo-score-extended`.
- Validate `type === "extended_interest"` and `qualifiers.planningProjectThisYear === true && qualifiers.canAnswerFinanceAndOps === true` (no `answers` check).
- Store in the `Extended Interest` tab: `submittedAt, submissionId, attemptId, email, emailDomain, total, band, weakest, Accurate, Complete, Consistent, Timely, Trusted, utm_*, referrer, timezone`.

Then:

6. **Confirmation email**. Subject `Your AUXO extended assessment request`, body: `We've received your request. We keep seats limited each month and will confirm your place by email.`
7. **Internal alert** to Vignesh: `New extended request: {emailDomain}, {total}/100 ({band}), weakest {weakest}`.
8. **Respond** `200 { "ok": true }`. No seat logic yet.

### Sample payload

```json
{
  "type": "extended_interest",
  "version": "auxo-score-10card-v1",
  "submissionId": "c2d4e6f8-1a3b-4c5d-8e7f-9a0b1c2d3e4f",
  "attemptId": "0b6f2a0e-3c1d-4f7e-8a2b-9d1c4e5f6a7b",
  "submittedAt": "2026-10-01T09:35:00.000Z",
  "email": "cfo@company.com",
  "emailDomain": "company.com",
  "consent": true,
  "hp": "",
  "qualifiers": { "planningProjectThisYear": true, "canAnswerFinanceAndOps": true },
  "result": {
    "total": 74,
    "band": "Stable",
    "weakest": "Trusted",
    "dimensions": { "Accurate": 20, "Complete": 20, "Consistent": 14, "Timely": 14, "Trusted": 6 }
  },
  "context": {
    "page": "/auxo-score/",
    "referrer": "",
    "utm": { "source": "", "medium": "", "campaign": "", "content": "", "term": "" },
    "startedAt": "2026-10-01T09:27:38.000Z",
    "durationSec": 442,
    "locale": "en-GB",
    "timezone": "Asia/Dubai"
  }
}
```
