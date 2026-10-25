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
  isNot: string;
  links: Link[];
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
      "Analyze, Advise, Build: an honest read of your data, the right AI setup, then a build you own. No lock-in.",
  },
  intro: {
    title: "How it works.",
    lead: "Three steps. Start at any one. We recommend starting with Analyze.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl } satisfies Link,
    reassurance: "A real person replies within one business day.",
  },
  ladder: {
    navLabel: "Steps",
    labels: {
      whatYouGet: "What you get",
      duration: "Typical duration",
      suits: "Best for",
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
            icon: "mdi:gauge",
            title: "AUXO Score",
            tag: "Free",
            tone: "free",
            body: "10 questions, five checks, a score out of 100. About 3 minutes, no sign-up.",
          },
          {
            icon: "mdi:account-tie-outline",
            title: "Free audit",
            tag: "Funded startups",
            tone: "free",
            body: "Your AUXO Score, a 45-minute call with a founder and a one-page plan of what to fix first.",
          },
          {
            icon: "mdi:file-search-outline",
            title: "Deep-dive audit",
            tag: "Paid",
            tone: "paid",
            body: "Your systems reviewed under NDA: red-amber-green ratings, AI readiness by function, a build-first plan and a leadership readout.",
          },
        ],
        duration: "Score: about 3 minutes. Free audit: one 45-minute call. Deep-dive: 2 to 3 weeks.",
        suits: "Teams about to spend on AI or data, or whose numbers disagree across systems.",
        isNot: "A sales call in disguise, a generic checklist or a compliance certificate.",
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
            icon: "mdi:map-outline",
            title: "Roadmap",
            body: "What to do, in what order, at what effort, and where AI fits your data flow.",
          },
          {
            icon: "mdi:compass-outline",
            title: "Tool selection",
            body: "A reasoned shortlist, including tools we don't list and tools to skip.",
          },
          {
            icon: "mdi:shield-account-outline",
            title: "Governance",
            body: "Who owns which data, who approves each AI output, and who has access.",
          },
          {
            icon: "mdi:phone-outline",
            title: "Ongoing advice",
            tag: "Optional",
            tone: "optional",
            body: "A founder on call for the decisions that matter, monthly.",
          },
        ],
        duration: "1 to 3 weeks, often straight after the deep-dive audit. Ongoing advice: monthly.",
        suits: "Teams with too many AI options and no plan, or that need rules before rolling AI out.",
        isNot: "Open-ended consulting, a vendor pitch or legal sign-off. Referral fees never decide what we recommend.",
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
            icon: "mdi:database-outline",
            title: "Data infrastructure",
            body: "One clean, checked source connected to the systems you run, with reporting where it helps.",
          },
          {
            icon: "mdi:tools",
            title: "AI tools",
            body: "Marketplace tools set up in your own accounts, on your own data.",
          },
          {
            icon: "mdi:robot-outline",
            title: "AI agent teams",
            body: "Agents for one function, such as month-end close or outreach. A named person approves their work.",
          },
          {
            icon: "mdi:key-outline",
            title: "Handover",
            tag: "Yours to keep",
            tone: "free",
            body: "Documentation, training, and the code, accounts and access in your name.",
          },
        ],
        duration: "One tool or stack: 1 to 2 weeks. A data foundation or agent team: 4 to 12 weeks.",
        suits: "Teams with a clear first use case and access to their data.",
        isNot: "A black box, a rented system or a stalled pilot. Agents never send, post or pay without a person's approval.",
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
      body: "We check it runs, fix what breaks, update it as tools and models change, tune agent rules, and send a short plain‑English report each month.",
      terms:
        "Monthly, no minimum term. Stop with 30 days' notice and keep everything we built. Never a condition of Build.",
    },
  },
  aiLine: "AI where it earns its place. A person approves what goes out.",
  method: {
    eyebrow: "The method",
    title: "Five checks behind every audit.",
    lead: "Every AUXO Score and audit reads your data against the same five checks.",
    note: "We publish it so you can judge it before you meet us.",
    dimensions: [
      { name: "Accurate", question: "Is the data correct?" },
      { name: "Complete", question: "Is anything missing?" },
      { name: "Consistent", question: "Does it agree across systems?" },
      { name: "Timely", question: "Is it current when you need it?" },
      { name: "Trusted", question: "Do people rely on it to make decisions?" },
    ] satisfies Dimension[],
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
  faq: {
    title: "Questions about how it works",
    items: [
      {
        question: "Do we have to start with Analyze?",
        answer:
          "No, but we recommend it: AI on untidy data gives untidy answers. If you know your first use case and can share your data, start at Advise or Build and we'll check the data as we go.",
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
          "You do. The code, setup, documentation and accounts are in your name, and tools run on your own vendor contracts. No lock-in, no black box.",
      },
      {
        question: "Do your AI agents act on their own?",
        answer:
          "No. Agents draft, sort, check and flag. Each one has a named person who approves its work. Nothing is sent, posted or paid, and no hiring decision is made, without a person's approval.",
      },
      {
        question: "Do we have to replace the tools we already use?",
        answer:
          "No. We build on the systems you already run. If a tool or agent you have works, we'll say so and suggest keeping it.",
      },
    ] satisfies FaqItem[],
  },
  cta: {
    title: "Start with an honest read.",
    description: "Book a meeting, or take the AUXO Score first. Either way, you'll know where to start.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "Get your AUXO Score",
    secondaryHref: "/auxo-score/",
    reassurance: "A real person replies within one business day.",
  },
};
