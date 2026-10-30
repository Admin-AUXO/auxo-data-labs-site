import type { Utm } from "./storage";
import type { State } from "./types";

export const MAX_SUBMITS = 3;

export const MESSAGES = {
  tooMany: "Too many requests. Please wait a minute and try again.",
} as const;

interface Context {
  page: string;
  referrer: string;
  utm: Utm;
  startedAt: string;
  durationSec: number;
  locale: string;
  timezone: string;
}

export const uuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (Number(c) ^ (Math.random() * 16) >> (Number(c) / 4)).toString(16),
      );

export function durationSec(startedAt: string): number {
  const started = Date.parse(startedAt);
  return Number.isFinite(started) ? Math.max(0, Math.round((Date.now() - started) / 1000)) : 0;
}

export function buildContext(state: State, utm: Utm): Context {
  let timezone = "";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timezone = "";
  }
  return {
    page: "/auxo-score/",
    referrer: document.referrer || "",
    utm,
    startedAt: state.startedAt,
    durationSec: durationSec(state.startedAt),
    locale: navigator.language || "",
    timezone,
  };
}
