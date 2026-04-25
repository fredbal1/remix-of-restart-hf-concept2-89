/**
 * Zones d'intervention — pages locales SEO/GEO indexables.
 *
 * Source unique pour les routes /zones-intervention/:slug.
 * Utilisée par :
 *  - src/pages/ZoneIntervention.tsx (rendu)
 *  - src/lib/seo/route-manifest.ts   (SEO + sitemap + prerender)
 */

export interface ZoneInterventionContent {
  slug: string;
  /** Nom court (ex: "Paris", "Essonne") — utilisé dans titles, breadcrumbs, NAP. */
  name: string;
  /** Formulation locative dédiée aux CTA (ex: "à Paris", "en Essonne"). */
  ctaLocative: string;
  /** Type schema.org pour areaServed. */
  type: "City" | "AdministrativeArea";
  /** Code postal principal ou fourchette (ex: "75", "91"). */
  postalCodePrefix: string;
  /** Région administrative parente. */
  region: string;
  /** Titre éditorial du hero (utilisé dans <h1>). */
  heroTitle: string;
  /** Eyebrow au-dessus du H1. */
  heroEyebrow: string;
  /** Introduction sous le H1. */
  heroDescription: string;
  /** Title meta SEO complet (avec | HFconcept). */
  metaTitle: string;
  /** Description meta SEO. */
  metaDescription: string;
  /** OG image (réutilise les assets existants). */
  ogImagePath: string;
  ogImageAlt: string;
  /** Date pour <lastmod> sitemap (YYYY-MM-DD). */
  updatedAt: string;
  /** Paragraphes éditoriaux affichés dans le corps (chaque entrée = un <p>). */
  intro: string[];
  /** Bloc "Notre approche" — points spécifiques au territoire. */
  approche: { title: string; text: string }[];
  /** Réalisations du portfolio pertinentes pour les usages locaux les plus fréquents. */
  featuredProjects: { slug: string; label: string; reason: string }[];
  /** Services les plus adaptés au type de projet fréquemment rencontré sur cette zone. */
  relatedServices: { label: string; href: string; reason: string }[];
  /** Typologies de projets récurrentes sur la zone. */
  frequentProjectTypes: string[];
  /** Étapes de travail montrant comment le projet se déroule localement. */
  localProcess: { title: string; text: string }[];
  /** FAQ visible et source unique du JSON-LD FAQ. */
  faq: { question: string; answer: string }[];
  /** Liste de villes / quartiers desservis (chips, NAP local). */
  villesDesservies: string[];
  /** Note finale (logistique, déplacement, suivi à distance). */
  logistique: string;
}

