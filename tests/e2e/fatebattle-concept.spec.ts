import { expect, test, type Page } from "@playwright/test";

const approvedMobileViewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
] as const;

test("EN Saju stages four Bright versus Shadow rounds and a verdict", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/saju");

  await page.getByLabel("Alias (optional)").fill("Mira");
  await page.getByLabel("Birth date").fill("1992-08-14");
  await page.getByLabel("I do not know my birth time").check();
  await page
    .getByLabel(
      "I consent to using these details only for this on-screen demo.",
    )
    .check();
  await page.locator("form").evaluate((form) => {
    if (!(form instanceof HTMLFormElement)) {
      throw new Error("Saju form is missing");
    }
    form.requestSubmit();
  });

  await expect(page.locator("[data-battle-round]")).toHaveCount(4);
  await expect(
    page.getByText("Bright Witch", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByText("Shadow Witch", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Fate Judge" }),
  ).toBeVisible();
  await expect(page.getByText("Practical move", { exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await expect(page).toHaveURL("/en/saju");
});

test("KO Yearly stages four clashes, a verdict, and monthly edge", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko/yearly");

  await page.getByLabel("생년월일").fill("1992-08-14");
  await page.getByLabel("살펴볼 연도").selectOption("2028");
  await page
    .getByLabel("입력 정보를 이 화면에서만 사용하는 데 동의합니다.")
    .check();
  await page.locator("form").evaluate((form) => {
    if (!(form instanceof HTMLFormElement)) {
      throw new Error("Yearly form is missing");
    }
    form.requestSubmit();
  });

  await expect(page.locator("[data-year-clash]")).toHaveCount(4);
  await expect(page.getByText("밝은 면", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("그림자 면", { exact: true }).first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "올해의 최종 판결" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "2월", exact: true }).click();
  await expect(page.locator("[data-month-edge]")).toContainText("우세");
  await expectNoHorizontalOverflow(page);
  await expect(page).toHaveURL("/ko/yearly");
});

async function expectNoHorizontalOverflow(page: Page) {
  for (const viewport of approvedMobileViewports) {
    await page.setViewportSize(viewport);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  }
}
