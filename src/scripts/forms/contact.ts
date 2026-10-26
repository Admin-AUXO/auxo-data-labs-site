import emailjs from "@emailjs/browser";
import { contactContent, type ContactTool, type ContactTopic } from "../../data/contact";
import { EMAIL_RE, renderStatus, type StatusState } from "./_status";
import { track } from "../analytics/track";
import { fill } from "../../lib/text";

const FORM_ID = "contact-form";
const FORM_NAME = "contact";
const { status, topics, tools: toolCopy, prefill } = contactContent.form;
const CHECK_PATH = "M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z";

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

const joinNames = (names: string[]) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

const TOPIC_ALIASES: Record<string, string> = {
  marketplace: "marketplace-tool",
  "free-audit": "founder-review",
  "startup-audit": "founder-review",
};
const topicBySlug = (slug: string | null) => {
  const s = slug ? (TOPIC_ALIASES[slug] ?? slug) : slug;
  return topics.find((t) => t.slug === s);
};
const topicByLabel = (label: string) => topics.find((t) => t.label === label);

function lowerFirst(label: string): string {
  return label.charAt(0).toLowerCase() + label.slice(1);
}

function readQuery() {
  const params = new URLSearchParams(location.search);
  const known = new Map(toolCopy.catalogue.map((t) => [t.slug, t]));
  const seen = new Set<string>();
  const tools: ContactTool[] = [];
  for (const raw of (params.get("tool") ?? "").split(",")) {
    const given = raw.trim().toLowerCase();
    const slug = toolCopy.aliases[given] ?? given;
    const tool = known.get(slug);
    if (tool && !seen.has(slug)) {
      seen.add(slug);
      tools.push(tool);
    }
  }
  let topic = topicBySlug(params.get("topic"));
  if (!topic && tools.length) topic = topicBySlug("marketplace-tool");
  const fn = toolCopy.functions.find((f) => f.slug === params.get("category"));
  return { topic, tools, fn };
}

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

function addDescribedBy(control: HTMLElement, id: string) {
  const ids = (control.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
  if (!ids.includes(id)) control.setAttribute("aria-describedby", [...ids, id].join(" "));
}

function createTopicHint(select: HTMLSelectElement) {
  const hint = document.createElement("p");
  hint.id = "topic-hint";
  hint.className = "text-sm text-muted";
  hint.hidden = true;
  select.insertAdjacentElement("afterend", hint);
  addDescribedBy(select, hint.id);

  const render = (topic: ContactTopic | undefined) => {
    hint.textContent = "";
    hint.hidden = !topic?.hint;
    if (!topic?.hint) return;
    hint.append(topic.hint);
    if (topic.hintLink) {
      const link = document.createElement("a");
      link.href = topic.hintLink.href;
      link.className = "font-medium text-foreground underline underline-offset-4 hover:text-accent";
      link.textContent = topic.hintLink.text;
      hint.append(" ", link);
    }
  };
  return render;
}

function createToolList(messageField: HTMLElement) {
  const wrap = document.createElement("div");
  wrap.className = "field";
  wrap.hidden = true;
  wrap.setAttribute("role", "group");
  const label = document.createElement("p");
  label.id = "tools-label";
  label.className = "field__label";
  label.textContent = toolCopy.label;
  wrap.setAttribute("aria-labelledby", label.id);
  const groupsWrap = document.createElement("div");
  groupsWrap.className = "flex flex-col gap-3";
  const notes = document.createElement("div");
  notes.className = "flex flex-col gap-1 text-sm text-subtle";
  wrap.append(label, groupsWrap, notes);
  messageField.insertAdjacentElement("beforebegin", wrap);

  let current: ContactTool[] = [];
  let open = false;
  const buttons = new Map<string, HTMLButtonElement>();

  const groups = new Map<string, ContactTool[]>();
  for (const tool of [...toolCopy.catalogue].sort((a, b) => Number(b.startHere) - Number(a.startHere))) {
    const list = groups.get(tool.group) ?? [];
    list.push(tool);
    groups.set(tool.group, list);
  }
  for (const [name, tools] of groups) {
    const block = document.createElement("div");
    block.className = "flex flex-col gap-2";
    const heading = document.createElement("p");
    heading.className = "text-xs text-subtle";
    heading.textContent = name;
    const row = document.createElement("div");
    row.className = "flex flex-wrap gap-2";
    for (const tool of tools) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "group inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm font-medium text-muted transition-colors hover:text-foreground aria-pressed:border-accent aria-pressed:text-foreground";
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = `<svg class="hidden size-4 text-accent group-aria-pressed:block" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${CHECK_PATH}"/></svg>`;
      btn.append(tool.name);
      btn.addEventListener("click", () => {
        const on = current.some((t) => t.slug === tool.slug);
        current = on ? current.filter((t) => t.slug !== tool.slug) : [...current, tool];
        render();
      });
      buttons.set(tool.slug, btn);
      row.append(btn);
    }
    block.append(heading, row);
    groupsWrap.append(block);
  }

  const render = () => {
    wrap.hidden = !open;
    for (const [slug, btn] of buttons) {
      btn.setAttribute("aria-pressed", String(current.some((t) => t.slug === slug)));
    }
    notes.textContent = "";
    for (const tool of current) {
      for (const line of tool.disclosures) {
        const p = document.createElement("p");
        p.textContent = line;
        notes.append(p);
      }
    }
  };

  return {
    set(tools: ContactTool[]) {
      current = tools.slice();
      render();
    },
    show(on: boolean) {
      open = on;
      render();
    },
    get: () => current,
  };
}

