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
  price: string;
  timeframe: string;
  line: string;
  rationale: string;
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
    standards: { title: string; line: string };
  };
  process: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    summaryHref: string;
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
        nameHighlight: "Clear",
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
        nameHighlight: "Confident",
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
      "Packaged engagements, not open-ended consulting. Take an honest read, have one capability built, bring on a standing team, or keep a senior hand at the top table.",
    priceNote:
      "Indicative pricing is open below. Final scope and figures are set together once we understand what you need — so book a call and we'll talk it through.",
    standards: {
      title: "Built to standards you answer to.",
      line: "Every engagement is shaped to align with the frameworks institutional buyers are held to — DFSA and DIFC governance, FATF and AML practice, and IFRS reporting. We build the work to support those standards; formal certification and legal sign-off stay with your advisors.",
    },
    items: [
      {
        name: "Pulse",
        price: "AED 45,000",
        timeframe: "2–3 weeks",
        line: "An honest read on your data and compliance, with a clear plan for what to build first.",
        rationale: "A fixed-scope diagnostic. For teams who want a clear-eyed read and a priced plan before committing to a build.",
      },
      {
        name: "Build",
        price: "From AED 90,000",
        timeframe: "4–12 weeks",
        line: "One capability built end to end, at a fixed price and timeline, shipped live and owned by your team.",
        rationale: "One capability delivered at a fixed price and date. For teams with a defined problem ready to be solved end to end.",
      },
      {
        name: "Embedded",
        price: "From AED 70,000 / mo",
        timeframe: "3-month minimum",
        line: "A dedicated team working through your backlog, without standing up a whole in-house function.",
        rationale: "A standing team on a monthly retainer. For teams with an ongoing backlog who don't want to hire a full function.",
      },
      {
        name: "Advisory",
        price: "From AED 30,000 / mo",
        timeframe: "Ongoing",
        line: "Direct access to a senior data and AI leader for the big calls, without the full-time hire.",
        rationale: "Senior guidance on call, monthly. For leaders who need a steady hand on the big data and AI decisions, not a full-time hire.",
      },
    ],
  },
  process: {
    title: "How an engagement runs.",
    titleHighlight: "runs",
    subtitle:
      "However you choose to work with us, the path is the same: we scope it with you, build in short visible steps, embed it in your day-to-day, then hand it over for your team to own. A fuller walk-through lives on the Studio page.",
    summaryHref: "/about/",
  },
  cta: {
    title: "Not sure which fits?",
    titleHighlight: "fits",
    description:
      "Tell us what's slowing you down, and we'll point you to the right first move — even if it isn't us.",
    descriptionHighlight: "the right first move",
    ctaText: "Start a conversation",
    ctaHref: "/contact/",
    secondaryText: "Read our thinking",
    secondaryHref: "/insights/",
    reassurance: "A real person replies within one business day.",
  },
};
