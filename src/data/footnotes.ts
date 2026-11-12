interface Footnote {
  id: string;
  marker: string;
  text: string;
  source: string;
  url: string;
}

export const footnotes: Footnote[] = [
  {
    id: "ref-stl",
    marker: "1",
    text: "Generative AI users saved 5.4% of their work hours, about 2.2 hours a week for someone working 40 hours.",
    source: "Federal Reserve Bank of St. Louis, The Impact of Generative AI on Work Productivity, 2025.",
    url: "https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity",
  },
  {
    id: "ref-copilot",
    marker: "2",
    text: "Developers with GitHub Copilot completed the task 55.8% faster than the control group.",
    source: "Peng, Kalliamvakou, Cihon and Demirer, The Impact of AI on Developer Productivity: Evidence from GitHub Copilot, 2023.",
    url: "https://arxiv.org/abs/2302.06590",
  },
  {
    id: "ref-nber",
    marker: "3",
    text: "Access to an AI assistant raised issues resolved per hour by 14% on average, and by 34% for novice and low-skilled workers.",
    source: "Brynjolfsson, Li and Raymond, Generative AI at Work, NBER Working Paper 31161, 2023.",
    url: "https://www.nber.org/papers/w31161",
  },
  {
    id: "ref-nanda",
    marker: "4",
    text: "Only about 5% of integrated generative AI pilots extract measurable value; most show no measurable effect on profit and loss. Based on 52 interviews, 153 survey responses and 300+ public deployments.",
    source: "MIT NANDA, The GenAI Divide: State of AI in Business 2025.",
    url: "https://nanda.media.mit.edu/ai_report_2025.pdf",
  },
  {
    id: "ref-gartner",
    marker: "5",
    text: "Poor data quality costs organisations at least $12.9 million a year on average.",
    source: "Gartner research, 2020, cited in Data Quality: Why It Matters and How to Achieve It.",
    url: "https://www.gartner.com/en/data-analytics/topics/data-quality",
  },
];
