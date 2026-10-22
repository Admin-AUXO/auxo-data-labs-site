import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import { Finish } from "../lib/Finish";
import { ramp } from "../lib/keys";
import { Callout, MAIN, makeCamera, project, useWorld, WorldStage, type WorldState } from "../lib/world";
import { color } from "../lib/theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CAM = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-3.6, 0.85, 8.6),
    new THREE.Vector3(-2.4, 1.25, 7.4),
    new THREE.Vector3(0.4, 2.9, 8.4),
    new THREE.Vector3(2.4, 4.2, 9.4),
    new THREE.Vector3(-4.6, 3.2, 10.6),
  ],
  true,
  "centripetal",
);
const AIM = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0.6, 0.35, 0),
    new THREE.Vector3(0.8, 0.45, -1),
    new THREE.Vector3(1.6, 1.0, -1.2),
    new THREE.Vector3(2.5, 1.8, -1.2),
    new THREE.Vector3(0.4, 0.4, 0.8),
  ],
  true,
  "centripetal",
);

function speed(f: number): number {
  const hold = interpolate(f, [250, 290, 345, 385], [0, 1, 1, 0], clamp);
  const settle = interpolate(f, [0, 40], [0.55, 1], clamp);
  return settle * (1 - hold * 0.88);
}

const PROFILE = (() => {
  const acc = [0];
  for (let f = 1; f <= 480; f++) acc.push(acc[f - 1] + speed(f));
  return acc.map((v) => v / acc[480]);
})();

export const Terrain: React.FC<{ audio?: boolean }> = ({ audio = false }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const group = useWorld();

  const u = PROFILE[Math.min(frame, 480)] % 1;
  const camPos = CAM.getPointAt(u);
  const tau = (frame / durationInFrames) * Math.PI * 2;
  const hold = interpolate(frame, [250, 285, 345, 380], [0, 1, 1, 0], clamp);
  const breath = 0.05 * (1 - hold);
  camPos.add(new THREE.Vector3((Math.sin(tau * 3 + 0.7) + 0.5 * Math.sin(tau * 7 + 2)) * breath, Math.sin(tau * 5 + 1.3) * breath * 0.6, Math.cos(tau * 4) * breath));
  const peakDist = camPos.distanceTo(new THREE.Vector3(...MAIN));
  const lit = ramp(frame, 215, 255) * (1 - ramp(frame, 388, 410));
  const state: WorldState = {
    camPos,
    aim: AIM.getPointAt(u),
    fov: 38 + 4 * Math.cos(u * Math.PI * 2),
    scan: interpolate(frame, [70, 245], [14, -14], clamp),
    rev: interpolate(frame, [392, 478], [-14, 14], clamp),
    focus: interpolate(frame, [0, 150, 245, 390, 470], [4.2, 5.5, peakDist, peakDist, 4.2], clamp),
    phase: (frame / durationInFrames) * Math.PI * 2,
    lit,
    rings: [0, 1].map((k) => (frame >= 240 + k * 30 ? ((frame - 240 - k * 30) % 60) / 60 : -1)),
    minors: [ramp(frame, 160, 200) * (1 - ramp(frame, 392, 420)), 0, 0, 0],
    wall: 0.45,
    sun: interpolate(frame, [0, 60, 150, 370, 420, 480], [0, 0.15, 1, 1, 0.25, 0], clamp),
  };
  const cam = makeCamera(state, width / height);
  const anchor = project([MAIN[0], MAIN[1] + 0.05, MAIN[2]], cam, width, height);
  const label = ramp(frame, 262, 292) * (1 - ramp(frame, 380, 398));

  return (
    <AbsoluteFill style={{ background: color.bg }}>
      <WorldStage group={group} state={state} width={width} height={height} />
      <Callout anchor={anchor} kicker="SIGNAL" title="Act here first" progress={label} line={false} dx={10} dy={-30} />
      <Finish grain={0.05} vignette={0.85 + hold * 0.1} />
      {audio && <Audio src={staticFile("score-hero.wav")} />}
    </AbsoluteFill>
  );
};
