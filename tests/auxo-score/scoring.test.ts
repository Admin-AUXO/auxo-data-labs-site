import { describe, expect, it } from "vitest";
import { CARDS } from "../../src/lib/auxo-score/cards";
import { BANDS, DIMENSIONS, computeResult, idkCount } from "../../src/lib/auxo-score/scoring";
import type { Answer, Answers, Tier } from "../../src/lib/auxo-score/types";

const pts = { 1: 10, 2: 7, 3: 3, 4: 0 } as const;
const ans = (tier: Tier): Answer => ({ tier, points: pts[tier], selectedQuadrant: "A", isIdk: false });
const idk = (): Answer => ({ tier: 5, points: 3, selectedQuadrant: null, isIdk: true });
const all = (tier: Tier): Answers => Object.fromEntries(CARDS.map((c) => [c.id, ans(tier)]));
const byPoints = (p: number[]): Answers =>
  Object.fromEntries(CARDS.map((c, i) => [c.id, { tier: 1, points: p[i], selectedQuadrant: "A", isIdk: false } as Answer]));
const bandFor = (total: number) => BANDS.find((b) => total >= b.min)!.name;

describe("computeResult", () => {
  it("all tier 1 → 100, Healthy, weakest Trusted on tie", () => {
    const r = computeResult(all(1));
    expect(r.total).toBe(100);
    expect(r.band.name).toBe("Healthy");
    expect(r.weakest).toBe("Trusted");
  });

  it("all tier 4 → 0, Critical, weakest Trusted", () => {
    const r = computeResult(all(4));
    expect(r.total).toBe(0);
    expect(r.band.name).toBe("Critical");
    expect(r.weakest).toBe("Trusted");
  });

  it("mixed answers → 74 Stable", () => {
    const a: Answers = {};
    CARDS.forEach((c) => { a[c.id] = ans(c.id <= 4 ? 1 : c.id <= 8 ? 2 : 3); });
    const r = computeResult(a);
    expect(r.total).toBe(74);
    expect(r.band.name).toBe("Stable");
    expect(r.dims).toEqual({ Accurate: 20, Complete: 20, Consistent: 14, Timely: 14, Trusted: 6 });
    expect(r.weakest).toBe("Trusted");
  });

  it("band edges", () => {
    expect(bandFor(39)).toBe("Critical");
    expect(bandFor(40)).toBe("Fragile");
    expect(bandFor(59)).toBe("Fragile");
    expect(bandFor(60)).toBe("Stable");
    expect(bandFor(79)).toBe("Stable");
    expect(bandFor(80)).toBe("Healthy");
  });

  it("tie-break: Consistent beats Accurate", () => {
    const r = computeResult(byPoints([3, 0, 10, 10, 3, 0, 10, 10, 10, 10]));
    expect(r.weakest).toBe("Consistent");
  });

  it("tie-break: Complete beats Timely", () => {
    const r = computeResult(byPoints([10, 10, 3, 0, 10, 10, 3, 0, 10, 10]));
    expect(r.weakest).toBe("Complete");
  });

  it("radar values are dims × 5 within 0–100", () => {
    for (const tier of [1, 2, 3, 4] as Tier[]) {
      const r = computeResult(all(tier));
      for (const d of DIMENSIONS) {
        expect(r.radar[d]).toBe(r.dims[d] * 5);
        expect(r.radar[d]).toBeGreaterThanOrEqual(0);
        expect(r.radar[d]).toBeLessThanOrEqual(100);
        expect(Number.isInteger(r.radar[d])).toBe(true);
      }
    }
  });
});

describe("I don't know", () => {
  it("2 IDKs score normally at 3 each", () => {
    const a = all(1);
    a[1] = idk();
    a[2] = idk();
    expect(idkCount(a)).toBe(2);
    expect(computeResult(a).total).toBe(86);
  });

  it("3rd IDK reaches the limit, changing one back lowers the count", () => {
    const a = all(1);
    a[1] = idk();
    a[2] = idk();
    a[3] = idk();
    expect(idkCount(a)).toBe(3);
    a[2] = ans(2);
    expect(idkCount(a)).toBe(2);
  });
});
