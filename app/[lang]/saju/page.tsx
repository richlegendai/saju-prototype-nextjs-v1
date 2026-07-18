import type { Metadata } from "next";
import { SajuExperience } from "@/components/saju-experience";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type SajuPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: SajuPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const dictionary = getDictionary(lang);
  return createPageMetadata(
    lang,
    "/saju",
    dictionary.saju.title,
    dictionary.saju.intro,
  );
}

export default async function SajuPage({ params }: SajuPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return null;
  }

  return (
    <SajuExperience dictionary={getDictionary(lang)} locale={lang} />
  );
}
