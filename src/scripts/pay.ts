type View = {
  id: string;
  client: string;
  covers: string;
  currency: string;
  depositPct: number;
  deposit: number;
  vatPct: number;
  vat: number;
  due: number;
  paid: boolean;
  open: boolean;
};

const money = (n: number, currency: string) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency, minimumFractionDigits: 2 }).format(n);

export async function initPay() {
  const root = document.querySelector<HTMLElement>("[data-pay]");
  if (!root || root.dataset.bound) return;
  root.dataset.bound = "1";
  const copy = JSON.parse(root.dataset.copy ?? "{}") as Record<string, string>;
  const $ = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const title = $("[data-pay-title]");
  const message = $("[data-pay-message]");
  const say = (text: string) => {
    title.textContent = copy.eyebrow;
    message.textContent = text;
    message.hidden = false;
  };

  const id = new URLSearchParams(location.search).get("p") ?? "";
  let view: View;
  try {
    const res = await fetch(`/api/pay?p=${encodeURIComponent(id)}`);
    if (!res.ok) return say(copy.notFound);
    view = ((await res.json()) as { proposal: View }).proposal;
  } catch {
    return say(copy.error);
  }
  if (view.paid) return say(copy.paid);
  if (!view.open) return say(copy.closed);

  title.textContent = `${copy.titlePrefix} ${view.client}`;
  const set = (f: string, v: string) => {
    $(`[data-f="${f}"]`).textContent = v;
  };
  set("covers", view.covers);
  set("id", view.id);
  set("deposit", `${money(view.deposit, view.currency)} (${view.depositPct}%)`);
  set("vat", `${money(view.vat, view.currency)} (${view.vatPct}%)`);
  set("due", money(view.due, view.currency));
  $("[data-vat]").hidden = view.vat <= 0;
  for (const s of ["[data-pay-rows]", "[data-pay-lines]", "[data-pay-button]", "[data-pay-note]"]) $(s).hidden = false;

  const button = $<HTMLButtonElement>("[data-pay-button]");
  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = copy.redirecting;
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p: view.id }),
      });
      const out = (await res.json()) as { url?: string };
      if (!res.ok || !out.url) throw new Error("checkout");
      location.href = out.url;
    } catch {
      button.disabled = false;
      button.textContent = copy.button;
      message.textContent = copy.error;
      message.hidden = false;
    }
  });
}

export async function initThanks() {
  const root = document.querySelector<HTMLElement>("[data-thanks]");
  if (!root || root.dataset.bound) return;
  root.dataset.bound = "1";
  const copy = JSON.parse(root.dataset.copy ?? "{}") as Record<string, string>;
  const title = root.querySelector<HTMLElement>("[data-thanks-title]")!;
  const lead = root.querySelector<HTMLElement>("[data-thanks-lead]")!;
  const show = (t: string, l: string) => {
    title.textContent = t;
    lead.textContent = l;
    lead.hidden = !l;
  };
  const sessionId = new URLSearchParams(location.search).get("session_id") ?? "";
  try {
    const res = await fetch(`/api/pay-confirm?session_id=${encodeURIComponent(sessionId)}`);
    const out = (await res.json()) as { ok?: boolean; paid?: boolean };
    if (!res.ok || !out.ok) return show(copy.errorTitle, copy.error);
    if (out.paid) return show(copy.title, copy.lead);
    show(copy.pendingTitle, copy.pending);
  } catch {
    show(copy.errorTitle, copy.error);
  }
}
