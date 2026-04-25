import type { ProjectContent } from "../types";

import sdbSignature01 from "@/assets/images/projects/salle-de-bain-signature/hfconcept-sdb-signature-01.webp";
import sdbSignature02 from "@/assets/images/projects/salle-de-bain-signature/hfconcept-sdb-signature-02.webp";
import sdbSignature03 from "@/assets/images/projects/salle-de-bain-signature/hfconcept-sdb-signature-03.webp";
import sdbSignature04 from "@/assets/images/projects/salle-de-bain-signature/hfconcept-sdb-signature-04.webp";

export const salleDebainSignatureContent: ProjectContent = {
  title: "Salle de bain signature",
  excerpt: "Rénovation complète d'une salle de bain en tons naturels, carrelage ondulé et mobilier courbe contemporain.",
  description: "Ce projet incarne notre approche du détail poussé à l'extrême. Le carrelage ondulé crée un jeu de lumière subtil qui évolue au fil de la journée, tandis que le mobilier courbe en chêne clair apporte une douceur organique à l'ensemble. Chaque élément a été dessiné sur mesure pour s'inscrire dans une harmonie globale.",
  projectContext: "Le projet partait d'une salle de bain à rénover entièrement, avec une attente forte sur la qualité perçue des détails. L'objectif était de créer un espace apaisant, très cohérent, où lumière, texture et rangement avancent ensemble.",
  location: "Île-de-France",
  highlight: "Carrelage ondulé artisanal et mobilier courbe sur mesure",
  projectType: "Salle de bain complète à dominante naturelle",
  categories: ["Salle de bain"],
  relatedService: { label: "Projet complet", href: "/services/projet-complet/" },
  relatedCategory: { label: "Voir les salles de bain sur mesure", href: "/realisations/categorie/salles-de-bain/" },
  cover: sdbSignature01,
  images: [sdbSignature01, sdbSignature02, sdbSignature03, sdbSignature04],
  isFeatured: true,
  editorialSize: "hero",
  editorialOrder: 1,
  futureDestination: "modal",
  needPoints: [
    "Rénover une salle de bain vieillissante",
    "Créer une ambiance spa haut de gamme",
    "Intégrer du rangement sans alourdir l'espace",
  ],
  constraintPoints: [
    "Espace rectangulaire compact",
    "Arrivées d'eau non déplaçables",
  ],
  solutionPoints: [
    "Carrelage ondulé artisanal pour un jeu de lumière naturel",
    "Mobilier courbe en chêne clair sur mesure",
    "Niches encastrées rétro-éclairées",
  ],
  keyChoices: [
    "Carrelage ondulé artisanal comme matière principale",
    "Mobilier courbe en chêne clair dessiné sur mesure",
    "Niches encastrées rétro-éclairées pour le rangement discret",
  ],
  galleryIntro: "Chaque détail, du carrelage ondulé au mobilier courbe, a été conçu pour créer une expérience sensorielle complète.",
  resultPoints: [
    "Ambiance spa apaisante au quotidien",
    "Rangement intégré et invisible",
    "Lumière naturelle magnifiée par les textures",
  ],
  clientFit: [
    "pour une salle de bain complète à repenser avec exigence",
    "pour un espace où le détail doit compter autant que l'usage",
    "pour une composition sur mesure qui doit rester calme et cohérente",
  ],
};

