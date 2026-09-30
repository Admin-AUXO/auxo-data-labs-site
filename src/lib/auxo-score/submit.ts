import { CARDS, FOCUS, FOCUS_COPY } from "./cards";

import type { Utm } from "./storage";
import type { Result, State } from "./types";

const VERSION = "auxo-score-10card-v1";
export const MAX_SUBMITS = 3;

export const MESSAGES = {
  unavailable: "Email isn't available right now. Please try again later.",
  badRequest: "That didn't go through. Check your email and try again.",
  tooMany: "Too many requests. Please wait a minute and try again.",
  failed: "Something went wrong on our side. Please try again.",
} as const;

export interface Context {
  page: string;
  referrer: string;
  utm: Utm;
  startedAt: string;
  durationSec: number;
  locale: string;
  timezone: string;
}

const uuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (Number(c) ^ (Math.random() * 16) >> (Number(c) / 4)).toString(16),
      );

export { uuid };

export function buildContext(state: State, utm: Utm): Context {
  let timezone = "";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timezone = "";
  }
  const started = Date.parse(state.startedAt);
  return {
    page: "/auxo-score/",
    referrer: document.referrer || "",
    utm,
    startedAt: state.startedAt,
    durationSec: Number.isFinite(started) ? Math.max(0, Math.round((Date.now() - started) / 1000)) : 0,
    locale: navigator.language || "",
    timezone,
  };
}

function envelope(type: string, email: string, hp: string, state: State, ctx: Context) {
  const clean = email.trim().toLowerCase();
  return {
    type,
    version: VERSION,
    submissionId: uuid(),
    attemptId: state.attemptId,
    submittedAt: new Date().toISOString(),
    email: clean,
    emailDomain: clean.split("@")[1] ?? "",
    consent: true,
    hp,
    context: ctx,
  };
}

export function buildReportPayload(email: string, hp: string, state: State, r: Result, ctx: Context) {
  const answers = CARDS.map((card) => {
    const a = state.answers[card.id];
    if (!a || a.isIdk) {
      return {
        cardId: card.id, dimension: card.dimension, question: card.question,
        tier: 5, points: a ? a.points : 0, isIdk: true, label: "I don't know", sub: "", quadrant: null,
      };
    }
    const opt = card.options.find((o) => o.tier === a.tier)!;
    return {
      cardId: card.id, dimension: card.dimension, question: card.question,
      tier: a.tier, points: a.points, isIdk: false, label: opt.label, sub: opt.sub, quadrant: a.selectedQuadrant,
    };
  });
  return {
    ...envelope("full_report_request", email, hp, state, ctx),
    result: {
      total: r.total,
      band: r.band.name,
      bandLine: r.band.line,
      weakest: r.weakest,
      focus: FOCUS_COPY[r.weakest],
      focusSteps: FOCUS[r.weakest].steps,
      focusGood: FOCUS[r.weakest].good,
      idkCount: r.idkCount,
      dimensions: r.dims,
      radar: r.radar,
    },
    answers,
  };
}

export function buildExtendedPayload(email: string, hp: string, state: State, r: Result, ctx: Context) {
  return {
    ...envelope("extended_interest", email, hp, state, ctx),
    qualifiers: { planningProjectThisYear: true, canAnswerFinanceAndOps: true },
    result: { total: r.total, band: r.band.name, weakest: r.weakest, dimensions: r.dims },
  };
}

export type SubmitOutcome = { ok: true } | { ok: false; status: number; message: string };

export async function postJson(url: string | undefined, body: unknown): Promise<SubmitOutcome> {
  if (!url) {
    if (import.meta.env.DEV) console.warn("[auxo-score] webhook env var is not set");
    return { ok: false, status: 0, message: MESSAGES.unavailable };
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (res.status === 400) return { ok: false, status: 400, message: MESSAGES.badRequest };
    if (res.status === 429) return { ok: false, status: 429, message: MESSAGES.tooMany };
    if (!res.ok) return { ok: false, status: res.status, message: MESSAGES.failed };
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return data?.ok === true ? { ok: true } : { ok: false, status: res.status, message: MESSAGES.failed };
  } catch {
    return { ok: false, status: 0, message: MESSAGES.failed };
  } finally {
    clearTimeout(timer);
  }
}

