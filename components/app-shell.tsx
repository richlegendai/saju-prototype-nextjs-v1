import {
  Archive,
  CalendarDays,
  Home,
  MessageCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/locale-switch";
import { MoonMark } from "@/components/moon-mark";

type AppShellProps = {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
};

export function AppShell({
  children,
  dictionary,
  locale,
}: AppShellProps) {
  const prefix = `/${locale}`;
  const navItems = [
    {
      label: dictionary.nav.daily,
      href: `${prefix}/service/daily-fortune`,
      icon: CalendarDays,
      primary: false,
    },
    {
      label: dictionary.nav.home,
      href: prefix,
      icon: Home,
      primary: false,
    },
    {
      label: dictionary.nav.addChart,
      href: `${prefix}/saju`,
      icon: Plus,
      primary: true,
    },
    {
      label: dictionary.nav.covenChat,
      href: `${prefix}/service/ask-the-coven`,
      icon: MessageCircle,
      primary: false,
    },
    {
      label: dictionary.nav.archive,
      href: `${prefix}/service/archive`,
      icon: Archive,
      primary: false,
    },
  ] as const;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {locale === "ko" ? "본문으로 건너뛰기" : "Skip to content"}
      </a>
      <header className="site-header">
        <Link
          className="brand-link"
          href={prefix}
          aria-label={dictionary.productName}
        >
          <MoonMark />
          <span className="brand-copy">
            <span className="brand-name">{dictionary.productName}</span>
            <span className="brand-subtitle">{dictionary.tagline}</span>
          </span>
        </Link>
        <div className="header-actions">
          <Suspense
            fallback={
              <span className="locale-switch" aria-hidden="true">
                {dictionary.header.localeSwitchLabel}
              </span>
            }
          >
            <LocaleSwitch
              locale={locale}
              label={dictionary.header.localeSwitchLabel}
            />
          </Suspense>
          <Link
            className="demo-login"
            href={`${prefix}/service/demo-login`}
          >
            {dictionary.header.demoLogin}
          </Link>
        </div>
      </header>

      <main id="main-content" className="main-content">
        {children}
      </main>

      <footer className="site-footer">
        <nav
          className="legal-links"
          aria-label={locale === "ko" ? "법적 안내" : "Legal information"}
        >
          <Link href={`${prefix}/service/privacy`}>
            {dictionary.footer.privacy}
          </Link>
          <Link href={`${prefix}/service/demo-terms`}>
            {dictionary.footer.terms}
          </Link>
          <Link href={`${prefix}/service/disclaimer`}>
            {dictionary.footer.disclaimer}
          </Link>
        </nav>
        <p>{dictionary.footer.prototypeNote}</p>
      </footer>

      <nav
        className="bottom-nav"
        aria-label={dictionary.nav.label}
      >
        {navItems.map(({ label, href, icon: Icon, primary }) => (
          <Link
            className={primary ? "bottom-nav-link is-primary" : "bottom-nav-link"}
            href={href}
            key={label}
            aria-label={label}
          >
            <Icon aria-hidden="true" size={primary ? 22 : 20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
