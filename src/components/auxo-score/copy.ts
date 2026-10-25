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
      reassurance: string;
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
      "A free 10-question check of how ready your data is for AI, across five dimensions. Get a 0 to 100 score in about 3 minutes. No sign-up.",
  },
  intro: {
    default: {
      eyebrow: "The AUXO Score",
      title: "How ready is your data for AI?",
      lede: (n) =>
        `${n} quick rounds. Tap the answer that matches a normal month, not your best one. Get your score out of 100 at the end.`,
    },
    startup: {
      eyebrow: "Free audit for funded startups",
      title: "Step 1: your AUXO Score.",
      lede: "Ten quick questions on how ready your data is for AI. Then book a 45-minute review call with a founder. We send a one-page summary of what to fix first after the call.",
      stepsLabel: "Free audit steps",
      steps: ["AUXO Score", "Founder review call", "One-page summary"],
      eligibility: "For funded startups, seed to Series B. One per company.",
    },
    dimensionsLabel: "Dimensions measured",
    facts: { rounds: "rounds", minutes: "min", score: "your score" },
    resume: (i, n) => `You have a check in progress (card ${i} of ${n}).`,
    resumeButton: "Resume",
    startOverButton: "Start over",
    startButton: "Start the AUXO Score →",
    note: (limit) =>
      `If you don't know an answer, say so. Choosing "I don't know" ${limit} or more times ends the check with a visibility finding instead of a score.`,
    privacy:
      "Free and no sign-up. Your answers stay in your browser. Nothing is sent unless you ask us to email your report.",
  },
  result: {
    deeper: {
      title: "Want an expert read?",
      body: "The deep-dive audit is a review of your own systems and data, under NDA if you want one. You get a written assessment, a prioritised plan and a readout with your leadership. It is paid, and priced privately after a first conversation.",
      link: "Ask about a deep-dive audit →",
      checkTitle: "Is this for you?",
      ticks: [
        "We're planning a data or AI project this year.",
        "I can answer for both finance and operations.",
      ],
      continue: "Continue",
      startupLine: "Funded startup, seed to Series B? You may qualify for a free audit.",
      startupLink: { text: "See the free audit", href: "/pricing/#funded-startups" },
    },
    reviewCall: {
      title: "Step 2: book your review call.",
      body: "Your score is saved in this browser. Book a 45-minute call with a founder and we'll go through it together. After the call we send a one-page summary of what to fix first.",
      ticks: [
        "We've raised from outside investors, seed to Series B.",
        "This is our company's first free audit with AUXO.",
      ],
      button: "Book your review call",
      tip: "Email the report to yourself first, so you have it on the call.",
      reassurance: "A real person replies within one business day.",
      notEligible: {
        before: "Not a funded startup? ",
        bookText: "Book a meeting",
        middle: " instead, or ",
        deepDive: { text: "ask about the deep-dive audit", href: "/contact/?topic=deep-dive-audit" },
        after: ".",
      },
    },
  },
  extended: {
    eyebrow: "Deep-dive audit",
    title: "Ask about a deep-dive audit.",
    lede: "Leave your work email and a founder will reply within one business day to arrange a first conversation. Your score comes with your request.",
    label: "Work email",
    placeholder: "name@company.com",
    submit: "Send request",
    consent: "We'll email you about the deep-dive audit and may follow up once. No spam.",
    privacyLink: "Privacy policy",
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
      lede: "That is a finding in itself, and still worth a review call. Book your call and bring someone from finance or operations, or retake the check with them first.",
      book: "Book your review call",
    },
    retake: "Retake with a colleague",
  },
};
