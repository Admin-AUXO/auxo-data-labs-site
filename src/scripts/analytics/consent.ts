/** Privacy-first consent: no analytics until the visitor accepts. GA4
 *  (gtag) is injected dynamically on consent; the choice is stored in a
 *  first-party cookie for a year. */
import { env } from "../../config/env";

type Consent = "granted" | "denied";
const COOKIE = "auxo_consent";

function readConsent(): Consent | null {
  const m = document.cookie.match(/(?:^|; )auxo_consent=(granted|denied)/);
  return m ? (m[1] as Consent) : null;
}

function writeConsent(value: Consent): void {
  document.cookie = `${COOKIE}=${value}; max-age=31536000; path=/; samesite=lax`;
}

let analyticsLoaded = false;
function loadAnalytics(): void {
  if (analyticsLoaded || !env.ga4.measurementId) return;
  analyticsLoaded = true;
  const id = env.ga4.measurementId;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  function gtag(...args: unknown[]): void {
    w.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
}

function bannerEl(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-consent-banner]");
}
function show(): void {
  bannerEl()?.removeAttribute("hidden");
}
function hide(): void {
  bannerEl()?.setAttribute("hidden", "");
}

export function initConsent(): void {
  const banner = bannerEl();
  if (banner && !banner.dataset.bound) {
    banner.dataset.bound = "true";
    banner.querySelector("[data-consent-accept]")?.addEventListener("click", () => {
      writeConsent("granted");
      hide();
      loadAnalytics();
    });
    banner.querySelector("[data-consent-decline]")?.addEventListener("click", () => {
      writeConsent("denied");
      hide();
    });
  }

  for (const el of document.querySelectorAll<HTMLElement>("[data-consent-reopen]")) {
    if (el.dataset.bound) continue;
    el.dataset.bound = "true";
    el.addEventListener("click", show);
  }

  const choice = readConsent();
  if (choice === "granted") loadAnalytics();
  else if (choice === null) show();
}