export const ZONES_INTERVENTION: readonly ZoneInterventionContent[] = [
  {
    slug: "paris",
    name: "Paris",
    ctaLocative: "à Paris",
    type: "City",
    postalCodePrefix: "75",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur à Paris",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Conception sur mesure, visualisation 3D et accompagnement de projet pour appartements haussmanniens, lofts et maisons de ville parisiennes.",
    metaTitle: "Architecte d'intérieur à Paris | HFconcept",
    metaDescription:
      "HFconcept, architecte d'intérieur à Paris : projet d'architecture intérieure, rénovation, agencement sur mesure et visualisation 3D.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur à Paris — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept accompagne les projets d'architecture intérieure à Paris intra-muros : rénovation complète d'appartements haussmanniens, optimisation de petites surfaces, transformation de lofts et maisons de ville. Chaque intervention démarre par une lecture précise du lieu — orientation, hauteur sous plafond, moulures à préserver, contraintes de copropriété.",
      "Notre approche reste identique d'un arrondissement à l'autre : un parti pris architectural fort, des matériaux choisis avec soin, et une exécution confiée à des artisans sélectionnés. Les visualisations 3D photoréalistes permettent de valider chaque décision avant les travaux, ce qui évite les arbitrages tardifs et sécurise le budget.",
    ],
    approche: [
      {
        title: "Lecture du bâti haussmannien",
        text: "Conservation et mise en valeur des éléments d'origine (parquet point de Hongrie, moulures, cheminées), intégrées à un projet contemporain assumé.",
      },
      {
        title: "Optimisation des petites surfaces",
        text: "Rangements intégrés, cloisons modulables, circulations repensées pour gagner en confort sur des m² parisiens chers.",
      },
      {
        title: "Coordination en copropriété",
        text: "Respect des règlements, dossiers techniques pour syndic, gestion des nuisances et planning aligné sur les contraintes d'immeuble.",
      },
      {
        title: "Conception 3D pour valider à distance",
        text: "Pour les propriétaires non résidents ou les projets pré-acquisition, les rendus 3D photoréalistes permettent de décider sereinement à distance.",
      },
    ],
    featuredProjects: [
      {
        slug: "cuisine-faux-plafond-courbe",
        label: "Cuisine ouverte cadrée",
        reason: "Montre comment ouvrir la pièce de vie sans perdre de lisibilité ni de rangements.",
      },
      {
        slug: "sdb-grise-miroir-led",
        label: "Salle de bain compacte",
        reason: "Exemple utile pour gagner en confort dans un volume serré avec une écriture nette.",
      },
      {
        slug: "couloir-dressing-portes-coulissantes",
        label: "Circulation optimisée",
        reason: "Pertinent pour transformer un couloir parisien en rangement discret sans alourdir le passage.",
      },
    ],
    relatedServices: [
      {
        label: "Conception 3D (à domicile)",
        href: "/services/conception-3d/",
        reason: "Pour comparer plusieurs plans avant de valider une ouverture ou une redistribution.",
      },
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Adapté aux rénovations avec copropriété, artisans multiples et suivi serré.",
      },
    ],
    frequentProjectTypes: [
      "ouverture cuisine sur séjour",
      "salle de bain compacte",
      "rangements intégrés dans l'entrée ou le couloir",
      "reconfiguration d'appartement ancien",
      "optimisation de petite surface",
    ],
    localProcess: [
      {
        title: "Lecture du plan et des contraintes d'immeuble",
        text: "Nous cadrons dès le départ les murs porteurs, réseaux, gaines techniques et règles de copropriété pour éviter les fausses pistes.",
      },
      {
        title: "Scénarios précis sur plan et en 3D",
        text: "Plusieurs options sont comparées pour arbitrer l'ouverture de la cuisine, la salle de bain ou les rangements avant le moindre engagement travaux.",
      },
      {
        title: "Préparation copropriété et logistique chantier",
        text: "Planning, informations au syndic, accès, nuisances et séquences d'intervention sont anticipés avant le lancement.",
      },
      {
        title: "Suivi d'exécution en site souvent occupé",
        text: "Le chantier avance avec des points de validation resserrés pour tenir la qualité d'usage et de finition dans un contexte urbain dense.",
      },
    ],
    faq: [
      {
        question: "Travaillez-vous sur des appartements de petite surface à Paris ?",
        answer:
          "Oui. Une part importante des demandes parisiennes porte sur des surfaces compactes : studios, deux-pièces, salles de bain réduites ou plans anciens à remettre en cohérence. Le projet vise alors à clarifier les usages sans surcharger l'espace.",
      },
      {
        question: "Pouvez-vous ouvrir une cuisine dans un appartement ancien à Paris ?",
        answer:
          "Oui, lorsque la structure et le contexte technique le permettent. La faisabilité est cadrée dès le début avec le relevé du lieu, les contraintes d'immeuble et, si nécessaire, les validations techniques adaptées au projet.",
      },
      {
        question: "Comment gérez-vous les contraintes de copropriété sur un projet parisien ?",
        answer:
          "Les points sensibles sont intégrés très tôt : horaires, accès, nuisances, informations au syndic et documents nécessaires. Cela permet d'éviter les retards liés à des arbitrages pris trop tard.",
      },
      {
        question: "Intervenez-vous aussi sur la salle de bain et les rangements sur mesure à Paris ?",
        answer:
          "Oui. Les projets parisiens portent souvent sur la combinaison cuisine, salle de bain, entrée et rangements intégrés. Ces éléments sont pensés ensemble pour améliorer réellement le quotidien.",
      },
    ],
    villesDesservies: [
      "Paris 1er",
      "Paris 2e",
      "Paris 3e",
      "Paris 4e",
      "Paris 5e",
      "Paris 6e",
      "Paris 7e",
      "Paris 8e",
      "Paris 9e",
      "Paris 10e",
      "Paris 11e",
      "Paris 12e",
      "Paris 13e",
      "Paris 14e",
      "Paris 15e",
      "Paris 16e",
      "Paris 17e",
      "Paris 18e",
      "Paris 19e",
      "Paris 20e",
    ],
    logistique:
      "Premier rendez-vous sur site offert dans Paris intra-muros. Pour les projets internationaux ou hors d'Île-de-France, l'intégralité du suivi peut être conduite à distance.",
  },
  {
    slug: "hauts-de-seine",
    name: "Hauts-de-Seine",
    ctaLocative: "dans les Hauts-de-Seine",
    type: "AdministrativeArea",
    postalCodePrefix: "92",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur dans les Hauts-de-Seine (92)",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Conception sur mesure pour appartements contemporains, maisons de ville et hôtels particuliers de l'ouest parisien : Boulogne, Neuilly, Levallois, Issy.",
    metaTitle: "Architecte d'intérieur Hauts-de-Seine | HFconcept",
    metaDescription:
      "HFconcept intervient dans le 92 pour vos projets d'architecture intérieure : rénovation, aménagement sur mesure, 3D et suivi de projet.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur dans les Hauts-de-Seine — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept accompagne les projets d'architecture intérieure dans tout le département des Hauts-de-Seine, de Boulogne-Billancourt à Courbevoie en passant par Neuilly-sur-Seine et Levallois-Perret. Appartements familiaux, hôtels particuliers, maisons de ville, lofts dans les anciennes friches industrielles : chaque typologie est traitée avec un parti pris architectural fort et une exécution maîtrisée.",
      "L'ouest parisien impose un niveau d'exigence élevé sur la finition et les matières. Notre rôle est de poser une direction claire dès la phase conception, validée en 3D photoréaliste, puis de coordonner les artisans pour garantir la qualité d'exécution attendue. Cette méthode sécurise budget et planning sur des projets souvent denses.",
    ],
    approche: [
      {
        title: "Appartements haut de gamme",
        text: "Réagencement complet, suites parentales, cuisines ouvertes sur séjour, dressings sur mesure — typologies récurrentes traitées avec une exécution impeccable.",
      },
      {
        title: "Hôtels particuliers & maisons de ville",
        text: "Lecture du bâti existant (XIXe, années 30, contemporain), conservation des éléments forts et insertion d'un projet contemporain assumé.",
      },
      {
        title: "Coordination en copropriété",
        text: "Dossiers techniques pour syndic, respect des règlements d'immeuble, gestion fine des nuisances et planning aligné sur les contraintes locales.",
      },
      {
        title: "Validation 3D avant travaux",
        text: "Rendus photoréalistes pour comparer plusieurs partis pris, valider les matières et sécuriser chaque arbitrage avant l'engagement des coûts.",
      },
    ],
    featuredProjects: [
      {
        slug: "cuisine-marbre-blanc-suspensions",
        label: "Cuisine familiale soignée",
        reason: "Pertinent pour des pièces de vie où la finition et la lisibilité des matières priment.",
      },
      {
        slug: "bibliotheque-vitrine-retro-eclairee",
        label: "Menuiserie intégrée",
        reason: "Illustre un niveau de rangement sur mesure recherché dans les séjours familiaux exigeants.",
      },
      {
        slug: "dressing-sous-combles",
        label: "Suite parentale structurée",
        reason: "Utile pour penser dressing et rangement discret dans une chambre ou un dernier niveau.",
      },
    ],
    relatedServices: [
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Pour coordonner finitions, menuiseries et chantier sans dilution du niveau d'exigence.",
      },
      {
        label: "Conseil",
        href: "/services/conseil/",
        reason: "Utile pour trancher tôt sur le bon niveau d'ouverture, de rangement et de matières.",
      },
    ],
    frequentProjectTypes: [
      "appartement familial à réagencer",
      "suite parentale avec dressing",
      "bibliothèque ou mobilier intégré",
      "cuisine ouverte haut de gamme",
      "maison de ville à fluidifier",
    ],
    localProcess: [
      {
        title: "Cadrage des usages familiaux",
        text: "Le projet démarre par une hiérarchie claire entre réception, quotidien, rangements et espaces plus intimes comme la suite parentale.",
      },
      {
        title: "Validation fine des matières et finitions",
        text: "Bois, pierre, métal, teintes et détails de menuiserie sont arbitrés tôt pour éviter les compromis tardifs sur la qualité perçue.",
      },
      {
        title: "Développement des éléments sur mesure",
        text: "Dressings, bibliothèques, cuisines et meubles intégrés sont dessinés comme une part centrale du projet, pas comme un ajout de fin de parcours.",
      },
      {
        title: "Coordination chantier au niveau d'exigence attendu",
        text: "Le suivi d'exécution reste resserré pour maintenir l'alignement entre conception, fabrication et finition finale.",
      },
    ],
    faq: [
      {
        question: "Pouvez-vous réagencer un appartement familial dans les Hauts-de-Seine sans tout refaire ?",
        answer:
          "Oui. Selon le besoin, le projet peut cibler d'abord les points structurants : circulation, cuisine, suite parentale, rangements ou pièce de vie. L'objectif est de concentrer l'effort là où il change réellement l'usage.",
      },
      {
        question: "Concevez-vous des rangements intégrés sur mesure dans le 92 ?",
        answer:
          "Oui. Bibliothèques, dressings, meubles d'entrée, colonnes de cuisine ou menuiseries de séjour font souvent partie des demandes les plus fréquentes dans le département.",
      },
      {
        question: "Intervenez-vous aussi sur des maisons de ville dans les Hauts-de-Seine ?",
        answer:
          "Oui. Le studio accompagne aussi bien les appartements en copropriété que les maisons de ville et les hôtels particuliers, avec une méthode adaptée à chaque typologie.",
      },
      {
        question: "Le niveau de finition est-il défini avant le chantier ?",
        answer:
          "Oui. Les arbitrages sur les matières, les lignes de menuiserie, l'éclairage et les détails de pose sont cadrés en conception afin de sécuriser l'exécution.",
      },
    ],
    villesDesservies: [
      "Boulogne-Billancourt",
      "Neuilly-sur-Seine",
      "Levallois-Perret",
      "Issy-les-Moulineaux",
      "Courbevoie",
      "Puteaux",
      "Nanterre",
      "Rueil-Malmaison",
      "Suresnes",
      "Saint-Cloud",
      "Sèvres",
      "Meudon",
      "Clamart",
      "Châtillon",
      "Antony",
      "Sceaux",
      "Asnières-sur-Seine",
      "Clichy",
    ],
    logistique:
      "Studio basé à Corbeil-Essonnes, déplacements réguliers dans tout le 92. Premier rendez-vous sur site offert dans le département.",
  },
  {
    slug: "yvelines",
    name: "Yvelines",
    ctaLocative: "dans les Yvelines",
    type: "AdministrativeArea",
    postalCodePrefix: "78",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur dans les Yvelines (78)",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Conception sur mesure pour maisons familiales, propriétés et appartements de l'ouest francilien : Versailles, Saint-Germain-en-Laye, Le Vésinet, Saint-Cyr.",
    metaTitle: "Architecte d'intérieur Yvelines | HFconcept",
    metaDescription:
      "HFconcept accompagne vos projets d'architecture intérieure dans les Yvelines : maisons, appartements, rénovation et conception sur mesure.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur dans les Yvelines — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept accompagne les projets d'architecture intérieure dans tout le département des Yvelines : maisons familiales à Versailles, propriétés du Vésinet ou de Maisons-Laffitte, appartements à Saint-Germain-en-Laye, rénovations dans le pavillonnaire de l'ouest francilien. Chaque projet démarre par une lecture précise du lieu et se construit autour d'une direction claire.",
      "Notre méthode reste constante d'un projet à l'autre : conception 3D photoréaliste pour valider chaque décision avant travaux, sélection rigoureuse des matières et coordination des artisans pour une exécution maîtrisée. Cette approche est particulièrement adaptée aux projets de rénovation lourde fréquents dans le département.",
    ],
    approche: [
      {
        title: "Maisons familiales & propriétés",
        text: "Réagencement complet, ouverture sur jardin, création de suites parentales, optimisation des combles — typologies fréquentes dans le 78.",
      },
      {
        title: "Patrimoine & bâti ancien",
        text: "Maisons de maître, demeures versaillaises, propriétés bourgeoises : conservation des éléments forts et insertion d'une écriture contemporaine.",
      },
      {
        title: "Conception 3D photoréaliste",
        text: "Plans, perspectives, palette matériaux : tout est validé en amont. Idéal pour les propriétaires souvent absents en semaine ou pour les projets pré-acquisition.",
      },
      {
        title: "Suivi à distance possible",
        text: "Pour les déplacements professionnels ou les acheteurs non-résidents, l'intégralité du projet peut être conduite à distance, avec des rendez-vous ponctuels sur site.",
      },
    ],
    featuredProjects: [
      {
        slug: "sejour-veranda-contemporain",
        label: "Ouverture sur le jardin",
        reason: "Exemple pertinent pour reconnecter séjour, cuisine et extérieurs dans une maison familiale.",
      },
      {
        slug: "chambre-sur-mesure-combles",
        label: "Combles valorisés",
        reason: "Montre comment transformer une pente en vraie pièce utile plutôt qu'en surface perdue.",
      },
      {
        slug: "escalier-habille-bois-eclairage-integre",
        label: "Circulation repensée",
        reason: "Intéressant quand le projet passe par un réagencement plus ample entre plusieurs niveaux.",
      },
    ],
    relatedServices: [
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Le bon format pour redistribuer une maison sur plusieurs pièces ou plusieurs niveaux.",
      },
      {
        label: "Projet à distance",
        href: "/services/projet-a-distance/",
        reason: "Pratique pour avancer entre deux visites de site sur des agendas familiaux chargés.",
      },
    ],
    frequentProjectTypes: [
      "ouverture séjour-jardin",
      "combles transformés en pièce à vivre",
      "maison familiale à redistribuer",
      "escalier et circulation entre niveaux",
      "suite parentale sous toiture",
    ],
    localProcess: [
      {
        title: "Lecture de la maison dans son ensemble",
        text: "Le relevé s'intéresse autant aux volumes intérieurs qu'aux liens avec le jardin, aux niveaux et aux pièces à fort potentiel.",
      },
      {
        title: "Scénarios volumétriques et 3D",
        text: "Les décisions d'ouverture, d'extension d'usage ou d'aménagement sous pente sont comparées avant d'arrêter une direction.",
      },
      {
        title: "Arbitrages par zones et par phases",
        text: "Sur les maisons les plus amples, le projet est hiérarchisé pour distinguer ce qui doit être traité d'un seul tenant de ce qui peut être séquencé.",
      },
      {
        title: "Suivi mêlant terrain et validations à distance",
        text: "Les rendez-vous sur site sont concentrés aux moments clés, le reste avançant de façon fluide grâce aux supports de conception partagés.",
      },
    ],
    faq: [
      {
        question: "Intervenez-vous sur des maisons familiales dans les Yvelines ?",
        answer:
          "Oui. Le 78 concentre de nombreuses demandes liées à la maison familiale : pièce de vie à ouvrir, combles à exploiter, circulation à simplifier ou suite parentale à créer.",
      },
      {
        question: "Pouvez-vous intégrer les combles et le rez-de-chaussée dans une même réflexion ?",
        answer:
          "Oui. Lorsqu'un projet concerne plusieurs niveaux, ils sont pensés ensemble pour éviter une rénovation fragmentée qui manque ensuite de cohérence.",
      },
      {
        question: "Travaillez-vous à distance entre les rendez-vous sur site dans les Yvelines ?",
        answer:
          "Oui. Les échanges intermédiaires peuvent être menés en visioconférence, avec plans, rendus et arbitrages partagés à distance, puis validés sur site aux moments utiles.",
      },
    ],
    villesDesservies: [
      "Versailles",
      "Saint-Germain-en-Laye",
      "Le Vésinet",
      "Maisons-Laffitte",
      "Le Chesnay",
      "Vélizy-Villacoublay",
      "Saint-Cyr-l'École",
      "Viroflay",
      "Chatou",
      "Croissy-sur-Seine",
      "Marly-le-Roi",
      "Poissy",
      "Saint-Quentin-en-Yvelines",
      "Montigny-le-Bretonneux",
      "Guyancourt",
      "Houilles",
      "Sartrouville",
      "Rambouillet",
    ],
    logistique:
      "Studio basé à Corbeil-Essonnes, déplacements réguliers dans tout le 78. Premier rendez-vous sur site offert dans le département.",
  },
  {
    slug: "essonne",
    name: "Essonne",
    ctaLocative: "en Essonne",
    type: "AdministrativeArea",
    postalCodePrefix: "91",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur en Essonne (91)",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Studio basé à Corbeil-Essonnes, intervenant sur l'ensemble du département : maisons individuelles, pavillons, appartements et projets de rénovation complète.",
    metaTitle: "Architecte d'intérieur Essonne | HFconcept",
    metaDescription:
      "HFconcept, architecte d'intérieur basé en Essonne, accompagne vos projets d'architecture intérieure : rénovation, 3D et aménagement sur mesure.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur en Essonne — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept est implanté à Corbeil-Essonnes et accompagne les projets d'architecture intérieure dans tout le département de l'Essonne. Maisons individuelles à rénover, pavillons à réagencer, appartements à moderniser : chaque projet est traité avec la même exigence, qu'il s'agisse d'une cuisine sur mesure ou d'une rénovation complète.",
      "Notre proximité géographique permet une présence fluide tout au long du chantier : visites de site, rencontres avec les artisans locaux, validation des matériaux en atelier. Cette présence est un atout réel sur les projets longs ou techniques (extension, surélévation, aménagement de combles).",
    ],
    approche: [
      {
        title: "Maisons individuelles & pavillons",
        text: "Réagencement complet, ouverture sur jardin, optimisation des combles, création de suites parentales — typologies fréquentes en Essonne traitées avec un parti pris architectural fort.",
      },
      {
        title: "Présence terrain régulière",
        text: "Visites de chantier, rencontres avec les artisans, vérifications matières — la proximité du studio garantit un suivi étroit sans surcoût logistique.",
      },
      {
        title: "Conception 3D photoréaliste",
        text: "Pour valider chaque décision avant travaux : plans, perspectives, palette matériaux. Idéal pour comparer plusieurs partis pris sereinement.",
      },
      {
        title: "Réseau d'artisans locaux",
        text: "Menuisiers, plombiers, électriciens et carreleurs sélectionnés pour leur exigence d'exécution. Les artisans sont consultés en phase conception, pas en bout de chaîne.",
      },
    ],
    featuredProjects: [
      {
        slug: "cuisine-bois-naturel-hexagones",
        label: "Cuisine-séjour familiale",
        reason: "Utile pour penser une pièce de vie plus fluide dans un pavillon ou une maison individuelle.",
      },
      {
        slug: "dressing-sous-combles",
        label: "Sous-pente optimisée",
        reason: "Montre comment exploiter les combles avec des rangements réellement utilisables au quotidien.",
      },
      {
        slug: "escalier-habille-bois-eclairage-integre",
        label: "Distribution clarifiée",
        reason: "Pertinent quand l'escalier et les rangements deviennent des leviers de réagencement.",
      },
    ],
    relatedServices: [
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Idéal pour les maisons à réagencer avec un suivi terrain régulier.",
      },
      {
        label: "Conception 3D (à domicile)",
        href: "/services/conception-3d/",
        reason: "Permet de valider précisément cuisine, séjour et rangements avant travaux.",
      },
    ],
    frequentProjectTypes: [
      "cuisine-séjour décloisonnée",
      "combles aménagés",
      "rangements sur mesure",
      "entrée familiale structurée",
      "escalier intégré au projet",
    ],
    localProcess: [
      {
        title: "Visite terrain rapide et cadrage précis",
        text: "La proximité du studio permet de lancer le projet vite, avec un relevé complet et un diagnostic concret des usages à revoir.",
      },
      {
        title: "Scénarios ciblés sur les pièces clés",
        text: "Cuisine, séjour, entrée, escalier, combles ou rangements sont hiérarchisés pour concentrer l'effort là où le gain sera le plus visible.",
      },
      {
        title: "Choix matériaux et coordination avec les artisans",
        text: "Les validations se font de manière très concrète, avec des échanges terrain fréquents et des arbitrages rapides quand le chantier l'exige.",
      },
      {
        title: "Suivi d'exécution resserré en Essonne",
        text: "La présence sur site reste régulière du démarrage jusqu'aux finitions, particulièrement utile sur les projets de maison individuelle.",
      },
    ],
    faq: [
      {
        question: "Intervenez-vous dans toute l'Essonne depuis Corbeil-Essonnes ?",
        answer:
          "Oui. Le studio est basé à Corbeil-Essonnes et intervient dans l'ensemble du département, avec une organisation pensée pour rester réactive sur les visites de site et le suivi.",
      },
      {
        question: "Pouvez-vous optimiser un pavillon sans extension ?",
        answer:
          "Oui. Beaucoup de projets consistent d'abord à mieux redistribuer l'existant : ouvrir la pièce de vie, clarifier l'entrée, exploiter les combles ou créer des rangements adaptés.",
      },
      {
        question: "Assurez-vous un suivi plus présent en Essonne ?",
        answer:
          "Oui. La proximité géographique facilite un suivi terrain régulier, utile pour maintenir l'alignement entre la conception, les arbitrages en cours et la qualité d'exécution.",
      },
      {
        question: "Concevez-vous des rangements sur mesure pour les maisons familiales en Essonne ?",
        answer:
          "Oui. Dressings, meubles d'entrée, sous-pentes, bibliothèques ou rangements intégrés font partie des demandes très fréquentes sur les projets de maison dans le 91.",
      },
    ],
    villesDesservies: [
      "Corbeil-Essonnes",
      "Évry-Courcouronnes",
      "Étampes",
      "Massy",
      "Palaiseau",
      "Yerres",
      "Brunoy",
      "Draveil",
      "Savigny-sur-Orge",
      "Athis-Mons",
      "Juvisy-sur-Orge",
      "Sainte-Geneviève-des-Bois",
      "Longjumeau",
      "Mennecy",
      "Arpajon",
      "Brétigny-sur-Orge",
    ],
    logistique:
      "Studio basé au 59B boulevard Henri Dunant, à Corbeil-Essonnes. Premier rendez-vous sur site offert dans tout le département.",
  },
  {
    slug: "seine-et-marne",
    name: "Seine-et-Marne",
    ctaLocative: "en Seine-et-Marne",
    type: "AdministrativeArea",
    postalCodePrefix: "77",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur en Seine-et-Marne (77)",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Conception sur mesure pour maisons familiales, longères et propriétés de l'est francilien : Melun, Meaux, Fontainebleau, Chessy, Provins.",
    metaTitle: "Architecte d'intérieur Seine-et-Marne | HFconcept",
    metaDescription:
      "HFconcept intervient en Seine-et-Marne pour vos projets d'architecture intérieure : maisons familiales, rénovation, conception et suivi.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur en Seine-et-Marne — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept accompagne les projets d'architecture intérieure dans tout le département de la Seine-et-Marne : maisons familiales en secteur pavillonnaire, longères briardes, propriétés autour de Fontainebleau, appartements neufs du Val d'Europe. Chaque projet démarre par une lecture précise du lieu et se construit autour d'une direction architecturale claire.",
      "Le département mêle bâti ancien à fort caractère et programmes contemporains. Notre méthode reste constante : conception 3D photoréaliste pour valider chaque décision avant travaux, sélection rigoureuse des matières et coordination étroite des artisans pour une exécution maîtrisée.",
    ],
    approche: [
      {
        title: "Maisons familiales & pavillons",
        text: "Réagencement, ouverture sur jardin, suites parentales, optimisation des combles — typologies récurrentes traitées avec un parti pris architectural fort.",
      },
      {
        title: "Bâti ancien briard",
        text: "Longères, fermes rénovées, maisons de bourg : conservation des éléments forts (poutres, tomettes, pierre apparente) et insertion d'une écriture contemporaine.",
      },
      {
        title: "Programmes neufs Val d'Europe",
        text: "Personnalisation d'appartements neufs (Serris, Bailly-Romainvilliers, Chessy) : cuisines, dressings, salles de bain sur mesure dès la livraison.",
      },
      {
        title: "Conception 3D photoréaliste",
        text: "Plans, perspectives, palette matériaux validés en amont. Idéal pour les projets éloignés où chaque déplacement compte.",
      },
    ],
    featuredProjects: [
      {
        slug: "sejour-veranda-contemporain",
        label: "Volumes ouverts",
        reason: "Référence utile pour relier des espaces plus étalés autour d'une pièce de vie centrale.",
      },
      {
        slug: "cuisine-verte-granit",
        label: "Cuisine de maison familiale",
        reason: "Montre un équilibre durable entre caractère, usage quotidien et lisibilité des circulations.",
      },
      {
        slug: "escalier-metal-tomettes-vertigo",
        label: "Maison de caractère",
        reason: "Pertinent pour restructurer sans effacer la personnalité d'un bâti existant.",
      },
    ],
    relatedServices: [
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Adapté aux réorganisations globales de maison avec plusieurs zones à coordonner.",
      },
      {
        label: "Projet à distance",
        href: "/services/projet-a-distance/",
        reason: "Utile lorsque chaque déplacement doit être concentré et bien préparé.",
      },
    ],
    frequentProjectTypes: [
      "réorganisation complète du rez-de-chaussée",
      "ouverture sur terrasse ou jardin",
      "maison familiale aux volumes étalés",
      "maison ancienne à remettre en cohérence",
      "cuisine et circulation à redéfinir",
    ],
    localProcess: [
      {
        title: "Diagnostic de la maison dans son ensemble",
        text: "Le point de départ consiste à comprendre les volumes, les liaisons entre pièces et la logique globale du bâti avant de traiter chaque zone séparément.",
      },
      {
        title: "Priorisation des transformations",
        text: "Les pièces structurantes sont identifiées pour décider ce qui doit être revu en même temps et ce qui peut être phasé avec cohérence.",
      },
      {
        title: "Validation 3D avant déplacements décisifs",
        text: "Les arbitrages majeurs sont cadrés à distance sur plans et rendus afin que chaque visite de site serve à valider concrètement les bons points.",
      },
      {
        title: "Organisation resserrée du suivi du projet",
        text: "Les rendez-vous sur site sont regroupés autour des étapes vraiment utiles pour conserver de la fluidité malgré les distances plus importantes.",
      },
    ],
    faq: [
      {
        question: "Intervenez-vous sur des maisons familiales complètes en Seine-et-Marne ?",
        answer:
          "Oui. Le 77 appelle souvent des projets plus globaux que sur une simple pièce : pièce de vie, cuisine, circulation, étage ou maison ancienne à remettre en cohérence.",
      },
      {
        question: "Pouvez-vous moderniser une maison ancienne sans en effacer le caractère ?",
        answer:
          "Oui. L'enjeu consiste à clarifier l'usage et la lumière tout en conservant ce qui donne sa personnalité au lieu : volumes, matière, rythme ou éléments existants à forte présence.",
      },
      {
        question: "Travaillez-vous aussi quand le projet est éloigné du studio ?",
        answer:
          "Oui. Les échanges préparatoires, les plans, les rendus et une partie des arbitrages peuvent se faire à distance pour que les visites sur site restent ciblées et utiles.",
      },
      {
        question: "Peut-on phaser un chantier de maison en Seine-et-Marne ?",
        answer:
          "Oui, lorsque cela a du sens. Le projet est alors pensé de façon globale dès le départ pour que les différentes phases restent cohérentes entre elles.",
      },
    ],
    villesDesservies: [
      "Melun",
      "Meaux",
      "Fontainebleau",
      "Chessy",
      "Serris",
      "Bailly-Romainvilliers",
      "Pontault-Combault",
      "Chelles",
      "Champs-sur-Marne",
      "Noisiel",
      "Lognes",
      "Torcy",
      "Bussy-Saint-Georges",
      "Provins",
      "Nemours",
      "Coulommiers",
      "Lagny-sur-Marne",
      "Savigny-le-Temple",
    ],
    logistique:
      "Studio basé à Corbeil-Essonnes, déplacements réguliers dans tout le 77. Premier rendez-vous sur site offert dans le département.",
  },
  {
    slug: "val-de-marne",
    name: "Val-de-Marne",
    ctaLocative: "dans le Val-de-Marne",
    type: "AdministrativeArea",
    postalCodePrefix: "94",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur dans le Val-de-Marne (94)",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Conception sur mesure pour appartements, maisons de ville et pavillons du sud-est parisien : Vincennes, Saint-Maur, Nogent, Charenton, Créteil.",
    metaTitle: "Architecte d'intérieur Val-de-Marne | HFconcept",
    metaDescription:
      "HFconcept accompagne vos projets d'architecture intérieure dans le Val-de-Marne : rénovation, agencement sur mesure, 3D et coordination.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur dans le Val-de-Marne — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept accompagne les projets d'architecture intérieure dans tout le département du Val-de-Marne : appartements familiaux à Vincennes ou Charenton, maisons en bord de Marne à Saint-Maur ou Nogent, pavillons du sud-est francilien, lofts dans les anciens entrepôts d'Ivry ou Vitry. Chaque projet est traité avec un parti pris architectural fort.",
      "La proximité immédiate de Paris impose un niveau d'exigence élevé sur la finition. Notre rôle est de poser une direction claire dès la phase conception, validée en 3D photoréaliste, puis de coordonner les artisans pour garantir la qualité d'exécution attendue.",
    ],
    approche: [
      {
        title: "Appartements & maisons en bord de Marne",
        text: "Réagencement complet, suites parentales, cuisines ouvertes, dressings sur mesure — typologies récurrentes traitées avec une exécution impeccable.",
      },
      {
        title: "Maisons en bord de Marne",
        text: "Lecture du bâti existant (meulières, maisons de notable, pavillons des années 30), conservation des éléments forts et insertion d'un projet contemporain assumé.",
      },
      {
        title: "Coordination en copropriété",
        text: "Dossiers techniques pour syndic, respect des règlements d'immeuble, gestion fine des nuisances et planning aligné sur les contraintes locales.",
      },
      {
        title: "Validation 3D avant travaux",
        text: "Rendus photoréalistes pour comparer plusieurs partis pris, valider les matières et sécuriser chaque arbitrage avant l'engagement des coûts.",
      },
    ],
    featuredProjects: [
      {
        slug: "cuisine-blanche-faux-plafond-led",
        label: "Pièce de vie clarifiée",
        reason: "Montre comment faire dialoguer cuisine ouverte, repas et circulation dans un plan familial.",
      },
      {
        slug: "sejour-bibliotheque-cheminee",
        label: "Séjour structuré",
        reason: "Pertinent pour redonner une hiérarchie claire à la pièce de vie sans l'alourdir.",
      },
      {
        slug: "entree-sur-mesure-niche-bois",
        label: "Entrée maîtrisée",
        reason: "Utile dans les maisons de ville et appartements où l'entrée doit immédiatement organiser les usages.",
      },
    ],
    relatedServices: [
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Pour coordonner redistribution, menuiserie et chantier sur plusieurs espaces.",
      },
      {
        label: "Conception 3D (à domicile)",
        href: "/services/conception-3d/",
        reason: "Pour tester plusieurs équilibres entre ouverture, mobilier intégré et circulation.",
      },
    ],
    frequentProjectTypes: [
      "clarification cuisine-séjour",
      "entrée avec rangements intégrés",
      "appartement familial à fluidifier",
      "maison de ville sur plusieurs niveaux",
      "bibliothèque ou meuble sur mesure",
    ],
    localProcess: [
      {
        title: "Cadrage des seuils et des pièces de vie",
        text: "Le projet démarre par la lecture des entrées, dégagements, séjours et cuisines pour redonner une hiérarchie plus nette à l'ensemble.",
      },
      {
        title: "Comparaison de plusieurs équilibres sur plan",
        text: "Les arbitrages portent souvent sur l'ouverture, la séparation utile, le meuble intégré et la façon dont la circulation accompagne le quotidien familial.",
      },
      {
        title: "Traitement coordonné des niveaux ou de la copropriété",
        text: "Selon qu'il s'agit d'une maison de ville ou d'un appartement, le projet intègre d'emblée les contraintes d'accès, de bruit et de séquençage des travaux.",
      },
      {
        title: "Suivi d'exécution et finitions",
        text: "Le chantier est piloté pour préserver la netteté du dessin jusque dans les détails de pose, de menuiserie et d'éclairage.",
      },
    ],
    faq: [
      {
        question:
          "Intervenez-vous sur des appartements familiaux comme sur des maisons de ville dans le Val-de-Marne ?",
        answer:
          "Oui. Le studio accompagne aussi bien les appartements à fluidifier que les maisons de ville à restructurer sur plusieurs niveaux, avec une méthode adaptée à chaque cas.",
      },
      {
        question: "Pouvez-vous retravailler l'entrée et la pièce de vie dans un même projet ?",
        answer:
          "Oui. Dans le 94, l'entrée, la cuisine et le séjour méritent souvent d'être pensés ensemble pour améliorer la circulation et la lisibilité du quotidien.",
      },
      {
        question: "Accompagnez-vous le chantier dans le Val-de-Marne ?",
        answer:
          "Oui. Le suivi d'exécution peut faire partie de la mission afin de garder la cohérence entre la conception validée et la réalité du chantier.",
      },
    ],
    villesDesservies: [
      "Vincennes",
      "Saint-Maur-des-Fossés",
      "Nogent-sur-Marne",
      "Charenton-le-Pont",
      "Saint-Mandé",
      "Joinville-le-Pont",
      "Le Perreux-sur-Marne",
      "Fontenay-sous-Bois",
      "Maisons-Alfort",
      "Créteil",
      "Champigny-sur-Marne",
      "Ivry-sur-Seine",
      "Vitry-sur-Seine",
      "Cachan",
      "L'Haÿ-les-Roses",
      "Bry-sur-Marne",
      "Alfortville",
      "Villejuif",
    ],
    logistique:
      "Studio basé à Corbeil-Essonnes, déplacements réguliers dans tout le 94. Premier rendez-vous sur site offert dans le département.",
  },
  {
    slug: "seine-saint-denis",
    name: "Seine-Saint-Denis",
    ctaLocative: "en Seine-Saint-Denis",
    type: "AdministrativeArea",
    postalCodePrefix: "93",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur en Seine-Saint-Denis (93)",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Conception sur mesure pour appartements, lofts et maisons du nord-est parisien : Le Pré-Saint-Gervais, Les Lilas, Montreuil, Saint-Ouen, Pantin.",
    metaTitle: "Architecte d'intérieur Seine-Saint-Denis | HFconcept",
    metaDescription:
      "HFconcept intervient en Seine-Saint-Denis pour vos projets d'architecture intérieure : rénovation, optimisation des surfaces et conception sur mesure.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur en Seine-Saint-Denis — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept accompagne les projets d'architecture intérieure dans tout le département de la Seine-Saint-Denis : appartements aux Lilas ou au Pré-Saint-Gervais, lofts dans les anciennes friches industrielles de Montreuil, Pantin ou Saint-Ouen, maisons de ville et pavillons des communes du nord-est francilien. Chaque projet démarre par une lecture précise du lieu.",
      "Le 93 réunit une diversité de bâti rare en Île-de-France — du loft industriel à l'immeuble haussmannien, en passant par les programmes neufs récents. Notre méthode reste constante : direction architecturale claire, validation 3D photoréaliste et coordination étroite des artisans.",
    ],
    approche: [
      {
        title: "Lofts & friches industrielles",
        text: "Reconversion d'ateliers, hauteurs sous plafond exceptionnelles, structures métalliques apparentes — typologies emblématiques de Montreuil, Pantin, Saint-Ouen.",
      },
      {
        title: "Appartements familiaux",
        text: "Réagencement complet, optimisation des circulations, cuisines ouvertes, suites parentales — adapté aux immeubles anciens comme aux programmes neufs.",
      },
      {
        title: "Coordination en copropriété",
        text: "Dossiers techniques pour syndic, respect des règlements d'immeuble, gestion fine des nuisances et planning aligné sur les contraintes locales.",
      },
      {
        title: "Validation 3D avant travaux",
        text: "Rendus photoréalistes pour comparer plusieurs partis pris, valider les matières et sécuriser chaque arbitrage avant l'engagement des coûts.",
      },
    ],
    featuredProjects: [
      {
        slug: "couloir-dressing-portes-coulissantes",
        label: "Plan resserré optimisé",
        reason: "Exemple parlant pour récupérer du rangement sans perdre la clarté des circulations.",
      },
      {
        slug: "cuisine-colonne-chene-clair",
        label: "Cuisine compacte lisible",
        reason: "Pertinent pour structurer une cuisine intégrée proprement dans un plan contraint.",
      },
      {
        slug: "douche-terrazzo-robinetterie-noire",
        label: "Salle d'eau rationalisée",
        reason: "Montre qu'un volume réduit peut rester net, durable et bien dessiné.",
      },
    ],
    relatedServices: [
      {
        label: "Conseil",
        href: "/services/conseil/",
        reason: "Utile pour prioriser les bons arbitrages avant de lancer plus de travaux.",
      },
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Adapté quand la redistribution doit être cadrée puis exécutée sans dérive.",
      },
    ],
    frequentProjectTypes: [
      "optimisation d'appartement compact",
      "restructuration des circulations",
      "cuisine intégrée dans un plan serré",
      "rangements toute hauteur",
      "salle d'eau rationalisée",
    ],
    localProcess: [
      {
        title: "Diagnostic précis des priorités",
        text: "Le projet commence par un tri clair entre surface disponible, budget, contraintes techniques et potentiel réel du plan existant.",
      },
      {
        title: "Options rapides mais argumentées",
        text: "Plusieurs solutions sont comparées sur plan et, si utile, en 3D pour vérifier que chaque mètre carré sert vraiment l'usage.",
      },
      {
        title: "Arbitrages techniques sans flou",
        text: "Les choix de cloisonnement, de rangement, de cuisine ou de salle d'eau sont fixés tôt afin d'éviter les compromis peu lisibles en cours de chantier.",
      },
      {
        title: "Coordination chantier intégrale ou phasée",
        text: "Selon le périmètre, le suivi peut accompagner une rénovation complète ou un projet séquencé, sans perdre la cohérence d'ensemble.",
      },
    ],
    faq: [
      {
        question: "Pouvez-vous optimiser une surface en Seine-Saint-Denis sans engager une rénovation totale ?",
        answer:
          "Oui. Beaucoup de projets dans le 93 commencent par une clarification du plan, des rangements ou de la cuisine, sans nécessiter d'emblée une transformation lourde de tout le logement.",
      },
      {
        question: "Travaillez-vous aussi sur des lofts ou anciens ateliers en Seine-Saint-Denis ?",
        answer:
          "Oui. Le studio intervient aussi sur des lofts et espaces atypiques, avec une attention particulière à la structure existante, aux hauteurs et au bon niveau de partition intérieure.",
      },
      {
        question: "Comment priorisez-vous quand budget et mètres carrés sont serrés ?",
        answer:
          "Le projet hiérarchise d'abord les zones les plus décisives pour le quotidien. L'idée n'est pas d'en faire plus, mais de concentrer l'effort là où il apporte un gain concret et durable.",
      },
      {
        question: "Pouvez-vous accompagner ensuite le chantier dans le 93 ?",
        answer:
          "Oui. Lorsque la mission le prévoit, le studio accompagne aussi la phase d'exécution pour maintenir la clarté du projet jusqu'à la réalisation.",
      },
    ],
    villesDesservies: [
      "Montreuil",
      "Pantin",
      "Saint-Ouen-sur-Seine",
      "Les Lilas",
      "Le Pré-Saint-Gervais",
      "Romainville",
      "Bagnolet",
      "Noisy-le-Sec",
      "Bondy",
      "Aubervilliers",
      "La Courneuve",
      "Saint-Denis",
      "Drancy",
      "Bobigny",
      "Rosny-sous-Bois",
      "Noisy-le-Grand",
      "Le Raincy",
      "Livry-Gargan",
    ],
    logistique:
      "Studio basé à Corbeil-Essonnes, déplacements réguliers dans tout le 93. Premier rendez-vous sur site offert dans le département.",
  },
  {
    slug: "val-d-oise",
    name: "Val-d'Oise",
    ctaLocative: "dans le Val-d'Oise",
    type: "AdministrativeArea",
    postalCodePrefix: "95",
    region: "Île-de-France",
    heroTitle: "Architecte d'intérieur dans le Val-d'Oise (95)",
    heroEyebrow: "Zone d'intervention",
    heroDescription:
      "Conception sur mesure pour maisons familiales, propriétés et appartements du nord francilien : Cergy, Pontoise, Enghien, Montmorency, L'Isle-Adam.",
    metaTitle: "Architecte d'intérieur Val-d'Oise | HFconcept",
    metaDescription:
      "HFconcept accompagne vos projets d'architecture intérieure dans le Val-d'Oise : maisons, appartements, rénovation et aménagement sur mesure.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt: "HFconcept, architecte d'intérieur dans le Val-d'Oise — projets sur mesure",
    updatedAt: "2026-04-22",
    intro: [
      "HFconcept accompagne les projets d'architecture intérieure dans tout le département du Val-d'Oise : maisons familiales à Enghien ou Montmorency, propriétés à L'Isle-Adam, pavillons à rénover dans la vallée de Montmorency, appartements à Cergy ou Pontoise. Chaque projet démarre par une lecture précise du lieu.",
      "Le département mêle propriétés bourgeoises de la fin XIXe et programmes pavillonnaires plus récents. Notre méthode reste constante : conception 3D photoréaliste pour valider chaque décision avant travaux, sélection rigoureuse des matières et coordination étroite des artisans.",
    ],
    approche: [
      {
        title: "Maisons familiales & pavillons",
        text: "Réagencement complet, ouverture sur jardin, optimisation des combles, création de suites parentales — typologies récurrentes traitées avec un parti pris architectural fort.",
      },
      {
        title: "Propriétés de la vallée de Montmorency",
        text: "Maisons de notable, demeures Belle Époque, propriétés bourgeoises : conservation des éléments forts et insertion d'une écriture contemporaine assumée.",
      },
      {
        title: "Conception 3D photoréaliste",
        text: "Plans, perspectives, palette matériaux validés en amont. Idéal pour comparer plusieurs partis pris sereinement avant engagement.",
      },
      {
        title: "Suivi à distance possible",
        text: "Pour les déplacements professionnels ou les acheteurs non-résidents, l'intégralité du projet peut être conduite à distance, avec des rendez-vous ponctuels sur site.",
      },
    ],
    featuredProjects: [
      {
        slug: "sejour-veranda-contemporain",
        label: "Séjour familial hiérarchisé",
        reason: "Référence utile pour structurer une grande pièce de vie tournée vers le jardin.",
      },
      {
        slug: "dressing-sous-combles",
        label: "Combles exploités",
        reason: "Montre comment transformer une sous-pente en rangement confortable et durable.",
      },
      {
        slug: "garde-corps-claustra-bois",
        label: "Circulation verticale dessinée",
        reason: "Pertinent quand l'étage, l'escalier et les vues intérieures doivent gagner en cohérence.",
      },
    ],
    relatedServices: [
      {
        label: "Projet complet",
        href: "/services/projet-complet/",
        reason: "Le bon cadre pour redistribuer une maison et suivre plusieurs corps d'état.",
      },
      {
        label: "Projet à distance",
        href: "/services/projet-a-distance/",
        reason: "Pratique pour avancer entre rendez-vous sur site sur des secteurs plus éloignés.",
      },
    ],
    frequentProjectTypes: [
      "maison familiale à clarifier",
      "combles à exploiter",
      "rangement sous pente",
      "séjour ouvert sur le jardin",
      "circulation verticale à restructurer",
    ],
    localProcess: [
      {
        title: "Lecture de la hiérarchie des pièces",
        text: "Le projet commence par identifier quelles zones doivent devenir plus lisibles entre réception, quotidien, étage et espaces de transition.",
      },
      {
        title: "Scénarios pièce par pièce",
        text: "Les volumes importants sont abordés avec méthode pour éviter d'ouvrir ou de redistribuer sans logique d'ensemble.",
      },
      {
        title: "Travail spécifique sur l'étage et les combles",
        text: "Sous-pentes, rangements, escaliers et circulations verticales font l'objet d'un dessin précis pour rendre la maison réellement plus pratique.",
      },
      {
        title: "Suivi combinant terrain et validations à distance",
        text: "Les décisions sont prises avec des points sur site aux moments clés et des validations intermédiaires à distance quand cela fluidifie le projet.",
      },
    ],
    faq: [
      {
        question: "Intervenez-vous sur des maisons complètes dans le Val-d'Oise ?",
        answer:
          "Oui. Les demandes du 95 portent souvent sur des maisons familiales à remettre en cohérence plutôt que sur une seule pièce isolée.",
      },
      {
        question: "Pouvez-vous réorganiser combles et pièces de vie dans un même projet ?",
        answer:
          "Oui. Lorsque le quotidien dépend à la fois du rez-de-chaussée et de l'étage, ces zones sont pensées ensemble pour produire un résultat réellement utile.",
      },
      {
        question: "Le suivi peut-il mixer rendez-vous sur site et validations à distance ?",
        answer:
          "Oui. Cette organisation est souvent pertinente dans le Val-d'Oise pour garder un projet fluide sans multiplier inutilement les déplacements.",
      },
    ],
    villesDesservies: [
      "Cergy",
      "Pontoise",
      "Enghien-les-Bains",
      "Montmorency",
      "L'Isle-Adam",
      "Sannois",
      "Saint-Gratien",
      "Eaubonne",
      "Ermont",
      "Franconville",
      "Argenteuil",
      "Bezons",
      "Herblay-sur-Seine",
      "Taverny",
      "Domont",
      "Sarcelles",
      "Garges-lès-Gonesse",
      "Goussainville",
    ],
    logistique:
      "Studio basé à Corbeil-Essonnes, déplacements réguliers dans tout le 95. Premier rendez-vous sur site offert dans le département.",
  },
] as const;

export function getZoneBySlug(slug: string): ZoneInterventionContent | undefined {
  return ZONES_INTERVENTION.find((z) => z.slug === slug);
}

