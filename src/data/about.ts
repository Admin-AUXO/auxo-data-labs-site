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
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    titleHighlight: string | string[];
    lead: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
    reassurance: string;
  };
  beliefs: {
    title: string;
    titleHighlight?: string | string[];
    lead: string;
    items: AboutBelief[];
    aiLine: string;
  };
  how: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    steps: AboutStep[];
    link: { text: string; href: string };
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
  meta: {
    title: "About AUXO: data and AI, yours to keep",
    description:
      "AUXO Data Labs is a founder-led data and AI service platform in Dubai, serving the UAE, the US and Europe. Clients own what we build.",
  },
  hero: {
    title: "Data first. Then AI.",
    titleHighlight: "Then AI",
    lead: "AUXO gets your data ready for AI, then sets up the tools and agents that run on it. Founded in 2025 and based in Dubai, we work with funded startups, mid-sized companies and enterprise teams in the UAE, the US and Europe.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl },
    secondaryCta: { text: "See how it works", href: "/how-it-works/" },
    reassurance: siteData.reassurance,
  },
  beliefs: {
    title: "What we believe",
    titleHighlight: "believe",
    lead: "Four convictions shape every engagement.",
    items: [
      {
        title: "Built to run",
        desc: "We deliver systems in daily use, not a deck and not a pilot that stalls.",
      },
      {
        title: "Yours to keep",
        desc: "You own everything we build: the code, the setup, the documentation and the accounts. No lock-in, no black box.",
      },
      {
        title: "A person approves",
        desc: "AI does the groundwork. A person signs off on what goes out.",
      },
      {
        title: "Plain and honest",
        desc: "We are clear about the trade-offs and clear about fit. We will tell you when not to build.",
      },
    ],
    aiLine: siteData.aiLine,
  },
  how: {
    title: "How we work",
    titleHighlight: "work",
    subtitle: "Analyze what you have. Advise on what fits. Build it and hand it over.",
    steps: [
      {
        label: "First",
        title: "Analyze",
        desc: "An honest read of your business and your data, starting with the free AUXO Score.",
      },
      {
        label: "Then",
        title: "Advise",
        desc: "The right AI and data setup for your team: a roadmap, the right tools, and clear rules on who approves what.",
      },
      {
        label: "Next",
        title: "Build",
        desc: "Data infrastructure, AI tools and AI agent teams, set up end to end on the systems you already run.",
      },
      {
        label: "Finally",
        title: "Hand over",
        desc: "Your team takes the controls. No retainer to renew. Managed upkeep is there if you want it.",
      },
    ],
    link: { text: "See the full detail", href: "/how-it-works/" },
  },
  where: {
    title: "Where we work",
    titleHighlight: "work",
    body: "We are based in Dubai Internet City and work with teams across the UAE, the US and Europe. We work remotely by default. We handle your data on the terms you set, taking only what the work needs.",
    points: [
      { label: "Based in", value: "Dubai" },
      { label: "Serving", value: "The UAE, the US and Europe" },
      { label: "Built for", value: "Funded startups, mid-sized companies and enterprise teams" },
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
        desc: "We're glad to sign an NDA before the first detailed conversation. Your name, your numbers and your plans stay between us.",
      },
      {
        title: "Careful with your data",
        desc: "We take only the data the work needs, sampled, anonymised or hashed wherever we can. We never reuse it, host it for resale or sell it.",
      },
      {
        title: "Open about money",
        desc: "We tell you how we get paid, including any referral fee, before you commit.",
      },
      {
        title: "A person, not a process",
        desc: "You work directly with the founders, not an account manager relaying messages. Clear language, no black box.",
      },
    ],
  },
  cta: {
    title: "Start with the problem, not a pitch.",
    titleHighlight: "not a pitch",
    description: "Now you know how we work. The next move is a short conversation. No pitch, no obligation.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "Read the blog",
    secondaryHref: "/blog/",
    reassurance: siteData.reassurance,
  },
};
