"use client";

import { ShieldCheck, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { validateBirthForm } from "@/lib/validation";

export const years = ["2026", "2027", "2028", "2029", "2030"] as const;
export type Year = (typeof years)[number];

type YearlyFormProps = {
  dictionary: Dictionary;
  onComplete: (year: Year) => void;
};

export function YearlyForm({ dictionary, onComplete }: YearlyFormProps) {
  const [birthDate, setBirthDate] = useState("");
  const [year, setYear] = useState<Year>("2026");
  const [consent, setConsent] = useState(false);
  const [dateError, setDateError] = useState<string>();
  const [consentError, setConsentError] = useState<string>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateBirthForm({
      birthDate,
      birthTime: "",
      timeUnknown: true,
      consent,
      calendar: "solar",
    });
    setDateError(
      localizedDateError(validation.errors.birthDate, dictionary),
    );
    setConsentError(
      validation.errors.consent
        ? dictionary.form.errors.requiredConsent
        : undefined,
    );
    if (validation.valid) {
      onComplete(year);
    }
  }

  return (
    <div className="flow-page">
      <section className="flow-intro">
        <p className="eyebrow">{dictionary.yearly.eyebrow}</p>
        <h1>{dictionary.yearly.title}</h1>
        <p>{dictionary.yearly.intro}</p>
        <span className="privacy-chip">
          <ShieldCheck aria-hidden="true" size={16} />
          {dictionary.common.privacyBadge}
        </span>
      </section>

      <form className="reading-form" onSubmit={submit} noValidate>
        <div className="form-field">
          <label htmlFor="yearly-birth-date">
            {dictionary.form.birthDate}
          </label>
          <input
            id="yearly-birth-date"
            name="birthDate"
            type="date"
            value={birthDate}
            aria-invalid={Boolean(dateError)}
            aria-describedby={dateError ? "yearly-date-error" : undefined}
            onChange={(event) => setBirthDate(event.target.value)}
          />
          {dateError ? (
            <p className="field-error" id="yearly-date-error" role="alert">
              {dateError}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="fortune-year">{dictionary.yearly.yearLabel}</label>
          <select
            id="fortune-year"
            name="year"
            value={year}
            onChange={(event) => {
              const selectedYear = years.find(
                (candidate) => candidate === event.target.value,
              );
              if (selectedYear) {
                setYear(selectedYear);
              }
            }}
          >
            {years.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="consent-panel">
          <label className="check-row" htmlFor="yearly-consent">
            <input
              id="yearly-consent"
              name="consent"
              type="checkbox"
              checked={consent}
              aria-invalid={Boolean(consentError)}
              aria-describedby={
                consentError ? "yearly-consent-error" : "yearly-consent-note"
              }
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>{dictionary.yearly.consent}</span>
          </label>
          <p id="yearly-consent-note">{dictionary.footer.prototypeNote}</p>
          {consentError ? (
            <p className="field-error" id="yearly-consent-error" role="alert">
              {consentError}
            </p>
          ) : null}
        </div>

        <button className="primary-button" type="submit">
          <Sparkles aria-hidden="true" size={19} />
          {dictionary.yearly.submit}
        </button>
      </form>
    </div>
  );
}

function localizedDateError(
  error: string | undefined,
  dictionary: Dictionary,
): string | undefined {
  if (error === "required") {
    return dictionary.form.errors.requiredDate;
  }
  if (error === "invalid") {
    return dictionary.form.errors.invalidDate;
  }
  if (error === "future") {
    return dictionary.form.errors.futureDate;
  }
  return undefined;
}
