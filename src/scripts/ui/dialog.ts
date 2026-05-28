/** Native <dialog> orchestration. showModal() gives focus-trap, Escape,
 *  ::backdrop and background inerting for free — no focus-trap dep.
 *  Handles generic [data-dialog-open] triggers and the Google Calendar
 *  booking dialog (lazy-loads its iframe on first open). */

const CALENDAR_URL = "https://calendar.app.google/aJmnvMS2uBbYPCgC7";

function open(d: HTMLDialogElement): void {
  if (!d.open) d.showModal();
}

function openCalendar(): void {
  const d = document.getElementById("calendar-dialog") as HTMLDialogElement | null;
  if (!d) return;
  const iframe = d.querySelector<HTMLIFrameElement>("iframe");
  if (iframe && !iframe.getAttribute("src")) {
    iframe.src = iframe.dataset.src || CALENDAR_URL;
  }
  open(d);
}

export function initDialogs(): void {
  // Generic openers: <button data-dialog-open="dialog-id">
  for (const btn of document.querySelectorAll<HTMLElement>("[data-dialog-open]")) {
    if (btn.dataset.dialogBound) continue;
    btn.dataset.dialogBound = "true";
    btn.addEventListener("click", () => {
      const id = btn.dataset.dialogOpen;
      const d = id ? (document.getElementById(id) as HTMLDialogElement | null) : null;
      if (d) open(d);
    });
  }

  // Calendar booking triggers
  for (const btn of document.querySelectorAll<HTMLElement>(
    '[data-google-calendar-open], a[href*="calendar.app.google"]'
  )) {
    if (btn.dataset.calBound) continue;
    btn.dataset.calBound = "true";
    btn.addEventListener("click", (e) => {
      if (!document.getElementById("calendar-dialog")) return;
      e.preventDefault();
      openCalendar();
    });
  }

  // Close buttons + click-outside, per dialog
  for (const d of document.querySelectorAll<HTMLDialogElement>("dialog.dialog")) {
    if (d.dataset.dialogInit) continue;
    d.dataset.dialogInit = "true";
    for (const c of d.querySelectorAll("[data-dialog-close]")) {
      c.addEventListener("click", () => d.close());
    }
    d.addEventListener("click", (e) => {
      if (e.target === d) d.close();
    });
  }
}
