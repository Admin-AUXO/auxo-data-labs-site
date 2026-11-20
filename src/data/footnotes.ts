interface Footnote {
  id: string;
  marker: string;
  text: string;
  source: string;
  url: string;
}

export const footnotes: Footnote[] = [
  {
    id: "ref-vb-context",
    marker: "1",
    text: "In the past six months, 64% of respondents traced at least one confident but wrong agent answer to missing or inconsistent business context. VB Pulse survey of 130 people at organisations with 100 or more employees, August 2026.",
    source: "VentureBeat Intelligence, Agentic context layers, October 2026.",
    url: "https://venturebeat.com/resources/agentic-context-layers-64-of-enterprises-traced-a-confidently-wrong-ai-agent-answer-to-problems-in-their-own-company-data-in-the-past-six-months",
  },
  {
    id: "ref-dbt-ownership",
    marker: "2",
    text: "41% of respondents say ambiguous data ownership is a challenge. Same survey.",
    source: "dbt Labs, 2026 State of Analytics Engineering Report, April 2026.",
    url: "https://www.getdbt.com/resources/state-of-analytics-engineering-2026",
  },
  {
    id: "ref-mdc-agents",
    marker: "3",
    text: "57.3% of respondents are piloting or running AI agents in data and analytics workflows; 8.4% say the data feeding those systems is trustworthy enough for production. Interim findings from more than 540 data leaders and practitioners in 66 countries.",
    source: "The Modern Data Company, AI agents are advancing faster than enterprise data is ready for them, August 2026.",
    url: "https://www.businesswire.com/news/home/20260819494251/en/AI-Agents-Are-Advancing-Faster-Than-Enterprise-Data-Is-Ready-for-Them",
  },
];

export const archivedFootnotes: Footnote[] = [
  {
    id: "ref-dbt-trust",
    marker: "1",
    text: "71% of respondents are concerned about hallucinated or incorrect data reaching stakeholders. Survey of 363 data practitioners and leaders, December 2025 to February 2026.",
    source: "dbt Labs, 2026 State of Analytics Engineering Report, April 2026.",
    url: "https://www.getdbt.com/resources/state-of-analytics-engineering-2026",
  },
  {
    id: "ref-gartner-ai-data",
    marker: "3",
    text: "Sixty-three percent of organisations either do not have or are unsure if they have the right data management practices for AI. Based on a survey of 1,203 data management leaders in July 2024.",
    source: "Gartner, Lack of AI-Ready Data Puts AI Projects at Risk, February 2025.",
    url: "https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk",
  },
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
