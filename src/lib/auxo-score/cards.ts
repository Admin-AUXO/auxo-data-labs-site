import type { Card, Dimension } from "./types";

export const CARDS: Card[] = [
  {
    id: 1, topic: "Hand-edited board numbers", dimension: "Accurate", type: "scale_ascending",
    question: "What percentage of numbers shown to leadership or the board are touched, calculated, or adjusted by hand in spreadsheets first?",
    options: [
      { label: "None", sub: "100% pulled directly from dashboards/systems", tier: 1, points: 10 },
      { label: "Under 25%", sub: "Minor formatting and cosmetic assembly only", tier: 2, points: 7 },
      { label: "25% – 75%", sub: "Heavy copy-pasting, VLOOKUPs, and manual tweaks", tier: 3, points: 3 },
      { label: "Over 75%", sub: "Almost entirely built and manipulated manually", tier: 4, points: 0 },
    ],
  },
  {
    id: 2, topic: "Corrections after meetings", dimension: "Accurate", type: "scale_descending",
    question: "In the past 6 months, how often has a reported number or slide deck had to be re-sent or corrected after a leadership meeting?",
    options: [
      { label: "Almost every cycle", sub: "Re-issuing corrected decks is normal", tier: 4, points: 0 },
      { label: "Every month or two", sub: "Noticeable calculation errors slip through", tier: 3, points: 3 },
      { label: "Once or twice", sub: "Minor footnote or typo fixes only", tier: 2, points: 7 },
      { label: "Zero times", sub: "What gets presented stays final", tier: 1, points: 10 },
    ],
  },
  {
    id: 3, topic: "Where key data lives", dimension: "Complete", type: "descriptive_shuffle",
    question: "Where does critical operational data (e.g. pipeline status, inventory, pricing, cost tracking) actually live?",
    options: [
      { label: "Central systems", sub: "Fully tracked in CRM, ERP, or warehouse", tier: 1, points: 10 },
      { label: "Mostly central", sub: "Some teams keep private side notes", tier: 2, points: 7 },
      { label: "Scattered", sub: "Key metrics sit in personal sheets or Slack", tier: 3, points: 3 },
      { label: "In people's heads", sub: "Lost forever if 2 key people leave", tier: 4, points: 0 },
    ],
  },
  {
    id: 4, topic: "Time to explain a number", dimension: "Complete", type: "scale_descending",
    question: "When leadership asks 'Why is this metric up or down?', how long does it take to pull the full breakdown?",
    options: [
      { label: "A week or more", sub: "Turns into an internal investigation", tier: 4, points: 0 },
      { label: "2 to 3 days", sub: "Manual multi-system stitching required", tier: 3, points: 3 },
      { label: "A few hours", sub: "Someone just runs and filters an export", tier: 2, points: 7 },
      { label: "Under 5 minutes", sub: "Instant drill-down on current tools", tier: 1, points: 10 },
    ],
  },
  {
    id: 5, topic: "KPI definitions", dimension: "Consistent", type: "descriptive_shuffle",
    question: "Does your company have single, documented definitions for core KPIs (e.g. 'Active Customer', 'Gross Margin', 'Churn')?",
    options: [
      { label: "Centrally locked", sub: "Documented and coded across systems", tier: 1, points: 10 },
      { label: "Written down", sub: "But different teams still interpret loosely", tier: 2, points: 7 },
      { label: "Tribal knowledge", sub: "Unwritten; people assume definitions", tier: 3, points: 3 },
      { label: "No standard", sub: "Teams calculate the same metric differently", tier: 4, points: 0 },
    ],
  },
  {
    id: 6, topic: "Conflicting numbers between teams", dimension: "Consistent", type: "scale_descending",
    question: "How often do two different department heads show up to a meeting with conflicting numbers for the same thing?",
    options: [
      { label: "Every cycle", sub: "Discrepancies are an expected headache", tier: 4, points: 0 },
      { label: "Frequently", sub: "Meeting time is spent debating who is right", tier: 3, points: 3 },
      { label: "Rarely", sub: "Only if there's a clear cut-off timing difference", tier: 2, points: 7 },
      { label: "Never", sub: "All teams report off the same baseline", tier: 1, points: 10 },
    ],
  },
  {
    id: 7, topic: "Month-end close speed", dimension: "Timely", type: "scale_ascending",
    question: "How many calendar days after month-end until executive metrics and financials are locked and shared?",
    options: [
      { label: "5 days or less", sub: "Fast, repeatable close", tier: 1, points: 10 },
      { label: "6 to 10 days", sub: "Standard, predictable turnaround", tier: 2, points: 7 },
      { label: "11 to 20 days", sub: "Significant lag before visibility", tier: 3, points: 3 },
      { label: "21+ days", sub: "Or numbers are never officially locked", tier: 4, points: 0 },
    ],
  },
  {
    id: 8, topic: "Freshness of day-to-day data", dimension: "Timely", type: "scale_descending",
    question: "How old is the operational data managers look at when making day-to-day decisions?",
    options: [
      { label: "Monthly or older", sub: "Flying blind between cycles", tier: 4, points: 0 },
      { label: "Last week's data", sub: "Weekly summary cadences only", tier: 3, points: 3 },
      { label: "Yesterday's close", sub: "Refreshed nightly via batch", tier: 2, points: 7 },
      { label: "Real-time / Hourly", sub: "Live view of current business", tier: 1, points: 10 },
    ],
  },
  {
    id: 9, topic: "Shadow spreadsheets", dimension: "Trusted", type: "scale_descending",
    question: "How common is it for managers to maintain private 'shadow' spreadsheets because they don't fully trust central dashboards?",
    options: [
      { label: "Universal", sub: "Official tools are ignored; private sheets run things", tier: 4, points: 0 },
      { label: "Common", sub: "Most managers maintain a side sheet to be safe", tier: 3, points: 3 },
      { label: "Isolated", sub: "1 or 2 niche teams do this for special cases", tier: 2, points: 7 },
      { label: "Practically zero", sub: "Official tools are the only reference", tier: 1, points: 10 },
    ],
  },
  {
    id: 10, topic: "Data behind big decisions", dimension: "Trusted", type: "descriptive_shuffle",
    question: "Before leadership makes a major strategic bet, what happens to the underlying data?",
    options: [
      { label: "Accepted instantly", sub: "High confidence, zero audit drills", tier: 1, points: 10 },
      { label: "Quick gut check", sub: "Light verification, accepted quickly", tier: 2, points: 7 },
      { label: "Heavy audit", sub: "Days spent validating before trusting", tier: 3, points: 3 },
      { label: "Ignored", sub: "Calls are made on gut feel; data is suspect", tier: 4, points: 0 },
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
      "Map where pipeline, pricing, cost and occupancy data actually live today, including personal sheets.",
      "Name one owner for each dataset that only exists in a spreadsheet or in someone's head.",
      "Move the most critical of those into a shared system this month.",
    ],
    good: "Anyone can explain why a metric moved in minutes, from one place.",
  },
  Consistent: {
    why: "Teams calculate the same metric in different ways, so meetings turn into debates about whose number is right.",
    steps: [
      "Write down one definition for each of your top five KPIs, including the source and cut-off date.",
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

export const FOCUS_COPY = Object.fromEntries(
  Object.entries(FOCUS).map(([d, f]) => [d, f.why]),
) as Record<Dimension, string>;
