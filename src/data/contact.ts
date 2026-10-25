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
    hintLink: { text: "Start your free audit", href: "/auxo-score/?offer=free-audit" },
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
    description: "A few plain lines is enough: what you want to fix, and the timeline that matters.",
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
    submitText: "Send message",
    note: "The first conversation is about getting the problem clear. No prep needed.",
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
        desc: "A few plain lines about what you want to fix and the timeline that matters. No formal brief needed.",
      },
      {
        title: "We reply within a day",
        desc: "A founder reads it and replies within one business day, not a sales inbox.",
      },
      {
        title: "A short call",
        desc: "We get the problem clear and agree the first concrete step together. If we're not the right fit, we say so.",
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
          "Yes. We keep client relationships and details to ourselves, and we're glad to sign an NDA before any detailed conversation. Mention it in your message and we'll send ours within a day, or work from the document your legal team prefers.",
      },
      {
        question: "What happens to our data? Do you take copies of it?",
        answer:
          "We take only the data a piece of work needs, and wherever we can we use a sample, or anonymise or hash it first. Everything is handled under NDA and to the access rules you set, never reused, and returned or removed when the work is done. What we build runs on your data, in your accounts.",
      },
      {
        question: "What if our data is messy, scattered or incomplete?",
        answer:
          "That's the normal starting point, not a blocker. Most of the early work is making sense of what you already hold across spreadsheets, systems and inboxes. You don't need to tidy anything before we talk.",
      },
      {
        question: "Do we have to replace the tools we already use?",
        answer:
          "No. We build on the systems you already run: your CRM, your finance stack, your spreadsheets. If a tool or agent you have works, we'll say so and suggest keeping it.",
      },
      {
        question: "How quickly do we see something real?",
        answer:
          "The deep-dive audit takes 2 to 3 weeks. Setting up one tool or stack takes 1 to 2 weeks, and a first build takes 4 to 12 weeks, in short steps you can see working.",
      },
      {
        question: "Do you use AI, and is our data safe with it?",
        answer:
          "We use AI where it earns its place, and a person approves what goes out. We don't feed your data into tools that train on it, we work to the access rules you set, and the result is yours to keep.",
      },
      {
        question: "Can you make us compliant?",
        answer:
          "No one should promise that. We build systems that support your standards: clear records, audit trails and rules on who approves what. Formal sign-off stays with your own advisers, and we'll tell you plainly where our work ends and theirs begins.",
      },
      {
        question: "What happens after you hand over? Are we stuck with you?",
        answer:
          "The opposite. Every build ends with a working system your team owns, plain documentation and the training to run it. Managed upkeep is optional, monthly, and you can stop with 30 days' notice and keep everything.",
      },
      {
        question: "Where do you work?",
        answer:
          "We're based in Dubai and work with teams across the UAE, the US and Europe. We work remotely by default.",
      },
    ],
  },
};
