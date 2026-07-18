"use client";

import { RotateCcw, Scale } from "lucide-react";
import type { RefObject } from "react";
import { BattleArena } from "@/components/battle-arena";
import { BattleVerdict } from "@/components/battle-verdict";
import { FourPillarsChart } from "@/components/four-pillars-chart";
import { PrivacyNotes } from "@/components/privacy-notes";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import type { SajuReading } from "@/lib/saju-reading";

type SajuResultProps = {
  alias: string;
  reading: SajuReading;
  dictionary: Dictionary;
  locale: Locale;
  onReset: () => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

export function SajuResult({
  alias,
  reading,
  dictionary,
  locale,
  onReset,
  headingRef,
}: SajuResultProps) {
  const profile = dictionary.saju.elementProfiles[reading.dayElement];
  const witches = dictionary.saju.witches;

  return (
    <article className="result-page">
      <header className="result-hero">
        <span className="result-orbit" aria-hidden="true">
          <Scale size={38} strokeWidth={1.4} />
        </span>
        <p className="eyebrow">{dictionary.saju.eyebrow}</p>
        <h1 ref={headingRef} tabIndex={-1}>
          {dictionary.saju.resultTitle}
        </h1>
        <p className="result-theme">
          {dictionary.saju.theme.replace("{alias}", alias)}
        </p>
      </header>

      <FourPillarsChart reading={reading} chart={dictionary.saju.chart} />
      <BattleArena
        id="saju-battle-arena-title"
        title={dictionary.saju.arenaTitle}
        intro={dictionary.saju.arenaIntro}
        brightLabel={witches.bright.name}
        shadowLabel={witches.shadow.name}
        brightRole={witches.bright.role}
        shadowRole={witches.shadow.role}
        brightCreed={witches.bright.creed}
        shadowCreed={witches.shadow.creed}
        brightSummary={profile.bright}
        shadowSummary={profile.shadow}
        outcomeLabel={dictionary.saju.outcomeLabel}
        rounds={dictionary.saju.rounds}
        kind="saju"
      />
      <BattleVerdict
        id="saju-battle-verdict-title"
        title={witches.judge.name}
        role={witches.judge.role}
        creed={witches.judge.creed}
        covenRole="judge"
        verdict={profile.verdict}
        actionLabel={dictionary.saju.actionLabel}
        action={profile.action}
      />
      <PrivacyNotes
        privacy={dictionary.saju.privacyNote}
        disclaimer={dictionary.saju.disclaimer}
        disclaimerHref={`/${locale}/service/disclaimer`}
      />

      <button className="secondary-button" type="button" onClick={onReset}>
        <RotateCcw aria-hidden="true" size={18} />
        {dictionary.common.reset}
      </button>
    </article>
  );
}
