import { Clock3, Database, Sparkles } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import type { SajuPillar, SajuReading } from "@/lib/saju-reading";

type FourPillarsChartProps = {
  reading: SajuReading;
  chart: Dictionary["saju"]["chart"];
};

const elementOrder: (keyof SajuReading["elementDistribution"])[] = [
  "목",
  "화",
  "토",
  "금",
  "수",
];

export function FourPillarsChart({
  reading,
  chart,
}: FourPillarsChartProps) {
  const pillars = [
    { key: "year", label: chart.pillars.year, value: reading.pillars.year },
    { key: "month", label: chart.pillars.month, value: reading.pillars.month },
    { key: "day", label: chart.pillars.day, value: reading.pillars.day },
    { key: "hour", label: chart.pillars.hour, value: reading.pillars.hour },
  ] as const;

  return (
    <section
      className="four-pillars-chart"
      aria-labelledby="four-pillars-title"
      data-four-pillars-chart
    >
      <header className="chart-header">
        <span className="chart-mark" aria-hidden="true">
          <Database size={20} />
        </span>
        <div>
          <h2 id="four-pillars-title">{chart.title}</h2>
          <p>{chart.intro}</p>
        </div>
      </header>

      <div className="pillar-grid">
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.key}
            pillarKey={pillar.key}
            label={pillar.label}
            value={pillar.value}
            unknownTime={chart.unknownTime}
            elementNames={chart.elementNames}
          />
        ))}
      </div>

      <div className="element-summary">
        <p className="day-element" data-day-element={reading.dayElement}>
          <span>{chart.dayMaster}</span>
          <strong>{chart.elementNames[reading.dayElement]}</strong>
        </p>
        <div>
          <h3>{chart.elementBalance}</h3>
          <ul className="element-counts">
            {elementOrder.map((element) => (
              <li data-element-count key={element}>
                <span>{chart.elementNames[element]}</span>
                <strong>{reading.elementDistribution[element]}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="chart-notices">
        <p>
          <Database aria-hidden="true" size={16} />
          <span>{chart.calculationNotice}</span>
        </p>
        <p>
          <Sparkles aria-hidden="true" size={16} />
          <span>{chart.interpretationNotice}</span>
        </p>
      </div>
    </section>
  );
}

type PillarCardProps = {
  pillarKey: "year" | "month" | "day" | "hour";
  label: string;
  value: SajuPillar | null;
  unknownTime: string;
  elementNames: Dictionary["saju"]["chart"]["elementNames"];
};

function PillarCard({
  pillarKey,
  label,
  value,
  unknownTime,
  elementNames,
}: PillarCardProps) {
  return (
    <article className="pillar-card" data-saju-pillar={pillarKey}>
      <span className="pillar-label">{label}</span>
      {value ? (
        <>
          <strong>{value.korean}</strong>
          <span className="pillar-hanja">{value.hanja}</span>
          <span className="pillar-elements">
            {elementNames[value.elements.stem]} /{" "}
            {elementNames[value.elements.branch]}
          </span>
        </>
      ) : (
        <span className="unknown-pillar">
          <Clock3 aria-hidden="true" size={18} />
          {unknownTime}
        </span>
      )}
    </article>
  );
}
