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
  icon: string;
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
    titleHighlight: string;
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

const reassurance = "We reply within one business day.";

export const homeContent: HomeContent = {
  meta: {
    title: "Your data, ready for AI",
    description:
      "For funded startups and scale-ups that need numbers they can stand behind. One set of numbers your deck, model and accounts agree on. Yours to keep.",
  },
  hero: {
    title: "Your data, ready for AI.",
    titleHighlight: "AI.",
    subtitle:
      "For funded startups and scale-ups, seed to Series B. One set of numbers your deck, model and accounts agree on, before the raise or the board meeting. You keep everything.",
    primaryCta: { text: "Apply for a Founder review", href: siteData.applyUrl },
    secondaryCta: { text: "Take the AUXO Score", href: "/auxo-score/" },
  },
  proof: {
    text: "A founder approves every engagement. Ex-IBM delivery across the GCC. Data and cloud work for Fortune 500 companies.",
    link: { text: "Meet the founders", href: "/about/#team" },
  },
  score: {
    title: "Know where your numbers stand before investors ask.",
    stat: "More than one in three CFOs don't completely trust their own financial data.",
    footnoteId: "ref-1",
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    reassurance: "10 questions, no sign-up. Your answers stay on your device unless you ask for the report by email.",
  },
  logos: {
    label: "Works with",
    note: "Tools we set up and work with. A logo here is not a partnership.",
    items: [
      { name: "BigQuery", icon: "simple-icons:googlebigquery" },
      { name: "Snowflake", icon: "simple-icons:snowflake" },
      { name: "dbt", icon: "simple-icons:dbt" },
      { name: "Power BI", icon: "simple-icons:powerbi" },
      { name: "Google Cloud", icon: "simple-icons:googlecloud" },
      { name: "Microsoft Azure", icon: "simple-icons:microsoftazure" },
    ],
  },
  pillarsHeader: {
    eyebrow: "What we fix",
    title: "Four fixes for numbers you can stand behind.",
    lead: "A deck, a model and accounts that disagree cost you in diligence.",
  },
  pillarsLabel: "What we fix",
  pillars: [
    {
      letter: "A",
      title: "Accurate data",
      desc: "One set of numbers across ARR, burn and runway, from the tools you already use.",
    },
    {
      letter: "U",
      title: "Unified reporting",
      desc: "A board pack that holds up when investors ask hard questions.",
    },
    {
      letter: "X",
      title: "Explainable automation",
      desc: "AI takes the routine work, and every result can be explained.",
    },
    {
      letter: "O",
      title: "Oversight built in",
      desc: "Simple rules for your data and AI, written down before diligence asks.",
    },
  ],
  ladder: {
    eyebrow: "How it works",
    title: "One path. Score, review, audit, build.",
  },
  cards: [
    {
      icon: "mdi:magnify",
      title: "Analyze",
      desc: "The AUXO Score, a Founder review and a Deep-dive audit. You get a written read of your numbers.",
      href: "/how-it-works/#analyze",
    },
    {
      icon: "mdi:lightbulb-outline",
      title: "Advise",
      desc: "A plan and a short list of tools that fit. Your team signs off.",
      href: "/how-it-works/#advise",
    },
    {
      icon: "mdi:hammer-wrench",
      title: "Build",
      desc: "One set of numbers, set up in your accounts and handed over.",
      href: "/how-it-works/#build",
    },
  ],
  segments: {
    eyebrow: "Ways in",
    title: "Start where you are.",
    lead: "Three ways in. A fixed price per phase, in writing.",
    listLabel: "Ways in",
    rows: [
      {
        segment: "Startups, seed to Series B",
        offer: "Founder review",
        line: "A plan to get the numbers investors and your board ask for.",
        href: "/pricing/#startups",
      },
      {
        segment: "Growing companies, 50–500 people",
        offer: "Deep-dive audit",
        line: "What to fix, what to build first and what not to buy.",
        href: "/pricing/#growing",
      },
      {
        segment: "Large organisations",
        offer: "One unit first",
        line: "A written proposal, one phase at a time.",
        href: "/pricing/#large-organisations",
      },
    ],
  },
  marketplace: {
    eyebrow: "Stacks",
    title: "Tool stacks, set up on your data.",
    lead: "Bundles of vetted tools, set up in your accounts. You buy direct and own them.",
    chipsLabel: "Stack categories",
    chipBase: "/marketplace/",
    chips: [
      { label: "AI assistants", slug: "foundation-ai" },
      { label: "Finance", slug: "finance" },
      { label: "Operations", slug: "operations" },
      { label: "Hiring", slug: "hiring" },
    ],
    cta: { text: "Browse the stacks", href: "/marketplace/" },
  },
  blog: {
    eyebrow: "From the blog",
    title: "Why do the numbers in the deck and the model never match?",
    lead: "Investor-ready numbers need clean data and clear rules. The AI tool is rarely the hard part.",
    angles: [
      { slug: "your-ai-assistant-is-not-the-hard-part", label: "For leaders" },
      { slug: "the-model-is-the-easy-part", label: "For engineers" },
    ],
    linkText: "Read the post",
    cta: { text: "Read the blog", href: "/blog/" },
  },
  cta: {
    title: "Raising, or facing a board meeting? Bring the numbers that disagree.",
    description: "Leave knowing what to fix first.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance,
  },
};
