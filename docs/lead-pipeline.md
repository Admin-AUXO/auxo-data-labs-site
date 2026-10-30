# Lead pipeline

Post → AUXO Score (work email before the result) → Apply for a Founder review (`/apply/`) → Google booking page → founder call.

## What each step does

| Step | Site code | Writes |
|---|---|---|
| Score email step | `src/components/auxo-score/controller.ts` | `/api/lead` type `score`, with the band, first fix and steps |
| Application | `src/scripts/forms/contact.ts` | `/api/lead` type `application`, then shows the booking iframe |
| `/api/lead` | `netlify/functions/lead.mts` | Row in "AUXO GTM Pipeline 2026" → tab **Inbound**; Sequenzy subscriber with tags; the Score report or the applicant confirmation email |
| Nurture week | `netlify/functions/followups.mts` (daily, 06:00 UTC) | Score takers who haven't applied get three emails: day 2 business blog, day 4 technical blog, day 6 "What happens on a Founder review" (swap for the Neurostellar case study once approved). Each ends with Apply and the live places-left count. Marks "Nurture N sent" in Notes |
| Places left | `netlify/functions/spots.mts` (`/api/spots`) | 10 Founder reviews a week (Monday to Sunday, Dubai time), counted from applications in the Inbound tab. Shown on /apply/ and in the nurture emails |
| Deposit | `netlify/functions/pay.mts`, `pay-confirm.mts`; pages `/pay/` and `/pay/thanks/` | See Payments below |
| Booking | Google appointment page (`siteData.bookingEmbedUrl`) | Calendar event; `auxo-google-workspace` `npm run bookings` sets Stage = Booked and sends GA4 `booking_made` |

UTM tags are captured on every page load (`captureUtm` in `src/lib/auxo-score/storage.ts`) and kept for the visit, so a later Score or application carries the post's tags.

## Netlify environment variables (set in the Netlify UI, never in the repo)

| Variable | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT` | Full JSON of `~/.auxo/key.json` (owner's choice, 29 Oct 2026); impersonates admin@ for the Sheet |
| `STRIPE_SECRET_KEY` | Stripe **test** key today; the owner swaps in the live key before the first real proposal |
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
- Nurture week: daily function above.

The newsletter goes to the `newsletter` tag only, as a Sequenzy campaign every 2 weeks, segmented by band.

## Payments

After a yes, Vignesh creates the proposal in the `auxo-google-workspace` repo with `npm run proposal -- --client "Acme" --email cfo@acme.com --covers "Deep-dive audit" --total 20000 --currency AED --deposit 50 --vat 5` in `auxo-google-workspace`. It adds a row to the pipeline sheet tab **Proposals** (status Approved) and prints a private link, `https://auxodata.com/pay/?p=P-YYMM-XXXXXXXX`, to put in the proposal email.

The page (noindex, not in the sitemap) shows the client, what the deposit covers, the reference, deposit, VAT and amount due, plus the exit, ownership and "Approved by Vignesh Ramesh" lines. The button creates a Stripe Checkout session for that proposal only; nothing is reusable or public. After payment, `/pay/thanks/` confirms the session with Stripe and marks the row Paid. Only rows with status Approved, Sent or Open can be paid. Build phases above a deposit go on Stripe invoices instead.

`STRIPE_SECRET_KEY` on Netlify is the **test** key today. Swap it for the live key (from the Stripe dashboard, by the owner) before the first real proposal.

## GA4 events

`score_start`, `score_complete`, `application_submit` (`stage`, `band`, `tool`), `booking_open`, and `booking_made` (Measurement Protocol, from the bookings script). The site pushes `campaign`, `source` and `poster`; GTM sends them to GA4 as `lead_campaign`, `lead_source` and `lead_poster`, because GA4 can read plain `campaign`/`source` event params as traffic source. Key events: `application_submit`, `booking_made`. GTM container version 6.
