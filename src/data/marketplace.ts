import { siteData } from "./site";

export type CategorySlug = "numbers" | "proof" | "work";

export type FilterSlug = "all" | CategorySlug;

export type Badge = "Setup service" | "Partner tool" | "Fixed price" | "AUXO agent";

export type BadgeKey = "works-with" | "partner" | "auxo-stack" | "built-by-auxo";

export interface Category {
  slug: FilterSlug;
  label: string;
  icon: string;
}

export interface BadgeInfo {
  key: BadgeKey;
  label: Badge;
  howYouPay: string;
  icon: string;
}


interface ToolBase {
  slug: string;
  name: string;
  vendor: string;
  category: CategorySlug;
  short: string;
  liveIn: string;
  setupItems: string[];
  dataNote: string;
  startHere?: boolean;
  question: string;
}

interface ThirdPartyConfig extends ToolBase {
  kind: "third-party";
  url: string;
  vendorBilling: string;
  partnerProgrammeJoined: boolean;
  partnerModel?: string;
}

interface StackConfig extends ToolBase {
  kind: "auxo-stack";
  vendorBilling: string;
}

type ToolConfig = ThirdPartyConfig | StackConfig;

export interface MarketplaceCard {
  slug: string;
  name: string;
  vendor: string;
  category: CategorySlug;
  kind: ToolConfig["kind"];
  badge: Badge;
  badgeKey: BadgeKey;
  short: string;
  liveIn: string;
  setupItems: string[];
  dataNote: string;
  startHere: boolean;
  question: string;
  terms: string;
  url?: string;
  partnerProgrammeJoined: boolean;
  status?: "Early access";
  disclosures: string[];
}

const categories: Category[] = [
  { slug: "all", label: "All", icon: "mdi:view-grid-outline" },
  { slug: "numbers", label: "Numbers", icon: "mdi:calculator-variant-outline" },
  { slug: "proof", label: "Checks", icon: "mdi:shield-check-outline" },
  { slug: "work", label: "AI and automation", icon: "mdi:cog-outline" },
];

const badges: Record<BadgeKey, BadgeInfo> = {
  "works-with": { key: "works-with", label: "Setup service", howYouPay: "One-off setup, optional upkeep", icon: "mdi:hammer-wrench" },
  partner: { key: "partner", label: "Partner tool", howYouPay: "Partner referral and setup", icon: "mdi:handshake-outline" },
  "auxo-stack": { key: "auxo-stack", label: "Fixed price", howYouPay: "One-off setup, optional upkeep", icon: "mdi:layers-outline" },
  "built-by-auxo": { key: "built-by-auxo", label: "AUXO agent", howYouPay: "Monthly subscription", icon: "mdi:robot-outline" },
};


const tools: ToolConfig[] = [
  {
    kind: "auxo-stack",
    slug: "one-set-of-numbers",
    question: "Which ARR is the real one?",
    name: "Investor metrics",
    vendor: "AUXO",
    category: "numbers",
    short: "ARR, burn and runway your deck, model and accounts agree on.",
    liveIn: "4–12 weeks",
    setupItems: ["Billing, CRM and accounts joined in your own cloud", "Each metric defined once and signed off", "A monthly board pack: ARR, burn and runway"],
    dataNote: "Sits in your own cloud. Your finance lead signs off the definitions.",
    vendorBilling: "Your cloud provider bills you directly.",
    startHere: true,
  },
  {
    kind: "auxo-stack",
    slug: "data-clean-up",
    question: "Can you trust your pipeline number?",
    name: "CRM clean-up",
    vendor: "AUXO",
    category: "numbers",
    short: "Duplicates and gaps in your CRM fixed, so pipeline numbers hold.",
    liveIn: "2–4 weeks",
    setupItems: ["Duplicates merged across CRM, billing and spreadsheets", "Conflicting fields resolved with your team", "Rules that keep new records clean"],
    dataNote: "Changes are made in your own systems. You approve each merge rule before it runs.",
    vendorBilling: "No new tool to buy.",
  },
  {
    kind: "auxo-stack",
    slug: "diligence-pack",
    question: "Can you back up every number in your deck?",
    name: "Fundraise data room",
    vendor: "AUXO",
    category: "proof",
    short: "Every number in your deck backed up before investors ask.",
    liveIn: "2–3 weeks",
    setupItems: ["Deck and model figures matched to the accounts", "Metric definitions written down", "The backing documents investors ask for, in one place"],
    dataNote: "Stays in your own drive or data room. Your CEO or finance lead signs off the pack.",
    vendorBilling: "If you use a data room, its provider bills you directly.",
  },
  {
    kind: "auxo-stack",
    slug: "numbers-watch",
    question: "Would you know if runway dropped?",
    name: "Metric alerts",
    vendor: "AUXO",
    category: "proof",
    short: "Know when a key number breaks, before your board does.",
    liveIn: "1–2 weeks",
    setupItems: ["Daily checks on the figures that matter", "An alert to a named person when one drifts", "A short log of what broke and why"],
    dataNote: "Checks run in your own cloud. A named owner gets every alert.",
    vendorBilling: "Your cloud provider bills you directly.",
  },
  {
    kind: "auxo-stack",
    slug: "ask-your-numbers",
    question: "Can your team just ask the numbers?",
    name: "Chat with your data",
    vendor: "AUXO",
    category: "work",
    short: "Ask Claude or ChatGPT about your metrics.",
    liveIn: "2–4 weeks",
    setupItems: ["Claude or ChatGPT in your business account", "Connected to your agreed numbers, with sources shown", "A written AI policy, a named approver and team training"],
    dataNote: "Stays in your own business account. Your admin controls access.",
    vendorBilling: "Claude or ChatGPT bills you per user.",
  },
  {
    kind: "auxo-stack",
    slug: "hand-offs-with-checks",
    question: "Could your tools share data on their own?",
    name: "Workflow automation",
    vendor: "AUXO",
    category: "work",
    short: "Copy-paste between tools replaced. A person approves.",
    liveIn: "3–6 weeks",
    setupItems: ["Two or three manual copy-paste jobs automated", "Records matched, with a queue for exceptions", "Approval steps before anything is sent or paid"],
    dataNote: "Runs in your own automation account. A named owner approves what goes out.",
    vendorBilling: "Each vendor bills you directly.",
  },
];

