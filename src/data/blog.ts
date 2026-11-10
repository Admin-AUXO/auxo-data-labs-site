import { siteData } from "./site";

interface LinkItem {
  label: string;
  href: string;
}

export interface BlogContent {
  index: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      eyebrow: string;
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
  };
  post: {
    backLink: LinkItem;
    minutesSuffix: string;
    tagsLabel: string;
    relatedHeading: string;
    endCta: {
      title: string;
      description: string;
      ctaText: string;
      ctaHref: string;
      secondaryText?: string;
      secondaryHref?: string;
      reassurance: string;
    };
  };
}

export const blogContent: BlogContent = {
  index: {
    metaTitle: "Blog: data and AI, written plainly",
    metaDescription:
      "Plain reads from AUXO on data, AI tools and agents, and when not to build. Every figure has a source. Take the AUXO Score to see where you stand.",
    hero: {
      eyebrow: "Blog",
      title: "Data and AI, written plainly.",
      titleHighlight: "written plainly",
      lead: "Founder notes on data, AI tools and agents, and when not to build. Every figure has a source.",
    },
    tagFilterLabel: "Filter posts by topic",
    tagFilterAll: "All topics",
    listLabel: "Blog posts",
    minutesSuffix: "min read",
    cardLink: "Read the post",
    emptyState: {
      title: "No posts yet.",
      body: "The first ones are on their way. Meanwhile, take the AUXO Score.",
      links: [
        { label: "Take the AUXO Score", href: "/auxo-score/" },
      ],
    },
  },
  post: {
    backLink: { label: "Back to the blog", href: "/blog/" },
    minutesSuffix: "min read",
    tagsLabel: "Topics",
    relatedHeading: "Read next",
    endCta: {
      title: "Want an honest read of your own setup?",
      description: "10 questions, about 3 minutes. See your band and the first thing to fix.",
      ctaText: "Take the AUXO Score",
      ctaHref: "/auxo-score/",
      reassurance: "We reply within one business day.",
    },
  },
};
