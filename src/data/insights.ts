import { siteData } from "./site";

export interface InsightsContent {
  meta: { title: string; description: string };
  hero: {
    title: string;
    titleHighlight: string | string[];
    lead: string;
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
    title: "One-minute reads on data and AI.",
    titleHighlight: "data and AI",
    lead: "Short, sourced positions for finance, operations, engineering, hiring, sales and content teams.",
  },
  cta: {
    title: "See one that fits your team?",
    titleHighlight: "fits your team",
    description: "Bring it to a short call. We'll tell you what we'd fix first.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "See how it works",
    secondaryHref: "/how-it-works/",
    reassurance: "A real person replies within one business day.",
  },
};