export const retiredSlugs: Record<string, string> = {
  "investor-metrics-stack": "one-set-of-numbers",
  "company-ai-rollout": "ask-your-numbers",
  "claude-team": "ask-your-numbers",
  "chatgpt-business": "ask-your-numbers",
  "company-ai-assistant": "ask-your-numbers",
  "automate-routine-work": "hand-offs-with-checks",
  n8n: "hand-offs-with-checks",
  "ai-for-operations": "hand-offs-with-checks",
  "month-end-close": "custom-stack",
  numeric: "custom-stack",
  ramp: "custom-stack",
  "ai-for-accounting": "custom-stack",
  fin: "custom-stack",
  "hiring-stack": "custom-stack",
  ashby: "custom-stack",
  juicebox: "custom-stack",
  "ai-for-hiring": "custom-stack",
  "claude-code": "custom-stack",
};

const disclosure = (vendor: string): string => `We may earn a referral fee from ${vendor}.`;

function toCard(t: ToolConfig): MarketplaceCard {
  const base = {
    slug: t.slug,
    name: t.name,
    vendor: t.vendor,
    category: t.category,
    kind: t.kind,
    short: t.short,
    liveIn: t.liveIn,
    setupItems: t.setupItems,
    dataNote: t.dataNote,
    startHere: t.startHere ?? false,
    question: t.question,
  };
  if (t.kind === "third-party") {
    const joined = t.partnerProgrammeJoined;
    const badge = joined ? badges.partner : badges["works-with"];
    return {
      ...base,
      badge: badge.label,
      badgeKey: badge.key,
      terms: `${joined ? (t.partnerModel ?? badge.howYouPay) : badge.howYouPay}. ${t.vendorBilling}`,
      url: t.url,
      partnerProgrammeJoined: joined,
      disclosures: joined ? [disclosure(t.vendor)] : [],
    };
  }
  return {
    ...base,
    badge: badges["auxo-stack"].label,
    badgeKey: "auxo-stack",
    terms: t.vendorBilling,
    partnerProgrammeJoined: false,
    disclosures: [],
  };
}

export const marketplaceCards: MarketplaceCard[] = tools.map(toCard);

export const anyPartnerJoined = marketplaceCards.some((c) => c.partnerProgrammeJoined);

export const stackRequestBase = "/apply/?tool=";

export const addToStackHref = (slugs: string | string[]): string =>
  `${stackRequestBase}${[slugs].flat().map(encodeURIComponent).join(",")}`;

export const marketplaceContent = {
  meta: {
    title: "Stacks: six ways to get numbers you can trust",
    description:
      "Six jobs on your billing, CRM and accounts data, from board-ready numbers to an AI assistant that uses them. Built with your team in your own accounts.",
  },
  hero: {
    title: "Numbers you can trust.",
    lead: "Six jobs on your billing, CRM and accounts data, built in your own accounts.",
  },
  filters: {
    ariaLabel: "Filter by type",
    categories,
    resultsOne: "1 item",
    resultsMany: "{n} items",
    empty: "Nothing matches. Try another filter.",
  },
  badges,
  card: {
    addToStack: "Add to stack",
    addedState: "Added",
    detailsLabel: "Details",
    startHere: "Start here",
    setupLabel: "What we set up",
    dataLabel: "Your data",
    policyLink: "Vendor's data policy",
    liveInLabel: "Typical time to go live:",
    backLabel: "Back",
  },
  tray: {
    title: "Your stack",
    empty: "Add a stack and it prints here.",
    totalLabel: "Total",
    countOne: "1 stack",
    countMany: "{n} stacks",
    priceLabel: "Price",
    price: "Agreed in writing",
    action: "Apply with this stack",
    clear: "Clear",
  },
  customStack: {
    title: "Custom stack",
    body: "Need something else? Tell us the work.",
    cta: "Apply for a Founder review",
    href: "/apply/?tool=custom-stack",
  },
  setup: {
    title: "How a stack gets set up.",
    steps: [
      "Tell us the work.",
      "A short call to scope it, then a price in writing.",
      "We set it up in your accounts.",
      "We hand it over.",
    ],
    fees: "Setup is a one-off fee. Upkeep is optional, monthly, 30 days' notice.",
  },
  faq: {
    items: [
      {
        question: "Can't our own tools do this?",
        answer:
          "Each tool reports its own version. The work sits between them: matching records, agreeing definitions and deciding which figure is right.",
      }
    ],
  },
  cta: {
    title: "Not sure where to start?",
    description: "Most teams start with Investor metrics.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance: "We reply within one business day.",
  },
};
