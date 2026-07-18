"use client";

import {
  calculateFourPillars,
  type ElementPair,
  type FiveElement,
} from "manseryeok";

export type SajuReadingInput = {
  alias: string;
  calendar: "solar" | "lunar";
  birthDate: string;
  birthTime: string;
  timeUnknown: boolean;
  isLeapMonth: boolean;
  country: string;
  city: string;
  consent: boolean;
};

export type SajuPillar = {
  korean: string;
  hanja: string;
  elements: ElementPair;
  tenGods: {
    stem: string;
    branch: string;
  };
};

export type SajuReading = {
  cacheKey: string;
  calculation: {
    calendar: "solar" | "lunar";
    birthDate: string;
    birthTime: string | null;
    isLeapMonth: boolean;
  };
  pillars: {
    year: SajuPillar;
    month: SajuPillar;
    day: SajuPillar;
    hour: SajuPillar | null;
  };
  dayElement: FiveElement;
  elementDistribution: Record<FiveElement, number>;
  voidBranches: string[];
};

const cache = new Map<string, SajuReading>();
const calculationVersion = "manseryeok-2.0.0-default-boundary-v1";

export function getSajuReading(input: SajuReadingInput): SajuReading {
  const normalized = normalizeInput(input);
  const cached = cache.get(normalized.cacheKey);
  if (cached) {
    return cached;
  }

  const result = calculateFourPillars({
    year: normalized.year,
    month: normalized.month,
    day: normalized.day,
    hour: normalized.hour,
    minute: normalized.minute,
    isLunar: normalized.calendar === "lunar",
    isLeapMonth: normalized.isLeapMonth,
  });
  const hanja = result.toHanjaObject();
  const pillars = {
    year: createPillar(
      hanja.year,
      result.yearElement,
      result.tenGods.year,
    ),
    month: createPillar(
      hanja.month,
      result.monthElement,
      result.tenGods.month,
    ),
    day: createPillar(hanja.day, result.dayElement, result.tenGods.day),
    hour: normalized.timeUnknown
      ? null
      : createPillar(
          hanja.hour,
          result.hourElement,
          result.tenGods.hour,
        ),
  } satisfies SajuReading["pillars"];

  const reading: SajuReading = {
    cacheKey: normalized.cacheKey,
    calculation: {
      calendar: normalized.calendar,
      birthDate: normalized.birthDate,
      birthTime: normalized.timeUnknown ? null : normalized.birthTime,
      isLeapMonth: normalized.isLeapMonth,
    },
    pillars,
    dayElement: result.dayElement.stem,
    elementDistribution: countElements(pillars),
    voidBranches: [...result.voidBranches],
  };

  cache.set(normalized.cacheKey, reading);
  return reading;
}

function createPillar(
  names: { korean: string; hanja: string },
  elements: ElementPair,
  tenGods: { stem: string; branch: string },
): SajuPillar {
  return {
    korean: names.korean,
    hanja: names.hanja,
    elements: { ...elements },
    tenGods: { ...tenGods },
  };
}

function countElements(
  pillars: SajuReading["pillars"],
): Record<FiveElement, number> {
  const counts: Record<FiveElement, number> = {
    목: 0,
    화: 0,
    토: 0,
    금: 0,
    수: 0,
  };

  for (const pillar of [
    pillars.year,
    pillars.month,
    pillars.day,
    pillars.hour,
  ]) {
    if (pillar) {
      counts[pillar.elements.stem] += 1;
      counts[pillar.elements.branch] += 1;
    }
  }

  return counts;
}

function normalizeInput(input: SajuReadingInput) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.birthDate);
  if (!dateMatch) {
    throw new RangeError("Birth date must use YYYY-MM-DD.");
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const time = input.timeUnknown
    ? { hour: 12, minute: 0, birthTime: "" }
    : parseTime(input.birthTime);
  const isLeapMonth = input.calendar === "lunar" && input.isLeapMonth;
  const cacheKey = [
    calculationVersion,
    input.calendar,
    input.birthDate,
    input.timeUnknown ? "unknown" : time.birthTime,
    isLeapMonth ? "leap" : "regular",
  ].join("|");

  return {
    cacheKey,
    calendar: input.calendar,
    birthDate: input.birthDate,
    birthTime: time.birthTime,
    timeUnknown: input.timeUnknown,
    isLeapMonth,
    year,
    month,
    day,
    hour: time.hour,
    minute: time.minute,
  };
}

function parseTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) {
    throw new RangeError("Birth time must use HH:mm.");
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) {
    throw new RangeError("Birth time is outside the supported range.");
  }

  return {
    birthTime: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    hour,
    minute,
  };
}
