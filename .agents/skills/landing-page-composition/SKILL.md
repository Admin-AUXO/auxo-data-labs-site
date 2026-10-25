---
name: landing-page-composition
description: Use when planning or restructuring homepage, service page, about page, campaign page, or section order for this marketing website. Trigger for narrative flow changes, section sequencing, proof placement, CTA pacing, and page-level composition decisions.
---

# Landing Page Composition

Build the buying narrative before building sections.

## Narrative Order

Move the reader through this chain:

1. What is this?
2. Why should I care now?
3. Why should I trust you?
4. What exactly do you do?
5. What happens next?

If a section does not help answer one of those questions, it is probably clutter.

## Default Flow

For most marketing pages in this repo:

1. Hero with value proposition and direct CTA
2. Relevance or proof block that validates the buyer quickly
3. Core services, offers, or use-case paths
4. Process, methodology, or decision framework
5. Supporting proof, industry relevance, case material, or metrics
6. Objection-handling content such as FAQ, scope guidance, or fit criteria
7. Final CTA

## Offer Page Rules

There are no individual service pages; offers live on three pages (copy in `src/data/how-it-works.ts`, `pricing.ts`, `marketplace.ts`).

For How it works (`/how-it-works/`):

1. Lead with the three steps (Analyze, Advise, Build): who each suits, what it delivers, how long it takes.
2. Show managed upkeep as optional after Build, not as a fourth step.
3. Follow with the method and an FAQ for objection handling.
4. End with one clear CTA.

For Pricing (`/pricing/`):

1. One card per segment: startups (seed to Series B), growing companies (50–500 people), large organisations.
2. Each card: the way in, what comes first and next, timing, and one CTA. No prices; "a fixed price per phase, set by scope, in writing".
3. Close with what every engagement includes, the FAQ, and the final CTA.

For Marketplace (`/marketplace/`):

1. Order: AUXO stacks, then Built by AUXO agents, then third-party tools.
2. Keep how the client pays AUXO (one-off setup, optional upkeep) separate from vendor billing.

## Rules

- Put proof earlier than most marketing teams are comfortable with.
- Keep each section responsible for one job.
- Alternate dense and light sections so the page has pacing.
- Repeat CTA intent without repeating the same copy mechanically.
- Avoid stacking three abstract sections in a row.
- Use industries, personas, or use cases only when they sharpen buyer self-selection.
- Long pages need progressive CTA pacing: early primary access, mid-page assistive guidance, final close.
- Prefer specific labels such as `Primary output` or `Best when` over generic labels when the page is helping buyers choose.
- If a section can be cut without harming the buying decision, cut it.