function initContactForm() {
  const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
  if (!form || form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const controls = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      'input:not([type="checkbox"]):not([data-honeypot]), textarea, select',
    ),
  );
  const consentInput = form.querySelector<HTMLInputElement>('input[name="consent"]');
  const honeypotInput = form.querySelector<HTMLInputElement>('input[data-honeypot]');
  const statusRegion = form.querySelector<HTMLElement>(".form-status");
  const topicSelect = form.querySelector<HTMLSelectElement>("#topic");
  const message = form.querySelector<HTMLTextAreaElement>("#message");
  const messageField = message?.closest<HTMLElement>(".field") ?? null;
  const counter = form.querySelector<HTMLElement>('[data-counter="message"]');

  const updateCounter = () => {
    if (!message || !counter) return;
    const max = Number(message.getAttribute("maxlength")) || 500;
    counter.textContent = `${message.value.length}/${max}`;
    counter.dataset.near = String(message.value.length > max * 0.9);
  };
  if (message && counter) {
    updateCounter();
    message.addEventListener("input", updateCounter);
  }

  const renderHint = topicSelect ? createTopicHint(topicSelect) : () => {};
  const currentTopic = () => (topicSelect ? topicByLabel(topicSelect.value) : undefined);
  const toolList = messageField ? createToolList(messageField) : null;
  const toolsOpen = () => currentTopic()?.slug === "marketplace-tool";
  const syncTools = () => toolList?.show(toolsOpen());
  let autoText = "";
  topicSelect?.addEventListener("change", () => {
    renderHint(currentTopic());
    syncTools();
    if (message && autoText && message.value === autoText) {
      message.value = "";
      autoText = "";
      updateCounter();
    }
  });
  const selectedTools = () => (toolsOpen() ? (toolList?.get() ?? []) : []);

  const query = readQuery();
  if (topicSelect && query.topic) {
    topicSelect.value = query.topic.label;
    renderHint(query.topic);
  }
  toolList?.set(query.tools);
  syncTools();
  if (message && !message.value.trim()) {
    let text = "";
    if (query.tools.length) {
      text = fill(prefill.tools, { names: joinNames(query.tools.map((t) => t.name)) });
    } else if (query.topic?.slug === "custom-stack") {
      text = query.fn
        ? fill(prefill.customStack, { function: lowerFirst(query.fn.label) })
        : prefill.customStackNoFunction;
    }
    if (text) {
      message.value = text.slice(0, Number(message.getAttribute("maxlength")) || 500);
      autoText = message.value;
      updateCounter();
    }
  }

  const analyticsContext = () => ({
    topic: currentTopic()?.slug,
    tools: selectedTools().map((t) => t.slug).join(",") || undefined,
    fit: (form.elements.namedItem("fit") as HTMLSelectElement | null)?.value || undefined,
  });

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
    track("form_start", { form_name: FORM_NAME, form_location: location.pathname, ...analyticsContext() });
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

    const resetAll = () => {
      form.reset();
      renderHint(undefined);
      toolList?.set([]);
      syncTools();
    };

    if ((honeypotInput?.value ?? "").trim()) {
      setStatus(statusRegion, "success", status.success);
      resetAll();
      return;
    }

    if (!isConfigured) {
      setStatus(statusRegion, "error", status.notConfigured);
      return;
    }

    if (submit) submit.disabled = true;
    setStatus(statusRegion, "info", status.sending);

    const topicLabel = String(data.get("topic") ?? "");
    const fitLabel = String(data.get("fit") ?? "");
    const toolNames = selectedTools().map((t) => t.name).join(", ");
    const context = analyticsContext();

    try {
      const response = await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: String(data.get("name") ?? ""),
          from_email: String(data.get("email") ?? ""),
          reply_to: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? "") || "Not provided",
          topic: topicLabel || "Not specified",
          tools: toolNames || "None",
          fit: fitLabel || "Not specified",
          subject: [topicLabel || "Website enquiry", toolNames, fitLabel].filter(Boolean).join(": "),
          message: [fitLabel && `Fits: ${fitLabel}`, String(data.get("message") ?? "")].filter(Boolean).join("\n\n"),
        },
        { publicKey: EMAILJS.publicKey },
      );

      if (response.status !== 200) throw new Error("send failed");

      submitted = true;
      track("generate_lead", {
        form_name: FORM_NAME,
        form_location: location.pathname,
        form_type: context.topic ?? "general",
        ...context,
      });

      setStatus(statusRegion, "success", status.success);
      resetAll();
      controls.forEach((c) => c.setAttribute("aria-invalid", "false"));
      updateCounter();
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
