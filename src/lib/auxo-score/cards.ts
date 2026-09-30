import type { Card } from "./types";

export const CARDS: Card[] = [
  {
    id: 1, dimension: "Accurate", type: "scale_ascending",
    question: "What percentage of numbers shown to leadership or the board are touched, calculated, or adjusted by hand in spreadsheets first?",
    options: [
      { label: "None", sub: "100% pulled directly from dashboards/systems", tier: 1, points: 10 },
      { label: "Under 25%", sub: "Minor formatting and cosmetic assembly only", tier: 2, points: 7 },
      { label: "25% – 75%", sub: "Heavy copy-pasting, VLOOKUPs, and manual tweaks", tier: 3, points: 3 },
      { label: "Over 75%", sub: "Almost entirely built and manipulated manually", tier: 4, points: 0 },
    ],
  },
  {
    id: 2, dimension: "Accurate", type: "scale_descending",
    question: "In the past 6 months, how often has a reported number or slide deck had to be re-sent or corrected after a leadership meeting?",
    options: [
      { label: "Almost every cycle", sub: "Re-issuing corrected decks is normal", tier: 4, points: 0 },
      { label: "Every month or two", sub: "Noticeable calculation errors slip through", tier: 3, points: 3 },
      { label: "Once or twice", sub: "Minor footnote or typo fixes only", tier: 2, points: 7 },
      { label: "Zero times", sub: "What gets presented stays final", tier: 1, points: 10 },
    ],
  },
  {
    id: 3, dimension: "Complete", type: "descriptive_shuffle",
    question: "Where does critical operational data (e.g. pipeline status, inventory, pricing, cost tracking) actually live?",
    options: [
      { label: "Central systems", sub: "Fully tracked in CRM, ERP, or warehouse", tier: 1, points: 10 },
      { label: "Mostly central", sub: "Some teams keep private side notes", tier: 2, points: 7 },
      { label: "Scattered", sub: "Key metrics sit in personal sheets or Slack", tier: 3, points: 3 },
      { label: "In people's heads", sub: "Lost forever if 2 key people leave", tier: 4, points: 0 },
    ],
  },
  {
    id: 4, dimension: "Complete", type: "scale_descending",
    question: "When leadership asks 'Why is this metric up or down?', how long does it take to pull the full breakdown?",
    options: [
      { label: "A week or more", sub: "Turns into an internal investigation", tier: 4, points: 0 },
      { label: "2 to 3 days", sub: "Manual multi-system stitching required", tier: 3, points: 3 },
      { label: "A few hours", sub: "Someone just runs and filters an export", tier: 2, points: 7 },
      { label: "Under 5 minutes", sub: "Instant drill-down on current tools", tier: 1, points: 10 },
    ],
  },
  {
    id: 5, dimension: "Consistent", type: "descriptive_shuffle",
    question: "Does your company have single, documented definitions for core KPIs (e.g. 'Active Customer', 'Gross Margin', 'Churn')?",
    options: [
      { label: "Centrally locked", sub: "Documented and coded across systems", tier: 1, points: 10 },
      { label: "Written down", sub: "But different teams still interpret loosely", tier: 2, points: 7 },
      { label: "Tribal knowledge", sub: "Unwritten; people assume definitions", tier: 3, points: 3 },
      { label: "No standard", sub: "Teams calculate the same metric differently", tier: 4, points: 0 },
    ],
  },
  {
    id: 6, dimension: "Consistent", type: "scale_descending",
    question: "How often do two different department heads show up to a meeting with conflicting numbers for the same thing?",
    options: [
      { label: "Every cycle", sub: "Discrepancies are an expected headache", tier: 4, points: 0 },
      { label: "Frequently", sub: "Meeting time is spent debating who is right", tier: 3, points: 3 },
      { label: "Rarely", sub: "Only if there's a clear cut-off timing difference", tier: 2, points: 7 },
      { label: "Never", sub: "All teams report off the same baseline", tier: 1, points: 10 },
    ],
  },
  {
    id: 7, dimension: "Timely", type: "scale_ascending",
    question: "How many calendar days after month-end until executive metrics and financials are locked and shared?",
    options: [
      { label: "5 days or less", sub: "Fast, repeatable close", tier: 1, points: 10 },
      { label: "6 to 10 days", sub: "Standard, predictable turnaround", tier: 2, points: 7 },
      { label: "11 to 20 days", sub: "Significant lag before visibility", tier: 3, points: 3 },
      { label: "21+ days", sub: "Or numbers are never officially locked", tier: 4, points: 0 },
    ],
  },
  {
    id: 8, dimension: "Timely", type: "scale_descending",
    question: "How old is the operational data managers look at when making day-to-day decisions?",
    options: [
      { label: "Monthly or older", sub: "Flying blind between cycles", tier: 4, points: 0 },
      { label: "Last week's data", sub: "Weekly summary cadences only", tier: 3, points: 3 },
      { label: "Yesterday's close", sub: "Refreshed nightly via batch", tier: 2, points: 7 },
      { label: "Real-time / Hourly", sub: "Live view of current business", tier: 1, points: 10 },
    ],
  },
  {
    id: 9, dimension: "Trusted", type: "scale_descending",
    question: "How common is it for managers to maintain private 'shadow' spreadsheets because they don't fully trust central dashboards?",
    options: [
      { label: "Universal", sub: "Official tools are ignored; private sheets run things", tier: 4, points: 0 },
      { label: "Common", sub: "Most managers maintain a side sheet to be safe", tier: 3, points: 3 },
      { label: "Isolated", sub: "1 or 2 niche teams do this for special cases", tier: 2, points: 7 },
      { label: "Practically zero", sub: "Official tools are the only reference", tier: 1, points: 10 },
    ],
  },
  {
    id: 10, dimension: "Trusted", type: "descriptive_shuffle",
    question: "Before leadership makes a major strategic bet, what happens to the underlying data?",
    options: [
      { label: "Accepted instantly", sub: "High confidence, zero audit drills", tier: 1, points: 10 },
      { label: "Quick gut check", sub: "Light verification, accepted quickly", tier: 2, points: 7 },
      { label: "Heavy audit", sub: "Days spent validating before trusting", tier: 3, points: 3 },
      { label: "Ignored", sub: "Calls are made on gut feel; data is suspect", tier: 4, points: 0 },
    ],
  },
];

export const FOCUS_COPY: Record<string, string> = {
  Accurate: "Numbers reaching leadership are being fixed by hand, so errors slip through. Start by finding where the manual edits happen.",
  Complete: "Key data sits outside your systems or takes days to pull together. Start by mapping where it actually lives.",
  Consistent: "Teams calculate the same metric in different ways. Start by writing down one definition for each of your top KPIs.",
  Timely: "Numbers arrive after the decisions they should inform. Start with how long your month-end close really takes.",
  Trusted: "People check or rebuild the numbers before they rely on them. Start by finding out why the official reports get second-guessed.",
};
