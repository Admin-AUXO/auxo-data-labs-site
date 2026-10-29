import { contactContent } from "../../data/contact";
import { EMAIL_RE, renderStatus, type StatusState } from "./_status";
import { track } from "../analytics/track";
import { captureUtm } from "../../lib/auxo-score/storage";

const FORM_ID = "contact-form";
const FORM_NAME = "founder_review_application";
const LEAD_URL = "/api/lead";
const BANDS = ["Healthy", "Stable", "Fragile", "Critical"];
const { status, tools: toolCopy, bandNote } = contactContent.form;

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type Validator = (value: string) => string | null;

const VALIDATORS: Record<string, Validator> = {
  name: (v) => (!v ? "Name is required" : v.length < 2 ? "Name must be at least 2 characters" : null),
  email: (v) => (!v ? "Work email is required" : !EMAIL_RE.test(v) ? "Enter a valid email address" : null),
  website: (v) => (!v ? "Company website is required" : !/\.[a-z]{2,}/i.test(v) ? "Enter your company website" : null),
  stage: (v) => (!v ? "Choose the option closest to you" : null),
  number: (v) => (!v ? "Tell us the number" : v.length < 10 ? "A few more words, please" : null),
};

function setError(field: HTMLElement, control: HTMLElement, message: string | null): boolean {
  const errorEl = field.querySelector<HTMLElement>(".field__error");
  if (errorEl) errorEl.textContent = message ?? "";
  control.setAttribute("aria-invalid", message ? "true" : "false");
  return !message;
}

function validateControl(control: Control): boolean {
  const field = control.closest<HTMLElement>(".field");
  const validate = VALIDATORS[control.name];
  if (!field || !validate) return true;
  return setError(field, control, validate(control.value.trim()));
}

function setStatus(region: HTMLElement, state: StatusState, message: string) {
  renderStatus(region, state, message, { iconClass: "form-status__icon", iconSize: 20 });
}

function readQuery() {
  const params = new URLSearchParams(location.search);
  const known = new Map(toolCopy.catalogue.map((t) => [t.slug, t]));
  const names: string[] = [];
  for (const raw of (params.get("tool") ?? "").split(",")) {
    const given = raw.trim().toLowerCase();
    const tool = known.get(toolCopy.aliases[given] ?? given);
    if (tool && !names.includes(tool.name)) names.push(tool.name);
  }
  const rawBand = (params.get("band") ?? "").toLowerCase();
  const band = BANDS.find((b) => b.toLowerCase() === rawBand) ?? "";
  const score = params.get("score") ?? "";
  const total = /^\d{1,3}$/.test(score) ? score : "";
  return { tool: names.join(", "), band, total };
}

