"use client";

import { CalendarRange, RotateCcw } from "lucide-react";
import { useState, type RefObject } from "react";
import { BattleArena } from "@/components/battle-arena";
import { BattleVerdict } from "@/components/battle-verdict";
import { PrivacyNotes } from "@/components/privacy-notes";
import type { Year } from "@/components/yearly-form";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

type Month = Dictionary["yearly"]["months"][number];

type YearlyResultProps = {
  year: Year;
  dictionary: Dictionary;
  locale: Locale;
  onReset: () => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

export function YearlyResult({
  year,
  dictionary,
  locale,
  onReset,
  headingRef,
}: YearlyResultProps) {
  const [selectedMonth, setSelectedMonth] = useState<Month>(() =>
    firstMonth(dictionary.yearly.months),
  );

  return (
    <article className="result-page yearly-result">
      <header className="result-hero">
        <span className="year-seal" aria-hidden="true">
          {year}
        </span>
        <p className="eyebrow">{dictionary.yearly.eyebrow}</p>
        <h1 ref={headingRef} tabIndex={-1}>
          {year}
          {dictionary.yearly.resultTitleSuffix}
        </h1>
        <p className="result-theme">{dictionary.yearly.arenaIntro}</p>
      </header>

      <BattleArena
        id="yearly-battle-arena-title"
        title={dictionary.yearly.arenaTitle}
        intro={dictionary.yearly.arenaIntro}
        brightLabel={dictionary.yearly.brightLabel}
        shadowLabel={dictionary.yearly.shadowLabel}
        brightSummary={dictionary.yearly.brightSummary}
        shadowSummary={dictionary.yearly.shadowSummary}
        outcomeLabel={dictionary.yearly.outcomeLabel}
        rounds={dictionary.yearly.clashes}
        kind="yearly"
      />
      <BattleVerdict
        id="yearly-battle-verdict-title"
        title={dictionary.yearly.verdictTitle}
        verdict={dictionary.yearly.verdict}
        actionLabel={dictionary.yearly.actionLabel}
        action={dictionary.yearly.action}
      />

      <section className="result-section month-section">
        <div className="section-heading-row">
          <h2>{dictionary.yearly.monthsTitle}</h2>
          <CalendarRange aria-hidden="true" size={21} />
        </div>
        <div className="month-grid">
          {dictionary.yearly.months.map((month) => (
            <button
              type="button"
              key={month.name}
              data-month-chip
              aria-pressed={selectedMonth.name === month.name}
              onClick={() => setSelectedMonth(month)}
            >
              {month.name}
            </button>
          ))}
        </div>
        <div className="month-detail" data-month-detail aria-live="polite">
          <span
            className={`month-edge is-${selectedMonth.edge}`}
            data-month-edge
          >
            {selectedMonth.edgeLabel}
          </span>
          <p>{selectedMonth.detail}</p>
        </div>
      </section>

      <PrivacyNotes
        privacy={dictionary.yearly.privacyNote}
        disclaimer={dictionary.yearly.disclaimer}
        disclaimerHref={`/${locale}/service/disclaimer`}
      />

      <button className="secondary-button" type="button" onClick={onReset}>
        <RotateCcw aria-hidden="true" size={18} />
        {dictionary.common.reset}
      </button>
    </article>
  );
}

function firstMonth(months: readonly Month[]): Month {
  const month = months[0];
  if (!month) {
    throw new Error("Yearly guidance requires at least one month.");
  }
  return month;
}
