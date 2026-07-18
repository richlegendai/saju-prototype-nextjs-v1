import { en } from "@/lib/locales/en";
import { ko } from "@/lib/locales/ko";

export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export const dictionaries = { en, ko } as const;

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
