/**
 * BHAVÉ I18N — FRENCH STRINGS
 * /i18n/strings.fr.js
 *
 * VOICE RULES (French):
 *   - Use "vous" for the form (respectful distance, appropriate for the Lab tone).
 *   - "Pattern" → "schéma" or "motif". "Awareness" → "conscience" or "perception".
 *   - Maintain the structural framing — no therapeutic softening.
 *
 * REVIEW NEEDED before go-live: native speaker check throughout.
 */

BhaveI18n.register('fr', {

  form: {
    initTag: '[ initialisation ]',
    title: 'Avant de commencer.',
    subtitle: 'Ces données s\'exécutent en arrière-plan — invisibles pendant le cours. Lorsque vous atteignez votre Carte des Schémas, elles apparaissent sous {{section}}.',
    subtitleSection: 'Votre Architecture Opérationnelle',

    birthName: {
      label: 'Nom complet de naissance',
      hint: 'Exactement tel qu\'il figure sur votre acte de naissance. C\'est le nom à partir duquel la numérologie est calculée.',
      placeholder: 'ex. Marie Claire Dupont',
    },
    birthDate: {
      label: 'Date de naissance',
    },
    birthTime: {
      label: 'Heure de naissance',
      optionalTag: 'optionnel',
      hint: 'Active le signe Ascendant. Si inconnue, laissez vide — Soleil et Lune sont calculés quand même.',
    },
    birthLocation: {
      label: 'Lieu de naissance',
      optionalTag: 'optionnel',
      hint: 'Ville et pays. Requis pour le signe Ascendant.',
      placeholder: 'ex. Paris, France',
    },

    geo: {
      resolving: 'Résolution...',
      resolved: '[ Localisé : {{location}} ]',
      notFound: '[ Lieu introuvable — l\'Ascendant ne sera pas calculé ]',
      error: '[ Impossible de résoudre le lieu ]',
    },

    submit: 'Initialiser',
    submitting: 'Calcul en cours...',

    errors: {
      nameRequired: 'Le nom de naissance est requis.',
      dateRequired: 'La date de naissance est requise.',
      calcFailed: 'Impossible de calculer. Vérifiez le nom et la date de naissance.',
    },
  },

  patternMap: {
    tag: '[ carte des schémas ]',
    title: 'Votre Architecture Opérationnelle',
    sectionNumerology: 'Numérologie',
    sectionAstrology: 'Astrologie',

    keys: {
      lifePath: 'Chemin de Vie',
      expression: 'Expression',
      soulUrge: 'Désir de l\'Âme',
      personality: 'Personnalité',
      birthDay: 'Jour de Naissance',
      personalYear: 'Année Personnelle',
      sun: 'Soleil',
      moon: 'Lune',
      rising: 'Ascendant',
    },

    masterBadge: 'MAÎTRE',
    personalYearCycle: '[ cycle {{year}} ]',
    moonCuspNote: 'Près de la limite entre signes — fournissez l\'heure exacte de naissance pour plus de précision.',
    risingMissing: 'Nécessite l\'heure et le lieu de naissance.',
    cuspFlag: '~',

    footer: 'Ce n\'est pas un système de personnalité. C\'est une carte de schémas.\nCe que vous faites avec la reconnaissance est le travail.',
    restart: 'recalculer avec des données différentes',
  },

  numerology: {
    lifePath: {
      1:  'Mode opérationnel : initiation indépendante. Le système fonctionne par autodirection.',
      2:  'Mode opérationnel : traitement collaboratif. Le système s\'optimise par les données relationnelles.',
      3:  'Mode opérationnel : génération expressive. Le système traite la sortie par la formation créative.',
      4:  'Mode opérationnel : intégrité structurelle. Le système construit et teste la stabilité.',
      5:  'Mode opérationnel : perturbation des schémas. Le système nécessite une entrée variable pour fonctionner.',
      6:  'Mode opérationnel : calibration relationnelle. Le système se maintient par le soin et la responsabilité.',
      7:  'Mode opérationnel : investigation interne. Le système opère plus profondément que les données de surface.',
      8:  'Mode opérationnel : architecture des ressources. Le système construit vers le pouvoir matériel et systémique.',
      9:  'Mode opérationnel : achèvement et libération. Le système traite largement, sert collectivement.',
      11: 'Mode opérationnel : perception amplifiée. Le signal 11 — intuition à fréquence élevée.',
      22: 'Mode opérationnel : construction maîtresse. Le signal 22 — édification à grande échelle par vision ancrée.',
      33: 'Mode opérationnel : service par la maîtrise. Le signal 33 — rare ; enseignement par intégration vécue.',
    },
    expression: {
      1:  'Signature de sortie : leadership, autonomie, initiation.',
      2:  'Signature de sortie : médiation, sensibilité, traitement coopératif.',
      3:  'Signature de sortie : expression, communication, génération créative.',
      4:  'Signature de sortie : précision, processus, pensée structurelle.',
      5:  'Signature de sortie : adaptabilité, liberté, traitement multi-entrées.',
      6:  'Signature de sortie : soin, responsabilité, architecture relationnelle.',
      7:  'Signature de sortie : analyse, profondeur, orientation interne.',
      8:  'Signature de sortie : autorité, précision matérielle, fonction exécutive.',
      9:  'Signature de sortie : synthèse, achèvement, perspective large.',
      11: 'Signature de sortie : transmission visionnaire — le 11 opère à signal élevé.',
      22: 'Signature de sortie : manifestation à grande échelle — le 22 construit dans la réalité structurelle.',
      33: 'Signature de sortie : maîtrise compatissante — le 33 sert par intégration démontrée.',
    },
    soulUrge: {
      1:  'Impulsion centrale : autodétermination.',
      2:  'Impulsion centrale : harmonie et connexion.',
      3:  'Impulsion centrale : expression créative.',
      4:  'Impulsion centrale : ordre et fiabilité.',
      5:  'Impulsion centrale : liberté et expérience.',
      6:  'Impulsion centrale : service et protection.',
      7:  'Impulsion centrale : profondeur et compréhension.',
      8:  'Impulsion centrale : compétence et impact.',
      9:  'Impulsion centrale : contribution universelle.',
      11: 'Impulsion centrale : illumination spirituelle et créative.',
      22: 'Impulsion centrale : construire quelque chose de durable.',
      33: 'Impulsion centrale : servir par la maîtrise de soi.',
    },
    personality: {
      1:  'Signature externe : autonome, confiant, direct.',
      2:  'Signature externe : réceptif, diplomate, discret.',
      3:  'Signature externe : expressif, chaleureux, communicatif.',
      4:  'Signature externe : fiable, mesuré, posé.',
      5:  'Signature externe : dynamique, curieux, difficile à cerner.',
      6:  'Signature externe : protecteur, responsable, présent.',
      7:  'Signature externe : réservé, perceptif, autonome.',
      8:  'Signature externe : autoritaire, soigné, imposant.',
      9:  'Signature externe : compatissant, sage, d\'une large portée.',
      11: 'Signature externe : électrique, inhabituel, difficile à catégoriser.',
      22: 'Signature externe : compétent, ancré, discrètement impressionnant.',
      33: 'Signature externe : rayonnant, désintéressé, présence élevée.',
    },
  },

  astrology: {
    signs: {
      Aries:       'Schéma de signal : initiation, mouvement direct, traitement rapide.',
      Taurus:      'Schéma de signal : stabilité, priorité des données sensorielles, effort soutenu.',
      Gemini:      'Schéma de signal : captation d\'information, traitement dual, état variable.',
      Cancer:      'Schéma de signal : orienté mémoire, sensible à l\'état émotionnel, protecteur.',
      Leo:         'Schéma de signal : pulsion de visibilité, autoexpression, formation d\'identité.',
      Virgo:       'Schéma de signal : discernement, précision, analyse et correction.',
      Libra:       'Schéma de signal : calibration relationnelle, recherche d\'équilibre, traitement esthétique.',
      Scorpio:     'Schéma de signal : orientation vers la profondeur, moteur de transformation, schéma sous la surface.',
      Sagittarius: 'Schéma de signal : recherche de sens, biais d\'expansion, optimisation de la vérité.',
      Capricorn:   'Schéma de signal : construction de structures, orienté résultats, traitement à long terme.',
      Aquarius:    'Schéma de signal : pensée systémique, orientation collective, perturbation des schémas.',
      Pisces:      'Schéma de signal : dissolution des limites, sensibilité de champ, intégration non linéaire.',
    },
  },

  email: {
    header: 'VOTRE ARCHITECTURE OPÉRATIONNELLE',
    sectionNumerology: 'NUMÉROLOGIE',
    sectionAstrology: 'ASTROLOGIE',
    masterLabel: '[ NOMBRE MAÎTRE ]',
    cycleLabel: '[ cycle {{year}} ]',
    cuspWarning: '[ frontière — vérifier avec heure exacte de naissance ]',
    risingMissing: '— nécessite heure et lieu de naissance',
    footer: 'Ce n\'est pas un système de personnalité. C\'est une carte de schémas.\nCe que vous faites avec la reconnaissance est le travail.',
  },

});
