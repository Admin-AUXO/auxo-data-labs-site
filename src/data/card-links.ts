interface CardContact {
  id: string;
  label: string;
  hint: string;
  icon: string;
  href: string;
  external?: boolean;
}

interface CardFounder {
  id: string;
  name: string;
  first: string;
  role: string;
  note: string;
  vcard: string;
  contacts: CardContact[];
}

const whatsapp = (number: string, first: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(`Hi ${first}, good to meet you. Saving your AUXO card now.`)}`;

export const cardPage = {
  company: {
    name: "AUXO Data Labs",
    lines: ["Your data, ready for AI.", "Built on your data, yours to keep."],
  },
  greeting: "Good to meet you.",
  chooser: {
    title: "Who did you speak with?",
  },
  change: "Change",
  saveLabel: "Save contact",
  wallet: { apple: "Add to Apple Wallet", google: "Add to Google Wallet" },
  meetLabel: (first: string) => `Book a meeting with ${first}`,
  score: {
    id: "auxo_score",
    eyebrow: "Before we meet again",
    label: "What's your AUXO Score?",
    hint: "10 questions · 3 minutes",
    href: "/auxo-score/",
  },
  site: { label: "auxodata.com", href: "/" },
  local: {
    city: "Dubai",
    timeZone: "Asia/Dubai",
    days: [1, 2, 3, 4, 5],
    opens: 9,
    closes: 18,
    open: "In working hours",
    closed: "After hours",
  },
  founders: [
    {
      id: "vignesh",
      name: "Vignesh Ramesh",
      first: "Vignesh",
      role: "Co-Founder & CEO",
      note: "Happy to help with scope, pricing and partnerships.",
      vcard: "/vcard/vignesh-ramesh.vcf",
      contacts: [
        {
          id: "vignesh_whatsapp",
          label: "WhatsApp",
          hint: "+971 56 565 1351",
          icon: "mdi:whatsapp",
          href: whatsapp("971565651351", "Vignesh"),
          external: true,
        },
        {
          id: "vignesh_email",
          label: "Email",
          hint: "vig@auxodata.com",
          icon: "mdi:email-outline",
          href: "mailto:vig@auxodata.com",
        },
        {
          id: "vignesh_linkedin",
          label: "LinkedIn",
          hint: "linkedin.com/in/vig-auxo",
          icon: "mdi:linkedin",
          href: "https://www.linkedin.com/in/vig-auxo",
          external: true,
        },
      ],
    },
    {
      id: "ajay",
      name: "Ajay Kumar",
      first: "Ajay",
      role: "Co-Founder & CTO",
      note: "Happy to help with data platforms, AI and delivery.",
      vcard: "/vcard/ajay-kumar.vcf",
      contacts: [
        {
          id: "ajay_email",
          label: "Email",
          hint: "ajay@auxodata.com",
          icon: "mdi:email-outline",
          href: "mailto:ajay@auxodata.com",
        },
        {
          id: "ajay_linkedin",
          label: "LinkedIn",
          hint: "linkedin.com/in/ajaykumar9795",
          icon: "mdi:linkedin",
          href: "https://www.linkedin.com/in/ajaykumar9795",
          external: true,
        },
      ],
    },
  ] satisfies CardFounder[],
};
