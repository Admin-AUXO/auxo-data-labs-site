import type { Band, Dimension, State } from "./types";

const STATE_KEY = "auxo-score-v2";
const RESULT_KEY = "auxo-score-v2-result";
const UTM_KEY = "auxo-score-utm";
const LEGACY_KEYS = [
  "auxo-self-check-v3",
  "auxo-self-check-result-v3",
  "auxo-self-check-badge-v1",
  "auxo-self-check-lead-v1",
];

interface SavedResult {
  total: number;
  band: Band["name"];
  weakest: Dimension;
  radar: Record<Dimension, number>;
  completedAt: string;
}

export interface Utm {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
}

function read<T>(store: () => Storage, key: string): T | null {
  try {
    const raw = store().getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(store: () => Storage, key: string, value: unknown): void {
  try {
    store().setItem(key, JSON.stringify(value));
  } catch {
  }
}

const local = () => window.localStorage;
const session = () => window.sessionStorage;

export const loadState = () => read<State>(local, STATE_KEY);
export const saveState = (s: State) => write(local, STATE_KEY, s);
export const saveResult = (r: SavedResult) => write(local, RESULT_KEY, r);

export function clearLegacy(): void {
  try {
    for (const k of LEGACY_KEYS) window.localStorage.removeItem(k);
  } catch {
  }
}

export function captureUtm(): Utm {
  const saved = read<Utm>(session, UTM_KEY);
  if (saved) return saved;
  const p = new URLSearchParams(window.location.search);
  const utm: Utm = {
    source: p.get("utm_source") ?? "",
    medium: p.get("utm_medium") ?? "",
    campaign: p.get("utm_campaign") ?? "",
    content: p.get("utm_content") ?? "",
    term: p.get("utm_term") ?? "",
  };
  write(session, UTM_KEY, utm);
  return utm;
}
