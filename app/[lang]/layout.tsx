import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { createPageMetadata } from "@/lib/metadata";
import {
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import "../globals.css";
import "../flows.css";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const dictionary = getDictionary(lang);
  return createPageMetadata(lang, "/", dictionary.productName, dictionary.tagline);
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#100B1C",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <AppShell locale={locale} dictionary={dictionary}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
