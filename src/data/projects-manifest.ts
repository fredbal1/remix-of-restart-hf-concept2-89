/**
 * Source canonique légère des métadonnées structurelles projets.
 * Aucun import d'asset — utilisable par les scripts de build.
 *
 * L'enrichissement métier (titre, images, catégories…)
 * vit dans projects.ts et dérive de ce manifest par slug.
 */

export interface ProjectManifestEntry {
  slug: string;
  updatedAt: string;
}

export const PROJECT_MANIFEST: readonly ProjectManifestEntry[] = [
  { slug: "salle-de-bain-signature", updatedAt: "2026-04-22" },
  { slug: "sdb-noire-combles", updatedAt: "2026-04-22" },
  { slug: "chambre-sur-mesure-combles", updatedAt: "2026-04-22" },
  { slug: "sejour-veranda-contemporain", updatedAt: "2026-04-22" },
  { slug: "sejour-vertigo", updatedAt: "2026-04-22" },
  { slug: "sejour-marbre-dore", updatedAt: "2026-04-22" },
  { slug: "sejour-bleu-canard", updatedAt: "2026-04-22" },
  { slug: "sejour-kaki-contemporain", updatedAt: "2026-04-22" },
  { slug: "sejour-bibliotheque-cheminee", updatedAt: "2026-04-22" },
  { slug: "entree-sur-mesure-niche-bois", updatedAt: "2026-04-22" },
  { slug: "garde-corps-claustra-bois", updatedAt: "2026-04-22" },
  { slug: "bibliotheque-vitrine-retro-eclairee", updatedAt: "2026-04-22" },
  { slug: "escalier-habille-bois-eclairage-integre", updatedAt: "2026-04-22" },
  { slug: "chambre-ado-bureau-integre", updatedAt: "2026-04-22" },
  { slug: "dressing-sous-combles", updatedAt: "2026-04-22" },
  { slug: "couloir-dressing-portes-coulissantes", updatedAt: "2026-04-22" },
  { slug: "escalier-metal-tomettes-vertigo", updatedAt: "2026-04-22" },
  { slug: "sdb-terrazzo-bleu-baignoire-ilot", updatedAt: "2026-04-22" },
  { slug: "douche-terrazzo-robinetterie-noire", updatedAt: "2026-04-22" },
  { slug: "sdb-turquoise-sous-combles", updatedAt: "2026-04-22" },
  { slug: "sdb-grise-miroir-led", updatedAt: "2026-04-22" },
  { slug: "douche-italienne-zellige-beige", updatedAt: "2026-04-22" },
  { slug: "sdb-verte-baignoire-chevron", updatedAt: "2026-04-22" },
  { slug: "sdb-beige-douche-italienne", updatedAt: "2026-04-22" },
  { slug: "sdb-grise-douche-baignoire", updatedAt: "2026-04-22" },
  { slug: "cuisine-faux-plafond-courbe", updatedAt: "2026-04-22" },
  { slug: "cuisine-verte-granit", updatedAt: "2026-04-22" },
  { slug: "cuisine-colonne-chene-clair", updatedAt: "2026-04-22" },
  { slug: "cuisine-marbre-blanc-suspensions", updatedAt: "2026-04-22" },
  { slug: "cuisine-noire-chene-ilot", updatedAt: "2026-04-06" },
  { slug: "cuisine-bois-naturel-hexagones", updatedAt: "2026-04-22" },
  { slug: "cuisine-blanche-faux-plafond-led", updatedAt: "2026-04-22" },
] as const;
