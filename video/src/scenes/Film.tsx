import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import cues from "../cues.json";
import { Finish } from "../lib/Finish";
import { ramp, type Vec3 } from "../lib/keys";
import { color, fonts } from "../lib/theme";
import { Flare, MAIN, makeCamera, project, SUN, useWorld, WorldStage, type WorldState } from "../lib/world";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const out = Easing.out(Easing.cubic);
const C = cues.film;
const BAR = 138;
const SEED: Vec3 = [MAIN[0], 0.26, MAIN[2]];

const PILLARS = [
  { letter: "A", title: "Trusted data" },
  { letter: "U", title: "Clear reporting" },
  { letter: "X", title: "Reliable automation" },
  { letter: "O", title: "Confident compliance" },
];

interface Knot {
  f: number;
  pos: Vec3;
  aim: Vec3;
  fov: number;
  aperture?: number;
  focus?: Vec3;
}

const MOVE_A: Knot[] = [
  { f: 0, pos: [2.32, 0.3, -0.22], aim: SEED, fov: 62, aperture: 2.6, focus: SEED },
  { f: 70, pos: [2.18, 0.36, 0.2], aim: SEED, fov: 58, aperture: 2.4, focus: SEED },
  { f: 180, pos: [1.0, 0.9, 4.6], aim: [2.4, 0.35, -1.6], fov: 44, aperture: 1.3, focus: SEED },
  { f: 300, pos: [-1.8, 1.1, 6.6], aim: [1.4, 0.4, -2.2], fov: 38, aperture: 1 },
  { f: C.beat, pos: [-2.2, 1.2, 6.9], aim: [0.8, 1.7, -9], fov: 38, aperture: 1 },
];

const MOVE_B: Knot[] = [
  { f: C.ignite, pos: [0, 1.0, 9.8], aim: [1.2, 0.9, -8], fov: 40 },
  { f: 470, pos: [0.2, 1.0, 8.4], aim: [1.2, 0.8, -7], fov: 40 },
  { f: 570, pos: [-0.3, 1.3, 5.6], aim: [0.8, 0.8, -4], fov: 42 },
  { f: 680, pos: [-0.8, 3.6, 6.4], aim: [0.4, 0.8, -1], fov: 44 },
  { f: 790, pos: [-2.2, 8.2, 10.2], aim: [-0.2, 0.3, 0.9], fov: 46 },
  { f: 960, pos: [0.8, 8.0, 10.0], aim: [0.1, 0.3, 0.7], fov: 44 },
  { f: 1060, pos: [2.5, 1.65, 4.9], aim: [2.5, 3.4, -1.5], fov: 42 },
  { f: 1300, pos: [2.5, 1.72, 4.5], aim: [2.5, 3.45, -1.5], fov: 41 },
  { f: 1395, pos: [2.3, 4.0, 2.4], aim: [2.5, 5.2, -1.5], fov: 50 },
  { f: 1600, pos: [0.5, 12, 1.6], aim: [0.4, 0, -0.3], fov: 46 },
  { f: C.frames, pos: [0.5, 11.3, 1.4], aim: [0.4, 0, -0.3], fov: 46 },
];

interface Move {
  knots: Knot[];
  cam: THREE.CatmullRomCurve3;
  aim: THREE.CatmullRomCurve3;
  timing: Map<number, number>;
}

function buildMove(knots: Knot[], window = 40): Move {
  const v = (p: Vec3) => new THREE.Vector3(...p);
  const first = knots[0].f;
  const last = knots[knots.length - 1].f;
  const raw: number[] = [];
  for (let f = first; f <= last; f++) {
    raw.push(interpolate(f, knots.map((k) => k.f), knots.map((_, i) => i / (knots.length - 1)), clamp));
  }
  const timing = new Map<number, number>();
  raw.forEach((_, j) => {
    let sum = 0;
    let n = 0;
    for (let k = -window; k <= window; k++) {
      sum += raw[Math.min(raw.length - 1, Math.max(0, j + k))];
      n++;
    }
    timing.set(first + j, sum / n);
  });
  return {
    knots,
    cam: new THREE.CatmullRomCurve3(knots.map((k) => v(k.pos)), false, "centripetal"),
    aim: new THREE.CatmullRomCurve3(knots.map((k) => v(k.aim)), false, "centripetal"),
    timing,
  };
}

