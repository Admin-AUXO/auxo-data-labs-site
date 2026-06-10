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
    { name: "Studio", href: "/about/" },
    { name: "Insights", href: "/insights/" },
    { name: "Contact", href: "/contact/" },
  ],
  cta: {
    label: "Start a conversation",
    href: "/contact/",
  },
};
