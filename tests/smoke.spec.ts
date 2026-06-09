import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/services/",
  "/insights/",
  "/contact/",
  "/legal/privacy-policy/",
  "/legal/terms/",
  "/legal/cookie-policy/",
];

for (const route of routes) {
  test(`page loads: ${route}`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();
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
  await expect(html).not.toHaveAttribute("data-theme", before ?? "light");
});

test("theme is preserved across navigation", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-theme-toggle]").first().click();
  const chosen = await page.locator("html").getAttribute("data-theme");
  await page.locator('.nav__links a[href="/about/"]').click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", chosen ?? "dark");
});

test("mobile nav dialog opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  await page.locator(".nav__burger").click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
});

test("retired routes redirect to a surviving page", async ({ page }) => {
  await page.goto("/diagnostic/");
  await expect(page).toHaveURL(/\/services\/$/);
});

test("services pricing is shown openly", async ({ page }) => {
  await page.goto("/services/");
  await expect(page.locator("#pricing-gate")).toHaveCount(0);
  await expect(page.getByText(/AED/i).first()).toBeVisible();
});
