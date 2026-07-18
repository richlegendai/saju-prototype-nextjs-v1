import { Scale, Target } from "lucide-react";

type BattleVerdictProps = {
  id: string;
  title: string;
  verdict: string;
  actionLabel: string;
  action: string;
  role?: string;
  creed?: string;
  covenRole?: "judge";
};

export function BattleVerdict({
  id,
  title,
  verdict,
  actionLabel,
  action,
  role,
  creed,
  covenRole,
}: BattleVerdictProps) {
  return (
    <section
      className="battle-verdict"
      aria-labelledby={id}
      {...(covenRole
        ? {
            "data-coven-role": covenRole,
            "data-fate-judge-verdict": "",
          }
        : {})}
    >
      <span className="verdict-seal" aria-hidden="true">
        <Scale size={28} strokeWidth={1.5} />
      </span>
      <div>
        <h2 id={id}>{title}</h2>
        {role ? <strong className="witch-role">{role}</strong> : null}
        {creed ? <p className="witch-creed">{creed}</p> : null}
        <p>{verdict}</p>
      </div>
      <div className="verdict-action">
        <Target aria-hidden="true" size={21} />
        <div>
          <strong>{actionLabel}</strong>
          <p>{action}</p>
        </div>
      </div>
    </section>
  );
}
