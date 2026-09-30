export interface Footnote {
  id: string;
  marker: string;
  text: string;
  source: string;
}

export const footnotes: Footnote[] = [
  {
    id: "ref-1",
    marker: "*",
    text: "37% of CFOs surveyed said they do not completely trust the accuracy of their organisation's financial data.",
    source:
      "BlackLine, Global Finance Leaders Survey, January 2024 — 1,300+ C-suite and senior finance professionals across seven markets.",
  },
];

