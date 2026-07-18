"use client";

import { ShieldCheck, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SajuLocationFields } from "@/components/saju-location-fields";
import type { Dictionary } from "@/lib/dictionary";
import {
  type BirthFormValues,
  type ValidationErrors,
  validateBirthForm,
} from "@/lib/validation";

export type SajuFormCompletion =
  | { status: "success" }
  | { status: "error"; birthDateError: "invalidLunarDate" };

type SajuFormProps = {
  dictionary: Dictionary;
  onComplete: (values: SajuFormValues) => SajuFormCompletion;
};

export type SajuFormValues = BirthFormValues & {
  alias: string;
  isLeapMonth: boolean;
  country: string;
  city: string;
};

const initialValues: SajuFormValues = {
  alias: "",
  calendar: "solar",
  birthDate: "",
  birthTime: "",
  timeUnknown: false,
  isLeapMonth: false,
  country: "",
  city: "",
  consent: false,
};

export function SajuForm({ dictionary, onComplete }: SajuFormProps) {
  const [values, setValues] = useState<SajuFormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  function updateValue<Key extends keyof SajuFormValues>(
    key: Key,
    value: SajuFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateBirthForm(values);
    setErrors(validation.errors);
    if (validation.valid) {
      const completion = onComplete({
        ...values,
        alias: values.alias.trim() || dictionary.saju.defaultAlias,
        country: values.country.trim(),
        city: values.city.trim(),
      });
      if (completion.status === "error") {
        setErrors({ birthDate: completion.birthDateError });
      }
    }
  }

  const dateError = birthDateError(errors, dictionary);
  const timeError = errors.birthTime
    ? dictionary.form.errors.requiredTime
    : undefined;
  const consentError = errors.consent
    ? dictionary.form.errors.requiredConsent
    : undefined;

  return (
    <div className="flow-page">
      <section className="flow-intro">
        <p className="eyebrow">{dictionary.saju.eyebrow}</p>
        <h1>{dictionary.saju.title}</h1>
        <p>{dictionary.saju.intro}</p>
        <span className="privacy-chip">
          <ShieldCheck aria-hidden="true" size={16} />
          {dictionary.common.privacyBadge}
        </span>
      </section>

      <form className="reading-form" onSubmit={submit} noValidate>
        <div className="form-field">
          <label htmlFor="alias">{dictionary.form.alias}</label>
          <input
            id="alias"
            name="alias"
            type="text"
            autoComplete="off"
            value={values.alias}
            onChange={(event) => updateValue("alias", event.target.value)}
          />
        </div>

        <fieldset className="form-field">
          <legend>{dictionary.form.calendar}</legend>
          <div className="segmented-control">
            <label>
              <input
                type="radio"
                name="calendar"
                value="solar"
                checked={values.calendar === "solar"}
                onChange={() =>
                  setValues((current) => ({
                    ...current,
                    calendar: "solar",
                    isLeapMonth: false,
                  }))
                }
              />
              <span>{dictionary.form.solar}</span>
            </label>
            <label>
              <input
                type="radio"
                name="calendar"
                value="lunar"
                checked={values.calendar === "lunar"}
                onChange={() => updateValue("calendar", "lunar")}
              />
              <span>{dictionary.form.lunar}</span>
            </label>
          </div>
          {values.calendar === "lunar" ? (
            <label className="check-row" htmlFor="leap-month">
              <input
                id="leap-month"
                name="isLeapMonth"
                type="checkbox"
                checked={values.isLeapMonth}
                onChange={(event) =>
                  updateValue("isLeapMonth", event.target.checked)
                }
              />
              <span>{dictionary.form.leapMonth}</span>
            </label>
          ) : null}
        </fieldset>

        <div className="form-field">
          <label htmlFor="birth-date">{dictionary.form.birthDate}</label>
          <input
            id="birth-date"
            name="birthDate"
            type="date"
            value={values.birthDate}
            aria-invalid={Boolean(dateError)}
            aria-describedby={dateError ? "birth-date-error" : undefined}
            onChange={(event) => updateValue("birthDate", event.target.value)}
          />
          {dateError ? (
            <p className="field-error" id="birth-date-error" role="alert">
              {dateError}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="birth-time">{dictionary.form.birthTime}</label>
          <input
            id="birth-time"
            name="birthTime"
            type="time"
            value={values.birthTime}
            disabled={values.timeUnknown}
            aria-invalid={Boolean(timeError)}
            aria-describedby={timeError ? "birth-time-error" : undefined}
            onChange={(event) => updateValue("birthTime", event.target.value)}
          />
          <label className="check-row" htmlFor="time-unknown">
            <input
              id="time-unknown"
              name="timeUnknown"
              type="checkbox"
              checked={values.timeUnknown}
              onChange={(event) => {
                updateValue("timeUnknown", event.target.checked);
                if (event.target.checked) {
                  updateValue("birthTime", "");
                }
              }}
            />
            <span>{dictionary.form.timeUnknown}</span>
          </label>
          {timeError ? (
            <p className="field-error" id="birth-time-error" role="alert">
              {timeError}
            </p>
          ) : null}
        </div>

        <SajuLocationFields
          country={values.country}
          city={values.city}
          form={dictionary.form}
          onCountryChange={(country) => updateValue("country", country)}
          onCityChange={(city) => updateValue("city", city)}
        />

        <div className="consent-panel">
          <label className="check-row" htmlFor="privacy-consent">
            <input
              id="privacy-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              aria-invalid={Boolean(consentError)}
              aria-describedby={
                consentError ? "privacy-consent-error" : "consent-note"
              }
              onChange={(event) => updateValue("consent", event.target.checked)}
            />
            <span>{dictionary.form.consent}</span>
          </label>
          <p id="consent-note">{dictionary.footer.prototypeNote}</p>
          {consentError ? (
            <p className="field-error" id="privacy-consent-error" role="alert">
              {consentError}
            </p>
          ) : null}
        </div>

        <button className="primary-button" type="submit">
          <Sparkles aria-hidden="true" size={19} />
          {dictionary.saju.submit}
        </button>
      </form>
    </div>
  );
}

function birthDateError(
  errors: ValidationErrors,
  dictionary: Dictionary,
): string | undefined {
  if (errors.birthDate === "required") {
    return dictionary.form.errors.requiredDate;
  }
  if (errors.birthDate === "invalid") {
    return dictionary.form.errors.invalidDate;
  }
  if (errors.birthDate === "future") {
    return dictionary.form.errors.futureDate;
  }
  if (errors.birthDate === "outOfRange") {
    return dictionary.form.errors.outOfRange;
  }
  if (errors.birthDate === "invalidLunarDate") {
    return dictionary.form.errors.invalidLunarDate;
  }
  return undefined;
}
