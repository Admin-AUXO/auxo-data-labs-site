import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/services/",
  "/services/foundation-readiness/",
  "/blog/",
  "/blog/decision-velocity-why-data-hasnt-made-your-org-faster/",
  "/contact/",
  "/legal/privacy-policy/",
];

for (const route of routes) {
  test(`page loads: ${route}`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("header.nav")).toBeVisible();
    await expect(page.locator("footer.footer")).toBeVisible();
    await expect(page).toHaveTitle(/AUXO/);
  });
}

test("404 page returns 404 and renders", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
});

test("theme toggle switches data-theme", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const before = await html.getAttribute("data-theme");
  await page.locator("[data-theme-toggle]").first().click();
  await expect(html).not.toHaveAttribute("data-theme", before ?? "dark");
});

test("mobile nav dialog opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  await page.locator(".nav__burger").click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
});

test("services page links to the 8 service detail pages", async ({ page }) => {
  await page.goto("/services/");
  const links = page.locator('a[href^="/services/"][href$="/"]');
  expect(await links.count()).toBeGreaterThanOrEqual(8);
});
