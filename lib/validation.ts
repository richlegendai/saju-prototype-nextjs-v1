export type BirthFormValues = {
  birthDate: string;
  birthTime: string;
  timeUnknown: boolean;
  isLeapMonth?: boolean;
  consent: boolean;
  calendar: "solar" | "lunar";
};

export type ValidationErrors = {
  birthDate?:
    | "required"
    | "invalid"
    | "future"
    | "outOfRange"
    | "invalidLunarDate";
  birthTime?: "required";
  consent?: "required";
};

export type ValidationResult = {
  valid: boolean;
  errors: ValidationErrors;
};

export function validateBirthForm(
  values: BirthFormValues,
  today = new Date(),
): ValidationResult {
  const errors: ValidationErrors = {};

  if (!values.birthDate) {
    errors.birthDate = "required";
  } else if (!isRealDate(values.birthDate, values.calendar)) {
    errors.birthDate = "invalid";
  } else if (!isSupportedYear(values.birthDate, values.calendar)) {
    errors.birthDate = "outOfRange";
  } else if (values.birthDate > toLocalDateInput(today)) {
    errors.birthDate = "future";
  }

  if (!values.timeUnknown && !values.birthTime) {
    errors.birthTime = "required";
  }

  if (!values.consent) {
    errors.consent = "required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function isRealDate(
  value: string,
  calendar: BirthFormValues["calendar"],
): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  if (calendar === "lunar") {
    return month >= 1 && month <= 12 && day >= 1 && day <= 30;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isSupportedYear(
  value: string,
  calendar: BirthFormValues["calendar"],
): boolean {
  const year = Number(value.slice(0, 4));
  const maximum = calendar === "lunar" ? 2100 : 2300;
  return year >= 1800 && year <= maximum;
}

function toLocalDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
