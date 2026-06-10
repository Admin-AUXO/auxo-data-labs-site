export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  statement: string;
  statementHighlight?: string | string[];
  tagline: string;
  sections: FooterSection[];
  note: string;
}

export const footerContent: FooterContent = {
  statement: "The data you hold, turned into decisions.",
  statementHighlight: "decisions",
  tagline: "Analytics and AI for Gulf real estate.",
  sections: [
    {
      title: "Explore",
      links: [
        { label: "Services", href: "/services/" },
        { label: "Studio", href: "/about/" },
        { label: "Insights", href: "/insights/" },
        { label: "Contact", href: "/contact/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/legal/privacy-policy/" },
        { label: "Terms", href: "/legal/terms/" },
        { label: "Cookies", href: "/legal/cookie-policy/" },
      ],
    },
  ],
  note: "Made to last, and yours to keep. Built in Dubai.",
};
