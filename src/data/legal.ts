export const LEGAL_LAST_UPDATED = "June 10, 2026";

export interface LegalPageMeta {
  eyebrow: string;
  icon: string;
  summary: string;
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
      "Use the site to learn about AUXO. Don't scrape or misuse it, and don't treat it as professional advice. Client work runs under its own signed agreement.",
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
      "How consent, analytics, and browser-side storage work on auxodata.com.",
    highlights: [
      "Consent-first analytics",
      "Local storage transparency",
      "No active ad cookies today",
    ],
  },
};
