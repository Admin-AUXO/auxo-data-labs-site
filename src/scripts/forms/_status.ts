import { isInputError, type ActionError } from "astro:actions";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type StatusState = "info" | "success" | "error";

export const ICON_PATHS: Record<StatusState, string> = {
  success: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z",
  error: "M11 15h2v2h-2zm0-8h2v6h-2z",
  info: "M11 9h2V7h-2zm0 8h2v-6h-2zm1 5A10 10 0 1 0 12 2a10 10 0 0 0 0 20z",
};

interface RenderStatusOptions {
  iconClass: string;
  iconSize: number;
}

export function renderStatus(
  region: HTMLElement,
  state: StatusState,
  message: string,
  options: RenderStatusOptions,
): void {
  region.dataset.state = state;
  const size = String(options.iconSize);
  region.innerHTML = `<svg class="${options.iconClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${ICON_PATHS[state]}"/></svg><span>${message}</span>`;
}

export function actionErrorMessage(error: ActionError, fallback: string): string {
  if (isInputError(error)) {
    return Object.values(error.fields)[0]?.[0] ?? fallback;
  }
  return fallback;
}
