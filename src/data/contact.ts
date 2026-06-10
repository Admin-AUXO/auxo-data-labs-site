import { siteData } from "./site";

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

export interface ContactContent {
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

export const contactContent: ContactContent = {
  hero: {
    title: "Let's talk.",
    titleHighlight: "talk",
    lead: "Tell us what's slowing your decisions down. A real person reads your note and replies — within one business day.",
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
    cta: { text: "Book a call" },
  },
  form: {
    title: "Send a message",
    description: "A few plain lines is enough — what's not working, and the timeline that matters.",
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
        options: [
          "Not sure where to start",
          "Trusted data",
          "Clear reporting",
          "Reliable automation",
          "Confident compliance",
          "Something else",
        ],
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "What's slowing your decisions down? Which systems does it touch? And what timeline matters most?",
        required: true,
        minLength: 20,
        maxLength: 500,
      },
    ],
    consentNote:
      "I consent to AUXO holding these details to respond to my enquiry, in line with the Privacy Policy. We use them only to reply — never for marketing without separate opt-in.",
    submitText: "Send message",
    note: "The first conversation is about getting the problem clear. No prep needed.",
    status: {
      sending: "Sending your message…",
      success:
        "Thank you — your message is on its way. We'll reply within one business day.",
      error: `Something went wrong. Please try again or email us at ${siteData.email}.`,
      consentRequired: "Please tick the consent box so we can hold your details to reply.",
      notConfigured: `The form is not connected yet. Please email us directly at ${siteData.email}.`,
    },
  },
  nextSteps: {
    title: "What happens next",
    titleHighlight: "next",
    subtitle: "No drawn-out process. Three steps from your note to a clear first move.",
    steps: [
      { title: "You send a note", desc: "A few plain lines about what's slowing you down. No formal brief needed." },
      { title: "We reply within a day", desc: "A real person who does the work reads it and responds within one business day." },
      { title: "A focused call", desc: "Thirty minutes to get the problem clear and agree the first step. No hard sell." },
    ],
  },
  faq: {
    title: "Before you reach out",
    titleHighlight: "reach out",
    description: "The questions property leaders ask us first.",
    items: [
      {
        question: "What does working together cost?",
        answer:
          "Every engagement is fixed-scope and priced up front — you'll find the full range on the Services page. We agree the exact scope and price together before anything starts, so there are no open-ended retainers and no surprises on the invoice.",
      },
      {
        question: "Is this confidential? Can we sign an NDA first?",
        answer:
          "Yes. We keep client relationships and details to ourselves, and we're glad to sign your NDA before any detailed conversation. Just mention it in your message and we'll send ours, or work from yours.",
      },
      {
        question: "What if our data is messy, scattered, or incomplete?",
        answer:
          "That's the normal starting point, not a blocker. Most of the early work is making sense of what you already have across spreadsheets, systems, and inboxes. You don't need to clean anything up before we talk.",
      },
      {
        question: "Do we have to replace the tools we already use?",
        answer:
          "No. We build on the systems you already run — your CRM, your finance stack, your spreadsheets. The aim is to make what you have work harder, not to sell you another platform.",
      },
      {
        question: "What happens after you hand over — are we stuck with you?",
        answer:
          "The opposite. Every engagement ends with a working system your team owns, plain documentation, and the training to run it. No lock-in, no licence to keep paying. We stay reachable if you want us, but you're never dependent on us.",
      },
      {
        question: "Do you only work with teams in Dubai?",
        answer:
          "We're Dubai-based and work with property leaders across the UAE and the wider Gulf — remote, hybrid, or on-site, depending on the phase of the work.",
      },
    ],
  },
};
