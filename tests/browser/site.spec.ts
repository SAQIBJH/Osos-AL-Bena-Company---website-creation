import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
const products = JSON.parse(
  readFileSync(
    new URL("../../src/data/products.json", import.meta.url),
    "utf8",
  ),
) as { slug: string; name: string }[];
test("catalog searching, multi-facets, chips, URL restore and empty recovery", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/products/");
  await expect(page.locator(".product-card")).toHaveCount(41);
  await page.getByRole("searchbox").fill("TYPE-TF");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear search" }).click();
  const rail = page.locator(".filter-rail");
  await rail.getByLabel("Cable baskets", { exact: true }).check();
  await rail.getByLabel("Cable cleats", { exact: true }).check();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await rail.getByLabel("BTS", { exact: true }).check();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Remove Brand BTS", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.goBack();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.goForward();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByRole("searchbox").fill("no-such-product");
  await expect(
    page.getByText("No products match your selection."),
  ).toBeVisible();
  await page
    .locator(".empty-state")
    .getByRole("button", { name: "Clear all" })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(41);
  expect(errors).toEqual([]);
});
test("every product detail is directly served with specifications", async ({
  request,
}) => {
  for (const p of products) {
    const r = await request.get(`/products/${p.slug}/`);
    expect(r.status()).toBe(200);
    const html = await r.text();
    expect(html).toContain("<h1>" + p.name.replaceAll("&", "&amp;") + "</h1>");
    expect(html).toContain("Technical specifications");
    expect(html).not.toContain("undefined");
  }
});
test("no JavaScript still has all catalog links and actual page content", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/products/");
  await expect(page.locator(".product-card")).toHaveCount(41);
  await page.goto(`/products/${products[0].slug}/`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    products[0].name,
  );
  await context.close();
});
test("WhatsApp form encodes draft without pretending it was sent", async ({
  page,
}) => {
  await page.goto("/contact/");
  await page.evaluate(() => {
    (window as any).__opened = "";
    window.open = ((url: string) => {
      (window as any).__opened = url;
      return null;
    }) as typeof window.open;
  });
  await page.getByLabel("Your name").fill("A&B");
  await page.getByLabel("What do you need?").fill("41×41 + supports");
  await page.getByRole("button", { name: "Continue to WhatsApp" }).click();
  const url = await page.evaluate(() => (window as any).__opened);
  expect(new URL(url).searchParams.get("text")).toContain("A&B");
  expect(new URL(url).searchParams.get("text")).toContain("41×41 + supports");
});
test("mobile menu, filter dialog and focus return", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/products/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("#site-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-nav")).not.toBeVisible();
  const trigger = page.locator(".filter-trigger");
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveAccessibleName("Filters");
  expect((await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze()).violations).toEqual([]);
  await page
    .getByRole("dialog")
    .getByLabel("Cable cleats", { exact: true })
    .check();
  await page.getByRole("button", { name: "Show products (1)" }).click();
  await expect(trigger).toBeFocused();
  await expect(page.locator(".product-card")).toHaveCount(1);
});
test("broken images switch to local fallback", async ({ page }) => {
  await page.goto("/");
  await page.locator(".product-card img").first().scrollIntoViewIfNeeded();
  await page
    .locator(".product-card img")
    .first()
    .evaluate((image: HTMLImageElement) => {
      image.src = "/images/missing-image.webp";
    });
  await expect(page.locator(".product-card img").first()).toHaveAttribute(
    "src",
    "/images/product-fallback.svg",
  );
});
test("responsive views have no overflow and pass automated accessibility", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/about/",
    "/products/",
    `/products/${products[0].slug}/`,
    "/contact/",
  ]) {
    await page.goto(path);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
    }
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
