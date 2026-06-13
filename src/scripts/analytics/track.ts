type Params = Record<string, unknown>;
interface DataLayerWindow extends Window {
  dataLayer?: Record<string, unknown>[];
}

const FILE_RE =
  /\.(pdf|docx?|xlsx?|pptx?|csv|zip|rar|7z|gz|tar|dmg|pkg|exe|mp3|mp4|mov|avi|wav|svg|png|jpe?g|gif)$/i;
const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;
const ENGAGEMENT_MILESTONES = [30, 60, 120, 300] as const;
const RAGE_WINDOW = 700;
const RAGE_RADIUS = 36;
const RAGE_COUNT = 3;

let prevUrl: string | null = null;
let pageStart = 0;
let scrollFired = new Set<number>();
let engagementTimers: number[] = [];
let rageHits: { t: number; x: number; y: number }[] = [];
let searchTimer = 0;
let inited = false;

export function track(event: string, params: Params = {}): void {
  const w = window as DataLayerWindow;
  if (!Array.isArray(w.dataLayer)) w.dataLayer = [];
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") clean[k] = v;
  }
  w.dataLayer.push({ event, ...clean });
}

function elementSelector(el: Element | null): string {
  if (!el) return "";
  if (el.id) return `#${el.id}`;
  const cls = (el.className || "").toString().trim().split(/\s+/).slice(0, 2).join(".");
  return cls ? `${el.tagName.toLowerCase()}.${cls}` : el.tagName.toLowerCase();
}

function pageView(): void {
  track("page_view", {
    page_path: location.pathname + location.search,
    page_location: location.href,
    page_title: document.title,
    page_referrer: prevUrl ?? document.referrer,
  });
  prevUrl = location.href;
}

function onClick(e: MouseEvent): void {
  const start = e.target as Element | null;
  if (!start || typeof start.closest !== "function") return;

  recordRage(e);

  const cal = start.closest<HTMLElement>(
    '[data-google-calendar-open], a[href*="calendar.app.google"]',
  );
  if (cal) {
    track("schedule_meeting", {
      location: location.pathname,
      context: (cal.textContent || "Book a meeting").trim().slice(0, 80),
      value: undefined,
    });
    return;
  }

  const btn = start.closest<HTMLElement>(".btn");
  if (btn) {
    const href = btn.getAttribute("href") || "";
    track("cta_click", {
      cta_text: (btn.textContent || "").trim().slice(0, 80),
      cta_location: location.pathname,
      cta_destination: href,
      cta_type: btn.dataset.variant || (btn.tagName === "BUTTON" ? "button" : "link"),
      link_url: href,
    });
  }

  const link = start.closest<HTMLAnchorElement>("a[href]");
  if (!link) return;
  let url: URL;
  try {
    url = new URL(link.href, location.href);
  } catch {
    return;
  }
  const text = (link.textContent || link.getAttribute("aria-label") || "").trim().slice(0, 80);
  const inNav = Boolean(link.closest("[data-nav], header, nav, footer"));
  const isOutbound = url.origin !== location.origin && /^https?:$/.test(url.protocol);

  if (isOutbound) {
    track("click", {
      link_url: url.href,
      link_text: text,
      link_location: location.pathname,
      outbound: true,
    });
  } else if (FILE_RE.test(url.pathname)) {
    const file = url.pathname.split("/").pop() || url.pathname;
    track("file_download", {
      file_name: file,
      file_extension: (file.split(".").pop() || "").toLowerCase(),
      file_url: url.href,
      link_url: url.href,
      link_location: location.pathname,
    });
  }

  if (inNav) {
    track("navigation_click", {
      link_text: text,
      link_url: url.href,
      link_location: link.closest("footer") ? "footer" : "header",
      link_type: isOutbound ? "external" : "internal",
    });
  }
}

function onScroll(): void {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  if (max <= 0) return;
  const pct = (doc.scrollTop / max) * 100;
  for (const t of SCROLL_THRESHOLDS) {
    if (pct >= t && !scrollFired.has(t)) {
      scrollFired.add(t);
      track("scroll", {
        percent_scrolled: t,
        engagement_time_msec: Math.round(performance.now() - pageStart),
      });
    }
  }
}

function recordRage(e: MouseEvent): void {
  const now = performance.now();
  rageHits = rageHits.filter((h) => now - h.t < RAGE_WINDOW);
  rageHits.push({ t: now, x: e.clientX, y: e.clientY });
  if (rageHits.length < RAGE_COUNT) return;
  const recent = rageHits.slice(-RAGE_COUNT);
  const within = recent.every(
    (h) =>
      Math.abs(h.x - recent[0].x) < RAGE_RADIUS && Math.abs(h.y - recent[0].y) < RAGE_RADIUS,
  );
  if (within) {
    rageHits = [];
    track("rage_click", {
      click_count: RAGE_COUNT,
      click_selector: elementSelector(e.target as Element),
    });
  }
}

function onError(e: ErrorEvent): void {
  track("exception", { description: (e.message || "error").slice(0, 150), fatal: false });
}
function onRejection(e: PromiseRejectionEvent): void {
  const reason = e.reason;
  const desc = typeof reason === "string" ? reason : (reason?.message ?? "unhandledrejection");
  track("exception", { description: String(desc).slice(0, 150), fatal: false });
}

function scheduleEngagement(): void {
  engagementTimers.forEach(clearTimeout);
  engagementTimers = ENGAGEMENT_MILESTONES.map((sec) =>
    window.setTimeout(
      () => track("engagement_milestone", { engagement_time_msec: sec * 1000, milestone: sec }),
      sec * 1000,
    ),
  );
}

function onSearchInput(e: Event): void {
  const t = e.target as HTMLElement | null;
  if (!t || !t.closest("#pagefind-search")) return;
  const input = t as HTMLInputElement;
  if (input.type && input.type !== "text" && input.type !== "search") return;
  const term = (input.value || "").trim();
  clearTimeout(searchTimer);
  if (term.length < 2) return;
  searchTimer = window.setTimeout(
    () => track("search", { search_term: term, search_location: "site-search" }),
    800,
  );
}

function resetPageState(): void {
  pageStart = performance.now();
  scrollFired = new Set();
}

export function initAnalytics(): void {
  if (inited) return;
  inited = true;
  document.addEventListener("click", onClick, true);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
  document.addEventListener("input", onSearchInput);
  document.addEventListener("astro:page-load", () => {
    resetPageState();
    pageView();
    scheduleEngagement();
  });
}
