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
  short: string;
  line: string;
  setup: string;
  liveIn: string;
  bestFor: string;
}

interface ThirdPartyConfig extends ToolBase {
  kind: "third-party";
  url: string;
  vendorBilling: string;
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
  short: string;
  line: string;
  setup: string;
  liveIn: string;
  bestFor: string;
  vendorBilling?: string;
  howYouPay: string;
  url?: string;
  partnerProgrammeJoined: boolean;
  partnerModel?: string;
  status?: "Early access";
  includes?: { slug: string; name: string }[];
  note?: string;
  disclosures: string[];
}

const categories: Category[] = [
  { slug: "all", label: "All", description: "Every tool, stack and agent we list.", icon: "mdi:view-grid-outline" },
  {
    slug: "foundation-ai",
    label: "AI assistants",
    description: "Claude or ChatGPT for your team, connected to your data, with rules on use.",
    icon: "mdi:brain",
  },
  {
    slug: "engineering",
    label: "Engineering",
    description:
      "Tools for software and hardware teams, from design checks to code review.",
    icon: "mdi:chip",
  },
  {
    slug: "finance",
    label: "Finance",
    description: "Month-end close, matching the books, reports and forecasts.",
    icon: "mdi:calculator-variant-outline",
  },
  {
    slug: "operations",
    label: "Operations",
    description: "Routine tasks, support questions and admin, on the tools you use.",
    icon: "mdi:cog-outline",
  },
  {
    slug: "hiring",
    label: "Hiring",
    description: "Finding, screening and scheduling candidates. A person makes every hiring decision.",
    icon: "mdi:account-search-outline",
  },
  {
    slug: "sales-and-content",
    label: "Sales and content",
    description:
      "Lead lists, outreach drafts and content plans, including our own agents.",
    icon: "mdi:bullhorn-outline",
  },
];

