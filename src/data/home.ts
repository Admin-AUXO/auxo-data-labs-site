import { siteData } from "./site";

interface Link {
  text: string;
  href: string;
}

interface SectionIntro {
  eyebrow: string;
  title: string;
  lead: string;
}

interface HomeLogo {
  name: string;
  icon: string;
}

interface HomePillar {
  letter: "A" | "U" | "X" | "O";
  title: string;
  desc: string;
}

interface HomeLadderCard {
  title: string;
  desc: string;
  href: string;
}

interface HomeSegment {
  segment: string;
  offer: string;
  line: string;
  href: string;
}

interface HomeChip {
  label: string;
  slug: string;
}

interface HomeBlogAngle {
  slug: string;
  label: string;
}

interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
  proof: {
    text: string;
    link: Link;
  };
  score: {
    title: string;
    stat: string;
    footnoteId: string;
    cta: Link;
    reassurance: string;
  };
  logos: {
    label: string;
    note: string;
    items: HomeLogo[];
  };
  pillarsHeader: SectionIntro;
  pillarsLabel: string;
  pillars: HomePillar[];
  ladder: Omit<SectionIntro, "lead">;
  cards: HomeLadderCard[];
  segments: SectionIntro & {
    listLabel: string;
    rows: HomeSegment[];
  };
  marketplace: SectionIntro & {
    chipsLabel: string;
    chipBase: string;
    chips: HomeChip[];
    cta: Link;
  };
  blog: SectionIntro & {
    angles: HomeBlogAngle[];
    linkText: string;
    cta: Link;
  };
  cta: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    reassurance: string;
  };
}

const reassurance = "A real person replies within one business day.";

export const homeContent: HomeContent = {
  meta: {
    title: "Your data, ready for AI",
    description:
      "We analyse your business and data, advise on the right AI setup, and build it end to end. Built to last, and yours to keep.",
  },
  hero: {
    title: "Your data, ready for AI.",
    subtitle:
      "We analyse your business and data, advise on the right AI setup, and build it end to end. Built to last, and yours to keep.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl },
    secondaryCta: { text: "See how it works", href: "/how-it-works/" },
  },
  proof: {
    text: "Founder-led. Ex-IBM enterprise delivery across the GCC. Cloud and BI architecture for Fortune 500s.",
    link: { text: "Meet the founders", href: "/about/#team" },
  },
  score: {
    title: "How ready is your data for AI?",
    stat: "More than one in three CFOs don't completely trust their own financial data.",
    footnoteId: "ref-1",
    cta: { text: "Get your AUXO Score", href: "/auxo-score/" },
    reassurance: "Free, 10 questions, no sign-up. Your answers stay in your browser unless you ask us to email your report.",
  },
  logos: {
    label: "Works with",
    note: "Tools we set up and work with. A logo here is not a partnership.",
    items: [
      { name: "Claude", icon: "simple-icons:claude" },
      { name: "OpenAI", icon: "simple-icons:openai" },
      { name: "Google Cloud", icon: "simple-icons:googlecloud" },
      { name: "BigQuery", icon: "simple-icons:googlebigquery" },
      { name: "Snowflake", icon: "simple-icons:snowflake" },
      { name: "dbt", icon: "simple-icons:dbt" },
      { name: "Microsoft Azure", icon: "simple-icons:microsoftazure" },
      { name: "Power BI", icon: "simple-icons:powerbi" },
      { name: "Salesforce", icon: "simple-icons:salesforce" },
      { name: "HubSpot", icon: "simple-icons:hubspot" },
      { name: "n8n", icon: "simple-icons:n8n" },
    ],
  },
  pillarsHeader: {
    eyebrow: "What we fix",
    title: "Four fixes that make data ready for AI.",
    lead: "AI on untidy data gives untidy answers.",
  },
  pillarsLabel: "What we fix",
  pillars: [
    {
      letter: "A",
      title: "Trusted data",
      desc: "One source your team and your AI tools can rely on, built from the systems you already run.",
    },
    {
      letter: "U",
      title: "Clear reporting",
      desc: "Reporting that holds up when the board, investors or auditors ask hard questions.",
    },
    {
      letter: "X",
      title: "Reliable automation",
      desc: "AI agents and software carry the routine work. A person approves what matters.",
    },
    {
      letter: "O",
      title: "Confident compliance",
      desc: "Clear rules for your data and AI, written down before anyone asks.",
    },
  ],
  ladder: {
    eyebrow: "How it works",
    title: "Three steps. Start at any one.",
  },
  cards: [
    {
      title: "Analyze",
      desc: "An honest read of your business and your data, before you spend on AI.",
      href: "/how-it-works/#analyze",
    },
    {
      title: "Advise",
      desc: "The right AI and data setup for your team, and a plan to get there.",
      href: "/how-it-works/#advise",
    },
    {
      title: "Build",
      desc: "Your data infrastructure and AI agent teams, set up end to end and handed over.",
      href: "/how-it-works/#build",
    },
  ],
  segments: {
    eyebrow: "Pricing",
    title: "Start where you are.",
    lead: "Three ways in. A fixed price per phase, in writing.",
    listLabel: "Ways in",
    rows: [
      {
        segment: "Startups, seed to Series B",
        offer: "Free audit",
        line: "Then a fixed-price data foundation.",
        href: "/pricing/#startups",
      },
      {
        segment: "Growing companies, 50–500 people",
        offer: "Deep-dive audit",
        line: "Start free with the AUXO Score.",
        href: "/pricing/#growing",
      },
      {
        segment: "Large organisations",
        offer: "One unit first",
        line: "Scoped by proposal, phase by phase.",
        href: "/pricing/#large-organisations",
      },
    ],
  },
  marketplace: {
    eyebrow: "Marketplace",
    title: "AI tools, set up on your data.",
    lead: "Tools for each team, set up in your accounts.",
    chipsLabel: "Marketplace categories",
    chipBase: "/marketplace/",
    chips: [
      { label: "AI assistants", slug: "foundation-ai" },
      { label: "Engineering", slug: "engineering" },
      { label: "Finance", slug: "finance" },
      { label: "Operations", slug: "operations" },
      { label: "Hiring", slug: "hiring" },
      { label: "Sales and content", slug: "sales-and-content" },
    ],
    cta: { text: "Browse the marketplace", href: "/marketplace/" },
  },
  blog: {
    eyebrow: "From the blog",
    title: "Why can't Claude or an agent we already have do this?",
    lead: "Often it can do part of it. The model is rarely the hard part.",
    angles: [
      { slug: "your-ai-assistant-is-not-the-hard-part", label: "For leaders" },
      { slug: "the-model-is-the-easy-part", label: "For engineers" },
    ],
    linkText: "Read the post",
    cta: { text: "Read the blog", href: "/blog/" },
  },
  cta: {
    title: "Tell us what isn't working.",
    description:
      "Bring the problem. You'll leave knowing what to fix first, and what not to build yet.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    reassurance,
  },
};
