import { motionEnabled } from "./motion";

interface FieldNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  r: number;
  kind: number;
}

interface FieldPulse {
  a: number;
  b: number;
  t: number;
  speed: number;
}

interface Palette {
  node: string;
  accent: string;
  accent2: string;
  nodeAlpha: number;
  linkAlpha: number;
  accentAlpha: number;
}

let started = false;

export function initParticleField(): void {
  if (started) return;
  const el = document.getElementById("particle-field");
  if (!(el instanceof HTMLCanvasElement)) return;
  const canvas: HTMLCanvasElement = el;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;
  const ctx: CanvasRenderingContext2D = context;
  started = true;

  const root = document.documentElement;
  const TAU = Math.PI * 2;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let linkDist = 134;
  let nodes: FieldNode[] = [];
  let pulses: FieldPulse[] = [];
  let raf = 0;

  const pointer = { x: -9999, y: -9999, active: false };

  const palette: Palette = {
    node: "24,24,27",
    accent: "111,158,45",
    accent2: "180,83,31",
    nodeAlpha: 0.24,
    linkAlpha: 0.12,
    accentAlpha: 0.6,
  };

  const BRAND_GREEN = [163, 230, 53];
  const BRAND_WARM = [232, 153, 92];
  function jitter(rgb: number[], amt: number): string {
    return rgb
      .map((c) => Math.max(0, Math.min(255, Math.round(c + (Math.random() * 2 - 1) * amt))))
      .join(",");
  }
  const warmForward = Math.random() < 0.5;
  const variantAccent = jitter(warmForward ? BRAND_WARM : BRAND_GREEN, 14);
  const variantAccent2 = jitter(warmForward ? BRAND_GREEN : BRAND_WARM, 14);
  const densityMul = 0.82 + Math.random() * 0.42;

  function triplet(name: string, fallback: string): string {
    const raw = getComputedStyle(root).getPropertyValue(name).trim();
    return raw ? raw.replace(/\s+/g, ",") : fallback;
  }

  function readPalette(): void {
    palette.node = triplet("--pf-node", "24,24,27");
    palette.accent = variantAccent;
    palette.accent2 = variantAccent2;
    const dark = root.dataset.theme === "dark";
    palette.nodeAlpha = dark ? 0.36 : 0.24;
    palette.linkAlpha = dark ? 0.17 : 0.12;
    palette.accentAlpha = dark ? 0.72 : 0.6;
  }

  function spawnPulse(): FieldPulse {
    const a = (Math.random() * nodes.length) | 0;
    let b = a;
    let best = Infinity;
    for (let j = 0; j < nodes.length; j += 1) {
      if (j === a) continue;
      const dx = nodes[a].x - nodes[j].x;
      const dy = nodes[a].y - nodes[j].y;
      const d = dx * dx + dy * dy;
      if (d > 36 && d < best) {
        best = d;
        b = j;
      }
    }
    return { a, b, t: Math.random() * 0.4, speed: 0.0035 + Math.random() * 0.0055 };
  }

  function build(): void {
    const small = w < 640;
    const target = Math.floor(((w * h) / 17000) * densityMul);
    const count = Math.max(small ? 24 : 42, Math.min(small ? 44 : 112, target));
    nodes = [];
    for (let i = 0; i < count; i += 1) {
      const z = Math.random();
      const roll = Math.random();
      const kind = roll > 0.93 ? 1 : roll > 0.86 ? 2 : 0;
      const drift = (small ? 0.15 : 0.2) * (0.5 + z);
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * drift,
        vy: (Math.random() - 0.5) * drift,
        z,
        r: (kind === 0 ? 1 : 1.7) * (0.65 + z * 0.85),
        kind,
      });
    }
    pulses = [];
    const pc = small ? 1 : 3;
    for (let i = 0; i < pc; i += 1) pulses.push(spawnPulse());
  }

  function resize(): void {
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    linkDist = w < 640 ? 110 : 136;
    build();
  }

  function frame(): void {
    ctx.clearRect(0, 0, w, h);
    const px = pointer.x;
    const py = pointer.y;
    const repelR = 172;
    const repelR2 = repelR * repelR;

    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;
      if (pointer.active) {
        const dx = a.x - px;
        const dy = a.y - py;
        const d2 = dx * dx + dy * dy;
        if (d2 > 1 && d2 < repelR2) {
          const d = Math.sqrt(d2);
          const push = (1 - d / repelR) * 1.1;
          a.x += (dx / d) * push;
          a.y += (dy / d) * push;
        }
      }
      if (a.x < -24) a.x = w + 24;
      else if (a.x > w + 24) a.x = -24;
      if (a.y < -24) a.y = h + 24;
      else if (a.y > h + 24) a.y = -24;
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < linkDist * linkDist) {
          const o = 1 - Math.sqrt(d2) / linkDist;
          ctx.globalAlpha = o * palette.linkAlpha * (0.5 + (a.z + b.z) * 0.25);
          ctx.strokeStyle = `rgb(${palette.node})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    if (pointer.active) {
      const cursorR = 188;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const dx = a.x - px;
        const dy = a.y - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < cursorR * cursorR) {
          const o = 1 - Math.sqrt(d2) / cursorR;
          ctx.globalAlpha = o * (palette.linkAlpha + 0.14);
          ctx.strokeStyle = `rgb(${palette.accent})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      const col = a.kind === 1 ? palette.accent : a.kind === 2 ? palette.accent2 : palette.node;
      const base = a.kind === 0 ? palette.nodeAlpha * (0.45 + a.z * 0.7) : palette.accentAlpha * (0.5 + a.z * 0.6);
      ctx.globalAlpha = Math.min(base, 0.85);
      ctx.fillStyle = `rgb(${col})`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, TAU);
      ctx.fill();
    }

    const maxEdge = (linkDist * 1.25) ** 2;
    for (let i = 0; i < pulses.length; i += 1) {
      const p = pulses[i];
      const a = nodes[p.a];
      const b = nodes[p.b];
      if (!a || !b) {
        pulses[i] = spawnPulse();
        continue;
      }
      p.t += p.speed;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      if (p.t >= 1 || dx * dx + dy * dy > maxEdge) {
        pulses[i] = spawnPulse();
        continue;
      }
      ctx.globalAlpha = 0.75 * Math.sin(p.t * Math.PI);
      ctx.fillStyle = `rgb(${palette.accent})`;
      ctx.beginPath();
      ctx.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 1.9, 0, TAU);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  function loop(): void {
    frame();
    raf = requestAnimationFrame(loop);
  }

  function play(): void {
    if (raf) return;
    if (!motionEnabled()) return;
    raf = requestAnimationFrame(loop);
  }

  function stop(): void {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  }

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      readPalette();
      resize();
    }, 160);
  });

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    },
    { passive: true },
  );
  window.addEventListener("pointerout", () => {
    pointer.active = false;
  });
  window.addEventListener("blur", () => {
    pointer.active = false;
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else play();
  });

  const observer = new MutationObserver(() => {
    readPalette();
  });
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  readPalette();
  resize();
  if (motionEnabled()) {
    play();
  } else {
    frame();
  }

  window.addEventListener("auxo:motionchange", (e) => {
    if ((e as CustomEvent<{ on: boolean }>).detail.on) {
      play();
    } else {
      stop();
      frame();
    }
  });
}
