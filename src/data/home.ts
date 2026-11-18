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

interface HomeBlogAngle {
  slug: string;
  label: string;
}

interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    titleLead: string;
    titleHighlight: string;
    titleTail: string;
    subtitle: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
  score: {
    title: string;
    stat: string;
    statFootnoteId: string;
    cta: Link;
    reassurance: string;
  };
  film: {
    label: string;
    lead: string;
    src: string;
    poster: string;
    posterAlt: string;
    duration: string;
    playLabel: string;
    transcript: string;
    draftNote: string;
  };
  logos: {
    label: string;
    note: string;
    items: HomeLogo[];
  };
  pillarsHeader: SectionIntro;
  pillarsLabel: string;
  pillars: HomePillar[];
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
    title: "Messy data into decisions you can act on",
    description:
      "We get your data in shape so you can trust it and actually use it, including for AI. For funded startups and scale-ups. Starts with a data diagnostic.",
  },
  hero: {
    titleLead: "We turn messy, fragmented data into",
    titleHighlight: "intelligent decisions",
    titleTail: "companies act on.",
    subtitle:
      "We get your data in shape, so your AI actually works.",
    primaryCta: { text: "Apply for a data diagnostic", href: siteData.applyUrl },
    secondaryCta: { text: "Take the AUXO Score", href: "/auxo-score/" },
  },
  film: {
    label: "The film",
    lead: "Fragments in. Decisions out.",
    src: "/video/auxo-explainer.mp4",
    poster: "/video/explainer-poster.jpg",
    posterAlt:
      "A dark grid of figures with the readout: all blockers clear, ready for launch.",
    duration: "1:23",
    playLabel: "Watch the film",
    transcript:
      "An invoice and a production blocker are typed on black, then scatter into a cloud of data. A scan resolves the cloud into one grid. Three blocks rise out of it: receivables of 2.4 million, four new suppliers in Q3, and a blocker cleared. All blockers clear, ready for launch. The view lifts into orbit and the AUXO mark assembles.",
    draftNote:
      "Draft asset: v10 recut, silent, 720p, 12.3 MB. Five seconds removed from the scatter-and-stall beat. Nothing downloads until the still is clicked.",
  },

  score: {
    title: "See where AI can do the most for you.",
    stat: "63% of organizations either do not have, or are unsure if they have, the right data management practices for AI.",
    statFootnoteId: "ref-gartner-ai-data",
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    reassurance: "Ten questions. About 3 minutes. No sign-up.",
  },
  logos: {
    label: "Tools we use",
    note: "A logo here is not a partnership.",
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
      title: "eXplainable automation",
      desc: "AI takes the routine work. A person approves what matters.",
    },
    {
      letter: "O",
      title: "Oversight built in",
      desc: "Simple written rules for your data and AI.",
    },
  ],
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
    ctaText: "Apply for a data diagnostic",
    ctaHref: siteData.applyUrl,
    secondaryText: "Take the AUXO Score",
    secondaryHref: "/auxo-score/",
    reassurance,
  },
};
