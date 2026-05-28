export interface DropdownItem {
  name: string;
  href: string;
  icon: string;
  description?: string;
  group?: string;
  fit?: string;
}

export interface NavItem {
  name: string;
  href: string;
  /** When true the top-level item opens a mega-dropdown (and links to its index). */
  hasDropdown?: boolean;
  dropdown?: DropdownItem[];
}

export interface NavigationContent {
  items: NavItem[];
}

export const navigationContent: NavigationContent = {
  items: [
    {
      name: "Services",
      href: "/services/",
      hasDropdown: true,
      dropdown: [
        {
          name: "Foundation Readiness",
          href: "/services/foundation-readiness/",
          icon: "mdi:database-check-outline",
          group: "Stabilize",
          description:
            "Audit data foundations before reporting, automation, or AI scale the wrong architecture.",
          fit: "Best when source-of-truth, ownership, and architecture are still unstable.",
        },
        {
          name: "Reporting Reset",
          href: "/services/reporting-reset/",
          icon: "mdi:chart-box-outline",
          group: "Stabilize",
          description:
            "Replace fragmented reporting with clearer KPIs, role-based dashboards, and cleaner self-serve.",
          fit: "Best when reporting is duplicated, distrusted, or too manual.",
        },
        {
          name: "Autonomy Readiness Review",
          href: "/services/autonomy-readiness-review/",
          icon: "mdi:shield-search",
          group: "Stabilize",
          description:
            "Expand self-serve analytics with the governance, support, and controls needed to keep trust intact.",
          fit: "Best when broader analytics access is the goal, but governance is not ready yet.",
        },
        {
          name: "Performance Diagnostics",
          href: "/services/performance-diagnostics/",
          icon: "mdi:speedometer-medium",
          group: "Optimize",
          description:
            "Diagnose slow dashboards, warehouse drag, and brittle transformations before users disengage.",
          fit: "Best when the analytics stack feels slow, costly, or fragile.",
        },
        {
          name: "Forecasting Lab",
          href: "/services/forecasting-lab/",
          icon: "mdi:chart-line",
          group: "Optimize",
          description:
            "Build forecasting workflows that support real planning cycles and scenario decisions.",
          fit: "Best when teams need forward visibility, not just historical reporting.",
        },
        {
          name: "Decision Playbooks",
          href: "/services/decision-playbooks/",
          icon: "mdi:clipboard-text-outline",
          group: "Optimize",
          description:
            "Turn recurring high-stakes choices into playbooks with explicit criteria and thresholds.",
          fit: "Best when important decisions are inconsistent across teams or leaders.",
        },
        {
          name: "Smart Automation",
          href: "/services/smart-automation/",
          icon: "mdi:cog-sync",
          group: "Scale",
          description:
            "Automate repetitive analytics workflows with monitoring, exception handling, and ownership.",
          fit: "Best when analysts are buried in repetitive preparation, checks, and delivery work.",
        },
        {
          name: "Augmented Intelligence Studio",
          href: "/services/augmented-intelligence-studio/",
          icon: "mdi:brain",
          group: "Scale",
          description:
            "Apply AI where it improves analytical throughput and decision quality without the theater.",
          fit: "Best when you need an AI use-case filter before building expensive nonsense.",
        },
      ],
    },
    { name: "About", href: "/about/" },
    { name: "Insights", href: "/blog/" },
  ],
};
