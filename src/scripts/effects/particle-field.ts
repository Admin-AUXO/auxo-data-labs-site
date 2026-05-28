/** Constellation field — drifting points linked by hairlines when near, with
 *  subtle pointer parallax. A lean recode of the old 1,288-line, 11-mode
 *  particle system into one tasteful, performant effect:
 *  - device-pixel-ratio capped at 2, point count scales with area (capped)
 *  - pauses when off-screen (IntersectionObserver) or the tab is hidden
 *  - renders a single static frame under prefers-reduced-motion
 *  - theme-aware colour read from the --field-color custom property
 *  - self-cleans when its canvas leaves the DOM (view transitions) */

interface Pt {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const pointer = { x: 0.5, y: 0.5 };
let pointerBound = false;

function bindPointer(): void {
  if (pointerBound) return;
  pointerBound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = e.clientY / window.innerHeight;
    },
    { passive: true }
  );
}

export function initParticleField(): void {
  bindPointer();
  for (const canvas of document.querySelectorAll<HTMLCanvasElement>("[data-particle-field]")) {
    if (canvas.dataset.bound) continue;
    canvas.dataset.bound = "true";
    setup(canvas);
  }
}

function setup(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LINK = 130;
  const LINK2 = LINK * LINK;

  let w = 0;
  let h = 0;
  let pts: Pt[] = [];
  let raf = 0;
  let visible = true;
  let color = "oklch(0.88 0.2 124)";

  const readColor = (): void => {
    const c = getComputedStyle(canvas).getPropertyValue("--field-color").trim();
    if (c) color = c;
  };

  const seed = (): void => {
    const count = Math.min(80, Math.round((w * h) / 16000));
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }));
  };

  const resize = (): void => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  };

  const draw = (): void => {
    ctx.clearRect(0, 0, w, h);
    const ox = (pointer.x - 0.5) * 18;
    const oy = (pointer.y - 0.5) * 18;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK2) {
          ctx.globalAlpha = (1 - d2 / LINK2) * 0.16;
          ctx.beginPath();
          ctx.moveTo(a.x + ox, a.y + oy);
          ctx.lineTo(b.x + ox, b.y + oy);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.5;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const stop = (): void => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const step = (): void => {
    if (!canvas.isConnected) {
      stop();
      ro.disconnect();
      io.disconnect();
      return;
    }
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    draw();
    raf = requestAnimationFrame(step);
  };

  const start = (): void => {
    if (!raf && visible && !reduce) raf = requestAnimationFrame(step);
  };

  const ro = new ResizeObserver(() => {
    resize();
    if (reduce) draw();
  });

  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
    if (visible) start();
    else stop();
  });

  readColor();
  resize();
  draw();
  ro.observe(canvas);
  io.observe(canvas);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  window.addEventListener("themechange", readColor);

  if (!reduce) start();
}
