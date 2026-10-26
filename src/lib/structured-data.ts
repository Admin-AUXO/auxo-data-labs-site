import { siteData } from "../data/site";
import { absoluteUrl } from "./url";
import type { Founder } from "../data/about";
import type { BlogPostSummary } from "./blog";

const home = absoluteUrl("/");
const abs = (p: string) => (p.startsWith("http") ? p : absoluteUrl(p));

const serviceOffers = [
  {
    name: "Analyze",
    description:
      "An honest read of your business and your data, before you spend on AI. Includes the AUXO Score and a startup audit (seed to Series B) at no charge, and a paid deep-dive audit.",
  },
  {
    name: "Advise",
    description:
      "The right AI and data setup for your team, and a plan to get there: roadmap, tool selection and governance.",
  },
  {
    name: "Build",
    description:
      "Your data infrastructure and AI agent teams, set up end to end and handed over. Built to last, and yours to keep.",
  },
  { name: "Managed upkeep", description: "Optional monthly upkeep and tuning after Build. No minimum term." },
];

const areaServed = [
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "United States" },
  { "@type": "Place", name: "Europe" },
];

export function organizationSchema() {
  return {
    name: siteData.name,
    alternateName: "AUXO",
    url: home,
    logo: `${abs("/favicon.svg")}`,
    description: siteData.description,
    slogan: siteData.tagline,
    email: siteData.email,
    foundingDate: String(siteData.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteData.address.street,
      addressLocality: siteData.address.city,
      addressCountry: siteData.address.country,
    },
    areaServed,
    knowsAbout: [
      "Data infrastructure",
      "Data quality and AI readiness",
      "Data audits",
      "AI tool selection",
      "Data and AI governance",
      "AI agents with human approval",
      "Data pipelines",
      "Reporting and business intelligence",
      "Finance operations data",
      "Workflow automation",
    ],
    makesOffer: serviceOffers.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        serviceType: "Data and AI services",
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
    areaServed,
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

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function personSchema(p: Founder) {
  return {
    name: p.name,
    jobTitle: p.role,
    description: p.lines.join(" "),
    url: abs("/about/#team"),
    worksFor: { "@type": "Organization", name: siteData.name, url: home },
    sameAs: [p.linkedin],
  };
}

export function blogPostingSchema(summary: BlogPostSummary) {
  const { post } = summary;
  const url = absoluteUrl(summary.href);
  return {
    headline: post.data.title,
    description: post.data.description,
    datePublished: summary.isoDate,
    dateModified: summary.isoDate,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(`/og/blog-${summary.slug}.png`),
    inLanguage: "en",
    timeRequired: `PT${summary.minutes}M`,
    keywords: post.data.tags.length ? post.data.tags.join(", ") : undefined,
    author: { "@type": "Organization", name: siteData.name, url: home },
    publisher: {
      "@type": "Organization",
      name: siteData.name,
      url: home,
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
    },
  };
}
