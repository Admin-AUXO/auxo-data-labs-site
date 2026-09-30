import { describe, expect, it } from "vitest";
import { CARDS } from "../../src/lib/auxo-score/cards";
import { buildLayout } from "../../src/lib/auxo-score/scoring";

function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

describe("buildLayout", () => {
  const layout = buildLayout(seeded(42));

  it("ascending cards are [1,2,3,4], descending [4,3,2,1]", () => {
    for (const c of CARDS) {
      if (c.type === "scale_ascending") expect(layout[c.id]).toEqual([1, 2, 3, 4]);
      if (c.type === "scale_descending") expect(layout[c.id]).toEqual([4, 3, 2, 1]);
    }
    expect(CARDS.filter((c) => c.type === "scale_ascending").map((c) => c.id)).toEqual([1, 7]);
    expect(CARDS.filter((c) => c.type === "scale_descending").map((c) => c.id)).toEqual([2, 4, 6, 8, 9]);
  });

  it("shuffle cards are a permutation of 1–4 and deterministic with a seed", () => {
    for (const id of [3, 5, 10]) {
      expect([...layout[id]].sort()).toEqual([1, 2, 3, 4]);
    }
    expect(buildLayout(seeded(42))).toEqual(layout);
  });
});