const badges: Record<BadgeKey, BadgeInfo> = {
  "works-with": {
    key: "works-with",
    label: "Works with",
    meaning: "A tool we set up and can manage. We have no deal with the vendor.",
    howYouPay: "One-off setup · optional upkeep",
    icon: "mdi:puzzle-outline",
  },
  partner: {
    key: "partner",
    label: "Partner tool",
    meaning: "A tool whose partner programme AUXO has joined.",
    howYouPay: "Partner referral + setup",
    icon: "mdi:handshake-outline",
  },
  "auxo-stack": {
    key: "auxo-stack",
    label: "AUXO stack",
    meaning: "A set of tools we put together for one team.",
    howYouPay: "One-off setup · optional upkeep",
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
    short: "Claude for your whole team, on your files and tools.",
    line: "Claude for your whole team, connected to your company files and tools, with clear rules on use.",
    setup: "Set up for your team, connected to your files, with rules on use and a training session.",
    liveIn: "1–2 weeks",
    bestFor: "Teams using AI on personal accounts, with no rules.",
    vendorBilling: "Per user, monthly or annually.",
    url: "https://claude.com/pricing",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "chatgpt-business",
    name: "ChatGPT Business",
    vendor: "OpenAI",
    category: "foundation-ai",
    short: "A shared ChatGPT workspace with admin controls.",
    line: "A shared ChatGPT workspace for your team, connected to your company knowledge, with admin controls.",
    setup: "Set up for your team, connected to your files, with admin controls, rules on use and training.",
    liveIn: "1–2 weeks",
    bestFor: "Teams moving everyone onto ChatGPT.",
    vendorBilling: "Per user, monthly or annually.",
    url: "https://chatgpt.com/business/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "company-ai-assistant",
    name: "AI assistant for your company",
    vendor: "AUXO",
    category: "foundation-ai",
    short: "One approved AI assistant, connected to your systems.",
    line: "Claude or ChatGPT for your company, connected to your files, with rules and training.",
    setup: "We help you pick Claude or ChatGPT, set it up in your accounts, and add simple rules for each team.",
    liveIn: "2–3 weeks",
    bestFor: "Companies replacing scattered personal AI accounts with one approved assistant.",
    includes: ["claude-team", "chatgpt-business"],
    note: "",
  },
  {
    kind: "third-party",
    slug: "claude-code",
    name: "Claude Code",
    vendor: "Anthropic",
    category: "engineering",
    short: "A coding agent whose work your engineers review.",
    line: "A coding agent that drafts changes for your engineers to review.",
    setup: "Access for your engineers, instructions for each project, review steps and a hands-on session.",
    liveIn: "About 1 week",
    bestFor: "Software teams that want AI help and keep human code review.",
    vendorBilling: "Included in Claude seats, or billed by API usage.",
    url: "https://claude.com/product/claude-code",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "onshape",
    name: "Onshape",
    vendor: "PTC",
    category: "engineering",
    short: "Cloud CAD for hardware teams, with AI built in.",
    line: "Cloud CAD and data management for hardware teams, with a built-in AI Advisor.",
    setup: "Set up for your team, your existing designs moved over, and training.",
    liveIn: "2–4 weeks, longer for large file moves",
    bestFor: "Hardware teams choosing or moving to cloud CAD.",
    vendorBilling: "Annual subscription, per user.",
    url: "https://www.onshape.com/en/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "flux",
    name: "Flux",
    vendor: "Flux",
    category: "engineering",
    short: "Circuit board design with an AI helper.",
    line: "Circuit board design in the browser, with an AI helper that checks your work.",
    setup: "Set up for your team, with your parts, design checks and existing projects where possible.",
    liveIn: "1–2 weeks",
    bestFor: "Hardware startups without a dedicated electronics team.",
    vendorBilling: "Free plan, or paid plans per user.",
    url: "https://www.flux.ai/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-hardware-engineers",
    name: "AI for hardware engineers",
    vendor: "AUXO",
    category: "engineering",
    short: "Parts and test checks on your engineering data.",
    line: "Claude on your design files, parts lists and test results, with checks your engineers review.",
    setup: "Claude connected to your design files, parts lists and test results. Your engineers sign off each check. New design tools only if you want them.",
    liveIn: "3–6 weeks",
    bestFor: "Hardware teams moving from prototype to production.",
    includes: ["onshape", "flux", "claude-team"],
    note: "",
  },
  {
    kind: "third-party",
    slug: "numeric",
    name: "Numeric",
    vendor: "Numeric",
    category: "finance",
    short: "A faster month-end close, beside your accounts system.",
    line: "Month-end close and matching the books, alongside your current accounts system.",
    setup: "Connected to your accounts and bank, with a close checklist and sign-offs.",
    liveIn: "2–4 weeks",
    bestFor: "Finance teams closing the month in spreadsheets.",
    vendorBilling: "Subscription, quoted by Numeric.",
    url: "https://www.numeric.io/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "ramp",
    name: "Ramp",
    vendor: "Ramp",
    category: "finance",
    short: "Cards, expenses and bill pay in one place.",
    line: "Company cards, expenses and bill pay in one place, synced to your books.",
    setup: "Spending rules, approvals, receipts and a link to your accounts.",
    liveIn: "1–3 weeks once Ramp approves your account",
    bestFor: "US- and Canada-registered companies. We check availability elsewhere first.",
    vendorBilling: "Free core plan; paid tiers per user.",
    url: "https://ramp.com/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-accounting",
    name: "AI for accounting",
    vendor: "AUXO",
    category: "finance",
    short: "A faster close on your finance data.",
    line: "Numeric and a spend tool on your books, with Claude drafting notes for review.",
    setup: "Numeric and a spend tool on your books, with Claude drafting notes. Your finance lead approves every entry.",
    liveIn: "4–6 weeks",
    bestFor: "Finance leads who want a faster close they can check.",
    includes: ["numeric", "ramp", "claude-team"],
    note: "",
  },
  {
    kind: "third-party",
    slug: "n8n",
    name: "n8n",
    vendor: "n8n",
    category: "operations",
    short: "Automation you can run yourself.",
    line: "Automation and AI agents you can run yourself or in n8n's cloud.",
    setup: "Set up in your cloud or n8n's, with your first two or three automations, alerts and approvals.",
    liveIn: "1–3 weeks",
    bestFor: "Teams that want automation they own.",
    vendorBilling: "Free to self-host, or a cloud subscription.",
    url: "https://n8n.io/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "fin",
    name: "Fin",
    vendor: "Fin",
    category: "operations",
    short: "AI answers for customer support, with handoff.",
    line: "An AI agent that answers customer questions and hands off to your team.",
    setup: "Trained on your help content, with your tone, handoff rules and tests on past chats.",
    liveIn: "2–3 weeks",
    bestFor: "Support teams answering the same questions every day.",
    vendorBilling: "Per resolved conversation.",
    url: "https://fin.ai/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-operations",
    name: "AI for operations",
    vendor: "AUXO",
    category: "operations",
    short: "Routine tasks and support, on tools you use.",
    line: "n8n for routine tasks, Fin for support and Claude for drafts, on the tools you already use.",
    setup: "Two or three routine tasks automated, Fin for support and Claude for drafts. A named owner approves what goes out.",
    liveIn: "3–6 weeks",
    bestFor: "Teams copying data between tools by hand.",
    includes: ["n8n", "fin", "claude-team"],
    note: "",
  },
  {
    kind: "third-party",
    slug: "ashby",
    name: "Ashby",
    vendor: "Ashby",
    category: "hiring",
    short: "Recruiting, scheduling and analytics in one.",
    line: "Tracking, finding and scheduling candidates in one system.",
    setup: "Your roles, scorecards and calendars set up, and a move from your current tracker.",
    liveIn: "2–4 weeks",
    bestFor: "Companies hiring steadily from spreadsheets or a basic tracker.",
    vendorBilling: "Annual subscription, quoted by Ashby.",
    url: "https://www.ashbyhq.com/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "third-party",
    slug: "juicebox",
    name: "Juicebox",
    vendor: "Juicebox",
    category: "hiring",
    short: "AI candidate search and outreach drafts.",
    line: "AI candidate search and outreach drafts, for your recruiters to review.",
    setup: "Searches for your open roles, message templates and review rules.",
    liveIn: "About 1 week",
    bestFor: "Teams hiring without a full-time sourcer.",
    vendorBilling: "Per seat, monthly or annually.",
    url: "https://juicebox.ai/",
    partnerProgrammeJoined: false,
  },
  {
    kind: "auxo-stack",
    slug: "ai-for-hiring",
    name: "AI for hiring",
    vendor: "AUXO",
    category: "hiring",
    short: "Finding and screening candidates. People decide.",
    line: "Finding, screening and scheduling candidates on your current tracker. A person makes every hiring decision.",
    setup: "Juicebox to find candidates, linked to your tracker (or Ashby if you need one), with review steps.",
    liveIn: "3–5 weeks",
    bestFor: "Companies hiring steadily without a recruiting team.",
    includes: ["ashby", "juicebox"],
    note: "Legal checks stay with your advisers.",
  },
  {
    kind: "built-by-auxo",
    slug: "auxo-sales-agent",
    name: "AUXO sales agent",
    vendor: "AUXO",
    category: "sales-and-content",
    short: "Lead lists, outreach drafts and follow-up.",
    line: "Builds your lead lists, drafts the outreach and tracks replies. You approve every message before it's sent.",
    setup: "Your ideal customer, your tone and your booking link, set up in your Google Sheets and Drive.",
    liveIn: "1–2 weeks to first drafts",
    bestFor: "Founders who sell, without a sales team yet.",
    status: "Early access",
  },
  {
    kind: "built-by-auxo",
    slug: "auxo-content-agent",
    name: "AUXO content agent",
    vendor: "AUXO",
    category: "sales-and-content",
    short: "Plans, drafts and reports on your content.",
    line: "Plans and drafts your content, publishes only what you approve, and reports how it performs.",
    setup: "Your topics and tone, a content calendar in your Sheet, approvals and a monthly report.",
    liveIn: "1–2 weeks to first drafts",
    bestFor: "Teams that need steady content without a full-time writer.",
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
    short: t.short,
    line: t.line,
    setup: t.setup,
    liveIn: t.liveIn,
    bestFor: t.bestFor,
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
      vendorBilling: t.vendorBilling,
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
    disclosures: [],
  };
}

