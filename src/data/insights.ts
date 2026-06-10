import { siteData } from "./site";

export interface InsightsContent {
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
  hero: {
    title: "Short reads for people who move fast.",
    titleHighlight: "move fast",
    lead: "No long essays. A growing library of sharp positions on data, AI, and decisions in Gulf real estate, each read in under a minute.",
    framing: "Start with the featured picks, filter by topic, or open the full set.",
  },
  cta: {
    title: "See one that fits your desk?",
    titleHighlight: "fits your desk",
    description: "See a problem you recognise? That's a good place to start a conversation.",
    ctaText: "Book a meeting",
    ctaHref: siteData.bookingUrl,
    secondaryText: "See how we work",
    secondaryHref: "/services/",
    reassurance: "A real person replies within one business day.",
  },
};
