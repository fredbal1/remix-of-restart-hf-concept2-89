// ---------------------------------------------------------------------------
// Projects — barrel file
// Assembles PROJECTS from manifest order + per-project content files.
// ---------------------------------------------------------------------------

import { PROJECT_MANIFEST } from "@/data/projects-manifest";
import type { Project, ProjectContent } from "./types";

// ── Item imports ──────────────────────────────────────────────────────────

import { salleDebainSignatureContent } from "./items/salle-de-bain-signature";
import { sdbNoireComblesContent } from "./items/sdb-noire-combles";
import { chambreSurMesureComblesContent } from "./items/chambre-sur-mesure-combles";
import { sejourVerandaContemporainContent } from "./items/sejour-veranda-contemporain";
import { sejourVertigoContent } from "./items/sejour-vertigo";
import { sejourMarbreContent } from "./items/sejour-marbre-dore";
import { sejourBleuCanardContent } from "./items/sejour-bleu-canard";
import { sejourKakiContemporainContent } from "./items/sejour-kaki-contemporain";
import { sejourBibliothequeChemineeContent } from "./items/sejour-bibliotheque-cheminee";
import { entreeSurMesureNicheBoisContent } from "./items/entree-sur-mesure-niche-bois";
import { gardeCorpsClaustaBoisContent } from "./items/garde-corps-claustra-bois";
import { bibliothequeVitrineRetroEclaireeContent } from "./items/bibliotheque-vitrine-retro-eclairee";
import { escalierHabilleBoisEclairageIntegreContent } from "./items/escalier-habille-bois-eclairage-integre";
import { chambreAdoBureauIntegreContent } from "./items/chambre-ado-bureau-integre";
import { dressingSousComblesContent } from "./items/dressing-sous-combles";
import { couloirDressingPortesCoulissantesContent } from "./items/couloir-dressing-portes-coulissantes";
import { escalierMetalTomettesVertigoContent } from "./items/escalier-metal-tomettes-vertigo";
import { sdbTerrazzoBleuBaignoireIlotContent } from "./items/sdb-terrazzo-bleu-baignoire-ilot";
import { doucheTerrazzoRobinetterieNoireContent } from "./items/douche-terrazzo-robinetterie-noire";
import { sdbTurquoiseSousComblesContent } from "./items/sdb-turquoise-sous-combles";
import { sdbGriseMiroirLedContent } from "./items/sdb-grise-miroir-led";
import { doucheItalienneZelligeBeigeContent } from "./items/douche-italienne-zellige-beige";
import { sdbVerteBaignoireChevronContent } from "./items/sdb-verte-baignoire-chevron";
import { sdbBeigeDoucheItalienneContent } from "./items/sdb-beige-douche-italienne";
import { sdbGriseDoucheBaignoireContent } from "./items/sdb-grise-douche-baignoire";
import { cuisineFauxPlafondCourbeContent } from "./items/cuisine-faux-plafond-courbe";
import { cuisineVerteGranitContent } from "./items/cuisine-verte-granit";
import { cuisineColonneCheneClairContent } from "./items/cuisine-colonne-chene-clair";
import { cuisineMarbreBlancSuspensionsContent } from "./items/cuisine-marbre-blanc-suspensions";
import { cuisineNoireCheneIlotContent } from "./items/cuisine-noire-chene-ilot";
import { cuisineBoisNaturelHexagonesContent } from "./items/cuisine-bois-naturel-hexagones";
import { cuisineBlancheFauxPlafondLedContent } from "./items/cuisine-blanche-faux-plafond-led";

// ── Re-exports ────────────────────────────────────────────────────────────

export { PROJECT_CATEGORIES, PROJECT_CATEGORY_ROUTES, getCategoryRouteBySlug } from "./categories";
export type { ProjectCategoryRoute } from "./categories";
export type { Project, ProjectCategory, EditorialSize, ProjectDestination } from "./types";

