import { siteData } from "./site";

export type CategorySlug =
  | "foundation-ai"
  | "engineering"
  | "finance"
  | "operations"
  | "hiring";

export type FilterSlug = "all" | CategorySlug;

export type Badge = "Setup service" | "Partner tool" | "Team bundle" | "AUXO agent";

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
  terms: string;
  url?: string;
  partnerProgrammeJoined: boolean;
  status?: "Early access";
  disclosures: string[];
}

const categories: Category[] = [
  { slug: "all", label: "All", icon: "mdi:view-grid-outline" },
  { slug: "foundation-ai", label: "AI assistants", icon: "mdi:brain" },
  { slug: "engineering", label: "Engineering", icon: "mdi:chip" },
  { slug: "finance", label: "Finance", icon: "mdi:calculator-variant-outline" },
  { slug: "operations", label: "Operations", icon: "mdi:cog-outline" },
  { slug: "hiring", label: "Hiring", icon: "mdi:account-search-outline" },
];

const badges: Record<BadgeKey, BadgeInfo> = {
  "works-with": { key: "works-with", label: "Setup service", howYouPay: "One-off setup, optional upkeep", icon: "mdi:hammer-wrench" },
  partner: { key: "partner", label: "Partner tool", howYouPay: "Partner referral and setup", icon: "mdi:handshake-outline" },
  "auxo-stack": { key: "auxo-stack", label: "Team bundle", howYouPay: "One-off setup, optional upkeep", icon: "mdi:layers-outline" },
  "built-by-auxo": { key: "built-by-auxo", label: "AUXO agent", howYouPay: "Monthly subscription", icon: "mdi:robot-outline" },
};


const tools: ToolConfig[] = [
  {
    kind: "auxo-stack",
    slug: "investor-metrics-stack",
    name: "Investor metrics stack",
    vendor: "AUXO",
    category: "finance",
    short: "Stop rebuilding board numbers: one clean source for investor metrics.",
    liveIn: "4–12 weeks",
    setupItems: ["Your core tools joined in your own cloud", "One clean source for your numbers", "The metrics investors ask for"],
    dataNote: "Sits in your own cloud. Your finance lead signs off the numbers.",
    vendorBilling: "Your cloud provider bills you directly.",
    startHere: true,
  },
  {
    kind: "auxo-stack",
    slug: "company-ai-rollout",
    name: "Company AI rollout",
    vendor: "AUXO",
    category: "foundation-ai",
    short: "Move your team off personal AI accounts onto one approved assistant.",
    liveIn: "2–3 weeks",
    setupItems: ["Claude or ChatGPT in your accounts", "Connected to your files, with a written AI policy and a named person who approves each AI action", "A training session for your team"],
    dataNote: "Stays in your own business account. Your admin controls access.",
    vendorBilling: "Claude or ChatGPT bills you per user.",
  },
  {
    kind: "auxo-stack",
    slug: "month-end-close",
    name: "Month-end close",
    vendor: "AUXO",
    category: "finance",
    short: "Take month-end out of spreadsheets: one checklist, books matched.",
    liveIn: "4–6 weeks",
    setupItems: ["Numeric on your accounts and bank", "A spend tool with approvals", "Claude drafting close notes"],
    dataNote: "Your books stay in your own accounts. Your finance lead approves every entry.",
    vendorBilling: "Each vendor bills you directly.",
  },
  {
    kind: "auxo-stack",
    slug: "automate-routine-work",
    name: "Automate routine work",
    vendor: "AUXO",
    category: "operations",
    short: "Stop copying data between tools: two or three hand-offs automated.",
    liveIn: "3–6 weeks",
    setupItems: ["Routine tasks automated in n8n", "Alerts and approval steps", "Fin for support questions, if needed"],
    dataNote: "Runs in your own n8n. A named owner approves what goes out.",
    vendorBilling: "Each vendor bills you directly.",
  },
  {
    kind: "auxo-stack",
    slug: "hiring-stack",
    name: "Hiring stack",
    vendor: "AUXO",
    category: "hiring",
    short: "Find, screen and schedule candidates on the tracker you already use.",
    liveIn: "3–5 weeks",
    setupItems: ["Juicebox to find candidates", "Linked to your tracker, or Ashby if you need one", "Review steps before anything is sent"],
    dataNote: "Candidate data stays in your tracker. A person makes every hiring decision.",
    vendorBilling: "Each vendor bills you directly.",
  },
  {
    kind: "third-party",
    slug: "claude-code",
    name: "Claude Code for your engineers",
    vendor: "Anthropic",
    category: "engineering",
    short: "AI help for your engineers. Code review stays with your team.",
    liveIn: "About 1 week",
    setupItems: ["Access for your engineers", "Instructions for each project", "Review steps and a hands-on session"],
    dataNote: "Code stays in your repositories. An engineer reviews every change.",
    vendorBilling: "Anthropic bills you: in Claude seats or by usage.",
    url: "https://claude.com/product/claude-code",
    partnerProgrammeJoined: false,
  },
];

