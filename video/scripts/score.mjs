import fs from "node:fs";

const cues = JSON.parse(fs.readFileSync(new URL("../src/cues.json", import.meta.url), "utf8"));
const SR = 48000;
const FPS = cues.fps;
const sec = (f) => f / FPS;
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function env(points) {
  return (t) => {
    if (t <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      const [t1, v1] = points[i];
      const [t0, v0] = points[i - 1];
      if (t <= t1) {
        const k = (t - t0) / (t1 - t0);
        const s = k * k * (3 - 2 * k);
        return v0 + (v1 - v0) * s;
      }
    }
    return points[points.length - 1][1];
  };
}

class Biquad {
  constructor() {
    this.x1 = this.x2 = this.y1 = this.y2 = 0;
    this.b0 = 1;
    this.b1 = this.b2 = this.a1 = this.a2 = 0;
  }
  set(type, f, q) {
    const w = (2 * Math.PI * Math.min(f, SR * 0.45)) / SR;
    const c = Math.cos(w);
    const al = Math.sin(w) / (2 * q);
    const a0 = 1 + al;
    if (type === "bp") {
      this.b0 = al / a0;
      this.b1 = 0;
      this.b2 = -al / a0;
    } else if (type === "lp") {
      this.b0 = (1 - c) / 2 / a0;
      this.b1 = (1 - c) / a0;
      this.b2 = (1 - c) / 2 / a0;
    } else {
      this.b0 = (1 + c) / 2 / a0;
      this.b1 = -(1 + c) / a0;
      this.b2 = (1 + c) / 2 / a0;
    }
    this.a1 = (-2 * c) / a0;
    this.a2 = (1 - al) / a0;
  }
  run(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y2 = this.y1;
    this.y1 = y;
    return y;
  }
}

function reverb(inL, inR, { room = 0.86, damp = 0.32 } = {}) {
  const k = SR / 44100;
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617];
  const alls = [556, 441, 341, 225];
  const run = (input, spread) => {
    const out = new Float32Array(input.length);
    const cs = combs.map((d) => ({ buf: new Float32Array(Math.round((d + spread) * k)), i: 0, store: 0 }));
    const as = alls.map((d) => ({ buf: new Float32Array(Math.round((d + spread) * k)), i: 0 }));
    for (let n = 0; n < input.length; n++) {
      const x = input[n] * 0.015;
      let y = 0;
      for (const c of cs) {
        const o = c.buf[c.i];
        c.store = o * (1 - damp) + c.store * damp;
        c.buf[c.i] = x + c.store * room;
        c.i = (c.i + 1) % c.buf.length;
        y += o;
      }
      for (const a of as) {
        const o = a.buf[a.i];
        a.buf[a.i] = y + o * 0.5;
        a.i = (a.i + 1) % a.buf.length;
        y = o - y;
      }
      out[n] = y;
    }
    return out;
  };
  return [run(inL, 0), run(inR, 23)];
}

function makeBus(seconds) {
  const n = Math.ceil(seconds * SR);
  return { L: new Float32Array(n), R: new Float32Array(n), n };
}

function bell(bus, t0, midi, amp, decay = 3.2, pan = 0) {
  const f = mtof(midi);
  const parts = [
    [1, 1],
    [2.0, 0.45],
    [2.76, 0.32],
    [4.07, 0.18],
    [5.4, 0.1],
  ];
  const start = Math.floor(t0 * SR);
  const len = Math.min(bus.n - start, Math.floor(decay * 5 * SR));
  const gl = Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const att = Math.min(1, t / 0.004);
    let s = 0;
    for (const [r, a] of parts) s += a * Math.sin(2 * Math.PI * f * r * t) * Math.exp((-t * (1 + r * 0.6)) / decay);
    s *= amp * att;
    bus.L[start + i] += s * gl;
    bus.R[start + i] += s * gr;
  }
}

