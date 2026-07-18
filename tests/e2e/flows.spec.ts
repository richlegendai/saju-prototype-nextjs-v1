import { expect, test } from "@playwright/test";

test("EN Saju completes in memory at 390x844", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/saju");

  await expect(
    page.getByRole("heading", { name: "Let your chart argue with itself" }),
  ).toBeVisible();
  await page.getByLabel("Alias (optional)").fill("Mira");
  await page.getByLabel("Birth date").fill("1992-08-14");
  await page.getByLabel("I do not know my birth time").check();
  await page
    .getByLabel(
      "I consent to using these details only for this on-screen demo.",
    )
    .check();
  await page.getByRole("button", { name: "Start the fate battle" }).click();

  await expect(
    page.getByRole("heading", { name: "Your fate enters the arena" }),
  ).toBeVisible();
  await expect(page.locator("[data-battle-round]")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: "Fate Judge" }),
  ).toBeVisible();
  await expect(page.getByText("Mira", { exact: false }).first()).toBeVisible();
  await expect(page).toHaveURL("/en/saju");
  await page.screenshot({
    path: ".artifacts/verification/en-saju-result-390x844.png",
    fullPage: true,
  });
});

test("KO Yearly reveals 2028 and changes monthly guidance", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko/yearly");

  await expect(
    page.getByRole("heading", {
      name: "한 해의 기회와 부담을 한눈에 봅니다",
    }),
  ).toBeVisible();
  await page.getByLabel("생년월일").fill("1992-08-14");
  await page.getByLabel("살펴볼 연도").selectOption("2028");
  await page
    .getByLabel("입력 정보를 이 화면에서만 사용하는 데 동의합니다.")
    .check();
  await page.getByRole("button", { name: "운의 대결 시작하기" }).click();

  await expect(
    page.getByRole("heading", { name: "2028년 FateBattle" }),
  ).toBeVisible();
  await expect(page.locator("[data-year-clash]")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: "올해의 최종 판결" }),
  ).toBeVisible();
  const monthChips = page.locator("[data-month-chip]");
  await expect(monthChips).toHaveCount(12);

  const monthDetail = page.locator("[data-month-detail]");
  const januaryDetail = await monthDetail.textContent();
  await page.getByRole("button", { name: "2월", exact: true }).click();
  await expect(monthDetail).not.toHaveText(januaryDetail ?? "");
  await expect(
    page.getByRole("button", { name: "2월", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL("/ko/yearly");
  await page.screenshot({
    path: ".artifacts/verification/ko-yearly-2028-390x844.png",
    fullPage: true,
  });
});
