import { siteData } from "./site";

export interface AboutCommitment {
  title: string;
  desc: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

export interface Founder {
  name: string;
  role: string;
  drive: string;
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
    lead: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
    facts: AboutFact[];
  };
  commitments: {
    title: string;
    items: AboutCommitment[];
    note: string;
  };
  team: {
    title: string;
    story: string;
    linkLabel: string;
    founders: Founder[];
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
      "AUXO Data Labs is a data and AI firm in Dubai for funded companies, working in the UAE, the US and Europe. Clients own what we build.",
  },
  hero: {
    title: "Data first. Then AI.",
    lead: "We get your numbers ready for investors and the board, set up the AI and hand it over.",
    primaryCta: { text: "Apply for a Founder review", href: siteData.applyUrl },
    secondaryCta: { text: "See how it works", href: "/how-it-works/" },
    facts: [
      { label: "Based in", value: "Dubai Internet City" },
      { label: "Serving", value: "The UAE, the US and Europe" },
      { label: "Founded", value: "2025" },
      { label: "Built for", value: "Funded startups and scale-ups, growing companies and large organisations" },
    ],
  },
  commitments: {
    title: "What you can hold us to.",
    items: [
      { title: "Built to run", desc: "Systems your team uses every day." },
      { title: "Yours to keep", desc: "You own everything we build, in your name. No lock-in." },
      { title: "A person approves", desc: "AI does the groundwork. A person signs off on what goes out." },
      { title: "Clear advice", desc: "We say what fits, and when not to build." },
      {
        title: "Careful with your data",
        desc: "We take only what the work needs. We never reuse or resell it.",
      },
      { title: "Open about money", desc: "We tell you how we get paid, including any referral fee, up front." },
    ],
    note: "We will sign an NDA before we begin.",
  },
  team: {
    title: "One of us came from business. One from data.",
    story:
      "We kept meeting the same problem from both sides: decisions made on numbers nobody trusted. AUXO is how we fix it.",
    linkLabel: "Connect on LinkedIn",
    founders: [
      {
        name: "Vignesh Ramesh",
        role: "Co-Founder & CEO",
        drive: "Wants to know how a business really runs, and why decisions get stuck.",
        lines: [
          "Mechanical engineer by training. Enterprise systems at IBM, then cross-border trade at RVD Commerce.",
          "Leads scoping and planning.",
        ],
        linkedin: "https://www.linkedin.com/in/vig-auxo",
      },
      {
        name: "Ajay Kumar",
        role: "Co-Founder & CTO",
        drive: "Wants every number to be one a team can trust, and every system to keep running.",
        lines: [
          "Computer science engineer by training. In data and analytics ever since.",
          "Leads the build: data, tools and agents.",
        ],
        linkedin: "https://www.linkedin.com/in/ajaykumar9795",
      },
    ],
  },
  cta: {
    title: "Start with the problem.",
    titleHighlight: "the problem",
    description: "The next step is a short call.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance: siteData.reassurance,
  },
};
