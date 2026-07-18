import type { Metadata } from "next";
import { CalendarRange } from "lucide-react";
import Link from "next/link";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type YearlyResultPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: YearlyResultPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const dictionary = getDictionary(lang);
  return createPageMetadata(
    lang,
    "/yearly/result",
    dictionary.yearly.directResultTitle,
    dictionary.yearly.directResultBody,
  );
}

export default async function YearlyResultPage({
  params,
}: YearlyResultPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return null;
  }
  const dictionary = getDictionary(lang);

  return (
    <section className="service-page">
      <span className="service-page-icon">
        <CalendarRange aria-hidden="true" size={30} />
      </span>
      <p className="eyebrow">{dictionary.yearly.eyebrow}</p>
      <h1>{dictionary.yearly.directResultTitle}</h1>
      <p className="service-lead">{dictionary.yearly.directResultBody}</p>
      <Link className="primary-button" href={`/${lang}/yearly`}>
        {dictionary.common.startReading}
      </Link>
    </section>
  );
}
