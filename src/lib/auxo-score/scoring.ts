import { CARDS } from "./cards";
import type { Answers, Band, Dimension, Layout, Result, Tier } from "./types";

export const DIMENSIONS: Dimension[] = ["Accurate", "Complete", "Consistent", "Timely", "Trusted"];
const TIE_ORDER: Dimension[] = ["Trusted", "Consistent", "Accurate", "Complete", "Timely"];
export const QUADS = ["A", "U", "X", "O"] as const;
export const IDK_POINTS = 3;
export const IDK_LIMIT = 3;

export const tone = (v: number) => (v >= 60 ? "ok" : v >= 40 ? "warn" : "crit");

export const BANDS: Band[] = [
  { min: 80, name: "Healthy", line: "Your data is ready for the decisions that matter." },
  { min: 60, name: "Stable", line: "Good foundations with a few blind spots." },
  { min: 40, name: "Fragile", line: "It works until someone asks a hard question." },
  { min: 0, name: "Critical", line: "Decisions are being made in the dark." },
];

export const idkCount = (a: Answers) => Object.values(a).filter(x => x.isIdk).length;

export function computeResult(answers: Answers): Result {
  const dims = Object.fromEntries(DIMENSIONS.map(d => [d, 0])) as Record<Dimension, number>;
  let total = 0;
  for (const card of CARDS) {
    const a = answers[card.id];
    if (!a) continue;
    dims[card.dimension] += a.points;
    total += a.points;
  }
  const min = Math.min(...DIMENSIONS.map(d => dims[d]));
  const weakest = TIE_ORDER.find(d => dims[d] === min)!;
  const band = BANDS.find(b => total >= b.min)!;
  const radar = Object.fromEntries(DIMENSIONS.map(d => [d, dims[d] * 5])) as Record<Dimension, number>;
  return { total, dims, radar, weakest, band, idkCount: idkCount(answers) };
}

function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildLayout(rng: () => number = Math.random): Layout {
  const layout: Layout = {};
  for (const c of CARDS) {
    if (c.type === "descriptive_shuffle") layout[c.id] = shuffle([1, 2, 3, 4] as Tier[], rng);
    else if (c.type === "scale_ascending") layout[c.id] = [1, 2, 3, 4];
    else layout[c.id] = [4, 3, 2, 1];
  }
  return layout;
}
