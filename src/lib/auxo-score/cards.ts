import type { Card, Dimension } from "./types";

export const CARDS: Card[] = [
  {
    id: 1, topic: "Numbers fixed by hand", dimension: "Accurate", type: "scale_ascending",
    question: "How many numbers in your leadership or investor reports are fixed by hand in a spreadsheet first?",
    options: [
      { label: "None", sub: "Straight from your systems", tier: 1, points: 10 },
      { label: "Under 25%", sub: "Light tidying only", tier: 2, points: 7 },
      { label: "25% to 75%", sub: "Lots of copy-paste and fixes", tier: 3, points: 3 },
      { label: "Over 75%", sub: "Almost all built by hand", tier: 4, points: 0 },
    ],
  },
  {
    id: 2, topic: "Reports corrected after sending", dimension: "Accurate", type: "scale_descending",
    question: "In the last 6 months, how often was a report corrected and re-sent after leadership saw it?",
    options: [
      { label: "Every month", sub: "Corrections are normal", tier: 4, points: 0 },
      { label: "Every few months", sub: "Real errors slip through", tier: 3, points: 3 },
      { label: "Once or twice", sub: "Small fixes only", tier: 2, points: 7 },
      { label: "Never", sub: "What's sent stays final", tier: 1, points: 10 },
    ],
  },
  {
    id: 3, topic: "Where key data lives", dimension: "Complete", type: "descriptive_shuffle",
    question: "Where does your key business data live: sales, pricing, costs and stock?",
    options: [
      { label: "Shared systems", sub: "All in company tools", tier: 1, points: 10 },
      { label: "Mostly shared", sub: "A few personal notes", tier: 2, points: 7 },
      { label: "Scattered", sub: "Personal sheets and chats", tier: 3, points: 3 },
      { label: "In people's heads", sub: "Lost if two people leave", tier: 4, points: 0 },
    ],
  },
  {
    id: 4, topic: "Time to explain a number", dimension: "Complete", type: "scale_descending",
    question: "When leadership asks why a number moved, how long does a full answer take?",
    options: [
      { label: "A week or more", sub: "It becomes a project", tier: 4, points: 0 },
      { label: "2 to 3 days", sub: "Pieced together by hand", tier: 3, points: 3 },
      { label: "A few hours", sub: "Someone runs a report", tier: 2, points: 7 },
      { label: "Minutes", sub: "Straight from your tools", tier: 1, points: 10 },
    ],
  },
  {
    id: 5, topic: "Shared definitions", dimension: "Consistent", type: "descriptive_shuffle",
    question: "Do all teams use the same written definitions for key numbers, like active customer or gross margin?",
    options: [
      { label: "Written and built in", sub: "Same in every system", tier: 1, points: 10 },
      { label: "Written down", sub: "Teams still read them differently", tier: 2, points: 7 },
      { label: "Unwritten", sub: "Everyone assumes", tier: 3, points: 3 },
      { label: "No standard", sub: "Each team calculates its own", tier: 4, points: 0 },
    ],
  },
  {
    id: 6, topic: "Teams with different numbers", dimension: "Consistent", type: "scale_descending",
    question: "How often do two teams bring different numbers for the same thing?",
    options: [
      { label: "Every meeting", sub: "Mismatches are expected", tier: 4, points: 0 },
      { label: "Often", sub: "Meetings become debates", tier: 3, points: 3 },
      { label: "Rarely", sub: "Only when dates differ", tier: 2, points: 7 },
      { label: "Never", sub: "One number for everyone", tier: 1, points: 10 },
    ],
  },
  {
    id: 7, topic: "Month-end close", dimension: "Timely", type: "scale_ascending",
    question: "How many working days after month-end are leadership's numbers final?",
    options: [
      { label: "5 or fewer", sub: "Fast and repeatable", tier: 1, points: 10 },
      { label: "6 to 10", sub: "Predictable", tier: 2, points: 7 },
      { label: "11 to 20", sub: "A long wait", tier: 3, points: 3 },
      { label: "21 or more", sub: "Or never final", tier: 4, points: 0 },
    ],
  },
  {
    id: 8, topic: "How fresh day-to-day data is", dimension: "Timely", type: "scale_descending",
    question: "How fresh is the data managers use for day-to-day decisions?",
    options: [
      { label: "A month or older", sub: "Guessing in between", tier: 4, points: 0 },
      { label: "Last week's", sub: "A weekly summary only", tier: 3, points: 3 },
      { label: "Yesterday's", sub: "Refreshed every night", tier: 2, points: 7 },
      { label: "Live or hourly", sub: "Always current", tier: 1, points: 10 },
    ],
  },
  {
    id: 9, topic: "Side spreadsheets", dimension: "Trusted", type: "scale_descending",
    question: "How many managers keep their own spreadsheet because they don't trust the official reports?",
    options: [
      { label: "Almost all", sub: "Side sheets run things", tier: 4, points: 0 },
      { label: "Many", sub: "Kept just in case", tier: 3, points: 3 },
      { label: "One or two", sub: "Special cases only", tier: 2, points: 7 },
      { label: "None", sub: "Official reports only", tier: 1, points: 10 },
    ],
  },
  {
    id: 10, topic: "Data behind big decisions", dimension: "Trusted", type: "descriptive_shuffle",
    question: "Before a big decision, what happens to the data behind it?",
    options: [
      { label: "Used as is", sub: "Trusted, no extra checks", tier: 1, points: 10 },
      { label: "Quick check", sub: "A light look, then used", tier: 2, points: 7 },
      { label: "Days of checking", sub: "Rebuilt before anyone trusts it", tier: 3, points: 3 },
      { label: "Ignored", sub: "Decided on gut feel", tier: 4, points: 0 },
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
