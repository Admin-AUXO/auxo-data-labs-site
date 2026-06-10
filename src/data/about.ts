import { siteData } from "./site";

export interface AboutBelief {
  title: string;
  desc: string;
}

export interface AboutStep {
  label: string;
  title: string;
  desc: string;
}

export interface AboutWherePoint {
  label: string;
  value: string;
}

export interface AboutEngagementPrinciple {
  title: string;
  desc: string;
}

export interface AboutContent {
  hero: {
    title: string;
    titleHighlight: string | string[];
    lead: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  beliefs: {
    title: string;
    titleHighlight?: string | string[];
    lead: string;
    items: AboutBelief[];
  };
  how: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    steps: AboutStep[];
  };
  where: {
    title: string;
    titleHighlight?: string | string[];
    body: string;
    points: AboutWherePoint[];
  };
  engagement: {
    title: string;
    titleHighlight?: string | string[];
    lead: string;
    reassurance: string;
    principles: AboutEngagementPrinciple[];
  };
  cta: {
    title: string;
    titleHighlight?: string | string[];
    description: string;
    descriptionHighlight?: string | string[];
    ctaText: string;
    ctaHref: string;
    secondaryText: string;
    secondaryHref: string;
    reassurance: string;
  };
}

export const aboutContent: AboutContent = {
  hero: {
    title: "The lab.",
    titleHighlight: "lab",
    lead: "AUXO is a specialist analytics and AI lab for real estate. We turn the information you already hold into reporting, forecasts, and automation your team can trust — and run on its own.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl },
    secondaryCta: { text: "See how we work", href: "/services/" },
  },
  beliefs: {
    title: "What we believe",
    titleHighlight: "believe",
    lead: "Four convictions shape every engagement.",
    items: [
      {
        title: "Real estate, nothing else",
        desc: "Property is the only sector we work in, so we start fluent in Gulf deal structures, registration, and AML — not learning them on your time.",
      },
      {
        title: "Built to run",
        desc: "We deliver systems in daily use, not a deck and not a pilot that stalls. Production from the first build, not a someday promise.",
      },
      {
        title: "Yours to keep",
        desc: "You own everything we build. The knowledge stays in-house and passes to whoever runs it next. No lock-in, no black box.",
      },
      {
        title: "Plain and honest",
        desc: "We are clear about the trade-offs and clear about fit. We will tell you when not to build.",
      },
    ],
  },
  how: {
    title: "How we build",
    titleHighlight: "build",
    subtitle: "Four steps, no drama. We move from a real problem to a system your team owns.",
    steps: [
      {
        label: "First",
        title: "Scope",
        desc: "We sit with your team and get the problem, and the first move, clear together.",
      },
      {
        label: "Then",
        title: "Build",
        desc: "We build in short, visible steps you can see working.",
      },
      {
        label: "Next",
        title: "Embed",
        desc: "We put it into your day-to-day, in production, alongside the people who use it.",
      },
      {
        label: "Finally",
        title: "Hand over",
        desc: "Your team takes the controls and runs it with confidence — no retainer to renew.",
      },
    ],
  },
  where: {
    title: "Where we work",
    titleHighlight: "work",
    body: "We are based in Dubai and work with property teams across the UAE and the wider Gulf — fluent in the governance and AML expectations regional institutions answer to. We handle your data on the terms you set, taking only what the work needs.",
    points: [
      { label: "Based in", value: "Dubai" },
      { label: "Serving", value: "The UAE and the Gulf" },
      { label: "Focused on", value: "Real estate only" },
    ],
  },
  engagement: {
    title: "What to expect",
    titleHighlight: "expect",
    lead: "Working with an outside team should feel safe. Here is what you can expect from the first conversation onward.",
    reassurance: "We are happy to sign an NDA before we begin.",
    principles: [
      {
        title: "Confidential by default",
        desc: "We're glad to sign an NDA before the first detailed conversation, and your name, your numbers, and your plans stay between us.",
      },
      {
        title: "Careful with your data",
        desc: "We take only the data the work needs — sampled, anonymised, or hashed wherever we can — handle it under NDA, and never reuse it for anything else.",
      },
      {
        title: "No dependency on us",
        desc: "Every engagement ends with your team trained and running it without us. We stay reachable if you want us — you're never reliant on us.",
      },
      {
        title: "A person, not a process",
        desc: "You work directly with the team doing the build, not an account manager relaying messages. Clear language, no black box.",
      },
    ],
  },
  cta: {
    title: "Start with the problem, not a pitch.",
    titleHighlight: "not a pitch",
    description: "Now you know how we work. The next move is a short conversation — no pitch, no obligation.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "Read our thinking",
    secondaryHref: "/insights/",
    reassurance: "A real person replies within one business day.",
  },
};
