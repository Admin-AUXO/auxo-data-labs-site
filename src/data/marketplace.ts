import { siteData } from "./site";

export type CategorySlug =
  | "foundation-ai"
  | "engineering"
  | "finance"
  | "operations"
  | "hiring"
  | "sales-and-content";

export type FilterSlug = "all" | CategorySlug;

export type Badge = "Works with" | "Partner tool" | "AUXO stack" | "Built by AUXO";

export type BadgeKey = "works-with" | "partner" | "auxo-stack" | "built-by-auxo";

export interface Category {
  slug: FilterSlug;
  label: string;
  description: string;
  icon: string;
}

export interface BadgeInfo {
  key: BadgeKey;
  label: Badge;
  meaning: string;
  howYouPay: string;
  icon: string;
}

interface ToolBase {
  slug: string;
  name: string;
  vendor: string;
  category: CategorySlug;
  line: string;
}

interface ThirdPartyConfig extends ToolBase {
  kind: "third-party";
  url: string;
  partnerProgrammeJoined: boolean;
  partnerProgramme?: string;
  partnerJoinedOn?: string;
  partnerModel?: string;
}

interface StackConfig extends ToolBase {
  kind: "auxo-stack";
  includes: string[];
  note: string;
}

interface AgentConfig extends ToolBase {
  kind: "built-by-auxo";
  status: "Early access";
  extra?: string;
}

type ToolConfig = ThirdPartyConfig | StackConfig | AgentConfig;

export interface MarketplaceCard {
  slug: string;
  name: string;
  vendor: string;
  category: CategorySlug;
  kind: ToolConfig["kind"];
  badge: Badge;
  badgeKey: BadgeKey;
  line: string;
  howYouPay: string;
  url?: string;
  partnerProgrammeJoined: boolean;
  partnerModel?: string;
  status?: "Early access";
  includes?: { slug: string; name: string }[];
  note?: string;
  extra?: string;
  disclosures: string[];
}

const categories: Category[] = [
  { slug: "all", label: "All", description: "Every tool, stack and agent we list.", icon: "mdi:view-grid-outline" },
  {
    slug: "foundation-ai",
    label: "Foundation AI",
    description: "General AI assistants, connected to your company data and set up with clear rules on use.",
    icon: "mdi:brain",
  },
  {
    slug: "engineering",
    label: "Engineering",
    description:
      "Tools for software and hardware teams: design review, bill-of-materials checks, test logs and code review.",
    icon: "mdi:chip",
  },
  {
    slug: "finance",
    label: "Finance",
    description: "Reconciliation, month-end close, reporting and forecasting.",
    icon: "mdi:calculator-variant-outline",
  },
  {
    slug: "operations",
    label: "Operations",
    description: "Workflows, vendor management, dashboards and routine admin.",
    icon: "mdi:cog-outline",
  },
  {
    slug: "hiring",
    label: "Hiring",
    description: "Sourcing, screening and interview scheduling. A person makes every hiring decision.",
    icon: "mdi:account-search-outline",
  },
  {
    slug: "sales-and-content",
    label: "Sales and content",
    description:
      "Prospect lists, outreach drafts, content plans and performance tracking, including our own agents.",
    icon: "mdi:bullhorn-outline",
  },
];

const badges: Record<BadgeKey, BadgeInfo> = {
  "works-with": {
    key: "works-with",
    label: "Works with",
    meaning: "A third-party tool we set up and can manage. We have no commercial agreement with the vendor.",
    howYouPay: "Setup + managed",
    icon: "mdi:puzzle-outline",
  },
  partner: {
    key: "partner",
    label: "Partner tool",
    meaning: "A third-party tool whose partner or referral programme AUXO has joined.",
    howYouPay: "Partner referral + setup",
    icon: "mdi:handshake-outline",
  },
  "auxo-stack": {
    key: "auxo-stack",
    label: "AUXO stack",
    meaning: "A set of listed tools we put together for one function.",
    howYouPay: "Setup + managed",
    icon: "mdi:layers-outline",
  },
  "built-by-auxo": {
    key: "built-by-auxo",
    label: "Built by AUXO",
    meaning: "An agent we built and run for you.",
    howYouPay: "Subscription",
    icon: "mdi:robot-outline",
  },
};

