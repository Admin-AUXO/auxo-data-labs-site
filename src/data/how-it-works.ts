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
    title: "How it works: Score, review, audit, build",
    description:
      "One path: AUXO Score, Founder review, Deep-dive audit, Build. Numbers your board and investors can rely on, and a build you own.",
  },
  intro: {
    eyebrow: "How it works",
    title: "Analyze. Advise. Build.",
    titleHighlight: ".",
    lead: "One path. At each step you get something in writing, and a person signs off.",
    primaryCta: { text: "Apply for a Founder review", href: siteData.applyUrl } satisfies Link,
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
        name: "Analyze",
        icon: "mdi:magnify",
        promise: "An honest look at your numbers before the raise or the board meeting.",
        whatYouGet: [
          {
            icon: "mdi:gauge",
            title: "AUXO Score",
            tag: "Anyone",
            tone: "free",
            body: "A self-check: 10 questions, about 3 minutes. You get a score out of 100 and where to look first. You decide what to do next.",
          },
          {
            icon: "mdi:account-tie-outline",
            title: "Founder review",
            tag: "Every company",
            tone: "free",
            body: "A 30-minute call with a founder, by application. Written next steps within 3 business days. No charge. You decide whether to go on.",
          },
          {
            icon: "mdi:file-search-outline",
            title: "Deep-dive audit",
            tag: "Paid",
            tone: "paid",
            body: "A 2 to 3 week review of your systems under NDA. You get each gap between your deck, model and accounts, and a plan of what to build first. A founder signs off the findings. Credited if you build with us.",
          },
        ],
        duration: "Score: about 3 minutes. Founder review: one 30-minute call. Deep-dive: 2 to 3 weeks.",
        suits: "Funded companies preparing a raise, a board meeting or diligence, whose deck, model and accounts disagree.",
        bring: "View-only access to the tools we look at.",
        isNot: "A sales pitch, a generic checklist or a compliance certificate.",
        links: [
          { text: "Take the AUXO Score", href: "/auxo-score/" },
          { text: "Apply for a Founder review", href: siteData.applyUrl },
        ],
      },
      {
        id: "advise",
        name: "Advise",
        icon: "mdi:lightbulb-outline",
        promise: "A plan to get there, and the tools that fit.",
        whatYouGet: [
          {
            icon: "mdi:map-outline",
            title: "Plan",
            body: "What to do first, what comes next, and where AI helps. Your leadership approves it.",
          },
          {
            icon: "mdi:compass-outline",
            title: "Tool choice",
            body: "A short list of tools that fit, and the ones to skip.",
          },
          {
            icon: "mdi:shield-account-outline",
            title: "Clear rules, and optional ongoing advice",
            body: "Who owns which data, who checks the AI's work, and who has access. A founder on call monthly, if you want it.",
          },
        ],
        duration: "1 to 3 weeks, often right after the deep-dive audit.",
        suits: "Teams that know the numbers are wrong and need a plan.",
        bring: "The people who sign off: founder, CFO or finance lead.",
        isNot: "Endless consulting or a sales pitch for a vendor. Referral fees never decide what we recommend.",
        links: [{ text: "Browse the stacks", href: "/marketplace/" }],
      },
      {
        id: "build",
        name: "Build",
        icon: "mdi:hammer-wrench",
        promise: "One set of numbers, set up end to end and handed over.",
        whatYouGet: [
          {
            icon: "mdi:database-outline",
            title: "Data foundation",
            body: "One clean, checked set of numbers from the tools you use, with a board pack where it helps. Your finance lead signs off the definitions.",
          },
          {
            icon: "mdi:tools",
            title: "AI tools",
            body: "Tool stacks, set up in your accounts, on your data.",
          },
          {
            icon: "mdi:key-outline",
            title: "Handover",
            body: "Guides, training, and everything in your name.",
          },
        ],
        duration: "One tool: 1 to 2 weeks. A data foundation: 4 to 12 weeks.",
        suits: "Teams who have done the audit and can share their data.",
        bring: "One named owner for each tool.",
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
      promise: "We keep it running after handover. Monthly, no minimum term.",
      terms:
        "Monthly, no minimum term. Stop with 30 days' notice and keep everything.",
    },
  },
  method: {
    eyebrow: "The method",
    title: "Five checks. One honest score.",
    lead: "Every score and audit runs the same five checks on your ARR, burn and runway figures.",
    dimensions: [
      { name: "Accurate", question: "Is the data correct?" },
      { name: "Complete", question: "Is anything missing?" },
      { name: "Consistent", question: "Does it agree across systems?" },
      { name: "Timely", question: "Is it current when you need it?" },
      { name: "Trusted", question: "Do people rely on it to make decisions?" },
    ] satisfies Dimension[],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Good questions. Plain answers.",
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
        question: "Why can't Claude or ChatGPT do this for us?",
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
        question: "Does the AI act on its own?",
        answer:
          "No. AI drafts, sorts, checks and flags. A named person approves its work. Nothing is sent, posted or paid without a person's say-so.",
      },
    ] satisfies FaqItem[],
  },
  cta: {
    title: "Raising, or facing a board? Start with an honest read.",
    description: "Leave knowing which numbers to fix first.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance: "A real person replies within one business day.",
  },
};
