export interface Dimension {
  name: string;
  question: string;
}

export interface EngagementStep {
  title: string;
  desc?: string;
}

export interface Founder {
  name: string;
  role: string;
  lines: string[];
  linkedin: string;
}

export const theWorkContent = {
  intro: {
    title: "How we assess a business.",
    lead: "We begin with a structured read of where your data actually stands. Not a proposal but an assessment.",
    note: "We publish the method because you should be able to judge it before you meet us.",
  },
  method: {
    title: "The method",
    dimensions: [
      { name: "Accurate", question: "Is the data correct?" },
      { name: "Complete", question: "Is anything missing?" },
      { name: "Consistent", question: "Does it agree across systems?" },
      { name: "Timely", question: "Is it current when you need it?" },
      { name: "Trusted", question: "Do people actually rely on it when they decide?" },
    ] satisfies Dimension[],
  },
  pullQuote: "We'll tell you what to build, when to build it, and sometimes not to build at all.",
  engagement: {
    title: "How an engagement runs",
    steps: [
      { title: "The data assessment comes first.", desc: "A structured read of your data against the five dimensions above, before anything is built." },
      { title: "We build on what we found.", desc: "Only what the assessment shows is worth building, on the systems you already run." },
      { title: "The handover.", desc: "We train your team, document everything, and hand over a system you run and own." },
    ] satisfies EngagementStep[],
  },
  team: {
    title: "The founding team",
    founders: [
      {
        name: "Vignesh Ramesh",
        role: "Co-Founder & CEO",
        lines: [
          "Ex-IBM systems engineer. 10+ years executing enterprise mandates across the GCC, including BP Oman, RTA, DEWA and TransCo.",
        ],
        linkedin: "https://www.linkedin.com/in/vig-auxo",
      },
      {
        name: "Ajay Kumar",
        role: "Co-Founder & CTO",
        lines: [
          "Analytics architect. 10+ years building cloud infrastructure and BI for Fortune 500s and scale-ups across the EU, US and MENA.",
        ],
        linkedin: "https://www.linkedin.com/in/ajaykumar9795",
      },
    ] satisfies Founder[],
  },
  pricing: {
    title: "Pricing",
    body: "Every engagement is scoped to your business, so pricing follows what the assessment finds.",
    cta: "Ask about pricing",
  },
};
