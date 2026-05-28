/** Global client runtime — initialises page-level behaviours.
 *  Component-scoped behaviours (theme, carousel, dialog) self-init via
 *  their own component scripts. Re-run on astro:page-load. */
import { initScrollProgress } from "./scroll-progress";

export function initRuntime(): void {
  initScrollProgress();
}
