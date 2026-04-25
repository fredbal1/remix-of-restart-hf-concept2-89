/**
 * Brand asset responsive variants (logo header / footer).
 */

import type { ResponsiveImageVariant } from "@/components/common/OptimizedImage";

import logo240 from "@/assets/logo_hfconcept-240w.webp";
import logo400 from "@/assets/logo_hfconcept-400w.webp";
import logo640 from "@/assets/logo_hfconcept-640w.webp";
import logoOrig from "@/assets/logo_hfconcept.webp";

export const LOGO_HFCONCEPT_VARIANTS: ResponsiveImageVariant[] = [
  { src: logo240, width: 240 },
  { src: logo400, width: 400 },
  { src: logo640, width: 640 },
  { src: logoOrig, width: 960 },
];

export { logoOrig as logoHfconceptOrig };
