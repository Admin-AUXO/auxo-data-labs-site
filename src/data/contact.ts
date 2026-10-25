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
    title: string;
    titleHighlight: string | string[];
    lead: string;
  };
  details: {
    title: string;
    items: ContactDetail[];
    responseTime: string;
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
    note: string;
    status: {
      sending: string;
      success: string;
      error: string;
      consentRequired: string;
      notConfigured: string;
    };
  };
  nextSteps: {
    title: string;
    titleHighlight?: string | string[];
    subtitle: string;
    steps: { title: string; desc: string }[];
  };
  faq: {
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
    label: "Free audit",
    hint: "The free audit starts with the AUXO Score and ends with a review call. Funded startups, seed to Series B, one per company.",
    hintLink: { text: "Get your free audit", href: "/auxo-score/?offer=free-audit" },
  },
  {
    slug: "deep-dive-audit",
    label: "Deep-dive audit",
    hint: "Paid and priced privately after a first conversation. NDA first if you want one.",
  },
  {
    slug: "marketplace-tool",
    label: "Marketplace tool",
    hint: "Tell us about your team and what you want the tool to do.",
  },
  {
    slug: "custom-stack",
    label: "Custom stack",
    hint: "Tell us the function and the work you want to take off your team.",
  },
  {
    slug: "enterprise",
    label: "Enterprise",
    hint: "Tell us about procurement, security review or contract needs. We can start with one team.",
  },
  { slug: "something-else", label: "Something else" },
];

export const contactContent: ContactContent = {
  meta: {
    title: "Contact: talk to the founders",
    description:
      "Tell us what you want AI and your data to do. A real person replies within one business day. Based in Dubai, serving the UAE, the US and Europe.",
  },
  hero: {
    title: "Let's talk.",
    titleHighlight: "talk",
    lead: "Tell us what you want your data and AI to do. A real person reads your note and replies within one business day.",
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
    responseTime: "Replies within one business day.",
    cta: { text: "Book a meeting" },
  },
  form: {
    title: "Send a message",
    description: "A few lines is enough. No formal brief needed.",
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
        placeholder: "What do you want to fix or set up? Which systems does it touch? And what timeline matters most?",
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
    note: "No prep needed for the first conversation.",
    status: {
      sending: "Sending your message…",
      success: "Thank you. Your message is on its way, and we'll reply within one business day.",
      error: `That didn't go through. Please try again, or email us at ${siteData.email}. We'll reply within one business day.`,
      consentRequired: "Please tick the consent box so we can hold your details to reply.",
      notConfigured: `The form is not connected yet. Please email us at ${siteData.email}.`,
    },
  },
  nextSteps: {
    title: "What happens next",
    titleHighlight: "next",
    subtitle: "No drawn-out process. Three steps from your note to a clear first move.",
    steps: [
      {
        title: "You send a note",
        desc: "Use the form or email us. Say what you want to fix and by when.",
      },
      {
        title: "We reply within one business day",
        desc: "A founder reads it, not a sales inbox.",
      },
      {
        title: "A short call",
        desc: "We get the problem clear and agree a first step. If we're not the right fit, we say so.",
      },
    ],
  },
  faq: {
    title: "Before you reach out",
    titleHighlight: "reach out",
    description: "The questions founders and team leads ask us first.",
    items: [
      {
        question: "What does working together cost?",
        answer:
          "Every price is personal. We price after the first conversation and audit, and send it to you in writing before any work starts. The AUXO Score is free, and so is the free audit for funded startups.",
      },
      {
        question: "Is this confidential? Can we sign an NDA first?",
        answer:
          "Yes. Your name and details stay with us, and we're glad to sign an NDA first. Say so in your message and we'll send ours, or use your legal team's.",
      },
      {
        question: "What happens to our data, and is it safe with AI?",
        answer:
          "We take only what the work needs, anonymised where we can, under NDA and your access rules. It's never reused or fed to tools that train on it, and it's returned or removed when the work ends.",
      },
      {
        question: "What if our data is messy, scattered or incomplete?",
        answer:
          "That's the normal starting point, not a blocker. Most of the early work is making sense of what you already hold across spreadsheets, systems and inboxes. You don't need to tidy anything before we talk.",
      },
      {
        question: "Can you make us compliant?",
        answer:
          "No one should promise that. We build systems that support your standards: clear records, audit trails and rules on who approves what. Formal sign-off stays with your own advisers, and we'll tell you plainly where our work ends and theirs begins.",
      },
      {
        question: "What happens after you hand over? Are we stuck with you?",
        answer:
          "No. Every build ends with a system your team owns, plain documentation and training. Managed upkeep is optional and monthly. Stop with 30 days' notice and keep everything.",
      },
    ],
  },
};