function boom(bus, t0, amp, f0 = 72, f1 = 36, len = 2.4) {
  const start = Math.floor(t0 * SR);
  let ph = 0;
  for (let i = 0; i < Math.min(bus.n - start, len * SR); i++) {
    const t = i / SR;
    const f = f1 + (f0 - f1) * Math.exp(-t * 4);
    ph += (2 * Math.PI * f) / SR;
    const s = Math.sin(ph) * Math.exp(-t * 1.6) * Math.min(1, t / 0.01) * amp;
    bus.L[start + i] += s;
    bus.R[start + i] += s;
  }
}

function thump(bus, t0, amp) {
  boom(bus, t0, amp, 62, 44, 0.6);
  boom(bus, t0 + 0.22, amp * 0.6, 58, 42, 0.5);
}

function shimmer(bus, from, to, notes, amp) {
  const a = Math.floor(from * SR);
  const b = Math.min(bus.n, Math.floor((to + 3) * SR));
  for (let i = a; i < b; i++) {
    const t = i / SR;
    const e = Math.min(1, (t - from) / 2.2) * (t > to ? Math.max(0, 1 - (t - to) / 3) : 1);
    notes.forEach((m, k) => {
      const f = mtof(m);
      const trem = 0.75 + 0.25 * Math.sin(2 * Math.PI * (0.5 + k * 0.17) * t);
      const s = Math.sin(2 * Math.PI * f * t + k) * trem * e * amp;
      bus.L[i] += s * (k % 2 ? 0.6 : 1);
      bus.R[i] += s * (k % 2 ? 1 : 0.6);
    });
  }
}

function pad(bus, chords, bright, level, loopSeconds) {
  const detunes = [-7, 0, 7];
  const pans = [-0.7, 0, 0.7];
  for (let i = 0; i < bus.n; i++) {
    const t = i / SR;
    const tl = loopSeconds ? t % loopSeconds : t;
    const br = bright(tl);
    let l = 0;
    let r = 0;
    for (const c of chords) {
      const w = c.w(tl);
      if (w < 0.0005) continue;
      c.notes.forEach((m, k) => {
        const base = mtof(m);
        detunes.forEach((d, j) => {
          const f = base * 2 ** (d / 1200);
          let s = 0;
          let a = 1;
          for (let p = 1; p <= 6; p++) {
            s += (a / p) * Math.sin(2 * Math.PI * f * p * t + k * 1.7 + j);
            a *= br;
          }
          const breathe = 0.8 + 0.2 * Math.sin(2 * Math.PI * (1 / 16) * (k + 1) * tl + j);
          s *= w * breathe;
          const pl = Math.cos(((pans[j] + 1) * Math.PI) / 4);
          const pr = Math.sin(((pans[j] + 1) * Math.PI) / 4);
          l += s * pl;
          r += s * pr;
        });
      });
    }
    const g = level(tl) * 0.034;
    bus.L[i] += l * g;
    bus.R[i] += r * g;
  }
}

function staticNoise(bus, level, seed, loopSeconds) {
  const r = rng(seed);
  const bpL = new Biquad();
  const bpR = new Biquad();
  bpL.set("bp", 2600, 0.6);
  bpR.set("bp", 3100, 0.6);
  const hp = new Biquad();
  hp.set("hp", 900, 0.7);
  let crackle = 0;
  for (let i = 0; i < bus.n; i++) {
    const t = i / SR;
    const g = level(loopSeconds ? t % loopSeconds : t);
    if (r() < 0.0011) crackle = (r() * 2 - 1) * (0.4 + r() * 0.6);
    crackle *= 0.985;
    const c = hp.run(crackle);
    bus.L[i] += (bpL.run(r() * 2 - 1) * 0.05 + c * 0.11) * g;
    bus.R[i] += (bpR.run(r() * 2 - 1) * 0.05 + c * 0.09) * g;
  }
}

