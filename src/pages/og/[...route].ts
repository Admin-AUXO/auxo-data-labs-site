import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { siteData } from "../../data/site";

interface OGPage {
  title: string;
  description: string;
}

const posts = await getCollection("blog", ({ data }) => !data.draft);

const postPages: Record<string, OGPage> = Object.fromEntries(
  posts.map((post) => [
    `blog-${post.id}`,
    { title: post.data.title, description: post.data.description },
  ]),
);

const pages: Record<string, OGPage> = {
  index: {
    title: "Your data, ready for AI.",
    description: "We analyse your business and data, advise on the right AI setup, and build it end to end.",
  },
  "how-it-works": {
    title: "Analyze. Advise. Build.",
    description: "Each step ends with something in writing. Stop after any of them.",
  },
  pricing: {
    title: "No charge to start. A fixed price after.",
    description: "The AUXO Score and the Founder review cost nothing. Each phase after has a fixed price, in writing.",
  },
  marketplace: {
    title: "Six ways to get numbers you can trust.",
    description: "Work on your data, built with your team in your own accounts."
  },
  blog: {
    title: "Data and AI, written plainly.",
    description: "Long reads on data, AI tools and agents, and when not to build.",
  },
  about: {
    title: "Data first. Then AI.",
    description: "Founder-led, based in Dubai. Serving the UAE, the US and Europe.",
  },
  contact: {
    title: "Bring the number you doubt.",
    description: "We reply within one business day.",
  },
  "auxo-score": {
    title: "How ready is your data for AI?",
    description: "A 10-question check. Your score out of 100 in about 3 minutes.",
  },
  "legal-privacy-policy": { title: "Privacy Policy", description: siteData.name },
  "legal-terms": { title: "Terms of Use", description: siteData.name },
  "legal-cookie-policy": { title: "Cookie Policy", description: siteData.name },
  "404": { title: "Page not found", description: siteData.name },
  ...postPages,
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page: OGPage) => ({
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
