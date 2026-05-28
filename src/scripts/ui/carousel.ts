/** Embla carousel init. Discovers [data-carousel] roots, wires prev/next,
 *  optional autoplay. Idempotent + view-transition safe. */

import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

export function initCarousels(): void {
  for (const root of document.querySelectorAll<HTMLElement>("[data-carousel]")) {
    if (root.dataset.emblaBound) continue;
    const viewport = root.querySelector<HTMLElement>(".embla");
    if (!viewport) continue;
    root.dataset.emblaBound = "true";

    const loop = root.dataset.loop !== "false";
    const autoplay = root.dataset.autoplay === "true";
    const align = (root.dataset.align as "start" | "center" | "end") || "start";

    const embla = EmblaCarousel(
      viewport,
      { loop, align, slidesToScroll: "auto", containScroll: loop ? false : "trimSnaps" },
      autoplay ? [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })] : []
    );

    root.querySelector("[data-carousel-prev]")?.addEventListener("click", () => embla.scrollPrev());
    root.querySelector("[data-carousel-next]")?.addEventListener("click", () => embla.scrollNext());
  }
}
