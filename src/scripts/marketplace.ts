const STORE_KEY = "auxo-stack";

const fill = (template: string, vars: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));

function readStack(valid: Set<string>): string[] {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(list)) return list.filter((s): s is string => typeof s === "string" && valid.has(s));
  } catch {}
  return [];
}

function writeStack(list: string[]): void {
  try {
    if (list.length) sessionStorage.setItem(STORE_KEY, JSON.stringify(list));
    else sessionStorage.removeItem(STORE_KEY);
  } catch {}
}

function setupFilters(root: HTMLElement): void {
  const chips = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-filter]"));
  const cards = Array.from(root.querySelectorAll<HTMLElement>(".mkt-grid > [data-category]"));
  const desc = root.querySelector<HTMLElement>("[data-filter-desc]");
  const count = root.querySelector<HTMLElement>("[data-filter-count]");
  const valid = new Set(chips.map((c) => c.dataset.filter ?? ""));
  const one = root.dataset.resultsOne ?? "";
  const many = root.dataset.resultsMany ?? "";

  function apply(slug: string, syncUrl: boolean): void {
    const active = valid.has(slug) ? slug : "all";
    let shown = 0;
    for (const card of cards) {
      const cat = card.dataset.category;
      const visible = cat === "any" || active === "all" || cat === active;
      card.hidden = !visible;
      if (visible && cat !== "any") shown += 1;
    }
    for (const chip of chips) {
      const on = chip.dataset.filter === active;
      chip.setAttribute("aria-pressed", String(on));
      if (on && desc) desc.textContent = chip.dataset.description ?? "";
    }
    if (count) count.textContent = shown === 1 ? one : fill(many, { n: shown });
    if (!syncUrl) return;
    const url = new URL(window.location.href);
    if (active === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", active);
    history.replaceState(history.state, "", url);
  }

  for (const chip of chips) {
    chip.addEventListener("click", () => apply(chip.dataset.filter ?? "all", true));
  }

  const initial = new URL(window.location.href).searchParams.get("category") ?? "all";
  apply(initial, false);
}

function setupStack(root: HTMLElement): void {
  const buttons = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-add-to-stack]"));
  const tray = root.querySelector<HTMLElement>("[data-stack-tray]");
  const trayCount = root.querySelector<HTMLElement>("[data-stack-count]");
  const request = root.querySelector<HTMLAnchorElement>("[data-stack-request]");
  const clear = root.querySelector<HTMLButtonElement>("[data-stack-clear]");
  if (!tray || !trayCount || !request || !clear || buttons.length === 0) return;

  const d = root.dataset;
  const base = d.requestBase ?? "";
  const valid = new Set(buttons.map((b) => b.dataset.addToStack ?? ""));
  let stack = readStack(valid);

  const render = (): void => {
    for (const btn of buttons) {
      const slug = btn.dataset.addToStack ?? "";
      const added = stack.includes(slug);
      btn.dataset.added = String(added);
      const label = btn.querySelector<HTMLElement>("[data-add-label]");
      if (label) label.textContent = added ? (d.labelAdded ?? "") : (d.labelAdd ?? "");
      if (added) btn.setAttribute("aria-label", fill(d.removeLabel ?? "", { name: btn.dataset.name ?? "" }));
      else btn.removeAttribute("aria-label");
    }
    tray.hidden = stack.length === 0;
    trayCount.textContent =
      stack.length === 0 ? "" : stack.length === 1 ? (d.countOne ?? "") : fill(d.countMany ?? "", { n: stack.length });
    request.href = `${base}${stack.map(encodeURIComponent).join(",")}`;
    writeStack(stack);
  };

  const toggle = (slug: string): void => {
    stack = stack.includes(slug) ? stack.filter((s) => s !== slug) : [...stack, slug];
    render();
  };

  for (const btn of buttons) {
    btn.setAttribute("role", "button");
    btn.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      toggle(btn.dataset.addToStack ?? "");
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key !== " ") return;
      e.preventDefault();
      toggle(btn.dataset.addToStack ?? "");
    });
  }

  clear.addEventListener("click", () => {
    const focusTarget = buttons.find((b) => stack.includes(b.dataset.addToStack ?? "") && !b.closest("[hidden]"));
    stack = [];
    render();
    focusTarget?.focus();
  });

  render();
}

export function initMarketplace(): void {
  const root = document.querySelector<HTMLElement>("[data-marketplace]");
  if (!root || root.dataset.bound === "true") return;
  root.dataset.bound = "true";
  setupFilters(root);
  setupStack(root);
}
