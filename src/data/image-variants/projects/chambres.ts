/**
 * Chambre project image responsive variants.
 */

import type { ResponsiveImageVariant } from "@/components/common/OptimizedImage";

// ── chambre-sur-mesure-combles ──

import chambreCombles01Orig from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-01.webp";
import chambreCombles01_640 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-01-640w.webp";
import chambreCombles01_960 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-01-960w.webp";

import chambreCombles02Orig from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-02.webp";
import chambreCombles02_640 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-02-640w.webp";
import chambreCombles02_960 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-02-960w.webp";
import chambreCombles02_1280 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-02-1280w.webp";

import chambreCombles03Orig from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-03.webp";
import chambreCombles03_640 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-03-640w.webp";
import chambreCombles03_960 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-03-960w.webp";
import chambreCombles03_1280 from "@/assets/images/projects/chambre-sur-mesure-combles/hfconcept-chambre-combles-03-1280w.webp";

// ═══════════════════════════════════════════════════════════════════════════
// Registry entries
// ═══════════════════════════════════════════════════════════════════════════

export const CHAMBRE_PROJECT_VARIANT_ENTRIES: [string, ResponsiveImageVariant[]][] = [
  // chambre-sur-mesure-combles
  [chambreCombles01Orig, [
    { src: chambreCombles01_640, width: 640 },
    { src: chambreCombles01_960, width: 960 },
    { src: chambreCombles01Orig, width: 1200 },
  ]],
  [chambreCombles02Orig, [
    { src: chambreCombles02_640, width: 640 },
    { src: chambreCombles02_960, width: 960 },
    { src: chambreCombles02_1280, width: 1280 },
  ]],
  [chambreCombles03Orig, [
    { src: chambreCombles03_640, width: 640 },
    { src: chambreCombles03_960, width: 960 },
    { src: chambreCombles03_1280, width: 1280 },
  ]],
];
