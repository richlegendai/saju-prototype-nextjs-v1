import type { FiveElement } from "manseryeok";

export const homeServiceIds = [
  "saju",
  "compatibility",
  "ten-year-cycle",
  "yearly",
  "auspicious-dates",
  "daily-fortune",
  "ask-the-coven",
] as const;

export type HomeServiceId = (typeof homeServiceIds)[number];

export const servicePageIds = [
  "compatibility",
  "ten-year-cycle",
  "auspicious-dates",
  "daily-fortune",
  "ask-the-coven",
  "archive",
  "demo-login",
  "privacy",
  "demo-terms",
  "disclaimer",
] as const;

export type ServicePageId = (typeof servicePageIds)[number];

export type Dictionary = {
  productName: string;
  tagline: string;
  localeName: string;
  alternateLocaleName: string;
  header: {
    demoLogin: string;
    localeSwitchLabel: string;
  };
  nav: {
    label: string;
    daily: string;
    home: string;
    addChart: string;
    covenChat: string;
    archive: string;
  };
  footer: {
    privacy: string;
    terms: string;
    disclaimer: string;
    prototypeNote: string;
  };
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    sectionTitle: string;
    services: Record<
      HomeServiceId,
      {
        title: string;
        description: string;
        status: string;
      }
    >;
  };
  common: {
    backHome: string;
    startReading: string;
    reset: string;
    optional: string;
    privacyBadge: string;
  };
  form: {
    alias: string;
    calendar: string;
    solar: string;
    lunar: string;
    birthDate: string;
    birthTime: string;
    timeUnknown: string;
    leapMonth: string;
    country: string;
    city: string;
    locationNotUsed: string;
    consent: string;
    errors: {
      requiredDate: string;
      invalidDate: string;
      futureDate: string;
      outOfRange: string;
      invalidLunarDate: string;
      requiredTime: string;
      requiredConsent: string;
    };
  };
  saju: {
    eyebrow: string;
    title: string;
    intro: string;
    submit: string;
    resultTitle: string;
    defaultAlias: string;
    theme: string;
    arenaTitle: string;
    arenaIntro: string;
    brightLabel: string;
    shadowLabel: string;
    brightSummary: string;
    shadowSummary: string;
    outcomeLabel: string;
    rounds: readonly {
      title: string;
      bright: string;
      shadow: string;
      outcome: string;
    }[];
    verdictTitle: string;
    verdict: string;
    actionLabel: string;
    action: string;
    privacyNote: string;
    disclaimer: string;
    directResultTitle: string;
    directResultBody: string;
    chart: {
      title: string;
      intro: string;
      pillars: {
        year: string;
        month: string;
        day: string;
        hour: string;
      };
      unknownTime: string;
      dayMaster: string;
      elementBalance: string;
      elementNames: Record<FiveElement, string>;
      calculationNotice: string;
      interpretationNotice: string;
    };
    witches: {
      bright: {
        name: string;
        role: string;
        creed: string;
      };
      shadow: {
        name: string;
        role: string;
        creed: string;
      };
      judge: {
        name: string;
        role: string;
        creed: string;
      };
    };
    elementProfiles: Record<
      FiveElement,
      {
        bright: string;
        shadow: string;
        verdict: string;
        action: string;
      }
    >;
  };
  yearly: {
    eyebrow: string;
    title: string;
    intro: string;
    yearLabel: string;
    consent: string;
    submit: string;
    resultTitleSuffix: string;
    arenaTitle: string;
    arenaIntro: string;
    brightLabel: string;
    shadowLabel: string;
    brightSummary: string;
    shadowSummary: string;
    outcomeLabel: string;
    clashes: readonly {
      title: string;
      bright: string;
      shadow: string;
      outcome: string;
    }[];
    verdictTitle: string;
    verdict: string;
    actionLabel: string;
    action: string;
    monthsTitle: string;
    months: readonly {
      name: string;
      edge: "bright" | "shadow" | "balanced";
      edgeLabel: string;
      detail: string;
    }[];
    privacyNote: string;
    disclaimer: string;
    directResultTitle: string;
    directResultBody: string;
  };
  servicePages: Record<
    ServicePageId,
    {
      eyebrow: string;
      title: string;
      description: string;
      details: readonly string[];
      action: string;
      href: "home" | "saju" | "yearly";
    }
  >;
};
