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
    title: "The studio.",
    titleHighlight: "studio",
    lead: "AUXO is a small data and AI studio for real estate. We turn the information you already hold into reporting, forecasts, and automation your team can trust — and run on its own.",
    primaryCta: { text: "Start a conversation", href: "/contact/" },
    secondaryCta: { text: "See what we do", href: "/services/" },
  },
  beliefs: {
    title: "What we believe",
    titleHighlight: "believe",
    lead: "Four convictions shape every engagement.",
    items: [
      {
        title: "Real estate, nothing else",
        desc: "Property is the only sector we work in. The work is sharper for the focus.",
      },
      {
        title: "Built to run",
        desc: "We deliver systems in daily use — not a deck, and not a pilot that stalls.",
      },
      {
        title: "Yours to keep",
        desc: "You own everything we build, on your own systems. The knowledge stays in-house and passes to the next generation that runs it. No lock-in, no black box.",
      },
      {
        title: "Plain and honest",
        desc: "We are clear about the trade-offs and clear about fit. Your name stays private.",
      },
    ],
  },
  how: {
    title: "How we work",
    titleHighlight: "work",
    subtitle: "Three steps, no drama. We move from a real problem to a system your team owns.",
    steps: [
      {
        label: "First",
        title: "Understand",
        desc: "We sit with your team and learn how the business actually runs, and where the drag really is.",
      },
      {
        label: "Then",
        title: "Build",
        desc: "We build on your own data and put it to work quietly, in production, alongside the people who use it.",
      },
      {
        label: "Finally",
        title: "Hand over",
        desc: "Your team takes the controls and runs it with confidence. We step back when you no longer need us.",
      },
    ],
  },
  where: {
    title: "Where we work",
    titleHighlight: "work",
    body: "We are based in Dubai and work with property teams across the UAE and the wider Gulf. Your data stays where you want it, on the terms you set.",
    points: [
      { label: "Based in", value: "Dubai" },
      { label: "Serving", value: "The UAE and the Gulf" },
      { label: "Focused on", value: "Real estate only" },
    ],
  },
  engagement: {
    title: "How we work with you",
    titleHighlight: "with you",
    lead: "Working with an outside team should feel safe. Here is what you can expect from the first conversation onward.",
    reassurance: "We are happy to sign an NDA before we begin.",
    principles: [
      {
        title: "Discreet and confidential",
        desc: "We work quietly in the background. Your name, your numbers, and your plans stay between us.",
      },
      {
        title: "On your own systems",
        desc: "Everything runs inside your environment, under your own access. Your data never leaves your control.",
      },
      {
        title: "Your team owns the result",
        desc: "What we build is yours to keep and run. There is no lock-in and nothing to renew to stay switched on.",
      },
      {
        title: "Plain communication",
        desc: "You hear from us in clear language, with the trade-offs spelled out. No jargon, and no black box.",
      },
    ],
  },
  cta: {
    title: "Let's talk.",
    description: "Tell us what's slowing you down, and we'll show you where to start.",
    descriptionHighlight: "where to start",
    ctaText: "Start a conversation",
    ctaHref: "/contact/",
    secondaryText: "Read our thinking",
    secondaryHref: "/insights/",
    reassurance: "A real person replies within one business day.",
  },
};
