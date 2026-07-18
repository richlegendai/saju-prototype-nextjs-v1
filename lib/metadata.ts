import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://fatebattle.com";

export function createPageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const normalizedPath = path === "/" ? "" : path;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}${normalizedPath}`,
      languages: {
        ko: `${SITE_URL}/ko${normalizedPath}`,
        en: `${SITE_URL}/en${normalizedPath}`,
      },
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}
