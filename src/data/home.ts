import { siteData } from "./site";

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
    title: "Analytics and AI for Gulf real estate.",
    titleHighlight: "Gulf real estate",
    subtitle:
      "You're not short of data. You're short of what analytics and AI can pull from it. We close that gap, and hand back decisions that hold up in any room.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl },
    secondaryCta: { text: "Explore services", href: "/services/" },
  },
  capabilities: {
    title: "How we help",
    titleHighlight: "help",
    subtitle: "Four ways we help property leaders act on numbers they trust.",
    items: [
      { name: "Trusted data", icon: "mdi:database-check-outline", desc: "One source the whole business agrees on, built from the systems you already run." },
      { name: "Clear reporting", icon: "mdi:chart-box-outline", desc: "Board- and investor-ready reporting that holds up under the hard questions, traceable to source." },
      { name: "Reliable automation", icon: "mdi:cog-sync", desc: "Software carries the routine work, with a person accountable for the calls that matter." },
      { name: "Confident compliance", icon: "mdi:shield-check-outline", desc: "Stay ready for regulators without pulling your team off the work that pays." },
    ],
  },
  why: {
    title: "Why leaders choose us",
    titleHighlight: "choose us",
    items: [
      { title: "Property is all we do", desc: "We work in real estate and nowhere else, so we start inside your business, not a template borrowed from another sector." },
      { title: "We ship working systems", desc: "Your team uses what we build on Monday, not a deck or a pilot that quietly stalls after the kickoff meeting." },
      { title: "Yours to keep for good", desc: "You own the system outright. It stays with the business and passes cleanly to the next generation." },
      { title: "We'll tell you when not to build", desc: "If software isn't the answer, we say so. You get an honest call on fit before a budget is spent, not a sales pitch." },
    ],
  },
  how: {
    title: "How we work",
    titleHighlight: "work",
    subtitle: "Four steps from a real problem to a system your team owns — short, visible cycles you can course-correct as we go.",
    steps: [
      { title: "Scope", icon: "mdi:magnify-scan", desc: "We get the problem and the first move clear, together." },
      { title: "Build", icon: "mdi:cube-outline", desc: "We build in short, visible steps you can see working." },
      { title: "Embed", icon: "mdi:account-sync-outline", desc: "We put it into your day-to-day, alongside the people who use it." },
      { title: "Hand over", icon: "mdi:handshake", desc: "Your team owns and runs it — no retainer to renew." },
    ],
  },
  outcomes: {
    title: "What you walk away with",
    titleHighlight: "walk away with",
    lead: "When the work is done, you are not left with a dependency. You are left with something your business owns and your team can run.",
    items: [
      { title: "A working system", desc: "Live in production and doing real work from day one." },
      { title: "A trained team", desc: "Your people know how to run it and where to take it next." },
      { title: "Full ownership", desc: "The system is yours to keep, with no lock-in and no licence to renew." },
      { title: "Plain documentation", desc: "Written so anyone on your team can follow it, not just engineers." },
    ],
  },
  cta: {
    title: "Let's find where the friction starts.",
    titleHighlight: "friction starts",
    description: "Bring the problem that's nagging at you. You'll leave knowing exactly what to fix first.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "Explore services",
    secondaryHref: "/services/",
    reassurance: "A real person replies within one business day.",
  },
};
