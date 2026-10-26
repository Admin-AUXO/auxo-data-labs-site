import { siteData } from "./site";

export interface AboutBelief {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

export interface AboutEngagementPrinciple {
  icon: string;
  title: string;
  desc: string;
}

export interface Founder {
  name: string;
  role: string;
  lines: string[];
  linkedin: string;
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
    facts: AboutFact[];
  };
  beliefs: {
    title: string;
    lead: string;
    items: AboutBelief[];
  };
  team: {
    title: string;
    lead: string;
    linkLabel: string;
    founders: Founder[];
  };
  engagement: {
    title: string;
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
    reassurance: string;
  };
}

export const aboutContent: AboutContent = {
  meta: {
    title: "About AUXO: data and AI, yours to keep",
    description:
      "AUXO Data Labs is a founder-led data and AI firm in Dubai, working with clients in the UAE, the US and Europe. Clients own what we build.",
  },
  hero: {
    title: "Data first. Then AI.",
    titleHighlight: "Then AI",
    lead: "A founder-led data and AI firm. We get your data ready, set up the AI, and hand it over.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl },
    secondaryCta: { text: "See how it works", href: "/how-it-works/" },
    facts: [
      { label: "Based in", value: "Dubai Internet City" },
      { label: "Serving", value: "The UAE, the US and Europe" },
      { label: "Founded", value: "2025" },
      { label: "Built for", value: "Startups, growing companies and large organisations" },
    ],
  },
  beliefs: {
    title: "What we believe",
    lead: "Four things shape how we work.",
    items: [
      {
        icon: "mdi:cog-outline",
        title: "Built to run",
        desc: "Systems your team uses every day. Not a deck, not a stalled pilot.",
      },
      {
        icon: "mdi:key-outline",
        title: "Yours to keep",
        desc: "You own everything we build, and it's all in your name. No lock-in.",
      },
      {
        icon: "mdi:account-check-outline",
        title: "A person approves",
        desc: "AI does the groundwork. A person signs off on what goes out.",
      },
      {
        icon: "mdi:message-text-outline",
        title: "Plain and honest",
        desc: "We're clear about what fits. We'll tell you when not to build.",
      },
    ],
  },
  team: {
    title: "The founding team",
    lead: "A founder leads every engagement, from first call to handover.",
    linkLabel: "Connect on LinkedIn",
    founders: [
      {
        name: "Vignesh Ramesh",
        role: "Co-Founder & CEO",
        lines: [
          "Ex-IBM systems engineer. 10+ years on large projects across the GCC, including BP Oman, RTA, DEWA and TransCo.",
          "Leads planning and work with large clients.",
        ],
        linkedin: "https://www.linkedin.com/in/vig-auxo",
      },
      {
        name: "Ajay Kumar",
        role: "Co-Founder & CTO",
        lines: [
          "Analytics architect. 10+ years building data and reporting systems for Fortune 500s and fast-growing firms in Europe, the US and the Middle East.",
          "Leads the build: data, tools and agents.",
        ],
        linkedin: "https://www.linkedin.com/in/ajaykumar9795",
      },
    ],
  },
  engagement: {
    title: "What you can hold us to",
    lead: "Working with an outside team should feel safe. Here's what to expect.",
    reassurance: "We are happy to sign an NDA before we begin.",
    principles: [
      {
        icon: "mdi:lock-outline",
        title: "Confidential by default",
        desc: "Your name, your numbers and your plans stay between us.",
      },
      {
        icon: "mdi:shield-check-outline",
        title: "Careful with your data",
        desc: "We take only what the work needs, with names removed where we can. We never reuse or resell it.",
      },
      {
        icon: "mdi:cash-multiple",
        title: "Open about money",
        desc: "We tell you how we get paid, including any referral fee, before you commit.",
      },
    ],
  },
  cta: {
    title: "Start with the problem, not a pitch.",
    titleHighlight: "not a pitch",
    description: "The next step is a short conversation. No obligation.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    reassurance: siteData.reassurance,
  },
};
