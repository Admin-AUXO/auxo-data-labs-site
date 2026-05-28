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
    yearsExperience: string;
    technologiesMastered: string;
    industriesServed: string;
    foundingClients: string;
    responseTime: string;
  };
  /** Google Calendar booking link used by the booking dialog + calendar CTAs. */
  bookingUrl: string;
}

export const siteData: SiteData = {
  name: "AUXO Data Labs",
  author: "AUXO Data Labs",
  tagline: "Look Beyond Data",
  description:
    "AUXO is a Dubai-based decision intelligence partner serving sophisticated clients across the GCC, Europe, and global markets. We deliver enterprise-grade expertise with the efficiency and direct access of a modern, agile firm.",
  url: "https://auxodata.com",
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
    yearsExperience: "15+",
    technologiesMastered: "15+",
    industriesServed: "8+",
    foundingClients: "10",
    responseTime: "<24hrs",
  },
  bookingUrl: "https://calendar.app.google/aJmnvMS2uBbYPCgC7",
};