function initContactForm() {
  const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
  if (!form || form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const root = form.closest<HTMLElement>("[data-apply]");
  const booking = root?.querySelector<HTMLElement>("[data-booking]") ?? null;
  const controls = Array.from(
    form.querySelectorAll<Control>(
      'input:not([type="checkbox"]):not([type="hidden"]):not([data-honeypot]), textarea, select',
    ),
  );
  const consentInput = form.querySelector<HTMLInputElement>('input[name="consent"]');
  const newsletterInput = form.querySelector<HTMLInputElement>('input[name="newsletter"]');
  const honeypotInput = form.querySelector<HTMLInputElement>("input[data-honeypot]");
  const statusRegion = form.querySelector<HTMLElement>(".form-status");
  const message = form.querySelector<HTMLTextAreaElement>("#number");
  const counter = form.querySelector<HTMLElement>('[data-counter="number"]');
  const contextEl = form.querySelector<HTMLElement>("[data-context]");
  const setHidden = (name: string, value: string) => {
    const input = form.querySelector<HTMLInputElement>(`input[type="hidden"][name="${name}"]`);
    if (input) input.value = value;
  };

  const query = readQuery();
  setHidden("band", query.band);
  setHidden("total", query.total);
  setHidden("tool", query.tool);
  const contextLines = [
    query.band && `${bandNote} ${query.band}${query.total ? ` (${query.total}/100)` : ""}`,
    query.tool && `${toolCopy.note} ${query.tool}`,
  ].filter(Boolean);
  if (contextEl && contextLines.length) {
    contextEl.textContent = contextLines.join(" · ");
    contextEl.hidden = false;
  }

  const updateCounter = () => {
    if (!message || !counter) return;
    const max = Number(message.getAttribute("maxlength")) || 500;
    counter.textContent = `${message.value.length}/${max}`;
    counter.dataset.near = String(message.value.length > max * 0.9);
  };
  updateCounter();
  message?.addEventListener("input", updateCounter);

  controls.forEach((control) => {
    control.addEventListener(control instanceof HTMLSelectElement ? "change" : "blur", () =>
      validateControl(control),
    );
    control.addEventListener("input", () => {
      if (control.getAttribute("aria-invalid") === "true") validateControl(control);
    });
  });

  let started = false;
  let submitted = false;
  form.querySelectorAll<HTMLElement>("input, textarea, select").forEach((c) =>
    c.addEventListener(
      "focus",
      () => {
        if (started) return;
        started = true;
        track("form_start", { form_name: FORM_NAME, form_location: location.pathname });
      },
      { once: true },
    ),
  );
  window.addEventListener(
    "pagehide",
    () => {
      if (!started || submitted) return;
      const done = controls.filter((c) => c.value.trim().length > 0).length;
      track("form_abandonment", { form_name: FORM_NAME, fields_completed: done });
    },
    { once: true },
  );

  const showBooking = () => {
    if (!booking) return;
    const iframe = booking.querySelector<HTMLIFrameElement>("iframe");
    if (iframe && !iframe.getAttribute("src")) iframe.src = iframe.dataset.src ?? "";
    form.hidden = true;
    booking.hidden = false;
    booking.querySelector<HTMLElement>('[tabindex="-1"]')?.focus({ preventScroll: true });
    booking.scrollIntoView({ block: "start" });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = controls.map(validateControl).every(Boolean);
    if (!valid || !statusRegion) {
      controls.find((c) => c.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }
    if (!consentInput?.checked) {
      setStatus(statusRegion, "error", status.consentRequired);
      consentInput?.focus();
      return;
    }
    if ((honeypotInput?.value ?? "").trim()) {
      showBooking();
      return;
    }

    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const data = new FormData(form);
    const utm = captureUtm();
    const payload = {
      type: "application",
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      stage: String(data.get("stage") ?? ""),
      number: String(data.get("number") ?? "").trim(),
      band: query.band,
      total: query.total,
      tool: query.tool,
      newsletter: Boolean(newsletterInput?.checked),
      page: location.pathname,
      utm: { source: utm.source, medium: utm.medium, campaign: utm.campaign, content: utm.content },
    };

    if (submit) submit.disabled = true;
    setStatus(statusRegion, "info", status.sending);
    try {
      const res = await fetch(LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      submitted = true;
      track("application_submit", {
        form_name: FORM_NAME,
        form_location: location.pathname,
        stage: payload.stage,
        band: payload.band,
        tool: payload.tool,
        campaign: utm.campaign,
        source: utm.source,
        poster: utm.content,
      });
      track("generate_lead", {
        form_name: FORM_NAME,
        form_location: location.pathname,
        form_type: "founder_review",
        campaign: utm.campaign,
      });
      showBooking();
    } catch {
      setStatus(statusRegion, "error", status.error);
    } finally {
      if (submit) submit.disabled = false;
    }
  });

  booking?.querySelector("[data-booking-link]")?.addEventListener("click", () =>
    track("booking_open", { form_location: location.pathname, campaign: captureUtm().campaign }),
  );
}

export function init() {
  initContactForm();
}
