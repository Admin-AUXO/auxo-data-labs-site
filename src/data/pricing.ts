import { siteData } from "./site";

export interface PlanLink {
  text: string;
  href: string;
}

export interface PlanFacts {
  first: string;
  then: string;
  time: string;
  price: string;
  stop: string;
}

export interface PlanCard {
  id: string;
  icon: string;
  eyebrow: string;
  descriptor: string;
  title: string;
  subline: string;
  facts: PlanFacts;
  cta: PlanLink;
  finePrint: string;
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
    factLabels: Record<keyof PlanFacts, string>;
    detailsShow: string;
    detailsHide: string;
    items: PlanCard[];
  };
  includes: {
    title: string;
    items: { icon: string; text: string }[];
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
    reassurance: string;
  };
}

export const pricingContent: PricingContent = {
  metaTitle: "Pricing: three ways in, a fixed price per phase",
  metaDescription:
    "A free audit for startups, seed to Series B. A deep-dive audit for growing companies. One unit first for large organisations. A fixed price per phase, in writing.",
  hero: {
    eyebrow: "Pricing",
    title: "Start where you are.",
    lead: "Three ways in. Each phase has a fixed price, agreed in writing before we start.",
    rulesTitle: "How pricing works",
    rules: [
      { tone: "free", icon: "mdi:check", text: "Free: the AUXO Score, and the free audit for seed to Series B startups." },
      { tone: "free", icon: "mdi:key-outline", text: "Stop after any phase. You keep everything delivered." },
      { tone: "optional", icon: "mdi:domain", text: "Tool vendors bill you directly." },
      { tone: "optional", icon: "mdi:sync", text: "Upkeep is optional and monthly. Stop with 30 days' notice." },
    ],
  },
  cards: {
    detailsShow: "Show details",
    detailsHide: "Hide details",
    factLabels: {
      first: "First",
      then: "Then",
      time: "Typical time",
      price: "Price set by",
      stop: "If you stop",
    },
    items: [
      {
        id: "startups",
        icon: "mdi:rocket-launch-outline",
        eyebrow: "Startups, seed to Series B",
        descriptor: "Investor-funded, moving fast, no data team yet.",
        title: "Free audit",
        subline: "Then a fixed-price data foundation.",
        facts: {
          first: "Your AUXO Score, a 45-minute founder call and a one-page plan.",
          then: "Your main tools joined into one clean set of numbers, with the metrics investors ask for.",
          time: "Plan within 3 business days of the call. Build: 4 to 12 weeks.",
          price: "How many tools we connect and the metrics you need.",
          stop: "The plan is yours, whether or not you build with us.",
        },
        cta: { text: "Get your free audit", href: "/auxo-score/?offer=free-audit" },
        finePrint: "One per company.",
      },
      {
        id: "growing",
        icon: "mdi:office-building-outline",
        eyebrow: "Growing companies",
        descriptor: "50–500 people, with numbers spread across tools and spreadsheets.",
        title: "Deep-dive audit",
        subline: "Start free with the AUXO Score.",
        facts: {
          first: "We review your systems under NDA. You get each fix rated by urgency, a plan of what to build first and a short readout for your leaders.",
          then: "A plan, the right tools and clear rules. Then we build in phases you approve one at a time.",
          time: "Audit: 2 to 3 weeks. Each build phase: 4 to 12 weeks.",
          price: "The tools, companies and teams involved.",
          stop: "Stop after the audit. The findings and plan are yours.",
        },
        cta: { text: "Get your AUXO Score", href: "/auxo-score/" },
        finePrint: "A guide, not a rule.",
      },
      {
        id: "large-organisations",
        icon: "mdi:domain",
        eyebrow: "Large organisations",
        descriptor: "Start with one team or unit, through your usual buying and security checks.",
        title: "One unit first",
        subline: "A written proposal, one phase at a time.",
        facts: {
          first: "An NDA, a call to agree scope, then a written proposal.",
          then: "We build in your systems, alongside your own team or partners. Upkeep if you want it.",
          time: "Proposal within 5 business days. First phase: 2 to 3 weeks, plus your buying steps.",
          price: "The scope of each phase, on your contract terms.",
          stop: "Each phase stands alone. Everything is in your name.",
        },
        cta: { text: "Talk to us", href: "/contact/?topic=enterprise" },
        finePrint: "We answer security questions plainly, including what we don't have.",
      },
    ],
  },
  includes: {
    title: "Every engagement includes",
    items: [
      { icon: "mdi:account-tie-outline", text: "A founder on every call" },
      { icon: "mdi:key-outline", text: "Your accounts, contracts and code" },
      { icon: "mdi:account-check-outline", text: "A person approves what agents send" },
      { icon: "mdi:school-outline", text: "Documentation and training at handover" },
    ],
  },
  faq: {
    title: "Pricing questions",
    items: [
      {
        question: "How do you set the price?",
        answer:
          "By what's involved: the tools, the teams and what we build. Each phase gets a fixed price in writing before we start. No two jobs match, so we don't publish prices.",
      },
      {
        question: "Who can get the free audit?",
        answer:
          "For startups that have raised from outside investors, one per company. Not enough data yet? We'll say so and suggest what to set up first.",
      },
      {
        question: "Why not hire a data engineer instead?",
        answer:
          "Often you should, later. We set up the base your first data hire builds on, so they don't start over.",
      },
      {
        question: "You're two founders. Can you deliver?",
        answer:
          "Yes. A founder leads every job, from first call to handover. Vignesh leads planning and large clients; Ajay leads the build. Everything is written down and in your name, so nothing depends on us.",
      },
      {
        question: "Can you work with our procurement process?",
        answer:
          "Yes. We follow your buying, security and contract steps, starting with one team. NDA first if you want one.",
      },
    ],
  },
  cta: {
    title: "Not sure which path fits?",
    description: "Book a meeting and leave with one clear next step.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    reassurance: siteData.reassurance,
  },
};