// ── Content map ───────────────────────────────────────────────────────────

const PROJECT_CONTENT_BY_SLUG: Record<string, ProjectContent> = {
  "salle-de-bain-signature": salleDebainSignatureContent,
  "sdb-noire-combles": sdbNoireComblesContent,
  "chambre-sur-mesure-combles": chambreSurMesureComblesContent,
  "sejour-veranda-contemporain": sejourVerandaContemporainContent,
  "sejour-vertigo": sejourVertigoContent,
  "sejour-marbre-dore": sejourMarbreContent,
  "sejour-bleu-canard": sejourBleuCanardContent,
  "sejour-kaki-contemporain": sejourKakiContemporainContent,
  "sejour-bibliotheque-cheminee": sejourBibliothequeChemineeContent,
  "entree-sur-mesure-niche-bois": entreeSurMesureNicheBoisContent,
  "garde-corps-claustra-bois": gardeCorpsClaustaBoisContent,
  "bibliotheque-vitrine-retro-eclairee": bibliothequeVitrineRetroEclaireeContent,
  "escalier-habille-bois-eclairage-integre": escalierHabilleBoisEclairageIntegreContent,
  "chambre-ado-bureau-integre": chambreAdoBureauIntegreContent,
  "dressing-sous-combles": dressingSousComblesContent,
  "couloir-dressing-portes-coulissantes": couloirDressingPortesCoulissantesContent,
  "escalier-metal-tomettes-vertigo": escalierMetalTomettesVertigoContent,
  "sdb-terrazzo-bleu-baignoire-ilot": sdbTerrazzoBleuBaignoireIlotContent,
  "douche-terrazzo-robinetterie-noire": doucheTerrazzoRobinetterieNoireContent,
  "sdb-turquoise-sous-combles": sdbTurquoiseSousComblesContent,
  "sdb-grise-miroir-led": sdbGriseMiroirLedContent,
  "douche-italienne-zellige-beige": doucheItalienneZelligeBeigeContent,
  "sdb-verte-baignoire-chevron": sdbVerteBaignoireChevronContent,
  "sdb-beige-douche-italienne": sdbBeigeDoucheItalienneContent,
  "sdb-grise-douche-baignoire": sdbGriseDoucheBaignoireContent,
  "cuisine-faux-plafond-courbe": cuisineFauxPlafondCourbeContent,
  "cuisine-verte-granit": cuisineVerteGranitContent,
  "cuisine-colonne-chene-clair": cuisineColonneCheneClairContent,
  "cuisine-marbre-blanc-suspensions": cuisineMarbreBlancSuspensionsContent,
  "cuisine-noire-chene-ilot": cuisineNoireCheneIlotContent,
  "cuisine-bois-naturel-hexagones": cuisineBoisNaturelHexagonesContent,
  "cuisine-blanche-faux-plafond-led": cuisineBlancheFauxPlafondLedContent,
};

// ── Strict sync check ─────────────────────────────────────────────────────

const manifestSlugs = new Set(PROJECT_MANIFEST.map((p) => p.slug));
const contentSlugs = new Set(Object.keys(PROJECT_CONTENT_BY_SLUG));

for (const s of manifestSlugs) {
  if (!contentSlugs.has(s)) {
    throw new Error(`PROJECT_MANIFEST slug "${s}" has no entry in PROJECT_CONTENT_BY_SLUG`);
  }
}
for (const s of contentSlugs) {
  if (!manifestSlugs.has(s)) {
    throw new Error(`PROJECT_CONTENT_BY_SLUG key "${s}" is not in PROJECT_MANIFEST`);
  }
}

// ── Derive PROJECTS from manifest (order = manifest order) ────────────────

export const PROJECTS: Project[] = PROJECT_MANIFEST.map(({ slug }) => ({
  slug,
  ...PROJECT_CONTENT_BY_SLUG[slug],
}));

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
