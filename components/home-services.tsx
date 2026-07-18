import {
  ArrowUpRight,
  CalendarCheck,
  CalendarRange,
  HeartHandshake,
  MessageCircleQuestion,
  MoonStar,
  Orbit,
  SunMedium,
} from "lucide-react";
import Link from "next/link";
import {
  homeServiceIds,
  type Dictionary,
  type HomeServiceId,
} from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

type HomeServicesProps = {
  dictionary: Dictionary;
  locale: Locale;
};

const serviceIcons = {
  saju: MoonStar,
  compatibility: HeartHandshake,
  "ten-year-cycle": Orbit,
  yearly: CalendarRange,
  "auspicious-dates": CalendarCheck,
  "daily-fortune": SunMedium,
  "ask-the-coven": MessageCircleQuestion,
} satisfies Record<HomeServiceId, typeof MoonStar>;

function serviceHref(locale: Locale, serviceId: HomeServiceId): string {
  if (serviceId === "saju" || serviceId === "yearly") {
    return `/${locale}/${serviceId}`;
  }

  return `/${locale}/service/${serviceId}`;
}

export function HomeServices({ dictionary, locale }: HomeServicesProps) {
  return (
    <section className="service-section" aria-labelledby="service-heading">
      <div className="section-heading-row">
        <h2 id="service-heading">{dictionary.home.sectionTitle}</h2>
        <span className="section-count">07</span>
      </div>
      <div className="service-list">
        {homeServiceIds.map((serviceId, index) => {
          const service = dictionary.home.services[serviceId];
          const Icon = serviceIcons[serviceId];
          return (
            <Link
              className="service-card"
              href={serviceHref(locale, serviceId)}
              key={serviceId}
              aria-label={service.title}
            >
              <span className="service-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="service-icon">
                <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
              </span>
              <span className="service-copy">
                <span className="service-title-row">
                  <strong>{service.title}</strong>
                  <span>{service.status}</span>
                </span>
                <span className="service-description">
                  {service.description}
                </span>
              </span>
              <span className="service-duel-mark" aria-hidden="true">
                <SunMedium size={13} />
                <b>VS</b>
                <MoonStar size={13} />
              </span>
              <span className="service-arrow">
                <ArrowUpRight aria-hidden="true" size={18} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
