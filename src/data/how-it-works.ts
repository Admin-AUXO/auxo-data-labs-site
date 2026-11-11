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
  tag?: string;
  tone?: "free" | "paid" | "optional";
  body: string;
}

export interface Specimen {
  title: string;
  head: string[];
  rows: { cells: string[]; tone: "gap" | "ok" | "skip" }[];
  note: string;
}

export interface LadderStep {
  id: string;
  example: Specimen;
  name: string;
  cost: { label: string; tone: "free" | "paid" | "optional" };
  promise: string;
  whatYouGet: LadderItem[];
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
      "Analyze, Advise, Build: numbers your board and investors can rely on, and a build you own.",
  },
  intro: {
    title: "Analyze. Advise. Build.",
    lead: "Each step ends with something in writing. Stop after any of them.",
    primaryCta: { text: "Apply for a Founder review", href: siteData.applyUrl } satisfies Link,
    secondaryCta: { text: "Take the AUXO Score", href: "/auxo-score/" } satisfies Link,
  },
  ladder: {
    labels: {
      whatYouGet: "You get",
    },
    steps: [
      {
        id: "analyze",
        name: "Analyze",
        cost: { label: "No charge to start", tone: "free" },
        promise: "Do your deck, model and accounts agree? You get a written read before the raise.",
        example: {
          title: "Why ARR has three answers",
          head: ["Where", "What we find", "ARR"],
          rows: [
            { cells: ["Deck", "Counts churned contracts", "Too high"], tone: "gap" },
            { cells: ["Model", "Counts one-off services", "Too high"], tone: "gap" },
            { cells: ["Accounts", "Matches billing", "Correct"], tone: "ok" },
          ],
          note: "Every gap comes with its cause, in writing.",
        },
        whatYouGet: [
          {
            title: "AUXO Score",
            tag: "Anyone",
            tone: "free",
            body: "A self-check of 10 questions. You get a score out of 100 and where to look first.",
          },
          {
            title: "Founder review",
            tag: "Every company",
            tone: "free",
            body: "A call, by application. Written next steps within 3 business days. No charge.",
          },
          {
            title: "Deep-dive audit",
            tag: "Scoped with you",
            tone: "paid",
            body: "A review of your systems under NDA. You get each gap between your deck, model and accounts, and a plan of what to build first. Credited if you build with us.",
          },
        ],
        links: [
          { text: "Take the AUXO Score", href: "/auxo-score/" },
          { text: "Apply for a Founder review", href: siteData.applyUrl },
        ],
      },
      {
        id: "advise",
        name: "Advise",
        cost: { label: "Scoped with you", tone: "paid" },
        promise: "What do you fix first, and what do you skip? You get a plan, and the tools that fit.",
        example: {
          title: "What a plan says",
          head: ["Order", "What"],
          rows: [
            { cells: ["First", "Agree one definition of ARR"], tone: "ok" },
            { cells: ["Next", "Join billing and CRM"], tone: "ok" },
            { cells: ["Then", "Board pack from one source"], tone: "ok" },
            { cells: ["Skip", "A new reporting tool"], tone: "skip" },
          ],
          note: "Approved by your leadership before any build.",
        },
        whatYouGet: [
          {
            title: "Plan",
            body: "What to do first, what comes next, and where AI helps. Your leadership approves it.",
          },
          {
            title: "Tool choice",
            body: "A short list of tools that fit, and the ones to skip.",
          },
          {
            title: "Clear rules, and optional ongoing advice",
            body: "Who owns which data, who checks the AI's work, and who has access. A founder on call monthly, if you want it.",
          },
        ],
        links: [{ text: "Browse the stacks", href: "/marketplace/" }],
      },
      {
        id: "build",
        name: "Build",
        cost: { label: "Agreed phase by phase", tone: "paid" },
        promise: "Who builds it, and who owns it after? We build it in your accounts. You keep it.",
        example: {
          title: "One set of numbers",
          head: ["Metric", "Comes from", "Signed off by"],
          rows: [
            { cells: ["ARR", "Billing", "Finance lead"], tone: "ok" },
            { cells: ["Monthly burn", "Accounts", "Finance lead"], tone: "ok" },
            { cells: ["Runway", "Both", "Finance lead"], tone: "ok" },
          ],
          note: "Your deck, model and board pack read the same figures.",
        },
        whatYouGet: [
          {
            title: "Data foundation",
            body: "One clean, checked set of numbers from the tools you use, with a board pack where it helps. Your finance lead signs off the definitions.",
          },
          {
            title: "AI tools",
            body: "Chat with your data, and workflow automation between your tools.",
          },
          {
            title: "Handover",
            body: "Guides, training, and everything in your name.",
          },
        ],
        links: [],
      },
    ] satisfies LadderStep[],
    build: {
      ownershipLine: siteData.ownershipLine,
    },
    upkeep: {
      id: "managed-upkeep",
      label: "Optional, after Build",
      title: "Managed upkeep",
      promise: "We keep it running after handover.",
      terms: "Billed monthly, with no minimum term. Stop with 30 days' notice and keep everything.",
    },
  },
  method: {
    title: "Five checks. One score.",
    lead: "Every score and audit asks the same five questions of your ARR, burn and runway figures.",
    cta: { text: "Take the AUXO Score", href: "/auxo-score/" } satisfies Link,
    dimensions: [
      { name: "Accurate", question: "Is the data correct?" },
      { name: "Complete", question: "Is anything missing?" },
      { name: "Consistent", question: "Does it agree across systems?" },
      { name: "Timely", question: "Is it current when you need it?" },
      { name: "Trusted", question: "Do people rely on it to make decisions?" },
    ] satisfies Dimension[],
  },
  faq: {
    title: "Common questions.",
    items: [
      {
        question: "Will it fit the tools we run?",
        answer:
          "Yes. We build on what you already use, such as Google Cloud, Azure, Snowflake or Power BI. If a tool works, we keep it.",
      },
      {
        question: "Do we need a Deep-dive audit first?",
        answer:
          "No. The Founder review comes first, at no charge. After it, if you know what you need, we go straight to Advise or Build and check the data as we go.",
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
    title: "Raising, or facing a board? Start with the numbers.",
    description: "Leave knowing which numbers to fix first.",
    ctaText: "Apply for a Founder review",
    ctaHref: siteData.applyUrl,
    reassurance: "We reply within one business day.",
  },
};
