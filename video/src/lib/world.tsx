import { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import * as THREE from "three";
import { GlowStage } from "./GlowStage";
import type { Vec3 } from "./keys";
import { color, fonts, rng } from "./theme";

const RES = 380;
const SPAN = 18;
const DUST = 1600;
export const PEAKS: [number, number, number, number][] = [
  [2.5, -1.5, 2.6, 3.0],
  [-3.2, 2.2, 1.5, 4.5],
  [-0.4, -4.8, 1.0, 2.4],
  [4.5, 4.0, 0.7, 3.5],
  [-5.5, -2.5, 0.9, 2.6],
];
export function orderHeight(x: number, z: number): number {
  let h = 0.3 * Math.sin(x * 0.8) * Math.cos(z * 0.6);
  for (const [px, pz, a, s] of PEAKS) h += a * Math.exp(-((x - px) ** 2 + (z - pz) ** 2) / s);
  return h;
}

export const SUN: Vec3 = [3.2, 1.7, -30];

export const MAIN: Vec3 = [PEAKS[0][0], orderHeight(PEAKS[0][0], PEAKS[0][1]), PEAKS[0][1]];

const shared = `
uniform float uPhase;
uniform float uScale;
uniform float uFocus;
uniform float uAperture;
uniform vec3 uSun;
uniform float uSunPower;
varying vec3 vColor;
varying float vAlpha;

float scatter(vec3 p) {
  vec3 v = normalize(p - cameraPosition);
  vec3 l = normalize(uSun - p);
  return pow(max(dot(v, l), 0.0), 7.0) * uSunPower;
}

float focusSize(float dist, out float soften) {
  float coc = clamp(abs(dist - uFocus) * uAperture, 0.0, 7.0);
  soften = 1.0 / (1.0 + coc * coc * 0.45);
  return 1.0 + coc;
}
`;

const terrainVertex = `
${shared}
uniform float uScan;
uniform float uRev;
attribute float aSeed;
attribute float aSize;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float order(vec2 q) {
  float h = 0.3 * sin(q.x * 0.8) * cos(q.y * 0.6);
  ${PEAKS.map(([x, z, a, s]) => `h += ${a.toFixed(2)} * exp(-(pow(q.x - (${x.toFixed(2)}), 2.0) + pow(q.y - (${z.toFixed(2)}), 2.0)) / ${s.toFixed(2)});`).join("\n  ")}
  return h;
}

void main() {
  vec2 q = position.xz;
  float s = aSeed * 6.2831853;
  float flick = 0.5 + 0.5 * sin(uPhase * 6.0 + s * 9.0);
  float chaos = (hash(q * 3.1) - 0.5) * 1.3 * (0.35 + 0.65 * flick) + (hash(q * 0.7 + 4.0) - 0.5) * 0.7;
  float h = order(q);
  float d = -q.y + q.x * 0.25;
  float t = smoothstep(uScan - 1.2, uScan + 1.2, d) * smoothstep(uRev - 1.6, uRev + 1.6, d);
  float band = exp(-pow((d - uScan) / 0.5, 2.0)) * step(-13.5, uScan) * step(uScan, 13.5);
  float wake = d > uScan ? exp(-(d - uScan) / 1.6) * 0.55 * step(uScan, 13.5) : 0.0;
  float ebb = exp(-pow((d - uRev) / 0.6, 2.0)) * step(-13.5, uRev) * step(uRev, 13.5);
  float y = mix(chaos, h, t) + band * 0.4;
  vec3 pos = vec3(q.x, y, q.y);

  float c = fract(h * 5.0);
  float line = 1.0 - smoothstep(0.0, 0.045, min(c, 1.0 - c));
  vec3 deep = vec3(0.02, 0.13, 0.11);
  vec3 lime = vec3(0.64, 0.90, 0.21);
  vec3 ordered = mix(deep, lime, smoothstep(0.0, 2.6, h)) * (0.7 + line * 2.3);
  ordered += vec3(1.0, 1.0, 0.88) * line * smoothstep(1.9, 2.6, h) * 0.55;
  ordered *= 1.0 + wake;
  float hn = hash(q * 5.0);
  vec3 noisy = hn > 0.82 ? vec3(0.95, 0.56, 0.3) * 0.75 : mix(vec3(0.36, 0.31, 0.27), vec3(0.42, 0.40, 0.38), hn);
  noisy *= 0.45 + 0.55 * flick;
  vec3 col = mix(noisy, ordered, t) + vec3(0.85, 1.0, 0.6) * band * 2.4 + vec3(0.91, 0.6, 0.36) * ebb * 0.5;

  col += vec3(0.95, 0.93, 0.62) * scatter(pos) * (0.3 + 0.7 * t) * 1.4;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float soften;
  float grow = focusSize(-mv.z, soften);
  gl_PointSize = aSize * uScale * grow * mix(1.0, 0.8 + line * 0.55, t) / -mv.z;
  vColor = col;
  vAlpha = soften * clamp(1.35 - (-mv.z) / 34.0, 0.0, 1.0) * smoothstep(9.2, 6.0, length(q));
}
`;

const dustVertex = `
${shared}
attribute float aSeed;
attribute float aSize;

void main() {
  float s = aSeed * 6.2831853;
  vec3 p = position + vec3(sin(uPhase + s * 3.0) * 0.5, sin(uPhase * 2.0 + s * 5.0) * 0.25, cos(uPhase + s * 7.0) * 0.5);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float soften;
  float grow = focusSize(-mv.z, soften);
  gl_PointSize = aSize * uScale * grow / -mv.z;
  vColor = mix(vec3(0.75, 0.78, 0.72), vec3(0.64, 0.9, 0.21), step(0.8, aSeed)) * 0.4;
  float sc = scatter(p);
  vColor += vec3(0.95, 0.92, 0.65) * sc * 0.8;
  vAlpha = soften * (0.35 + 0.65 * (0.5 + 0.5 * sin(uPhase * 3.0 + s * 4.0))) * (1.0 + sc * 0.5);
}
`;

const fragment = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = pow(smoothstep(0.5, 0.0, d), 1.4) * vAlpha;
  gl_FragColor = vec4(vColor * a, a);
}
`;

function pointsMaterial(vertexShader: string, extra: Record<string, THREE.IUniform>): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uPhase: { value: 0 },
      uScale: { value: 60 },
      uFocus: { value: 8 },
      uAperture: { value: 0.16 },
      uSun: { value: new THREE.Vector3(...SUN) },
      uSunPower: { value: 0 },
      ...extra,
    },
  });
}

function additive(c: string): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
}

function buildScene(): THREE.Group {
  const r = rng(23);
  const n = RES * RES;
  const pos = new Float32Array(n * 3);
  const seed = new Float32Array(n);
  const size = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = ((i % RES) / (RES - 1) - 0.5) * SPAN + (r() - 0.5) * 0.025;
    pos[i * 3 + 2] = (Math.floor(i / RES) / (RES - 1) - 0.5) * SPAN + (r() - 0.5) * 0.025;
    seed[i] = r();
    size[i] = 0.45 + r() * 0.4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  const terrain = new THREE.Points(geo, pointsMaterial(terrainVertex, { uScan: { value: 14 }, uRev: { value: -14 } }));
  terrain.frustumCulled = false;
  terrain.name = "terrain";

  const half = Math.ceil(RES / 2) ** 2;
  const lpos = new Float32Array(half * 3);
  const lseed = new Float32Array(half);
  const lsize = new Float32Array(half);
  let j = 0;
  for (let gz = 0; gz < RES; gz += 2) {
    for (let gx = 0; gx < RES; gx += 2) {
      const i = gz * RES + gx;
      lpos.set([pos[i * 3], 0, pos[i * 3 + 2]], j * 3);
      lseed[j] = seed[i];
      lsize[j] = size[i] * 2;
      j++;
    }
  }
  const lgeo = new THREE.BufferGeometry();
  lgeo.setAttribute("position", new THREE.BufferAttribute(lpos.subarray(0, j * 3), 3));
  lgeo.setAttribute("aSeed", new THREE.BufferAttribute(lseed.subarray(0, j), 1));
  lgeo.setAttribute("aSize", new THREE.BufferAttribute(lsize.subarray(0, j), 1));

  const dpos = new Float32Array(DUST * 3);
  const dseed = new Float32Array(DUST);
  const dsize = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    dpos.set([(r() * 2 - 1) * 9, 0.4 + r() * 7, -8 + r() * 20], i * 3);
    dseed[i] = r();
    dsize[i] = 0.5 + r() * 1.1;
  }
  const dgeo = new THREE.BufferGeometry();
  dgeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
  dgeo.setAttribute("aSeed", new THREE.BufferAttribute(dseed, 1));
  dgeo.setAttribute("aSize", new THREE.BufferAttribute(dsize, 1));
  const dust = new THREE.Points(dgeo, pointsMaterial(dustVertex, {}));
  dust.frustumCulled = false;
  dust.name = "dust";

  const group = new THREE.Group();
  group.add(terrain, dust);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 4.4, 1, 1),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uIntensity: { value: 0 } },
      vertexShader: "varying vec2 vUv; varying float vDepth; void main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }",
      fragmentShader:
        "uniform float uIntensity; varying vec2 vUv; varying float vDepth; void main() { float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x); float foot = smoothstep(0.0, 0.12, vUv.y); float near = smoothstep(2.5, 7.0, vDepth); float a = pow(1.0 - vUv.y, 2.6) * edge * foot * near * uIntensity; gl_FragColor = vec4(vec3(0.55, 0.85, 0.3) * a, a); }",
    }),
  );
  wall.rotation.y = -Math.atan2(0.25, 1);
  wall.name = "wall";
  group.add(wall);

  const seedDot = new THREE.Mesh(new THREE.SphereGeometry(0.013, 16, 16), additive("#c8f56a"));
  seedDot.position.set(MAIN[0], 0.26, MAIN[2]);
  seedDot.name = "seed";
  group.add(seedDot);

  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 9, 8, 1, true), additive(color.accent));
  beam.position.set(MAIN[0], MAIN[1] + 4.5, MAIN[2]);
  beam.name = "beam";
  const halo = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 9, 16, 1, true), additive(color.accent));
  halo.position.copy(beam.position);
  halo.name = "halo";
  group.add(halo);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 20), additive("#f4ffd9"));
  core.position.set(...MAIN);
  core.name = "core";
  group.add(beam, core);
  for (let k = 0; k < 2; k++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.309, 128), additive(color.accent));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(MAIN[0], MAIN[1] + 0.01, MAIN[2]);
    ring.name = `ring${k}`;
    group.add(ring);
  }
  PEAKS.slice(1).forEach(([x, z], k) => {
    const y = orderHeight(x, z);
    const mark = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.172, 64), additive("#cfe8a8"));
    mark.rotation.x = -Math.PI / 2;
    mark.position.set(x, y + 0.01, z);
    mark.name = `minor${k}`;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), mark.material);
    dot.position.set(x, y, z);
    group.add(mark, dot);
  });

  const glow = group.clone();
  (glow.getObjectByName("terrain") as THREE.Points).geometry = lgeo;
  group.userData.glow = glow;
  for (const name of ["terrain", "dust"]) {
    const m = (group.getObjectByName(name) as THREE.Points).material as THREE.ShaderMaterial;
    m.onBeforeRender = (renderer) => {
      m.uniforms.uScale.value = m.userData.base * (renderer.domElement.height / m.userData.height);
    };
  }
  return group;
}

export interface WorldState {
  camPos: THREE.Vector3;
  aim: THREE.Vector3;
  fov: number;
  scan: number;
  rev: number;
  focus: number;
  phase: number;
  lit: number;
  rings: number[];
  minors: number[];
  aperture?: number;
  seed?: number;
  warmth?: number;
  wall?: number;
  sun?: number;
  pulses?: number[];
}

export function useWorld(): THREE.Group {
  return useMemo(buildScene, []);
}

export function makeCamera(s: WorldState, aspect: number): THREE.PerspectiveCamera {
  const cam = new THREE.PerspectiveCamera(s.fov, aspect, 0.1, 120);
  cam.position.copy(s.camPos);
  cam.lookAt(s.aim);
  cam.updateMatrixWorld();
  return cam;
}

export function project(p: Vec3, cam: THREE.PerspectiveCamera, width: number, height: number): [number, number] {
  const v = new THREE.Vector3(...p).project(cam);
  return [((v.x + 1) / 2) * width, ((1 - v.y) / 2) * height];
}

export function peakTop(i: number): Vec3 {
  const [x, z] = PEAKS[i];
  return [x, orderHeight(x, z), z];
}

export function scanDistance(i: number): number {
  const [x, z] = PEAKS[i];
  return -z + x * 0.25;
}

function applyWorld(group: THREE.Group, s: WorldState, height: number): void {
  for (const name of ["terrain", "dust"]) {
    const m = (group.getObjectByName(name) as THREE.Points).material as THREE.ShaderMaterial;
    m.uniforms.uPhase.value = s.phase;
    m.userData.base = (name === "dust" ? 70 : 64) * (height / 1080);
    m.userData.height = height;
    m.uniforms.uFocus.value = s.focus;
    m.uniforms.uAperture.value = (name === "dust" ? 0.28 : 0.14) * (s.aperture ?? 1);
    m.uniforms.uSunPower.value = s.sun ?? 0;
    if (name === "terrain") {
      m.uniforms.uScan.value = s.scan;
      m.uniforms.uRev.value = s.rev;
    }
  }
  const mat = (name: string) => (group.getObjectByName(name) as THREE.Mesh).material as THREE.MeshBasicMaterial;
  mat("beam").opacity = s.lit * 0.85;
  mat("halo").opacity = s.lit * 0.12;
  mat("seed").opacity = s.seed ?? 0;
  const wall = group.getObjectByName("wall") as THREE.Mesh;
  const inRange = s.scan > -13 && s.scan < 13;
  wall.visible = inRange;
  wall.position.set(0, 2.0, -s.scan);
  (wall.material as THREE.ShaderMaterial).uniforms.uIntensity.value = inRange ? (s.wall ?? 0.95) : 0;
  mat("core").opacity = s.lit;
  s.rings.forEach((p, k) => {
    const ring = group.getObjectByName(`ring${k}`) as THREE.Mesh;
    ring.scale.setScalar(1 + Math.max(0, p) * 2.6);
    mat(`ring${k}`).opacity = p < 0 ? 0 : s.lit * (1 - p) * 0.5;
  });
  s.minors.forEach((o, k) => {
    const p = s.pulses?.[k] ?? -1;
    const ring = group.getObjectByName(`minor${k}`) as THREE.Mesh;
    ring.scale.setScalar(p >= 0 ? 1 + p * 4 : 1);
    mat(`minor${k}`).opacity = o * 0.65;
  });
}

function clampPct(v: number): number {
  return Math.max(0, Math.min(100, v));
}

function horizon(warmth: number, a: number): string {
  const r = Math.round(232 + (163 - 232) * warmth);
  const g = Math.round(153 + (230 - 153) * warmth);
  const b = Math.round(92 + (53 - 92) * warmth);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

export const Flare: React.FC<{ at: [number, number]; intensity: number; width: number; tint?: string }> = ({ at, intensity, width, tint = "163,230,53" }) => {
  if (intensity <= 0.002) return null;
  const [x, y] = at;
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: x - width * 0.45, top: y - 1.5, width: width * 0.9, height: 3, opacity: intensity, background: `linear-gradient(90deg, transparent, rgba(${tint},0.55) 35%, rgba(240,255,220,0.95) 50%, rgba(${tint},0.55) 65%, transparent)`, filter: "blur(1px)" }} />
      <div style={{ position: "absolute", left: x - width * 0.3, top: y - 10, width: width * 0.6, height: 20, opacity: intensity * 0.35, background: "linear-gradient(90deg, transparent, rgba(120,200,255,0.5), transparent)", filter: "blur(8px)" }} />
      <div style={{ position: "absolute", left: x - 90, top: y - 90, width: 180, height: 180, borderRadius: "50%", opacity: intensity * 0.6, background: `radial-gradient(circle, rgba(240,255,220,0.9), rgba(${tint},0.25) 30%, transparent 70%)` }} />
    </AbsoluteFill>
  );
};

const SunCore: React.FC<{ at: [number, number]; power: number; width: number; height: number }> = ({ at, power, width, height }) => {
  const x = (at[0] / width) * 100;
  const y = (at[1] / height) * 100;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${x}% ${y}%, rgba(255,252,225,${0.95 * power}) 0, rgba(225,245,170,${0.5 * power}) 2.5%, rgba(163,230,53,${0.16 * power}) 14%, transparent 40%)`,
      }}
    />
  );
};

