export interface ProcessStep {
  number: number;
  icon: string;
  title: string;
  description: string;
  descriptionHighlight?: string | string[];
  output?: string;
}

export interface CapabilityItem {
  icon: string;
  title: string;
  description: string;
}

export interface CapabilityPillar {
  name: string;
  summary: string;
  outcome: string;
  capabilities: CapabilityItem[];
}

export interface ServiceIntroItem {
  number: string;
  icon: string;
  title: string;
  shortDescription: string;
  link: string;
}

export interface TechStackItem {
  name: string;
  icon: string;
}

export interface HomepageContent {
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    subtitleHighlight?: string[];
    primaryCta: { text: string; href: string };
    scrollIndicator: string;
    proofPoints: string[];
  };
  valueProposition: { line1: string; line2: string };
  decisionFit: {
    title: string;
    subheading: string;
    items: { title: string; pressure: string; signal: string; outcome: string }[];
  };
  capabilities: { title: string; subheading: string; pillars: CapabilityPillar[] };
  featuredServices: {
    title: string;
    subheading: string;
    items: ServiceIntroItem[];
    navigationButton: { text: string; href: string };
  };
  methodology: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: ProcessStep[];
    navigationButton: { text: string; href: string };
  };
  techStack: { title: string; subtitle: string; items: TechStackItem[] };
  finalCta: {
    title: string;
    subtitle: string;
    body: string;
    bodyHighlight?: string[];
    ctaText: string;
    ctaHref: string;
    reassuranceLine: string;
  };
}

