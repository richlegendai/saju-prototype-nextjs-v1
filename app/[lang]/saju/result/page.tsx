import type { Metadata } from "next";
import { MoonStar } from "lucide-react";
import Link from "next/link";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type SajuResultPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: SajuResultPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const dictionary = getDictionary(lang);
  return createPageMetadata(
    lang,
    "/saju/result",
    dictionary.saju.directResultTitle,
    dictionary.saju.directResultBody,
  );
}

export default async function SajuResultPage({
  params,
}: SajuResultPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return null;
  }
  const dictionary = getDictionary(lang);

  return (
    <section className="service-page">
      <span className="service-page-icon">
        <MoonStar aria-hidden="true" size={30} />
      </span>
      <p className="eyebrow">{dictionary.saju.eyebrow}</p>
      <h1>{dictionary.saju.directResultTitle}</h1>
      <p className="service-lead">{dictionary.saju.directResultBody}</p>
      <Link className="primary-button" href={`/${lang}/saju`}>
        {dictionary.common.startReading}
      </Link>
    </section>
  );
}
