/** Color-theme toggle: data-theme on <html> + localStorage, with a
 *  View Transition when supported. First paint is handled by the
 *  inline no-FOUC script in BaseLayout. */

type Theme = "dark" | "light";
const STORAGE_KEY = "theme";

function stored(): Theme | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "dark" || v === "light" ? v : null;
}

function system(): Theme {
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function current(): Theme {
  const attr = document.documentElement.dataset.theme;
  return attr === "dark" || attr === "light" ? attr : (stored() ?? system());
}

function apply(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  for (const el of document.querySelectorAll("[data-theme-toggle]")) {
    el.setAttribute("aria-pressed", String(theme === "light"));
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

function toggle(): void {
  const next: Theme = current() === "light" ? "dark" : "light";
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void;
  };
  if (typeof doc.startViewTransition === "function" && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    doc.startViewTransition(() => apply(next));
  } else {
    apply(next);
  }
}

export function initTheme(): void {
  const theme = current();
  for (const el of document.querySelectorAll<HTMLElement>("[data-theme-toggle]")) {
    el.setAttribute("aria-pressed", String(theme === "light"));
    if (el.dataset.themeBound) continue;
    el.dataset.themeBound = "true";
    el.addEventListener("click", toggle);
  }
}
