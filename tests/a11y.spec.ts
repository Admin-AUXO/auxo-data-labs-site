import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const FORCE_VISIBLE =
  "[data-reveal],[data-anim],[data-enter],[data-lines]>*,[data-stagger]>*,.h-px.bg-accent{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important;animation:none!important;}";

type AxeViolation = Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"][number];

const routes = [
  "/",
  "/services/",
  "/about/",
  "/insights/",
  "/contact/",
];

const BLOCKING = new Set(["critical", "serious"]);

function summarize(violations: AxeViolation[]): string {
  return violations
    .map((v) => {
      const targets = v.nodes
        .map((n) => n.target.join(" "))
        .slice(0, 3)
        .join(", ");
      return `  [${v.impact}] ${v.id}: ${v.help} (${targets})`;
    })
    .join("\n");
}

for (const route of routes) {
  test(`no critical/serious a11y violations: ${route}`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await page.locator("footer").first().waitFor();
    await page.waitForTimeout(300);
    await page.addStyleTag({ content: FORCE_VISIBLE });

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const blocking = violations.filter((v) => v.impact && BLOCKING.has(v.impact));

    expect(blocking, `\n${summarize(blocking)}`).toEqual([]);
  });
}
