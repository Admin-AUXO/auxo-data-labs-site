import { siteData } from "./site";

export interface InsightsContent {
  meta: { title: string; description: string };
  hero: {
    title: string;
    titleHighlight: string | string[];
    lead: string;
    framing: string;
  };
  cta: {
    title: string;
    titleHighlight?: string | string[];
    description: string;
    ctaText: string;
    ctaHref: string;
    secondaryText?: string;
    secondaryHref?: string;
    reassurance?: string;
  };
}

export const insightsContent: InsightsContent = {
  meta: {
    title: "Insights: short reads on data and AI",
    description: "One-minute positions on data, AI, reporting and ownership. Plain, sourced and quick to read.",
  },
  hero: {
    title: "Short reads for people who move fast.",
    titleHighlight: "move fast",
    lead: "No long essays. Short, plain positions on data and AI for finance, operations, engineering, hiring, sales and content teams. Each one takes under a minute.",
    framing: "Start with the featured picks, filter by topic, or open the full set.",
  },
  cta: {
    title: "See one that fits your team?",
    titleHighlight: "fits your team",
    description: "See a problem you recognise? That's a good place to start a conversation.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "See how it works",
    secondaryHref: "/how-it-works/",
    reassurance: "A real person replies within one business day.",
  },
};
