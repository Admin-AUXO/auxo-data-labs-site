import { track } from "../../scripts/analytics/track";

export function scoreEvent(name: string, props: Record<string, string | number | boolean> = {}): void {
  try {
    if (!/(?:^|; )auxo_consent=granted/.test(document.cookie)) return;
    track(name, props);
  } catch {
  }
}
