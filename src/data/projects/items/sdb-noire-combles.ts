import type { ProjectContent } from "../types";

import sdbNoire01 from "@/assets/images/projects/sdb-noire-combles/hfconcept-sdb-noire-combles-01.webp";
import sdbNoire02 from "@/assets/images/projects/sdb-noire-combles/hfconcept-sdb-noire-combles-02.webp";
import sdbNoire03 from "@/assets/images/projects/sdb-noire-combles/hfconcept-sdb-noire-combles-03.webp";

export const sdbNoireComblesContent: ProjectContent = {
  title: "Salle de bain noire sous combles",
  excerpt: "Un parti pris sombre et affirmé : carrelage noir grand format, niches LED et double vasque suspendue sous les toits.",
  description: "Transformer des combles en une salle de bain complète exigeait de composer avec les contraintes de hauteur sous plafond. Le choix du noir grand format agrandit visuellement l'espace, tandis que les niches rétro-éclairées créent des respirations lumineuses stratégiques.",
  projectContext: "Le projet devait installer une vraie salle de bain sous les toits, avec un parti pris sombre assumé. L'enjeu était de tirer parti des zones hautes et basses sans sacrifier la sensation d'espace.",
  location: "Paris",
  highlight: "Double vasque suspendue et niches intégrées sous la pente",
  projectType: "Salle de bain sous combles à dominante sombre",
  categories: ["Salle de bain"],
  relatedService: { label: "Projet complet", href: "/services/projet-complet/" },
  relatedCategory: { label: "Voir les salles de bain sur mesure", href: "/realisations/categorie/salles-de-bain/" },
  cover: sdbNoire01,
  images: [sdbNoire01, sdbNoire02, sdbNoire03],
  isFeatured: true,
  editorialSize: "standard",
  editorialOrder: 5,
  futureDestination: "modal",
  needPoints: [
    "Créer une salle de bain complète sous combles",
    "Affirmer un parti pris esthétique fort",
  ],
  constraintPoints: [
    "Hauteur sous plafond limitée et variable",
    "Configuration sous pente imposant des zones basses",
  ],
  solutionPoints: [
    "Carrelage noir grand format pour agrandir visuellement",
    "Niches LED stratégiques pour compenser le manque de lumière",
    "Double vasque suspendue dégageant le sol",
  ],
  keyChoices: [
    "Carrelage noir grand format sur les volumes clés",
    "Niches rétro-éclairées pour rythmer la sous-pente",
    "Double vasque suspendue pour libérer la lecture au sol",
  ],
  galleryIntro: "Le noir comme fil conducteur, la lumière comme contrepoint.",
  resultPoints: [
    "Sensation d'espace malgré la configuration sous pente",
    "Éclairage d'ambiance maîtrisé grâce aux niches LED",
    "Esthétique affirmée et cohérente du sol au plafond",
  ],
  clientFit: [
    "pour une salle de bain sous combles à rendre plus lisible",
    "pour un projet qui assume un parti pris sombre sans se refermer",
    "pour un espace sous pente qui doit rester confortable au quotidien",
  ],
};

