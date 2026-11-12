import type { Card, Dimension } from "./types";

export const CARDS: Card[] = [
  {
    id: 1, topic: "AI tools in use", dimension: "Tools", type: "scale_ascending",
    question: "How many AI tools do your teams use for work, paid for by the company or by staff?",
    options: [
      { label: "One or two", sub: "Chosen for the work", tier: 1, points: 10 },
      { label: "Three to five", sub: "Some overlap", tier: 2, points: 7 },
      { label: "Six or more", sub: "Several do the same job", tier: 3, points: 3 },
      { label: "Nobody knows", sub: "No list of what's in use", tier: 4, points: 0 },
    ],
  },
  {
    id: 2, topic: "How tools are chosen", dimension: "Tools", type: "scale_descending",
    question: "When a team wants a new AI tool, what happens?",
    options: [
      { label: "Personal accounts", sub: "Outside company control", tier: 4, points: 0 },
      { label: "Whoever wants it buys it", sub: "On a card or expenses", tier: 3, points: 3 },
      { label: "A manager signs off", sub: "A light check, then bought", tier: 2, points: 7 },
      { label: "Checked against a list", sub: "Fit, cost and data use reviewed", tier: 1, points: 10 },
    ],
  },
  {
    id: 3, topic: "AI and your data", dimension: "Data", type: "descriptive_shuffle",
    question: "Can your AI tools read the company data they need, like your CRM, files or accounts?",
    options: [
      { label: "Connected, with access rules", sub: "Each person sees what they may see", tier: 1, points: 10 },
      { label: "Partly connected", sub: "One or two sources", tier: 2, points: 7 },
      { label: "Copy and paste", sub: "People paste data into chats", tier: 3, points: 3 },
      { label: "Not at all", sub: "AI works without your data", tier: 4, points: 0 },
    ],
  },
  {
    id: 4, topic: "Teams with different numbers", dimension: "Data", type: "scale_descending",
    question: "How often do two teams bring different numbers for the same thing?",
    options: [
      { label: "Every meeting", sub: "Mismatches are expected", tier: 4, points: 0 },
      { label: "Often", sub: "Meetings become debates", tier: 3, points: 3 },
      { label: "Rarely", sub: "Only when dates differ", tier: 2, points: 7 },
      { label: "Never", sub: "One number for everyone", tier: 1, points: 10 },
    ],
  },
  {
    id: 5, topic: "Where AI work starts", dimension: "Set-up", type: "descriptive_shuffle",
    question: "How do people start a piece of AI work, like a proposal or a weekly report?",
    options: [
      { label: "From a shared set-up", sub: "Saved instructions and files", tier: 1, points: 10 },
      { label: "From shared prompts", sub: "Passed around in chat", tier: 2, points: 7 },
      { label: "From their own notes", sub: "Each person has their own", tier: 3, points: 3 },
      { label: "From a blank chat", sub: "Every time", tier: 4, points: 0 },
    ],
  },
  {
    id: 6, topic: "Bought, never set up", dimension: "Set-up", type: "scale_descending",
    question: "How many of the AI tools you pay for are set up and connected to how you work?",
    options: [
      { label: "None", sub: "Bought, then left", tier: 4, points: 0 },
      { label: "A few", sub: "Most sit half used", tier: 3, points: 3 },
      { label: "Most", sub: "One or two gaps", tier: 2, points: 7 },
      { label: "All of them", sub: "Each one set up and in use", tier: 1, points: 10 },
    ],
  },
  {
    id: 7, topic: "Weekly use", dimension: "Adoption", type: "scale_ascending",
    question: "What share of your team uses an approved AI tool every week?",
    options: [
      { label: "Over 75%", sub: "Part of normal work", tier: 1, points: 10 },
      { label: "25% to 75%", sub: "Some teams, not all", tier: 2, points: 7 },
      { label: "Under 25%", sub: "A few keen people", tier: 3, points: 3 },
      { label: "Almost none", sub: "Licences sit unused", tier: 4, points: 0 },
    ],
  },
  {
    id: 8, topic: "Who owns AI", dimension: "Adoption", type: "scale_descending",
    question: "Who is responsible for how your company uses AI?",
    options: [
      { label: "No one", sub: "Each team does its own thing", tier: 4, points: 0 },
      { label: "Whoever is keen", sub: "In their spare time", tier: 3, points: 3 },
      { label: "A named person", sub: "Alongside their main job", tier: 2, points: 7 },
      { label: "A named owner", sub: "With time and a budget", tier: 1, points: 10 },
    ],
  },
  {
    id: 9, topic: "What AI changed", dimension: "Measurement", type: "scale_descending",
    question: "Can you say what your AI tools changed last quarter, in time or money?",
    options: [
      { label: "No idea", sub: "Usage only, if that", tier: 4, points: 0 },
      { label: "A guess", sub: "Stories from a few people", tier: 3, points: 3 },
      { label: "For some tools", sub: "Measured once or twice", tier: 2, points: 7 },
      { label: "Yes, for each tool", sub: "Tied to numbers you report", tier: 1, points: 10 },
    ],
  },
  {
    id: 10, topic: "Checking AI output", dimension: "Measurement", type: "descriptive_shuffle",
    question: "Before AI output goes to a customer or the board, what happens?",
    options: [
      { label: "A named person approves it", sub: "Every time, and it's recorded", tier: 1, points: 10 },
      { label: "Someone usually checks", sub: "Not always recorded", tier: 2, points: 7 },
      { label: "Checked when there's time", sub: "Some goes out unread", tier: 3, points: 3 },
      { label: "Nothing", sub: "It goes out as written", tier: 4, points: 0 },
    ],
  },
];

