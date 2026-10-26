export const LOAD_STEPS = ["Scoring each dimension…", "Building your report…"];

export interface ScoreLink {
  text: string;
  href: string;
}

export interface ScoreCopy {
  meta: { title: string; description: string };
  intro: {
    default: { eyebrow: string; title: string; lede: (n: number) => string };    dimensionsLabel: string;
    facts: { rounds: string; minutes: string; score: string };
    resume: (i: number, n: number) => string;
    resumeButton: string;
    startOverButton: string;
    startButton: string;
    note: string;
  };
  result: {
    next: {
      title: string;
      report: { who: string; what: string };
      startup: { who: string; what: string; link: ScoreLink };
      growing: { who: string; what: string; button: string };
    };
  };
  inconclusive: {
    status: string;
    title: string;
    default: { lede: string; talk: ScoreLink };
    retake: string;
  };
}

export const SCORE_COPY: ScoreCopy = {
  meta: {
    title: "AUXO Score: is your data ready for AI?",
    description:
      "Is your data ready for AI? 10 questions on five checks, a score out of 100, about 3 minutes. No sign-up.",
  },
  intro: {
    default: {
      eyebrow: "The AUXO Score",
      title: "How ready is your data for AI?",
      lede: (n) =>
        `${n} questions. Answer for a normal month, not your best one. You get a score out of 100.`,
    },
    dimensionsLabel: "Dimensions measured",
    facts: { rounds: "questions", minutes: "min", score: "your score" },
    resume: (i, n) => `You have a check in progress (question ${i} of ${n}).`,
    resumeButton: "Resume",
    startOverButton: "Start over",
    startButton: "Start the AUXO Score →",
    note: "Not sure of an answer? Pick \"I don't know\". No sign-up, and your answers stay on your device unless you ask for the report by email.",
  },
  result: {
    next: {
      title: "Next step",
      report: {
        who: "Your full report",
        what: "A step-by-step plan for your weakest areas, by email.",
      },
      startup: {
        who: "Funded startup, seed to Series B",
        what: "A 45-minute call and a one-page plan. No charge.",
        link: { text: "Apply for a founder review", href: "/contact/?topic=founder-review" },
      },
      growing: {
        who: "Growing company or larger",
        what: "Your systems reviewed under NDA. A fixed price, in writing.",
        button: "Book a scoping call",
      },
    },
  },
  inconclusive: {
    status: "No score yet",
    title: "Too many unknowns to score.",
    default: {
      lede: "You answered \"I don't know\" three or more times. That's a finding in itself: it's hard to trust data nobody can see. Try again with someone from finance or operations, or talk to us.",
      talk: { text: "Talk to us", href: "/contact/?topic=not-sure" },
    },
    retake: "Retake with a colleague",
  },
};
