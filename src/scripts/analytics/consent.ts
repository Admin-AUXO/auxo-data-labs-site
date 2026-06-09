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
  const loader = document.createElement("script");
  loader.type = "text/partytown";
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(loader);

  const init = document.createElement("script");
  init.type = "text/partytown";
  init.textContent =
    "window.dataLayer=window.dataLayer||[];" +
    "function gtag(){dataLayer.push(arguments);}" +
    "gtag('js',new Date());" +
    `gtag('config','${id}',{anonymize_ip:true});`;
  document.head.appendChild(init);
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
function dismiss(): void {
  writeConsent("denied");
  hide();
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
    banner.querySelector("[data-consent-decline]")?.addEventListener("click", dismiss);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !banner.classList.contains("is-hidden")) dismiss();
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
