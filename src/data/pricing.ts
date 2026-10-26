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
    lead: "Three ways in. Each phase has a fixed price, set by scope and agreed in writing before work starts.",
    rulesTitle: "How pricing works",
    rules: [
      { tone: "free", icon: "mdi:check", text: "Free: the AUXO Score, and the free audit for seed to Series B startups." },
      { tone: "free", icon: "mdi:key-outline", text: "Stop after any phase. You keep everything delivered." },
      { tone: "optional", icon: "mdi:domain", text: "Vendors bill you directly, on your own contract." },
      { tone: "optional", icon: "mdi:sync", text: "Managed upkeep is optional and monthly. Stop with 30 days' notice." },
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
          then: "Your core tools connected into one clean source in your own cloud, with the metrics investors ask for.",
          time: "Plan within 3 business days of the call. Build: 4 to 12 weeks.",
          price: "The systems we connect and the metrics you need.",
          stop: "The plan is yours, whether or not you build with us.",
        },
        cta: { text: "Get your free audit", href: "/auxo-score/?offer=free-audit" },
        finePrint: "One per company.",
      },
      {
        id: "growing",
        icon: "mdi:office-building-outline",
        eyebrow: "Growing companies",
        descriptor: "50–500 people, with numbers spread across tools, sites and spreadsheets.",
        title: "Deep-dive audit",
        subline: "Start free with the AUXO Score.",
        facts: {
          first: "Your systems reviewed under NDA: each fix rated red, amber or green, a build-first plan and a leadership readout.",
          then: "Roadmap, tool choice and governance, then builds in phases you approve one at a time.",
          time: "Audit: 2 to 3 weeks. Each build phase: 4 to 12 weeks.",
          price: "The systems, entities and teams in scope.",
          stop: "Stop after the audit. The assessment and plan are yours.",
        },
        cta: { text: "Get your AUXO Score", href: "/auxo-score/" },
        finePrint: "A guide, not a rule.",
      },
      {
        id: "large-organisations",
        icon: "mdi:domain",
        eyebrow: "Large organisations",
        descriptor: "One business unit first, through procurement and security review.",
        title: "One unit first",
        subline: "Scoped by proposal, phase by phase.",
        facts: {
          first: "An NDA, a scoping call, then a written proposal for one unit.",
          then: "Builds in your environment, alongside your data team or integrator. Managed upkeep if you want it.",
          time: "Proposal within 5 business days of scoping. First phase: 2 to 3 weeks, plus your procurement steps.",
          price: "Scope per phase, on your contract terms.",
          stop: "Each phase stands alone. Code, documents and accounts are in your name.",
        },
        cta: { text: "Talk to us", href: "/contact/?topic=enterprise" },
        finePrint: "We answer security questionnaires plainly, including what we don't hold.",
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
          "By scope: the systems we connect, the teams involved and what we build. Each phase gets a fixed price in writing before work starts. We don't publish prices because no two scopes match.",
      },
      {
        question: "What exactly is the free audit?",
        answer:
          "For startups that have raised from outside investors, one per company. Not enough data yet? We'll say so and suggest what to set up first.",
      },
      {
        question: "Why not hire a data engineer instead?",
        answer:
          "Often you should, later. We set up the foundation your first data hire inherits: documented, tested and in your name, so they build on it instead of starting over.",
      },
      {
        question: "You're two founders. Can you deliver?",
        answer:
          "A founder leads every engagement, from first call to handover. Vignesh leads scoping, governance and enterprise work; Ajay leads architecture, data builds and agents. Everything is documented in your name, so nothing depends on us.",
      },
      {
        question: "Can you work with our procurement process?",
        answer:
          "Yes. We work through your procurement, security review and contract steps, starting with one team or business unit. NDA first if you want one.",
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
