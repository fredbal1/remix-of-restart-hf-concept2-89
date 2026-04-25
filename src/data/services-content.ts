import type { ServiceOffer, ServiceOfferCardData } from "@/types/services";
import { SERVICE_MANIFEST, type ServiceManifestEntry } from "@/data/services-manifest";
import { getServiceFaqBySlug } from "./service-faq";
import serviceConseilImg from "@/assets/images/services/service-conseil.webp";
import serviceConception3dImg from "@/assets/images/services/service-conception-3d.webp";
import serviceProjetCompletImg from "@/assets/images/services/service-projet-complet.webp";
import serviceProjetDistanceImg from "@/assets/images/services/service-projet-distance.webp";

export type { ServiceOffer } from "@/types/services";

const manifestByKey = Object.fromEntries(
  SERVICE_MANIFEST.map((entry) => [entry.key, entry])
) as Record<string, ServiceManifestEntry>;

function meta(key: string): ServiceManifestEntry {
  const entry = manifestByKey[key];
  if (!entry) {
    throw new Error(`Unknown service key: ${key}`);
  }

  return entry;
}

export const SERVICE_OFFERS: ServiceOffer[] = [
  {
    ...meta("conseil"),
    price: "99 €*",
    priceNote: "*Tarif valable pour une heure de conseil",
    subtitle: "Un regard expert pour orienter vos choix",
    accroche: "En une heure, nous posons les fondations d'un intérieur qui vous ressemble vraiment.",
    text: "Une séance ciblée à domicile pour clarifier vos choix, arbitrer rapidement et savoir si le sujet demande ou non une mission plus complète.",
    deliverables: [
      "Lecture du lieu et des priorités à traiter en premier",
      "Arbitrages concrets sur l'agencement, les teintes et les matières",
      "Points de vigilance pour éviter un achat ou un choix incohérent",
      "Orientation claire si une mission plus complète devient utile",
    ],
    benefits: [
      "Décider vite sans multiplier les essais",
      "Éviter des achats ou travaux incohérents",
      "Mettre le budget au bon endroit dès le départ",
      "Savoir immédiatement si une autre formule est nécessaire",
    ],
    audience:
      "Idéal si vous avez déjà un sujet précis, mais encore besoin d'un regard professionnel pour verrouiller la bonne direction.",
    commitment:
      "Un diagnostic franc, ciblé et directement exploitable, sans vous pousser vers une mission plus lourde si elle n'est pas justifiée.",
    heroImage: serviceConseilImg,
    selectorSummary: "Cadrer vos choix en 1 heure",
    card: {
      intro: "Un regard expert pour orienter vos choix rapidement.",
      highlights: [
        "Arbitrages concrets sur l'agencement, les matières et les teintes",
        "Cadrage utile avant achats ou premiers travaux",
        "Orientation claire si le sujet demande ensuite une formule plus complète",
      ],
      positioningNote:
        "Pour clarifier un choix précis sans lancer un projet complet.",
      primaryCtaLabel: "Découvrir la formule",
      primaryCtaHref: "/services/conseil/",
      secondaryCtaLabel: "Voir le détail",
      secondaryCtaHref: "/services/conseil/",
      imageAlt: "Consultation décoration intérieure — HFconcept",
    },
    detailIntroTitle:
      "Une séance utile quand il faut trancher juste, pas lancer une mission lourde.",
    detailIntro: [
      "Le conseil à domicile s'adresse aux projets qui ont besoin d'une direction nette, pas d'un dispositif lourd. En une heure, nous lisons le lieu, nous recadrons vos usages et nous tranchons les points qui freinent vos décisions.",
      "Cette formule est utile quand l'enjeu tient dans quelques arbitrages structurants : implantation d'un meuble, hiérarchie des matières, palette couleur, circulation, priorités d'achat ou cohérence générale d'une pièce.",
      "Elle n'a pas vocation à remplacer une conception 3D ou un projet complet. Si le sujet demande des plans, des rendus ou une coordination de travaux, la séance sert aussi à le qualifier clairement avant d'aller plus loin.",
    ],
    useCases: [
      {
        title: "Débloquer une pièce avant d'acheter",
        text: "Vous hésitez sur l'implantation d'un séjour, d'une cuisine ouverte ou d'une chambre et vous voulez arrêter une direction avant de commander.",
      },
      {
        title: "Valider des matières et des couleurs",
        text: "Vous avez déjà repéré des références, mais vous voulez vérifier qu'elles fonctionnent ensemble dans votre lumière, avec vos volumes et votre mobilier.",
      },
      {
        title: "Prioriser sans tout refaire",
        text: "Vous emménagez, votre budget doit être séquencé et vous avez besoin de savoir ce qui mérite d'être traité maintenant, puis plus tard.",
      },
      {
        title: "Qualifier la bonne suite du projet",
        text: "La séance permet aussi de décider si un conseil suffit ou si le lieu appelle ensuite une conception 3D ou un accompagnement complet.",
      },
    ],
    process: [
      {
        title: "Préparation ciblée",
        text: "Vous partagez plan, photos, contraintes et questions prioritaires pour concentrer la séance sur les vrais arbitrages.",
      },
      {
        title: "Conseil à domicile",
        text: "Sur place, nous analysons le lieu, vos usages et les points de friction pour répondre de façon concrète et contextualisée.",
      },
      {
        title: "Arbitrages immédiats",
        text: "Implantation, matières, couleurs, mobilier, budget à protéger : nous tranchons ce qui peut l'être pendant le rendez-vous.",
      },
      {
        title: "Orientation claire pour la suite",
        text: "Vous repartez avec un cap précis et, si le sujet le demande, une orientation vers la formule suivante la plus pertinente.",
      },
    ],
    scope: [
      {
        tone: "included",
        title: "Ce que comprend la formule",
        intro: "Le cœur de la séance : un diagnostic utile et des réponses immédiatement exploitables.",
        items: [
          "Une heure de conseil à domicile",
          "Lecture du lieu, de vos usages et de vos contraintes",
          "Arbitrages concrets sur l'agencement, les teintes, les matières ou le mobilier",
          "Recommandation claire sur la suite à donner au projet si nécessaire",
        ],
      },
      {
        tone: "optional",
        title: "En option / selon besoin",
        intro: "Si le sujet s'élargit, la suite se construit sur mesure plutôt que d'être improvisée.",
        items: [
          "Une seconde séance si un nouveau périmètre doit être traité",
          "Une proposition de conception 3D si vous avez besoin de vous projeter",
          "Un devis de projet complet si la mission appelle plans, dossier ou coordination",
        ],
      },
      {
        tone: "excluded",
        title: "Ce qui ne relève pas de cette formule",
        intro: "Le conseil n'est pas une mission technique déguisée.",
        items: [
          "Plans techniques ou dossier d'exécution",
          "Modélisation 3D et shopping list détaillée",
          "Mission de maîtrise d’œuvre, direction de travaux ou gestion des entreprises",
        ],
      },
    ],
    relatedProjects: [
      {
        slug: "escalier-metal-tomettes-vertigo",
        reason:
          "Un bon exemple de sujet où l'arbitrage entre existant de caractère et intervention contemporaine peut suffire à débloquer la suite.",
      },
      {
        slug: "cuisine-marbre-blanc-suspensions",
        reason:
          "Montre comment quelques décisions justes sur le marbre, la lumière et le bar peuvent clarifier toute la lecture d'une cuisine.",
      },
      {
        slug: "sejour-vertigo",
        reason:
          "Illustre un besoin fréquent de conseil : hiérarchiser un espace repas sans cloisonner ni alourdir la pièce.",
      },
    ],
    faq: getServiceFaqBySlug("conseil"),
    availabilityNote:
      "Disponible à domicile à Paris et en Île-de-France uniquement. La séance peut ensuite ouvrir vers une autre formule si le sujet l'exige.",
    comparison: {
      idealFor: [
        "Un besoin ciblé sur une pièce ou un point bloquant",
        "Des arbitrages rapides à prendre avant achat",
        "Une décision à trancher sur place, sans mission lourde",
      ],
      lessSuitableFor: [
        "Si vous attendez des plans, une 3D ou un dossier détaillé",
        "Si plusieurs pièces et plusieurs entreprises sont impliquées",
        "Si le projet se déroule hors de notre périmètre local à domicile",
      ],
      otherOptions: [
        {
          slug: "conception-3d",
          reason: "À privilégier si vous devez voir la pièce avant d'acheter ou de lancer les travaux.",
        },
        {
          slug: "projet-complet",
          reason: "À choisir si le projet engage plusieurs pièces, des entreprises ou un chantier.",
        },
        {
          slug: "projet-a-distance",
          reason: "À considérer si vous êtes hors Paris / Île-de-France ou si le projet doit avancer entièrement à distance.",
        },
      ],
    },
  },
  {
    ...meta("conception-3d"),
    price: "369 €*",
    priceNote: "*Tarif valable pour une pièce de moins de 20 m².",
    subtitle: "Visualisez votre intérieur avant de le réaliser",
    accroche: "Voir avant de faire : la certitude de choisir juste, sans aucun regret.",
    text: "Une projection 3D claire et photoréaliste pour valider l'aménagement, les matières et l'ambiance avant de passer aux achats ou aux travaux.",
    deliverables: [
      "Plan d'aménagement calibré pour la pièce concernée",
      "Vues 3D photoréalistes pour se projeter sans ambiguïté",
      "Direction matières, couleurs et ambiance cohérente",
      "Base solide pour vos achats, devis et arbitrages",
    ],
    benefits: [
      "Se projeter avant de dépenser",
      "Comparer des options sans improviser sur chantier",
      "Aligner usage, circulation et esthétique",
      "Présenter une direction claire avant validation finale",
    ],
    audience:
      "Idéal si vous avez besoin d'une vraie projection avant travaux, achat ou fabrication sur mesure, sans engager d'emblée un accompagnement global.",
    commitment:
      "Une 3D utile, pensée comme un outil de décision et non comme une simple image séduisante.",
    heroImage: serviceConception3dImg,
    selectorSummary: "Se projeter avant travaux",
    card: {
      intro: "Visualisez votre intérieur avant de lancer les travaux.",
      highlights: [
        "Plan d'aménagement clair et cohérent avec vos usages",
        "Vues 3D photoréalistes pour décider sans approximation",
        "Validation des matières et de l'ambiance avant achat",
      ],
      positioningNote:
        "Pour voir juste avant d'acheter, concevoir ou engager les travaux.",
      primaryCtaLabel: "Découvrir la formule",
      primaryCtaHref: "/services/conception-3d/",
      secondaryCtaLabel: "Voir le détail",
      secondaryCtaHref: "/services/conception-3d/",
      imageAlt: "Visualisation 3D d'un intérieur — HFconcept",
    },
    detailIntroTitle:
      "Une formule conçue pour décider avant travaux, pas pour corriger après coup.",
    detailIntro: [
      "La conception 3D devient pertinente quand une idée ne suffit plus et qu'il faut voir avant de décider. Elle transforme un projet encore abstrait en scénario lisible : volumes, implantation, matières, couleurs et ambiance générale.",
      "C'est la bonne formule quand vous voulez sécuriser un achat, comparer une implantation, valider un faux-plafond, un mobilier sur mesure ou l'équilibre d'une pièce avant travaux.",
      "Elle n'est pas un dossier technique d'exécution. La 3D sert à verrouiller la direction du projet et à réduire l'incertitude avant de passer, si nécessaire, à des études plus complètes.",
    ],
    useCases: [
      {
        title: "Valider un aménagement avant travaux",
        text: "Vous savez qu'une pièce doit être repensée, mais vous voulez confirmer la bonne implantation avant de lancer des devis ou des commandes.",
      },
      {
        title: "Comparer deux logiques d'implantation",
        text: "Îlot ou table, rangements toute hauteur ou allègement, cloisonnement ou ouverture : la 3D aide à décider avant de s'engager.",
      },
      {
        title: "Projeter une ambiance avant d'acheter",
        text: "Vous voulez choisir revêtements, couleurs, menuiseries ou mobilier avec une vision d'ensemble plutôt qu'élément par élément.",
      },
      {
        title: "Présenter une direction claire",
        text: "La 3D facilite aussi la validation avec vos proches, vos entreprises ou votre menuisier quand le projet doit être partagé sans ambiguïté.",
      },
    ],
    process: [
      {
        title: "Visite et cadrage local",
        text: "Nous nous déplaçons à domicile pour comprendre le lieu, relever vos contraintes et cadrer précisément la pièce concernée.",
      },
      {
        title: "Plan d'aménagement",
        text: "Nous construisons une logique d'implantation cohérente avec vos usages, vos priorités et l'ambiance recherchée.",
      },
      {
        title: "Modélisation 3D et ajustements",
        text: "Les volumes, matières et grands choix esthétiques sont traduits en vues 3D pour valider le projet avant décision.",
      },
      {
        title: "Livraison exploitable",
        text: "Vous recevez des supports clairs pour arbitrer sereinement achats, devis et lancement des travaux.",
      },
    ],
    scope: [
      {
        tone: "included",
        title: "Ce que comprend la formule",
        intro: "Une base claire pour visualiser, décider et avancer sans approximation.",
        items: [
          "Visite à domicile et cadrage de la pièce concernée",
          "Plan d'aménagement optimisé selon vos usages",
          "Deux à trois vues 3D photoréalistes",
          "Direction matières, couleurs et ambiance intégrée au projet",
        ],
      },
      {
        tone: "optional",
        title: "En option / selon besoin",
        intro: "Le niveau de détail peut être élargi si le projet le demande réellement.",
        items: [
          "Vues supplémentaires ou variantes complémentaires",
          "Extension à d'autres pièces ou à un périmètre plus large",
          "Shopping list ou dossier plus détaillé selon l'usage prévu",
        ],
      },
      {
        tone: "excluded",
        title: "Ce qui ne relève pas de cette formule",
        intro: "La 3D valide une direction, elle ne remplace pas les étapes techniques lourdes.",
        items: [
          "Plans techniques d'exécution",
          "Consultation et coordination des artisans",
          "Maîtrise d’œuvre, direction de travaux ou pilotage opérationnel des entreprises",
        ],
      },
    ],
    relatedProjects: [
      {
        slug: "cuisine-noire-chene-ilot",
        reason:
          "La projection 3D y est décisive pour verrouiller l'îlot, les contrastes noir/chêne et la continuité entre cuisine et séjour.",
      },
      {
        slug: "bibliotheque-vitrine-retro-eclairee",
        reason:
          "Un exemple typique de volume sur mesure qui gagne à être validé en 3D avant fabrication.",
      },
      {
        slug: "couloir-dressing-portes-coulissantes",
        reason:
          "La 3D aide ici à tester circulation, profondeur de rangement et rythme des menuiseries avant travaux.",
      },
    ],
    faq: getServiceFaqBySlug("conception-3d"),
    availabilityNote:
      "Accompagnement à domicile à Paris et en Île-de-France. Base tarifaire indiquée pour une pièce de moins de 20 m².",
    comparison: {
      idealFor: [
        "Une pièce à visualiser avant achat ou travaux",
        "Un besoin de projection pour valider volumes et ambiance",
        "Un projet local qui demande plus qu'un conseil, mais pas encore un pilotage global",
      ],
      lessSuitableFor: [
        "Si la question peut être tranchée en une seule séance de conseil",
        "Si le projet exige immédiatement dossier, artisans et coordination",
        "Si l'accompagnement doit être mené entièrement à distance",
      ],
      otherOptions: [
        {
          slug: "conseil",
          reason: "Suffisant si votre besoin porte sur quelques arbitrages simples à trancher sur place.",
        },
        {
          slug: "projet-complet",
          reason: "Préférable si la 3D n'est qu'une étape d'un projet global avec dossier et coordination.",
        },
        {
          slug: "projet-a-distance",
          reason: "Même logique de projection si le projet doit être mené sans présence locale du studio.",
        },
      ],
    },
  },
  {
    ...meta("projet-complet"),
    price: "Sur devis",
    subtitle: "De la conception à la réalisation, nous gérons tout",
    accroche: "Vous rêvez, nous réalisons — un intérieur d'exception livré clé en main.",
    text: "Notre accompagnement le plus complet : conception, dossier, consultations, coordination et suivi du projet selon le périmètre validé ensemble.",
    deliverables: [
      "Scénario d'aménagement complet validé",
      "Plans et dossier pour aligner les intervenants",
      "Sélection matières, mobilier et sur-mesure selon le projet",
      "Coordination et arbitrages jusqu'aux phases prévues de réalisation",
    ],
    benefits: [
      "Un interlocuteur unique du début à la fin",
      "Des décisions prises dans le bon ordre",
      "Une cohérence tenue entre conception et réalisation",
      "Moins de charge mentale sur un projet exigeant",
    ],
    audience:
      "La formule la plus adaptée aux rénovations ambitieuses, aux acquisitions à repenser en profondeur et aux projets où la cohérence globale prime.",
    commitment:
      "Une conduite de projet rigoureuse, lisible et exigeante, avec un seul fil directeur entre vos usages, les choix de conception et la mise en oeuvre.",
    heroImage: serviceProjetCompletImg,
    selectorSummary: "Déléguer de A à Z",
    card: {
      intro: "De la conception à la réalisation, un accompagnement global et structuré.",
      highlights: [
        "Interlocuteur unique du cadrage à la coordination",
        "Dossier projet et arbitrages tenus dans le temps",
        "Pilotage rigoureux jusqu'aux phases prévues de réalisation",
      ],
      positioningNote:
        "Pour déléguer une rénovation exigeante de la conception à la coordination.",
      primaryCtaLabel: "Découvrir la formule",
      primaryCtaHref: "/services/projet-complet/",
      secondaryCtaLabel: "Voir le détail",
      secondaryCtaHref: "/services/projet-complet/",
      imageAlt: "Projet d'architecture intérieure complet — HFconcept",
      featured: true,
      featuredLabel: "Le plus complet",
    },
    detailIntroTitle:
      "La formule la plus complète, pensée pour les projets qui ne peuvent pas être menés à moitié.",
    detailIntro: [
      "Le projet complet est choisi quand le lieu demande une direction forte et un pilotage continu. Il réunit conception, cadrage budgétaire, dossier projet et coordination dans une seule trajectoire.",
      "Vous avancez avec un interlocuteur unique, capable de tenir ensemble usages, esthétique, contraintes techniques, entreprises et arbitrages successifs. C'est la formule la plus engageante, mais aussi la plus lisible lorsque le projet dépasse une simple décision d'ambiance.",
      "Elle s'adresse aux rénovations ambitieuses, aux acquisitions à repenser en profondeur ou aux projets sur mesure où la cohérence globale compte autant que le résultat final.",
    ],
    useCases: [
      {
        title: "Rénover plusieurs espaces avec cohérence",
        text: "Vous voulez traiter plusieurs pièces ou un bien entier sans perdre l'unité d'ensemble entre volumes, matières et usages.",
      },
      {
        title: "Repenser un bien avant emménagement",
        text: "Le projet doit être cadré avant travaux, avec une vision claire sur les priorités, le phasage et les choix structurants.",
      },
      {
        title: "Gérer un niveau technique plus engageant",
        text: "Cuisine ouverte, salle de bain sous combles, faux-plafond, sur-mesure : plusieurs sujets doivent être tenus ensemble, pas isolés.",
      },
      {
        title: "Déléguer le pilotage global",
        text: "Vous ne voulez pas coordonner seul les arbitrages, les entreprises et la cohérence du projet au fil de la réalisation.",
      },
    ],
    process: [
      {
        title: "Cadrage et relevé",
        text: "Nous analysons le lieu, les usages, les contraintes et le niveau d'ambition du projet pour poser un périmètre cohérent.",
      },
      {
        title: "Conception et arbitrages",
        text: "Implantation, matières, ambiance, budget cible et priorités sont construits dans un scénario global, lisible et assumé.",
      },
      {
        title: "Dossier et consultations",
        text: "Les plans, documents utiles et échanges avec les intervenants sont structurés pour sécuriser la mise en oeuvre.",
      },
      {
        title: "Coordination et suivi",
        text: "Nous tenons le fil du projet dans les phases prévues au devis pour protéger la cohérence jusqu'à la réalisation.",
      },
    ],
    scope: [
      {
        tone: "included",
        title: "Ce que comprend la formule",
        intro: "Un accompagnement global pour tenir ensemble conception, documents et coordination.",
        items: [
          "Conception complète du projet et arbitrages d'ensemble",
          "Plans, dossier projet et supports utiles à la consultation",
          "Sélection des matières, éléments sur mesure et intentions clés",
          "Coordination du projet selon le périmètre de suivi validé",
        ],
      },
      {
        tone: "optional",
        title: "En option / selon besoin",
        intro: "Le périmètre exact s'ajuste à la réalité du bien et au niveau d'accompagnement souhaité.",
        items: [
          "Accompagnement achats ou décoration finale",
          "Extension à d'autres pièces ou à un périmètre supplémentaire",
          "Niveau de coordination renforcé si le projet le justifie",
        ],
      },
      {
        tone: "excluded",
        title: "Ce qui ne relève pas de cette formule",
        intro: "Certaines prestations spécialisées restent pilotées à part lorsqu'elles sortent du périmètre d'architecture intérieure.",
        items: [
          "Travaux ou zones non prévus dans le périmètre validé",
          "Études structurelles ou techniques relevant d'intervenants spécialisés",
          "Prestations non cadrées au devis initial",
        ],
      },
    ],
    relatedProjects: [
      {
        slug: "salle-de-bain-signature",
        reason:
          "Une rénovation complète où conception, matières, détails et exécution devaient rester parfaitement alignés.",
      },
      {
        slug: "cuisine-faux-plafond-courbe",
        reason:
          "Projet où la conception du volume, l'îlot et le plafond demandent un pilotage global du début à la réalisation.",
      },
      {
        slug: "sejour-veranda-contemporain",
        reason:
          "Exemple de pièce de vie transformée par une vision d'ensemble, jusqu'à la coordination des choix structurants.",
      },
    ],
    faq: getServiceFaqBySlug("projet-complet"),
    availabilityNote:
      "Mission sur devis, ajustée au périmètre réel, au lieu et au niveau de coordination attendu. C'est la formule la plus engageante du studio.",
    comparison: {
      idealFor: [
        "Une rénovation complète ou multi-pièces",
        "Un projet qui engage conception, dossier et coordination",
        "Un besoin d'interlocuteur unique sur un périmètre exigeant",
      ],
      lessSuitableFor: [
        "Si vous avez seulement besoin d'un arbitrage ponctuel",
        "Si la priorité est limitée à une visualisation 3D d'une seule pièce",
        "Si le projet doit être conçu sans présence locale ni coordination sur place",
      ],
      otherOptions: [
        {
          slug: "conseil",
          reason: "Mieux adapté pour débloquer un point précis sans lancer une mission globale.",
        },
        {
          slug: "conception-3d",
          reason: "Pertinent si votre priorité est de valider une pièce avant achat ou travaux, sans pilotage complet.",
        },
        {
          slug: "projet-a-distance",
          reason: "À privilégier si le projet se déroule hors zone locale et doit être conçu sans présence sur place.",
        },
      ],
    },
  },
  {
    ...meta("projet-a-distance"),
    price: "À partir de 199 €",
    subtitle: "Votre projet d'intérieur, où que vous soyez",
    accroche: "La distance n'est jamais un obstacle quand la conception reste claire, cadrée et exigeante.",
    text: "Le même niveau d'exigence de conception, sans présence locale du studio : visio, plans, 3D, palette et dossier selon le périmètre retenu.",
    deliverables: [
      "Plan d'aménagement exploitable à distance",
      "Vues 3D pour valider volumes et ambiance",
      "Palette matières, coloris et intentions de finition",
      "Dossier complémentaire ou shopping list selon option",
    ],
    benefits: [
      "Même exigence de conception sans présence locale",
      "Accompagnement possible partout en France et à l'international",
      "Livrables clairs pour avancer avec vos équipes sur place",
      "Organisation fluide malgré les contraintes d'agenda ou de distance",
    ],
    audience:
      "Pensé pour les clients hors Île-de-France, les résidences secondaires, les expatriés ou les projets qui avancent plus facilement en visio.",
    commitment:
      "Une méthode plus formalisée, mais le même niveau de précision sur la conception, les arbitrages et la qualité perçue du projet.",
    heroImage: serviceProjetDistanceImg,
    selectorSummary: "Avancer où que vous soyez",
    card: {
      intro: "La même exigence, où que vous soyez.",
      highlights: [
        "Visio, plans, 3D et palette selon le besoin réel",
        "Méthode claire pour avancer sans présence locale du studio",
        "Livrables pensés pour rester utiles aux équipes sur place",
      ],
      positioningNote:
        "Pour concevoir avec exigence partout en France et à l'international.",
      primaryCtaLabel: "Découvrir la formule",
      primaryCtaHref: "/services/projet-a-distance/",
      secondaryCtaLabel: "Voir le détail",
      secondaryCtaHref: "/services/projet-a-distance/",
      imageAlt: "Projet de décoration à distance — HFconcept",
      newLabel: "Nouveau",
    },
    detailIntroTitle:
      "Une vraie mission de conception, avec un mode de travail adapté à la distance.",
    detailIntro: [
      "Le projet à distance s'adresse aux clients qui veulent le niveau d'exigence HFconcept sans présence locale du studio. La conception reste précise, structurée et visuelle ; seul le mode d'échange change.",
      "Nous travaillons à partir de visios, plans, photos, mesures et documents transmis en amont. Le projet avance par séquences claires : cadrage, plan d'aménagement, 3D, palette, shopping ou dossier selon le besoin.",
      "La distance ne réduit pas la qualité de conception ; elle demande en revanche des informations fiables, un cadre d'échange plus formalisé et un périmètre bien documenté dès le départ.",
    ],
    useCases: [
      {
        title: "Projet hors Île-de-France",
        text: "Vous vivez ailleurs en France ou à l'international, mais vous voulez un accompagnement de conception structuré et premium.",
      },
      {
        title: "Résidence secondaire ou investissement",
        text: "Le lieu n'est pas votre résidence principale et vous avez besoin d'un cadre clair pour avancer à distance sans improviser.",
      },
      {
        title: "Agenda contraint, échanges à distance",
        text: "Vous préférez avancer en visio, avec des documents clairs et des décisions préparées plutôt qu'une succession de rendez-vous sur place.",
      },
      {
        title: "Préparer un dossier pour des équipes locales",
        text: "Vous avez besoin d'une direction solide à transmettre à vos artisans, partenaires ou proches qui pilotent sur place.",
      },
    ],
    process: [
      {
        title: "Collecte cadrée des documents",
        text: "Vous transmettez plans, photos, mesures, inspirations et contraintes pour nous permettre une lecture fiable du lieu.",
      },
      {
        title: "Cadrage en visio",
        text: "Nous validons ensemble les usages, le périmètre, les priorités et le niveau exact de livrables attendus.",
      },
      {
        title: "Conception et visualisation",
        text: "Plan d'aménagement, 3D, palette et arbitrages sont construits à distance avec la même exigence de cohérence qu'en local.",
      },
      {
        title: "Restitution et transmission",
        text: "Le projet vous est restitué de façon claire pour faciliter vos décisions et le relais avec les équipes sur place.",
      },
    ],
    scope: [
      {
        tone: "included",
        title: "Ce que comprend la formule",
        intro: "Un accompagnement entièrement structuré pour rester lisible même sans présence locale.",
        items: [
          "Visio de cadrage et points d'étape",
          "Analyse des plans, photos, mesures et contraintes transmises",
          "Plan d'aménagement et vues 3D selon le périmètre défini",
          "Palette matières et coloris pour cadrer l'ambiance du projet",
        ],
      },
      {
        tone: "optional",
        title: "En option / selon besoin",
        intro: "Le niveau de détail se module selon le rôle attendu du dossier à distance.",
        items: [
          "Shopping list détaillée",
          "Dossier plus complet à transmettre à vos artisans",
          "Vues supplémentaires ou itérations complémentaires",
        ],
      },
      {
        tone: "excluded",
        title: "Ce qui ne relève pas de cette formule",
        intro: "La distance change surtout ce qui relève de la présence physique du studio.",
        items: [
          "Visite sur place du studio",
          "Coordination physique de chantier ou rendez-vous artisans locaux",
          "Relevés techniques exhaustifs réalisés par nos soins",
        ],
      },
    ],
    relatedProjects: [
      {
        slug: "chambre-ado-bureau-integre",
        reason:
          "Montre comment un volume contraint peut être entièrement pensé à partir de plans, mesures et usages clairement documentés.",
      },
      {
        slug: "cuisine-noire-chene-ilot",
        reason:
          "Le niveau de précision attendu sur une cuisine ouverte peut être préparé à distance dès lors que les relevés sont fiables.",
      },
      {
        slug: "salle-de-bain-signature",
        reason:
          "Illustre la capacité à concevoir une ambiance complète, palette comprise, sans présence locale du studio.",
      },
    ],
    faq: getServiceFaqBySlug("projet-a-distance"),
    availabilityNote:
      "Disponible partout en France et à l'international, sous réserve de plans, mesures et supports visuels suffisamment fiables.",
    comparison: {
      idealFor: [
        "Un projet situé hors de notre périmètre local",
        "Un client qui préfère un process clair en visio",
        "Une mission de conception à transmettre à des équipes sur place",
      ],
      lessSuitableFor: [
        "Si vous attendez une présence physique du studio à domicile",
        "Si le projet repose surtout sur une coordination locale de chantier",
        "Si les plans, mesures et supports transmis sont trop incomplets",
      ],
      otherOptions: [
        {
          slug: "conseil",
          reason: "Suffisant si vous avez besoin d'un arbitrage ciblé dans notre périmètre local à domicile.",
        },
        {
          slug: "conception-3d",
          reason: "À privilégier pour une pièce locale à visualiser avant travaux.",
        },
        {
          slug: "projet-complet",
          reason: "Préférable si vous attendez un interlocuteur unique et une coordination sur le terrain.",
        },
      ],
    },
  },
];

