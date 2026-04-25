/**
 * Source de vérité unique pour les métadonnées OG des fiches réalisations.
 * Fichier léger, sans import d'asset — importable par le plugin Vite de pré-rendu.
 */

export interface ProjectOgEntry {
  slug: string;
  title: string;
  excerpt: string;
  ogAlt: string;
}

export const PROJECT_OG_MANIFEST: readonly ProjectOgEntry[] = [
  {
    slug: "salle-de-bain-signature",
    title: "Salle de bain signature",
    excerpt: "Rénovation complète d'une salle de bain en tons naturels, carrelage ondulé et mobilier courbe contemporain.",
    ogAlt: "Salle de bain signature en tons naturels et carrelage ondulé — HFconcept",
  },
  {
    slug: "sdb-noire-combles",
    title: "Salle de bain noire sous combles",
    excerpt: "Un parti pris sombre et affirmé : carrelage noir grand format, niches LED et double vasque suspendue sous les toits.",
    ogAlt: "Salle de bain noire sous combles avec niches LED — HFconcept",
  },
  {
    slug: "chambre-sur-mesure-combles",
    title: "Chambre sur mesure sous combles",
    excerpt: "Tête de lit niches intégrées, touches de couleur vives et mobilier sur mesure optimisant chaque recoin sous pente.",
    ogAlt: "Chambre sous combles avec tête de lit architecturée — HFconcept",
  },
  {
    slug: "sejour-veranda-contemporain",
    title: "Séjour véranda contemporain",
    excerpt: "Espace repas panoramique avec îlot central, faux-plafond lumineux et stores jour-nuit sur baies vitrées.",
    ogAlt: "Séjour véranda contemporain avec faux-plafond lumineux — HFconcept",
  },
  {
    slug: "sejour-vertigo",
    title: "Séjour Vertigo",
    excerpt: "Salle à manger lumineuse avec suspension Vertigo, table en bois massif et claustra bois naturel.",
    ogAlt: "Séjour avec suspension Vertigo et claustra bois — HFconcept",
  },
  {
    slug: "sejour-marbre-dore",
    title: "Salon marbre & doré",
    excerpt: "Salon d'apparat sur sol marbre, meuble TV encastré avec cheminée et canapés cuir moutarde.",
    ogAlt: "Salon marbre et doré avec cheminée encastrée — HFconcept",
  },
  {
    slug: "sejour-bleu-canard",
    title: "Séjour bleu canard & moutarde",
    excerpt: "Pièce de vie contemporaine avec faux-plafond géométrique lumineux et jeux de couleurs vives assumées.",
    ogAlt: "Séjour bleu canard et moutarde avec faux-plafond géométrique — HFconcept",
  },
  {
    slug: "sejour-kaki-contemporain",
    title: "Séjour kaki contemporain",
    excerpt: "Espace ouvert cuisine-séjour en tons kaki, faux-plafond courbe rétro-éclairé et ambiance masculine affirmée.",
    ogAlt: "Séjour kaki contemporain avec faux-plafond courbe — HFconcept",
  },
  {
    slug: "sejour-bibliotheque-cheminee",
    title: "Séjour bibliothèque & cheminée",
    excerpt: "Salon chaleureux avec bibliothèque sur mesure teinte moutarde, cheminée encastrée et fauteuils cocooning.",
    ogAlt: "Séjour avec bibliothèque moutarde et cheminée — HFconcept",
  },
  {
    slug: "entree-sur-mesure-niche-bois",
    title: "Entrée sur mesure & niche bois",
    excerpt: "Meuble d'entrée intégré avec niche en chêne éclairée, rangements dissimulés et suspension filaire dorée.",
    ogAlt: "Entrée sur mesure avec niche bois rétro-éclairée — HFconcept",
  },
  {
    slug: "garde-corps-claustra-bois",
    title: "Garde-corps claustra bois",
    excerpt: "Escalier habillé avec garde-corps en lames de chêne verticales, apportant légèreté et rythme à la montée.",
    ogAlt: "Garde-corps claustra en lames de chêne — HFconcept",
  },
  {
    slug: "bibliotheque-vitrine-retro-eclairee",
    title: "Bibliothèque vitrine rétro-éclairée",
    excerpt: "Meuble bibliothèque du sol au plafond en teinte sombre avec niches éclairées pour collection d'objets d'art.",
    ogAlt: "Bibliothèque vitrine rétro-éclairée en teinte sombre — HFconcept",
  },
  {
    slug: "escalier-habille-bois-eclairage-integre",
    title: "Escalier habillé bois & éclairage intégré",
    excerpt: "Escalier en bois massif avec spots LED encastrés dans le mur, niches de rangement sous marches et finitions soignées.",
    ogAlt: "Escalier habillé bois avec éclairage LED intégré — HFconcept",
  },
  {
    slug: "chambre-ado-bureau-integre",
    title: "Chambre ado & bureau intégré",
    excerpt: "Espace jeune avec bureau sous pente, rangements intégrés, bibliothèque tasseaux et ambiance personnalisée.",
    ogAlt: "Chambre ado avec bureau intégré sous combles — HFconcept",
  },
  {
    slug: "dressing-sous-combles",
    title: "Dressing sous combles",
    excerpt: "Dressing optimisé sous pente avec rangements bas, étagères et plan de travail exploitant chaque recoin.",
    ogAlt: "Dressing optimisé sous combles — HFconcept",
  },
  {
    slug: "couloir-dressing-portes-coulissantes",
    title: "Couloir dressing & portes coulissantes",
    excerpt: "Aménagement couloir avec portes coulissantes sombres, claustra bois et transition fluide vers la salle de bain.",
    ogAlt: "Couloir dressing avec portes coulissantes et claustra — HFconcept",
  },
  {
    slug: "escalier-metal-tomettes-vertigo",
    title: "Escalier métal & tomettes anciennes",
    excerpt: "Espace double hauteur avec escalier métallique, poutre chêne apparente, suspension Vertigo et sol en tomettes anciennes.",
    ogAlt: "Escalier métal et tomettes anciennes en double hauteur — HFconcept",
  },
  {
    slug: "sdb-terrazzo-bleu-baignoire-ilot",
    title: "Salle de bain terrazzo & bleu",
    excerpt: "Salle de bain sous combles avec sol terrazzo, baignoire îlot, double vasque suspendue et robinetterie noire.",
    ogAlt: "Salle de bain terrazzo bleu avec baignoire îlot — HFconcept",
  },
  {
    slug: "douche-terrazzo-robinetterie-noire",
    title: "Douche terrazzo & robinetterie noire",
    excerpt: "Douche en terrazzo gris avec robinetterie noire mat, douchette et ciel de pluie grand format.",
    ogAlt: "Douche terrazzo gris et robinetterie noire mat — HFconcept",
  },
  {
    slug: "sdb-turquoise-sous-combles",
    title: "Salle de bain turquoise sous combles",
    excerpt: "Salle d'eau sous pente en carrelage écaille turquoise, miroir LED rond et meuble vasque blanc suspendu.",
    ogAlt: "Salle de bain turquoise sous combles avec carrelage écaille — HFconcept",
  },
  {
    slug: "sdb-grise-miroir-led",
    title: "Salle de bain grise & miroir LED",
    excerpt: "Salle de bain en carrelage gris vertical, miroir rond rétro-éclairé, meuble bois clair et douche vitrée.",
    ogAlt: "Salle de bain grise avec miroir LED rond — HFconcept",
  },
  {
    slug: "douche-italienne-zellige-beige",
    title: "Douche italienne & zellige beige",
    excerpt: "Grande douche à l'italienne avec zellige beige vertical, ciel de pluie encastré et sèche-serviettes design.",
    ogAlt: "Douche italienne en zellige beige — HFconcept",
  },
  {
    slug: "sdb-verte-baignoire-chevron",
    title: "Salle de bain verte & sol chevron",
    excerpt: "Salle de bain sous combles avec carrelage vert émeraude, sol chevron bois, baignoire encastrée et velux.",
    ogAlt: "Salle de bain verte émeraude avec sol chevron bois — HFconcept",
  },
  {
    slug: "sdb-beige-douche-italienne",
    title: "Salle de bain beige & douche italienne",
    excerpt: "Salle de bain épurée en tons beige, douche italienne vitrée, meuble suspendu et sèche-serviettes blanc.",
    ogAlt: "Salle de bain beige épurée avec douche italienne — HFconcept",
  },
  {
    slug: "sdb-grise-douche-baignoire",
    title: "Salle de bain grise douche & baignoire",
    excerpt: "Salle de bain complète en tons gris avec douche à l'italienne carrelage ondulé, baignoire encastrée et hublot décoratif.",
    ogAlt: "Salle de bain grise avec douche et baignoire — HFconcept",
  },
  {
    slug: "cuisine-faux-plafond-courbe",
    title: "Cuisine ouverte & faux-plafond courbe",
    excerpt: "Cuisine ouverte contemporaine avec faux-plafond courbe rétro-éclairé, îlot central marbre et colonnes intégrées.",
    ogAlt: "Cuisine ouverte avec faux-plafond courbe rétro-éclairé — HFconcept",
  },
  {
    slug: "cuisine-verte-granit",
    title: "Cuisine verte & plan granit",
    excerpt: "Cuisine en L avec façades vert sauge, plan de travail granit marbré, étagères ouvertes et éclairage sur rail.",
    ogAlt: "Cuisine verte sauge avec plan granit marbré — HFconcept",
  },
  {
    slug: "cuisine-colonne-chene-clair",
    title: "Cuisine colonnes chêne clair",
    excerpt: "Mur de colonnes en chêne clair avec électroménager encastré, poignées longues et finitions sans joint.",
    ogAlt: "Cuisine colonnes chêne clair du sol au plafond — HFconcept",
  },
  {
    slug: "cuisine-marbre-blanc-suspensions",
    title: "Cuisine marbre blanc & suspensions",
    excerpt: "Cuisine blanche avec plan de travail et crédence en marbre veiné, suspensions design et éclairage indirect.",
    ogAlt: "Cuisine marbre blanc avec suspensions design — HFconcept",
  },
  {
    slug: "cuisine-noire-chene-ilot",
    title: "Cuisine noire & chêne avec îlot",
    excerpt: "Cuisine en U avec façades noires, inserts chêne, crédence miroir fumé, îlot blanc prolongé d'un bar bois et séjour avec cheminée linéaire.",
    ogAlt: "Cuisine noire et chêne avec îlot bar — HFconcept",
  },
  {
    slug: "cuisine-bois-naturel-hexagones",
    title: "Cuisine bois naturel & sol hexagonal",
    excerpt: "Cuisine ouverte en chêne avec îlot table, suspensions en rotin, sol mixte hexagones blancs et parquet, niches déco éclairées et mur en pierre apparente.",
    ogAlt: "Cuisine bois naturel avec sol hexagonal — HFconcept",
  },
  {
    slug: "cuisine-blanche-faux-plafond-led",
    title: "Cuisine blanche & faux-plafond LED",
    excerpt: "Cuisine ouverte blanche avec îlot bar en chêne et noir, faux-plafond géométrique rétro-éclairé et sol hexagonal gris.",
    ogAlt: "Cuisine blanche avec faux-plafond LED géométrique — HFconcept",
  },
] as const;