function riser(bus, from, to, amp, seed) {
  const r = rng(seed);
  const fl = new Biquad();
  const fr = new Biquad();
  const a = Math.floor((from - 1) * SR);
  const b = Math.min(bus.n, Math.floor((to + 1.5) * SR));
  for (let i = Math.max(0, a); i < b; i++) {
    const t = i / SR;
    const p = Math.min(1, Math.max(0, (t - from) / (to - from)));
    if (i % 64 === 0) {
      fl.set("bp", 250 * 10 ** (1.25 * p), 3.5);
      fr.set("bp", 270 * 10 ** (1.25 * p), 3.5);
    }
    const e = Math.min(1, Math.max(0, (t - from + 1) / 2)) * (0.35 + 0.65 * p) * (t > to ? Math.max(0, 1 - (t - to) / 1.5) : 1);
    bus.L[i] += fl.run(r() * 2 - 1) * e * amp;
    bus.R[i] += fr.run(r() * 2 - 1) * e * amp;
  }
}

function writeWav(path, L, R, seconds, wrap) {
  const n = Math.round(seconds * SR);
  const outL = new Float32Array(n);
  const outR = new Float32Array(n);
  for (let i = 0; i < L.length; i++) {
    const j = wrap ? i % n : i;
    if (!wrap && i >= n) break;
    outL[j] += L[i];
    outR[j] += R[i];
  }
  let peak = 0;
  for (let i = 0; i < n; i++) {
    outL[i] = Math.tanh(outL[i] * 1.2);
    outR[i] = Math.tanh(outR[i] * 1.2);
    peak = Math.max(peak, Math.abs(outL[i]), Math.abs(outR[i]));
  }
  const norm = 0.89 / peak;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    const fadeIn = wrap ? 1 : Math.min(1, i / (SR * 0.05));
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, outL[i] * norm * fadeIn)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, outR[i] * norm * fadeIn)) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(path, buf);
  console.log(`${path}  ${seconds}s  peak-normalised`);
}

function mix(dry, send, seconds, wrap, path) {
  const [wl, wr] = reverb(send.L, send.R);
  const L = new Float32Array(dry.n);
  const R = new Float32Array(dry.n);
  for (let i = 0; i < dry.n; i++) {
    L[i] = dry.L[i] + send.L[i] * 0.55 + wl[i] * 0.9;
    R[i] = dry.R[i] + send.R[i] * 0.55 + wr[i] * 0.9;
  }
  writeWav(path, L, R, seconds, wrap);
}

const DM9 = [38, 45, 53, 57, 64];
const BB9 = [34, 41, 50, 57, 60];
const DADD9 = [38, 45, 54, 57, 64];
const G9 = [38, 43, 50, 54, 57];

