export interface ServiceCapability {
  name: string;
  nameHighlight?: string | string[];
  label: string;
  icon: string;
  description: string;
  outcomes: string[];
}

export interface ServiceModel {
  name: string;
  kicker: string;
  price: string;
  unit?: string;
  timeframe: string;
  hook: string;
  bestFor: string;
  featured?: boolean;
}

export interface ServicesContent {
  hero: {
    title: string;
    titleHighlight?: string | string[];
    lead: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  capabilities: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    items: ServiceCapability[];
  };
  models: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    items: ServiceModel[];
    priceNote: string;
    standards: { title: string; frameworks: string[]; caveat: string };
  };
  process: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    summaryHref: string;
    steps: { name: string; desc: string }[];
  };
  cta: {
    title: string;
    titleHighlight?: string | string[];
    description: string;
    descriptionHighlight?: string | string[];
    ctaText: string;
    ctaHref: string;
    secondaryText?: string;
    secondaryHref?: string;
    reassurance: string;
  };
}

export const servicesContent: ServicesContent = {
  hero: {
    title: "What we do.",
    titleHighlight: "do",
    lead: "Four fixes for Gulf property teams: data you can trust, reporting that's clear, automation that's reliable, and compliance you're confident in. Each runs on the systems you already own, and each stands on its own.",
    primaryCta: { text: "Start a conversation", href: "/contact/" },
    secondaryCta: { text: "See ways to work", href: "#ways-to-work" },
  },
  capabilities: {
    title: "The four things we fix.",
    titleHighlight: "fix",
    subtitle:
      "The work that gets your numbers trusted, seen, and acted on. Take one on its own, or build them in sequence.",
    items: [
      {
        name: "Trusted data",
        label: "Foundation",
        icon: "mdi:database-check-outline",
        description:
          "We bring the systems you already run into one reliable home, so figures stop disagreeing across finance, registration, and your CRM.",
        outcomes: [
          "One source the team works from",
          "Figures that agree across systems",
          "Clear record of who sees what",
        ],
      },
      {
        name: "Clear reporting",
        label: "Visibility",
        icon: "mdi:chart-box-outline",
        description:
          "We rebuild board and investor reporting so it traces back to source and updates automatically — no more hand-built packs each cycle.",
        outcomes: [
          "Packs ready on time",
          "Every figure traceable",
          "Scenarios you can plan around",
        ],
      },
      {
        name: "Reliable automation",
        label: "Capacity",
        icon: "mdi:cog-sync",
        description:
          "We hand the repetitive grind to software, with a person always checking the result — and add AI only where it genuinely earns its place.",
        outcomes: [
          "Routine work off your team's plate",
          "AI used only where it pays",
          "A person reviewing what matters",
        ],
      },
      {
        name: "Confident compliance",
        label: "Assurance",
        icon: "mdi:shield-check-outline",
        description:
          "We build checks into your deal flow so the evidence is there the moment an examiner asks. Legal sign-off stays with your advisors.",
        outcomes: [
          "Checks built in, not bolted on",
          "Evidence ready when asked",
          "No last-minute scramble",
        ],
      },
    ],
  },
  models: {
    title: "Ways to work.",
    titleHighlight: "work",
    subtitle:
      "Four ways in, all packaged and priced up front — never open-ended consulting. Start with an honest read, have one capability built, bring on a standing team, or keep a senior hand at the top table.",
    priceNote:
      "These are starting figures, shown up front — no opaque quotes. We set the final scope and price together once we understand what you need, so book a call and we'll talk it through.",
    standards: {
      title: "Built to standards you answer to.",
      frameworks: ["DFSA & DIFC governance", "FATF & AML practice", "IFRS reporting"],
      caveat:
        "Every engagement is shaped to align with the frameworks institutional buyers are held to. We build the work to support those standards; formal certification and legal sign-off stay with your advisors.",
    },
    items: [
      {
        name: "Pulse",
        kicker: "Diagnostic",
        price: "AED 45,000",
        timeframe: "2–3 weeks",
        hook: "Two to three weeks to a clear-eyed read on your data and compliance — and a priced plan for exactly what to build first.",
        bestFor: "For teams who want the truth and a plan before committing to a build.",
        featured: true,
      },
      {
        name: "Ship",
        kicker: "Fixed project",
        price: "From AED 90,000",
        timeframe: "4–12 weeks",
        hook: "One capability, built end to end at a fixed price and date — shipped live, in production, and yours to keep.",
        bestFor: "For teams with a defined problem, ready to be solved.",
      },
      {
        name: "Embedded",
        kicker: "Standing team",
        price: "From AED 70,000",
        unit: "/ mo",
        timeframe: "3-month minimum",
        hook: "A dedicated team working through your backlog week after week — the output of a department, without the headcount.",
        bestFor: "For teams with an ongoing backlog and no appetite to hire a full function.",
      },
      {
        name: "Advisory",
        kicker: "On call",
        price: "From AED 30,000",
        unit: "/ mo",
        timeframe: "Ongoing",
        hook: "A senior data and AI leader in your corner for the calls that matter — strategy, hires, vendors, models — minus the full-time salary.",
        bestFor: "For leaders who need a steady hand at the top table, not another headcount.",
      },
    ],
  },
  process: {
    title: "How an engagement runs.",
    titleHighlight: "runs",
    subtitle:
      "However you choose to work with us, the path is the same — four steps from a real problem to a system your team owns.",
    summaryHref: "/about/",
    steps: [
      { name: "Scope", desc: "We get the problem and the first move clear, together." },
      { name: "Build", desc: "We build in short, visible steps you can see working." },
      { name: "Embed", desc: "We put it into your day-to-day, on your own systems." },
      { name: "Hand over", desc: "Your team owns and runs it — no retainer to renew." },
    ],
  },
  cta: {
    title: "Not sure which fits?",
    titleHighlight: "fits",
    description:
      "Tell us what's slowing you down, and we'll point you to the right first move — even if it isn't us.",
    ctaText: "Start a conversation",
    ctaHref: "/contact/",
    secondaryText: "Read our thinking",
    secondaryHref: "/insights/",
    reassurance: "A real person replies within one business day.",
  },
};
