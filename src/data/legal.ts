export const LEGAL_LAST_UPDATED = "April 3, 2026";

export interface LegalPageMeta {
  /** Short kicker shown above the page title. */
  eyebrow: string;
  /** astro-icon name (mdi:*) associated with the document. */
  icon: string;
  /** One-line plain-language summary of the document. */
  summary: string;
  /** Three scannable takeaways for the document header. */
  highlights: [string, string, string];
}

export const LEGAL_PAGE_META: Record<string, LegalPageMeta> = {
  "legal/privacy-policy": {
    eyebrow: "Privacy & Data Use",
    icon: "mdi:shield-check-outline",
    summary:
      "What we collect from website visitors and inquiry contacts, why we collect it, and the choices you have.",
    highlights: [
      "Contact and scheduling data",
      "Consent-based analytics",
      "Cross-border service providers",
    ],
  },
  "legal/terms": {
    eyebrow: "Website Terms of Use",
    icon: "mdi:file-document",
    summary:
      "The rules governing access to the public AUXO website, its content, and the tools made available through it.",
    highlights: [
      "Public site use only",
      "Anti-scraping restrictions",
      "Separate client agreements prevail",
    ],
  },
  "legal/cookie-policy": {
    eyebrow: "Cookies & Local Storage",
    icon: "mdi:cookie",
    summary:
      "How consent, analytics, theme preferences, and browser-side storage work on auxodata.com.",
    highlights: [
      "Consent-first analytics",
      "Local storage transparency",
      "No active ad cookies today",
    ],
  },
};