const SunRays: React.FC<{ at: [number, number]; power: number; phase: number; width: number; height: number }> = ({ at, power, phase, width, height }) => {
  const x = (at[0] / width) * 100;
  const y = (at[1] / height) * 100;
  const rot = (phase * 180) / Math.PI / 6;
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", opacity: power * 0.55, pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background: `repeating-conic-gradient(from ${rot}deg at ${x}% ${y}%, rgba(235,250,200,0.16) 0deg 1.6deg, transparent 1.6deg 5.5deg, rgba(235,250,200,0.08) 5.5deg 6.4deg, transparent 6.4deg 11deg)`,
          WebkitMaskImage: `radial-gradient(circle at ${x}% ${y}%, black 0%, rgba(0,0,0,0.5) 22%, transparent 58%)`,
          maskImage: `radial-gradient(circle at ${x}% ${y}%, black 0%, rgba(0,0,0,0.5) 22%, transparent 58%)`,
          filter: "blur(5px)",
        }}
      />
    </AbsoluteFill>
  );
};

export const WorldStage: React.FC<{ group: THREE.Group; state: WorldState; width: number; height: number }> = ({ group, state, width, height }) => {
  applyWorld(group, state, height);
  const cam = makeCamera(state, width / height);
  const sunAt = project(SUN, cam, width, height);
  const [hx, hy] = (state.sun ?? 0) > 0.01 ? sunAt : project([0, 0, -40], cam, width, height);
  return (
    <>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #020807 0%, #04100d ${clampPct((hy / height) * 100 - 30)}%, #071410 ${clampPct((hy / height) * 100)}%, #050505 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 26% at ${(hx / width) * 100}% ${(hy / height) * 100}%, ${horizon(state.warmth ?? 1, 0.09 + state.lit * 0.05)}, transparent 72%)`,
        }}
      />
      {(state.sun ?? 0) > 0.01 && <SunCore at={sunAt} power={state.sun ?? 0} width={width} height={height} />}
      <GlowStage object={group} glowObject={group.userData.glow as THREE.Group} position={state.camPos.toArray() as Vec3} target={state.aim.toArray() as Vec3} fov={state.fov} glow={0.7} haze={0.38} />
      {(state.sun ?? 0) > 0.01 && <SunRays at={sunAt} power={state.sun ?? 0} phase={state.phase} width={width} height={height} />}
    </>
  );
};

