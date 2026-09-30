import { DIMENSIONS } from "../../lib/auxo-score/scoring";
import type { Dimension } from "../../lib/auxo-score/types";

const CX = 180;
const CY = 172;
const R = 112;

const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / DIMENSIONS.length;
const pt = (i: number, v: number): [number, number] => [
  +(CX + Math.cos(angle(i)) * R * v / 100).toFixed(1),
  +(CY + Math.sin(angle(i)) * R * v / 100).toFixed(1),
];

/** Builds the inner markup of the 5-spoke radar (viewBox 0 0 360 330). Pure: no DOM access. */
export function radarSvg(radar: Record<Dimension, number>, weakest: Dimension): string {
  let s = "";
  for (const v of [25, 50, 75, 100]) {
    s += `<polygon class="ring" points="${DIMENSIONS.map((_, i) => pt(i, v).join(",")).join(" ")}"/>`;
    s += `<text class="tick" x="${CX + 4}" y="${(CY - R * v / 100 + 3).toFixed(1)}">${v}</text>`;
  }
  DIMENSIONS.forEach((_, i) => {
    const [x, y] = pt(i, 100);
    s += `<line class="spoke" x1="${CX}" y1="${CY}" x2="${x}" y2="${y}"/>`;
  });
  const vals = DIMENSIONS.map((d) => radar[d]);
  s += `<polygon class="area" points="${vals.map((v, i) => pt(i, v).join(",")).join(" ")}"/>`;
  vals.forEach((v, i) => {
    const [x, y] = pt(i, v);
    const d = DIMENSIONS[i];
    s += `<circle class="dot${d === weakest ? " weak" : ""}" cx="${x}" cy="${y}" r="5"><title>${d}: ${v}</title></circle>`;
  });
  DIMENSIONS.forEach((d, i) => {
    const [x, y] = pt(i, 122);
    const c = Math.cos(angle(i));
    const anchor = Math.abs(c) < 0.2 ? "middle" : c > 0 ? "start" : "end";
    const dy = i === 0 ? -14 : Math.sin(angle(i)) > 0.5 ? 10 : 0;
    s += `<text class="axis-lbl" x="${x}" y="${y + dy}" text-anchor="${anchor}">${d}</text>`;
    s += `<text class="axis-val" x="${x}" y="${y + dy + 14}" text-anchor="${anchor}">${vals[i]}</text>`;
  });
  return s;
}

export const radarLabel = (radar: Record<Dimension, number>) =>
  `Radar chart of dimension scores out of 100: ${DIMENSIONS.map((d) => `${d} ${radar[d]}`).join(", ")}.`;
