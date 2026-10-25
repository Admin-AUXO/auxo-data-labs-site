import { siteData } from "./site";

export interface Link {
  text: string;
  href: string;
}

export interface Dimension {
  name: string;
  question: string;
}

export interface LadderItem {
  title: string;
  body: string;
}

export interface LadderStep {
  id: string;
  label: string;
  name: string;
  icon: string;
  promise: string;
  whatYouGet: LadderItem[];
  duration: string;
  suits: string;
  isNot: string;
  links: Link[];
}

export interface EngagementStep {
  title: string;
  desc: string;
}

export interface Founder {
  name: string;
  role: string;
  lines: string[];
  linkedin: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  link?: Link;
}

export const howItWorksContent = {
  meta: {
    title: "How it works: Analyze, Advise, Build",
    description:
      "Three steps. Analyze your business and data, advise on the right AI setup, then build it and hand it over. No lock-in.",
  },
  intro: {
    title: "How it works.",
    lead: "Three steps. Start at any one. We recommend starting with Analyze.",
    summary: "Analyze what you have. Advise on what fits. Build it and hand it over.",
    note: "Durations are typical ranges for planning. Each proposal confirms the real timeline.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl } satisfies Link,
    reassurance: "A real person replies within one business day.",
  },
  ladder: {
    navLabel: "Steps",
    labels: {
      whatYouGet: "What you get",
      duration: "Typical duration",
      suits: "Suits",
      isNot: "It is not",
    },
    steps: [
      {
        id: "analyze",
        label: "Step 01",
        name: "Analyze",
        icon: "mdi:magnify",
        promise: "An honest read of your business and your data, before you spend on AI.",
        whatYouGet: [
          {
            title: "AUXO Score (free, anyone)",
            body: "A 10-question check of how ready your data is for AI, scored on five dimensions (Accurate, Complete, Consistent, Timely, Trusted), with a result band (Healthy, Stable, Fragile, Critical). No sign-up.",
          },
          {
            title: "Free audit (funded startups only)",
            body: "Your AUXO Score, a 45-minute review call with a founder, and a one-page written summary of what to fix first.",
          },
          {
            title: "Deep-dive audit (paid)",
            body: "A review of your own systems and data, under NDA if you want one. It covers how your business and industry use data, AI readiness by function, a written assessment rated red, amber or green for each of the four fixes, a prioritised plan of what to build first and what not to build yet, a one-page executive summary, and a readout with your leadership.",
          },
        ],
        duration:
          "AUXO Score: a few minutes. Free audit: one 45-minute call, with the summary sent after it. Deep-dive audit: 2 to 3 weeks.",
        suits:
          "Any team about to spend on AI or data. Leaders who want a second opinion. Teams whose numbers disagree across systems.",
        isNot:
          "A sales call in disguise, a generic checklist, a market-data report, a build or a compliance certificate. The free audit is a quick read, not the deep-dive audit.",
        links: [
          { text: "Get your AUXO Score", href: "/auxo-score/" },
          { text: "Funded startup? Get your free audit", href: "/auxo-score/?offer=free-audit" },
        ],
      },
      {
        id: "advise",
        label: "Step 02",
        name: "Advise",
        icon: "mdi:lightbulb-outline",
        promise: "The right AI and data setup for your team, and a plan to get there.",
        whatYouGet: [
          {
            title: "Roadmap",
            body: "What to do, in what order, and the rough effort. Prices are sent privately.",
          },
          {
            title: "Tool selection",
            body: "A shortlist with reasons, including tools we don't list and tools we'd skip.",
          },
          {
            title: "Governance",
            body: "Who owns which data, who approves each AI output, who has access, and how data is handled.",
          },
          {
            title: "Setup outline",
            body: "How your data should flow and where AI fits.",
          },
          {
            title: "Ongoing advice (optional)",
            body: "A founder on call for the decisions that matter, monthly.",
          },
        ],
        duration:
          "Roadmap and tool selection: 1 to 3 weeks, often straight after the deep-dive audit. Ongoing advice: monthly, reviewed each quarter.",
        suits:
          "Teams that want AI but face too many choices. Teams with too many tools and no plan. Teams that need rules before rolling AI out. Enterprise teams that want an independent view.",
        isNot:
          "Open-ended consulting, a vendor's sales pitch, legal or regulatory sign-off, or a deck with no owner. A referral fee never decides what we recommend.",
        links: [{ text: "Browse the marketplace", href: "/marketplace/" }],
      },
      {
        id: "build",
        label: "Step 03",
        name: "Build",
        icon: "mdi:hammer-wrench",
        promise: "Your data infrastructure and AI agent teams, set up end to end and handed over.",
        whatYouGet: [
          {
            title: "Data infrastructure",
            body: "Connections to the systems you already run, one cleaned source your team and your AI tools can rely on, data pipelines and data checks.",
          },
          {
            title: "Reporting",
            body: "Where the plan calls for it.",
          },
          {
            title: "AI tools",
            body: "From the marketplace, set up in your own accounts and on your own data.",
          },
          {
            title: "AI agent teams",
            body: "For a function, for example month-end close, outreach or content, each with a named person who approves its work.",
          },
          {
            title: "Handover",
            body: "Plain-English documentation, training for your team, and the code, setup, accounts and access all in your name. We remove our access when you ask.",
          },
        ],
        duration:
          "One tool or stack: 1 to 2 weeks. One capability (a data foundation, reporting, or an agent team): 4 to 12 weeks. Larger programmes run in phases of 4 to 12 weeks.",
        suits:
          "Teams with a clear first use case and access to their data. Funded startups setting up data properly early. Mid-sized companies taking routine work off their teams.",
        isNot:
          "A black box or a rented system, a pilot that stalls, a standing team that never leaves, or a promise to replace staff. We don't host or resell your data. Agents never send, post, pay or make a hiring decision without a person's approval.",
        links: [],
      },
    ] satisfies LadderStep[],
    build: {
      ownershipLine: siteData.ownershipLine,
      aiBuiltNote:
        "AI-built means we use AI coding and data tools to do the build work, and an AUXO engineer reviews and tests everything before handover. What we build is yours to keep.",
    },
    upkeep: {
      id: "managed-upkeep",
      label: "Optional, after Build",
      icon: "mdi:sync",
      title: "Managed upkeep",
      promise: "We keep it running and tuned, month by month.",
      body: "We check it runs, fix what breaks, update it as tools and models change, tune agent rules, and send a short plain-English report each month.",
      terms:
        "Monthly and rolling, with no minimum term. Stop with 30 days' notice and keep everything we built. Managed upkeep is never a condition of Build.",
    },
  },
  aiLine: "AI where it earns its place. A person approves what goes out.",
  method: {
    eyebrow: "The method",
    title: "Five checks behind every audit.",
    lead: "Every AUXO Score and audit reads your data against the same five checks.",
    note: "We publish the method because you should be able to judge it before you meet us.",
    dimensions: [
      { name: "Accurate", question: "Is the data correct?" },
      { name: "Complete", question: "Is anything missing?" },
      { name: "Consistent", question: "Does it agree across systems?" },
      { name: "Timely", question: "Is it current when you need it?" },
      { name: "Trusted", question: "Do people actually rely on it when they decide?" },
    ] satisfies Dimension[],
  },
  pullQuote: "We'll tell you what to build, when to build it, and sometimes not to build at all.",
  engagement: {
    title: "How an engagement runs",
    steps: [
      {
        title: "Analyze first.",
        desc: "We read your business and your data against the five checks before anything is built. It starts with the AUXO Score, the free audit or the deep-dive audit.",
      },
      {
        title: "Advise on what fits.",
        desc: "We agree what to build, in what order, which tools to use, and who approves what. Prices are sent privately, in writing, before any work starts.",
      },
      {
        title: "Build on what we found.",
        desc: "Only what the audit shows is worth building, on the systems you already run, in short steps you can see working.",
      },
      {
        title: "The handover.",
        desc: "We train your team, document everything in plain English, and put the code, setup, accounts and access in your name. We remove our access when you ask.",
      },
      {
        title: "Managed upkeep, if you want it.",
        desc: "A monthly fee for upkeep and tuning. No minimum term. Stop with 30 days' notice and keep everything we built.",
      },
    ] satisfies EngagementStep[],
  },
  team: {
    title: "The founding team",
    lead: "You work with the founders, not an account manager.",
    linkLabel: "Connect on LinkedIn",
    founders: [
      {
        name: "Vignesh Ramesh",
        role: "Co-Founder & CEO",
        lines: [
          "Ex-IBM systems engineer. 10+ years executing enterprise mandates across the GCC, including BP Oman, RTA, DEWA and TransCo.",
        ],
        linkedin: "https://www.linkedin.com/in/vig-auxo",
      },
      {
        name: "Ajay Kumar",
        role: "Co-Founder & CTO",
        lines: [
          "Analytics architect. 10+ years building cloud infrastructure and BI for Fortune 500s and scale-ups across the EU, US and MENA.",
        ],
        linkedin: "https://www.linkedin.com/in/ajaykumar9795",
      },
    ] satisfies Founder[],
  },
  pricing: {
    title: "Pricing",
    body: "Every price is personal. See the three ways to start, and we'll send a price privately after the first conversation and audit.",
    cta: { text: "See pricing", href: "/pricing/" } satisfies Link,
  },
  faq: {
    title: "Questions about how it works",
    items: [
      {
        question: "Do we have to start with Analyze?",
        answer:
          "No. You can start at any step. We recommend Analyze because AI on untidy data gives untidy answers. If you already know your first use case and can give us access to your data, we can start at Advise or Build and do a short read of the data as part of it.",
      },
      {
        question: "Why can't Claude, ChatGPT or an agent we already have do this?",
        answer:
          "Often it can do part of it. The model is rarely the hard part. The hard part is the data it reads, the systems it connects to, the rules on what it may do, who approves its work, and keeping it running as things change. That is the work we do, and we can do it with Claude or ChatGPT inside.",
        link: { text: "Read the longer answer", href: "/blog/your-ai-assistant-is-not-the-hard-part/" },
      },
      {
        question: "Who owns what you build?",
        answer:
          "You do. The code, the setup, the documentation and the accounts are all in your name. Tools are set up in your company's own accounts, on your own contract with the vendor. No lock-in, no black box.",
      },
      {
        question: "Do your AI agents act on their own?",
        answer:
          "No. Agents draft, sort, check and flag. Each one has a named person who approves its work. Nothing is sent, posted or paid, and no hiring decision is made, without a person's approval.",
      },
      {
        question: "How long does it take?",
        answer:
          "The AUXO Score takes a few minutes. The deep-dive audit takes 2 to 3 weeks. Setting up one tool or stack takes 1 to 2 weeks, and one capability takes 4 to 12 weeks. Each proposal confirms the real timeline.",
      },
      {
        question: "Do we have to replace the tools we already use?",
        answer:
          "No. We build on the systems you already run. If a tool or agent you have works, we'll say so and suggest keeping it.",
      },
      {
        question: "Who will we work with?",
        answer:
          "The founders. You work directly with the people doing the work, not an account manager relaying messages.",
      },
    ] satisfies FaqItem[],
  },
  cta: {
    title: "Start with an honest read.",
    description: "Book a meeting, or take the AUXO Score first. Either way, you'll know what to fix first.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "Get your AUXO Score",
    secondaryHref: "/auxo-score/",
    reassurance: "A real person replies within one business day.",
  },
};
