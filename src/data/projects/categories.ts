import type { ServiceLink } from "@/data/services-manifest";
import type { Project, ProjectCategory } from "./types";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Tous",
  "Séjour",
  "Salle de bain",
  "Chambre",
  "Cuisine",
  "Sur mesure",
];

export interface ProjectCategoryEditorialCard {
  title: string;
  items: readonly string[];
}

export interface ProjectCategoryFaqEntry {
  question: string;
  answer: string;
}

export interface ProjectCategoryProofHighlight {
  projectSlug: Project["slug"];
  label: string;
  title: string;
  description: string;
}

const PROJECT_CATEGORY_SHARED_SERVICES: readonly ServiceLink[] = [
  { label: "Conseil", href: "/services/conseil/" },
  { label: "Conception 3D", href: "/services/conception-3d/" },
  { label: "Projet complet", href: "/services/projet-complet/" },
] as const;

/**
 * Mapping URL slug → catégorie canonique.
 * Sert à exposer les pages /realisations/categorie/:slug indexables.
 * Ne contient PAS "Tous" (équivalent /realisations).
 */
export interface ProjectCategoryRoute {
  slug: string;
  category: Exclude<ProjectCategory, "Tous">;
  /** Titre éditorial pour <h1> + meta title (avec ciblage GEO). */
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogImagePath: string;
  ogImageAlt: string;
  /** Description introductive sous le hero. */
  heroDescription: string;
  introTitle: string;
  introParagraphs: readonly string[];
  editorialCards: readonly ProjectCategoryEditorialCard[];
  projectTypes: readonly string[];
  relatedServices: readonly ServiceLink[];
  proofHighlights: readonly ProjectCategoryProofHighlight[];
  faq: readonly ProjectCategoryFaqEntry[];
  updatedAt: string;
}

