import type { ProjectContent } from "../types";

import chambreCombles01 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-01.webp";
import chambreCombles02 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-02.webp";
import chambreCombles03 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-03.webp";

export const chambreSurMesureComblesContent: ProjectContent = {
  title: "Chambre sur mesure sous combles",
  excerpt: "Tête de lit niches intégrées, touches de couleur vives et mobilier sur mesure optimisant chaque recoin sous pente.",
  description: "Chaque centimètre de cette chambre sous combles a été pensé pour conjuguer rangement, confort et personnalité. La tête de lit avec niches intégrées offre un éclairage d'ambiance chaleureux, complété par des touches de couleur qui dynamisent l'espace sans le surcharger.",
  projectContext: "Le projet devait faire d'un volume sous pente une vraie chambre complète, avec du rangement, une atmosphère calme et un dessin assez structuré pour éviter l'effet de pièce subie.",
  location: "Île-de-France",
  highlight: "Aménagement intégral sous pente avec tête de lit architecturée",
  projectType: "Chambre sous combles avec tête de lit intégrée",
  categories: ["Chambre", "Sur mesure"],
  relatedService: { label: "Projet complet", href: "/services/projet-complet/" },
  relatedCategory: { label: "Voir les chambres sur mesure", href: "/realisations/categorie/chambres/" },
  cover: chambreCombles01,
  images: [chambreCombles01, chambreCombles02, chambreCombles03],
  isFeatured: true,
  editorialSize: "standard",
  editorialOrder: 3,
  futureDestination: "modal",
  needPoints: [
    "Aménager une chambre confortable sous combles",
    "Maximiser le rangement dans un espace atypique",
    "Personnaliser l'ambiance avec des touches de couleur",
  ],
  constraintPoints: [
    "Pentes de toit réduisant la surface utile",
    "Peu de lumière naturelle latérale",
  ],
  solutionPoints: [
    "Tête de lit architecturée avec niches et éclairage intégrés",
    "Mobilier sur mesure épousant chaque recoin sous pente",
    "Palette de couleurs vives mais maîtrisées",
  ],
  keyChoices: [
    "Tête de lit architecturée sur toute la largeur",
    "Niches intégrées avec éclairage d'ambiance",
    "Rangements dessinés pour suivre la sous-pente",
  ],
  galleryIntro: "Un espace sous combles structuré du sol à la pente, avec tête de lit et rangements intégrés.",
  resultPoints: [
    "Volume de rangement doublé grâce au mobilier intégré",
    "Ambiance chaleureuse et personnalisée",
    "Chaque recoin exploité sans sensation d'encombrement",
  ],
  clientFit: [
    "pour une chambre sous combles qui doit gagner en clarté",
    "pour un espace nuit qui manque de rangement intégré",
    "pour une pièce à structurer sans l'alourdir",
  ],
};

