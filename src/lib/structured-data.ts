import { siteData } from "../data/site";
import { absoluteUrl } from "./url";

const home = absoluteUrl("/");
const abs = (p: string) => (p.startsWith("http") ? p : absoluteUrl(p));

const serviceOffers = [
  { name: "Trusted data", description: "One source the whole business agrees on, built from the systems you already run." },
  { name: "Clear reporting", description: "Board- and investor-ready reporting that holds up under questions." },
  { name: "Reliable automation", description: "Software carries the routine work, with a person accountable for the calls that matter." },
  { name: "Confident compliance", description: "Stay ready for regulators without pulling your team off real work." },
];

export function organizationSchema() {
  return {
    name: siteData.name,
    alternateName: "AUXO",
    url: home,
    logo: `${abs("/favicon.svg")}`,
    description: siteData.description,
    email: siteData.email,
    foundingDate: String(siteData.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteData.address.street,
      addressLocality: siteData.address.city,
      addressCountry: siteData.address.country,
    },
    areaServed: [
      { "@type": "Country", name: siteData.address.country },
      { "@type": "Place", name: "Gulf Cooperation Council" },
    ],
    knowsAbout: [
      "Real estate data",
      "Property analytics",
      "Investor and board reporting",
      "Forecasting",
      "Process automation",
      "Regulatory compliance",
    ],
    makesOffer: serviceOffers.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        serviceType: "Real-estate analytics & AI",
        provider: { "@type": "Organization", name: siteData.name, url: home },
      },
    })),
    sameAs: [siteData.social.linkedin, siteData.social.twitter],
  };
}

export function localBusinessSchema() {
  return {
    "@id": `${home}#localbusiness`,
    name: siteData.name,
    image: `${abs("/favicon.svg")}`,
    url: home,
    email: siteData.email,
    description: siteData.description,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteData.address.street,
      addressLocality: siteData.address.city,
      addressCountry: siteData.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteData.address.coordinates.lat,
      longitude: siteData.address.coordinates.lng,
    },
    areaServed: [
      { "@type": "Country", name: siteData.address.country },
      { "@type": "Place", name: "Gulf Cooperation Council" },
    ],
    sameAs: [siteData.social.linkedin, siteData.social.twitter],
  };
}

export function websiteSchema() {
  return {
    name: siteData.name,
    url: home,
    description: siteData.description,
    inLanguage: "en",
  };
}

export function webPageSchema(opts: { title: string; description: string; path: string }) {
  return {
    name: opts.title,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: siteData.name, url: home },
    about: { "@type": "Organization", name: siteData.name, url: home },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
  tags?: string[];
}) {
  return {
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: "en",
    datePublished: opts.datePublished,
    ...(opts.image ? { image: abs(opts.image) } : {}),
    ...(opts.tags && opts.tags.length ? { keywords: opts.tags.join(", ") } : {}),
    author: { "@type": "Organization", name: siteData.name, url: home },
    publisher: {
      "@type": "Organization",
      name: siteData.name,
      url: home,
      logo: { "@type": "ImageObject", url: `${abs("/favicon.svg")}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(opts.path) },
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: home },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: abs(c.path),
      })),
    ],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function serviceSchema() {
  return {
    serviceType: "Real-estate analytics & AI lab",
    provider: { "@type": "Organization", name: siteData.name, url: home },
    areaServed: [
      { "@type": "Country", name: siteData.address.country },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: siteData.address.coordinates.lat,
          longitude: siteData.address.coordinates.lng,
        },
        geoRadius: { "@type": "Distance", name: "Global" },
      },
    ],
    description: siteData.description,
    offers: { "@type": "Offer", description: "Property data, reporting, forecasting, and AI — built live and yours to keep" },
  };
}
