import heroStudioImg from "@/assets/images/hero/hero-studio.webp";
import heroServicesImg from "@/assets/images/hero/hero-services.webp";
import heroContactImg from "@/assets/images/hero/hero-contact.webp";

export const STUDIO_CONTENT = {
  seo: {
    title: "Le Studio — HFconcept",
    description:
      "Découvrez l'approche, les principes et la méthode du studio HFconcept. Architecture intérieure sur mesure, conception exigeante et accompagnement attentif.",
  },

  hero: {
    eyebrow: "Le studio",
    title: "Une méthode claire, \nun regard juste",
    text: "Une approche sensible, rigoureuse et sur-mesure.",
    ctaPrimary: "Parler de votre projet",
    ctaPrimaryHref: "/contact/",
    ctaSecondary: "Découvrir les services",
    ctaSecondaryHref: "/services/",
    proofs: [
      { value: "15+", label: "ans d'expérience" },
      { value: "100%", label: "sur mesure" },
      { value: "3D", label: "projection réaliste" },
    ],
  },

  aboutUs: {
    eyebrow: "Qui sommes-nous",
    title: "Une approche rigoureuse,\nsensible et structurée",
    description: [
      "HFconcept est un studio d'architecture intérieure fondé sur une conviction : un intérieur réussi naît d'une écoute attentive, d'une lecture juste du lieu et d'une conception sans compromis. Chaque projet est abordé comme une pièce unique, avec la rigueur d'un processus éprouvé et la sensibilité d'un regard sur mesure.",
      "Le studio accompagne ses clients du premier échange jusqu'à la livraison, en posant un cadre clair à chaque étape. Plans, vues 3D, palette matériaux : tout est validé ensemble avant d'engager les travaux. Cette méthode garantit des décisions sereines et un résultat fidèle à la vision partagée.",
    ],
    facts: [
      { value: "15+", label: "ans d'expérience en conception intérieure" },
      { value: "100%", label: "sur mesure — chaque projet est unique" },
      { value: "A → Z", label: "suivi complet du cadrage à la livraison" },
    ],
    manifesto: {
      lead: "Concevoir un intérieur ne consiste pas à ajouter, mais à décider plus juste.",
      tagline: "Le studio HFconcept",
    },
    imageAlt: "Le studio HFconcept — espace de travail et conception",
  },

  principlesSection: {
    eyebrow: "Nos principes",
    title: "Trois exigences, une même ligne de conduite",
    items: [
      {
        number: "01",
        title: "Lire le lieu avec justesse",
        text: "Avant toute conception, le studio observe les volumes, la lumière, les usages et les contraintes. Comprendre un lieu, c'est déjà commencer à le transformer avec intelligence.",
        imageSrc: heroStudioImg,
        imageAlt: "Séjour avec profondeur et lumière naturelle — lecture du lieu par HFconcept",
        layout: "image-left" as const,
      },
      {
        number: "02",
        title: "Projeter clairement avant d'engager les travaux",
        text: "Plans, agencements, matières et vues 3D permettent de valider les choix en amont. Le projet se précise avant le chantier, pour décider avec sérénité.",
        imageSrc: heroServicesImg,
        imageAlt: "Cuisine contemporaine projetée en 3D — anticipation et conception HFconcept",
        layout: "image-right" as const,
      },
      {
        number: "03",
        title: "Conduire le projet jusqu'au dernier détail",
        text: "Coordination, qualité d'exécution, alignements, finitions : le studio reste présent jusqu'à la livraison pour préserver la cohérence de l'ensemble.",
        imageSrc: heroContactImg,
        imageAlt: "Détail de finition salle de bain haut de gamme — exécution maîtrisée HFconcept",
        layout: "image-left" as const,
      },
    ],
  },

  methodSection: {
    eyebrow: "LA MÉTHODE",
    title: "Un projet cadré,\nconduit jusqu'au bout",
    intro: "Chaque étape donne un cadre clair aux choix, pour faire avancer le projet avec cohérence et maîtrise.",
    steps: [
      {
        number: "01",
        title: "Échange & diagnostic",
        description:
          "Comprendre le lieu, les usages et les contraintes avant toute orientation.",
      },
      {
        number: "02",
        title: "Conception & projection",
        description:
          "Plans, vues 3D et palette matériaux pour arbitrer avant travaux.",
      },
      {
        number: "03",
        title: "Validation & cadrage",
        description:
          "Valider les choix, le budget et le planning avant lancement.",
      },
      {
        number: "04",
        title: "Réalisation & livraison",
        description:
          "Coordonner l'exécution pour tenir la cohérence jusqu'au détail final.",
      },
    ],
  },

  statement: {
    quote:
      "Un intérieur réussi, c'est un lieu où l'on se sent chez soi dès le premier instant — parce que chaque détail a été pensé pour cela.",
    author: "HFconcept",
  },

  finalCta: {
    eyebrow: "Passons au vôtre",
    title: "Donnons forme à un intérieur juste, cohérent et pensé pour durer.",
    text: "Après la découverte du studio, échangeons sur votre lieu, vos usages et la manière la plus pertinente de vous accompagner.",
    reassurance: "Premier échange offert — accompagnement sur mesure",
    ctaPrimary: "Parler de votre projet",
    ctaSecondary: "Découvrir les services",
  },
} as const;

