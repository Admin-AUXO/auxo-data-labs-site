import { siteData } from "./site";

export interface NavItem {
  name: string;
  href: string;
}

export interface NavigationContent {
  items: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export const navigationContent: NavigationContent = {
  items: [
    { name: "Services", href: "/services/" },
    { name: "Lab", href: "/about/" },
    { name: "Insights", href: "/insights/" },
    { name: "Self-check", href: "/self-check/" },
    { name: "Contact", href: "/contact/" },
  ],
  cta: {
    label: "Book a meeting",
    href: siteData.bookingUrl,
  },
};