export const Callout: React.FC<{
  anchor: [number, number];
  kicker: string;
  title: string;
  progress: number;
  scale?: number;
  dx?: number;
  dy?: number;
  line?: boolean;
}> = ({ anchor, kicker, title, progress, scale = 1, dx = 70, dy = -96, line = true }) => {
  if (progress <= 0) return null;
  const [ax, ay] = anchor;
  const bx = ax + dx * scale;
  const by = ay + dy * scale;
  const dir = Math.sign(dx) || 1;
  const tail = 46 * scale * dir;
  return (
    <>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", opacity: line ? progress : 0 }}>
        <polyline
          points={`${ax},${ay + (dy > 0 ? 14 : -14) * scale} ${bx},${by} ${bx + tail},${by}`}
          fill="none"
          stroke={color.accent}
          strokeOpacity={0.7}
          strokeWidth={1.2 * scale}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: dir > 0 ? bx + tail + 12 * scale : undefined,
          right: dir < 0 ? `calc(100% - ${bx + tail - 12 * scale}px)` : undefined,
          top: by - 26 * scale,
          opacity: progress,
          transform: `translateX(${(1 - progress) * -8 * dir}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: dir > 0 ? "flex-start" : "flex-end",
          gap: 6 * scale,
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 15 * scale, letterSpacing: "0.22em", color: color.accent }}>{kicker}</span>
        <span style={{ fontFamily: fonts.display, fontSize: 26 * scale, fontWeight: 600, color: color.fg, whiteSpace: "nowrap" }}>{title}</span>
      </div>
    </>
  );
};