export const homepageContent: HomepageContent = {
  hero: {
    title: "Intelligence,",
    titleHighlight: "Engineered.",
    subtitle:
      "AUXO helps operators and leadership teams fix reporting drag, planning blind spots, and repetitive analytics work before those issues harden into operating debt.",
    subtitleHighlight: ["reporting drag", "planning blind spots", "repetitive analytics work"],
    primaryCta: { href: "/contact/", text: "Book a discovery call" },
    scrollIndicator: "See where AUXO fits",
    proofPoints: [
      "Dubai-based, senior-led delivery",
      "Reporting, planning, automation, applied AI",
      "Built for teams that need clarity before scale",
    ],
  },
  valueProposition: {
    line1: "Most organizations already have dashboards. They still wait too long for numbers they trust.",
    line2:
      "AUXO fixes the data, reporting, and decision workflows underneath so analytics changes operating behavior.",
  },
  decisionFit: {
    title: "Why teams bring AUXO in",
    subheading:
      "The trigger is usually not a lack of dashboards. It is one of three operating failures that keeps surfacing in leadership reviews.",
    items: [
      {
        title: "Reporting trust is weak",
        pressure:
          "Numbers are duplicated, manually rebuilt, or argued over every time performance gets reviewed.",
        signal: "Meetings keep turning into debates about definitions instead of decisions.",
        outcome:
          "AUXO rebuilds the foundation, reporting layer, and KPI logic so the review cadence stops stalling.",
      },
      {
        title: "Planning stays reactive",
        pressure:
          "Teams can explain last month clearly enough, but they still cannot model next month with confidence.",
        signal: "Forecasting lives in side spreadsheets, static assumptions, or one analyst's head.",
        outcome:
          "AUXO builds forecasting systems and decision playbooks leaders can actually plan from.",
      },
      {
        title: "Analytics work is trapped in manual loops",
        pressure:
          "Skilled analysts spend too much time assembling, checking, and distributing work instead of interpreting it.",
        signal: "Repetitive workflows soak up senior time while AI and automation ideas stay vague.",
        outcome: "AUXO automates the drudge work first, then applies AI where it earns the right to stay.",
      },
    ],
  },
  capabilities: {
    title: "Six core capabilities",
    subheading:
      "Three operating lanes. Six specialist capabilities. One decision intelligence partner built to clarify, build, and scale.",
    pillars: [
      {
        name: "Clarify",
        summary:
          "Diagnose where the drag starts and sharpen decision criteria before more build work starts eating budget.",
        outcome: "Best when leadership needs direction before a bigger analytics spend.",
        capabilities: [
          {
            icon: "mdi:compass-outline",
            title: "Operating diagnostics",
            description: "Pinpoint the reporting, ownership, and process failures causing the mess.",
          },
          {
            icon: "mdi:scale-balance",
            title: "Decision design",
            description: "Turn recurring high-stakes calls into clearer thresholds, rules, and review logic.",
          },
        ],
      },
      {
        name: "Build",
        summary:
          "Rework the data and reporting layers the business depends on every week, not just the presentation layer on top.",
        outcome: "Best when trust, speed, or self-serve is already breaking under real usage.",
        capabilities: [
          {
            icon: "mdi:file-tree",
            title: "Data foundations",
            description:
              "Stabilize architecture, ownership, and source-of-truth logic before scale multiplies the damage.",
          },
          {
            icon: "mdi:view-dashboard-outline",
            title: "Reporting systems",
            description: "Replace fragmented dashboards and packs with cleaner, governed decision views.",
          },
        ],
      },
      {
        name: "Scale",
        summary:
          "Increase analytical throughput without hiring more manual reporting habits or bolting hype onto a weak operating model.",
        outcome: "Best when the team needs leverage, not more heroics.",
        capabilities: [
          {
            icon: "mdi:robot-outline",
            title: "Workflow automation",
            description:
              "Eliminate repetitive analytics routines and add controls so automation does not create new fragility.",
          },
          {
            icon: "mdi:lightbulb-on-outline",
            title: "Applied AI",
            description: "Use AI for bounded analytical workflows where quality, review, and business fit are explicit.",
          },
        ],
      },
    ],
  },
  featuredServices: {
    title: "Start where the friction is",
    subheading:
      "These are the three entry points buyers use most when the analytics problem is real but the next move is not obvious yet.",
    items: [
      {
        number: "01",
        icon: "mdi:database-check-outline",
        title: "Foundation Readiness",
        shortDescription:
          "Get the architecture, ownership, and KPI layer straight before the next build starts.",
        link: "/services/foundation-readiness/",
      },
      {
        number: "02",
        icon: "mdi:chart-box-outline",
        title: "Reporting Reset",
        shortDescription:
          "Replace fragmented reporting with a governed system people can actually use.",
        link: "/services/reporting-reset/",
      },
      {
        number: "03",
        icon: "mdi:speedometer-medium",
        title: "Performance Diagnostics",
        shortDescription:
          "Find the warehouse, model, and dashboard bottlenecks slowing real decisions down.",
        link: "/services/performance-diagnostics/",
      },
    ],
    navigationButton: { href: "/services/", text: "View all services" },
  },
  methodology: {
    title: "How",
    titleHighlight: "AUXO works",
    subtitle: "AUXO runs a tight four-step operating model.",
    navigationButton: { href: "/about/", text: "See how AUXO works" },
    steps: [
      {
        number: 1,
        icon: "mdi:database-search",
        title: "Explore",
        description:
          "Clarify the operating problem, the decisions that matter, and the real friction underneath the request.",
        descriptionHighlight: ["operating problem", "real friction"],
        output: "Discovery frame",
      },
      {
        number: 2,
        icon: "mdi:file-tree",
        title: "Design",
        description:
          "Structure the data, reporting logic, and workflow so the system supports the business rhythm properly.",
        descriptionHighlight: ["data, reporting logic, and workflow"],
        output: "System design",
      },
      {
        number: 3,
        icon: "mdi:rocket-launch",
        title: "Generate",
        description:
          "Build the reporting, forecasting, automation, or AI layer that solves the defined operating problem.",
        descriptionHighlight: ["reporting, forecasting, automation, or AI layer"],
        output: "Working system",
      },
      {
        number: 4,
        icon: "mdi:account-group-outline",
        title: "Embed",
        description:
          "Embed the controls, handoff, and operating habits needed so the work survives real use.",
        descriptionHighlight: ["controls, handoff, and operating habits"],
        output: "Adoption & ownership",
      },
    ],
  },
  techStack: {
    title: "Platforms we work inside",
    subtitle:
      "Modern tools matter. They just come after the operating problem is defined properly.",
    items: [
      { icon: "simple-icons:python", name: "Python" },
      { icon: "simple-icons:amazonaws", name: "AWS" },
      { icon: "simple-icons:microsoftazure", name: "Azure" },
      { icon: "simple-icons:googlecloud", name: "GCP" },
      { icon: "simple-icons:snowflake", name: "Snowflake" },
      { icon: "simple-icons:databricks", name: "Databricks" },
      { icon: "simple-icons:tableau", name: "Tableau" },
      { icon: "simple-icons:powerbi", name: "Power BI" },
      { icon: "simple-icons:dbt", name: "dbt" },
      { icon: "simple-icons:apacheairflow", name: "Airflow" },
      { icon: "simple-icons:apachespark", name: "Spark" },
      { icon: "simple-icons:apachekafka", name: "Kafka" },
      { icon: "simple-icons:tensorflow", name: "TensorFlow" },
      { icon: "simple-icons:pytorch", name: "PyTorch" },
      { icon: "simple-icons:postgresql", name: "PostgreSQL" },
      { icon: "simple-icons:mongodb", name: "MongoDB" },
      { icon: "simple-icons:docker", name: "Docker" },
      { icon: "simple-icons:kubernetes", name: "Kubernetes" },
    ],
  },
  finalCta: {
    title: "Find the right starting point",
    subtitle: "Book a 30-minute working call.",
    body: "Bring the reporting mess, the planning bottleneck, or the automation backlog. You will leave with a clearer read on where the operating drag starts and what should happen first.",
    bodyHighlight: ["where the operating drag starts", "what should happen first"],
    ctaText: "Book a discovery call",
    ctaHref: "/contact/",
    reassuranceLine:
      "No performative discovery workshop. Just a direct conversation and a cleaner starting point.",
  },
};
