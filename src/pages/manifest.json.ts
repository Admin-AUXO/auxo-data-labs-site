import type { APIRoute } from "astro";
import { withBase } from "../lib/url";

const manifest = {
  name: "AUXO Data Labs",
  short_name: "AUXO",
  id: withBase("/"),
  description:
    "AUXO Data Labs is a compliance-native analytics & AI lab in Dubai for real-estate and portfolio teams — turning stalled dashboards and AI pilots into reporting, forecasting, and automation that reaches production.",
  start_url: withBase("/"),
  display: "standalone",
  background_color: "#0b0c0e",
  theme_color: "#0b0c0e",
  orientation: "portrait-primary",
  icons: [
    { src: withBase("/favicon.svg"), sizes: "any", type: "image/svg+xml", purpose: "any" },
    { src: withBase("/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
    { src: withBase("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
    { src: withBase("/maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    { src: withBase("/apple-touch-icon.png"), sizes: "180x180", type: "image/png", purpose: "any" },
  ],
  shortcuts: [
    {
      name: "Services",
      short_name: "Services",
      description: "Reporting, forecasting, automation, and applied AI",
      url: withBase("/services"),
      icons: [{ src: withBase("/favicon.svg"), sizes: "any", type: "image/svg+xml" }],
    },
    {
      name: "Contact",
      short_name: "Contact",
      description: "Book a working call with AUXO",
      url: withBase("/contact"),
      icons: [{ src: withBase("/favicon.svg"), sizes: "any", type: "image/svg+xml" }],
    },
  ],
  categories: ["business", "productivity"],
  lang: "en",
  dir: "ltr",
  scope: withBase("/"),
  display_override: ["standalone", "browser"],
};

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(manifest), {
    headers: { "content-type": "application/manifest+json; charset=utf-8" },
  });