const A = buildMove(MOVE_A);
const B = buildMove(MOVE_B);

function sample(move: Move, frame: number) {
  const t = move.timing.get(frame) ?? (frame < move.knots[0].f ? 0 : 1);
  const idx = t * (move.knots.length - 1);
  const i0 = Math.floor(Math.min(idx, move.knots.length - 1.0001));
  const fr = idx - i0;
  const a = move.knots[i0];
  const b = move.knots[i0 + 1];
  const mix = (x: number, y: number) => x + (y - x) * fr;
  const camPos = move.cam.getPoint(t);
  const aim = move.aim.getPoint(t);
  const fa = new THREE.Vector3(...(a.focus ?? a.aim));
  const fb = new THREE.Vector3(...(b.focus ?? b.aim));
  const focusDist = mix(camPos.distanceTo(fa), camPos.distanceTo(fb));
  return {
    camPos,
    aim,
    fov: mix(a.fov, b.fov),
    aperture: mix(a.aperture ?? 1, b.aperture ?? 1),
    focus: a.focus || b.focus ? focusDist : camPos.distanceTo(aim),
  };
}

function tokens(text: string): { word: string; tone: "plain" | "lime" | "clay" }[] {
  return text.split(" ").map((w) => {
    if (w.startsWith("*")) return { word: w.replace(/\*/g, ""), tone: "lime" };
    if (w.startsWith("~")) return { word: w.replace(/~/g, ""), tone: "clay" };
    return { word: w, tone: "plain" };
  });
}

const TONE = { plain: color.fg, lime: color.accent, clay: color.clay };