function film() {
  const F = cues.film;
  const len = sec(F.frames);
  const dry = makeBus(len + 6);
  const send = makeBus(len + 6);
  const scan0 = sec(F.scan[0]);
  const scan1 = sec(F.scan[1]);
  const lit = sec(F.lit);
  const litOut = sec(F.litOut);
  const endCard = sec(F.final);
  const chords = [
    { notes: DM9, w: env([[0, 1], [scan0 + 0.5, 1], [scan0 + 4.5, 0]]) },
    { notes: BB9, w: env([[scan0 + 0.5, 0], [scan0 + 4.5, 1], [lit - 0.6, 1], [lit + 2, 0]]) },
    { notes: DADD9, w: env([[lit - 0.6, 0], [lit + 2, 1], [litOut, 1], [litOut + 4, 0], [endCard - 1, 0], [endCard + 2, 1]]) },
    { notes: G9, w: env([[litOut, 0], [litOut + 4, 1], [endCard - 1, 1], [endCard + 2, 0]]) },
  ];
  const beat = sec(F.beat);
  const ignite = sec(F.ignite);
  const level = env([[0, 0], [3, 0.55], [beat - 0.4, 0.7], [beat + 0.05, 0.12], [ignite, 0.15], [ignite + 2.5, 0.8], [scan1, 0.95], [lit, 1.15], [litOut, 1.1], [endCard, 0.95], [len - 3.5, 0.9], [len, 0]]);
  const bright = env([[0, 0.22], [scan0, 0.25], [scan1, 0.5], [lit + 1, 0.62], [litOut + 3, 0.45], [endCard, 0.55], [len, 0.4]]);
  pad(dry, chords, bright, level, 0);
  pad(send, chords, bright, (t) => level(t) * 0.35, 0);
  staticNoise(dry, env([[0, 0], [1.2, 0.45], [beat - 0.3, 0.6], [beat + 0.05, 0], [ignite + 0.4, 0.25], [ignite + 6, 0.05], [scan1, 0]]), 3, 0);
  for (let t = 3.2; t < beat - 0.5; t += 1.25) thump(dry, t, 0.12 + (t / beat) * 0.08);
  bell(send, sec(F.seed), 81, 0.1, 3.5, 0.3);
  boom(dry, ignite, 0.4, 90, 40, 2.6);
  shimmer(send, ignite, ignite + 2.2, [74, 81, 86], 0.03);
  riser(dry, scan0, scan1, 0.55, 9);
  const pillarNotes = [69, 74, 76, 81];
  F.pillars.forEach((p, i) => bell(send, sec(p.at), pillarNotes[i], 0.16, 2.6, i % 2 ? 0.35 : -0.35));
  boom(dry, lit, 0.55);
  shimmer(send, lit, litOut, [86, 90, 93], 0.034);
  for (let f = F.rings; f < F.litOut; f += F.ringPeriod / 2) bell(send, sec(f), 98, 0.035, 1.6, 0.2);
  bell(send, sec(F.lit + 35), 78, 0.12, 3);
  boom(dry, endCard, 0.32, 60, 34, 3);
  [62, 66, 69, 76].forEach((m, i) => bell(send, endCard + 0.9 + i * 0.09, m, 0.09, 4.5, (i - 1.5) * 0.3));
  mix(dry, send, len, false, "public/score-film.wav");
}

function hero() {
  const H = cues.hero;
  const len = sec(H.frames);
  const tail = 6;
  const dry = makeBus(len + tail);
  const send = makeBus(len + tail);
  const scan0 = sec(H.scan[0]);
  const scan1 = sec(H.scan[1]);
  const lit = sec(H.lit);
  const fade = sec(H.fade);
  const chords = [
    { notes: DM9, w: env([[0, 1], [lit - 0.8, 1], [lit + 1.6, 0], [fade + 0.5, 0], [len - 0.4, 1]]) },
    { notes: DADD9, w: env([[lit - 0.8, 0], [lit + 1.6, 1], [fade + 0.5, 1], [len - 0.4, 0]]) },
  ];
  const bright = env([[0, 0.24], [scan0, 0.26], [scan1, 0.5], [lit + 1, 0.6], [fade, 0.5], [len, 0.24]]);
  pad(dry, chords, bright, () => 0.85, len);
  pad(send, chords, bright, () => 0.3, len);
  staticNoise(dry, env([[0, 0.85], [scan0, 0.9], [scan1, 0.05], [fade, 0], [sec(H.rev[0]) + 0.5, 0.2], [len, 0.85]]), 5, len);
  [0.5, 1.75].forEach((t) => thump(dry, t, 0.24));
  [sec(H.rev[0]) + 0.6, len - 0.6].forEach((t) => thump(dry, t, 0.2));
  riser(dry, scan0, scan1, 0.5, 11);
  boom(dry, lit, 0.5);
  shimmer(send, lit, fade - 1, [86, 90, 93], 0.02);
  for (let f = H.rings; f < H.fade; f += H.ringPeriod / 2) bell(send, sec(f), 98, 0.035, 1.6, 0.2);
  bell(send, sec(H.label), 78, 0.12, 3);
  mix(dry, send, len, true, "public/score-hero.wav");
}

fs.mkdirSync("public", { recursive: true });
const which = process.argv[2];
if (!which || which === "film") film();
if (!which || which === "hero") hero();
