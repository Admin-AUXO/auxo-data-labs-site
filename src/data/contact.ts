import { siteData } from "./site";

export interface ContactField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  /** For select fields. */
  options?: string[];
  /** For textarea — drives the character counter and validation. */
  maxLength?: number;
  /** Minimum length for inline validation. */
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
    eyebrow: string;
    title: string;
    titleHighlight: string | string[];
    description: string;
    pills: string[];
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
    submitText: string;
    note: string;
    status: {
      sending: string;
      success: string;
      error: string;
      notConfigured: string;
    };
  };
  faq: {
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
}

export const contactContent: ContactContent = {
  hero: {
    eyebrow: "Contact AUXO",
    title: "Bring the problem, not a polished brief",
    titleHighlight: ["problem", "not a polished brief"],
    description:
      "If reporting is messy, decisions are slow, or an analytics initiative is stuck, use this page. A short, honest summary is enough to start.",
    pills: [
      "Response within 1 business day",
      "Dubai-based, global delivery",
      "Form or direct email both work",
    ],
  },
  details: {
    title: "Reach us directly",
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
        value: `${siteData.address.street}, ${siteData.address.city}, ${siteData.address.country}`,
      },
      {
        icon: "mdi:linkedin",
        label: "LinkedIn",
        value: "AUXO Data Labs",
        href: siteData.social.linkedin,
        external: true,
      },
    ],
    cta: { text: "Book a call" },
  },
  form: {
    title: "What to send us",
    description:
      "A useful first message usually answers three things. If you only have fragments, send the fragments.",
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
        label: "Topic",
        type: "select",
        options: [
          "Not sure where to start",
          "Reporting & dashboards",
          "Forecasting & planning",
          "Automation & applied AI",
          "Something else",
        ],
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "What is breaking or slowing decisions right now? What systems or teams are involved? What timeline matters most?",
        required: true,
        minLength: 20,
        maxLength: 500,
      },
    ],
    submitText: "Send message",
    note: "Messy context is fine. The point of the first conversation is to make the problem clearer, not to grade the brief.",
    status: {
      sending: "Sending your message...",
      success: "Message sent. You will hear back within one business day.",
      error: `Something went wrong. Please try again or email us at ${siteData.email}.`,
      notConfigured: `The form is not connected yet. Please email us directly at ${siteData.email}.`,
    },
  },
  faq: {
    title: "Before you reach out",
    description:
      "These are the questions buyers usually ask before booking time or filling out the form.",
    items: [
      {
        question: "Do I need a full brief before contacting AUXO?",
        answer:
          "No. A clear description of the problem, the pressure around it, and the systems involved is enough for the first conversation.",
      },
      {
        question: "Should I book a meeting or use the form?",
        answer:
          "Either works. Use the form for a detailed written summary. Book a meeting if the issue is easier to explain live or timing is tight.",
      },
      {
        question: "Do you only work with teams in Dubai?",
        answer:
          "No. AUXO is based in Dubai, but engagements can run remotely, hybrid, or with targeted on-site time depending on the phase.",
      },
      {
        question: "What happens after I send a message?",
        answer:
          "You get a response within one business day. From there, AUXO will usually recommend a short call, a more scoped follow-up, or a direct answer on fit.",
      },
    ],
  },
};