const tools: ToolConfig[] = [
  {
    kind: "third-party",
    slug: "claude-team",
    name: "Claude Team plan",
    vendor: "Anthropic",
    category: "foundation-ai",
    line: "Claude for your whole team, connected to your company files and tools, with clear rules on use.",
    url: "https://claude.com/pricing",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "chatgpt-business",
    name: "ChatGPT Business",
    vendor: "OpenAI",
    category: "foundation-ai",
    line: "A shared ChatGPT workspace for your team, connected to your company knowledge, with admin controls.",
    url: "https://chatgpt.com/business/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "company-ai-assistant",
    name: "AI assistant for your company",
    vendor: "AUXO",
    category: "foundation-ai",
    line: "Claude Team plan or ChatGPT Business, connected to your drives and systems, with usage rules and training.",
    includes: ["claude-team", "chatgpt-business"],
    note: "We set up one of the two, whichever fits your team.",
  },
  {
    kind: "third-party",
    slug: "claude-code",
    name: "Claude Code",
    vendor: "Anthropic",
    category: "engineering",
    line: "A coding agent that drafts fixes, tests and migrations for your engineers to review.",
    url: "https://claude.com/product/claude-code",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "onshape",
    name: "Onshape",
    vendor: "PTC",
    category: "engineering",
    line: "Cloud CAD and data management for hardware teams, with a built-in AI Advisor.",
    url: "https://www.onshape.com/en/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "flux",
    name: "Flux",
    vendor: "Flux",
    category: "engineering",
    line: "Browser-based PCB design with an AI copilot that reads datasheets and runs design checks.",
    url: "https://www.flux.ai/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-hardware-engineers",
    name: "AI for hardware engineers",
    vendor: "AUXO",
    category: "engineering",
    line: "Design review, bill-of-materials checks and test logs, set up on your engineering data.",
    includes: ["onshape", "flux", "claude-team"],
    note: "Set up in your accounts. Your engineers review every check.",
  },
  {
    kind: "third-party",
    slug: "numeric",
    name: "Numeric",
    vendor: "Numeric",
    category: "finance",
    line: "Month-end close, reconciliations and cash management, alongside your existing ERP.",
    url: "https://www.numeric.io/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "ramp",
    name: "Ramp",
    vendor: "Ramp",
    category: "finance",
    line: "Corporate cards, expenses, bill pay and accounting automation in one place.",
    url: "https://ramp.com/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-accounting",
    name: "AI for accounting",
    vendor: "AUXO",
    category: "finance",
    line: "Reconciliation, month-end close and reporting, set up on your finance data.",
    includes: ["numeric", "ramp", "claude-team"],
    note: "Your finance lead approves every entry before it posts.",
  },
  {
    kind: "third-party",
    slug: "n8n",
    name: "n8n",
    vendor: "n8n",
    category: "operations",
    line: "Workflow automation and AI agents you can host yourself or run in n8n's cloud.",
    url: "https://n8n.io/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "fin",
    name: "Fin",
    vendor: "Fin",
    category: "operations",
    line: "An AI agent that answers customer questions across your support channels and hands off to your team.",
    url: "https://fin.ai/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-operations",
    name: "AI for operations",
    vendor: "AUXO",
    category: "operations",
    line: "Workflows, vendor follow-ups and dashboards, set up on the systems you already run.",
    includes: ["n8n", "fin", "claude-team"],
    note: "A named person owns each workflow and approves what goes out.",
  },
  {
    kind: "third-party",
    slug: "ashby",
    name: "Ashby",
    vendor: "Ashby",
    category: "hiring",
    line: "Applicant tracking, sourcing, scheduling and recruiting analytics in one system.",
    url: "https://www.ashbyhq.com/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "juicebox",
    name: "Juicebox",
    vendor: "Juicebox",
    category: "hiring",
    line: "AI candidate search and outreach drafts, for your recruiters to review.",
    url: "https://juicebox.ai/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-hiring",
    name: "AI for hiring",
    vendor: "AUXO",
    category: "hiring",
    line: "Sourcing, screening and interview scheduling. A person makes every hiring decision.",
    includes: ["ashby", "juicebox"],
    note: "Legal checks stay with your advisers.",
  },
  {
    kind: "built-by-auxo",
    slug: "auxo-sales-agent",
    name: "AUXO sales agent",
    vendor: "AUXO",
    category: "sales-and-content",
    line: "Builds your prospect and partner lists, drafts the outreach, and tracks your pipeline. You approve every message before it is sent.",
    status: "Early access",
    extra: "Meetings book through your own booking link.",
  },
  {
    kind: "built-by-auxo",
    slug: "auxo-content-agent",
    name: "AUXO content agent",
    vendor: "AUXO",
    category: "sales-and-content",
    line: "Plans and drafts your content, publishes only what you approve, and reports how it performs.",
    status: "Early access",
  },
];

