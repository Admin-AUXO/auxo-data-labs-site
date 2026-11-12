import { siteData } from "./site";

interface Link {
  text: string;
  href: string;
}

interface SectionIntro {
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

interface HomeProblem {
  title: string;
  desc: string;
  fix: string;
}

interface HomeOutcome {
  figure: string;
  line: string;
  lead?: boolean;
  source: string;
  footnoteId: string;
}

interface HomeStep {
  title: string;
  desc: string;
  noCharge?: boolean;
}

interface HomeExplore {
  title: string;
  lead: string;
  cta: Link;
}

interface HomeBlogAngle {
  slug: string;
  label: string;
}

interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    words: string[];
    titleRest: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
  proof: {
    text: string;
    link: Link;
  };
  problem: SectionIntro & {
    listLabel: string;
    items: HomeProblem[];
  };
  score: {
    title: string;
    stat: string;
    cta: Link;
    reassurance: string;
  };
  logos: {
    label: string;
    note: string;
    items: HomeLogo[];
  };
  outcomes: SectionIntro & {
    listLabel: string;
    items: HomeOutcome[];
    note: string;
    cta: Link;
  };
  pillarsHeader: SectionIntro;
  pillarsLabel: string;
  pillars: HomePillar[];
  path: SectionIntro & {
    noChargeLabel: string;
    steps: HomeStep[];
    sample: {
      label: string;
      title: string;
      total: number;
      band: string;
      dims: { name: string; value: number }[];
      fixLabel: string;
      fix: string;
    };
    cta: Link;
    link: Link;
  };
  explore: {
    label: string;
    items: HomeExplore[];
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
    secondaryText: string;
    secondaryHref: string;
    reassurance: string;
  };
}

const reassurance = "We reply within one business day.";