export const FOCUS: Record<Dimension, { why: string; steps: string[]; good: string }> = {
  Tools: {
    why: "Teams pick their own AI tools, so you pay twice for the same job and nobody is sure where company data goes.",
    steps: [
      "List every AI tool in use, including personal accounts, with its cost and who uses it.",
      "Mark the tools that do the same job and choose one for each job.",
      "Move the team onto the chosen tools and close the rest before the next renewal.",
    ],
    good: "A short list of approved tools, each with an owner and a reason to keep it.",
  },
  Data: {
    why: "Your AI tools can't read the data they need, or the data disagrees, so answers come back generic or wrong.",
    steps: [
      "Pick the one source people paste into AI most, like the CRM or shared files.",
      "Agree one written definition for the three numbers AI will be asked about most.",
      "Connect one approved assistant to that source, with access that matches each person's role.",
    ],
    good: "AI answers from your own data, and its numbers match the ones finance reports.",
  },
  "Set-up": {
    why: "Everyone starts from a blank chat, so good work isn't shared and the tools you pay for sit half set up.",
    steps: [
      "Find the three tasks people use AI for most each week.",
      "Write one shared set-up for each: the instructions, the files it reads and who checks the result.",
      "Save them where the whole team starts, and retire the private copies.",
    ],
    good: "People start from shared set-ups, and anyone can repeat a good result.",
  },
  Adoption: {
    why: "AI use depends on a few keen people, so it stalls when they're busy and nobody owns it.",
    steps: [
      "Name one person who owns your AI tools and how they're used.",
      "Ask each team which weekly task they would hand to AI first.",
      "Run a 30-minute session per team on that one task, then check use a month later.",
    ],
    good: "Most of the team uses the approved tools every week, and one person owns them.",
  },
  Measurement: {
    why: "Usage is up but nobody can say what it changed, so renewals and new tools are guesswork.",
    steps: [
      "Pick one task AI helps with and time it today, before anything changes.",
      "Track the same task for a month, with the person who approves the output.",
      "Report the change next to a number leadership already reviews.",
    ],
    good: "Each AI tool is tied to a number you already report, and a person approves what goes out.",
  },
};
