/**
 * Project image variants — barrel file.
 * Assembles category-level entries into a single PROJECT_VARIANT_ENTRIES array.
 */

import type { ResponsiveImageVariant } from "@/components/common/OptimizedImage";

import { CUISINE_PROJECT_VARIANT_ENTRIES, CUISINE_NOIRE_APRES_1_VARIANTS } from "./cuisines";
import { SALLE_DE_BAIN_PROJECT_VARIANT_ENTRIES } from "./salles-de-bain";
import { SEJOUR_PROJECT_VARIANT_ENTRIES } from "./sejours";
import { CHAMBRE_PROJECT_VARIANT_ENTRIES } from "./chambres";
import { SUR_MESURE_PROJECT_VARIANT_ENTRIES } from "./sur-mesure";

export { CUISINE_NOIRE_APRES_1_VARIANTS };

export const PROJECT_VARIANT_ENTRIES: [string, ResponsiveImageVariant[]][] = [
  ...CUISINE_PROJECT_VARIANT_ENTRIES,
  ...SALLE_DE_BAIN_PROJECT_VARIANT_ENTRIES,
  ...CHAMBRE_PROJECT_VARIANT_ENTRIES,
  ...SEJOUR_PROJECT_VARIANT_ENTRIES,
  ...SUR_MESURE_PROJECT_VARIANT_ENTRIES,
];
