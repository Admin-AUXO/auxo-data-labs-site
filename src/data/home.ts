export interface HomeCapability {
  name: string;
  desc: string;
  icon: string;
}

export interface HomePrinciple {
  title: string;
  desc: string;
}

export interface HomeStep {
  title: string;
  desc: string;
  icon: string;
}

export interface HomeDeliverable {
  title: string;
  desc: string;
}

export interface HomeContent {
  hero: {
    title: string;
    titleHighlight: string | string[];
    subtitle: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  capabilities: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    items: HomeCapability[];
  };
  why: {
    title: string;
    titleHighlight?: string | string[];
    items: HomePrinciple[];
  };
  how: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    steps: HomeStep[];
  };
  outcomes: {
    title: string;
    titleHighlight?: string | string[];
    lead: string;
    items: HomeDeliverable[];
  };
  cta: {
    title: string;
    titleHighlight?: string | string[];
    description: string;
    ctaText: string;
    ctaHref: string;
    secondaryText: string;
    secondaryHref: string;
    reassurance: string;
  };
}

export const homeContent: HomeContent = {
  hero: {
    title: "Data and AI for Gulf real estate.",
    titleHighlight: "Gulf real estate",
    subtitle:
      "We help developers, funds, and family offices turn the data they already hold into decisions they can stand behind.",
    primaryCta: { text: "Start a conversation", href: "/contact/" },
    secondaryCta: { text: "See our work", href: "/services/" },
  },
  capabilities: {
    title: "What we do",
    titleHighlight: "do",
    subtitle: "Four ways we help property leaders act on numbers they trust.",
    items: [
      { name: "Trusted data", icon: "mdi:database-check-outline", desc: "One source the whole business agrees on, built from the systems you already run." },
      { name: "Clear reporting", icon: "mdi:chart-box-outline", desc: "Board- and investor-ready reporting that holds up under questions." },
      { name: "Reliable automation", icon: "mdi:cog-sync", desc: "Software carries the routine work, with a person accountable for the calls that matter." },
      { name: "Confident compliance", icon: "mdi:shield-check-outline", desc: "Stay ready for regulators without pulling your team off real work." },
    ],
  },
  why: {
    title: "Why leaders choose us",
    titleHighlight: "choose us",
    items: [
      { title: "Property is all we do", desc: "We work in real estate and nowhere else, so we start inside your business — not a template borrowed from another industry." },
      { title: "We ship working systems", desc: "Your team uses what we build on Monday, not a deck or a pilot that stalls." },
      { title: "Yours to keep — for the next generation too", desc: "You own the system outright, with no retainer to renew. It stays with the business and passes cleanly to the people who run it next." },
      { title: "Discreet by default", desc: "We work quietly under your own credentials. Your data, your relationships, and your name stay private." },
    ],
  },
  how: {
    title: "How we work",
    titleHighlight: "work",
    subtitle: "A short path from a real problem to a system your team owns.",
    steps: [
      { title: "Understand", icon: "mdi:magnify-scan", desc: "We learn how your business actually runs, and where the drag really is." },
      { title: "Build", icon: "mdi:cube-outline", desc: "We build it on your own data and put it to work, quietly and in production." },
      { title: "Hand over", icon: "mdi:handshake", desc: "Your team owns and runs it, with the confidence to keep going alone." },
    ],
  },
  outcomes: {
    title: "What you walk away with",
    titleHighlight: "walk away with",
    lead: "When the work is done, you are not left with a dependency. You are left with something your business owns and your team can run.",
    items: [
      { title: "A working system", desc: "Live and in production, doing real work from day one." },
      { title: "A trained team", desc: "Your people know how to run it and where to take it next." },
      { title: "Full ownership", desc: "The system is yours. No lock-in, no licence to keep paying." },
      { title: "Plain documentation", desc: "Written so anyone on your team can follow it, not just engineers." },
    ],
  },
  cta: {
    title: "Let's find where the drag starts.",
    titleHighlight: "drag starts",
    description: "Bring the problem that's nagging at you. You'll leave knowing exactly what to fix first.",
    ctaText: "Start a conversation",
    ctaHref: "/contact/",
    secondaryText: "See our work",
    secondaryHref: "/services/",
    reassurance: "A real person replies within one business day.",
  },
};
