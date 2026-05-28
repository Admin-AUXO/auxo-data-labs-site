import { siteData } from "../data/site";

/** schema.org JSON-LD builders. The @context/@type wrappers are added by
 *  StructuredData.astro; these return the `data` payloads. */

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

export function serviceSchema() {
  return {
    serviceType: "Decision Intelligence Partner",
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
    offers: { "@type": "Offer", description: "Enterprise-grade decision intelligence partnership" },
  };
}
