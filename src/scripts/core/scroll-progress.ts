/** Drives --scroll-progress (0–1) on <html> for the top progress bar. */
export function initScrollProgress(): void {
  const root = document.documentElement;
  if (root.dataset.scrollProgressBound) return;
  root.dataset.scrollProgressBound = "true";

  const update = (): void => {
    const max = root.scrollHeight - root.clientHeight;
    root.style.setProperty("--scroll-progress", String(max > 0 ? root.scrollTop / max : 0));
  };

  update();
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update, { passive: true });
}
