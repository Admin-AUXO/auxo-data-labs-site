import { siteData } from "./site";
import { marketplaceCards, retiredSlugs } from "./marketplace";

export interface ContactField {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  options?: string[];
  maxLength?: number;
  minLength?: number;
  autocomplete?: string;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export interface ContactTool {
  slug: string;
  name: string;
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
    points: string[];
    spots: { left: string; full: string };
  };
  details: {
    title: string;
    items: ContactDetail[];
  };
  form: {
    title: string;
    description: string;
    fields: ContactField[];
    tools: {
      catalogue: ContactTool[];
      aliases: Record<string, string>;
      note: string;
    };
    bandNote: string;
    newsletterLabel: string;
    consentNote: string;
    consentLink: { text: string; href: string };
    submitText: string;
    status: {
      sending: string;
      error: string;
      consentRequired: string;
    };
  };
  booking: {
    title: string;
    lead: string;
    note: string;
    iframeTitle: string;
    fallback: string;
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

export const stageOptions = ["Startup, seed to Series B", "Growing company, 50–500 people", "Larger organisation"];

export const contactContent: ContactContent = {
  meta: {
    title: "Apply for a Founder review",
    description:
      "A 30-minute call with an AUXO founder, by application. Bring the one number you don't trust. Written next steps within 3 business days.",
  },
  hero: {
    eyebrow: "Founder review",
    title: "30 minutes with a founder.",
    titleHighlight: "founder",
    lead: "Bring the one number you don't trust. Leave with what to fix first.",
    spots: {
      left: "{left} of {cap} places left this week.",
      full: "This week is full. Apply now and we will offer you a slot next week.",
    },
    points: [
      "A call with Vignesh or Ajay, not a sales team.",
      "Written next steps within 3 business days.",
      "Limited places each week. We read every application.",
    ],
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
  },
  form: {
    title: "Your application",
    description: "Five questions. Then pick a time.",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Your name",
        required: true,
        minLength: 2,
        maxLength: 100,
        autocomplete: "name",
      },
      {
        name: "email",
        label: "Work email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
        maxLength: 200,
        autocomplete: "email",
      },
      {
        name: "website",
        label: "Company website",
        type: "text",
        placeholder: "company.com",
        required: true,
        maxLength: 200,
        autocomplete: "url",
      },
      {
        name: "stage",
        label: "Size or stage",
        type: "select",
        placeholder: "Select one…",
        required: true,
        options: stageOptions,
      },
      {
        name: "number",
        label: "What is the one number you don't trust today?",
        type: "textarea",
        placeholder: "For example: monthly revenue, because finance and sales report different figures.",
        required: true,
        minLength: 10,
        maxLength: 500,
      },
    ],
    tools: {
      catalogue: [...marketplaceCards.map((c) => ({ slug: c.slug, name: c.name })), { slug: "custom-stack", name: "Custom stack" }],
      aliases: retiredSlugs,
      note: "Tool you're interested in:",
    },
    bandNote: "Your AUXO Score band:",
    newsletterLabel: "Send me the AUXO newsletter every 2 weeks.",
    consentNote:
      "I consent to AUXO holding these details to review my application and reply, in line with the Privacy Policy. We don't sell or rent your details.",
    consentLink: { text: "Privacy Policy", href: "/legal/privacy-policy/" },
    submitText: "Apply and pick a time",
    status: {
      sending: "Sending your application…",
      error: `That didn't go through. Please try again, or email us at ${siteData.email}.`,
      consentRequired: "Please tick the consent box so we can hold your details to reply.",
    },
  },
  booking: {
    title: "Thanks. Now pick a time.",
    lead: "Choose any open 30-minute slot below.",
    note: "We review every application before the call and will tell you if it's not a fit.",
    iframeTitle: "Book your Founder review",
    fallback: "Calendar not loading? Open the booking page",
  },
  nextSteps: {
    eyebrow: "Next steps",
    title: "What happens next",
    titleHighlight: "next",
    subtitle: "From application to a clear first move.",
    steps: [
      {
        title: "You apply and pick a time",
        desc: "Five questions, then a 30-minute slot. A founder replies within one business day.",
      },
      {
        title: "The call",
        desc: "We learn the business, its customers, its problems and its data, then propose a path. No price on the call.",
      },
      {
        title: "Next steps in writing",
        desc: "Within 3 business days. If there is work to do, a fixed price follows in writing. If we're not the right fit, we say so.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Before you apply",
    titleHighlight: "apply",
    description: "The questions founders and team leads ask us first.",
    items: [
      {
        question: "Who is the Founder review for?",
        answer:
          "Any company that wants an honest read of its data before spending on AI, from seed-stage startups to large organisations. One per company.",
      },
      {
        question: "What does it cost?",
        answer:
          "No charge for the AUXO Score or the Founder review. If there is work to do, each phase has a fixed price, agreed in writing before we start.",
      },
      {
        question: "Why is it an application?",
        answer:
          "Places are limited each week, and we prepare for every call. We read each application first and will tell you if it isn't a fit.",
      },
      {
        question: "Is this confidential? Can we sign an NDA first?",
        answer:
          "Yes. Your details stay with us, and we're glad to sign an NDA first. We can send ours or use yours.",
      },
      {
        question: "What if our data is messy, scattered or incomplete?",
        answer:
          "That's normal, not a blocker. You don't need to tidy anything before we talk. If there isn't enough data yet, we'll say so and suggest what to set up first.",
      },
      {
        question: "What happens after you hand over? Are we stuck with you?",
        answer:
          "No. Every build ends with a system your team owns, simple guides and training. Upkeep is optional and monthly. Stop with 30 days' notice and keep everything.",
      },
    ],
  },
};
