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
  icon: string;
  title: string;
  tag?: string;
  tone?: "free" | "paid" | "optional";
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
  bring: string;
  isNot: string;
  links: Link[];
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
      "Analyze, Advise, Build: an honest look at your data, the right AI for you, then a build you own.",
  },
  intro: {
    title: "How it works.",
    lead: "Three steps. Start at any one. We recommend starting with Analyze.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl } satisfies Link,
  },
  ladder: {
    navLabel: "Steps",
    labels: {
      whatYouGet: "What you get",
      duration: "Time",
      suits: "Best for",
      bring: "You bring",
      isNot: "It isn't",
    },
    steps: [
      {
        id: "analyze",
        label: "Step 01",
        name: "Analyze",
        icon: "mdi:magnify",
        promise: "An honest look at your business and data, before you spend on AI.",
        whatYouGet: [
          {
            icon: "mdi:gauge",
            title: "AUXO Score",
            tag: "Free",
            tone: "free",
            body: "10 questions and a score out of 100. About 3 minutes, no sign-up.",
          },
          {
            icon: "mdi:account-tie-outline",
            title: "Free audit",
            tag: "Seed to Series B",
            tone: "free",
            body: "Your AUXO Score, a 45-minute founder call and a one-page plan.",
          },
          {
            icon: "mdi:file-search-outline",
            title: "Deep-dive audit",
            tag: "Paid",
            tone: "paid",
            body: "We review your systems under NDA. You get each fix rated by urgency, a plan of what to build first and a short readout for your leaders.",
          },
        ],
        duration: "Score: about 3 minutes. Free audit: one 45-minute call. Deep-dive: 2 to 3 weeks.",
        suits: "Teams about to spend on AI, or whose numbers don't match.",
        bring: "View-only access to the tools we look at.",
        isNot: "A sales pitch, a generic checklist or a compliance certificate.",
        links: [
          { text: "Get your AUXO Score", href: "/auxo-score/" },
          { text: "Startup, seed to Series B? Get your free audit", href: "/auxo-score/?offer=free-audit" },
        ],
      },
      {
        id: "advise",
        label: "Step 02",
        name: "Advise",
        icon: "mdi:lightbulb-outline",
        promise: "The right AI for your team, and a plan to get there.",
        whatYouGet: [
          {
            icon: "mdi:map-outline",
            title: "Plan",
            body: "What to do first, what comes next, and where AI helps.",
          },
          {
            icon: "mdi:compass-outline",
            title: "Tool choice",
            body: "A short list of tools that fit, and the ones to skip.",
          },
          {
            icon: "mdi:shield-account-outline",
            title: "Clear rules",
            body: "Who owns which data, who checks the AI's work, and who has access.",
          },
          {
            icon: "mdi:phone-outline",
            title: "Ongoing advice",
            tag: "Optional",
            tone: "optional",
            body: "A founder on call for big decisions, monthly.",
          },
        ],
        duration: "1 to 3 weeks, often right after the deep-dive audit.",
        suits: "Teams with too many AI options and no plan.",
        bring: "The people who own the decisions.",
        isNot: "Endless consulting or a sales pitch for a vendor. Referral fees never decide what we recommend.",
        links: [{ text: "Browse the marketplace", href: "/marketplace/" }],
      },
      {
        id: "build",
        label: "Step 03",
        name: "Build",
        icon: "mdi:hammer-wrench",
        promise: "Your data and AI tools, set up end to end and handed over.",
        whatYouGet: [
          {
            icon: "mdi:database-outline",
            title: "Data foundation",
            body: "One clean, checked set of numbers from the tools you use, with reports where they help.",
          },
          {
            icon: "mdi:tools",
            title: "AI tools",
            body: "Tools from our marketplace, set up in your accounts, on your data.",
          },
          {
            icon: "mdi:robot-outline",
            title: "AI agents",
            body: "Agents for one job, such as month-end close or outreach. A named person approves their work.",
          },
          {
            icon: "mdi:key-outline",
            title: "Handover",
            body: "Guides, training, and everything in your name.",
          },
        ],
        duration: "One tool: 1 to 2 weeks. A data foundation or agents: 4 to 12 weeks.",
        suits: "Teams who know their first job for AI and can share their data.",
        bring: "One named owner for each tool and agent.",
        isNot: "A black box, a rented system or a stalled pilot.",
        links: [],
      },
    ] satisfies LadderStep[],
    build: {
      ownershipLine: siteData.ownershipLine,
      aiBuiltNote:
        "We use AI tools to build, then check and test everything before handover.",
    },
    upkeep: {
      id: "managed-upkeep",
      label: "Optional, after Build",
      icon: "mdi:sync",
      title: "Managed upkeep",
      promise: "We keep it running after handover.",
      terms:
        "Monthly, no minimum term. Stop with 30 days' notice and keep everything.",
    },
  },
  method: {
    title: "Five checks behind every audit.",
    lead: "Every score and audit uses the same five checks. Here they are.",
    dimensions: [
      { name: "Accurate", question: "Is the data correct?" },
      { name: "Complete", question: "Is anything missing?" },
      { name: "Consistent", question: "Does it agree across systems?" },
      { name: "Timely", question: "Is it current when you need it?" },
      { name: "Trusted", question: "Do people rely on it to make decisions?" },
    ] satisfies Dimension[],
  },
  faq: {
    title: "Questions about how it works",
    items: [
      {
        question: "Will it fit the tools we run?",
        answer:
          "Yes. We build on what you already use, such as Google Cloud, Azure, Snowflake or Power BI. If a tool works, we keep it.",
      },
      {
        question: "Do we have to start with Analyze?",
        answer:
          "No, but we recommend it. AI on untidy data gives untidy answers. If you know what you need, start at Advise or Build and we'll check the data as we go.",
      },
      {
        question: "Why can't Claude, ChatGPT or an agent we already have do this?",
        answer:
          "Often it can do part of it. The AI is rarely the hard part. The hard part is clean data, the right connections, clear rules and keeping it running. That's our work, and we can use Claude or ChatGPT to do it.",
        link: { text: "Read the longer answer", href: "/blog/your-ai-assistant-is-not-the-hard-part/" },
      },
      {
        question: "Who owns what you build?",
        answer:
          "You do. Everything is in your name, and tools run on your own contracts. No lock-in.",
      },
      {
        question: "Do your AI agents act on their own?",
        answer:
          "No. Agents draft, sort and flag. A named person approves their work. Nothing is sent, posted or paid without a person's say-so.",
      },
    ] satisfies FaqItem[],
  },
  cta: {
    title: "Start with an honest read.",
    description: "Leave knowing where to start.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    reassurance: "A real person replies within one business day.",
  },
};
