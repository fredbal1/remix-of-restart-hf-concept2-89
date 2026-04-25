/**
 * Séjour project image responsive variants.
 */

import type { ResponsiveImageVariant } from "@/components/common/OptimizedImage";

// ── sejour-veranda-contemporain ──

import sejourVeranda01Orig from "@/assets/images/projects/sejour-veranda-contemporain/hfconcept-sejour-veranda-01.webp";
import sejourVeranda01_640 from "@/assets/images/projects/sejour-veranda-contemporain/hfconcept-sejour-veranda-01-640w.webp";
import sejourVeranda01_960 from "@/assets/images/projects/sejour-veranda-contemporain/hfconcept-sejour-veranda-01-960w.webp";

import sejourVeranda02Orig from "@/assets/images/projects/sejour-veranda-contemporain/hfconcept-sejour-veranda-02.webp";
import sejourVeranda02_640 from "@/assets/images/projects/sejour-veranda-contemporain/hfconcept-sejour-veranda-02-640w.webp";
import sejourVeranda02_960 from "@/assets/images/projects/sejour-veranda-contemporain/hfconcept-sejour-veranda-02-960w.webp";
import sejourVeranda02_1280 from "@/assets/images/projects/sejour-veranda-contemporain/hfconcept-sejour-veranda-02-1280w.webp";

// ── sejour-vertigo ──

import sejourVertigo01Orig from "@/assets/images/projects/sejour-vertigo/hfconcept-sejour-vertigo-01.webp";
import sejourVertigo01_640 from "@/assets/images/projects/sejour-vertigo/hfconcept-sejour-vertigo-01-640w.webp";
import sejourVertigo01_960 from "@/assets/images/projects/sejour-vertigo/hfconcept-sejour-vertigo-01-960w.webp";

// ── sejour-marbre-dore ──

import sejourMarbre01Orig from "@/assets/images/projects/sejour-marbre-dore/hfconcept-sejour-marbre-dore-01.webp";
import sejourMarbre01_640 from "@/assets/images/projects/sejour-marbre-dore/hfconcept-sejour-marbre-dore-01-640w.webp";
import sejourMarbre01_960 from "@/assets/images/projects/sejour-marbre-dore/hfconcept-sejour-marbre-dore-01-960w.webp";
import sejourMarbre01_1280 from "@/assets/images/projects/sejour-marbre-dore/hfconcept-sejour-marbre-dore-01-1280w.webp";

// ── sejour-bleu-canard ──

import sejourBleu01Orig from "@/assets/images/projects/sejour-bleu-canard/hfconcept-sejour-bleu-canard-01.webp";
import sejourBleu01_640 from "@/assets/images/projects/sejour-bleu-canard/hfconcept-sejour-bleu-canard-01-640w.webp";
import sejourBleu01_960 from "@/assets/images/projects/sejour-bleu-canard/hfconcept-sejour-bleu-canard-01-960w.webp";

// ── sejour-kaki-contemporain ──

import sejourKaki01Orig from "@/assets/images/projects/sejour-kaki-contemporain/hfconcept-sejour-kaki-contemporain-01.webp";
import sejourKaki01_640 from "@/assets/images/projects/sejour-kaki-contemporain/hfconcept-sejour-kaki-contemporain-01-640w.webp";
import sejourKaki01_960 from "@/assets/images/projects/sejour-kaki-contemporain/hfconcept-sejour-kaki-contemporain-01-960w.webp";
import sejourKaki01_1280 from "@/assets/images/projects/sejour-kaki-contemporain/hfconcept-sejour-kaki-contemporain-01-1280w.webp";

// ── sejour-bibliotheque-cheminee ──

import sejourBiblio01Orig from "@/assets/images/projects/sejour-bibliotheque-cheminee/hfconcept-sejour-bibliotheque-cheminee-01.webp";
import sejourBiblio01_640 from "@/assets/images/projects/sejour-bibliotheque-cheminee/hfconcept-sejour-bibliotheque-cheminee-01-640w.webp";
import sejourBiblio01_960 from "@/assets/images/projects/sejour-bibliotheque-cheminee/hfconcept-sejour-bibliotheque-cheminee-01-960w.webp";
import sejourBiblio01_1280 from "@/assets/images/projects/sejour-bibliotheque-cheminee/hfconcept-sejour-bibliotheque-cheminee-01-1280w.webp";

// ═══════════════════════════════════════════════════════════════════════════
// Registry entries
// ═══════════════════════════════════════════════════════════════════════════

export const SEJOUR_PROJECT_VARIANT_ENTRIES: [string, ResponsiveImageVariant[]][] = [
  // sejour-veranda-contemporain
  [sejourVeranda01Orig, [
    { src: sejourVeranda01_640, width: 640 },
    { src: sejourVeranda01_960, width: 960 },
    { src: sejourVeranda01Orig, width: 1200 },
  ]],
  [sejourVeranda02Orig, [
    { src: sejourVeranda02_640, width: 640 },
    { src: sejourVeranda02_960, width: 960 },
    { src: sejourVeranda02_1280, width: 1280 },
  ]],

  // sejour-vertigo
  [sejourVertigo01Orig, [
    { src: sejourVertigo01_640, width: 640 },
    { src: sejourVertigo01_960, width: 960 },
    { src: sejourVertigo01Orig, width: 1200 },
  ]],

  // sejour-marbre-dore
  [sejourMarbre01Orig, [
    { src: sejourMarbre01_640, width: 640 },
    { src: sejourMarbre01_960, width: 960 },
    { src: sejourMarbre01_1280, width: 1280 },
  ]],

  // sejour-bleu-canard
  [sejourBleu01Orig, [
    { src: sejourBleu01_640, width: 640 },
    { src: sejourBleu01_960, width: 960 },
    { src: sejourBleu01Orig, width: 1200 },
  ]],

  // sejour-kaki-contemporain
  [sejourKaki01Orig, [
    { src: sejourKaki01_640, width: 640 },
    { src: sejourKaki01_960, width: 960 },
    { src: sejourKaki01_1280, width: 1280 },
  ]],

  // sejour-bibliotheque-cheminee
  [sejourBiblio01Orig, [
    { src: sejourBiblio01_640, width: 640 },
    { src: sejourBiblio01_960, width: 960 },
    { src: sejourBiblio01_1280, width: 1280 },
  ]],
];
