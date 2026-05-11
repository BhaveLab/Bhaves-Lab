/**
 * BHAVÉ I18N — PORTUGUESE STRINGS
 * /i18n/strings.pt.js
 *
 * VOICE RULES (Portuguese — Brazilian):
 *   - Use "você" (Brazilian standard) — direct, not distant.
 *   - Maintain structural, non-therapeutic framing throughout.
 *   - "Pattern" → "padrão". "Awareness" → "consciência" or "percepção".
 *
 * REVIEW NEEDED before go-live: native speaker check on numerology descriptions.
 */

BhaveI18n.register('pt', {

  form: {
    initTag: '[ inicialização ]',
    title: 'Antes de começar.',
    subtitle: 'Esses dados processam em segundo plano — invisíveis durante o curso. Quando você chegar ao seu Mapa de Padrões, aparecerá em {{section}}.',
    subtitleSection: 'Sua Arquitetura Operacional',

    birthName: {
      label: 'Nome completo de nascimento',
      hint: 'Exatamente como aparece na sua certidão de nascimento. É o nome a partir do qual a numerologia é calculada.',
      placeholder: 'ex. Ana Carolina Silva',
    },
    birthDate: {
      label: 'Data de nascimento',
    },
    birthTime: {
      label: 'Hora de nascimento',
      optionalTag: 'opcional',
      hint: 'Ativa o Ascendente. Se não souber, deixe em branco — Sol e Lua ainda são calculados.',
    },
    birthLocation: {
      label: 'Local de nascimento',
      optionalTag: 'opcional',
      hint: 'Cidade e país. Necessário para o Ascendente.',
      placeholder: 'ex. São Paulo, Brasil',
    },

    geo: {
      resolving: 'Localizando...',
      resolved: '[ Localizado: {{location}} ]',
      notFound: '[ Local não encontrado — o Ascendente não será calculado ]',
      error: '[ Não foi possível resolver o local ]',
    },

    submit: 'Inicializar',
    submitting: 'Calculando...',

    errors: {
      nameRequired: 'O nome de nascimento é obrigatório.',
      dateRequired: 'A data de nascimento é obrigatória.',
      calcFailed: 'Não foi possível calcular. Verifique o nome e a data de nascimento.',
    },
  },

  patternMap: {
    tag: '[ mapa de padrões ]',
    title: 'Sua Arquitetura Operacional',
    sectionNumerology: 'Numerologia',
    sectionAstrology: 'Astrologia',

    keys: {
      lifePath: 'Caminho de Vida',
      expression: 'Expressão',
      soulUrge: 'Impulso da Alma',
      personality: 'Personalidade',
      birthDay: 'Dia de Nascimento',
      personalYear: 'Ano Pessoal',
      sun: 'Sol',
      moon: 'Lua',
      rising: 'Ascendente',
    },

    masterBadge: 'MESTRE',
    personalYearCycle: '[ ciclo {{year}} ]',
    moonCuspNote: 'Próximo à fronteira entre signos — forneça a hora exata de nascimento para maior precisão.',
    risingMissing: 'Requer hora e local de nascimento.',
    cuspFlag: '~',

    footer: 'Isso não é um sistema de personalidade. É um mapa de padrões.\nO que você faz com o reconhecimento é o trabalho.',
    restart: 'recalcular com dados diferentes',
  },

  numerology: {
    lifePath: {
      1:  'Modo operacional: iniciação independente. O sistema opera por autodirecionamento.',
      2:  'Modo operacional: processamento colaborativo. O sistema se otimiza através de dados relacionais.',
      3:  'Modo operacional: geração expressiva. O sistema processa a saída através da formação criativa.',
      4:  'Modo operacional: integridade estrutural. O sistema constrói e testa a estabilidade.',
      5:  'Modo operacional: disrupção de padrões. O sistema requer entrada variável para funcionar.',
      6:  'Modo operacional: calibração relacional. O sistema se mantém através do cuidado e responsabilidade.',
      7:  'Modo operacional: investigação interna. O sistema opera além dos dados superficiais.',
      8:  'Modo operacional: arquitetura de recursos. O sistema constrói em direção ao poder material e sistêmico.',
      9:  'Modo operacional: finalização e liberação. O sistema processa amplamente, serve coletivamente.',
      11: 'Modo operacional: percepção amplificada. O sinal 11 — intuição em frequência elevada.',
      22: 'Modo operacional: construção mestre. O sinal 22 — edificação em larga escala com visão fundamentada.',
      33: 'Modo operacional: serviço através da maestria. O sinal 33 — raro; ensinamento através da integração vivida.',
    },
    expression: {
      1:  'Assinatura de saída: liderança, autonomia, iniciação.',
      2:  'Assinatura de saída: mediação, sensibilidade, processamento cooperativo.',
      3:  'Assinatura de saída: expressão, comunicação, geração criativa.',
      4:  'Assinatura de saída: precisão, processo, pensamento estrutural.',
      5:  'Assinatura de saída: adaptabilidade, liberdade, processamento multi-entrada.',
      6:  'Assinatura de saída: cuidado, responsabilidade, arquitetura relacional.',
      7:  'Assinatura de saída: análise, profundidade, orientação interna.',
      8:  'Assinatura de saída: autoridade, precisão material, função executiva.',
      9:  'Assinatura de saída: síntese, finalização, perspectiva ampla.',
      11: 'Assinatura de saída: transmissão visionária — o 11 opera em sinal elevado.',
      22: 'Assinatura de saída: manifestação em larga escala — o 22 constrói na realidade estrutural.',
      33: 'Assinatura de saída: maestria compassiva — o 33 serve através da integração demonstrada.',
    },
    soulUrge: {
      1:  'Impulso central: autodeterminação.',
      2:  'Impulso central: harmonia e conexão.',
      3:  'Impulso central: expressão criativa.',
      4:  'Impulso central: ordem e confiabilidade.',
      5:  'Impulso central: liberdade e experiência.',
      6:  'Impulso central: serviço e proteção.',
      7:  'Impulso central: profundidade e compreensão.',
      8:  'Impulso central: competência e impacto.',
      9:  'Impulso central: contribuição universal.',
      11: 'Impulso central: iluminação espiritual e criativa.',
      22: 'Impulso central: construir algo que dure.',
      33: 'Impulso central: servir através da maestria de si mesmo.',
    },
    personality: {
      1:  'Assinatura externa: autossuficiente, confiante, direto.',
      2:  'Assinatura externa: receptivo, diplomático, discreto.',
      3:  'Assinatura externa: expressivo, caloroso, comunicativo.',
      4:  'Assinatura externa: confiável, equilibrado, composto.',
      5:  'Assinatura externa: dinâmico, curioso, difícil de categorizar.',
      6:  'Assinatura externa: protetor, responsável, presente.',
      7:  'Assinatura externa: reservado, perceptivo, autônomo.',
      8:  'Assinatura externa: autoritário, apresentável, imponente.',
      9:  'Assinatura externa: compassivo, sábio, de amplo alcance.',
      11: 'Assinatura externa: elétrico, incomum, difícil de categorizar.',
      22: 'Assinatura externa: competente, fundamentado, discretamente impressionante.',
      33: 'Assinatura externa: radiante, altruísta, presença elevada.',
    },
  },

  astrology: {
    signs: {
      Aries:       'Padrão de sinal: iniciação, movimento direto, processamento rápido.',
      Taurus:      'Padrão de sinal: estabilidade, prioridade de dados sensoriais, esforço sustentado.',
      Gemini:      'Padrão de sinal: captação de informação, processamento dual, estado variável.',
      Cancer:      'Padrão de sinal: orientado à memória, sensível ao estado emocional, protetor.',
      Leo:         'Padrão de sinal: impulso de visibilidade, autoexpressão, formação de identidade.',
      Virgo:       'Padrão de sinal: discernimento, precisão, análise e correção.',
      Libra:       'Padrão de sinal: calibração relacional, busca de equilíbrio, processamento estético.',
      Scorpio:     'Padrão de sinal: orientação para a profundidade, motor de transformação, padrão abaixo da superfície.',
      Sagittarius: 'Padrão de sinal: busca de significado, viés de expansão, otimização da verdade.',
      Capricorn:   'Padrão de sinal: construção de estruturas, orientado a resultados, processamento de longo prazo.',
      Aquarius:    'Padrão de sinal: pensamento sistêmico, orientação coletiva, disrupção de padrões.',
      Pisces:      'Padrão de sinal: dissolução de limites, sensibilidade de campo, integração não linear.',
    },
  },

  email: {
    header: 'SUA ARQUITETURA OPERACIONAL',
    sectionNumerology: 'NUMEROLOGIA',
    sectionAstrology: 'ASTROLOGIA',
    masterLabel: '[ NÚMERO MESTRE ]',
    cycleLabel: '[ ciclo {{year}} ]',
    cuspWarning: '[ fronteira — verificar com hora exata de nascimento ]',
    risingMissing: '— requer hora e local de nascimento',
    footer: 'Isso não é um sistema de personalidade. É um mapa de padrões.\nO que você faz com o reconhecimento é o trabalho.',
  },

});
