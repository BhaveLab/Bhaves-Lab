/**
 * BHAVÉ I18N — SPANISH STRINGS
 * /i18n/strings.es.js
 *
 * VOICE RULES (Spanish):
 *   - Maintain the Lab's precision. No spiritual softening.
 *   - Use "tú" (informal) — direct, not distant.
 *   - "Awareness" → "conciencia" or "percepción" — context-dependent.
 *   - "Pattern" → "patrón" (not "modelo").
 *   - Numerology/astrology descriptions: same structural framing as English.
 *
 * REVIEW NEEDED before go-live:
 *   Mark any line with // REVIEW if a phrase needs native speaker check.
 */

BhaveI18n.register('es', {

  form: {
    initTag: '[ inicialización ]',
    title: 'Antes de comenzar.',
    subtitle: 'Esta información se procesa en segundo plano — invisible durante el curso. Cuando llegues a tu Mapa de Patrones, aparece en {{section}}.',
    subtitleSection: 'Tu Arquitectura Operativa',

    birthName: {
      label: 'Nombre completo de nacimiento',
      hint: 'Exactamente como aparece en tu acta de nacimiento. Este es el nombre desde el que se calculan los números.',
      placeholder: 'ej. María Elena Rodríguez',
    },
    birthDate: {
      label: 'Fecha de nacimiento',
    },
    birthTime: {
      label: 'Hora de nacimiento',
      optionalTag: 'opcional',
      hint: 'Activa el signo Ascendente. Si no la sabes, déjalo en blanco — el Sol y la Luna igual se calculan.',
    },
    birthLocation: {
      label: 'Lugar de nacimiento',
      optionalTag: 'opcional',
      hint: 'Ciudad y país. Requerido para el signo Ascendente.',
      placeholder: 'ej. Ciudad de México, México',
    },

    geo: {
      resolving: 'Resolviendo...',
      resolved: '[ Ubicado: {{location}} ]',
      notFound: '[ Ubicación no encontrada — el Ascendente no se calculará ]',
      error: '[ No se pudo resolver la ubicación ]',
    },

    submit: 'Inicializar',
    submitting: 'Calculando...',

    errors: {
      nameRequired: 'El nombre de nacimiento es requerido.',
      dateRequired: 'La fecha de nacimiento es requerida.',
      calcFailed: 'No se pudo calcular. Verifica el nombre y la fecha de nacimiento.',
    },
  },

  patternMap: {
    tag: '[ mapa de patrones ]',
    title: 'Tu Arquitectura Operativa',
    sectionNumerology: 'Numerología',
    sectionAstrology: 'Astrología',

    keys: {
      lifePath: 'Camino de Vida',
      expression: 'Expresión',
      soulUrge: 'Impulso del Alma',
      personality: 'Personalidad',
      birthDay: 'Día de Nacimiento',
      personalYear: 'Año Personal',
      sun: 'Sol',
      moon: 'Luna',
      rising: 'Ascendente',
    },

    masterBadge: 'MAESTRO',
    personalYearCycle: '[ ciclo {{year}} ]',
    moonCuspNote: 'Cerca del límite entre signos — proporciona la hora exacta de nacimiento para mayor precisión.',
    risingMissing: 'Requiere hora y lugar de nacimiento.',
    cuspFlag: '~',

    footer: 'Esto no es un sistema de personalidad. Es un mapa de patrones.\nLo que hagas con el reconocimiento es el trabajo.',
    restart: 'recalcular con datos diferentes',
  },

  numerology: {
    lifePath: {
      1:  'Modo operativo: iniciación independiente. El sistema funciona con autodirección.',
      2:  'Modo operativo: procesamiento colaborativo. El sistema se optimiza a través de datos relacionales.',
      3:  'Modo operativo: generación expresiva. El sistema procesa la salida a través de la formación creativa.',
      4:  'Modo operativo: integridad estructural. El sistema construye y prueba la estabilidad.',
      5:  'Modo operativo: disrupción de patrones. El sistema requiere entrada variable para funcionar.',
      6:  'Modo operativo: calibración relacional. El sistema se mantiene a través del cuidado y la responsabilidad.',
      7:  'Modo operativo: indagación interna. El sistema opera más profundo que los datos superficiales.',
      8:  'Modo operativo: arquitectura de recursos. El sistema construye hacia el poder material y sistémico.',
      9:  'Modo operativo: finalización y liberación. El sistema procesa ampliamente, sirve colectivamente.',
      11: 'Modo operativo: percepción amplificada. La señal 11 — intuición a frecuencia elevada.',
      22: 'Modo operativo: construcción maestra. La señal 22 — edificación a gran escala con visión fundamentada.',
      33: 'Modo operativo: servicio a través de la maestría. La señal 33 — rara; enseñanza a través de la integración vivida.',
    },
    expression: {
      1:  'Firma de salida: liderazgo, autonomía, iniciación.',
      2:  'Firma de salida: mediación, sensibilidad, procesamiento cooperativo.',
      3:  'Firma de salida: expresión, comunicación, generación creativa.',
      4:  'Firma de salida: precisión, proceso, pensamiento estructural.',
      5:  'Firma de salida: adaptabilidad, libertad, procesamiento multi-entrada.',
      6:  'Firma de salida: cuidado, responsabilidad, arquitectura relacional.',
      7:  'Firma de salida: análisis, profundidad, orientación interna.',
      8:  'Firma de salida: autoridad, precisión material, función ejecutiva.',
      9:  'Firma de salida: síntesis, finalización, perspectiva amplia.',
      11: 'Firma de salida: transmisión visionaria — el 11 opera a señal elevada.',
      22: 'Firma de salida: manifestación a gran escala — el 22 construye en la realidad estructural.',
      33: 'Firma de salida: maestría compasiva — el 33 sirve a través de la integración demostrada.',
    },
    soulUrge: {
      1:  'Impulso central: autodeterminación.',
      2:  'Impulso central: armonía y conexión.',
      3:  'Impulso central: expresión creativa.',
      4:  'Impulso central: orden y confiabilidad.',
      5:  'Impulso central: libertad y experiencia.',
      6:  'Impulso central: servicio y protección.',
      7:  'Impulso central: profundidad y comprensión.',
      8:  'Impulso central: competencia e impacto.',
      9:  'Impulso central: contribución universal.',
      11: 'Impulso central: iluminación espiritual y creativa.',
      22: 'Impulso central: construir algo que perdure.',
      33: 'Impulso central: servir a través de la maestría de sí mismo.',
    },
    personality: {
      1:  'Firma externa: autosuficiente, seguro, directo.',
      2:  'Firma externa: receptivo, diplomático, discreto.',
      3:  'Firma externa: expresivo, cálido, comunicativo.',
      4:  'Firma externa: confiable, mesurado, compuesto.',
      5:  'Firma externa: dinámico, curioso, difícil de encasillar.',
      6:  'Firma externa: protector, responsable, presente.',
      7:  'Firma externa: reservado, perceptivo, autónomo.',
      8:  'Firma externa: autoritario, presentable, imponente.',
      9:  'Firma externa: compasivo, sabio, de amplio alcance.',
      11: 'Firma externa: eléctrico, inusual, difícil de categorizar.',
      22: 'Firma externa: competente, fundamentado, discretamente impresionante.',
      33: 'Firma externa: radiante, desinteresado, presencia elevada.',
    },
  },

  astrology: {
    signs: {
      Aries:       'Patrón de señal: iniciación, movimiento directo, procesamiento rápido.',
      Taurus:      'Patrón de señal: estabilidad, prioridad de datos sensoriales, esfuerzo sostenido.',
      Gemini:      'Patrón de señal: captación de información, procesamiento dual, estado variable.',
      Cancer:      'Patrón de señal: orientado a la memoria, sensible al estado emocional, protector.',
      Leo:         'Patrón de señal: impulso de visibilidad, autoexpresión, formación de identidad.',
      Virgo:       'Patrón de señal: discernimiento, precisión, análisis y corrección.',
      Libra:       'Patrón de señal: calibración relacional, búsqueda de equilibrio, procesamiento estético.',
      Scorpio:     'Patrón de señal: orientación hacia la profundidad, motor de transformación, patrón bajo la superficie.',
      Sagittarius: 'Patrón de señal: búsqueda de significado, sesgo de expansión, optimización de la verdad.',
      Capricorn:   'Patrón de señal: construcción de estructuras, orientado a resultados, procesamiento a largo plazo.',
      Aquarius:    'Patrón de señal: pensamiento sistémico, orientación colectiva, disrupción de patrones.',
      Pisces:      'Patrón de señal: disolución de límites, sensibilidad de campo, integración no lineal.',
    },
  },

  email: {
    header: 'TU ARQUITECTURA OPERATIVA',
    sectionNumerology: 'NUMEROLOGÍA',
    sectionAstrology: 'ASTROLOGÍA',
    masterLabel: '[ NÚMERO MAESTRO ]',
    cycleLabel: '[ ciclo {{year}} ]',
    cuspWarning: '[ límite — verificar con hora exacta de nacimiento ]',
    risingMissing: '— requiere hora y lugar de nacimiento',
    footer: 'Esto no es un sistema de personalidad. Es un mapa de patrones.\nLo que hagas con el reconocimiento es el trabajo.',
  },

});
