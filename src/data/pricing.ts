import { siteData } from "./site";

export type LadderTier = "Analyze" | "Advise" | "Build" | "Managed upkeep";

export interface PlanTier {
  name: LadderTier;
  note?: string;
}

export interface PlanCta {
  text: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface PlanCard {
  id: string;
  icon: string;
  eyebrow: string;
  badge?: string;
  title: string;
  subline: string;
  bullets: string[];
  cta: PlanCta;
  tiers: PlanTier[];
  finePrint: string;
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  cards: {
    tiersLabel: string;
    items: PlanCard[];
  };
  freeAudit: {
    title: string;
    body: string;
  };
  finePrint: string[];
  notSure: {
    title: string;
    body: string;
    cta: string;
    reassurance: string;
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    secondaryText: string;
    secondaryHref: string;
    reassurance: string;
  };
}

export const pricingContent: PricingContent = {
  metaTitle: "Pricing: start where you are",
  metaDescription:
    "Free audit for funded startups, the AUXO Score for mid-sized companies, custom scope for enterprise. Every price is personal and sent privately.",
  hero: {
    eyebrow: "Pricing",
    title: "Start where you are.",
    lead: "Pick the path that fits your company. Every price is personal, and we send it privately after the first conversation and audit.",
  },
  cards: {
    tiersLabel: "Includes",
    items: [
      {
        id: "funded-startups",
        icon: "mdi:rocket-launch-outline",
        eyebrow: "Funded startups",
        title: "Free audit",
        subline: "Then a paid AI data setup.",
        bullets: [
          "Score, founder call and summary, free",
          "AI-built data infrastructure",
          "Set up end to end, yours to keep",
        ],
        cta: { text: "Get your free audit", href: "/auxo-score/?offer=free-audit", variant: "secondary" },
        tiers: [{ name: "Analyze", note: "free audit" }, { name: "Build" }],
        finePrint: "One per company. For funded startups, seed to Series B.",
      },
      {
        id: "mid-sized",
        icon: "mdi:office-building-outline",
        eyebrow: "Mid-sized companies",
        badge: "Recommended",
        title: "AUXO Score",
        subline: "Then a fee-based deep-dive audit.",
        bullets: [
          "Your AI-readiness score, free",
          "Paid deep-dive audit and plan",
          "AI tools marketplace",
        ],
        cta: { text: "Get your AUXO Score", href: "/auxo-score/", variant: "primary" },
        tiers: [
          { name: "Analyze" },
          { name: "Advise" },
          { name: "Build", note: "marketplace tools; larger builds by proposal" },
        ],
        finePrint:
          "About 50 to 500 staff, as a guide not a rule. The Score is free for anyone. The deep-dive audit is paid and priced privately after the first conversation.",
        highlighted: true,
      },
      {
        id: "enterprise",
        icon: "mdi:domain",
        eyebrow: "Enterprise",
        title: "Custom",
        subline: "Pricing on request.",
        bullets: ["Scope built around you", "Dedicated AI agent teams", "Confidential pricing"],
        cta: { text: "Talk to us", href: "/contact/?topic=enterprise", variant: "secondary" },
        tiers: [{ name: "Analyze" }, { name: "Advise" }, { name: "Build" }, { name: "Managed upkeep" }],
        finePrint:
          "Larger organisations, or any company that needs procurement, a security review or a custom contract. We can start with one team or business unit. NDA first if you want one.",
      },
    ],
  },
  freeAudit: {
    title: "The free audit, stated plainly",
    body: "The free audit is your AUXO Score, a 45-minute review call with a founder, and a one-page written summary. It is for funded startups, seed to Series B. One per company. It is not the deep-dive audit and it does not include a build. The data setup that follows is paid and priced privately. If there isn't enough data yet to audit, we'll tell you and suggest what to set up first.",
  },
  finePrint: [
    "No prices are published on this site. Every price is personal, and we send it to you in writing before any work starts.",
    "The AUXO Score and the free audit are free. Everything else is paid, and we tell you the price before you commit.",
    "Third-party tools are billed by the vendor to your company, on your own contract.",
  ],
  notSure: {
    title: "Not sure which fits?",
    body: "Book a meeting and tell us where you are. We'll point you to the right start, even if it isn't us.",
    cta: "Book a meeting",
    reassurance: "A real person replies within one business day.",
  },
  faq: {
    title: "Pricing questions",
    items: [
      {
        question: "Why no prices here?",
        answer:
          "Every company's data and goals are different, so a fixed price would be a guess. We price after the first conversation and audit, and send it to you in writing before any work starts.",
      },
      {
        question: "Who qualifies for the free audit?",
        answer:
          "Funded startups: companies that have raised from outside investors, from seed to Series B. A public funding announcement is enough, or name an investor when you book. One free audit per company.",
      },
      {
        question: "What happens after the audit?",
        answer:
          "You get the results in writing. If something is worth building, we send a plan and a price, privately. If nothing is, we say so. There's no obligation to go further.",
      },
      {
        question: "Can we sign an NDA first?",
        answer: "Yes. We're happy to sign an NDA before we begin. Send us yours, or ask for ours.",
      },
      {
        question: "How does managed upkeep work?",
        answer:
          "It's optional and monthly, after a build. We check it runs, fix what breaks, keep it up to date and send a short report each month. There's no minimum term. Stop with 30 days' notice, and you keep everything we built.",
      },
      {
        question: "Can you work with our procurement process?",
        answer:
          "Yes. We can work through your procurement, security review and contract process, and start with one team or business unit. We'll answer your security questions plainly, including what we don't have. Enterprise pricing is confidential and set by proposal.",
      },
    ],
  },
  cta: {
    title: "Start with the free AUXO Score.",
    description:
      "Ten questions, a few minutes, no sign-up. You'll see where your data stands before you talk to anyone.",
    ctaText: "Get your AUXO Score",
    ctaHref: "/auxo-score/",
    secondaryText: "Book a meeting",
    secondaryHref: siteData.bookingUrl,
    reassurance: "A real person replies within one business day.",
  },
};
