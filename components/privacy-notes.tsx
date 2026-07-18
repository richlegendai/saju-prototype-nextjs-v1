import { Info, ShieldCheck } from "lucide-react";
import Link from "next/link";

type PrivacyNotesProps = {
  privacy: string;
  disclaimer: string;
  disclaimerHref: string;
};

export function PrivacyNotes({
  privacy,
  disclaimer,
  disclaimerHref,
}: PrivacyNotesProps) {
  return (
    <aside className="privacy-notes">
      <p>
        <ShieldCheck aria-hidden="true" size={18} />
        <span>{privacy}</span>
      </p>
      <p>
        <Info aria-hidden="true" size={18} />
        <Link href={disclaimerHref}>{disclaimer}</Link>
      </p>
    </aside>
  );
}
