import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const STICKY = "(min-width: 64rem) and (min-height: 46rem)";
const EASE = "expo.out";
const INK = "inset(0 100% 0 0)";
const INKED = "inset(0 0% 0 0)";

function hero(root: HTMLElement): void {
  const eyebrow = root.querySelector<HTMLElement>(".section-index");
  const title = root.querySelector<HTMLElement>(".hiw-hero__title");
  const side = root.querySelector<HTMLElement>(".hiw-hero__side");
  const map = root.querySelector<HTMLElement>(".hiw-map");
  const links = root.querySelectorAll<HTMLElement>(".hiw-map__link");
  if (!title) return;

  gsap.set([eyebrow, title, side, map], { autoAlpha: 1 });
  const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });

  SplitText.create(title, {
    type: "words",
    mask: "words",
    autoSplit: true,
    onSplit: (self) => {
      tl.clear()
        .from(eyebrow, { autoAlpha: 0, duration: 0.6 })
        .from(self.words, { yPercent: 105, duration: 0.9, stagger: 0.06 })
        .from(side, { y: 16, autoAlpha: 0, duration: 0.7 }, "<0.4")
        .from(links, { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.07 }, "<0.1")
        .fromTo(links, { "--draw": 0 }, { "--draw": 1, duration: 0.45, stagger: 0.12, ease: "power2.inOut" }, "<0.25");
      return tl;
    },
  });
}

function stepTimeline(step: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, defaults: { ease: EASE } });
  tl.from(step.querySelector(".ladder__head"), { autoAlpha: 0, y: 16, duration: 0.7 })
    .fromTo(step.querySelectorAll(".ladder__get"), { clipPath: INK }, { clipPath: INKED, clearProps: "clipPath", duration: 0.8, stagger: 0.1 }, "<0.15")
    .from(step.querySelectorAll(".ladder__facts, .ladder__own"), { autoAlpha: 0, duration: 0.6 }, "<0.3");
  return tl;
}

function ladder(stack: HTMLElement, steps: HTMLElement[], sticky: boolean): void {
  const top = (i: number): number => steps.slice(0, i).reduce((sum, s) => sum + s.offsetHeight, 0);

  steps.forEach((step, i) => {
    const tl = stepTimeline(step);
    ScrollTrigger.create({
      trigger: sticky ? stack : step,
      start: sticky ? () => `top+=${top(i)} 65%` : "top 75%",
      once: true,
      onEnter: () => tl.play(),
    });

    if (!sticky || i === 0) return;
    gsap.to(steps[i - 1], {
      autoAlpha: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: stack,
        start: () => `top+=${top(i)} bottom`,
        end: () => `top+=${top(i)} top`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}

function upkeep(el: HTMLElement): void {
  gsap
    .timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true }, defaults: { ease: EASE } })
    .fromTo(el, { "--draw": 0 }, { "--draw": 1, duration: 0.8, ease: "power2.inOut" })
    .from(el.querySelectorAll(".upkeep__icon, .upkeep__head, .upkeep__body"), { autoAlpha: 0, duration: 0.6 }, "<0.2");
}

function method(list: HTMLElement): void {
  gsap
    .timeline({ scrollTrigger: { trigger: list, start: "top 80%", once: true }, defaults: { ease: EASE } })
    .fromTo(list.querySelectorAll(".method__item"), { "--draw": 0 }, { "--draw": 1, duration: 0.45, stagger: 0.1, ease: "power2.inOut" })
    .from(list.querySelectorAll(".method__item > *"), { autoAlpha: 0, duration: 0.6, stagger: 0.03 }, "<0.1");
}

export function build(): () => void {
  const root = document.querySelector<HTMLElement>(".hiw-hero");
  const stack = document.querySelector<HTMLElement>(".ladder__stack");
  if (!root || !stack) return () => {};
  const steps = Array.from(stack.querySelectorAll<HTMLElement>(".ladder__step"));

  const mm = gsap.matchMedia();
  mm.add({ sticky: STICKY, flow: `not all and ${STICKY}` }, (ctx) => {
    hero(root);
    ladder(stack, steps, Boolean(ctx.conditions?.sticky));
    const up = document.querySelector<HTMLElement>(".upkeep");
    if (up) upkeep(up);
    const list = document.querySelector<HTMLElement>(".method");
    if (list) method(list);
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => mm.revert();
}