const CARD_PRICE_NOTES: Record<string, { priceNote?: string; priceDetail?: string }> = {
  conseil: {
    priceNote: "1h de conseil à domicile",
    priceDetail: "Paris & Île-de-France uniquement",
  },
  "conception-3d": {
    priceNote: "pour une pièce de moins de 20 m²",
  },
};

export const SERVICE_OFFER_CARDS: ServiceOfferCardData[] = SERVICE_OFFERS.map(
  (service) => ({
    number: service.number,
    slug: service.slug,
    title: service.title,
    priceLabel: service.price,
    priceNote: CARD_PRICE_NOTES[service.slug]?.priceNote,
    priceDetail: CARD_PRICE_NOTES[service.slug]?.priceDetail,
    intro: service.card.intro,
    highlights: service.card.highlights,
    positioningNote: service.card.positioningNote,
    primaryCtaLabel: service.card.primaryCtaLabel,
    primaryCtaHref: service.card.primaryCtaHref,
    secondaryCtaLabel: service.card.secondaryCtaLabel,
    secondaryCtaHref: service.card.secondaryCtaHref,
    imageSrc: service.heroImage,
    imageAlt: service.card.imageAlt,
    featured: service.card.featured,
    featuredLabel: service.card.featuredLabel,
    newLabel: service.card.newLabel,
  })
);

export const SERVICES_PAGE = {
  hero: {
    eyebrow: "Services",
    title: "Nos formules sur mesure",
    text: "Conseil, conception 3D, projet complet ou à distance.",
  },
  offersSection: {
    eyebrow: "Nos formules",
    title: "L'accompagnement\nqui vous correspond",
    description:
      "Du conseil ciblé au projet complet, choisissez la formule adaptée à votre besoin, à votre niveau d'avancement et à votre projet.",
    reassuranceLine:
      "Premier échange offert · Sans engagement · Devis gratuit",
  },
  cta: {
    eyebrow: "Votre accompagnement",
    title: "Choisissons la bonne formule, au bon niveau d'implication.",
    text: "Conseil ciblé, conception 3D ou projet complet : nous vous orientons vers l'accompagnement le plus juste pour votre besoin.",
    reassurance: "Orientation claire — devis adapté à votre besoin",
    ctaPrimary: "Nous contacter",
    ctaPrimaryHref: "/contact/",
    ctaSecondary: "Voir nos réalisations",
    ctaSecondaryHref: "/realisations/",
  },
} as const;

