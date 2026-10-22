type Consent = "granted" | "denied";
const COOKIE = "auxo_consent";
const COOKIE_RE = new RegExp(`(?:^|; )${COOKIE}=(granted|denied)`);

function readConsent(): Consent | null {
  const m = document.cookie.match(COOKIE_RE);
  return m ? (m[1] as Consent) : null;
}

export const consentGranted = (): boolean => readConsent() === "granted";

function writeConsent(value: Consent): void {
  document.cookie = `${COOKIE}=${value}; max-age=31536000; path=/; samesite=lax`;
}

function updateConsent(value: Consent): void {
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  const dl = (w.dataLayer ??= []);
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", { analytics_storage: value });
  } else {
    dl.push(["consent", "update", { analytics_storage: value }]);
  }
  dl.push({ event: "auxo_consent_update", consent_state: value });
}

function bannerEl(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-consent-banner]");
}

function isOpen(): boolean {
  const banner = bannerEl();
  return !!banner && !banner.classList.contains("is-hidden");
}

function show(focus: boolean): void {
  const banner = bannerEl();
  if (!banner) return;
  banner.classList.remove("is-hidden");
  if (!focus) return;
  if (!banner.hasAttribute("tabindex")) banner.setAttribute("tabindex", "-1");
  banner.focus();
}

function hide(): void {
  bannerEl()?.classList.add("is-hidden");
}

function choose(value: Consent): void {
  writeConsent(value);
  updateConsent(value);
  hide();
}

let escBound = false;

export function initConsent(): void {
  const banner = bannerEl();
  if (banner && !banner.dataset.bound) {
    banner.dataset.bound = "true";
    banner.querySelector("[data-consent-accept]")?.addEventListener("click", () => choose("granted"));
    banner.querySelector("[data-consent-decline]")?.addEventListener("click", () => choose("denied"));
  }

  if (!escBound) {
    escBound = true;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) choose("denied");
    });
  }

  for (const el of document.querySelectorAll<HTMLElement>("[data-consent-reopen]")) {
    if (el.dataset.bound) continue;
    el.dataset.bound = "true";
    el.addEventListener("click", () => show(true));
  }

  if (readConsent() === null) show(false);
}
