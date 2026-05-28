export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  icon: string;
  links: FooterLink[];
}

export interface FooterContent {
  sections: FooterSection[];
}

export const footerContent: FooterContent = {
  sections: [
    {
      title: "Learn",
      icon: "mdi:book-open",
      links: [
        { label: "About Us", href: "/about/" },
        { label: "Services", href: "/services/" },
        { label: "Insights", href: "/blog/" },
      ],
    },
    {
      title: "Engage",
      icon: "mdi:handshake",
      links: [{ label: "Contact Us", href: "/contact/" }],
    },
    {
      title: "Legal",
      icon: "mdi:shield-check",
      links: [
        { label: "Privacy Policy", href: "/legal/privacy-policy/" },
        { label: "Terms of Use", href: "/legal/terms/" },
        { label: "Cookie Policy", href: "/legal/cookie-policy/" },
      ],
    },
  ],
};
