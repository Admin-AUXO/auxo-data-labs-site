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
    { name: "The Work", href: "/the-work/" },
    { name: "AUXO Score", href: "/auxo-score/" },
    { name: "Lab", href: "/about/" },
    { name: "Insights", href: "/insights/" },
    { name: "Contact", href: "/contact/" },
  ],
  cta: {
    label: "Book a meeting",
    href: siteData.bookingUrl,
  },
};
