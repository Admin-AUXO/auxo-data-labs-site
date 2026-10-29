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
  gate: {
    eyebrow: string;
    title: string;
    lede: string;
    label: string;
    button: string;
    newsletter: string;
    consent: string;
  };
  result: {
    next: {
      title: string;
      apply: ScoreLink & { what: string };
      reportSent: (email: string) => string;
      reportFailed: string;
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
    note: "Not sure of an answer? Pick \"I don't know\". No sign-up. We ask for a work email before the result, so we can send it to you.",
  },
  gate: {
    eyebrow: "Your result is ready",
    title: "Where should we send your result?",
    lede: "Your score, band and first fix, on screen now and by email.",
    label: "Work email",
    button: "See my result",
    newsletter: "Send me the AUXO newsletter every 2 weeks.",
    consent: "We'll email your result and may follow up once. No spam.",
  },
  result: {
    next: {
      title: "Next step",
      apply: {
        what: "30 minutes with a founder. Bring the one number you don't trust. No charge.",
        text: "Apply for a Founder review",
        href: "/apply/",
      },
      reportSent: (email: string) => `Your full report is on its way to ${email}.`,
      reportFailed: "We couldn't email your report just now. Your result is below.",
    },
  },
  inconclusive: {
    status: "No score yet",
    title: "Too many unknowns to score.",
    default: {
      lede: "You answered \"I don't know\" three or more times. That's a finding in itself: it's hard to trust data nobody can see. Try again with someone from finance or operations, or talk to us.",
      talk: { text: "Apply for a Founder review", href: "/apply/" },
    },
    retake: "Retake with a colleague",
  },
};
