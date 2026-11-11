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

For most marketing pages in this repo (two CTAs only: "Apply for a Founder review" to `/apply/` is primary; "Take the AUXO Score" is secondary and the only CTA on cold content):

1. Text-only hero: value proposition, lead and direct CTA (no hero media)
2. Relevance or proof block that validates the buyer quickly
3. Core services, offers, or use-case paths
4. Process, methodology, or decision framework
5. Supporting proof, industry relevance, case material, or metrics
6. Objection-handling content such as FAQ, scope guidance, or fit criteria
7. Final CTA

## Section Pattern

Every section uses the same shape: heading + lead stacked (`SectionHeader`, no eyebrow label) over a full-width grid of cards, a ruled list or an accordion. Headings are two-tone: the second sentence is lighter with `HighlightText soften`. One green band per page at most, never directly above the closing CTA. Prefer a labelled example (`Specimen`, `Receipt`) over another paragraph.

## Offer Page Rules

There are no individual service pages; offers live on three pages (copy in `src/data/how-it-works.ts`, `pricing.ts`, `marketplace.ts`).

For How it works (`/how-it-works/`):

1. Lead with the three steps (Analyze, Advise, Build): who each suits, what it delivers, how long it takes.
2. Show managed upkeep as optional after Build, not as a fourth step.
3. Follow with the method and an FAQ for objection handling.
4. End with one clear CTA.

Analyze has three depths, always in this order and with these names: **AUXO Score** (10 questions, about 3 minutes, anyone), **Founder review** (30-minute founder call by application, every segment, 10 a week, written next steps, no charge) and the paid **Deep-dive audit** (systems review under NDA). Large organisations start with **One unit first**. Never use "free" as filler. If this disagrees with the positioning brief (`AUXO-Marketing/strategy/positioning/auxo_positioning_brief_2026-10.md`), the brief wins.

For Pricing (`/pricing/`):

1. One card per segment: startups (seed to Series B), growing companies (50–500 people), large organisations.
2. Each card: the way in, what comes first and next, timing, and one CTA. No prices anywhere public; "a fixed price per phase, set by scope, in writing".
3. Close with what every engagement includes, the FAQ, and the final CTA.

For Marketplace (`/marketplace/`):

1. Order: AUXO stacks first (the Stacks line-up, then the Custom stack card), then third-party tools. AUXO agents are Early access and are off the Stacks line-up; check the positioning brief before adding any.
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
