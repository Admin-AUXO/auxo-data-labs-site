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
  compare: {
    title: string;
    lead: string;
    groupLabel: string;
    asks: { who: string; when: string; question: string; answer: string }[];
    link: Link;
  };
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
      "For funded startups and scale-ups, seed to Series B. One set of numbers your deck, model and accounts agree on.",
    primaryCta: { text: "Apply for a Founder review", href: siteData.applyUrl },
    secondaryCta: { text: "Take the AUXO Score", href: "/auxo-score/" },
  },
  proof: {
    text: "Two founders. One from business, one from data.",
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
    note: "Tools we set up and work with.",
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
  compare: {
    title: "Who asks about your numbers next?",
    lead: "Each of them asks a different question. One set of numbers answers all four.",
    groupLabel: "Who is asking",
    asks: [
      {
        who: "Investor",
        when: "In diligence",
        question: "Does the ARR in your deck match your accounts?",
        answer: "Deck, model and accounts read from one source, so the answer is yes.",
      },
      {
        who: "Board",
        when: "Every quarter",
        question: "Why did runway change since last time?",
        answer: "The board pack and the model use the same figures, so the change has one explanation.",
      },
      {
        who: "Auditor",
        when: "At year end",
        question: "Where does this number come from?",
        answer: "Each figure traces back to billing or the accounts, with the definition written down.",
      },
      {
        who: "Your team",
        when: "Every week",
        question: "Which dashboard do I trust?",
        answer: "One definition per metric, signed off by your finance lead.",
      },
    ],
    link: { text: "See how it works", href: "/how-it-works/" },
  },
  segments: {
    title: "Who we work with.",
    lead: "A Founder review comes first. After it, we scope the work with you and agree the price in writing.",
    listLabel: "Ways in",
    rows: [
      {
        segment: "Startups, seed to Series B",
        offer: "One set of numbers",
        line: "A plan to get the numbers investors and your board ask for.",
        href: "/pricing/#startups",
      },
      {
        segment: "Growing companies, 50–500 people",
        offer: "A Deep-dive audit",
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
    title: "Six ways to get numbers you can trust.",
    lead: "Work on your billing, CRM and accounts data, built with your team in your own accounts.",
    chipsLabel: "Stack types",
    chipBase: "/marketplace/",
    chips: [
      { label: "Numbers", slug: "numbers" },
      { label: "Checks", slug: "proof" },
      { label: "AI and automation", slug: "work" },
    ],
    cta: { text: "Browse the stacks", href: "/marketplace/" },
  },
  blog: {
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
