import { describe, expect, it } from "vitest";
import { en } from "@/lib/locales/en";
import { ko } from "@/lib/locales/ko";

function collectLeafKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    collectLeafKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("locale dictionaries", () => {
  it("keeps Korean and English leaf keys in exact parity", () => {
    expect(collectLeafKeys(ko).sort()).toEqual(collectLeafKeys(en).sort());
  });

  it("ships the approved product name and non-empty localized taglines", () => {
    for (const dictionary of [en, ko]) {
      expect(dictionary.productName).toBe("FateBattle");
      expect(dictionary.tagline.trim().length).toBeGreaterThan(0);
    }
    expect(en.tagline).not.toBe(ko.tagline);
  });

  it("keeps complete battle, verdict, and monthly guidance structures", () => {
    for (const dictionary of [en, ko]) {
      expect(dictionary.saju.rounds).toHaveLength(4);
      expect(dictionary.yearly.clashes).toHaveLength(4);
      expect(dictionary.yearly.months).toHaveLength(12);

      for (const round of [
        ...dictionary.saju.rounds,
        ...dictionary.yearly.clashes,
      ]) {
        expect(round.title.trim().length).toBeGreaterThan(0);
        expect(round.bright.trim().length).toBeGreaterThan(0);
        expect(round.shadow.trim().length).toBeGreaterThan(0);
        expect(round.outcome.trim().length).toBeGreaterThan(0);
      }

      for (const month of dictionary.yearly.months) {
        expect(["bright", "shadow", "balanced"]).toContain(month.edge);
        expect(month.name.trim().length).toBeGreaterThan(0);
        expect(month.edgeLabel.trim().length).toBeGreaterThan(0);
        expect(month.detail.trim().length).toBeGreaterThan(0);
      }

      expect(dictionary.saju.verdict.trim().length).toBeGreaterThan(0);
      expect(dictionary.saju.action.trim().length).toBeGreaterThan(0);
      expect(dictionary.yearly.verdict.trim().length).toBeGreaterThan(0);
      expect(dictionary.yearly.action.trim().length).toBeGreaterThan(0);
    }
  });

  it("localizes the real chart and all three coven roles", () => {
    expect(en.saju.witches.bright.name).toBe("Bright Witch");
    expect(en.saju.witches.shadow.name).toBe("Shadow Witch");
    expect(en.saju.witches.judge.name).toBe("Fate Judge");

    for (const dictionary of [en, ko]) {
      expect(dictionary.saju.chart.title.trim().length).toBeGreaterThan(0);
      expect(dictionary.saju.chart.pillars.year.trim().length).toBeGreaterThan(0);
      expect(dictionary.saju.chart.pillars.month.trim().length).toBeGreaterThan(0);
      expect(dictionary.saju.chart.pillars.day.trim().length).toBeGreaterThan(0);
      expect(dictionary.saju.chart.pillars.hour.trim().length).toBeGreaterThan(0);
      expect(dictionary.saju.chart.unknownTime.trim().length).toBeGreaterThan(0);

      for (const witch of Object.values(dictionary.saju.witches)) {
        expect(witch.name.trim().length).toBeGreaterThan(0);
        expect(witch.role.trim().length).toBeGreaterThan(0);
        expect(witch.creed.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("localizes invalid lunar calendar input", () => {
    expect(en.form.errors.invalidLunarDate).toBe(
      "That lunar date or leap month does not exist in the selected year.",
    );
    expect(ko.form.errors.invalidLunarDate).toBe(
      "선택한 음력 날짜나 윤달이 실제 음력에 없습니다.",
    );
  });

  it("ships deterministic localized profiles for all five elements", () => {
    for (const dictionary of [en, ko]) {
      expect(Object.keys(dictionary.saju.elementProfiles).sort()).toEqual([
        "금",
        "목",
        "수",
        "토",
        "화",
      ]);

      for (const profile of Object.values(dictionary.saju.elementProfiles)) {
        expect(profile.bright.trim().length).toBeGreaterThan(0);
        expect(profile.shadow.trim().length).toBeGreaterThan(0);
        expect(profile.verdict.trim().length).toBeGreaterThan(0);
        expect(profile.action.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