export const homeContent: HomeContent = {
  meta: {
    title: "Your data, ready for AI",
    description:
      "We review your business and data, tell you which AI fits, and set it up. For funded startups and scale-ups. Yours to keep.",
  },
  hero: {
    words: ["data", "pipeline", "operations", "company"],
    titleRest: "ready for",
    titleHighlight: "AI.",
    subtitle:
      "We look at your business and data, tell you which AI fits, and set it up for you. Built to last, and yours to keep.",
    primaryCta: { text: "Apply for a Founder review", href: siteData.applyUrl },
    secondaryCta: { text: "Take the AUXO Score", href: "/auxo-score/" },
  },
  proof: {
    text: "Two founders: one from business, one from data.",
    link: { text: "Meet the founders", href: "/about/#team" },
  },
  problem: {
    title: "Your team already uses AI. Make it count.",
    lead: "A little set-up turns personal experiments into results the whole company can see.",
    listLabel: "Where set-up pays off",
    items: [
      {
        title: "Shared set-ups",
        desc: "The prompts and files that work, saved once, so everyone starts from the best version.",
        fix: "Built once, used by everyone",
      },
      {
        title: "The right tools",
        desc: "A short list chosen for the work you do, with a reason for each one.",
        fix: "Chosen with you",
      },
      {
        title: "Connected to your data",
        desc: "AI that reads your CRM, files and accounts, with the right access for each person.",
        fix: "Set up end to end",
      },
      {
        title: "Results you can see",
        desc: "Each tool tied to a number you already report, so every renewal is an easy call.",
        fix: "Measured from day one",
      },
    ],
  },
  score: {
    title: "See where AI can do the most for you.",
    stat: "Ten questions on tools, data, set-up, adoption and measurement.",
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    reassurance: "About 3 minutes. No sign-up.",
  },
  logos: {
    label: "Works with",
    note: "Tools we work with. A logo is not a partnership.",
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
  outcomes: {
    title: "What getting it right is worth.",
    lead: "Independent research. Your Founder review shows what it means for your numbers.",
    listLabel: "Published research",
    items: [
      {
        figure: "2.2 hrs",
        line: "saved a week by each person who uses generative AI at work.",
        lead: true,
        source: "Federal Reserve Bank of St. Louis, 2025",
        footnoteId: "ref-stl",
      },
      {
        figure: "55.8%",
        line: "faster. Developers with an AI pair programmer finished the same coding task ahead of those without.",
        source: "GitHub Copilot study, 2023",
        footnoteId: "ref-copilot",
      },
      {
        figure: "14%",
        line: "more customer issues resolved per hour with AI help, and 34% for novice and less experienced agents.",
        source: "NBER working paper 31161, 2023",
        footnoteId: "ref-nber",
      },
      {
        figure: "95%",
        line: "of organisations see no measurable return from their generative AI pilots.",
        source: "MIT NANDA, 2025",
        footnoteId: "ref-nanda",
      },
      {
        figure: "$12.9M",
        line: "a year, at least: the average cost of poor data quality. AI built on that data inherits it.",
        source: "Gartner, 2020",
        footnoteId: "ref-gartner",
      },
    ],
    note: "Industry research, not AUXO client results.",
    cta: { text: "Apply for a Founder review", href: siteData.applyUrl },
  },
  pillarsHeader: {
    title: "Four fixes that make data ready for AI.",
    lead: "AI on untidy data gives untidy answers.",
  },
  pillarsLabel: "What we fix",
  pillars: [
    {
      letter: "A",
      title: "Accurate data",
      desc: "One set of numbers your team and your AI can trust.",
    },
    {
      letter: "U",
      title: "Unified reporting",
      desc: "Reports that hold up when the board or investors ask.",
    },
    {
      letter: "X",
      title: "Explainable automation",
      desc: "AI takes the routine work. A person approves what matters.",
    },
    {
      letter: "O",
      title: "Oversight built in",
      desc: "Simple written rules for your data and AI.",
    },
  ],
  path: {
    title: "Start with a score. Leave with a plan.",
    lead: "The first three steps cost nothing.",
    noChargeLabel: "No charge",
    steps: [
      {
        title: "Take the AUXO Score",
        desc: "Ten questions. About 3 minutes.",
        noCharge: true,
      },
      {
        title: "See your gaps",
        desc: "Your score, each check and the first fix, by email.",
        noCharge: true,
      },
      {
        title: "Apply for a Founder review",
        desc: "A 30-minute call with a founder about your result. Places are limited.",
        noCharge: true,
      },
      {
        title: "Get a written plan",
        desc: "Next steps within 3 business days, and a fixed price per phase.",
      },
    ],
    sample: {
      label: "Sample result",
      title: "Your AUXO Score",
      total: 62,
      band: "Stable",
      dims: [
        { name: "Tools", value: 70 },
        { name: "Data", value: 35 },
        { name: "Set-up", value: 70 },
        { name: "Adoption", value: 85 },
        { name: "Measurement", value: 50 },
      ],
      fixLabel: "First fix: Data",
      fix: "Connect one approved assistant to your CRM or files, with access that matches each person's role.",
    },
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    link: { text: "See how it works", href: "/how-it-works/" },
  },
  explore: {
    label: "More from AUXO",
    items: [
      {
        title: "No charge to start. A fixed price after.",
        lead: "A Founder review comes first. Each phase after it is priced in writing.",
        cta: { text: "See pricing", href: "/pricing/" },
      },
      {
        title: "Ready-made stacks. Set up on your data.",
        lead: "Six fixed jobs on your numbers, built in your own accounts.",
        cta: { text: "Browse the stacks", href: "/marketplace/" },
      },
    ],
  },
  blog: {
    title: "Can't Claude or ChatGPT just do this?",
    lead: "Often part of it. These posts cover what gets in the way.",
    angles: [
      { slug: "your-ai-assistant-is-not-the-hard-part", label: "For leaders" },
      { slug: "the-model-is-the-easy-part", label: "For engineers" },
    ],
    linkText: "Read the post",
    cta: { text: "Read the blog", href: "/blog/" },
  },
  cta: {
    title: "Know where you stand. Then talk it through.",
    description: "A 30-minute call with a founder about your result.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    secondaryText: "Take the AUXO Score",
    secondaryHref: "/auxo-score/",
    reassurance,
  },
};
