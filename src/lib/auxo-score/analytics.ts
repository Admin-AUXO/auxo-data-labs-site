import { track } from "../../scripts/analytics/track";
import { consentGranted } from "../../scripts/analytics/consent";
import { captureUtm } from "./storage";

export function scoreEvent(name: string, props: Record<string, string | number | boolean> = {}): void {
  try {
    if (!consentGranted()) return;
    const utm = captureUtm();
    track(name, { campaign: utm.campaign, source: utm.source, ...props });
  } catch {}
}
