export interface SiteData {
  name: string;
  author: string;
  tagline: string;
  description: string;
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
  stats: {
    practitionerExperience: { value: string; label: string };
    production: { value: string; label: string };
    primaryFocus: { value: string; label: string };
    responseTime: { value: string; label: string };
  };
  bookingUrl: string;
}

export const siteData: SiteData = {
  name: "AUXO Data Labs",
  author: "AUXO Data Labs",
  tagline: "Analytics and AI for decisions that hold.",
  description:
    "AUXO is an analytics and AI studio for Gulf real estate. We turn the data you already have into reporting, forecasts, and automation you can trust — built to last, and yours to keep.",
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
  stats: {
    practitionerExperience: {
      value: "Real estate only",
      label: "We build for property and nothing else, so we start inside your business.",
    },
    production: {
      value: "Live systems",
      label: "Working systems in daily use — not slideware.",
    },
    primaryFocus: {
      value: "Yours to keep",
      label: "Every project ends with a system your team owns. No lock-in.",
    },
    responseTime: {
      value: "Reply within 1 business day",
      label: "A real person reads your note and replies.",
    },
  },
  bookingUrl: "https://calendar.app.google/aJmnvMS2uBbYPCgC7",
};
