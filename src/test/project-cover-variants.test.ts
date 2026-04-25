import { describe, it, expect } from "vitest";
import { getImageVariants } from "@/data/image-variants";

// Import covers that were upgraded from 960w cap to 1200w
import sdbNoire01 from "@/assets/images/projects/sdb-noire-combles/hfconcept-sdb-noire-combles-01.webp";
import cuisineBlancheLed01 from "@/assets/images/projects/cuisine-blanche-faux-plafond-led/hfconcept-cuisine-blanche-led-01.webp";
import surMesure06 from "@/assets/images/projects/sur-mesure/hfconcept-sur-mesure-06.webp";

describe("Project cover variants exceed 960w when original is larger", () => {
  const cases = [
    { name: "sdb-noire-combles-01", src: sdbNoire01 },
    { name: "cuisine-blanche-led-01", src: cuisineBlancheLed01 },
    { name: "sur-mesure-06", src: surMesure06 },
  ];

  for (const { name, src } of cases) {
    it(`${name} has a variant wider than 960`, () => {
      const variants = getImageVariants(src);
      expect(variants).toBeDefined();
      expect(variants!.length).toBeGreaterThanOrEqual(3);

      const maxWidth = Math.max(...variants!.map((v) => v.width));
      expect(maxWidth).toBeGreaterThan(960);
    });

    it(`${name} widths are sorted ascending with no duplicates`, () => {
      const variants = getImageVariants(src)!;
      const widths = variants.map((v) => v.width);
      for (let i = 1; i < widths.length; i++) {
        expect(widths[i]).toBeGreaterThan(widths[i - 1]);
      }
    });
  }
});
