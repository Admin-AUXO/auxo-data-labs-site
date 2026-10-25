import { siteData } from "./site";

export interface NavItem {
  name: string;
  href: string;
}

export interface NavigationContent {
  items: NavItem[];
  secondaryLink: {
    label: string;
    href: string;
  };
  cta: {
    label: string;
    href: string;
  };
}

export const navigationContent: NavigationContent = {
  items: [
    { name: "How it works", href: "/how-it-works/" },
    { name: "Pricing", href: "/pricing/" },
    { name: "Marketplace", href: "/marketplace/" },
    { name: "Blog", href: "/blog/" },
    { name: "AUXO Score", href: "/auxo-score/" },
  ],
  secondaryLink: {
    label: "Contact",
    href: "/contact/",
  },
  cta: {
    label: "Book a meeting",
    href: siteData.bookingUrl,
  },
};
