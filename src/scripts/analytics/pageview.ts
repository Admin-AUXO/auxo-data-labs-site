/**
 * SPA page-view tracking for client-side (view-transition) navigations.
 *
 * GTM/GA4 only counts the *initial* document load on its own. With Astro's
 * <ClientRouter />, subsequent navigations swap the DOM via the History API
 * without a full reload, so they can go untracked unless GA4 Enhanced
 * Measurement "history events" happens to be enabled.
 *
 * This pushes an explicit `page_view` event to the dataLayer on every swap as a
 * belt-and-suspenders measure. It fires on `astro:after-swap` (NOT the initial
 * load), so it never double-counts the first page.
 *
 * NOTE: for this to register in GA4, the GTM container (GTM-N6547BGW) needs a
 * trigger on the custom event `page_view` routing to the GA4 tag. If Enhanced
 * Measurement history tracking is already on, this push is simply redundant and
 * harmless — Consent Mode still gates whether anything is actually sent.
 */

interface DataLayerWindow extends Window {
  dataLayer?: Record<string, unknown>[];
}

export function initPageviewTracking(): void {
  const w = window as DataLayerWindow;

  document.addEventListener("astro:after-swap", () => {
    if (!Array.isArray(w.dataLayer)) return;
    w.dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search,
      page_location: location.href,
      page_title: document.title,
    });
  });
}
