"use client";

import { useEffect, useRef, useState } from "react";
import {
  SajuForm,
  type SajuFormCompletion,
  type SajuFormValues,
} from "@/components/saju-form";
import { SajuResult } from "@/components/saju-result";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { getSajuReading, type SajuReading } from "@/lib/saju-reading";

type SajuExperienceProps = {
  dictionary: Dictionary;
  locale: Locale;
};

type SajuResultState = {
  input: SajuFormValues;
  reading: SajuReading;
};

export function SajuExperience({
  dictionary,
  locale,
}: SajuExperienceProps) {
  const [result, setResult] = useState<SajuResultState | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (result) {
      resultHeadingRef.current?.focus();
    }
  }, [result]);

  function complete(values: SajuFormValues): SajuFormCompletion {
    try {
      const reading = getSajuReading(values);
      setResult({ input: values, reading });
      return { status: "success" };
    } catch (error) {
      if (values.calendar === "lunar" && error instanceof RangeError) {
        return { status: "error", birthDateError: "invalidLunarDate" };
      }
      throw error;
    }
  }

  if (!result) {
    return <SajuForm dictionary={dictionary} onComplete={complete} />;
  }

  return (
    <SajuResult
      alias={result.input.alias}
      reading={result.reading}
      dictionary={dictionary}
      locale={locale}
      onReset={() => setResult(null)}
      headingRef={resultHeadingRef}
    />
  );
}
