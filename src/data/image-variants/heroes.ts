/**
 * Hero image responsive variants.
 */

import type { ResponsiveImageVariant } from "@/components/common/OptimizedImage";

/* ── Hero Home (1920 px original) ── */
import heroHome640 from "@/assets/images/hero/hfconcept-hero-640w.webp";
import heroHome960 from "@/assets/images/hero/hfconcept-hero-960w.webp";
import heroHome1280 from "@/assets/images/hero/hfconcept-hero-1280w.webp";
import heroHomeOrig from "@/assets/images/hero/hfconcept-hero.webp";

export const HERO_HOME_VARIANTS: ResponsiveImageVariant[] = [
  { src: heroHome640, width: 640 },
  { src: heroHome960, width: 960 },
  { src: heroHome1280, width: 1280 },
  { src: heroHomeOrig, width: 1920 },
];

/* ── Hero Réalisations (1920 px original) ── */
import heroReals640 from "@/assets/images/hero/hero-realisations-640w.webp";
import heroReals960 from "@/assets/images/hero/hero-realisations-960w.webp";
import heroReals1280 from "@/assets/images/hero/hero-realisations-1280w.webp";
import heroRealsOrig from "@/assets/images/hero/hero-realisations.webp";

export const HERO_REALS_VARIANTS: ResponsiveImageVariant[] = [
  { src: heroReals640, width: 640 },
  { src: heroReals960, width: 960 },
  { src: heroReals1280, width: 1280 },
  { src: heroRealsOrig, width: 1920 },
];

/* ── Hero Services (1920 px original) ── */
import heroServices640 from "@/assets/images/hero/hero-services-640w.webp";
import heroServices960 from "@/assets/images/hero/hero-services-960w.webp";
import heroServices1280 from "@/assets/images/hero/hero-services-1280w.webp";
import heroServicesOrig from "@/assets/images/hero/hero-services.webp";

export const HERO_SERVICES_VARIANTS: ResponsiveImageVariant[] = [
  { src: heroServices640, width: 640 },
  { src: heroServices960, width: 960 },
  { src: heroServices1280, width: 1280 },
  { src: heroServicesOrig, width: 1920 },
];

/* ── Hero Studio (1920 px original) ── */
import heroStudio640 from "@/assets/images/hero/hero-studio-640w.webp";
import heroStudio960 from "@/assets/images/hero/hero-studio-960w.webp";
import heroStudio1280 from "@/assets/images/hero/hero-studio-1280w.webp";
import heroStudioOrig from "@/assets/images/hero/hero-studio.webp";

export const HERO_STUDIO_VARIANTS: ResponsiveImageVariant[] = [
  { src: heroStudio640, width: 640 },
  { src: heroStudio960, width: 960 },
  { src: heroStudio1280, width: 1280 },
  { src: heroStudioOrig, width: 1920 },
];

/* ── Hero Contact ── */
import heroContact640 from "@/assets/images/hero/hero-contact-640w.webp";
import heroContact960 from "@/assets/images/hero/hero-contact-960w.webp";
import heroContact1280 from "@/assets/images/hero/hero-contact-1280w.webp";
import heroContactOrig from "@/assets/images/hero/hero-contact.webp";

export const HERO_CONTACT_VARIANTS: ResponsiveImageVariant[] = [
  { src: heroContact640, width: 640 },
  { src: heroContact960, width: 960 },
  { src: heroContact1280, width: 1280 },
  { src: heroContactOrig, width: 1920 },
];

/* ── Hero Service Detail ── */
import heroSvcDetail640 from "@/assets/images/hero/hero-service-detail-640w.webp";
import heroSvcDetail960 from "@/assets/images/hero/hero-service-detail-960w.webp";
import heroSvcDetail1280 from "@/assets/images/hero/hero-service-detail-1280w.webp";
import heroSvcDetailOrig from "@/assets/images/hero/hero-service-detail.webp";

export const HERO_SERVICE_DETAIL_VARIANTS: ResponsiveImageVariant[] = [
  { src: heroSvcDetail640, width: 640 },
  { src: heroSvcDetail960, width: 960 },
  { src: heroSvcDetail1280, width: 1280 },
  { src: heroSvcDetailOrig, width: 1920 },
];

/* Original imports re-exported for registry map keys */
export {
  heroHomeOrig,
  heroRealsOrig,
  heroServicesOrig,
  heroStudioOrig,
  heroContactOrig,
  heroSvcDetailOrig,
};