export const PROJECT_CATEGORY_ROUTES: readonly ProjectCategoryRoute[] = [
  {
    slug: "cuisines",
    category: "Cuisine",
    title: "Cuisines sur mesure",
    metaTitle: "Cuisines sur mesure — Réalisations Paris & Île-de-France | HFconcept",
    metaDescription:
      "Cuisines contemporaines conçues sur mesure par HFconcept : îlots, façades chêne ou laquées, faux-plafonds lumineux. Réalisations en Île-de-France.",
    ogImagePath: "/og/og-realisations.jpg",
    ogImageAlt: "Cuisines sur mesure HFconcept — Réalisations en Île-de-France",
    heroDescription:
      "Des cuisines pensées comme des pièces de vie : caractère, fonctionnalité et continuité visuelle.",
    introTitle: "Des cuisines sur mesure pensées comme de vraies pièces de vie.",
    introParagraphs: [
      "Chez HFconcept, une cuisine ne se résume pas à une implantation technique. Nous travaillons l'usage, les séquences de circulation, la lecture des volumes et la continuité avec les autres espaces pour obtenir une pièce à la fois fonctionnelle, lisible et durable.",
      "Les réalisations présentées ici montrent différentes réponses possibles : îlots, colonnes intégrées, façades bois ou laquées, faux-plafonds, éclairages et compositions sur mesure. L'enjeu reste toujours le même : concevoir une cuisine agréable à vivre au quotidien, pas seulement belle en photo.",
    ],
    editorialCards: [
      {
        title: "Ce que nous concevons",
        items: [
          "cuisines ouvertes ou semi-ouvertes",
          "îlots centraux et linéaires structurés",
          "colonnes et rangements intégrés",
          "compositions pensées avec les usages réels",
        ],
      },
      {
        title: "Contraintes que nous traitons",
        items: [
          "circulation entre cuisine et pièce de vie",
          "optimisation des linéaires et des angles",
          "équilibre entre rangements, plan de travail et respiration",
          "cohérence visuelle avec le reste de l'intérieur",
        ],
      },
      {
        title: "Ce que le sur-mesure apporte ici",
        items: [
          "une implantation plus juste",
          "des rangements mieux calibrés",
          "une lecture plus nette des volumes",
          "une cuisine pensée pour durer dans l'usage",
        ],
      },
    ],
    projectTypes: [
      "cuisine avec îlot",
      "cuisine ouverte sur séjour",
      "cuisine avec colonnes intégrées",
      "rénovation complète de cuisine",
      "cuisine au dessin contemporain",
    ],
    relatedServices: PROJECT_CATEGORY_SHARED_SERVICES,
    proofHighlights: [
      {
        projectSlug: "cuisine-faux-plafond-courbe",
        label: "Lecture du volume",
        title: "Une cuisine peut structurer la pièce sans l'alourdir",
        description:
          "Ce projet montre comment l'implantation et les lignes de mobilier peuvent clarifier la pièce de vie tout en gardant une lecture fluide de l'ensemble.",
      },
      {
        projectSlug: "cuisine-noire-chene-ilot",
        label: "Usage quotidien",
        title: "Le bon sur-mesure est celui qui sert vraiment l'usage",
        description:
          "Ici, le dessin de la cuisine permet surtout d'améliorer les rangements, les dégagements et le confort d'utilisation au quotidien.",
      },
      {
        projectSlug: "cuisine-bois-naturel-hexagones",
        label: "Cohérence d'ensemble",
        title: "La cuisine fonctionne mieux quand elle dialogue avec le reste",
        description:
          "Cette réalisation illustre l'importance des continuités de matière, de teinte et de rythme visuel avec les espaces voisins.",
      },
    ],
    faq: [
      {
        question: "Concevez-vous des cuisines ouvertes et semi-ouvertes ?",
        answer:
          "Oui. Nous travaillons aussi bien des cuisines ouvertes sur la pièce de vie que des compositions plus cadrées, selon la configuration du lieu, le mode de vie et le niveau d'intimité recherché.",
      },
      {
        question: "Le sur-mesure est-il utile dans une cuisine ?",
        answer:
          "Oui, lorsqu'il permet d'améliorer réellement l'implantation, les rangements, la circulation ou l'intégration visuelle. Il ne s'agit pas d'ajouter du sur-mesure partout, mais au bon endroit.",
      },
      {
        question: "La 3D permet-elle de valider les choix avant travaux ?",
        answer:
          "Oui. La conception 3D aide à valider les volumes, les alignements, les matières et l'équilibre général avant de lancer les arbitrages techniques ou les commandes.",
      },
    ],
    updatedAt: "2026-04-21",
  },
  {
    slug: "salles-de-bain",
    category: "Salle de bain",
    title: "Salles de bain sur mesure",
    metaTitle: "Salles de bain sur mesure — Réalisations Paris & Île-de-France | HFconcept",
    metaDescription:
      "Salles de bain contemporaines : douches italiennes, terrazzo, zellige, baignoires îlot. Réalisations HFconcept en Île-de-France.",
    ogImagePath: "/og/og-realisations.jpg",
    ogImageAlt: "Salles de bain sur mesure HFconcept — Réalisations en Île-de-France",
    heroDescription:
      "Des salles de bain qui conjuguent matière, lumière et précision d'exécution.",
    introTitle: "Des salles de bain sur mesure où matière, usage et précision d'exécution avancent ensemble.",
    introParagraphs: [
      "Une salle de bain réussie demande plus qu'un choix de revêtement ou de robinetterie. Nous travaillons l'implantation, les proportions, les circulations, la lumière et les usages quotidiens pour obtenir un espace cohérent, confortable et facile à vivre.",
      "Les projets présentés ici montrent des réponses variées : douches italiennes, baignoires îlot, rangements intégrés, compositions sous combles ou petits formats. Le but n'est jamais d'accumuler les effets, mais de faire tenir ensemble confort, lisibilité et caractère.",
    ],
    editorialCards: [
      {
        title: "Ce que nous concevons",
        items: [
          "salles de bain familiales ou parentales",
          "douches italiennes et baignoires intégrées ou îlot",
          "meubles vasques et rangements sur mesure",
          "compositions adaptées aux volumes atypiques",
        ],
      },
      {
        title: "Contraintes que nous traitons",
        items: [
          "petites surfaces ou volumes sous pente",
          "équilibre entre confort et circulation",
          "articulation entre technique et rendu final",
          "choix de matières adaptées à l'usage",
        ],
      },
      {
        title: "Ce que le sur-mesure apporte ici",
        items: [
          "un meilleur usage des volumes",
          "des rangements intégrés plus discrets",
          "une lecture plus apaisée de la pièce",
          "une réponse plus précise aux contraintes existantes",
        ],
      },
    ],
    projectTypes: [
      "douche italienne",
      "salle de bain sous combles",
      "salle de bain avec baignoire",
      "petite salle de bain optimisée",
      "salle de bain contemporaine sur mesure",
    ],
    relatedServices: PROJECT_CATEGORY_SHARED_SERVICES,
    proofHighlights: [
      {
        projectSlug: "sdb-turquoise-sous-combles",
        label: "Optimisation",
        title: "Même une petite salle de bain peut gagner en lisibilité",
        description:
          "Ce projet montre comment une implantation juste améliore à la fois la circulation, les usages et la sensation d'espace.",
      },
      {
        projectSlug: "salle-de-bain-signature",
        label: "Précision",
        title: "Le détail bien pensé change la perception de la pièce",
        description:
          "On retrouve ici un travail précis sur les volumes, les alignements et les éléments intégrés pour obtenir un rendu plus calme.",
      },
      {
        projectSlug: "sdb-terrazzo-bleu-baignoire-ilot",
        label: "Confort",
        title: "Le confort ne repose pas seulement sur les équipements",
        description:
          "Cette réalisation montre que la qualité d'usage vient aussi de la cohérence entre circulation, lumière, matière et rangement.",
      },
    ],
    faq: [
      {
        question: "Travaillez-vous les petites salles de bain ?",
        answer:
          "Oui. Les petites surfaces demandent souvent encore plus de précision dans l'implantation, les dégagements, les rangements et les choix de matériaux.",
      },
      {
        question: "Peut-on intégrer du sur-mesure dans une salle de bain ?",
        answer:
          "Oui, notamment pour les meubles vasques, les niches, les rangements ou l'adaptation à un volume atypique. Le sur-mesure permet de mieux exploiter l'espace sans l'alourdir.",
      },
      {
        question: "Intervenez-vous aussi sur la conception globale avant chantier ?",
        answer:
          "Oui. Selon la formule choisie, nous pouvons intervenir depuis le cadrage initial et la 3D jusqu'au projet complet avec préparation plus détaillée.",
      },
    ],
    updatedAt: "2026-04-21",
  },
  {
    slug: "sejours",
    category: "Séjour",
    title: "Séjours sur mesure",
    metaTitle: "Séjours & salons sur mesure — Réalisations Paris & Île-de-France | HFconcept",
    metaDescription:
      "Séjours contemporains conçus par HFconcept : bibliothèques intégrées, faux-plafonds, agencements ouverts. Réalisations en Île-de-France.",
    ogImagePath: "/og/og-realisations.jpg",
    ogImageAlt: "Séjours sur mesure HFconcept — Réalisations en Île-de-France",
    heroDescription:
      "Des séjours pensés pour la vie de tous les jours, avec exigence et caractère.",
    introTitle: "Des séjours sur mesure pensés pour réunir circulation, confort et présence visuelle.",
    introParagraphs: [
      "Le séjour concentre souvent plusieurs usages : recevoir, circuler, se poser, lire, travailler ponctuellement ou prolonger la cuisine. Notre rôle consiste à clarifier ces fonctions sans casser l'unité du lieu.",
      "Les réalisations présentées ici montrent des séjours structurés par les volumes, la matière, les lignes d'implantation et parfois par du mobilier intégré. L'objectif est de créer un espace vivant, équilibré et cohérent avec le rythme réel du quotidien.",
    ],
    editorialCards: [
      {
        title: "Ce que nous concevons",
        items: [
          "séjours ouverts et pièces de vie traversantes",
          "bibliothèques et compositions intégrées",
          "zones salon, repas ou lecture mieux hiérarchisées",
          "ambiances contemporaines lisibles et durables",
        ],
      },
      {
        title: "Contraintes que nous traitons",
        items: [
          "grandes pièces mal structurées",
          "manque de hiérarchie entre les usages",
          "besoin de rangements sans alourdir",
          "continuité visuelle avec cuisine ou entrée",
        ],
      },
      {
        title: "Ce que le sur-mesure apporte ici",
        items: [
          "une pièce mieux structurée",
          "des lignes plus nettes",
          "du rangement intégré sans surcharge",
          "une présence plus forte sans perdre en confort",
        ],
      },
    ],
    projectTypes: [
      "séjour ouvert",
      "salon avec bibliothèque intégrée",
      "pièce de vie à restructurer",
      "séjour contemporain",
      "séjour avec mobilier sur mesure",
    ],
    relatedServices: PROJECT_CATEGORY_SHARED_SERVICES,
    proofHighlights: [
      {
        projectSlug: "sejour-veranda-contemporain",
        label: "Structure",
        title: "Un séjour réussit quand les usages sont mieux hiérarchisés",
        description:
          "Ce projet permet de voir comment la pièce de vie gagne en clarté lorsque salon, repas et circulation trouvent un meilleur équilibre.",
      },
      {
        projectSlug: "sejour-bibliotheque-cheminee",
        label: "Intégration",
        title: "Le sur-mesure peut structurer sans surcharger",
        description:
          "Ici, les éléments intégrés renforcent la lecture de l'espace tout en conservant une atmosphère ouverte et fluide.",
      },
      {
        projectSlug: "sejour-kaki-contemporain",
        label: "Continuité",
        title: "Une pièce de vie convaincante repose sur l'ensemble, pas sur un seul effet",
        description:
          "Cette réalisation montre le rôle des continuités visuelles entre volumes, matériaux et fonctions du quotidien.",
      },
    ],
    faq: [
      {
        question: "Pouvez-vous restructurer un séjour sans tout refaire ?",
        answer:
          "Oui. Selon le projet, un meilleur agencement, un travail sur les lignes de mobilier, la lumière ou le sur-mesure peuvent déjà transformer fortement la lecture de la pièce.",
      },
      {
        question: "Travaillez-vous les bibliothèques et compositions intégrées ?",
        answer:
          "Oui. Lorsque cela améliore réellement l'usage ou la cohérence visuelle, nous intégrons des bibliothèques, niches, habillages ou meubles dessinés pour le lieu.",
      },
      {
        question: "Le séjour peut-il être conçu en lien avec la cuisine ou l'entrée ?",
        answer:
          "Oui. Nous cherchons précisément cette continuité, afin que les pièces se répondent sans rupture inutile de matériaux, de rythme ou de lecture des volumes.",
      },
    ],
    updatedAt: "2026-04-21",
  },
  {
    slug: "chambres",
    category: "Chambre",
    title: "Chambres sur mesure",
    metaTitle: "Chambres sur mesure — Réalisations Paris & Île-de-France | HFconcept",
    metaDescription:
      "Chambres conçues sur mesure : têtes de lit architecturées, dressings intégrés, optimisation des combles. Réalisations HFconcept en Île-de-France.",
    ogImagePath: "/og/og-realisations.jpg",
    ogImageAlt: "Chambres sur mesure HFconcept — Réalisations en Île-de-France",
    heroDescription:
      "Des chambres calibrées pour le repos, avec rangements intégrés et atmosphères justes.",
    introTitle: "Des chambres sur mesure conçues pour le repos, le rangement et la justesse de l'atmosphère.",
    introParagraphs: [
      "Une chambre réussie doit être calme, lisible et réellement adaptée à ses usages. Nous travaillons l'implantation, les rangements, la circulation et les matières pour obtenir un espace apaisé, sans perte de place ni surcharge visuelle.",
      "Les projets présentés ici couvrent plusieurs cas : chambres parentales, chambres d'adolescents, volumes sous combles, têtes de lit architecturées, bureaux intégrés ou dressings discrets. Le fil conducteur reste le même : faire simple, juste et durable.",
    ],
    editorialCards: [
      {
        title: "Ce que nous concevons",
        items: [
          "chambres parentales ou adolescentes",
          "têtes de lit et rangements intégrés",
          "chambres sous combles ou volumes contraints",
          "espaces nuit avec bureau ou dressing discret",
        ],
      },
      {
        title: "Contraintes que nous traitons",
        items: [
          "manque de rangement",
          "circulation serrée autour du lit",
          "sous-pentes et volumes irréguliers",
          "besoin d'une atmosphère plus apaisée",
        ],
      },
      {
        title: "Ce que le sur-mesure apporte ici",
        items: [
          "un meilleur usage de chaque mètre carré",
          "des rangements plus intégrés",
          "une chambre plus calme visuellement",
          "un équilibre plus juste entre fonction et ambiance",
        ],
      },
    ],
    projectTypes: [
      "chambre parentale",
      "chambre adolescent",
      "chambre sous combles",
      "chambre avec dressing intégré",
      "chambre avec bureau sur mesure",
    ],
    relatedServices: PROJECT_CATEGORY_SHARED_SERVICES,
    proofHighlights: [
      {
        projectSlug: "chambre-sur-mesure-combles",
        label: "Calme",
        title: "Une chambre se lit d'abord par sa sensation d'équilibre",
        description:
          "Ce projet met en évidence l'importance d'une implantation apaisée et d'une présence visuelle maîtrisée.",
      },
      {
        projectSlug: "chambre-ado-bureau-integre",
        label: "Rangement",
        title: "Le rangement est réussi lorsqu'il disparaît dans l'ensemble",
        description:
          "Cette réalisation illustre une intégration plus discrète des fonctions utiles, sans alourdir l'atmosphère de la chambre.",
      },
    ],
    faq: [
      {
        question: "Concevez-vous des chambres sous combles ?",
        answer:
          "Oui. Les chambres sous pente demandent une lecture très précise des hauteurs utiles, des dégagements et des rangements. Le sur-mesure y est souvent particulièrement pertinent.",
      },
      {
        question: "Peut-on intégrer un bureau ou un dressing sans alourdir la pièce ?",
        answer:
          "Oui. Tout l'enjeu est de dessiner un ensemble lisible, bien proportionné et cohérent avec la chambre, plutôt qu'une addition d'éléments indépendants.",
      },
      {
        question: "Travaillez-vous aussi l'ambiance générale de la chambre ?",
        answer:
          "Oui. Nous travaillons autant l'implantation que la sensation finale : matière, teintes, rythme visuel et perception du calme dans la pièce.",
      },
    ],
    updatedAt: "2026-04-21",
  },
  {
    slug: "sur-mesure",
    category: "Sur mesure",
    title: "Aménagements sur mesure",
    metaTitle: "Aménagements sur mesure — Réalisations Paris & Île-de-France | HFconcept",
    metaDescription:
      "Bibliothèques, dressings, escaliers, claustras : aménagements sur mesure conçus par HFconcept en Île-de-France.",
    ogImagePath: "/og/og-realisations.jpg",
    ogImageAlt: "Aménagements sur mesure HFconcept — Réalisations en Île-de-France",
    heroDescription:
      "Mobilier intégré, escaliers habillés, claustras : chaque pièce est dessinée pour son lieu.",
    introTitle: "Des aménagements sur mesure conçus pour prolonger le lieu, pas pour se superposer à lui.",
    introParagraphs: [
      "Le sur-mesure prend tout son sens lorsqu'il répond à une contrainte réelle ou lorsqu'il améliore nettement la lecture d'un espace. Bibliothèques, dressings, claustras, escaliers, niches ou habillages : chaque élément doit s'inscrire avec justesse dans l'architecture existante.",
      "Les réalisations présentées ici montrent des pièces dessinées pour leur lieu précis. Le but n'est pas de produire un effet démonstratif, mais de créer des éléments intégrés, utiles et cohérents, capables d'apporter du rangement, du rythme ou une meilleure transition entre les espaces.",
    ],
    editorialCards: [
      {
        title: "Ce que nous concevons",
        items: [
          "bibliothèques et rangements intégrés",
          "dressings et niches sur mesure",
          "claustras, habillages et séparations",
          "escaliers et éléments dessinés pour le lieu",
        ],
      },
      {
        title: "Contraintes que nous traitons",
        items: [
          "angles perdus ou volumes atypiques",
          "besoin de rangement discret",
          "manque de structure visuelle dans une pièce",
          "nécessité d'intégrer sans alourdir",
        ],
      },
      {
        title: "Ce que le sur-mesure apporte ici",
        items: [
          "une réponse exacte au lieu",
          "une intégration plus naturelle",
          "un gain d'usage réel",
  "un résultat plus cohérent et plus durable",
        ],
      },
    ],
    projectTypes: [
      "bibliothèque intégrée",
      "dressing sur mesure",
      "claustra et séparation",
      "habillage d'escalier",
      "mobilier dessiné pour le lieu",
    ],
    relatedServices: PROJECT_CATEGORY_SHARED_SERVICES,
    proofHighlights: [
      {
        projectSlug: "bibliotheque-vitrine-retro-eclairee",
        label: "Intégration",
        title: "Le sur-mesure est fort lorsqu'il prolonge l'architecture",
        description:
          "Ce projet montre comment un élément dessiné pour le lieu peut sembler naturel, utile et durable plutôt qu'ajouté après coup.",
      },
      {
        projectSlug: "couloir-dressing-portes-coulissantes",
        label: "Usage",
        title: "Un aménagement sur mesure doit d'abord résoudre quelque chose",
        description:
          "Cette réalisation illustre un usage concret du sur-mesure : mieux ranger, mieux structurer, mieux relier les espaces.",
      },
      {
        projectSlug: "escalier-habille-bois-eclairage-integre",
        label: "Présence",
        title: "Le bon dessin apporte du caractère sans effet démonstratif",
        description:
          "Ici, le sur-mesure donne une vraie présence au lieu tout en restant cohérent avec son architecture intérieure.",
      },
    ],
    faq: [
      {
        question: "Le sur-mesure est-il réservé aux grands projets ?",
        answer:
          "Non. Il peut être pertinent à petite échelle, dès lors qu'il répond à une contrainte précise ou qu'il améliore nettement l'usage et la cohérence du lieu.",
      },
      {
        question: "Quels types d'aménagements sur mesure concevez-vous ?",
        answer:
          "Nous concevons notamment des bibliothèques, dressings, niches, claustras, habillages et autres éléments intégrés pensés pour un lieu donné.",
      },
      {
        question: "Le sur-mesure peut-il s'intégrer à un projet déjà existant ?",
        answer:
          "Oui. Selon les cas, il peut compléter un aménagement déjà en place ou s'inscrire dans une réflexion plus globale sur la pièce et ses usages.",
      },
    ],
    updatedAt: "2026-04-21",
  },
] as const;

export function getCategoryRouteBySlug(slug: string): ProjectCategoryRoute | undefined {
  return PROJECT_CATEGORY_ROUTES.find((route) => route.slug === slug);
}

