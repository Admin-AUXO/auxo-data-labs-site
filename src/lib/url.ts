const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
  if (!path || !path.startsWith("/")) return path;
  return base + path;
}

export const siteOrigin = import.meta.env.SITE ?? "https://auxodata.com";

export function absoluteUrl(path: string): string {
  return new URL(withBase(path), siteOrigin).href;
}
