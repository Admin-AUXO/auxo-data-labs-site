import { siteData } from "./site";

export interface HomeLogo {
  name: string;
  icon?: string;
}

export interface HomePillar {
  letter: "A" | "U" | "X" | "O";
  title: string;
  desc: string;
}

export interface HomeCard {
  title: string;
  href: string;
}

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  score: {
    title: string;
    stat: string;
    footnoteId: string;
    cta: { text: string; href: string };
    reassurance: string;
  };
  logos: {
    label: string;
    items: HomeLogo[];
  };
  pillars: HomePillar[];
  cards: HomeCard[];
  cta: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    reassurance: string;
  };
}

export const homeContent: HomeContent = {
  hero: {
    title: "We turn messy, fragmented data into intelligent decisions companies act on.",
    subtitle: "For businesses across the Gulf. Built to last, and yours to keep.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl },
    secondaryCta: { text: "See how we work", href: "/the-work/" },
  },
  score: {
    title: "Get your company's health report.",
    stat: "More than one in three CFOs don't completely trust their own financial data.",
    footnoteId: "ref-1",
    cta: { text: "See where you stand", href: "/auxo-score/" },
    reassurance: "No sign-up. Your answers stay private unless you ask us to email your report.",
  },
  logos: {
    label: "Built on",
    items: [
      { name: "Power BI", icon: "simple-icons:powerbi" },
      { name: "Tableau", icon: "simple-icons:tableau" },
      { name: "Snowflake", icon: "simple-icons:snowflake" },
      { name: "Google Cloud", icon: "simple-icons:googlecloud" },
      { name: "Microsoft Azure", icon: "simple-icons:microsoftazure" },
      { name: "Salesforce", icon: "simple-icons:salesforce" },
      { name: "SAP", icon: "simple-icons:sap" },
      { name: "Oracle", icon: "simple-icons:oracle" },
      { name: "Yardi" },
      { name: "Anthropic", icon: "simple-icons:anthropic" },
    ],
  },
  pillars: [
    { letter: "A", title: "Trusted data", desc: "One source the whole business agrees on, built from the systems you already run." },
    { letter: "U", title: "Clear reporting", desc: "Board- and investor-ready reporting that holds up under the hard questions." },
    { letter: "X", title: "Reliable automation", desc: "Software carries the routine work, with a person accountable for the calls that matter." },
    { letter: "O", title: "Confident compliance", desc: "Stay ready for regulators without pulling your team off the work that pays." },
  ],
  cards: [
    { title: "The Work", href: "/the-work/" },
    { title: "The Approach", href: "/the-work/#engagement" },
    { title: "The People", href: "/the-work/#team" },
  ],
  cta: {
    title: "Let's find where the friction starts.",
    description: "Bring the problem that's nagging at you. You'll leave knowing exactly what to fix first.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    reassurance: "A real person replies within one business day.",
  },
};
