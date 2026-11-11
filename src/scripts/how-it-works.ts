import { motionEnabled } from "./core/motion";

let stop: (() => void) | null = null;
let run = 0;

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

document.addEventListener("astro:page-load", () => void init());
document.addEventListener("astro:before-swap", teardown);
window.addEventListener("auxo:motionchange", () => void init());
