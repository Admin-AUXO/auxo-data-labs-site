import { readdirSync, readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/how-it-works/",
  "/pricing/",
  "/marketplace/",
  "/blog/",
  "/about/",
  "/auxo-score/",
  "/insights/",
  "/contact/",
  "/legal/privacy-policy/",
  "/legal/terms/",
  "/legal/cookie-policy/",
];

const blogDir = new URL("../src/content/blog/", import.meta.url);
const blogSlugs = readdirSync(blogDir)
  .filter((f) => /\.mdx?$/.test(f))
  .filter((f) => !/^draft:\s*true\s*$/m.test(readFileSync(new URL(f, blogDir), "utf8")))
  .map((f) => f.replace(/\.mdx?$/, ""));

for (const route of routes) {
  test(`page loads: ${route}`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/AUXO/);
  });
}

test("primary nav lists the new routes", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  for (const href of ["/how-it-works/", "/pricing/", "/marketplace/", "/blog/", "/auxo-score/"]) {
    await expect(nav.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
});

test("homepage hero and section links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toContainText("Your data, ready for AI");
  await expect(page.locator('main a[href="/how-it-works/#analyze"]')).toHaveCount(1);
  await expect(page.locator('main a[href="/pricing/#mid-sized"]')).toHaveCount(1);
  await expect(page.locator('main a[href^="/marketplace/?category="]').first()).toBeVisible();
});

test("how it works has the ladder anchors", async ({ page }) => {
  await page.goto("/how-it-works/");
  for (const id of ["analyze", "advise", "build", "managed-upkeep", "faq"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator("#analyze h2")).toHaveText("Analyze");
});

test("pricing shows three segment cards with one recommended", async ({ page }) => {
  await page.goto("/pricing/");
  const cards = page.locator(".plans > .plan");
  await expect(cards).toHaveCount(3);
  for (const id of ["funded-startups", "mid-sized", "enterprise"]) {
    await expect(page.locator(`#${id} article h2`)).toBeVisible();
  }
  await expect(page.locator(".plan__badge")).toHaveCount(1);
  await expect(page.locator("#mid-sized .plan__badge")).toHaveText("Recommended");
  await expect(page.locator('#funded-startups a[href="/auxo-score/?offer=free-audit"]')).toBeVisible();
  await expect(page.locator('#enterprise a[href="/contact/?topic=enterprise"]')).toBeVisible();
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/AED|USD|\$\s?\d|€\s?\d|most popular/i);
});

test("marketplace filter reads and writes the category", async ({ page }) => {
  await page.goto("/marketplace/?category=finance");
  const finance = page.locator('[data-filter="finance"]');
  await expect(finance).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('.mkt-grid > [data-category="finance"]').first()).toBeVisible();
  await expect(page.locator('.mkt-grid > [data-category="engineering"]').first()).toBeHidden();
  await expect(page.locator('.mkt-grid > [data-category="any"]')).toBeVisible();

  await page.locator('[data-filter="engineering"]').click();
  await expect(page).toHaveURL(/\?category=engineering$/);
  await expect(page.locator('.mkt-grid > [data-category="engineering"]').first()).toBeVisible();
  await expect(page.locator('.mkt-grid > [data-category="finance"]').first()).toBeHidden();

  await page.locator('[data-filter="all"]').click();
  await expect(page).not.toHaveURL(/category=/);
  await expect(page.locator('.mkt-grid > [data-category="finance"]').first()).toBeVisible();
});

test("marketplace add to stack fills the tray", async ({ page }) => {
  await page.goto("/marketplace/");
  const tray = page.locator("[data-stack-tray]");
  await expect(tray).toBeHidden();
  const first = page.locator("[data-add-to-stack]").first();
  await first.click();
  await expect(first).toHaveAttribute("data-added", "true");
  await expect(tray).toBeVisible();
  await page.locator("[data-stack-clear]").click();
  await expect(tray).toBeHidden();
});

test("blog index lists every published post", async ({ page }) => {
  await page.goto("/blog/");
  for (const slug of blogSlugs) {
    await expect(page.locator(`.blog-list a[href="/blog/${slug}/"]`)).toHaveCount(1);
  }
});

for (const slug of blogSlugs) {
  test(`blog post loads: ${slug}`, async ({ page }) => {
    const res = await page.goto(`/blog/${slug}/`);
    expect(res?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator(".blog-prose")).toBeVisible();
    await expect(page.locator('a[href="/blog/"]').first()).toBeVisible();
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

test("retired the-work route redirects to how it works", async ({ page }) => {
  await page.goto("/the-work/");
  await expect(page).toHaveURL(/\/how-it-works\/$/);
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