const disclosure = (vendor: string): string =>
  `We may earn a referral fee from ${vendor} if you sign up through us.`;

const bySlug = new Map(tools.map((t) => [t.slug, t]));

function toCard(t: ToolConfig): MarketplaceCard {
  const base = {
    slug: t.slug,
    name: t.name,
    vendor: t.vendor,
    category: t.category,
    kind: t.kind,
    line: t.line,
  };
  if (t.kind === "third-party") {
    const joined = t.partnerProgrammeJoined;
    const badge = joined ? badges.partner : badges["works-with"];
    return {
      ...base,
      badge: badge.label,
      badgeKey: badge.key,
      howYouPay: joined ? (t.partnerModel ?? badges.partner.howYouPay) : badges["works-with"].howYouPay,
      url: t.url,
      partnerProgrammeJoined: joined,
      partnerModel: joined ? t.partnerModel : undefined,
      disclosures: joined ? [disclosure(t.vendor)] : [],
    };
  }
  if (t.kind === "auxo-stack") {
    const included = t.includes
      .map((s) => bySlug.get(s))
      .filter((x): x is ToolConfig => x !== undefined);
    const partnerVendors = [
      ...new Set(
        included
          .filter((x): x is ThirdPartyConfig => x.kind === "third-party" && x.partnerProgrammeJoined)
          .map((x) => x.vendor),
      ),
    ];
    return {
      ...base,
      badge: badges["auxo-stack"].label,
      badgeKey: "auxo-stack",
      howYouPay: badges["auxo-stack"].howYouPay,
      partnerProgrammeJoined: false,
      includes: included.map((x) => ({ slug: x.slug, name: x.name })),
      note: t.note,
      disclosures: partnerVendors.map(disclosure),
    };
  }
  return {
    ...base,
    badge: badges["built-by-auxo"].label,
    badgeKey: "built-by-auxo",
    howYouPay: badges["built-by-auxo"].howYouPay,
    partnerProgrammeJoined: false,
    status: t.status,
    extra: t.extra,
    disclosures: [],
  };
}

export const marketplaceCards: MarketplaceCard[] = tools.map(toCard);

export const anyPartnerJoined = marketplaceCards.some((c) => c.partnerProgrammeJoined);

export const stackRequestBase = "/contact/?topic=marketplace-tool&tool=";

export const addToStackHref = (slugs: string | string[]): string =>
  `${stackRequestBase}${[slugs].flat().map(encodeURIComponent).join(",")}`;

const getPaidItems = [
  {
    key: "setup",
    title: "Setup",
    body: "A one-time fee to set a tool or stack up on your data.",
    icon: "mdi:hammer-wrench",
    visible: true,
  },
  {
    key: "managed",
    title: "Managed upkeep",
    body: "An optional monthly fee for upkeep and tuning. No minimum term. Stop with 30 days' notice and keep the setup.",
    icon: "mdi:sync",
    visible: true,
  },
  {
    key: "agents",
    title: "AUXO agents",
    body: "A monthly subscription to an agent we built and run.",
    icon: "mdi:robot-outline",
    visible: true,
  },
  {
    key: "referrals",
    title: "Partner referrals",
    body: "Some vendors pay us a referral fee. We mark those tools and tell you before you sign up.",
    icon: "mdi:handshake-outline",
    visible: anyPartnerJoined,
  },
];

const faqFeeAnswer = anyPartnerJoined
  ? "Some vendors pay us a referral fee. Those tools carry a Partner tool badge, and we tell you before you sign up. A fee never decides what we recommend."
  : "Not today. We have no partner or referral agreement with any vendor listed here. If that changes, the tool's card will say so before you sign up.";

