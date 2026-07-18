"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type LocaleSwitchProps = {
  locale: Locale;
  label: string;
};

export function LocaleSwitch({ locale, label }: LocaleSwitchProps) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "ko" ? "en" : "ko";
  const nextPath = pathname.replace(/^\/(ko|en)(?=\/|$)/, `/${nextLocale}`);

  function rememberLocale() {
    document.cookie = `saju-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <Link
      className="locale-switch"
      href={nextPath}
      aria-label={label}
      onClick={rememberLocale}
    >
      {label}
    </Link>
  );
}
