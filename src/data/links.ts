export interface LinksContent {
  meta: { title: string; description: string };
  title: string;
  lead: string;
  links: { text: string; href: string; primary?: boolean }[];
}

export const linksContent: LinksContent = {
  meta: {
    title: "AUXO links",
    description: "Take the AUXO Score or apply for a Founder review.",
  },
  title: "Your data, ready for AI.",
  lead: "Start with the AUXO Score. 10 questions, about 3 minutes.",
  links: [
    { text: "Take the AUXO Score", href: "/auxo-score/", primary: true },
    { text: "Apply for a Founder review", href: "/apply/" },
    { text: "The model is the easy part", href: "/blog/the-model-is-the-easy-part/" },
    { text: "Your AI assistant is not the hard part", href: "/blog/your-ai-assistant-is-not-the-hard-part/" },
    { text: "AI tools marketplace", href: "/marketplace/" },
  ],
};
