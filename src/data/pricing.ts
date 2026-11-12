import { siteData } from "./site";

export interface ReceiptData {
  head: string;
  rows: { item: string; price: string }[];
  totalLabel: string;
  total: string;
  after?: { item: string; price: string };
  link?: string;
}

export interface PlanLink {
  text: string;
  href: string;
}

export interface PlanFacts {
  price: string;
}

export interface PlanCard {
  id: string;
  eyebrow: string;
  descriptor: string;
  title: string;
  subline: string;
  featured?: boolean;
  facts: PlanFacts;
}

export interface LedgerRow {
  step: string;
  get: string;
  takes: string;
  price: string;
  note?: string;
  tone: "free" | "paid" | "optional";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    title: string;
    lead: string;
    primaryCta: PlanLink;
    secondaryCta: PlanLink;
    receipt: ReceiptData;
  };
  ledger: {
    title: string;
    columns: { step: string; get: string; takes: string; price: string };
    rows: LedgerRow[];
    total: string;
    legend: { free: string; paid: string };
  };
  cards: {
    title: string;
    startLabel: string;
    factLabels: Record<keyof PlanFacts, string>;
    items: PlanCard[];
  };
  includes: {
    title: string;
    items: { title: string; body: string }[];
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
  metaTitle: "Pricing: no charge to start, a fixed price per phase",
  metaDescription:
    "The AUXO Score and the Founder review cost nothing. After that, each phase has a fixed price, agreed in writing. Stop after any phase and keep everything.",
  hero: {
    title: "No charge to start. A fixed price after.",
    lead: "We scope each phase with you and put the price in writing first. Stop after any of them.",
    primaryCta: { text: "Apply for a Founder review", href: siteData.applyUrl },
    secondaryCta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    receipt: {
      head: "Your first two steps",
      rows: [
        { item: "AUXO Score", price: "No charge" },
        { item: "Founder review", price: "No charge" },
      ],
      totalLabel: "To start",
      total: "Nothing",
      after: { item: "Each phase after", price: "Fixed, in writing" },
      link: "See what each step costs",
    },
  },
  ledger: {
    title: "What does each step cost?",
    columns: { step: "Step", get: "You get", takes: "Takes", price: "Cost" },
    legend: { free: "No charge", paid: "A price we agree in writing first" },
    rows: [
      { step: "AUXO Score", get: "A score out of 100, and where to look first.", takes: "About 3 minutes", price: "No charge", tone: "free" },
      { step: "Founder review", get: "A 30-minute call, then written next steps.", takes: "3 business days", price: "No charge", tone: "free" },
      {
        step: "Deep-dive audit",
        get: "Each gap between your deck, model and accounts, and a plan of what to build first.",
        takes: "2 to 3 weeks",
        price: "Scoped with you",
        note: "Credited if you build with us.",
        tone: "paid",
      },
      { step: "Advise", get: "A plan, a short list of tools and clear rules.", takes: "1 to 3 weeks", price: "Scoped with you", tone: "paid" },
      {
        step: "Build",
        get: "One set of numbers in your own accounts, handed over.",
        takes: "4 to 12 weeks a phase",
        price: "Agreed phase by phase",
        tone: "paid",
      },
      {
        step: "Managed upkeep",
        get: "We keep it running after handover.",
        takes: "Month by month",
        price: "Monthly, optional",
        note: "Stop with 30 days' notice.",
        tone: "optional",
      },
    ],
    total: "Stop after any step. You keep everything delivered.",
  },
  cards: {
    title: "What sets the price.",
    startLabel: "After the Founder review",
    factLabels: {
      price: "Price depends on",
    },
    items: [
      {
        id: "startups",
        eyebrow: "Startups, seed to Series B",
        descriptor: "Funded, heading for a raise or a board meeting, with no data team yet.",
        title: "One set of numbers",
        subline: "ARR, burn and runway that your deck, model and accounts agree on.",
        featured: true,
        facts: {
          price: "How many tools we connect and the metrics you need.",
        },
      },
      {
        id: "growing",
        eyebrow: "Growing companies",
        descriptor: "50 to 500 people, with numbers spread across tools and spreadsheets.",
        title: "Deep-dive audit",
        subline: "What to fix, what to build first and what not to buy.",
        facts: {
          price: "The tools, companies and teams involved.",
        },
      },
      {
        id: "large-organisations",
        eyebrow: "Large organisations",
        descriptor: "One team or unit first, through your usual buying and security checks.",
        title: "One unit first",
        subline: "A written proposal for one team, one phase at a time.",
        facts: {
          price: "The scope of each phase, on your contract terms.",
        },
      },
    ],
  },
  includes: {
    title: "Every engagement includes",
    items: [
      { title: "A price in writing", body: "Fixed for each phase, before we start." },
      { title: "Everything in your name", body: "Your accounts, contracts and code. Tool vendors bill you directly." },
      { title: "A person in charge of AI", body: "A named person approves what AI sends." },
      { title: "A full handover", body: "Documentation and training for your team." },
    ],
  },
  faq: {
    title: "Pricing questions",
    items: [
      {
        question: "How do you set the price?",
        answer:
          "By what's involved: the tools, the teams and what we build. We fix the price for each phase in writing before we start.",
      },
      {
        question: "Who can get a Founder review?",
        answer:
          "Any company, one per company. Places are limited each week, so we read every application first. Not enough data yet? We'll say so and suggest where to start.",
      },
      {
        question: "Why not hire a data engineer instead?",
        answer:
          "Often you should, later. We set up the base your first data hire builds on.",
      },
      {
        question: "Who does the work?",
        answer:
          "The two founders. Vignesh scopes the work with you. Ajay builds it. Everything is in your name.",
      },
      {
        question: "Can you work with our procurement process?",
        answer:
          "Yes. We follow your buying, security and contract steps, starting with one team.",
      },
    ],
  },
  cta: {
    title: "Not sure where to start? Tell us what doesn't add up.",
    description: "Leave with one clear next step.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance: siteData.reassurance,
  },
};
