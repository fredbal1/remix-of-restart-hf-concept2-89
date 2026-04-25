/**
 * Service image responsive variants.
 */

import type { ResponsiveImageVariant } from "@/components/common/OptimizedImage";

import svcConseil640 from "@/assets/images/services/service-conseil-640w.webp";
import svcConseil960 from "@/assets/images/services/service-conseil-960w.webp";
import svcConseilOrig from "@/assets/images/services/service-conseil.webp";

import svcConception640 from "@/assets/images/services/service-conception-3d-640w.webp";
import svcConception960 from "@/assets/images/services/service-conception-3d-960w.webp";
import svcConceptionOrig from "@/assets/images/services/service-conception-3d.webp";

import svcComplet640 from "@/assets/images/services/service-projet-complet-640w.webp";
import svcComplet960 from "@/assets/images/services/service-projet-complet-960w.webp";
import svcCompletOrig from "@/assets/images/services/service-projet-complet.webp";

import svcDistance640 from "@/assets/images/services/service-projet-distance-640w.webp";
import svcDistance960 from "@/assets/images/services/service-projet-distance-960w.webp";
import svcDistance1280 from "@/assets/images/services/service-projet-distance-1280w.webp";
import svcDistanceOrig from "@/assets/images/services/service-projet-distance.webp";

export const SVC_CONSEIL_VARIANTS: ResponsiveImageVariant[] = [
  { src: svcConseil640, width: 640 },
  { src: svcConseil960, width: 960 },
  { src: svcConseilOrig, width: 1024 },
];

export const SVC_CONCEPTION_VARIANTS: ResponsiveImageVariant[] = [
  { src: svcConception640, width: 640 },
  { src: svcConception960, width: 960 },
  { src: svcConceptionOrig, width: 1024 },
];

export const SVC_COMPLET_VARIANTS: ResponsiveImageVariant[] = [
  { src: svcComplet640, width: 640 },
  { src: svcComplet960, width: 960 },
  { src: svcCompletOrig, width: 1024 },
];

export const SVC_DISTANCE_VARIANTS: ResponsiveImageVariant[] = [
  { src: svcDistance640, width: 640 },
  { src: svcDistance960, width: 960 },
  { src: svcDistance1280, width: 1280 },
  { src: svcDistanceOrig, width: 1920 },
];

export {
  svcConseilOrig,
  svcConceptionOrig,
  svcCompletOrig,
  svcDistanceOrig,
};
