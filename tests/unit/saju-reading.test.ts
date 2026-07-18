import { describe, expect, it } from "vitest";
import {
  getSajuReading,
  type SajuReadingInput,
} from "@/lib/saju-reading";

const unknownTimeInput = {
  alias: "Mira",
  calendar: "solar",
  birthDate: "1992-08-14",
  birthTime: "",
  timeUnknown: true,
  isLeapMonth: false,
  country: "Korea",
  city: "Seoul",
  consent: true,
} satisfies SajuReadingInput;

describe("getSajuReading", () => {
  it("returns independently verified real pillars for 1992-08-14", () => {
    const reading = getSajuReading(unknownTimeInput);

    expect(reading.pillars.year).toMatchObject({
      korean: "임신",
      hanja: "壬申",
    });
    expect(reading.pillars.month).toMatchObject({
      korean: "무신",
      hanja: "戊申",
    });
    expect(reading.pillars.day).toMatchObject({
      korean: "임술",
      hanja: "壬戌",
    });
    expect(reading.dayElement).toBe("수");
    expect(() => JSON.stringify(reading)).not.toThrow();
  });

  it("uses internal noon without exposing a fabricated hour pillar", () => {
    const reading = getSajuReading(unknownTimeInput);

    expect(reading.pillars.hour).toBeNull();
    expect(reading.elementDistribution).toEqual({
      목: 0,
      화: 0,
      토: 2,
      금: 2,
      수: 2,
    });
  });

  it("returns the same cached object for the same calculation input", () => {
    const first = getSajuReading(unknownTimeInput);
    const second = getSajuReading({
      ...unknownTimeInput,
      alias: "A different alias",
      country: "Canada",
      city: "Toronto",
    });

    expect(second.cacheKey).toBe(first.cacheKey);
    expect(second).toBe(first);
  });

  it("separates date, time, and calendar variants in the cache", () => {
    const base = getSajuReading(unknownTimeInput);
    const differentDate = getSajuReading({
      ...unknownTimeInput,
      birthDate: "1992-08-15",
    });
    const knownTime = getSajuReading({
      ...unknownTimeInput,
      birthTime: "08:30",
      timeUnknown: false,
    });
    const lunar = getSajuReading({
      ...unknownTimeInput,
      calendar: "lunar",
    });

    expect(
      new Set([
        base.cacheKey,
        differentDate.cacheKey,
        knownTime.cacheKey,
        lunar.cacheKey,
      ]).size,
    ).toBe(4);
    expect(knownTime.pillars.hour).toMatchObject({
      korean: "갑진",
      hanja: "甲辰",
    });
  });

  it("calculates the supported 1800 lower boundary", () => {
    const reading = getSajuReading({
      ...unknownTimeInput,
      birthDate: "1800-01-01",
    });

    expect(reading.pillars.year.korean).toBe("기미");
    expect(reading.pillars.month.korean).toBe("병자");
    expect(reading.pillars.day.korean).toBe("경인");
  });

  it("always exposes all five element counters", () => {
    const reading = getSajuReading(unknownTimeInput);

    expect(Object.keys(reading.elementDistribution).sort()).toEqual([
      "금",
      "목",
      "수",
      "토",
      "화",
    ]);
  });
});
