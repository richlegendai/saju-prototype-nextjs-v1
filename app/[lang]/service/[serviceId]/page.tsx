import type { Metadata } from "next";
import { CircleCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  servicePageIds,
  type ServicePageId,
} from "@/lib/dictionary";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type ServicePageProps = {
  params: Promise<{ lang: string; serviceId: string }>;
};

export function generateStaticParams() {
  return servicePageIds.map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { lang, serviceId } = await params;
  if (!isLocale(lang) || !isServicePageId(serviceId)) {
    return {};
  }
  const service = getDictionary(lang).servicePages[serviceId];
  return createPageMetadata(
    lang,
    `/service/${serviceId}`,
    service.title,
    service.description,
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, serviceId } = await params;
  if (!isLocale(lang) || !isServicePageId(serviceId)) {
    notFound();
  }

  const dictionary = getDictionary(lang);
  const service = dictionary.servicePages[serviceId];
  const href = serviceActionHref(lang, service.href);

  return (
    <section className="service-page">
      <span className="service-page-icon">
        <Sparkles aria-hidden="true" size={30} />
      </span>
      <p className="eyebrow">{service.eyebrow}</p>
      <h1>{service.title}</h1>
      <p className="service-lead">{service.description}</p>
      <ul className="service-detail-list">
        {service.details.map((detail) => (
          <li key={detail}>
            <CircleCheck aria-hidden="true" size={19} />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      <Link className="primary-button" href={href}>
        {service.action}
      </Link>
    </section>
  );
}

function isServicePageId(value: string): value is ServicePageId {
  return servicePageIds.some((servicePageId) => servicePageId === value);
}

function serviceActionHref(
  locale: "ko" | "en",
  href: "home" | "saju" | "yearly",
): string {
  return href === "home" ? `/${locale}` : `/${locale}/${href}`;
}
