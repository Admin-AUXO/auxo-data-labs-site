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
  sections: FooterSection[];
  note: string;
}

export const footerContent: FooterContent = {
  statement: "Your data, ready for AI.",
  statementHighlight: "ready for AI",
  sections: [
    {
      title: "Explore",
      links: [
        { label: "How it works", href: "/how-it-works/" },
        { label: "Pricing", href: "/pricing/" },
        { label: "Marketplace", href: "/marketplace/" },
        { label: "AUXO Score", href: "/auxo-score/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about/" },
        { label: "Blog", href: "/blog/" },
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
  note: "Built to last, and yours to keep. Based in Dubai. Serving the UAE, the US and Europe.",
};