export const retiredSlugs: Record<string, string> = {
  "claude-team": "company-ai-rollout",
  "chatgpt-business": "company-ai-rollout",
  "company-ai-assistant": "company-ai-rollout",
  numeric: "month-end-close",
  ramp: "month-end-close",
  "ai-for-accounting": "month-end-close",
  n8n: "automate-routine-work",
  fin: "automate-routine-work",
  "ai-for-operations": "automate-routine-work",
  ashby: "hiring-stack",
  juicebox: "hiring-stack",
  "ai-for-hiring": "hiring-stack",
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
    terms: `${badges["auxo-stack"].howYouPay}. ${t.vendorBilling}`,
    partnerProgrammeJoined: false,
    disclosures: [],
  };
}

export const marketplaceCards: MarketplaceCard[] = tools.map(toCard);

export const anyPartnerJoined = marketplaceCards.some((c) => c.partnerProgrammeJoined);

export const stackRequestBase = "/apply/?tool=";

export const addToStackHref = (slugs: string | string[]): string =>
  `${stackRequestBase}${[slugs].flat().map(encodeURIComponent).join(",")}`;

const getPaidItems = [
  { key: "setup", title: "Setup", body: "A one-off fee.", icon: "mdi:hammer-wrench", visible: true },
  { key: "managed", title: "Upkeep", body: "Optional, monthly, 30 days' notice.", icon: "mdi:sync", visible: true },
  {
    key: "referrals",
    title: "Referrals",
    body: "Marked on the card, before you sign up.",
    icon: "mdi:handshake-outline",
    visible: anyPartnerJoined,
  },
];

export const marketplaceContent = {
  meta: {
    title: "Stacks: tool bundles, set up on your data",
    description:
      "Stacks are tool bundles set up on your data, in your accounts. We recommend, you buy direct and own the account. Apply for a Founder review.",
  },
  hero: {
    eyebrow: "Stacks",
    title: "Tool bundles, set up on your data.",
    lead: "Set up in your own accounts. We recommend, you buy direct and own the account.",
  },
  why: {
    title: "Why through us",
    items: [
      { icon: "mdi:database-outline", title: "Connected to your data", body: "Your tools and your access rules." },
      { icon: "mdi:scale-balance", title: "Chosen for fit, not fees", body: "No vendor pays us today." },
      { icon: "mdi:key-outline", title: "Yours from day one", body: "Your account, contract and data." },
    ],
  },
  filters: {
    ariaLabel: "Filter by team",
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
    liveInLabel: "Live in",
    liveInSuffix: "(typical)",
    backLabel: "Back",
  },
  tray: {
    countOne: "1 in your stack",
    countMany: "{n} in your stack",
    action: "Request setup",
    clear: "Clear",
  },
  footnote: "Vendors bill you directly. We're independent: not a reseller or partner.",
  customStack: {
    title: "Custom stack",
    body: "Not listed? Tell us the work.",
    cta: "Apply for a Founder review",
    href: "/apply/?tool=custom-stack",
  },
  howWeGetPaid: {
    eyebrow: "Fees",
    title: "How we get paid.",
    items: getPaidItems.filter((i) => i.visible),
  },
  vetting: {
    eyebrow: "Vetting",
    title: "How we vet a tool",
    items: [
      { title: "It works on your data, where you can see it." },
      { title: "We can explain what it does with your data." },
      { title: "Your account, your contract." },
      { title: "Its cost is clear before you commit." },
      { title: "We set it up ourselves first." },
      { title: "Our advice is not for sale." },
    ],
  },
  setup: {
    eyebrow: "Setup",
    title: "How setup works",
    steps: [
      "Tell us the work.",
      "A short call, then a fixed price in writing.",
      "We set it up in your accounts.",
      "We hand it over. Upkeep is optional.",
    ],
  },
  faq: {
    items: [
      {
        question: "Why not sign up for the tool ourselves?",
        answer:
          "For one person, you often can. For a team, the work is connecting your data, setting access and training people. We do that in your account.",
      }
    ],
  },
  cta: {
    title: "Not sure what your team needs?",
    description: "We'll suggest a stack for your team.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance: "We reply within one business day.",
  },
};
