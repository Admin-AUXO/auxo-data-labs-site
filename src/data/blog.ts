import { siteData } from "./site";

interface LinkItem {
  label: string;
  href: string;
}

export interface BlogAuthor {
  kind: "Person" | "Organization";
  jobTitle?: string;
  line?: string;
  linkText?: string;
  linkHref?: string;
}

export interface BlogContent {
  index: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      title: string;
      titleHighlight: string | string[];
      lead: string;
    };
    tagFilterLabel: string;
    tagFilterAll: string;
    listLabel: string;
    minutesSuffix: string;
    cardLink: string;
    emptyState: {
      title: string;
      body: string;
      links: LinkItem[];
    };
    shortReadsLink: LinkItem;
  };
  post: {
    backLink: LinkItem;
    byPrefix: string;
    minutesSuffix: string;
    tagsLabel: string;
    relatedHeading: string;
    endCta: {
      title: string;
      description: string;
      ctaText: string;
      ctaHref: string;
      secondaryText: string;
      secondaryHref: string;
      reassurance: string;
    };
  };
  authors: Record<string, BlogAuthor>;
}

export const blogContent: BlogContent = {
  index: {
    metaTitle: "Blog: data and AI, written plainly",
    metaDescription:
      "Long reads from AUXO on data, AI tools and agents, and when not to build. Written plainly, with sources.",
    hero: {
      title: "Data and AI, written plainly.",
      titleHighlight: "written plainly",
      lead: "Long reads on data, AI tools and agents, and when not to build. Every figure has a source.",
    },
    tagFilterLabel: "Filter posts by topic",
    tagFilterAll: "All topics",
    listLabel: "Blog posts",
    minutesSuffix: "min read",
    cardLink: "Read the post",
    emptyState: {
      title: "No posts yet.",
      body: "The first ones are on their way. Meanwhile, take the AUXO Score or read our short insights.",
      links: [
        { label: "Get your AUXO Score", href: "/auxo-score/" },
        { label: "Read the insights", href: "/insights/" },
      ],
    },
    shortReadsLink: { label: "Prefer one-minute reads? See the insights.", href: "/insights/" },
  },
  post: {
    backLink: { label: "Back to the blog", href: "/blog/" },
    byPrefix: "By",
    minutesSuffix: "min read",
    tagsLabel: "Topics",
    relatedHeading: "Read next",
    endCta: {
      title: "Want an honest read of your own setup?",
      description: "Take the AUXO Score, or book a meeting with a founder.",
      ctaText: "Book a meeting",
      ctaHref: siteData.bookingUrl,
      secondaryText: "Get your AUXO Score",
      secondaryHref: "/auxo-score/",
      reassurance: "A real person replies within one business day.",
    },
  },
  authors: {
    "Ajay Kumar": {
      kind: "Person",
      jobTitle: "Co-Founder & CTO",
      line: "Ajay Kumar is Co-Founder & CTO of AUXO Data Labs.",
      linkText: "Ajay Kumar",
      linkHref: "https://www.linkedin.com/in/ajaykumar9795",
    },
    "AUXO Data Labs": {
      kind: "Organization",
      line: "Written by the AUXO Data Labs founders.",
    },
  },
};