const Words: React.FC<{ text: string; from: number; to: number; size: number; align?: "left" | "center"; stagger?: number }> = ({ text, from, to, size, align = "left", stagger = 3 }) => {
  const frame = useCurrentFrame();
  const list = tokens(text);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", gap: "0 0.27em", fontSize: size, lineHeight: 1.12 }}>
      {list.map((t, i) => {
        const enter = interpolate(frame, [from + i * stagger, from + i * stagger + 20], [0, 1], { ...clamp, easing: out });
        const exit = interpolate(frame, [to - 16 + i * 1.5, to + i * 1.5], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
        const y = (1 - enter) * 105 - exit * 105;
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${y}%)`,
                fontFamily: fonts.display,
                fontWeight: 600,
                letterSpacing: "-0.026em",
                color: TONE[t.tone],
                textShadow: t.tone === "lime" ? "0 0 28px rgba(163,230,53,0.45)" : t.tone === "clay" ? "0 0 24px rgba(232,153,92,0.35)" : "0 2px 30px rgba(0,0,0,0.65)",
              }}
            >
              {t.word}
            </span>
          </span>
        );
      })}
    </div>
  );
};

const Line: React.FC<{ text: string; parts: number[]; to: number }> = ({ text, parts, to }) => {
  const frame = useCurrentFrame();
  const from = parts[0];
  if (frame < from - 6 || frame > to + 24) return null;
  const rule = interpolate(frame, [from - 6, from + 18], [0, 1], { ...clamp, easing: out }) * (1 - ramp(frame, to - 10, to + 6));
  return (
    <div style={{ position: "absolute", left: 150, bottom: BAR + 70, maxWidth: 1640, display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ width: 64 * rule, height: 2, background: color.accent, opacity: rule }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {text.split("|").map((seg, i) => (
          <Words key={i} text={seg} from={parts[i] ?? parts[parts.length - 1] + i * 10} to={to + i * 4} size={68} />
        ))}
      </div>
    </div>
  );
};

const PillarList: React.FC = () => {
  const frame = useCurrentFrame();
  const first = C.pillars[0].at;
  if (frame < first - 4 || frame > C.pillarsOut + 40) return null;
  return (
    <div style={{ position: "absolute", left: 150, bottom: BAR + 70, display: "flex", flexDirection: "column", gap: 18 }}>
      {C.pillars.map((pl, n) => {
        const enter = interpolate(frame, [pl.at, pl.at + 18], [0, 1], { ...clamp, easing: out });
        const exit = interpolate(frame, [C.pillarsOut + n * 3, C.pillarsOut + 18 + n * 3], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
        const active = 1 - ramp(frame, pl.at + 40, pl.at + 70);
        return (
          <div key={pl.peak} style={{ display: "flex", alignItems: "center", gap: 22, overflow: "hidden", height: 62 }}>
            <div
              style={{
                width: 46,
                height: 46,
                flex: "none",
                background: color.accent,
                color: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 26,
                transform: `scale(${enter * (1 - exit)})`,
                boxShadow: `0 0 ${18 + active * 30}px rgba(163,230,53,${0.35 + active * 0.4})`,
              }}
            >
              {PILLARS[n].letter}
            </div>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - enter) * 105 - exit * 105}%)`,
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 50,
                letterSpacing: "-0.022em",
                color: active > 0.2 ? color.fg : "rgba(244,244,244,0.62)",
                textShadow: "0 2px 30px rgba(0,0,0,0.65)",
              }}
            >
              {PILLARS[n].title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Final: React.FC = () => {
  const frame = useCurrentFrame();
  const s = C.final;
  if (frame < s - 10) return null;
  const tag = ramp(frame, s + 70, s + 100);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: -10 }}>
        <Words text="Trusted data." from={s} to={C.frames + 60} size={96} align="center" stagger={4} />
        <Words text="Decisions you can *defend.*" from={s + 18} to={C.frames + 60} size={96} align="center" stagger={4} />
        <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 18, opacity: tag, fontFamily: fonts.mono, fontSize: 23, letterSpacing: "0.34em", color: "rgba(244,244,244,0.82)" }}>
          <div style={{ width: 40 * tag, height: 1, background: color.accent }} />
          ANALYTICS &amp; AI FOR GULF BUSINESSES
          <div style={{ width: 40 * tag, height: 1, background: color.accent }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Film: React.FC<{ audio?: boolean }> = ({ audio = true }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const group = useWorld();

  const inA = frame < C.ignite;
  const cam0 = inA ? sample(A, Math.min(frame, C.beat)) : sample(B, frame);
  const breath = (inA ? 0.02 : 0.05) * (1 - interpolate(frame, [1030, 1062, 1300, 1330], [0, 1, 1, 0], clamp));
  cam0.camPos.add(
    new THREE.Vector3(
      (Math.sin(frame * 0.031 + 0.7) + 0.5 * Math.sin(frame * 0.071 + 2)) * breath,
      Math.sin(frame * 0.027 + 1.3) * breath * 0.6,
      Math.cos(frame * 0.023) * breath,
    ),
  );
  const lit = ramp(frame, C.lit, C.lit + 10) * (1 - ramp(frame, C.litOut - 20, C.litOut + 30));
  const pillarIn = (at: number) => ramp(frame, at, at + 26) * (1 - ramp(frame, C.pillarsOut, C.pillarsOut + 25));
  const minors = [0, 0, 0, 0];
  C.pillars.forEach((pl) => {
    minors[pl.peak - 1] = pillarIn(pl.at - 12);
  });

  const state: WorldState = {
    camPos: cam0.camPos,
    aim: cam0.aim,
    fov: cam0.fov,
    scan: interpolate(frame, C.scan, [14, -14], clamp),
    rev: -14,
    focus: cam0.focus,
    phase: (frame / 480) * Math.PI * 2,
    lit,
    rings: [0, 1].map((n) => {
      const s = C.rings + n * (C.ringPeriod / 2);
      return frame >= s && frame < C.litOut ? ((frame - s) % C.ringPeriod) / C.ringPeriod : -1;
    }),
    minors,
    aperture: cam0.aperture,
    seed: inA ? ramp(frame, C.seed, C.seed + 20) : 0,
    warmth: interpolate(frame, [C.ignite, C.scan[1]], [0, 1], clamp),
    sun: inA ? 0 : interpolate(frame, [C.ignite, C.ignite + 70, 1000, 1060, 1300, 1395, 1600, C.frames], [0, 1, 1, 0.22, 0.22, 0.6, 0.45, 0.4], clamp),
    pulses: (() => {
      const p = [-1, -1, -1, -1];
      C.pillars.forEach((pl) => {
        const k = (frame - pl.at) / 45;
        p[pl.peak - 1] = k >= 0 && k <= 1 ? k : -1;
      });
      return p;
    })(),
  };

  const cam = makeCamera(state, width / height);
  const open = ramp(frame, 0, 24);
  const beat = inA ? 1 - ramp(frame, C.beat - 16, C.beat) : ramp(frame, C.ignite, C.ignite + 10);
  const fade = 1 - ramp(frame, C.fadeOut, C.frames - 2);
  const ignite = interpolate(frame, [C.ignite, C.ignite + 8, C.ignite + 90, 520], [0, 1, 0.3, 0], clamp);
  const horizonAt = project(SUN, cam, width, height);
  const seedAt = project(SEED, cam, width, height);
  const seedGlow = inA ? ramp(frame, C.seed, C.seed + 24) * (1 - ramp(frame, 150, 250)) : 0;
  const coreAt = project([MAIN[0], MAIN[1] + 0.06, MAIN[2]], cam, width, height);
  const strike = interpolate(frame, [C.lit, C.lit + 4, C.lit + 50, C.litOut - 20, C.litOut + 20], [0, 1.3, 0.45, 0.45, 0], clamp);
  const flash = interpolate(frame, [C.lit, C.lit + 3, C.lit + 26], [0, 0.3, 0], clamp);
  const wash = interpolate(frame, [585, 600, 625], [0, 0.22, 0], clamp);
  const white = interpolate(frame, [1350, 1394, 1414, 1458], [0, 0.92, 0.92, 0], clamp);
  const finalDim = ramp(frame, 1412, 1462) * 0.55;

  return (
    <AbsoluteFill style={{ background: color.bg }}>
      <AbsoluteFill style={{ opacity: open * beat * fade }}>
        <WorldStage group={group} state={state} width={width} height={height} />
        <Flare at={horizonAt} intensity={ignite} width={width * 1.15} />
        {seedGlow > 0 && (
          <AbsoluteFill
            style={{
              background: `radial-gradient(circle at ${(seedAt[0] / width) * 100}% ${(seedAt[1] / height) * 100}%, transparent 0, transparent 8%, rgba(3,4,3,${0.62 * seedGlow}) 38%)`,
            }}
          />
        )}
        {seedGlow > 0 && (
          <AbsoluteFill
            style={{
              background: `radial-gradient(circle at ${(seedAt[0] / width) * 100}% ${(seedAt[1] / height) * 100}%, rgba(245,255,220,${seedGlow}) 0, rgba(200,245,120,${0.75 * seedGlow}) 0.9%, rgba(163,230,53,${0.28 * seedGlow}) 3.5%, transparent 11%)`,
              mixBlendMode: "screen",
            }}
          />
        )}
        {!inA && frame >= C.lit && <Flare at={coreAt} intensity={strike} width={width * 1.1} />}
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(163,230,53,0.0), rgba(163,230,53,0.35))", opacity: wash, mixBlendMode: "screen" }} />
        <AbsoluteFill style={{ background: "radial-gradient(circle at 60% 30%, rgba(230,255,200,1), rgba(163,230,53,0.3) 40%, transparent 75%)", opacity: flash, mixBlendMode: "screen" }} />
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 44%, rgba(253,255,248,1), rgba(238,248,226,0.97) 40%, rgba(212,232,196,0.94) 85%)`,
            opacity: white,
          }}
        />
        <AbsoluteFill style={{ background: "#030504", opacity: finalDim }} />
        <PillarList />
        {C.lines.map((l) => (
          <Line key={l.id} text={l.text} parts={l.parts} to={l.out} />
        ))}
        <Final />
        <Finish grain={0.055} vignette={interpolate(frame, [1030, 1070, 1290, 1340], [0.75, 0.96, 0.96, 0.75], clamp)} />
      </AbsoluteFill>
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: BAR, background: "#000" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: BAR, background: "#000" }} />
      </AbsoluteFill>
      {audio && <Audio src={staticFile("score-film.wav")} />}
    </AbsoluteFill>
  );
};
