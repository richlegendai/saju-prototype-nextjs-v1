import { MoonStar, Sparkles, SunMedium } from "lucide-react";
import { HomeServices } from "@/components/home-services";
import { getDictionary, isLocale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return null;
  }
  const dictionary = getDictionary(lang);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-constellation" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-duel" aria-hidden="true">
          <span className="is-bright">
            <SunMedium size={21} />
          </span>
          <b>VS</b>
          <span className="is-shadow">
            <MoonStar size={21} />
          </span>
        </div>
        <p className="eyebrow">{dictionary.home.eyebrow}</p>
        <h1>{dictionary.home.title}</h1>
        <p>{dictionary.home.intro}</p>
        <div className="hero-rule" aria-hidden="true">
          <span />
          <Sparkles size={14} />
          <span />
        </div>
      </section>
      <HomeServices dictionary={dictionary} locale={lang} />
    </div>
  );
}
