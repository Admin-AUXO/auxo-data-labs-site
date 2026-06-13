import emailjs from "@emailjs/browser";
import { contactContent } from "../../data/contact";
import { EMAIL_RE, renderStatus, type StatusState } from "./_status";
import { track } from "../analytics/track";

const FORM_ID = "contact-form";
const FORM_NAME = "contact";
const status = contactContent.form.status;

const EMAILJS = {
  serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

const isConfigured = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

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

function setStatus(region: HTMLElement, state: StatusState, message: string) {
  renderStatus(region, state, message, { iconClass: "form-status__icon", iconSize: 20 });
}

function initContactForm() {
  const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
  if (!form || form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const controls = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input:not([type="checkbox"]):not([data-honeypot]), textarea, select',
    ),
  );
  const consentInput = form.querySelector<HTMLInputElement>('input[name="consent"]');
  const honeypotInput = form.querySelector<HTMLInputElement>('input[data-honeypot]');
  const statusRegion = form.querySelector<HTMLElement>(".form-status");

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

  controls.forEach((control) => {
    if (control instanceof HTMLSelectElement) return;
    control.addEventListener("blur", () => validateControl(control));
    control.addEventListener("input", () => {
      if (control.getAttribute("aria-invalid") === "true") validateControl(control);
    });
  });

  let started = false;
  let submitted = false;
  const markStart = () => {
    if (started) return;
    started = true;
    track("form_start", { form_name: FORM_NAME, form_location: location.pathname });
  };
  form
    .querySelectorAll<HTMLElement>("input, textarea, select")
    .forEach((c) => c.addEventListener("focus", markStart, { once: true }));
  window.addEventListener(
    "pagehide",
    () => {
      if (!started || submitted) return;
      const done = controls.filter(
        (c) => !(c instanceof HTMLSelectElement) && c.value.trim().length > 0,
      ).length;
      track("form_abandonment", { form_name: FORM_NAME, fields_completed: done });
    },
    { once: true },
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = controls
      .map((c) => (c instanceof HTMLSelectElement ? true : validateControl(c)))
      .every(Boolean);
    if (!valid || !statusRegion) {
      controls.find((c) => c.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    if (!consentInput?.checked) {
      setStatus(statusRegion, "error", status.consentRequired);
      consentInput?.focus();
      return;
    }

    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const data = new FormData(form);

    if ((honeypotInput?.value ?? "").trim()) {
      setStatus(statusRegion, "success", status.success);
      form.reset();
      return;
    }

    if (!isConfigured) {
      setStatus(statusRegion, "error", status.notConfigured);
      return;
    }

    if (submit) submit.disabled = true;
    setStatus(statusRegion, "info", status.sending);

    try {
      const response = await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: String(data.get("name") ?? ""),
          from_email: String(data.get("email") ?? ""),
          reply_to: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? "") || "Not provided",
          topic: String(data.get("topic") ?? "") || "Not specified",
          subject: String(data.get("topic") ?? "") || "Website enquiry",
          message: String(data.get("message") ?? ""),
        },
        { publicKey: EMAILJS.publicKey },
      );

      if (response.status !== 200) throw new Error("send failed");

      submitted = true;
      track("generate_lead", {
        form_name: FORM_NAME,
        form_location: location.pathname,
        form_type: String(data.get("topic") ?? "") || "general",
      });

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
