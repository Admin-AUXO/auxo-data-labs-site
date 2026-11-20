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

interface ObjectionSource {
  name: string;
  value: string;
  definition: string;
}

interface ObjectionGap {
  title: string;
  desc: string;
  stat?: string;
  footnoteId?: string;
}

interface HomeExplore {
  title: string;
  lead: string;
  cta: Link;
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
    titleAccent: string;
    stat: string;
    statAccent: string;
    statFootnoteId: string;
    cta: Link;
    reassurance: string;
    reassuranceAccent: string;
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
  };
  logos: {
    label: string;
    note: string;
    items: HomeLogo[];
  };
  pillarsHeader: SectionIntro;
  pillarsLabel: string;
  pillars: HomePillar[];
  objection: SectionIntro & {
    question: string;
    sources: ObjectionSource[];
    assistantLabel: string;
    assistantLead: string;
    assistantPick: string;
    assistantTail: string;
    assistantNote: string;
    hint: string;
    closeLead: string;
    closeAccent: string;
    closeTail: string;
    gapsLabel: string;
    gaps: ObjectionGap[];
    cta: Link;
    blogLink: Link;
  };
  explore: {
    label: string;
    items: HomeExplore[];
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
      "We get your data in shape so you can trust it and actually use it, including for AI. For funded startups and scale-ups. Starts with a data diagnostic.",
  },
  hero: {
    titleLead: "Every AI tool you buy",
    titleHighlight: "reads your data.",
    titleTail: "We make it worth reading.",
    subtitle:
      "One set of numbers, the tools set up on them, and all of it yours to keep.",
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
    duration: "1:00",
    playLabel: "Watch the film",
    transcript:
      "An invoice and a production blocker are typed on black, then scatter into a cloud of data. A scan resolves the cloud into one grid. Three blocks rise out of it: receivables of 2.4 million, four new suppliers in Q3, and a blocker cleared. All blockers clear, ready for launch. The view lifts into orbit and the AUXO mark assembles.",
  },

  score: {
    title: "See where AI can do the most for you.",
    titleAccent: "the most",
    stat: "57% of data teams already run or pilot AI agents. Only 8% say the data feeding them is ready for production.",
    statAccent: "8%",
    statFootnoteId: "ref-mdc-agents",
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    reassurance: "Ten questions. About 3 minutes. No sign-up.",
    reassuranceAccent: "No sign-up.",
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
  objection: {
    title: "Can't Claude or ChatGPT just do this?",
    lead: "Yes, once your data gives them one answer to find.",
    question: "How many customers do we have?",
    sources: [
      { name: "CRM", value: "4,812", definition: "Every account ever created." },
      { name: "Billing", value: "4,190", definition: "Accounts with a paid invoice this month." },
      { name: "Support", value: "5,037", definition: "Anyone who has ever opened a ticket." },
      { name: "Board deck", value: "~5,000", definition: "Last quarter's number, rounded." },
    ],
    assistantLabel: "Your AI assistant",
    assistantLead: "You have",
    assistantPick: "4,812",
    assistantTail: "customers.",
    assistantNote: "A clear answer from one source. Nothing told it which one you meant.",
    hint: "Press a source to see what it counts.",
    closeLead: "Every number is right. Each one counts",
    closeAccent: "a different customer",
    closeTail: ". Agree which one you mean, and any assistant gives the answer your board uses.",
    gapsLabel: "What helps an assistant answer well",
    gaps: [
      {
        title: "One meaning per number",
        desc: "Customer, revenue and active user, written down once. Every tool then counts the same thing.",
        stat: "64% of companies traced a confident but wrong AI answer to their own business data in the past six months.",
        footnoteId: "ref-vb-context",
      },
      {
        title: "Sources it can read in full",
        desc: "A connector brings back what one search finds. We connect the systems that hold the answer, with access that matches each person's role.",
      },
      {
        title: "An owner for every figure",
        desc: "Each key number has a source and a person who signs it off, so an answer can be checked before it reaches the board.",
        stat: "41% of data teams name unclear data ownership as a challenge.",
        footnoteId: "ref-dbt-ownership",
      },
    ],
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    blogLink: { text: "Read the blog", href: "/blog/" },
  },
  explore: {
    label: "More from AUXO",
    items: [
      {
        title: "No charge to start. A fixed price after.",
        lead: "A data diagnostic comes first. Each phase after it is priced in writing.",
        cta: { text: "See pricing", href: "/pricing/" },
      },
      {
        title: "Ready-made stacks. Set up on your data.",
        lead: "Six fixed jobs on your numbers, built in your own accounts.",
        cta: { text: "Browse the stacks", href: "/marketplace/" },
      },
    ],
  },
  cta: {
    title: "Know where you stand. Then talk it through.",
    description: "A 30-minute call with a founder about your result.",
    ctaText: "Apply for a data diagnostic",
    ctaHref: siteData.applyUrl,
    secondaryText: "Take the AUXO Score",
    secondaryHref: "/auxo-score/",
    reassurance,
  },
};
