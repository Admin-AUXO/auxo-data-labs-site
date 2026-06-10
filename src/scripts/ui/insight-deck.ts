const MOBILE_Q = "(max-width: 47.9375em)";

function setupDeck(deck: HTMLElement): void {
  if (deck.dataset.deckBound === "true") return;

  const viewport = deck.querySelector<HTMLElement>("[data-deck-viewport]");
  const controls = deck.querySelector<HTMLElement>("[data-deck-controls]");
  const prevBtn = deck.querySelector<HTMLButtonElement>("[data-deck-prev]");
  const nextBtn = deck.querySelector<HTMLButtonElement>("[data-deck-next]");
  const dotsWrap = deck.querySelector<HTMLElement>("[data-deck-dots]");
  const count = deck.querySelector<HTMLElement>("[data-deck-count]");
  const hint = deck.querySelector<HTMLElement>("[data-deck-hint]");
  const allCards = Array.from(deck.querySelectorAll<HTMLElement>("[data-deck-card]"));
  if (allCards.length === 0) return;
  deck.dataset.deckBound = "true";

  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-deck-filter]"));

  let activeTopic = "featured";
  let order: HTMLElement[] = allCards.slice();
  let index = 0;
  let swipeOn = false;

  function matches(card: HTMLElement): boolean {
    if (activeTopic === "") return true;
    if (activeTopic === "featured") return card.dataset.featured === "true";
    return card.dataset.topic === activeTopic;
  }

  function syncView(): void {
    deck.dataset.view = activeTopic === "featured" ? "featured" : "default";
  }

  async function shareCard(card: HTMLElement, btn: HTMLButtonElement): Promise<void> {
    const url = `${window.location.origin}${window.location.pathname}#${card.id}`;
    const title = card.querySelector(".deck__title")?.textContent?.trim() ?? "AUXO insight";
    try {
      if (typeof navigator.share === "function" && window.matchMedia(MOBILE_Q).matches) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      btn.setAttribute("data-copied", "");
      window.setTimeout(() => btn.removeAttribute("data-copied"), 1600);
    } catch {
      btn.removeAttribute("data-copied");
    }
  }

  for (const card of allCards) {
    const share = card.querySelector<HTMLButtonElement>("[data-deck-share]");
    if (share) share.addEventListener("click", () => void shareCard(card, share));
  }

  function setFlipped(card: HTMLElement, on: boolean): void {
    card.dataset.flipped = on ? "true" : "false";
    card
      .querySelectorAll<HTMLButtonElement>("[data-deck-flip-toggle]")
      .forEach((b) => b.setAttribute("aria-expanded", String(on)));
  }

  function toggleFlip(card: HTMLElement): void {
    setFlipped(card, card.dataset.flipped !== "true");
  }

  function resetFlips(): void {
    for (const card of allCards) setFlipped(card, false);
  }

  for (const card of allCards) {
    card.querySelectorAll<HTMLButtonElement>("[data-deck-flip-toggle]").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFlip(card);
      }),
    );
    // Desktop: tap anywhere on the card (but not a link/button) flips it.
    // Mobile swipe mode handles taps via the drag end-handler instead.
    card.addEventListener("click", (e) => {
      if (swipeOn) return;
      const t = e.target as HTMLElement;
      if (t.closest("a, button")) return;
      toggleFlip(card);
    });
  }

  function recompute(): void {
    order = allCards.filter(matches);
  }

  // Desktop grid: make every visible card the same height (tallest wins),
  // so featured and each category view are uniform. Mobile uses --deck-h.
  function equalize(): void {
    const flips = allCards
      .map((c) => c.querySelector<HTMLElement>("[data-deck-flip]"))
      .filter((f): f is HTMLElement => f !== null);
    if (window.matchMedia(MOBILE_Q).matches) {
      for (const f of flips) f.style.minBlockSize = "";
      return;
    }
    const visible = allCards.filter((c) => !c.hasAttribute("data-hide"));
    const visFlips = visible
      .map((c) => c.querySelector<HTMLElement>("[data-deck-flip]"))
      .filter((f): f is HTMLElement => f !== null);
    if (!visFlips.length) return;
    for (const f of visFlips) f.style.minBlockSize = "";
    requestAnimationFrame(() => {
      let max = 0;
      for (const f of visFlips) max = Math.max(max, f.offsetHeight);
      for (const f of visFlips) f.style.minBlockSize = `${Math.ceil(max)}px`;
    });
  }

  function syncChips(): void {
    for (const chip of chips) {
      chip.setAttribute("aria-pressed", String((chip.dataset.deckFilter ?? "") === activeTopic));
    }
  }

  function buildDots(): void {
    if (!dotsWrap) return;
    dotsWrap.replaceChildren();
    order.forEach((_card, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "deck__dot";
      dot.tabIndex = -1;
      dot.setAttribute("aria-label", `Go to card ${i + 1} of ${order.length}`);
      dot.addEventListener("click", () => go(i));
      dotsWrap.appendChild(dot);
    });
  }

  function render(): void {
    order.forEach((card, i) => {
      card.dataset.state =
        i < index ? "gone" : i === index ? "active" : i === index + 1 ? "next" : "upcoming";
      card.inert = i !== index;
    });
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((dot, i) =>
        dot.setAttribute("aria-current", String(i === index)),
      );
    }
    if (count) count.textContent = order.length > 0 ? `Card ${index + 1} of ${order.length}` : "No cards";
    if (prevBtn) prevBtn.disabled = index <= 0;
    if (nextBtn) nextBtn.disabled = index >= order.length - 1;
  }

  function go(to: number): void {
    resetFlips();
    index = Math.max(0, Math.min(order.length - 1, to));
    render();
  }

  function applyFilter(topic: string): void {
    activeTopic = topic;
    resetFlips();
    for (const c of allCards) {
      c.toggleAttribute("data-hide", !matches(c));
    }
    syncView();
    syncChips();
    recompute();
    index = 0;
    if (swipeOn) {
      buildDots();
      render();
    }
    equalize();
  }

  for (const chip of chips) {
    chip.addEventListener("click", () => applyFilter(chip.dataset.deckFilter ?? ""));
  }

  let eqTimer = 0;
  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(eqTimer);
      eqTimer = window.setTimeout(equalize, 180);
    },
    { passive: true },
  );

  function enableSwipe(): void {
    if (swipeOn || !viewport || !controls || !prevBtn || !nextBtn || !dotsWrap || !count) return;
    swipeOn = true;

    let maxH = 0;
    for (const card of allCards) maxH = Math.max(maxH, card.offsetHeight);
    deck.style.setProperty("--deck-h", `${Math.ceil(maxH)}px`);
    deck.classList.add("deck--ready");
    controls.hidden = false;
    if (hint) hint.hidden = false;
    buildDots();

    prevBtn.addEventListener("click", () => go(index - 1));
    nextBtn.addEventListener("click", () => go(index + 1));
    controls.addEventListener("keydown", (e) => {
      const map: Record<string, number> = {
        ArrowLeft: index - 1,
        ArrowRight: index + 1,
        Home: 0,
        End: order.length - 1,
      };
      if (e.key in map) {
        e.preventDefault();
        go(map[e.key]);
      }
    });

    let dragging = false;
    let startX = 0;
    let dx = 0;
    let activeCard: HTMLElement | null = null;

    viewport.addEventListener("pointerdown", (e) => {
      const card = order[index];
      if (!card) return;
      const target = e.target as HTMLElement;
      if (!card.contains(target) || target.closest("a, button")) return;
      dragging = true;
      activeCard = card;
      startX = e.clientX;
      dx = 0;
      card.classList.add("is-dragging");
      card.setPointerCapture?.(e.pointerId);
    });
    viewport.addEventListener("pointermove", (e) => {
      if (!dragging || !activeCard) return;
      dx = e.clientX - startX;
      activeCard.style.transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;
    });
    const endDrag = (): void => {
      if (!dragging || !activeCard) return;
      const card = activeCard;
      dragging = false;
      activeCard = null;
      card.classList.remove("is-dragging");
      card.style.transform = "";
      const threshold = Math.max(72, card.offsetWidth * 0.22);
      const moved = Math.abs(dx);
      if (dx <= -threshold) go(index + 1);
      else if (dx >= threshold) go(index - 1);
      else {
        render();
        if (moved < 6) toggleFlip(card);
      }
      dx = 0;
    };
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    render();
  }

  function openHash(): void {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const card = allCards.find((c) => c.id === id);
    if (!card) return;
    if (!matches(card)) applyFilter(card.dataset.topic ?? "");
    if (swipeOn) {
      const pos = order.indexOf(card);
      if (pos >= 0) go(pos);
    } else {
      card.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    card.setAttribute("data-flash", "");
    window.setTimeout(() => card.removeAttribute("data-flash"), 1800);
  }

  applyFilter(activeTopic);
  if (window.matchMedia(MOBILE_Q).matches) enableSwipe();
  openHash();
}

export function initInsightDeck(): void {
  document.querySelectorAll<HTMLElement>("[data-deck]").forEach(setupDeck);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInsightDeck, { once: true });
  } else {
    initInsightDeck();
  }
}
