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
      }
      apply(next);
      syncToggles(next);
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { on: next } }));
    });
  });
}
