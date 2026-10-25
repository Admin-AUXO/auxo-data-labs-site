export interface NotFoundContent {
  meta: { title: string; description: string };
  index: string;
  title: string;
  lead: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export const notFoundContent: NotFoundContent = {
  meta: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist.",
  },
  index: "404",
  title: "This page took a wrong turn.",
  lead: "The page you're looking for moved or never existed. While you're here, care for a game?",
  primaryCta: { text: "Back home", href: "/" },
  secondaryCta: { text: "See how it works", href: "/how-it-works/" },
};
