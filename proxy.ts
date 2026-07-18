import { type NextRequest, NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n";

const LOCALE_COOKIE = "saju-locale";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = savedLocale && isLocale(savedLocale)
    ? savedLocale
    : preferredLocale(request.headers.get("accept-language"));

  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

function preferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return "en";
  }

  const preferences = acceptLanguage
    .split(",")
    .flatMap((entry) => {
      const [tag = "", qualityValue] = entry.trim().split(";q=");
      const [locale = ""] = tag.toLowerCase().split("-");
      const quality = qualityValue ? Number(qualityValue) : 1;
      return locale && Number.isFinite(quality) ? [{ locale, quality }] : [];
    })
    .sort((left, right) => right.quality - left.quality);

  const match = preferences.find(({ locale }) => isLocale(locale));
  return match && isLocale(match.locale) ? match.locale : "en";
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt).*)"],
};
