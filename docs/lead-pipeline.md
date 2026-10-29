# Lead pipeline

Post → AUXO Score (work email before the result) → Apply for a Founder review (`/apply/`) → Google booking page → founder call.

## What each step does

| Step | Site code | Writes |
|---|---|---|
| Score email step | `src/components/auxo-score/controller.ts` | `/api/lead` type `score`, with the band, first fix and steps |
| Application | `src/scripts/forms/contact.ts` | `/api/lead` type `application`, then shows the booking iframe |
| `/api/lead` | `netlify/functions/lead.mts` | Row in "AUXO GTM Pipeline 2026" → tab **Inbound**; Sequenzy subscriber with tags; the Score report or the applicant confirmation email |
| Day-3 follow-up | `netlify/functions/followups.mts` (daily, 06:00 UTC) | One email to Score takers who haven't applied after 3 days; marks "Follow-up sent" in the Notes column |
| Booking | Google appointment page (`siteData.bookingEmbedUrl`) | Calendar event; `auxo-google-workspace` `npm run bookings` sets Stage = Booked and sends GA4 `booking_made` |

UTM tags are captured on every page load (`captureUtm` in `src/lib/auxo-score/storage.ts`) and kept for the visit, so a later Score or application carries the post's tags.

## Netlify environment variables (set in the Netlify UI, never in the repo)

| Variable | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT` | Full JSON of a service account with DWD `spreadsheets` scope. Prefer a new, sheets-only key over `~/.auxo/key.json` |
| `GOOGLE_IMPERSONATE` | `admin@auxodata.com` (default) |
| `PIPELINE_SHEET_ID` | `1_Ip3k2n8NUa6Fn3SERXstQO6EeWkWNpXpKiSTIbUX2o` |
| `SEQUENZY_API_KEY` | API key for the AUXO company in Sequenzy (not the Neurostellar one) |
| `SEQUENZY_FROM` | `AUXO <hello@auxodata.com>` (auxodata.com is a verified Sequenzy sending domain) |

Without the Google variables the function returns 502 and the form shows its error message. Without Sequenzy it still writes the sheet.

## Sequenzy tags

`score-taker` or `founder-review-applicant`, `band-<band>`, `campaign-<campaign>`, and `newsletter` only when the box was ticked.

## Emails

All three are sent from code as direct content (`netlify/lib/emails.mts`), from `hello@auxodata.com`, replies to `hello@`. No Sequenzy templates or automations are needed. Vignesh still sends a personal reply to every applicant within one business day.

- Score report: on the Score email step.
- Applicant confirmation: on application.
- Day-3 follow-up: daily function above.

The newsletter goes to the `newsletter` tag only, as a Sequenzy campaign every 2 weeks, segmented by band.

## GA4 events

`score_start`, `score_complete`, `application_submit` (`stage`, `band`, `tool`), `booking_open`, and `booking_made` (Measurement Protocol, from the bookings script). The site pushes `campaign`, `source` and `poster`; GTM sends them to GA4 as `lead_campaign`, `lead_source` and `lead_poster`, because GA4 can read plain `campaign`/`source` event params as traffic source. Key events: `application_submit`, `booking_made`. GTM container version 6.
