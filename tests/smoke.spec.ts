import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/how-it-works/",
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

test("business-card /v route redirects to /hello/", async ({ page }) => {
  await page.goto("/v/");
  await expect(page).toHaveURL(/\/hello\/$/);
});

test("card page: choose a founder, then change back", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/hello/");
  const panel = page.locator("#panel-ajay");
  await expect(panel).toBeHidden();
  await page.locator('[data-founder="ajay"]').click();
  await expect(panel).toBeVisible();
  await expect(panel.locator('a[href="/vcard/ajay-kumar.vcf"]')).toBeVisible();
  await expect(page).toHaveURL(/#ajay$/);
  await page.reload();
  await expect(panel).toBeVisible();
  await panel.locator("[data-change]").click();
  await expect(page.locator(".card__choose")).toBeVisible();
  await expect(panel).toBeHidden();
});
