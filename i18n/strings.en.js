/**
 * BHAVÉ I18N — ENGLISH STRINGS
 * /i18n/strings.en.js
 *
 * SOURCE OF TRUTH. All other language files mirror this structure exactly.
 * If a key exists here, it must exist in every language file.
 * If a key is missing in another language, it falls back to this file.
 *
 * VOICE RULES (English):
 *   - Precise. No fluff. No wellness language.
 *   - Numerology descriptions: structural, observational, not affirming.
 *   - Astrology descriptions: signal-based, not personality-based.
 *   - Form copy: direct, unhurried. No urgency.
 */

BhaveI18n.register('en', {

  // ── FORM — Birth Data Entry ───────────────────────────────────────────────
  form: {
    initTag: '[ initialization ]',
    title: 'Before you begin.',
    subtitle: 'This data runs in the background — invisible during the course. When you reach your Pattern Map, it surfaces under {{section}}.',
    subtitleSection: 'Your Operating Architecture',

    birthName: {
      label: 'Full birth name',
      hint: 'Exactly as it appears on your birth certificate. This is the name the numerology calculates from.',
      placeholder: 'e.g. Sarah Marie Johnson',
    },
    birthDate: {
      label: 'Date of birth',
    },
    birthTime: {
      label: 'Time of birth',
      optionalTag: 'optional',
      hint: 'Unlocks Rising sign. If unknown, leave blank — Sun and Moon still calculate.',
    },
    birthLocation: {
      label: 'Birth location',
      optionalTag: 'optional',
      hint: 'City and country. Required for Rising sign.',
      placeholder: 'e.g. Chicago, USA',
    },

    geo: {
      resolving: 'Resolving...',
      resolved: '[ Located: {{location}} ]',
      notFound: '[ Location not found — Rising sign will be skipped ]',
      error: '[ Could not resolve location ]',
    },

    submit: 'Initialize',
    submitting: 'Calculating...',

    errors: {
      nameRequired: 'Birth name is required.',
      dateRequired: 'Birth date is required.',
      calcFailed: 'Could not calculate. Check your birth name and date and try again.',
    },
  },

  // ── PATTERN MAP ───────────────────────────────────────────────────────────
  patternMap: {
    tag: '[ pattern map ]',
    title: 'Your Operating Architecture',
    sectionNumerology: 'Numerology',
    sectionAstrology: 'Astrology',

    keys: {
      lifePath: 'Life Path',
      expression: 'Expression',
      soulUrge: 'Soul Urge',
      personality: 'Personality',
      birthDay: 'Birth Day',
      personalYear: 'Personal Year',
      sun: 'Sun',
      moon: 'Moon',
      rising: 'Rising',
    },

    masterBadge: 'MASTER',
    personalYearCycle: '[ {{year}} cycle ]',
    moonCuspNote: 'Near sign boundary — provide exact birth time for precision.',
    risingMissing: 'Requires birth time + location.',
    cuspFlag: '~',

    footer: 'This is not a personality system. It is a pattern map.\nWhat you do with the recognition is the work.',
    restart: 'recalculate with different data',
  },

  // ── NUMEROLOGY DESCRIPTIONS ───────────────────────────────────────────────
  numerology: {
    lifePath: {
      1:  'Operating mode: independent initiation. The system runs on self-direction.',
      2:  'Operating mode: collaborative processing. The system optimizes through relationship data.',
      3:  'Operating mode: expressive generation. The system runs output through creative formation.',
      4:  'Operating mode: structural integrity. The system builds and tests for stability.',
      5:  'Operating mode: pattern disruption. The system requires variable input to function.',
      6:  'Operating mode: relational calibration. The system maintains through care and responsibility.',
      7:  'Operating mode: internal inquiry. The system runs deeper than surface data.',
      8:  'Operating mode: resource architecture. The system builds toward material and systemic power.',
      9:  'Operating mode: completion and release. The system processes broadly, serves collectively.',
      11: 'Operating mode: amplified perception. The 11 signal — intuition at elevated frequency.',
      22: 'Operating mode: master construction. The 22 signal — large-scale building through grounded vision.',
      33: 'Operating mode: service through mastery. The 33 signal — rare; teaching through lived integration.',
    },
    expression: {
      1:  'Output signature: leadership, autonomy, initiation.',
      2:  'Output signature: mediation, sensitivity, cooperative processing.',
      3:  'Output signature: expression, communication, creative generation.',
      4:  'Output signature: precision, process, structural thinking.',
      5:  'Output signature: adaptability, freedom, multi-input processing.',
      6:  'Output signature: care, responsibility, relational architecture.',
      7:  'Output signature: analysis, depth, internal orientation.',
      8:  'Output signature: authority, material precision, executive function.',
      9:  'Output signature: synthesis, completion, broad perspective.',
      11: 'Output signature: visionary transmission — the 11 runs at elevated signal.',
      22: 'Output signature: large-scale manifestation — the 22 builds in structural reality.',
      33: 'Output signature: compassionate mastery — the 33 serves through demonstrated integration.',
    },
    soulUrge: {
      1:  'Core drive: self-determination.',
      2:  'Core drive: harmony and connection.',
      3:  'Core drive: creative expression.',
      4:  'Core drive: order and reliability.',
      5:  'Core drive: freedom and experience.',
      6:  'Core drive: service and protection.',
      7:  'Core drive: depth and understanding.',
      8:  'Core drive: competence and impact.',
      9:  'Core drive: universal contribution.',
      11: 'Core drive: spiritual and creative illumination.',
      22: 'Core drive: building something that lasts.',
      33: 'Core drive: serving through mastery of self.',
    },
    personality: {
      1:  'External signature: self-reliant, confident, direct.',
      2:  'External signature: receptive, tactful, understated.',
      3:  'External signature: expressive, warm, communicative.',
      4:  'External signature: reliable, measured, composed.',
      5:  'External signature: dynamic, curious, hard to pin down.',
      6:  'External signature: nurturing, responsible, present.',
      7:  'External signature: reserved, perceptive, self-contained.',
      8:  'External signature: authoritative, put-together, commanding.',
      9:  'External signature: compassionate, wise, broadly appealing.',
      11: 'External signature: electric, unusual, not easily categorized.',
      22: 'External signature: competent, grounded, quietly impressive.',
      33: 'External signature: radiant, selfless, elevated presence.',
    },
  },

  // ── ASTROLOGY DESCRIPTIONS ────────────────────────────────────────────────
  astrology: {
    signs: {
      Aries:       'Signal pattern: initiation, direct movement, fast processing.',
      Taurus:      'Signal pattern: stability, sensory data priority, sustained effort.',
      Gemini:      'Signal pattern: information intake, dual processing, variable state.',
      Cancer:      'Signal pattern: memory-driven, feeling-state sensitive, protective.',
      Leo:         'Signal pattern: visibility drive, self-expression, identity formation.',
      Virgo:       'Signal pattern: discernment, precision, analysis and correction.',
      Libra:       'Signal pattern: relational calibration, balance-seeking, aesthetic processing.',
      Scorpio:     'Signal pattern: depth orientation, transformation engine, pattern beneath surface.',
      Sagittarius: 'Signal pattern: meaning-seeking, expansion bias, truth optimization.',
      Capricorn:   'Signal pattern: structure building, output-oriented, long-horizon processing.',
      Aquarius:    'Signal pattern: systemic thinking, collective orientation, pattern disruption.',
      Pisces:      'Signal pattern: dissolving boundaries, field sensitivity, non-linear integration.',
    },
  },

  // ── EMAIL BLOCK ───────────────────────────────────────────────────────────
  email: {
    header: 'YOUR OPERATING ARCHITECTURE',
    sectionNumerology: 'NUMEROLOGY',
    sectionAstrology: 'ASTROLOGY',
    masterLabel: '[ MASTER NUMBER ]',
    cycleLabel: '[ {{year}} cycle ]',
    cuspWarning: '[ boundary — verify with exact birth time ]',
    risingMissing: '— birth time + location required',
    footer: 'This is not a personality system. It is a pattern map.\nWhat you do with the recognition is the work.',
  },

});
