let scrollBound = false;
let lastY = 0;
let ticking = false;

function apply(): void {
  ticking = false;
  const y = window.scrollY;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, y / max) : 0;

  const bar = document.querySelector<HTMLElement>("[data-scroll-progress]");
  if (bar) bar.style.transform = `scaleX(${progress})`;

  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (nav) {
    nav.toggleAttribute("data-scrolled", y > 8);
    if (y > 440 && y > lastY + 4) nav.setAttribute("data-hidden", "");
    else if (y < lastY - 4 || y < 220) nav.removeAttribute("data-hidden");
  }

  const toTop = document.querySelector<HTMLElement>("[data-to-top]");
  if (toTop) toTop.toggleAttribute("data-visible", y > 600);

  lastY = y;
}

function onScroll(): void {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(apply);
}

export function initScrollUI(): void {
  lastY = window.scrollY;

  const toTop = document.querySelector<HTMLElement>("[data-to-top]");
  if (toTop && !toTop.dataset.bound) {
    toTop.dataset.bound = "true";
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (!scrollBound) {
    scrollBound = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  apply();
}
