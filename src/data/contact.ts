import { siteData } from "./site";
import { marketplaceCards, marketplaceContent } from "./marketplace";

export interface ContactField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  options?: string[];
  maxLength?: number;
  minLength?: number;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export type ContactTopicSlug =
  | "not-sure"
  | "free-audit"
  | "deep-dive-audit"
  | "marketplace-tool"
  | "custom-stack"
  | "enterprise"
  | "something-else";

export interface ContactTopic {
  slug: ContactTopicSlug;
  label: string;
  hint?: string;
  hintLink?: { text: string; href: string };
}

export interface ContactTool {
  slug: string;
  name: string;
  disclosures: string[];
}

export interface ContactFunction {
  slug: string;
  label: string;
}

export interface ContactContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string | string[];
    lead: string;
  };
  details: {
    title: string;
    items: ContactDetail[];
    cta: { text: string };
  };
  form: {
    title: string;
    description: string;
    fields: ContactField[];
    topics: ContactTopic[];
    tools: {
      label: string;
      removeLabel: string;
      catalogue: ContactTool[];
      functions: ContactFunction[];
    };
    prefill: {
      tools: string;
      customStack: string;
      customStackNoFunction: string;
    };
    consentNote: string;
    consentLink: { text: string; href: string };
    submitText: string;
    status: {
      sending: string;
      success: string;
      error: string;
      consentRequired: string;
      notConfigured: string;
    };
  };
  nextSteps: {
    eyebrow: string;
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    steps: { title: string; desc: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    titleHighlight?: string | string[];
    description: string;
    items: { question: string; answer: string }[];
  };
}

const topics: ContactTopic[] = [
  { slug: "not-sure", label: "Not sure where to start" },
  {
    slug: "free-audit",
    label: "Startup audit",
    hint: "Starts with the AUXO Score, then a founder call. For startups, seed to Series B. One per company.",
    hintLink: { text: "Get your startup audit", href: "/auxo-score/?offer=free-audit" },
  },
  {
    slug: "deep-dive-audit",
    label: "Deep-dive audit",
    hint: "A fixed price, agreed in writing. NDA first if you want one.",
  },
  {
    slug: "marketplace-tool",
    label: "Marketplace tool",
    hint: "Tell us about your team and what you want the tool to do.",
  },
  {
    slug: "custom-stack",
    label: "Custom stack",
    hint: "Tell us which team it's for and the work you want off their plate.",
  },
  {
    slug: "enterprise",
    label: "One unit first",
    hint: "Tell us about your buying, security or contract steps. We can start with one team.",
  },
  { slug: "something-else", label: "Something else" },
];

export const contactContent: ContactContent = {
  meta: {
    title: "Contact: talk to the founders",
    description:
      "Tell us what you want AI and your data to do. A real person replies within one business day.",
  },
  hero: {
    eyebrow: "Contact",
    title: "Talk to a founder.",
    titleHighlight: "founder",
    lead: "A few lines is enough.",
  },
  details: {
    title: "Reach us",
    items: [
      {
        icon: "mdi:email-outline",
        label: "Email",
        value: siteData.email,
        href: `mailto:${siteData.email}`,
      },
      {
        icon: "mdi:map-marker-outline",
        label: "Location",
        value: `${siteData.address.city}, ${siteData.address.country}`,
      },
      {
        icon: "mdi:linkedin",
        label: "LinkedIn",
        value: "AUXO Data Labs",
        href: siteData.social.linkedin,
        external: true,
      },
    ],
    cta: { text: "Book a meeting" },
  },
  form: {
    title: "Send a message",
    description: "Tell us the problem and the tools involved.",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Your name",
        required: true,
        minLength: 2,
        maxLength: 100,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
        maxLength: 255,
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Your company",
        optional: true,
        maxLength: 100,
      },
      {
        name: "fit",
        label: "Which fits you best?",
        type: "select",
        placeholder: "Select one…",
        optional: true,
        options: ["Startup, seed to Series B", "Growing company, 50–500 people", "Large organisation", "None of these"],
      },
      {
        name: "topic",
        label: "What's it about?",
        type: "select",
        placeholder: "Select a topic…",
        options: topics.map((t) => t.label),
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "What do you want to fix or set up? Which tools are involved? Any deadline?",
        required: true,
        minLength: 20,
        maxLength: 500,
      },
    ],
    topics,
    tools: {
      label: "Tools in this request",
      removeLabel: "Remove {name}",
      catalogue: marketplaceCards.map((c) => ({ slug: c.slug, name: c.name, disclosures: c.disclosures })),
      functions: marketplaceContent.filters.categories
        .filter((c) => c.slug !== "all")
        .map((c) => ({ slug: c.slug, label: c.label })),
    },
    prefill: {
      tools: "We'd like to add {names} to our stack. Our team: ",
      customStack: "We'd like a custom stack for our {function} team. ",
      customStackNoFunction: "We'd like a custom stack for our team. ",
    },
    consentNote:
      "I consent to AUXO holding these details to respond to my enquiry, in line with the Privacy Policy. We use them only to reply, never for marketing without separate opt-in, and we don't sell or rent your details. Any service we use to handle your message is bound to do the same.",
    consentLink: { text: "Privacy Policy", href: "/legal/privacy-policy/" },
    submitText: "Send message",
    status: {
      sending: "Sending your message…",
      success: "Thank you. Your message is on its way, and we'll reply within one business day.",
      error: `That didn't go through. Please try again, or email us at ${siteData.email}. We'll reply within one business day.`,
      consentRequired: "Please tick the consent box so we can hold your details to reply.",
      notConfigured: `The form is not connected yet. Please email us at ${siteData.email}.`,
    },
  },
  nextSteps: {
    eyebrow: "Next steps",
    title: "What happens next",
    titleHighlight: "next",
    subtitle: "Three steps to a clear first move.",
    steps: [
      {
        title: "You send a note",
        desc: "Use the form or email us. Say what you want to fix and by when.",
      },
      {
        title: "We reply within one business day",
        desc: "Not a sales inbox.",
      },
      {
        title: "A short call",
        desc: "We get the problem clear and agree a first step. If we're not the right fit, we say so.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Before you reach out",
    titleHighlight: "reach out",
    description: "The questions founders and team leads ask us first.",
    items: [
      {
        question: "What does working together cost?",
        answer:
          "Each phase has a fixed price, agreed in writing before we start. There's no charge for the AUXO Score or the startup audit (seed to Series B).",
      },
      {
        question: "Is this confidential? Can we sign an NDA first?",
        answer:
          "Yes. Your details stay with us, and we're glad to sign an NDA first. We can send ours or use yours.",
      },
      {
        question: "What happens to our data, and is it safe with AI?",
        answer:
          "We take only what the work needs, with names removed where we can. It's never reused or used to train AI. We return or delete it when the work ends.",
      },
      {
        question: "What if our data is messy, scattered or incomplete?",
        answer:
          "That's normal, not a blocker. Most early work is making sense of what you already have. You don't need to tidy anything before we talk.",
      },
      {
        question: "Can you make us compliant?",
        answer:
          "No one should promise that. We build systems that help: clear records and rules on who approves what. Formal sign-off stays with your own advisers.",
      },
      {
        question: "What happens after you hand over? Are we stuck with you?",
        answer:
          "No. Every build ends with a system your team owns, simple guides and training. Upkeep is optional and monthly. Stop with 30 days' notice and keep everything.",
      },
    ],
  },
};
