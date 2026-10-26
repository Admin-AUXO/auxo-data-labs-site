import type { Card, Dimension } from "./types";

export const CARDS: Card[] = [
  {
    id: 1, topic: "Hand-edited board numbers", dimension: "Accurate", type: "scale_ascending",
    question: "How many of the numbers shown to leadership or the board are worked out or adjusted by hand in a spreadsheet first?",
    options: [
      { label: "None", sub: "All come straight from your systems", tier: 1, points: 10 },
      { label: "Under 25%", sub: "Only light formatting", tier: 2, points: 7 },
      { label: "25% – 75%", sub: "Lots of copy-pasting and manual fixes", tier: 3, points: 3 },
      { label: "Over 75%", sub: "Almost all built by hand", tier: 4, points: 0 },
    ],
  },
  {
    id: 2, topic: "Corrections after meetings", dimension: "Accurate", type: "scale_descending",
    question: "In the past 6 months, how often has a number or deck been corrected and re-sent after a leadership meeting?",
    options: [
      { label: "Almost every cycle", sub: "Corrections are normal", tier: 4, points: 0 },
      { label: "Every month or two", sub: "Real errors slip through", tier: 3, points: 3 },
      { label: "Once or twice", sub: "Small typo fixes only", tier: 2, points: 7 },
      { label: "Zero times", sub: "What's shown stays final", tier: 1, points: 10 },
    ],
  },
  {
    id: 3, topic: "Where key data lives", dimension: "Complete", type: "descriptive_shuffle",
    question: "Where does key business data (sales pipeline, stock, pricing, costs) actually live?",
    options: [
      { label: "Central systems", sub: "All in shared company systems", tier: 1, points: 10 },
      { label: "Mostly central", sub: "Some teams keep their own notes", tier: 2, points: 7 },
      { label: "Scattered", sub: "Key numbers sit in personal sheets or chats", tier: 3, points: 3 },
      { label: "In people's heads", sub: "Lost if 2 key people leave", tier: 4, points: 0 },
    ],
  },
  {
    id: 4, topic: "Time to explain a number", dimension: "Complete", type: "scale_descending",
    question: "When leadership asks why a number went up or down, how long does the full answer take?",
    options: [
      { label: "A week or more", sub: "It turns into an investigation", tier: 4, points: 0 },
      { label: "2 to 3 days", sub: "Data pieced together by hand", tier: 3, points: 3 },
      { label: "A few hours", sub: "Someone runs and filters a report", tier: 2, points: 7 },
      { label: "Under 5 minutes", sub: "Answered straight from your tools", tier: 1, points: 10 },
    ],
  },
  {
    id: 5, topic: "KPI definitions", dimension: "Consistent", type: "descriptive_shuffle",
    question: "Does everyone use the same written definition for your key numbers (e.g. 'active customer', 'gross margin', 'churn')?",
    options: [
      { label: "Fixed and shared", sub: "Written down and built into every system", tier: 1, points: 10 },
      { label: "Written down", sub: "But teams still read them differently", tier: 2, points: 7 },
      { label: "Unwritten", sub: "People just assume", tier: 3, points: 3 },
      { label: "No standard", sub: "Teams calculate the same metric differently", tier: 4, points: 0 },
    ],
  },
  {
    id: 6, topic: "Conflicting numbers between teams", dimension: "Consistent", type: "scale_descending",
    question: "How often do two team leads bring different numbers for the same thing to a meeting?",
    options: [
      { label: "Every cycle", sub: "Mismatches are expected", tier: 4, points: 0 },
      { label: "Frequently", sub: "Meetings turn into debates", tier: 3, points: 3 },
      { label: "Rarely", sub: "Only when dates differ", tier: 2, points: 7 },
      { label: "Never", sub: "Everyone uses the same numbers", tier: 1, points: 10 },
    ],
  },
  {
    id: 7, topic: "Month-end close speed", dimension: "Timely", type: "scale_ascending",
    question: "How many days after month-end until leadership's numbers are final and shared?",
    options: [
      { label: "5 days or less", sub: "Fast, repeatable close", tier: 1, points: 10 },
      { label: "6 to 10 days", sub: "Standard, predictable turnaround", tier: 2, points: 7 },
      { label: "11 to 20 days", sub: "A long wait for numbers", tier: 3, points: 3 },
      { label: "21+ days", sub: "Or numbers are never final", tier: 4, points: 0 },
    ],
  },
  {
    id: 8, topic: "Freshness of day-to-day data", dimension: "Timely", type: "scale_descending",
    question: "How old is the data managers use for day-to-day decisions?",
    options: [
      { label: "Monthly or older", sub: "Guessing in between", tier: 4, points: 0 },
      { label: "Last week's data", sub: "A weekly summary only", tier: 3, points: 3 },
      { label: "Yesterday's close", sub: "Updated every night", tier: 2, points: 7 },
      { label: "Real-time / Hourly", sub: "A live view of the business", tier: 1, points: 10 },
    ],
  },
  {
    id: 9, topic: "Shadow spreadsheets", dimension: "Trusted", type: "scale_descending",
    question: "How many managers keep their own spreadsheets because they don't trust the official reports?",
    options: [
      { label: "Universal", sub: "Private sheets run things", tier: 4, points: 0 },
      { label: "Common", sub: "Most keep a side sheet to be safe", tier: 3, points: 3 },
      { label: "Isolated", sub: "1 or 2 teams, for special cases", tier: 2, points: 7 },
      { label: "Practically zero", sub: "Official reports are the only source", tier: 1, points: 10 },
    ],
  },
  {
    id: 10, topic: "Data behind big decisions", dimension: "Trusted", type: "descriptive_shuffle",
    question: "Before leadership makes a big decision, what happens to the data behind it?",
    options: [
      { label: "Accepted instantly", sub: "Trusted, no extra checks", tier: 1, points: 10 },
      { label: "Quick gut check", sub: "A light check, then trusted", tier: 2, points: 7 },
      { label: "Heavy audit", sub: "Days of checking first", tier: 3, points: 3 },
      { label: "Ignored", sub: "Decisions go on gut feel", tier: 4, points: 0 },
    ],
  },
];

