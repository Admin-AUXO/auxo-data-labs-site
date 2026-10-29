import type { APIRoute } from "astro";

const manifest = {
  name: "AUXO Data Labs",
  short_name: "AUXO",
  id: "/",
  description:
    "AUXO gets your data ready for AI, then sets up the tools and agents that run on it. Built to last, and yours to keep.",
  start_url: "/",
  display: "standalone",
  background_color: "#080808",
  theme_color: "#080808",
  orientation: "portrait-primary",
  icons: [
    { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
  ],
  shortcuts: [
    {
      name: "How it works",
      short_name: "How it works",
      description: "Analyze, Advise, Build, and the founding team",
      url: "/how-it-works/",
      icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    },
    {
      name: "AUXO Score",
      short_name: "AUXO Score",
      description: "Check how ready your data is for AI",
      url: "/auxo-score/",
      icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    },
    {
      name: "Contact",
      short_name: "Contact",
      description: "Apply for a Founder review",
      url: "/apply/",
      icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    },
  ],
  categories: ["business", "productivity"],
  lang: "en",
  dir: "ltr",
  scope: "/",
  display_override: ["standalone", "browser"],
};

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(manifest), {
    headers: { "content-type": "application/manifest+json; charset=utf-8" },
  });
