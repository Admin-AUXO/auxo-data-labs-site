export interface SiteData {
  name: string;
  author: string;
  tagline: string;
  description: string;
  shortVersion: string;
  locationLine: string;
  reassurance: string;
  aiLine: string;
  ownershipLine: string;
  url: string;
  email: string;
  privacyEmail: string;
  address: {
    street: string;
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  social: { linkedin: string; twitter: string };
  founded: number;
  bookingUrl: string;
  applyUrl: string;
  bookingEmbedUrl: string;
}

export const siteData: SiteData = {
  name: "AUXO Data Labs",
  author: "AUXO Data Labs",
  tagline: "Your data, ready for AI.",
  description:
    "AUXO gets your data ready for AI, then sets up the tools and agents that run on it. Built to last, and yours to keep.",
  shortVersion: "End-to-end data and AI, yours to keep.",
  locationLine: "Based in Dubai. Serving the UAE, the US and Europe.",
  reassurance: "A real person replies within one business day.",
  aiLine: "AI where it earns its place. A person approves what goes out.",
  ownershipLine: "Built to last, and yours to keep.",
  url: import.meta.env.SITE ?? "https://auxodata.com",
  email: "hello@auxodata.com",
  privacyEmail: "privacy@auxodata.com",
  address: {
    street: "Dubai Internet City",
    city: "Dubai",
    country: "United Arab Emirates",
    coordinates: { lat: 25.0957, lng: 55.1694 },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/auxo-data/",
    twitter: "https://x.com/AuxoData",
  },
  founded: 2025,
  bookingUrl: "https://calendar.app.google/aJmnvMS2uBbYPCgC7",
  applyUrl: "/apply/",
  bookingEmbedUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1cf9JS2XEAvFnPma4oW-Gy3pMVQnHWZNKWuG0X9hhJ1sKDKj5JLtZsowG9uJyPw3h9kZ1qeNH5?gv=true",
};
