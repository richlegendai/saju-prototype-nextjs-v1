import { expect, test, type Page } from "@playwright/test";

test("EN actual Four Pillars stays private and deterministic at 390x844", async ({
  page,
  context,
}) => {
  const requests: string[] = [];
  const consoleErrors: string[] = [];
  page.on("request", (request) => {
    requests.push(`${request.url()} ${request.postData() ?? ""}`);
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/saju");
  await submitUnknownTimeReading(page);

  await expect(page.locator("[data-four-pillars-chart]")).toBeVisible();
  await expect(page.locator('[data-saju-pillar="year"]')).toContainText("임신");
  await expect(page.locator('[data-saju-pillar="year"]')).toContainText("壬申");
  await expect(page.locator('[data-saju-pillar="month"]')).toContainText("무신");
  await expect(page.locator('[data-saju-pillar="day"]')).toContainText("임술");
  await expect(page.locator('[data-saju-pillar="hour"]')).toContainText(
    "Unknown",
  );
  await expect(page.locator("[data-element-count]")).toHaveCount(5);

  await expect(page.locator('[data-coven-role="bright"]')).toContainText(
    "Bright Witch",
  );
  await expect(page.locator('[data-coven-role="shadow"]')).toContainText(
    "Shadow Witch",
  );
  await expect(page.locator('[data-coven-role="judge"]')).toContainText(
    "Fate Judge",
  );
  await expect(page.locator("[data-battle-round]")).toHaveCount(4);
  await expect(page.locator("[data-fate-judge-verdict]")).toBeVisible();

  const firstVerdict =
    (await page.locator("[data-fate-judge-verdict]").textContent()) ?? "";
  expect(firstVerdict.trim().length).toBeGreaterThan(0);

  const storage = await page.evaluate(() => ({
    local: Object.entries(localStorage),
    session: Object.entries(sessionStorage),
  }));
  expect(storage.local).toEqual([]);
  expect(
    storage.session.filter(
      ([key]) => !key.startsWith("__next_debug_channel:"),
    ),
  ).toEqual([]);
  expect(JSON.stringify(storage)).not.toContain("1992-08-14");
  expect(JSON.stringify(storage)).not.toContain("Seoul");
  expect(page.url()).not.toContain("1992-08-14");
  expect(page.url()).not.toContain("Seoul");
  expect(requests.join("\n")).not.toContain("1992-08-14");
  expect(requests.join("\n")).not.toContain("Seoul");
  expect(requests.filter((request) => request.includes("/api/"))).toEqual([]);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  await page.getByRole("button", { name: "Read another chart" }).click();
  await submitUnknownTimeReading(page);
  await expect(page.locator("[data-fate-judge-verdict]")).toHaveText(
    firstVerdict,
  );
  expect(consoleErrors).toEqual([]);

  const cookies = await context.cookies();
  expect(JSON.stringify(cookies)).not.toContain("1992-08-14");
  expect(JSON.stringify(cookies)).not.toContain("Seoul");
  await page.screenshot({
    path: ".artifacts/verification/actual-saju-en-390x844.png",
    fullPage: true,
  });
});

test("KO known time renders all four actual pillars and three witches", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko/saju");
  await page.getByLabel("별칭 (선택)").fill("미라");
  await page.getByLabel("생년월일").fill("1992-08-14");
  await page.getByLabel("출생 시간", { exact: true }).fill("08:30");
  await page
    .getByLabel("입력 정보를 이 화면에서만 사용하는 데 동의합니다.")
    .check();
  await page.getByRole("button", { name: "운의 대결 시작하기" }).click();

  await expect(page.locator('[data-saju-pillar="year"]')).toContainText("임신");
  await expect(page.locator('[data-saju-pillar="month"]')).toContainText("무신");
  await expect(page.locator('[data-saju-pillar="day"]')).toContainText("임술");
  await expect(page.locator('[data-saju-pillar="hour"]')).toContainText("갑진");
  await expect(page.locator('[data-saju-pillar="hour"]')).toContainText("甲辰");
  await expect(page.locator("[data-coven-role]")).toHaveCount(3);
  await expect(page.locator('[data-coven-role="judge"]')).toContainText(
    "운명 판관",
  );
  await expect(page.locator("[data-battle-round]")).toHaveCount(4);
  await expect(page.locator("[data-fate-judge-verdict]")).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  await page.screenshot({
    path: ".artifacts/verification/actual-saju-ko-390x844.png",
    fullPage: true,
  });
});

for (const scenario of [
  {
    name: "a day outside the selected lunar month",
    birthDate: "1992-01-30",
    leapMonth: false,
  },
  {
    name: "a leap month that does not exist in the selected year",
    birthDate: "1992-01-29",
    leapMonth: true,
  },
]) {
  test(`KO ${scenario.name} stays on the form with a localized error`, async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto("/ko/saju");
    await page.getByLabel("음력").check();
    await page.getByLabel("생년월일").fill(scenario.birthDate);
    if (scenario.leapMonth) {
      await page.getByLabel("음력 윤달").check();
    }
    await page.getByLabel("출생 시간을 모릅니다").check();
    await page
      .getByLabel("입력 정보를 이 화면에서만 사용하는 데 동의합니다.")
      .check();
    await page.getByRole("button", { name: "운의 대결 시작하기" }).click();

    await expect(page.locator(".reading-form")).toBeVisible();
    await expect(page.locator("#birth-date-error")).toHaveText(
      "선택한 음력 날짜나 윤달이 실제 음력에 없습니다.",
    );
    await expect(page.locator("[data-four-pillars-chart]")).toHaveCount(0);
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

async function submitUnknownTimeReading(page: Page) {
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
}
