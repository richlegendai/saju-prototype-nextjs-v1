import type { Metadata } from "next";
import { YearlyExperience } from "@/components/yearly-experience";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type YearlyPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: YearlyPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const dictionary = getDictionary(lang);
  return createPageMetadata(
    lang,
    "/yearly",
    dictionary.yearly.title,
    dictionary.yearly.intro,
  );
}

export default async function YearlyPage({ params }: YearlyPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return null;
  }

  return (
    <YearlyExperience dictionary={getDictionary(lang)} locale={lang} />
  );
}
