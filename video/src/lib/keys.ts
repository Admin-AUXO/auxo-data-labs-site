import { Easing, interpolate } from "remotion";

export type Vec3 = [number, number, number];

const ease = Easing.inOut(Easing.cubic);

export function track(frame: number, frames: number[], values: number[]): number {
  return interpolate(frame, frames, values, { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

export function track3(frame: number, frames: number[], values: Vec3[]): Vec3 {
  return [0, 1, 2].map((i) => track(frame, frames, values.map((v) => v[i]))) as Vec3;
}

export function ramp(frame: number, from: number, to: number): number {
  return interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}
