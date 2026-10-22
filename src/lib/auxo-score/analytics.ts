import { track } from "../../scripts/analytics/track";
import { consentGranted } from "../../scripts/analytics/consent";

export function scoreEvent(name: string, props: Record<string, string | number | boolean> = {}): void {
  try {
    if (consentGranted()) track(name, props);
  } catch {}
}
