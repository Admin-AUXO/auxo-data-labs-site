import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "expo.out";

function hero(root: HTMLElement): void {
  const lines = root.querySelectorAll<HTMLElement>(".hiw-title__line");
  const side = root.querySelector<HTMLElement>(".page-hero__side");
  if (!lines.length || !side) return;

  gsap.set([lines, side], { autoAlpha: 1 });
  gsap
    .timeline({ defaults: { ease: EASE }, delay: 0.1 })
    .from(lines, { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 })
    .from(side, { y: 16, autoAlpha: 0, duration: 0.7 }, "<0.3");
}

function checks(list: HTMLElement): () => void {
  const items = Array.from(list.querySelectorAll<HTMLElement>(".method__item"));
  list.classList.add("method--scrub");
  const trigger = ScrollTrigger.create({
    trigger: list,
    start: "top 80%",
    end: "bottom 60%",
    onUpdate: (self) => {
      const lit = Math.ceil(self.progress * items.length);
      items.forEach((item, i) => item.classList.toggle("is-on", i < lit));
    },
  });
  return () => {
    trigger.kill();
    list.classList.remove("method--scrub");
    items.forEach((item) => item.classList.remove("is-on"));
  };
}

function stack(root: HTMLElement): () => void {
  const cards = Array.from(root.querySelectorAll<HTMLElement>(".step"));
  const trigger = ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onUpdate: () => {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const rect = card.getBoundingClientRect();
        const cover = (rect.bottom - next.getBoundingClientRect().top) / rect.height;
        card.style.setProperty("--cover", Math.min(1, Math.max(0, cover)).toFixed(3));
      });
    },
  });
  return () => {
    trigger.kill();
    cards.forEach((card) => card.style.removeProperty("--cover"));
  };
}

export function build(): () => void {
  const root = document.querySelector<HTMLElement>(".hiw-hero");
  if (!root) return () => {};

  const mm = gsap.matchMedia();
  mm.add("all", () => {
    hero(root);
    const list = document.querySelector<HTMLElement>(".method");
    const cards = document.querySelector<HTMLElement>(".stack");
    const stops = [list ? checks(list) : null, cards ? stack(cards) : null];
    return () => stops.forEach((fn) => fn?.());
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => mm.revert();
}
