/**
 * Contact form client logic: inline validation, char counter, and EmailJS
 * submission with graceful degradation when EmailJS is not configured.
 */
import { env, emailjsConfigured } from "../../config/env";
import { contactContent } from "../../data/contact";

const FORM_ID = "contact-form";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const status = contactContent.form.status;

type Validator = (value: string) => string | null;

const VALIDATORS: Record<string, Validator> = {
  name: (v) =>
    !v ? "Name is required" : v.length < 2 ? "Name must be at least 2 characters" : null,
  email: (v) =>
    !v ? "Email is required" : !EMAIL_RE.test(v) ? "Enter a valid email address" : null,
  company: () => null,
  topic: () => null,
  message: (v) =>
    !v
      ? "Message is required"
      : v.length < 20
        ? "Message must be at least 20 characters"
        : null,
};

function setError(field: HTMLElement, control: HTMLElement, message: string | null): boolean {
  const errorEl = field.querySelector<HTMLElement>(".field__error");
  if (errorEl) errorEl.textContent = message ?? "";
  control.setAttribute("aria-invalid", message ? "true" : "false");
  return !message;
}

function validateControl(control: HTMLInputElement | HTMLTextAreaElement): boolean {
  const field = control.closest<HTMLElement>(".field");
  const validate = VALIDATORS[control.name];
  if (!field || !validate) return true;
  return setError(field, control, validate(control.value.trim()));
}

function setStatus(region: HTMLElement, state: "success" | "error" | "info", message: string) {
  region.dataset.state = state;
  const icon =
    state === "success" ? "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" : "M11 15h2v2h-2zm0-8h2v6h-2z";
  region.innerHTML = `<svg class="form-status__icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${icon}"/></svg><span>${message}</span>`;
}

function initContactForm() {
  const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
  if (!form || form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const controls = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea, select"),
  );
  const statusRegion = form.querySelector<HTMLElement>(".form-status");

  // Character counter for the message field.
  const message = form.querySelector<HTMLTextAreaElement>("#message");
  const counter = form.querySelector<HTMLElement>('[data-counter="message"]');
  if (message && counter) {
    const max = Number(message.getAttribute("maxlength")) || 500;
    const update = () => {
      counter.textContent = `${message.value.length}/${max}`;
      counter.dataset.near = String(message.value.length > max * 0.9);
    };
    update();
    message.addEventListener("input", update);
  }

  // Inline validation: validate on blur, clear errors on input.
  controls.forEach((control) => {
    if (control instanceof HTMLSelectElement) return;
    control.addEventListener("blur", () => validateControl(control));
    control.addEventListener("input", () => {
      if (control.getAttribute("aria-invalid") === "true") validateControl(control);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = controls
      .map((c) => (c instanceof HTMLSelectElement ? true : validateControl(c)))
      .every(Boolean);
    if (!valid || !statusRegion) {
      controls.find((c) => c.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    if (!emailjsConfigured()) {
      setStatus(statusRegion, "info", status.notConfigured);
      return;
    }

    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const data = new FormData(form);
    if (submit) submit.disabled = true;
    setStatus(statusRegion, "info", status.sending);

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      emailjs.init(env.emailjs.publicKey);
      await emailjs.send(
        env.emailjs.serviceId,
        env.emailjs.templateId,
        {
          from_name: data.get("name"),
          from_email: data.get("email"),
          company: data.get("company") || "Not provided",
          topic: data.get("topic") || "Not specified",
          message: data.get("message"),
        },
        env.emailjs.publicKey,
      );
      setStatus(statusRegion, "success", status.success);
      form.reset();
      controls.forEach((c) => c.setAttribute("aria-invalid", "false"));
      if (counter && message) {
        counter.textContent = `0/${message.getAttribute("maxlength") || 500}`;
        counter.dataset.near = "false";
      }
    } catch {
      setStatus(statusRegion, "error", status.error);
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}

export function init() {
  initContactForm();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
  document.addEventListener("astro:page-load", init);
}
