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
  cost: { label: string; tone: "free" | "paid" };
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
  score: { text: string; cta: { text: string; href: string } };
  includes: {
    title: string;
    items: { icon: string; text: string }[];
  };
  faq: {
    eyebrow: string;
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
  metaTitle: "Pricing: one path, a fixed price per phase",
  metaDescription:
    "Start with the AUXO Score, then a Founder review. After that, each phase has a fixed price, agreed in writing. Stop after any phase and keep everything.",
  hero: {
    eyebrow: "Pricing",
    title: "Start where you are.",
    lead: "One path: Score, Founder review, Deep-dive audit, Build. Each phase has a fixed price, agreed in writing before we start.",
    rulesTitle: "How pricing works",
    rules: [
      { tone: "free", icon: "mdi:check", text: "No charge for the AUXO Score or the Founder review." },
      { tone: "free", icon: "mdi:key-outline", text: "Stop after any phase. You keep everything delivered." },
      { tone: "optional", icon: "mdi:domain", text: "Tool vendors bill you directly." },
      { tone: "optional", icon: "mdi:sync", text: "Upkeep and ongoing advice are optional and monthly. Stop with 30 days' notice." },
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
        descriptor: "Funded, heading for a raise or a board meeting, no data team yet.",
        title: "Founder review",
        cost: { label: "No charge", tone: "free" },
        subline: "A plan to get numbers your deck, model and accounts agree on.",
        facts: {
          first: "A Founder review: a 30-minute call and written next steps. You decide whether to go on.",
          then: "Your main tools joined into one clean set of numbers: ARR, burn, runway and the board pack. Your finance lead signs off the definitions.",
          time: "Next steps within 3 business days of the call. Build: 4 to 12 weeks.",
          price: "How many tools we connect and the metrics you need.",
          stop: "The plan is yours, whether or not you build with us.",
        },
        cta: { text: "Apply for a Founder review", href: siteData.applyUrl },
        finePrint: "One Founder review per company.",
      },
      {
        id: "growing",
        icon: "mdi:office-building-outline",
        eyebrow: "Growing companies",
        descriptor: "50–500 people, with numbers spread across tools and spreadsheets.",
        title: "Deep-dive audit",
        cost: { label: "Fixed price", tone: "paid" },
        subline: "What to fix, what to build first and what not to buy.",
        facts: {
          first: "A Founder review, then your systems reviewed under NDA: each fix rated by urgency, a plan of what to build first and a short readout for your leaders.",
          then: "A plan, the right tools and clear rules. Then we build in phases you sign off one at a time.",
          time: "Audit: 2 to 3 weeks. Each build phase: 4 to 12 weeks.",
          price: "The tools, companies and teams involved.",
          stop: "Stop after the audit. The findings and plan are yours.",
        },
        cta: { text: "Apply for a Founder review", href: siteData.applyUrl },
        finePrint: "A guide, not a rule.",
      },
      {
        id: "large-organisations",
        icon: "mdi:domain",
        eyebrow: "Large organisations",
        descriptor: "Start with one team or unit, through your usual buying and security checks.",
        title: "One unit first",
        cost: { label: "Fixed price per phase", tone: "paid" },
        subline: "A written proposal, one phase at a time.",
        facts: {
          first: "A Founder review, an NDA, then a written proposal.",
          then: "We build in your systems, alongside your own team or partners. Upkeep if you want it.",
          time: "Proposal within 3 business days. First phase: 2 to 3 weeks, plus your buying steps.",
          price: "The scope of each phase, on your contract terms.",
          stop: "Each phase stands alone. Everything is in your name.",
        },
        cta: { text: "Apply for a Founder review", href: siteData.applyUrl },
        finePrint: "We answer security questions plainly, including what we don't have.",
      },
    ],
  },
  score: {
    text: "Not ready to talk? Take the AUXO Score: 10 questions, about 3 minutes.",
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
  },
  includes: {
    title: "Every engagement includes",
    items: [
      { icon: "mdi:file-document-outline", text: "A fixed price per phase, in writing" },
      { icon: "mdi:key-outline", text: "Your accounts, contracts and code" },
      { icon: "mdi:account-check-outline", text: "A person approves what AI sends" },
      { icon: "mdi:school-outline", text: "Documentation and training at handover" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pricing questions",
    items: [
      {
        question: "How do you set the price?",
        answer:
          "By what's involved: the tools, the teams and what we build. Each phase gets a fixed price in writing before we start. No two jobs match, so we don't publish prices.",
      },
      {
        question: "Who can get a Founder review?",
        answer:
          "Any company, one per company. Places are limited each week, so we read every application first. Not enough data yet? We'll say so and suggest what to set up first.",
      },
      {
        question: "Why not hire a data engineer instead?",
        answer:
          "Often you should, later. We set up the base your first data hire builds on, so they don't start over.",
      },
      {
        question: "You're two founders. Can you deliver?",
        answer:
          "Yes. We work to a method: five checks, a fixed scope per phase and a written handover. Everything is in your name, so nothing depends on us. A founder approves every engagement. Vignesh sets scope and price; Ajay builds.",
      },
      {
        question: "Can you work with our procurement process?",
        answer:
          "Yes. We follow your buying, security and contract steps, starting with one team. NDA first if you want one.",
      },
    ],
  },
  cta: {
    title: "Not sure where to start? Tell us what doesn't add up.",
    description: "Leave with one clear next step before your raise or board meeting.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance: siteData.reassurance,
  },
};
