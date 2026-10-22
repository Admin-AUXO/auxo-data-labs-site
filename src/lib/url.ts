const siteOrigin = import.meta.env.SITE ?? "https://auxodata.com";

export function absoluteUrl(path: string): string {
  return new URL(path, siteOrigin).href;
}
