import type { Dictionary } from "@/lib/dictionary";

export const en = {
  productName: "FateBattle",
  tagline: "Two Sides Enter. One Realistic Verdict.",
  localeName: "English",
  alternateLocaleName: "한국어",
  header: {
    demoLogin: "Demo login",
    localeSwitchLabel: "한국어",
  },
  nav: {
    label: "Primary navigation",
    daily: "Daily",
    home: "Home",
    addChart: "Add Chart",
    covenChat: "Coven Chat",
    archive: "Archive",
  },
  footer: {
    privacy: "Privacy",
    terms: "Demo terms",
    disclaimer: "Entertainment notice",
    prototypeNote: "Frontend-only prototype. No birth details are stored.",
  },
  home: {
    eyebrow: "Bright meets Shadow",
    title: "Your fate has two sides. Let them argue.",
    intro:
      "FateBattle makes the useful side and the difficult side of the same pattern challenge each other, then ends with a realistic verdict.",
    sectionTitle: "Choose a fate arena",
    services: {
      saju: {
        title: "Four Pillars Battle",
        description:
          "Watch the Bright and Shadow sides of one demo chart argue through four rounds.",
        status: "Live battle",
      },
      compatibility: {
        title: "Compatibility Battle",
        description:
          "Preview how mutual ease and recurring friction could challenge each other.",
        status: "Arena preview",
      },
      "ten-year-cycle": {
        title: "10-Year Cycle Battle",
        description:
          "Put long-term momentum against the cost of staying on the same path.",
        status: "Arena preview",
      },
      yearly: {
        title: "Yearly FateBattle",
        description:
          "Let the year's openings and pressures clash, then inspect each month's edge.",
        status: "Live battle",
      },
      "auspicious-dates": {
        title: "Timing Battle",
        description:
          "Compare the case for acting now with the case for waiting and preparing.",
        status: "Arena preview",
      },
      "daily-fortune": {
        title: "Daily FateBattle",
        description:
          "Set today's useful impulse against the habit most likely to derail it.",
        status: "Arena preview",
      },
      "ask-the-coven": {
        title: "Challenge the Verdict",
        description:
          "Preview a future space for questioning both sides of an interpretation.",
        status: "Arena preview",
      },
    },
  },
  common: {
    backHome: "Return home",
    startReading: "Start a reading",
    reset: "Read another chart",
    optional: "optional",
    privacyBadge: "Memory only",
  },
  form: {
    alias: "Alias (optional)",
    calendar: "Calendar",
    solar: "Solar",
    lunar: "Lunar",
    birthDate: "Birth date",
    birthTime: "Birth time",
    timeUnknown: "I do not know my birth time",
    leapMonth: "Leap lunar month",
    country: "Country (optional)",
    city: "City (optional)",
    locationNotUsed:
      "Country and city are optional context only. They do not affect this demo calculation.",
    consent:
      "I consent to using these details only for this on-screen demo.",
    errors: {
      requiredDate: "Enter your birth date.",
      invalidDate: "Enter a real date in the shown format.",
      futureDate: "Birth date cannot be in the future.",
      outOfRange:
        "Use 1800 to 2300 for solar dates or 1800 to 2100 for lunar dates.",
      invalidLunarDate:
        "That lunar date or leap month does not exist in the selected year.",
      requiredTime: "Enter a birth time or choose that it is unknown.",
      requiredConsent: "Consent is required to open the demo reading.",
    },
  },
  saju: {
    eyebrow: "Four Pillars battle",
    title: "Let your chart argue with itself",
    intro:
      "FateBattle does not flatter one side of a chart. This fixed demo makes its useful promise and difficult tradeoff face each other without sending your details anywhere.",
    submit: "Start the fate battle",
    resultTitle: "Your fate enters the arena",
    defaultAlias: "This chart",
    theme:
      "{alias}, the same steady pattern can protect what matters or keep you stuck. Both sides now have to make their case.",
    arenaTitle: "Bright vs Shadow",
    arenaIntro:
      "Four rounds test the promise and the cost of the same demo pattern. Neither side gets the last word by itself.",
    brightLabel: "Bright",
    shadowLabel: "Shadow",
    brightSummary:
      "Steadiness can become discernment, loyalty, and reliable follow-through.",
    shadowSummary:
      "That same steadiness can become delay, guardedness, and attachment to a safe answer.",
    outcomeLabel: "Round outcome",
    rounds: [
      {
        title: "Nature",
        bright:
          "You notice patterns before reacting and can give uncertain moments a workable structure.",
        shadow:
          "You can keep observing long after enough is known, turning caution into avoidance.",
        outcome:
          "Insight helps only when you set a deadline for acting on it.",
      },
      {
        title: "Relationships",
        bright:
          "Loyalty and careful attention can make people feel genuinely protected.",
        shadow:
          "Unspoken tests and guarded expectations can make that care feel conditional.",
        outcome:
          "Say what you need directly before deciding that someone has failed to notice.",
      },
      {
        title: "Work and Money",
        bright:
          "Patient craft and repeatable systems can build durable value over time.",
        shadow:
          "Perfectionism can disguise fear of exposure and keep useful work unfinished.",
        outcome:
          "Ship a smaller complete version before improving the private ideal.",
      },
      {
        title: "Timing",
        bright:
          "You can wait through noise and move when the conditions are genuinely clearer.",
        shadow:
          "There may never be enough certainty to make the choice feel risk-free.",
        outcome:
          "Choose the next reversible step instead of waiting for a perfect opening.",
      },
    ],
    verdictTitle: "Battle Verdict",
    verdict:
      "This demo pattern is not simply strong or cautious. Its advantage is steady judgment, and its recurring cost is waiting until a decision feels safer than real life allows. The honest reading is to keep the patience, but stop treating hesitation as wisdom once the next step is reversible.",
    actionLabel: "Practical move",
    action:
      "Pick one delayed decision. Define the smallest reversible action, give yourself one day to check the facts, and then take it.",
    privacyNote:
      "Your alias and birth details remain in this tab memory and disappear when the page is refreshed or closed.",
    disclaimer:
      "This result separates calculated pillars from a deterministic interpretation demo. The interpretation does not predict events or replace professional advice.",
    directResultTitle: "FateBattle result",
    directResultBody:
      "The battle appears only after the in-memory form is submitted and is never reconstructed from a URL. Begin a new battle to view the demo.",
    chart: {
      title: "Your calculated Four Pillars",
      intro:
        "Calculated with manseryeok 2.0.0 from the selected calendar and entered time.",
      pillars: {
        year: "Year pillar",
        month: "Month pillar",
        day: "Day pillar",
        hour: "Hour pillar",
      },
      unknownTime: "Unknown",
      dayMaster: "Day master element",
      elementBalance: "Five element balance",
      elementNames: {
        목: "Wood",
        화: "Fire",
        토: "Earth",
        금: "Metal",
        수: "Water",
      },
      calculationNotice:
        "The pillar values above come from the calculation library.",
      interpretationNotice:
        "The witch debate below is a deterministic entertainment demo, not a prediction.",
    },
    witches: {
      bright: {
        name: "Bright Witch",
        role: "Possibility advocate",
        creed: "Names the strength and the condition that lets it work.",
      },
      shadow: {
        name: "Shadow Witch",
        role: "Pattern challenger",
        creed: "Tests where the same trait becomes a recurring cost.",
      },
      judge: {
        name: "Fate Judge",
        role: "Witch arbiter of the coven",
        creed: "Weighs both arguments and sets a practical condition.",
      },
    },
    elementProfiles: {
      목: {
        bright:
          "Wood supports growth, flexibility, and the patience to build a living idea.",
        shadow:
          "Growth can spread into too many directions and leave important work unfinished.",
        verdict:
          "Wood wins room to grow only when one direction receives a clear boundary.",
        action:
          "Choose one branch to finish before opening another path.",
      },
      화: {
        bright:
          "Fire brings visibility, candor, and momentum when a moment needs a clear signal.",
        shadow:
          "Speed and intensity can turn urgency into exhaustion or a promise made too early.",
        verdict:
          "Fire is useful when expression has a pace that can be sustained.",
        action:
          "Choose one visible step and set the recovery time before taking it.",
      },
      토: {
        bright:
          "Earth supports reliability, practical care, and the ability to hold a complex situation steady.",
        shadow:
          "Stability can become inertia or a habit of carrying obligations that are no longer yours.",
        verdict:
          "Earth remains a strength when steadiness includes a deadline for changing course.",
        action:
          "Set one decision cutoff and release one duty that no longer belongs to you.",
      },
      금: {
        bright:
          "Metal brings precision, standards, and the courage to remove what weakens the whole.",
        shadow:
          "High standards can harden into criticism and reject useful work before it has matured.",
        verdict:
          "Metal cuts cleanly when its standard still leaves room for revision.",
        action:
          "Define the good-enough line before judging the next draft.",
      },
      수: {
        bright:
          "Water supports insight, adaptation, and the ability to read what has not yet been said.",
        shadow:
          "Keeping every route open can turn reflection into drift and make delay look wise.",
        verdict:
          "Water keeps its insight when observation ends in one chosen course.",
        action:
          "Check the missing facts for one day, then take the smallest reversible step.",
      },
    },
  },
  yearly: {
    eyebrow: "Yearly FateBattle",
    title: "Put the year on both sides of the arena",
    intro:
      "A year is not simply lucky or difficult. This fixed demo lets its openings and pressures challenge each other before giving a practical verdict.",
    yearLabel: "Fortune year",
    consent:
      "I consent to using these details only for this on-screen demo.",
    submit: "Start the yearly battle",
    resultTitleSuffix: " FateBattle",
    arenaTitle: "Bright vs Shadow this year",
    arenaIntro:
      "The selected year holds both room to deepen and pressure to stop postponing. The clashes below keep either side from becoming a promise.",
    brightLabel: "Bright side",
    shadowLabel: "Shadow side",
    brightSummary:
      "Focused effort can deepen a skill, relationship, or financial habit that already has roots.",
    shadowSummary:
      "The urge to protect every option can scatter attention and make a necessary ending feel like failure.",
    outcomeLabel: "Clash outcome",
    clashes: [
      {
        title: "Relationships",
        bright:
          "Slower honesty can replace guessing with a more durable kind of closeness.",
        shadow:
          "Avoiding a difficult answer can keep a connection technically alive but emotionally stalled.",
        outcome:
          "Ask the direct question, then judge the relationship by the response rather than the hope.",
      },
      {
        title: "Career",
        bright:
          "Concentrated practice can turn an existing strength into visible authority.",
        shadow:
          "Adding another direction may feel productive while protecting you from being evaluated in one.",
        outcome:
          "Choose one body of work to finish before opening a new track.",
      },
      {
        title: "Money",
        bright:
          "Clear limits and repeatable habits can make ordinary income work harder.",
        shadow:
          "A dramatic purchase or rescue decision can become a shortcut around uncomfortable planning.",
        outcome:
          "Delay nonessential commitments long enough to compare them with the monthly baseline.",
      },
      {
        title: "Timing",
        bright:
          "A patient window gives important choices enough context to become clearer.",
        shadow:
          "Waiting for certainty can cause the choice to be made by default.",
        outcome:
          "Set an explicit decision date and separate missing facts from ordinary fear.",
      },
    ],
    verdictTitle: "Yearly Verdict",
    verdict:
      "This is not a year that rewards blind optimism or permanent caution. Its useful edge appears when you deepen one real commitment and close the options that only consume attention. Progress is plausible, but only if completion becomes more important than keeping every escape route.",
    actionLabel: "Practical move",
    action:
      "Name one commitment to deepen, one obligation to end, and a date for each decision. Review the evidence monthly rather than treating this demo as certainty.",
    monthsTitle: "Twelve monthly edges",
    months: [
      {
        name: "January",
        edge: "shadow",
        edgeLabel: "Shadow edge",
        detail:
          "Too many fresh intentions can divide attention before any one of them gains traction.",
      },
      {
        name: "February",
        edge: "bright",
        edgeLabel: "Bright edge",
        detail:
          "A candid conversation has more leverage than another month of guessing, if you accept the answer you receive.",
      },
      {
        name: "March",
        edge: "balanced",
        edgeLabel: "Even match",
        detail:
          "Returning to unfinished craft helps, but only if repetition leads to a finished version.",
      },
      {
        name: "April",
        edge: "shadow",
        edgeLabel: "Shadow edge",
        detail:
          "Urgent invitations can look like opportunity while pulling energy away from the work that matters.",
      },
      {
        name: "May",
        edge: "bright",
        edgeLabel: "Bright edge",
        detail:
          "Sharing work earlier brings useful correction before perfectionism becomes expensive.",
      },
      {
        name: "June",
        edge: "shadow",
        edgeLabel: "Shadow edge",
        detail:
          "Fatigue can turn every option into a bad one, so recovery belongs before another commitment.",
      },
      {
        name: "July",
        edge: "balanced",
        edgeLabel: "Even match",
        detail:
          "A boundary protects focus, but rigidity can close off a repair worth attempting.",
      },
      {
        name: "August",
        edge: "bright",
        edgeLabel: "Bright edge",
        detail:
          "Curiosity opens a useful route when one reliable habit keeps the experiment grounded.",
      },
      {
        name: "September",
        edge: "shadow",
        edgeLabel: "Shadow edge",
        detail:
          "Keeping a mature project open can become an excuse to avoid declaring it finished.",
      },
      {
        name: "October",
        edge: "bright",
        edgeLabel: "Bright edge",
        detail:
          "A steady routine can carry a larger change without demanding a dramatic reinvention.",
      },
      {
        name: "November",
        edge: "shadow",
        edgeLabel: "Shadow edge",
        detail:
          "A quieter option deserves attention, but silence alone does not make it wiser.",
      },
      {
        name: "December",
        edge: "balanced",
        edgeLabel: "Even match",
        detail:
          "The year closes well when you acknowledge both what grew and what still needs a hard decision.",
      },
    ],
    privacyNote:
      "The selected year and birth date are used only in this tab memory and are not stored.",
    disclaimer:
      "This annual battle is a fixed interpretive demo for reflection and entertainment. It does not predict events, establish certainty, or replace professional advice.",
    directResultTitle: "Yearly FateBattle result",
    directResultBody:
      "The yearly battle lives only in the form screen after submission. Start there to view the clashes, verdict, and monthly edges.",
  },
  servicePages: {
    compatibility: {
      eyebrow: "Arena preview",
      title: "Compatibility Battle",
      description:
        "A future arena would put shared ease against recurring friction before offering a relationship verdict.",
      details: [
        "Bright would argue for the rhythms that help two people work well together.",
        "Shadow would counter with the patterns most likely to create friction.",
        "The verdict would name a useful boundary without assigning a score.",
        "No second person's details are collected in this prototype.",
      ],
      action: "Start with your chart",
      href: "saju",
    },
    "ten-year-cycle": {
      eyebrow: "Long-range arena preview",
      title: "10-Year Cycle Battle",
      description:
        "A future battle would compare the momentum of a long cycle with the cost of following it blindly.",
      details: [
        "Bright would argue for what the cycle makes easier to build.",
        "Shadow would expose the responsibilities and blind spots it adds.",
        "A final verdict would favor a practical tradeoff, not a prediction.",
        "Long-range guidance remains a preview for now.",
      ],
      action: "Open the Saju battle",
      href: "saju",
    },
    "auspicious-dates": {
      eyebrow: "Timing arena preview",
      title: "Timing Battle",
      description:
        "A future arena would make the case for acting now and the case for waiting under the same conditions.",
      details: [
        "Bright would surface the conditions that support action.",
        "Shadow would surface the costs of rushing or waiting too long.",
        "The verdict would recommend a reversible next move without guaranteeing an outcome.",
        "Important decisions should still use reliable professional guidance.",
      ],
      action: "Return to the readings",
      href: "home",
    },
    "daily-fortune": {
      eyebrow: "Daily arena preview",
      title: "Daily FateBattle",
      description:
        "A future daily battle would put today's useful impulse against the pattern most likely to derail it.",
      details: [
        "Bright would argue for one action worth taking today.",
        "Shadow would challenge the excuse or excess hidden inside that action.",
        "The daily verdict would leave one small, testable move.",
      ],
      action: "Choose another reading",
      href: "home",
    },
    "ask-the-coven": {
      eyebrow: "Verdict challenge preview",
      title: "Challenge the Verdict",
      description:
        "A future conversation would let you challenge both sides of the battle before accepting the verdict.",
      details: [
        "No prompt is sent to a server.",
        "No chat history is stored.",
        "Bright and Shadow would each answer the same follow-up question.",
        "Any future generated guidance would be clearly labeled.",
      ],
      action: "Return home",
      href: "home",
    },
    archive: {
      eyebrow: "Private by design",
      title: "Archive",
      description:
        "Saved charts are intentionally unavailable because this prototype stores no personal data.",
      details: [
        "Refreshing the page clears form results.",
        "No account or database is connected.",
        "You can always begin a new in-memory chart.",
      ],
      action: "Add a chart",
      href: "saju",
    },
    "demo-login": {
      eyebrow: "Demo account surface",
      title: "Demo login",
      description:
        "Login is a visual prototype only. There is no account creation or authentication.",
      details: [
        "No credentials are requested.",
        "No session is created.",
        "All reading flows remain available without an account.",
      ],
      action: "Continue without login",
      href: "home",
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy in this prototype",
      description:
        "Birth details are used only to reveal fixed content in the current browser memory.",
      details: [
        "Birth date, time, country, and city are not placed in URLs.",
        "The prototype does not use browser storage, a database, analytics, or application API routes.",
        "Only a selected locale may be stored in a cookie.",
      ],
      action: "Return home",
      href: "home",
    },
    "demo-terms": {
      eyebrow: "Demo terms",
      title: "Terms for this prototype",
      description:
        "FateBattle is an interface demonstration with fixed bilingual sample content.",
      details: [
        "There is no paid service, account, or service guarantee.",
        "Features and wording may change before any future release.",
        "Use the experience only as a product preview.",
      ],
      action: "Return home",
      href: "home",
    },
    disclaimer: {
      eyebrow: "Entertainment notice",
      title: "Reflection, not prediction",
      description:
        "All readings are fictional fixtures created to demonstrate an interface.",
      details: [
        "The content is not medical, legal, financial, or psychological advice.",
        "It does not establish facts about a person or predict future events.",
        "Use qualified professionals and reliable evidence for important decisions.",
      ],
      action: "Return home",
      href: "home",
    },
  },
} satisfies Dictionary;
