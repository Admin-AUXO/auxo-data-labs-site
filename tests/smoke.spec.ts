import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/the-work/",
  "/auxo-score/",
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

test("mobile nav dialog opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  await page.locator(".nav__burger").click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
});

test("retired self-check route redirects to the AUXO Score", async ({ page }) => {
  await page.goto("/self-check/");
  await expect(page).toHaveURL(/\/auxo-score\/$/);
});
