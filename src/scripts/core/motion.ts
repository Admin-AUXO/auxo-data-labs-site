// Motion is opt-in. Reduced motion is the DEFAULT for every visitor; rich
// motion only runs when the visitor explicitly enables it via the footer
// toggle. The choice persists in localStorage and is reflected as
// html[data-motion="on"] (absent/"off" = reduced). The inline head script in
// BaseLayout sets the attribute before first paint to avoid a flash.
const KEY = "auxo-motion";
const EVENT = "auxo:motionchange";

export function motionEnabled(): boolean {
  return document.documentElement.dataset.motion === "on";
}

function stored(): boolean {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

function apply(on: boolean): void {
  document.documentElement.dataset.motion = on ? "on" : "off";
}

function syncToggles(on: boolean): void {
  document.querySelectorAll<HTMLElement>("[data-motion-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(on));
    const label = btn.querySelector<HTMLElement>("[data-motion-label]");
    if (label) label.textContent = on ? "Motion on" : "Motion off";
  });
}

export function initMotion(): void {
  // Re-apply on every (re-)boot, including Astro view transitions where the
  // <html> attribute set by the inline head script may not carry over.
  apply(stored());
  syncToggles(motionEnabled());

  document.querySelectorAll<HTMLButtonElement>("[data-motion-toggle]").forEach((btn) => {
    if (btn.dataset.motionBound) return;
    btn.dataset.motionBound = "1";
    btn.addEventListener("click", () => {
      const next = !motionEnabled();
      try {
        localStorage.setItem(KEY, next ? "on" : "off");
      } catch {
        /* ignore storage failures (private mode, etc.) */
      }
      apply(next);
      syncToggles(next);
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { on: next } }));
    });
  });
}