const kindRank: Record<ToolConfig["kind"], number> = { "auxo-stack": 0, "built-by-auxo": 1, "third-party": 2 };

export const marketplaceCards: MarketplaceCard[] = tools
  .map((t, i) => ({ t, i }))
  .sort((a, b) => kindRank[a.t.kind] - kindRank[b.t.kind] || a.i - b.i)
  .map(({ t }) => toCard(t));

export const anyPartnerJoined = marketplaceCards.some((c) => c.partnerProgrammeJoined);

export const stackRequestBase = "/contact/?topic=marketplace-tool&tool=";

export const addToStackHref = (slugs: string | string[]): string =>
  `${stackRequestBase}${[slugs].flat().map(encodeURIComponent).join(",")}`;

const getPaidItems = [
  {
    key: "setup",
    title: "Setup",
    body: "A one-off fee to set up a tool on your data.",
    icon: "mdi:hammer-wrench",
    visible: true,
  },
  {
    key: "managed",
    title: "Managed upkeep",
    body: "Optional and monthly. Stop with 30 days' notice.",
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
    title: "Marketplace: AI tools, set up on your data",
    description:
      "AI tools we check first, set up on your data in your own accounts. Plus AUXO's own sales and content agents.",
  },
  hero: {
    title: "AI tools, set up on your data.",
    lead: "Set up in your accounts by a founder. Managed only if you want it.",
  },
  why: {
    title: "Why set it up through us",
    items: [
      {
        icon: "mdi:database-outline",
        title: "Connected to your data",
        body: "Your tools, your access rules, tested on real work.",
      },
      {
        icon: "mdi:scale-balance",
        title: "Chosen for fit, not fees",
        body: "Six checks before we list a tool. No vendor pays us today.",
      },
      {
        icon: "mdi:key-outline",
        title: "Yours from day one",
        body: "Your account and contract, with guides and training.",
      },
    ],
  },
  filters: {
    ariaLabel: "Filter tools by team",
    categories,
    resultsOne: "1 tool",
    resultsMany: "{n} tools",
  },
  badges,
  card: {
    addToStack: "Add to stack",
    addedState: "Added",
    detailsLabel: "Details",
    payLabel: "You pay AUXO",
    vendorBillingLabel: "Vendor bills",
    setupLabel: "What we set up",
    liveInLabel: "Live in",
    liveInSuffix: "(typical)",
    bestForLabel: "Best for",
    backLabel: "Back",
    vendorLabel: "By {vendor}",
    vendorLink: "Vendor site",
    includesLabel: "Includes",
    agentFacts: ["Built on Claude", "Google Sheets and Drive (v1; not Microsoft 365 yet)"],
    agentDetail:
      "If you stop, your lists, drafts and data stay yours.",
  },
  tray: {
    countOne: "1 in your stack",
    countMany: "{n} in your stack",
    action: "Request setup",
    clear: "Clear",
  },
  payNote:
    "Vendors bill you directly. We charge a one-off setup fee, then optional monthly upkeep. Our agents are a monthly subscription.",
  liveInNote: "Live in: the usual time once your vendor account is open. Your setup plan confirms it.",
  customStack: {
    title: "Custom stack",
    line: "Built for your team.",
    body: "Not listed? Tell us the work. We'll propose a stack, or tell you to keep what you have.",
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
        body: "It connects to the tools you already use, without moving data where you can't see it.",
      },
      {
        title: "We can explain what it does with your data.",
        body: "Where it goes, who sees it, and whether it trains AI.",
      },
      {
        title: "Your account, your contract.",
        body: "You sign up in your company's name and can take your data and leave.",
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
        body: "A referral fee never decides what we recommend. If an unlisted tool fits better, we'll say so.",
      },
    ],
  },
  setup: {
    title: "How setup works",
    lead: "Add to stack opens a short form with your tools filled in. Then:",
    steps: [
      "Tell us about your team and what you want the tool to do.",
      "A short call, then a setup plan and a fixed price, in writing.",
      "We set it up in your accounts, on your data, with clear rules.",
      "We hand it over with guides and training. Upkeep is optional.",
    ],
  },
  faq: {
    items: [
      {
        question: "Why not sign up for the tool ourselves?",
        answer:
          "You can, and for one person it's often enough. For a team, the work is connecting your data, setting who sees what and training people. We do that in your account.",
      },
      { question: "Do you earn a fee from these vendors?", answer: faqFeeAnswer },
    ],
  },
  cta: {
    title: "Not sure what your team needs?",
    description: "We'll suggest a stack for your team.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    reassurance: "A real person replies within one business day.",
  },
};
