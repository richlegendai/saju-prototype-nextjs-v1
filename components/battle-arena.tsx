import { MoonStar, SunMedium, Swords } from "lucide-react";

export type BattleRound = {
  title: string;
  bright: string;
  shadow: string;
  outcome: string;
};

type BattleArenaProps = {
  id: string;
  title: string;
  intro: string;
  brightLabel: string;
  shadowLabel: string;
  brightSummary: string;
  shadowSummary: string;
  brightRole?: string;
  shadowRole?: string;
  brightCreed?: string;
  shadowCreed?: string;
  outcomeLabel: string;
  rounds: readonly BattleRound[];
  kind: "saju" | "yearly";
};

export function BattleArena({
  id,
  title,
  intro,
  brightLabel,
  shadowLabel,
  brightSummary,
  shadowSummary,
  brightRole,
  shadowRole,
  brightCreed,
  shadowCreed,
  outcomeLabel,
  rounds,
  kind,
}: BattleArenaProps) {
  return (
    <section className="battle-arena" aria-labelledby={id}>
      <header className="battle-arena-header">
        <span className="battle-arena-mark" aria-hidden="true">
          <Swords size={22} />
        </span>
        <div>
          <h2 id={id}>{title}</h2>
          <p>{intro}</p>
        </div>
      </header>

      <div className="battle-sides">
        <article
          className="battle-side is-bright"
          {...(kind === "saju" ? { "data-coven-role": "bright" } : {})}
        >
          <span className="battle-side-label">
            <SunMedium aria-hidden="true" size={18} />
            {brightLabel}
          </span>
          {brightRole ? <strong className="witch-role">{brightRole}</strong> : null}
          {brightCreed ? <p className="witch-creed">{brightCreed}</p> : null}
          <p>{brightSummary}</p>
        </article>
        <span className="versus-seal" aria-hidden="true">
          VS
        </span>
        <article
          className="battle-side is-shadow"
          {...(kind === "saju" ? { "data-coven-role": "shadow" } : {})}
        >
          <span className="battle-side-label">
            <MoonStar aria-hidden="true" size={18} />
            {shadowLabel}
          </span>
          {shadowRole ? <strong className="witch-role">{shadowRole}</strong> : null}
          {shadowCreed ? <p className="witch-creed">{shadowCreed}</p> : null}
          <p>{shadowSummary}</p>
        </article>
      </div>

      <div className="battle-rounds">
        {rounds.map((round, index) => (
          <article
            className="battle-round"
            key={round.title}
            {...(kind === "saju"
              ? { "data-battle-round": "" }
              : { "data-year-clash": "" })}
          >
            <header>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{round.title}</h3>
            </header>
            <div className="battle-round-arguments">
              <section className="battle-argument is-bright">
                <strong>
                  <SunMedium aria-hidden="true" size={15} />
                  {brightLabel}
                </strong>
                <p>{round.bright}</p>
              </section>
              <section className="battle-argument is-shadow">
                <strong>
                  <MoonStar aria-hidden="true" size={15} />
                  {shadowLabel}
                </strong>
                <p>{round.shadow}</p>
              </section>
            </div>
            <footer className="round-outcome">
              <strong>{outcomeLabel}</strong>
              <p>{round.outcome}</p>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
