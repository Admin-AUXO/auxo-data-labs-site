export type Dimension = "Accurate" | "Complete" | "Consistent" | "Timely" | "Trusted";
export type CardType = "scale_ascending" | "scale_descending" | "descriptive_shuffle";
export type Tier = 1 | 2 | 3 | 4;
export type Quadrant = "A" | "U" | "X" | "O";

export interface Option { label: string; sub: string; tier: Tier; points: 10 | 7 | 3 | 0; }
export interface Card { id: number; dimension: Dimension; type: CardType; question: string; options: Option[]; }

export interface Answer {
  tier: Tier | 5;            // 5 = I don't know
  points: number;            // 10 | 7 | 3 | 0, or 3 for IDK
  selectedQuadrant: Quadrant | null;
  isIdk: boolean;
}
export type Answers = Record<number, Answer>;
export type Layout = Record<number, Tier[]>; // per card: tiers in quadrant order A,U,X,O

export interface Band { min: number; name: "Healthy" | "Stable" | "Fragile" | "Critical"; line: string; }
export interface Result {
  total: number;
  dims: Record<Dimension, number>;      // 0–20 each
  radar: Record<Dimension, number>;     // 0–100 each
  weakest: Dimension;
  band: Band;
  idkCount: number;
}

export type Screen = "intro" | "quiz" | "loader" | "result" | "extended" | "inconclusive";

export interface State {
  screen: Screen;
  index: number;
  answers: Answers;
  layout: Layout;
  startedAt: string;
  attemptId: string;
}
