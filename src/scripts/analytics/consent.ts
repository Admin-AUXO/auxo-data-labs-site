type Consent = "granted" | "denied";
const COOKIE = "auxo_consent";

function readConsent(): Consent | null {
  const m = document.cookie.match(/(?:^|; )auxo_consent=(granted|denied)/);
  return m ? (m[1] as Consent) : null;
}

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
function show(): void {
  const banner = bannerEl();
  if (!banner) return;
  banner.classList.remove("is-hidden");
  if (!banner.hasAttribute("tabindex")) banner.setAttribute("tabindex", "-1");
  banner.focus();
}
function hide(): void {
  bannerEl()?.classList.add("is-hidden");
}
function accept(): void {
  writeConsent("granted");
  updateConsent("granted");
  hide();
}
function decline(): void {
  writeConsent("denied");
  updateConsent("denied");
  hide();
}

export function initConsent(): void {
  const banner = bannerEl();
  if (banner && !banner.dataset.bound) {
    banner.dataset.bound = "true";
    banner.querySelector("[data-consent-accept]")?.addEventListener("click", accept);
    banner.querySelector("[data-consent-decline]")?.addEventListener("click", decline);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !banner.classList.contains("is-hidden")) decline();
    });
  }

  for (const el of document.querySelectorAll<HTMLElement>("[data-consent-reopen]")) {
    if (el.dataset.bound) continue;
    el.dataset.bound = "true";
    el.addEventListener("click", show);
  }

  if (readConsent() === null) show();
}
