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
    rulesTitle: string;
    rules: { tone: "free" | "paid" | "optional"; icon: string; text: string }[];
  };
  cards: {
    tiersLabel: string;
    notIncludedLabel: string;
    items: PlanCard[];
  };
  freeAudit: {
    title: string;
    points: { icon: string; title: string; body: string }[];
    note: string;
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
    rulesTitle: "How pricing works",
    rules: [
      { tone: "free", icon: "mdi:check", text: "Free: the AUXO Score and the free audit." },
      { tone: "paid", icon: "mdi:file-document-outline", text: "Everything else has a fixed price, in writing, before any work." },
      { tone: "optional", icon: "mdi:sync", text: "Managed upkeep is optional and monthly. Stop with 30 days' notice." },
      { tone: "optional", icon: "mdi:domain", text: "Third-party tools are billed to you by the vendor, on your own contract." },
    ],
  },
  cards: {
    tiersLabel: "Includes",
    notIncludedLabel: "Not included",
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
        finePrint: "Seed to Series B. One per company.",
      },
      {
        id: "mid-sized",
        icon: "mdi:office-building-outline",
        eyebrow: "Mid-sized companies",
        title: "AUXO Score",
        subline: "Then a paid deep-dive audit.",
        bullets: [
          "Your AI-readiness score, free",
          "Paid deep-dive audit and plan",
          "AI tools marketplace",
        ],
        cta: { text: "Get your AUXO Score", href: "/auxo-score/", variant: "secondary" },
        tiers: [
          { name: "Analyze" },
          { name: "Advise" },
          { name: "Build", note: "marketplace tools" },
        ],
        finePrint:
          "About 50 to 500 staff, as a guide. The deep-dive audit is priced privately.",
      },
      {
        id: "enterprise",
        icon: "mdi:domain",
        eyebrow: "Enterprise",
        title: "Custom",
        subline: "Pricing on request.",
        bullets: ["Scope built around you", "Dedicated AI agent teams", "Procurement and security review"],
        cta: { text: "Talk to us", href: "/contact/?topic=enterprise", variant: "secondary" },
        tiers: [{ name: "Analyze" }, { name: "Advise" }, { name: "Build" }, { name: "Managed upkeep" }],
        finePrint:
          "For procurement, security review or a custom contract. Start with one team. NDA first if you want.",
      },
    ],
  },
  freeAudit: {
    title: "The free audit, stated plainly",
    points: [
      { icon: "mdi:gauge", title: "AUXO Score", body: "10 questions on your data, scored out of 100." },
      { icon: "mdi:account-tie-outline", title: "45-minute founder call", body: "We walk through your score together." },
      { icon: "mdi:file-document-outline", title: "One-page plan", body: "What to fix first, sent after the call." },
    ],
    note: "Funded startups, seed to Series B, one per company. It isn't the deep-dive audit and has no build. Not enough data yet? We'll say so and suggest what to set up first.",
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
        question: "What happens after the audit?",
        answer:
          "You get the results in writing. If something is worth building, we send a plan and a price, privately. If nothing is, we say so. There's no obligation to go further.",
      },
      {
        question: "Can we sign an NDA first?",
        answer: "Yes. We're happy to sign an NDA before we begin. Send us yours, or ask for ours.",
      },
      {
        question: "Can you work with our procurement process?",
        answer:
          "Yes. We work through your procurement, security review and contract steps, and can start with one team or business unit. We answer security questions plainly, including what we don't have. Pricing is set by proposal.",
      },
    ],
  },
  cta: {
    title: "Start with the free AUXO Score.",
    description:
      "10 questions, about 3 minutes, no sign-up. Not sure which path fits? Book a meeting and we'll point you to the right start.",
    ctaText: "Get your AUXO Score",
    ctaHref: "/auxo-score/",
    secondaryText: "Book a meeting",
    secondaryHref: siteData.bookingUrl,
    reassurance: "A real person replies within one business day.",
  },
};
