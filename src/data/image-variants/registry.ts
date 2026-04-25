/**
 * Central variant registry — assembles all category sub-files into a single Map.
 */

import type { ResponsiveImageVariant } from "@/components/common/OptimizedImage";

import {
  heroHomeOrig, HERO_HOME_VARIANTS,
  heroRealsOrig, HERO_REALS_VARIANTS,
  heroServicesOrig, HERO_SERVICES_VARIANTS,
  heroStudioOrig, HERO_STUDIO_VARIANTS,
  heroContactOrig, HERO_CONTACT_VARIANTS,
  heroSvcDetailOrig, HERO_SERVICE_DETAIL_VARIANTS,
} from "./heroes";

import {
  svcConseilOrig, SVC_CONSEIL_VARIANTS,
  svcConceptionOrig, SVC_CONCEPTION_VARIANTS,
  svcCompletOrig, SVC_COMPLET_VARIANTS,
  svcDistanceOrig, SVC_DISTANCE_VARIANTS,
} from "./services";

import { PROJECT_VARIANT_ENTRIES } from "./projects";

import { logoHfconceptOrig, LOGO_HFCONCEPT_VARIANTS } from "./brand";

const VARIANT_MAP = new Map<string, ResponsiveImageVariant[]>([
  // Brand
  [logoHfconceptOrig, LOGO_HFCONCEPT_VARIANTS],

  // Heroes
  [heroHomeOrig, HERO_HOME_VARIANTS],
  [heroRealsOrig, HERO_REALS_VARIANTS],
  [heroServicesOrig, HERO_SERVICES_VARIANTS],
  [heroStudioOrig, HERO_STUDIO_VARIANTS],
  [heroContactOrig, HERO_CONTACT_VARIANTS],
  [heroSvcDetailOrig, HERO_SERVICE_DETAIL_VARIANTS],

  // Services
  [svcConseilOrig, SVC_CONSEIL_VARIANTS],
  [svcConceptionOrig, SVC_CONCEPTION_VARIANTS],
  [svcCompletOrig, SVC_COMPLET_VARIANTS],
  [svcDistanceOrig, SVC_DISTANCE_VARIANTS],

  // Projects
  ...PROJECT_VARIANT_ENTRIES,
]);

/**
 * Look up responsive variants for a given image source.
 *
 * @param src — The original image import (Vite-resolved URL string)
 * @returns The variant array if registered, otherwise `undefined`.
 *
 * When `undefined`, `OptimizedImage` uses `src` alone — no fake srcSet.
 */
export function getImageVariants(
  src?: string,
): ResponsiveImageVariant[] | undefined {
  if (!src) return undefined;
  return VARIANT_MAP.get(src);
}
