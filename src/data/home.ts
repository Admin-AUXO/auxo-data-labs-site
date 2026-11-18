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

interface ObjectionFollowup {
  title: string;
  /** Rendered as HTML: may contain <em class="hl-glow"> and one link. */
  body: string;
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
  objection: {
    title: string;
    question: string;
    sources: ObjectionSource[];
    assistantLabel: string;
    assistantLead: string;
    assistantPick: string;
    assistantTail: string;
    assistantNoteLead: string;
    assistantNoteGlow: string;
    hint: string;
    closeLead: string;
    closeGlow: string;
    closeTail: string;
    followupsLabel: string;
    followups: ObjectionFollowup[];
    cta: Link;
    blogLink: Link;
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
  objection: {
    title: "Can't Claude or ChatGPT just do this?",
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
    assistantNoteLead: "It picked one.",
    assistantNoteGlow: "It never mentioned the other three.",
    hint: "Press a source to see what it counts.",
    closeLead: "None of them is lying. They are answering",
    closeGlow: "four different questions",
    closeTail:
      ". Agreeing which one you mean is the fix \u2014 the part no model can do for you.",
    followupsLabel: "Other questions we get",
    followups: [
      {
        title: "Isn't this just data cleaning?",
        body:
          '<p>Cleaning has <em class="hl-glow">no finish line</em>. We work back from the decisions you actually make to the few numbers they depend on, and fix those. The rest can stay messy.</p><p><a href="/blog/start-with-the-decision-not-the-dashboard/">The long version &rarr;</a></p>',
      },
      {
        title: "We already have a warehouse and a BI tool.",
        body:
          '<p>Those move data and draw charts. Neither decides <em class="hl-glow">which definition of revenue wins</em>, or who may change it. That is why two dashboards disagree in the same meeting.</p><p><a href="/blog/data-silos-why-your-numbers-disagree/">The long version &rarr;</a></p>',
      },
      {
        title: "Where would we start?",
        body:
          '<p>The AUXO Score. Ten questions, about three minutes, no sign-up. It tells you <em class="hl-glow">which of the four fixes you are missing</em> before you spend anything.</p>',
      },
    ],
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" },
    blogLink: { text: "Read the blog", href: "/blog/" },
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
