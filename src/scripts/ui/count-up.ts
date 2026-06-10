// Animate [data-countup] numbers from 0 to their value when scrolled into view.
// Honors prefers-reduced-motion by showing the final value immediately.
export function initCountUp(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-countup]"));
  if (els.length === 0) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const run = (el: HTMLElement): void => {
    const raw = el.dataset.countup || el.textContent || "0";
    const target = parseFloat(raw);
    if (!isFinite(target)) return;
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    const duration = 900;
    let startTs = 0;
    const step = (now: number): void => {
      if (!startTs) startTs = now;
      const p = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        run(el);
      }
    },
    { threshold: 0.6 },
  );

  for (const el of els) io.observe(el);
}
