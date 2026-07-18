"use client";

import { useEffect, useRef, useState } from "react";
import { YearlyForm, type Year } from "@/components/yearly-form";
import { YearlyResult } from "@/components/yearly-result";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

type YearlyExperienceProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function YearlyExperience({
  dictionary,
  locale,
}: YearlyExperienceProps) {
  const [resultYear, setResultYear] = useState<Year | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (resultYear) {
      resultHeadingRef.current?.focus();
    }
  }, [resultYear]);

  if (!resultYear) {
    return <YearlyForm dictionary={dictionary} onComplete={setResultYear} />;
  }

  return (
    <YearlyResult
      year={resultYear}
      dictionary={dictionary}
      locale={locale}
      onReset={() => setResultYear(null)}
      headingRef={resultHeadingRef}
    />
  );
}
