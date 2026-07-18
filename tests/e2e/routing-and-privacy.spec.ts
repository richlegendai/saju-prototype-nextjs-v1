import { expect, test } from "@playwright/test";

const serviceCards = [
  { name: "Four Pillars Battle", href: "/en/saju" },
  { name: "Compatibility Battle", href: "/en/service/compatibility" },
  { name: "10-Year Cycle Battle", href: "/en/service/ten-year-cycle" },
  { name: "Yearly FateBattle", href: "/en/yearly" },
  { name: "Timing Battle", href: "/en/service/auspicious-dates" },
  { name: "Daily FateBattle", href: "/en/service/daily-fortune" },
  { name: "Challenge the Verdict", href: "/en/service/ask-the-coven" },
] as const;

const bottomDestinations = [
  { name: "Daily", href: "/en/service/daily-fortune" },
  { name: "Home", href: "/en" },
  { name: "Add Chart", href: "/en/saju" },
  { name: "Coven Chat", href: "/en/service/ask-the-coven" },
  { name: "Archive", href: "/en/service/archive" },
] as const;

test("root redirects by browser language and honors locale-only cookie", async ({
  browser,
}) => {
  const koContext = await browser.newContext({
    locale: "ko-KR",
    extraHTTPHeaders: { "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8" },
  });
  const koPage = await koContext.newPage();
  await koPage.goto("/");
  await expect(koPage).toHaveURL("/ko");
  await koContext.close();

  const enContext = await browser.newContext({
    locale: "en-US",
    extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9,ko;q=0.8" },
  });
  const enPage = await enContext.newPage();
  await enPage.goto("/");
  await expect(enPage).toHaveURL("/en");
  await enContext.close();

  const persistedContext = await browser.newContext({
    locale: "ko-KR",
    extraHTTPHeaders: { "Accept-Language": "ko-KR,ko;q=0.9" },
  });
  await persistedContext.addCookies([
    {
      name: "saju-locale",
      value: "en",
      domain: "127.0.0.1",
      path: "/",
    },
  ]);
  const persistedPage = await persistedContext.newPage();
  await persistedPage.goto("/");
  await expect(persistedPage).toHaveURL("/en");
  await persistedContext.close();
});

test("language switch preserves the active route and stores only locale", async ({
  page,
  context,
}) => {
  await page.goto("/en/yearly");
  await page.getByRole("link", { name: "한국어" }).click();

  await expect(page).toHaveURL("/ko/yearly");
  const cookies = await context.cookies();
  expect(cookies).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: "saju-locale", value: "ko" }),
    ]),
  );
  expect(cookies.map(({ name }) => name)).toEqual(["saju-locale"]);
});

test("all seven service cards link to live destinations", async ({ page }) => {
  for (const card of serviceCards) {
    await page.goto("/en");
    const link = page.getByRole("link", { name: card.name });
    await expect(link).toHaveAttribute("href", card.href);

    const response = await page.goto(card.href);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("404")).toHaveCount(0);
  }
});

test("all five bottom navigation targets work", async ({ page }) => {
  await page.goto("/en");
  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(navigation.getByRole("link")).toHaveCount(5);

  for (const destination of bottomDestinations) {
    await page.goto("/en");
    const link = page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: destination.name, exact: true });
    await expect(link).toHaveAttribute("href", destination.href);

    const response = await page.goto(destination.href);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("required result and legal routes are reachable", async ({ page }) => {
  const paths = [
    "/en/saju/result",
    "/ko/saju/result",
    "/en/yearly/result",
    "/ko/yearly/result",
    "/en/service/privacy",
    "/en/service/demo-terms",
    "/en/service/disclaimer",
  ];

  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("birth data stays out of URL, storage, cookies, and application APIs", async ({
  page,
  context,
}) => {
  const requests: string[] = [];
  const apiRequests: string[] = [];
  page.on("request", (request) => {
    const serialized = `${request.url()} ${request.postData() ?? ""}`;
    requests.push(serialized);
    if (new URL(request.url()).pathname.startsWith("/api/")) {
      apiRequests.push(serialized);
    }
  });

  await page.goto("/en/saju");
  await page.getByLabel("Alias (optional)").fill("Mira");
  await page.getByLabel("Birth date").fill("1992-08-14");
  await page.getByLabel("I do not know my birth time").check();
  await page.getByLabel("Country (optional)").fill("Korea");
  await page.getByLabel("City (optional)").fill("Seoul");
  await page
    .getByLabel(
      "I consent to using these details only for this on-screen demo.",
    )
    .check();
  await page.getByRole("button", { name: "Start the fate battle" }).click();

  expect(page.url()).not.toContain("1992-08-14");
  expect(page.url()).not.toContain("Seoul");
  const storage = await page.evaluate(() => ({
    local: Object.entries(localStorage),
    session: Object.entries(sessionStorage),
  }));
  expect(JSON.stringify(storage)).not.toContain("1992-08-14");
  expect(JSON.stringify(storage)).not.toContain("Seoul");

  const cookies = await context.cookies();
  expect(JSON.stringify(cookies)).not.toContain("1992-08-14");
  expect(JSON.stringify(cookies)).not.toContain("Seoul");
  expect(requests.join("\n")).not.toContain("1992-08-14");
  expect(requests.join("\n")).not.toContain("Seoul");
  expect(apiRequests).toEqual([]);
});

test("prototype metadata is localized, canonical, and noindex", async ({
  page,
}) => {
  await page.goto("/en/saju");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex.*nofollow/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://fatebattle.com/en/saju",
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="ko"]'),
  ).toHaveAttribute("href", "https://fatebattle.com/ko/saju");
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", "https://fatebattle.com/en/saju");

  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain("Disallow: /");
});

test("mobile surfaces never overflow at approved widths", async ({ page }) => {
  const viewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
  ];
  const paths = ["/en", "/en/saju", "/ko/yearly"];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const path of paths) {
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
    }
  }

  await page.goto("/en");
  await page.screenshot({
    path: ".artifacts/verification/home-430x932.png",
    fullPage: true,
  });
});

test("header subtitle is complete or hidden at approved widths", async ({
  page,
}) => {
  const viewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/en");
    const subtitle = page.locator(".brand-subtitle");

    if (await subtitle.isVisible()) {
      const dimensions = await subtitle.evaluate((element) => ({
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
    }
  }
});

test("home interactive surfaces meet mobile touch target minimums", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");

  const targets = page.locator(
    ".service-card, .bottom-nav a, .header-actions a, .header-actions button",
  );
  const count = await targets.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const box = await targets.nth(index).boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test("runtime uses no external font requests or console errors", async ({
  page,
}) => {
  const fontRequests: string[] = [];
  const consoleErrors: string[] = [];
  page.on("request", (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) {
      fontRequests.push(request.url());
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(fontRequests).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
