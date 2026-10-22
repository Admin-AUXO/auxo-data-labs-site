import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";

export const fonts = {
  display: loadSora("normal", { weights: ["400", "600", "700"], subsets: ["latin"] }).fontFamily,
  mono: loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily,
  sans: loadJakarta("normal", { weights: ["400", "500", "600"], subsets: ["latin"] }).fontFamily,
};

export const color = {
  bg: "#050505",
  fg: "#f4f4f4",
  muted: "#9a9a9a",
  accent: "#a3e635",
  clay: "#e8995c",
};

export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
