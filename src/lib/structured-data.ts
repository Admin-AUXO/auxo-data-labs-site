import { siteData } from "../data/site";

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
    url: siteData.url,
    logo: `${siteData.url}/favicon.svg`,
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
        serviceType: "Real-estate data & AI",
        provider: { "@type": "Organization", name: siteData.name, url: siteData.url },
      },
    })),
    sameAs: [siteData.social.linkedin, siteData.social.twitter],
  };
}

export function localBusinessSchema() {
  return {
    "@id": `${siteData.url}#localbusiness`,
    name: siteData.name,
    image: `${siteData.url}/favicon.svg`,
    url: siteData.url,
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
    url: siteData.url,
    description: siteData.description,
    inLanguage: "en",
  };
}

export function webPageSchema(opts: { title: string; description: string; path: string }) {
  return {
    name: opts.title,
    description: opts.description,
    url: `${siteData.url}${opts.path}`,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: siteData.name, url: siteData.url },
    about: { "@type": "Organization", name: siteData.name, url: siteData.url },
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
  const absolute = (p: string) => (p.startsWith("http") ? p : `${siteData.url}${p}`);
  return {
    headline: opts.title,
    description: opts.description,
    url: `${siteData.url}${opts.path}`,
    inLanguage: "en",
    datePublished: opts.datePublished,
    ...(opts.image ? { image: absolute(opts.image) } : {}),
    ...(opts.tags && opts.tags.length ? { keywords: opts.tags.join(", ") } : {}),
    author: { "@type": "Organization", name: siteData.name, url: siteData.url },
    publisher: {
      "@type": "Organization",
      name: siteData.name,
      url: siteData.url,
      logo: { "@type": "ImageObject", url: `${siteData.url}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteData.url}${opts.path}` },
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteData.url },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${siteData.url}${c.path}`,
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
    serviceType: "Real-estate data & AI studio",
    provider: { "@type": "Organization", name: siteData.name, url: siteData.url },
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
