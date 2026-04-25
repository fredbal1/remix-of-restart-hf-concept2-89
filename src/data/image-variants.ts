/**
 * image-variants.ts — Public barrel for responsive image variants (v2 — modular projects).
 *
 * Usage:
 *   import { getImageVariants } from "@/data/image-variants";
 *   <OptimizedImage src={img} variants={getImageVariants(img)} ... />
 */

export {
  HERO_HOME_VARIANTS,
  HERO_REALS_VARIANTS,
  HERO_SERVICES_VARIANTS,
  HERO_STUDIO_VARIANTS,
} from "./image-variants/heroes";

export { CUISINE_NOIRE_APRES_1_VARIANTS } from "./image-variants/projects";

export { getImageVariants } from "./image-variants/registry";
