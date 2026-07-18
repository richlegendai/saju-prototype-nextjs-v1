import { describe, expect, it } from "vitest";
import {
  type BirthFormValues,
  validateBirthForm,
} from "@/lib/validation";

const validValues: BirthFormValues = {
  birthDate: "1992-08-14",
  birthTime: "08:30",
  timeUnknown: false,
  isLeapMonth: false,
  consent: true,
  calendar: "solar",
};

const today = new Date("2026-07-18T12:00:00+09:00");

describe("validateBirthForm", () => {
  it("rejects a missing birth date", () => {
    const result = validateBirthForm({ ...validValues, birthDate: "" }, today);

    expect(result.errors.birthDate).toBe("required");
  });

  it("rejects malformed calendar dates", () => {
    const result = validateBirthForm(
      { ...validValues, birthDate: "2026-02-31" },
      today,
    );

    expect(result.errors.birthDate).toBe("invalid");
  });

  it("rejects future birth dates", () => {
    const result = validateBirthForm(
      { ...validValues, birthDate: "2027-01-01" },
      today,
    );

    expect(result.errors.birthDate).toBe("future");
  });

  it("rejects submission without privacy consent", () => {
    const result = validateBirthForm(
      { ...validValues, consent: false },
      today,
    );

    expect(result.errors.consent).toBe("required");
  });

  it("accepts an empty birth time when time is unknown", () => {
    const result = validateBirthForm(
      { ...validValues, birthTime: "", timeUnknown: true },
      today,
    );

    expect(result).toEqual({ valid: true, errors: {} });
  });

  it("requires birth time when time is known", () => {
    const result = validateBirthForm(
      { ...validValues, birthTime: "", timeUnknown: false },
      today,
    );

    expect(result.errors.birthTime).toBe("required");
  });

  it("rejects dates before the supported 1800 lower boundary", () => {
    const result = validateBirthForm(
      { ...validValues, birthDate: "1799-12-31" },
      today,
    );

    expect(result.errors.birthDate).toBe("outOfRange");
  });

  it("accepts the supported 1800 lower boundary", () => {
    const result = validateBirthForm(
      { ...validValues, birthDate: "1800-01-01" },
      today,
    );

    expect(result).toEqual({ valid: true, errors: {} });
  });

  it("applies the documented upper bound for each calendar", () => {
    const distantToday = new Date("2400-01-01T12:00:00+09:00");
    const solar = validateBirthForm(
      { ...validValues, birthDate: "2301-01-01", calendar: "solar" },
      distantToday,
    );
    const lunar = validateBirthForm(
      { ...validValues, birthDate: "2101-01-01", calendar: "lunar" },
      distantToday,
    );

    expect(solar.errors.birthDate).toBe("outOfRange");
    expect(lunar.errors.birthDate).toBe("outOfRange");
  });
});
