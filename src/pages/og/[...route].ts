import { OGImageRoute } from "astro-og-canvas";
import { siteData } from "../../data/site";

const pages = {
  index: {
    title: "Analytics and AI for Gulf real estate",
    description: "Turn the data you already hold into decisions you can stand behind.",
  },
  services: {
    title: "Work — what AUXO builds",
    description:
      "Trusted data, clear reporting, reliable automation, and confident compliance for Gulf property teams.",
  },
  about: {
    title: "Studio — the team behind AUXO",
    description: "A small analytics and AI studio for real estate, based in Dubai and working across the Gulf.",
  },
  insights: {
    title: "Insights — short reads",
    description: "Sharp, one-minute positions on data, AI, and decisions in Gulf real estate.",
  },
  contact: {
    title: "Let's talk",
    description: "Tell us what's slowing your decisions down. A real person replies within one business day.",
  },
  "legal-privacy-policy": { title: "Privacy Policy", description: siteData.name },
  "legal-terms": { title: "Terms of Use", description: siteData.name },
  "legal-cookie-policy": { title: "Cookie Policy", description: siteData.name },
  "404": { title: "Page not found", description: siteData.name },
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    dir: "ltr",
    bgGradient: [
      [10, 10, 10],
      [22, 22, 22],
    ],
    border: { color: [163, 230, 53], width: 24, side: "inline-start" },
    padding: 80,
    font: {
      title: { color: [255, 255, 255], weight: "Bold", size: 66, lineHeight: 1.1 },
      description: { color: [176, 176, 176], weight: "Normal", size: 30, lineHeight: 1.45 },
    },
  }),
});
