// Buttons on the hidden QR page (auxodata.com/v).
// The QR on the business card never changes — edit this list to change what it offers.

export type CardLinkAction = "link" | "calendar" | "download";

export interface CardLink {
  id: string; // analytics label, keep stable
  label: string;
  hint: string;
  icon: string; // must be in the astro-icon allowlist (astro.config.mjs)
  action: CardLinkAction;
  href?: string;
  external?: boolean;
  primary?: boolean;
}

const whatsappNumber = "971565651351";
const whatsappMessage = "Hi Vignesh, I scanned your AUXO card and would like to connect.";

export const cardPage = {
  person: {
    name: "Vignesh Ramesh",
    role: "Co-Founder & CEO, AUXO Data Labs",
  },
  footnote: "UAE – USA",
  links: [
    {
      id: "auxo_score",
      label: "Take the AUXO Score",
      hint: "Identify your data health in 3 minutes",
      icon: "mdi:gauge",
      action: "link",
      href: "/auxo-score/",
      primary: true,
    },
    {
      id: "save_contact",
      label: "Save my contact",
      hint: "Add Vignesh to your phone",
      icon: "mdi:account-plus-outline",
      action: "download",
      href: "/vcard/vignesh-ramesh.vcf",
    },
    {
      id: "book_call",
      label: "Book a call",
      hint: "Schedule an appointment",
      icon: "mdi:calendar-clock-outline",
      action: "calendar",
    },
    {
      id: "linkedin",
      label: "Connect on LinkedIn",
      hint: "linkedin.com/in/vig-auxo",
      icon: "mdi:linkedin",
      action: "link",
      href: "https://www.linkedin.com/in/vig-auxo",
      external: true,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      hint: "+971 56 565 1351",
      icon: "mdi:whatsapp",
      action: "link",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      external: true,
    },
  ] satisfies CardLink[],
};
