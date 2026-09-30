import { track } from "../../scripts/analytics/track";

/** Sends a score event only when the visitor accepted analytics cookies. Never pass personal data. */
export function scoreEvent(name: string, props: Record<string, string | number | boolean> = {}): void {
  try {
    if (!/(?:^|; )auxo_consent=granted/.test(document.cookie)) return;
    track(name, props);
  } catch {
    /* analytics must never break the test */
  }
}
