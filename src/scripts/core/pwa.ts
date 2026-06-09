let registered = false;

export function initPWA(): void {
  if (registered) return;
  if (!import.meta.env.PROD) return;
  if (!("serviceWorker" in navigator)) return;

  registered = true;

  const sw = navigator.serviceWorker;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  window.addEventListener("load", () => {
    sw.register(`${base}/sw.js`, { scope: `${base}/` }).catch(() => {});
  });
}