export const FOCUS: Record<Dimension, { why: string; steps: string[]; good: string }> = {
  Accurate: {
    why: "Numbers reaching leadership are being fixed by hand, so errors slip through and every correction costs credibility.",
    steps: [
      "List every number in your last board pack and mark which ones were edited in a spreadsheet.",
      "Pick the three most-edited numbers and trace each one back to its source system.",
      "Replace one manual step with a direct pull from that system before the next cycle.",
    ],
    good: "The pack is built from system data, and nothing is re-sent after the meeting.",
  },
  Complete: {
    why: "Key data sits outside your systems or takes days to pull together, so questions go unanswered when they matter.",
    steps: [
      "List where your sales, pricing, cost and staff data really live today, including personal sheets.",
      "Name an owner for any data that lives only in a spreadsheet or someone's head.",
      "Move the most critical of those into a shared system this month.",
    ],
    good: "Anyone can explain why a metric moved in minutes, from one place.",
  },
  Consistent: {
    why: "Teams calculate the same metric in different ways, so meetings turn into debates about whose number is right.",
    steps: [
      "Write down one definition for each of your top five numbers, with where it comes from.",
      "Get finance and operations to sign off on those definitions together.",
      "Rebuild the next report from the agreed definitions and retire the old versions.",
    ],
    good: "Every team brings the same number to the meeting, and the discussion is about what to do.",
  },
  Timely: {
    why: "Numbers arrive after the decisions they should inform, so managers act on last month's picture.",
    steps: [
      "Measure how many days your last month-end close really took, step by step.",
      "Find the two slowest hand-offs and ask what each one is waiting for.",
      "Set up a nightly refresh for the one daily number managers ask about most.",
    ],
    good: "The close is locked within five working days and managers see yesterday's figures every morning.",
  },
  Trusted: {
    why: "People check or rebuild the numbers before they rely on them, so the official reports cost effort without earning trust.",
    steps: [
      "Ask three managers which side spreadsheets they keep and why.",
      "Fix the specific gap behind the most common answer in the official report.",
      "Retire that side sheet publicly once the official version covers it.",
    ],
    good: "Leadership acts on the official numbers without a separate check.",
  },
};
