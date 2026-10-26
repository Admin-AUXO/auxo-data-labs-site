export const LOAD_STEPS = ["Scoring each dimension…", "Building your report…"];

export const OFFER_FREE_AUDIT = "free-audit";

export interface ScoreLink {
  text: string;
  href: string;
}

export interface ScoreCopy {
  meta: { title: string; description: string };
  intro: {
    default: { eyebrow: string; title: string; lede: (n: number) => string };
    startup: {
      eyebrow: string;
      title: string;
      lede: string;
      stepsLabel: string;
      steps: string[];
      eligibility: string;
    };
    dimensionsLabel: string;
    facts: { rounds: string; minutes: string; score: string };
    resume: (i: number, n: number) => string;
    resumeButton: string;
    startOverButton: string;
    startButton: string;
    note: (limit: number) => string;
    privacy: string;
  };
  result: {
    deeper: {
      title: string;
      body: string;
      link: string;
      checkTitle: string;
      ticks: [string, string];
      continue: string;
      startupLine: string;
      startupLink: ScoreLink;
    };
    reviewCall: {
      title: string;
      body: string;
      ticks: [string, string];
      button: string;
      tip: string;
      notEligible: { before: string; bookText: string; middle: string; deepDive: ScoreLink; after: string };
    };
  };
  extended: {
    eyebrow: string;
    title: string;
    lede: string;
    label: string;
    placeholder: string;
    submit: string;
    consent: string;
    privacyLink: string;
    success: (email: string) => string;
    back: string;
  };
  inconclusive: {
    status: string;
    title: string;
    default: { lede: string; talk: ScoreLink };
    startup: { lede: string; book: string };
    retake: string;
  };
}

export const SCORE_COPY: ScoreCopy = {
  meta: {
    title: "AUXO Score: is your data ready for AI?",
    description:
      "Is your data ready for AI? 10 questions on five checks, a score out of 100, about 3 minutes. Free, no sign-up.",
  },
  intro: {
    default: {
      eyebrow: "The AUXO Score",
      title: "How ready is your data for AI?",
      lede: (n) =>
        `${n} questions. Pick the answer that matches a normal month, not your best one. You get a score out of 100 at the end.`,
    },
    startup: {
      eyebrow: "Free audit",
      title: "Step 1: your AUXO Score.",
      lede: "Then a founder call and a one-page plan.",
      stepsLabel: "Free audit steps",
      steps: ["AUXO Score", "Founder call", "One-page plan"],
      eligibility: "For investor-funded startups, seed to Series B. One per company.",
    },
    dimensionsLabel: "Dimensions measured",
    facts: { rounds: "questions", minutes: "min", score: "your score" },
    resume: (i, n) => `You have a check in progress (question ${i} of ${n}).`,
    resumeButton: "Resume",
    startOverButton: "Start over",
    startButton: "Start the AUXO Score →",
    note: (limit) =>
      `Not sure? Pick "I don't know". Picking it ${limit} or more times ends the check with a finding instead of a score.`,
    privacy:
      "Free, no sign-up. Your answers stay in your browser unless you ask us to email your report.",
  },
  result: {
    deeper: {
      title: "Want this checked against your real systems?",
      body: "A review of your own systems and data, under NDA if you want: each fix rated red, amber or green, a build-first plan and a leadership readout. A fixed price, set by scope, in writing.",
      link: "Ask about a deep-dive audit →",
      checkTitle: "Is this for you?",
      ticks: [
        "We're planning a data or AI project this year.",
        "I can answer for both finance and operations.",
      ],
      continue: "Continue",
      startupLine: "Startup, seed to Series B? You may qualify for a free audit.",
      startupLink: { text: "See the free audit", href: "/auxo-score/?offer=free-audit" },
    },
    reviewCall: {
      title: "Step 2: book your founder call.",
      body: "Your score is saved in this browser. Book a 45‑minute call and a founder will go through it with you. A one-page plan of what to fix first follows within 3 business days.",
      ticks: [
        "We've raised from outside investors, seed to Series B.",
        "This is our company's first free audit with AUXO.",
      ],
      button: "Book your founder call",
      tip: "Email the report to yourself first, so you have it on the call.",
      notEligible: {
        before: "Not a startup, seed to Series B? ",
        bookText: "Book a meeting",
        middle: " instead, or ",
        deepDive: { text: "ask about a deep-dive audit", href: "/contact/?topic=deep-dive-audit" },
        after: ".",
      },
    },
  },
  extended: {
    eyebrow: "Deep-dive audit",
    title: "Ask about a deep-dive audit.",
    lede: "Leave your work email and a founder will reply within one business day. Your score is sent with your request.",
    label: "Work email",
    placeholder: "name@company.com",
    submit: "Send request",
    consent: "We'll email you about the deep-dive audit and may follow up once. No spam.",
    privacyLink: "Privacy Policy",
    success: (email) => `Request received. A founder will reply to ${email} within one business day.`,
    back: "← Back to my score",
  },
  inconclusive: {
    status: "No score yet",
    title: "Too many unknowns to score.",
    default: {
      lede: "You answered \"I don't know\" three or more times. That is a finding in itself: it's hard to trust or improve data nobody can see clearly. Try again with someone from finance or operations, or talk to us.",
      talk: { text: "Talk to us", href: "/contact/?topic=not-sure" },
    },
    startup: {
      lede: "That is a finding in itself, and still worth a founder call. Book your call and bring someone from finance or operations, or retake the check with them first.",
      book: "Book your founder call",
    },
    retake: "Retake with a colleague",
  },
};
