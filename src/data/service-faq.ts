import type { ServiceFaqItem } from "../types/services";

export type ServiceFaqSlug =
  | "conseil"
  | "conception-3d"
  | "projet-complet"
  | "projet-a-distance";

export const SERVICE_FAQ_BY_SLUG: Record<ServiceFaqSlug, ServiceFaqItem[]> = {
  conseil: [
    {
      question: "Quand une séance de conseil suffit-elle vraiment ?",
      answer:
        "Quand le besoin porte sur des arbitrages précis et que le lieu peut être lu rapidement : implantation, palette, matière, mobilier ou priorités de budget. Si plusieurs pièces, plans ou travaux doivent être coordonnés, nous vous orientons vers une formule plus complète.",
    },
    {
      question: "Que peut-on trancher en une heure ?",
      answer:
        "Une heure permet de traiter quelques décisions structurantes, pas tout un projet. L'objectif est de sortir avec un cap net sur ce qui bloque réellement votre avancée.",
    },
    {
      question: "Recevrai-je des plans ou une shopping list ?",
      answer:
        "Non. La formule Conseil donne un cadrage expert et des recommandations contextualisées, mais ne comprend ni plans détaillés, ni 3D, ni liste d'achats exhaustive.",
    },
    {
      question: "Que se passe-t-il si le sujet dépasse le conseil ?",
      answer:
        "La séance sert aussi à qualifier la bonne suite. Si le projet demande de la projection, des livrables détaillés ou une coordination plus large, nous vous orientons vers la formule adéquate.",
    },
  ],
  "conception-3d": [
    {
      question: "Le tarif de 369 € correspond-il à tous les projets ?",
      answer:
        "Non. Il s'agit de la base tarifaire pour une pièce de moins de 20 m². Au-delà, le prix s'ajuste selon la surface, la complexité et le niveau de livrables attendu.",
    },
    {
      question: "La 3D remplace-t-elle un dossier technique ?",
      answer:
        "Non. Elle sert à valider l'aménagement et l'ambiance avant décision. Si le projet demande des plans d'exécution ou une coordination technique, une formule plus complète est nécessaire.",
    },
    {
      question: "Peut-on comparer plusieurs options ?",
      answer:
        "Oui, dans la mesure où cela reste cohérent avec le cadrage défini. Nous privilégions des variantes réellement utiles à la décision plutôt qu'une multiplication d'images sans arbitrage.",
    },
    {
      question: "Faut-il déjà avoir tout choisi avant de commencer ?",
      answer:
        "Non. Vous devez surtout disposer d'un plan, de photos et de vos contraintes. La mission sert précisément à clarifier ce qui doit être choisi avant achats ou travaux.",
    },
  ],
  "projet-complet": [
    {
      question:
        "Quand faut-il choisir un projet complet plutôt qu'une formule plus légère ?",
      answer:
        "Dès que plusieurs décisions sont liées entre elles, que plusieurs espaces sont concernés ou qu'un chantier doit être cadré dans son ensemble. C'est la bonne formule quand la cohérence globale prime sur une réponse ponctuelle.",
    },
    {
      question: "Avez-vous un rôle d'interlocuteur unique ?",
      answer:
        "Oui. C'est précisément l'intérêt de cette formule : tenir la continuité entre vos besoins, la conception, le dossier projet et la coordination prévue au périmètre validé.",
    },
    {
      question: "L’accompagnement pendant la réalisation est-il inclus ?",
      answer:
        "La formule peut intégrer la coordination et le suivi dans les limites prévues au devis. Le niveau exact d'intervention dépend du lieu, du projet et du cadre retenu ensemble.",
    },
    {
      question: "Comment est établi le devis ?",
      answer:
        "Le devis dépend du périmètre réel : nombre d'espaces, complexité du bien, niveau de détail attendu et intensité de coordination nécessaire. Il n'est jamais standardisé artificiellement.",
    },
  ],
  "projet-a-distance": [
    {
      question: "Quels éléments dois-je fournir pour travailler à distance ?",
      answer:
        "Un plan exploitable, des photos, des mesures clés, vos contraintes d'usage et vos inspirations. Plus les éléments transmis sont précis, plus la mission est efficace.",
    },
    {
      question: "Qu'est-ce que la distance change concrètement ?",
      answer:
        "Elle ne change pas l'exigence de conception, mais elle impose des échanges plus formalisés et exclut la présence physique du studio sur place.",
    },
    {
      question: "Les livrables sont-ils utilisables par des artisans locaux ?",
      answer:
        "Oui, dans la limite du périmètre choisi. Selon la formule retenue, vous recevez des supports clairs pour arbitrer et transmettre une direction fiable aux intervenants sur place.",
    },
    {
      question: "Travaillez-vous aussi hors de France ?",
      answer:
        "Oui. La formule est ouverte à la France et à l'international, à condition de disposer d'éléments de relevé suffisamment fiables pour concevoir à distance.",
    },
  ],
};

function isServiceFaqSlug(slug: string): slug is ServiceFaqSlug {
  return Object.prototype.hasOwnProperty.call(SERVICE_FAQ_BY_SLUG, slug);
}

export function getServiceFaqBySlug(slug: string): ServiceFaqItem[] {
  if (!isServiceFaqSlug(slug)) {
    throw new Error(`FAQ service introuvable pour le slug "${slug}"`);
  }

  const faqEntries = SERVICE_FAQ_BY_SLUG[slug];

  if (faqEntries.length === 0) {
    throw new Error(`FAQ vide pour le slug "${slug}"`);
  }

  return faqEntries;
}
