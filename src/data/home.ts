import { siteData } from "./site";

export interface HomeLogo {
  name: string;
  /** simple-icons name; omitted when no official mark is available (rendered as a wordmark). */
  icon?: string;
}

export interface HomeLink {
  label: string;
  href: string;
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
  pillars: HomeLink[];
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
    subtitle: "For real estate businesses across the Gulf. Built to last, and yours to keep.",
    primaryCta: { text: "Book a meeting", href: siteData.bookingUrl },
    secondaryCta: { text: "Explore services", href: "/the-work/" },
  },
  score: {
    title: "Get your company's health report.",
    stat: "More than one in three CFOs don't completely trust their own financial data.",
    footnoteId: "ref-1",
    cta: { text: "See where you stand", href: "/self-check/" },
    reassurance: "No sign-up. Nothing leaves your browser.",
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
    { label: "Trusted data", href: "/the-work/#method" },
    { label: "Clear reporting", href: "/the-work/#method" },
    { label: "Reliable automation", href: "/the-work/#method" },
    { label: "Confident compliance", href: "/the-work/#method" },
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
