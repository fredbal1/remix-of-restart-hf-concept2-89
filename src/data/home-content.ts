export const HOME_CONTENT = {
  hero: {
    eyebrow: "Studio d'architecture intérieure",
    title: "Transformons\nvos espaces",
    text: "Validez les bons choix avant travaux grâce à des projections 3D photoréalistes claires, précises et rassurantes.",
    ctaPrimary: "Parler de votre projet",
    ctaSecondary: "Voir les réalisations",
    proofs: [
      { value: "15+", label: "ans d'expérience" },
      { value: "3D", label: "projection immersive" },
      { value: "Sur mesure", label: "accompagnement" },
    ],
  },
  trustBand: {
    items: [
      { accent: "Premier échange", text: "offert et sans engagement" },
      { accent: "Réponse", text: "sous 24h ouvrées" },
      { accent: "Accompagnement", text: "à domicile ou à distance" },
      { accent: "Devis", text: "clair avant engagement" },
    ],
  },
  editorial: {
    eyebrow: "Le studio",
  title: "Votre intérieur, notre direction",
    text: "Chaque projet est une rencontre. Nous prenons le temps de comprendre votre mode de vie, vos goûts et vos contraintes pour concevoir un intérieur qui vous ressemble pleinement.",
    bullets: [
      "Écoute du lieu et des usages",
      "Conception sur mesure",
      "Accompagnement rigoureux",
    ],
    cta: "Découvrir le studio",
  },
  realisations: {
    eyebrow: "Nos réalisations",
    title: "Des intérieurs repensés",
    description: "Des projets faits pour durer",
    selection: "Une sélection de projets à découvrir plus en détail.",
    cta: "Explorer toutes les réalisations",
  },
  services: {
    eyebrow: "Les services",
    title: "Choisissez la formule adaptée à votre projet",
    text: "Du conseil ciblé au projet complet, découvrez l'accompagnement le plus juste selon votre besoin.",
    reassurance: [
      "Premier échange gratuit",
      "Réponse sous 24h ouvrées",
      "À domicile ou à distance",
    ],
    cta: "Découvrir tous les services",
    formules: [
      {
        slug: "conseil",
        selectorSummary: "Clarifier vos choix rapidement",
        benefits: [
          "Recommandations claires sur l'agencement, les matières et les teintes",
          "Estimation d'une enveloppe prévisionnelle",
          "Orientation vers la formule la plus adaptée, sans engagement",
          "Éviter les erreurs coûteuses",
        ],
        primaryCtaLabel: "Réserver un conseil",
        homePrice: "99 €",
        homePriceNote: "pour 1h de conseil à domicile",
        homePriceDetail: "Paris & Île-de-France uniquement",
      },
      {
        slug: "conception-3d",
        selectorSummary: "Visualiser avant de lancer les travaux",
        benefits: [
          "Projection réaliste avant travaux",
          "Validation des choix avant lancement",
          "Vision plus claire pour décider",
        ],
        primaryCtaLabel: "Découvrir la 3D",
      },
      {
        slug: "projet-complet",
        selectorSummary: "Déléguer le projet de A à Z",
        benefits: [
          "Un interlocuteur unique du début à la fin",
          "Coordination du projet avec méthode",
          "Suivi rigoureux jusqu'à la réalisation",
        ],
        primaryCtaLabel: "Demander un devis",
      },
      {
        slug: "projet-a-distance",
        selectorSummary: "Être accompagné même à distance",
        benefits: [
          "Accompagnement structuré à distance",
          "Même exigence qu'un suivi à domicile",
          "Une formule claire, où que vous soyez",
        ],
        primaryCtaLabel: "Demander un devis",
        homePrice: "À partir de 199 €",
      },
    ],
  },
  featuredProject: {
    eyebrow: "Projet phare",
    title: "Cuisine noire\n& chêne",
    location: "Île-de-France",
    
    cta: "Voir cette réalisation",
    meta: [
      { label: "Type", value: "Cuisine ouverte" },
      { label: "Mission", value: "Conception & transformation" },
      { label: "Ambiance", value: "Contemporaine contrastée" },
    ],
    phaseLabels: ["Esquisse", "Avant", "Projection 3D", "Résultat"] as const,
  },
  visu3d: {
    eyebrow: "CONCEPTION 3D",
    title: "Du rendu au réel",
    text: "La projection 3D permet de valider un projet qui se retrouve ensuite dans les volumes, les matières et l'ambiance réalisés.",
    toggleLabels: ["Projection 3D", "Projet réalisé"],
    toggleShortLabels: ["3D", "Réalisé"],
    captions: [
      "Projection 3D photoréaliste du projet avant travaux",
      "Le projet réalisé, fidèle à la vision validée en amont",
    ],
    proofs: [
      { label: "Volumes", title: "Mêmes équilibres" },
      { label: "Matières", title: "Mêmes accords" },
      { label: "Ambiance", title: "Même intention" },
    ],
    compareHint: "Comparez la projection au projet réalisé.",
    reassurance: "Une 3D pensée pour valider avant de lancer.",
    cta: "Découvrir la conception 3D",
    ctaHref: "/services/conception-3d/",
    distanceBand: {
      badge: "Nouveau",
      title: "Votre projet d'intérieur, où que vous soyez",
      description: "La même exigence qu'un accompagnement à domicile, sans contrainte géographique.",
      price: "À partir de 199 €",
      ctaLabel: "Découvrir la formule",
      ctaHref: "/services/projet-a-distance/",
    },
  },
  finalCta: {
    eyebrow: "Votre projet",
    title: "Donnons une direction claire à votre intérieur.",
    text: "Un premier échange suffit pour cadrer vos usages, vos priorités et le niveau d'accompagnement adapté.",
    reassurance: "Premier échange offert — sans engagement",
    ctaPrimary: "Parler de votre projet",
    ctaSecondary: "Découvrir les services",
  },
} as const;

