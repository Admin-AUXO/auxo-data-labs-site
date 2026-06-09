let registered = false;

export function initPWA(): void {
  if (registered) return;
  if (!import.meta.env.PROD) return;
  if (!("serviceWorker" in navigator)) return;

  registered = true;

  const sw = navigator.serviceWorker;

  window.addEventListener("load", () => {
    sw.register("/sw.js", { scope: "/" }).catch(() => {});
  });
}