export const marketplaceContent = {
  meta: {
    title: "Marketplace: the AI stack for every team",
    description:
      "AI tools vetted by AUXO, set up on your data in your own accounts, and managed if you want it. Plus AUXO's own sales and content agents.",
  },
  hero: {
    title: "The AI stack for every team.",
    lead: "Tools vetted by AUXO. Set up on your data. Managed if you want it.",
  },
  filters: {
    ariaLabel: "Filter tools by team",
    categories,
    resultsOne: "1 tool",
    resultsMany: "{n} tools",
  },
  badges,
  legendTitle: "What the badges mean",
  card: {
    addToStack: "Add to stack",
    addedState: "Added",
    vendorLabel: "By {vendor}",
    vendorLink: "Vendor site",
    includesLabel: "Includes",
    agentFacts: ["Built on Claude", "Works in your own Google Sheet and Drive"],
    agentDetail:
      "You approve, read drafts and see results in your own Sheet and Drive. Your lists, drafts and data stay yours if you stop. The agent itself is a subscription.",
  },
  tray: {
    countOne: "1 in your stack",
    countMany: "{n} in your stack",
    action: "Request setup",
    clear: "Clear",
  },
  vendorBillingNote:
    "Third-party tools are bought in your company's name, on your own contract with the vendor. We tell you what the vendor charges before you commit.",
  customStack: {
    title: "Custom stack",
    line: "Built for your function.",
    body: "Need something not listed? We'll put together a stack for your team.",
    cta: "Talk to us",
    href: "/contact/?topic=custom-stack",
  },
  howWeGetPaid: {
    title: "How we get paid.",
    subline: "Plainly, so you can judge our advice.",
    items: getPaidItems.filter((i) => i.visible),
  },
  vetting: {
    title: "How we vet a tool",
    lead: "Before we recommend a tool, a founder checks all six.",
    items: [
      {
        title: "It works on your data where you can see it.",
        body: "It connects to the systems teams already run, without moving data somewhere you can't inspect.",
      },
      {
        title: "We can explain its data handling.",
        body: "Where your data goes, who can see it, and whether it is used to train models.",
      },
      {
        title: "Your account, your contract.",
        body: "You sign up in your company's name and can export your data and leave.",
      },
      {
        title: "Its cost is clear.",
        body: "We can tell you what the vendor charges before you commit.",
      },
      {
        title: "We set it up ourselves.",
        body: "On sample data, before we recommend it to you.",
      },
      {
        title: "Our advice is not for sale.",
        body: "A referral fee never decides what we recommend, and we will point you to a tool we don't list if it fits better.",
      },
    ],
  },
  setup: {
    title: "How setup works",
    lead: "Add to stack opens a short request form, prefilled with your tools. Then:",
    steps: [
      "Tell us about your team and what you want the tool to do.",
      "A short call to confirm fit. If it isn't right for you, we say so.",
      "We send a setup plan and price, privately.",
      "We set it up in your accounts, on your data, with clear rules on use.",
      "We hand it over with plain‑English documentation and training.",
      "Optional managed upkeep, monthly.",
    ],
  },
  faq: {
    title: "Marketplace questions",
    items: [
      {
        question: "Do we have to buy these tools through AUXO?",
        answer:
          "No. You sign up with the vendor in your company's name, on your own contract. We set the tool up and can manage it if you want.",
      },
      { question: "Do you earn a fee from these vendors?", answer: faqFeeAnswer },
      {
        question: "What if the tool we need isn't listed?",
        answer:
          "Ask for a custom stack. If a tool we don't list fits you better, we'll say so and help you set it up.",
      },
      {
        question: "Can we keep using a tool we already have?",
        answer: "Yes. If it works, we'll suggest keeping it and connect it to the rest of your setup.",
      },
    ],
  },
  cta: {
    title: "Not sure what your team needs?",
    description: "Start with the AUXO Score, or book a meeting and we'll suggest a stack.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "Get your AUXO Score",
    secondaryHref: "/auxo-score/",
    reassurance: "A real person replies within one business day.",
  },
};
