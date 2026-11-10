import { motionEnabled } from "./core/motion";

let stop: (() => void) | null = null;
let stepper: IntersectionObserver | null = null;
let run = 0;

function initStepper(): void {
  stepper?.disconnect();
  const links = new Map(
    Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-step-link]")).map((a) => [a.dataset.stepLink ?? "", a]),
  );
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-step]"));
  if (!links.size || !sections.length) return;
  const visible = new Set<HTMLElement>();
  const mark = (id: string): void => {
    links.forEach((a, key) => {
      if (key === id) a.setAttribute("aria-current", "step");
      else a.removeAttribute("aria-current");
    });
  };
  stepper = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) visible.add(e.target as HTMLElement);
        else visible.delete(e.target as HTMLElement);
      });
      const current = sections.filter((s) => visible.has(s)).pop();
      if (current) mark(current.dataset.step ?? "");
    },
    { rootMargin: "-40% 0px -59% 0px" },
  );
  sections.forEach((s) => stepper?.observe(s));
  mark(sections[0].dataset.step ?? "");
}

function teardown(): void {
  run += 1;
  stop?.();
  stop = null;
}

async function init(): Promise<void> {
  teardown();
  if (!motionEnabled() || !document.querySelector(".hiw-hero")) return;
  const id = run;
  const { build } = await import("./how-it-works-motion");
  if (id === run) stop = build();
}

document.addEventListener("astro:page-load", () => {
  initStepper();
  void init();
});
document.addEventListener("astro:before-swap", () => {
  stepper?.disconnect();
  stepper = null;
  teardown();
});
window.addEventListener("auxo:motionchange", () => void init());
