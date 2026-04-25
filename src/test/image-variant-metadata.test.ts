import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  HERO_CONTACT_VARIANTS,
  HERO_HOME_VARIANTS,
  HERO_REALS_VARIANTS,
  HERO_SERVICE_DETAIL_VARIANTS,
  HERO_SERVICES_VARIANTS,
  HERO_STUDIO_VARIANTS,
} from "@/data/image-variants/heroes";
import {
  SVC_COMPLET_VARIANTS,
  SVC_CONCEPTION_VARIANTS,
  SVC_CONSEIL_VARIANTS,
  SVC_DISTANCE_VARIANTS,
} from "@/data/image-variants/services";

function readUInt24LE(buffer: Uint8Array, offset: number) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function getJpegDimensions(buffer: Buffer) {
  let offset = 2;

  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) {
      offset += 1;
    }

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd8 || marker === 0xd9) {
      continue;
    }

    const segmentLength = buffer.readUInt16BE(offset);
    offset += 2;

    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        width: buffer.readUInt16BE(offset + 3),
        height: buffer.readUInt16BE(offset + 1),
      };
    }

    offset += segmentLength - 2;
  }

  throw new Error("Unsupported JPEG image");
}

function getWebpDimensions(buffer: Buffer) {
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataStart = offset + 8;

    if (chunkType === "VP8 ") {
      const frameStart = dataStart + 6;

      return {
        width: buffer.readUInt16LE(frameStart) & 0x3fff,
        height: buffer.readUInt16LE(frameStart + 2) & 0x3fff,
      };
    }

    if (chunkType === "VP8L") {
      const b0 = buffer[dataStart + 1];
      const b1 = buffer[dataStart + 2];
      const b2 = buffer[dataStart + 3];
      const b3 = buffer[dataStart + 4];

      return {
        width: 1 + (((b1 & 0x3f) << 8) | b0),
        height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
      };
    }

    if (chunkType === "VP8X") {
      return {
        width: 1 + readUInt24LE(buffer, dataStart + 4),
        height: 1 + readUInt24LE(buffer, dataStart + 7),
      };
    }

    offset = dataStart + chunkSize + (chunkSize % 2);
  }

  throw new Error("Unsupported WEBP image");
}

function getImageDimensions(relativePath: string) {
  const filePath = resolve(process.cwd(), relativePath);
  const buffer = readFileSync(filePath);

  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return getWebpDimensions(buffer);
  }

  // Some repo originals keep a .webp extension even though the bytes are JPEG.
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    return getJpegDimensions(buffer);
  }

  throw new Error(`Unsupported image signature for ${relativePath}`);
}

const VARIANT_GROUPS = [
  {
    name: "SVC_CONSEIL_VARIANTS",
    variants: SVC_CONSEIL_VARIANTS,
    files: [
      "src/assets/images/services/service-conseil-640w.webp",
      "src/assets/images/services/service-conseil-960w.webp",
      "src/assets/images/services/service-conseil.webp",
    ],
  },
  {
    name: "SVC_CONCEPTION_VARIANTS",
    variants: SVC_CONCEPTION_VARIANTS,
    files: [
      "src/assets/images/services/service-conception-3d-640w.webp",
      "src/assets/images/services/service-conception-3d-960w.webp",
      "src/assets/images/services/service-conception-3d.webp",
    ],
  },
  {
    name: "SVC_COMPLET_VARIANTS",
    variants: SVC_COMPLET_VARIANTS,
    files: [
      "src/assets/images/services/service-projet-complet-640w.webp",
      "src/assets/images/services/service-projet-complet-960w.webp",
      "src/assets/images/services/service-projet-complet.webp",
    ],
  },
  {
    name: "SVC_DISTANCE_VARIANTS",
    variants: SVC_DISTANCE_VARIANTS,
    files: [
      "src/assets/images/services/service-projet-distance-640w.webp",
      "src/assets/images/services/service-projet-distance-960w.webp",
      "src/assets/images/services/service-projet-distance-1280w.webp",
      "src/assets/images/services/service-projet-distance.webp",
    ],
  },
  {
    name: "HERO_HOME_VARIANTS",
    variants: HERO_HOME_VARIANTS,
    files: [
      "src/assets/images/hero/hfconcept-hero-640w.webp",
      "src/assets/images/hero/hfconcept-hero-960w.webp",
      "src/assets/images/hero/hfconcept-hero-1280w.webp",
      "src/assets/images/hero/hfconcept-hero.webp",
    ],
  },
  {
    name: "HERO_REALS_VARIANTS",
    variants: HERO_REALS_VARIANTS,
    files: [
      "src/assets/images/hero/hero-realisations-640w.webp",
      "src/assets/images/hero/hero-realisations-960w.webp",
      "src/assets/images/hero/hero-realisations-1280w.webp",
      "src/assets/images/hero/hero-realisations.webp",
    ],
  },
  {
    name: "HERO_SERVICES_VARIANTS",
    variants: HERO_SERVICES_VARIANTS,
    files: [
      "src/assets/images/hero/hero-services-640w.webp",
      "src/assets/images/hero/hero-services-960w.webp",
      "src/assets/images/hero/hero-services-1280w.webp",
      "src/assets/images/hero/hero-services.webp",
    ],
  },
  {
    name: "HERO_STUDIO_VARIANTS",
    variants: HERO_STUDIO_VARIANTS,
    files: [
      "src/assets/images/hero/hero-studio-640w.webp",
      "src/assets/images/hero/hero-studio-960w.webp",
      "src/assets/images/hero/hero-studio-1280w.webp",
      "src/assets/images/hero/hero-studio.webp",
    ],
  },
  {
    name: "HERO_CONTACT_VARIANTS",
    variants: HERO_CONTACT_VARIANTS,
    files: [
      "src/assets/images/hero/hero-contact-640w.webp",
      "src/assets/images/hero/hero-contact-960w.webp",
      "src/assets/images/hero/hero-contact-1280w.webp",
      "src/assets/images/hero/hero-contact.webp",
    ],
  },
  {
    name: "HERO_SERVICE_DETAIL_VARIANTS",
    variants: HERO_SERVICE_DETAIL_VARIANTS,
    files: [
      "src/assets/images/hero/hero-service-detail-640w.webp",
      "src/assets/images/hero/hero-service-detail-960w.webp",
      "src/assets/images/hero/hero-service-detail-1280w.webp",
      "src/assets/images/hero/hero-service-detail.webp",
    ],
  },
] as const;

describe("image variant metadata", () => {
  it("keeps the controlled registries sorted and aligned with the real file widths", () => {
    for (const group of VARIANT_GROUPS) {
      const actualWidths = group.files.map((file) => getImageDimensions(file).width);
      const declaredWidths = group.variants.map((variant) => variant.width);

      expect(declaredWidths, `${group.name}: declared widths match the repo files`).toEqual(
        actualWidths
      );

      for (let index = 1; index < declaredWidths.length; index += 1) {
        expect(
          declaredWidths[index],
          `${group.name}: widths stay sorted at index ${index}`
        ).toBeGreaterThan(declaredWidths[index - 1]);
      }

      expect(
        declaredWidths[declaredWidths.length - 1],
        `${group.name}: max width matches the original`
      ).toBe(actualWidths[actualWidths.length - 1]);
    }
  });

  it("does not overdeclare the square originals or the home hero original", () => {
    const squareOriginals = [
      { name: "service-conseil", variants: SVC_CONSEIL_VARIANTS, file: "src/assets/images/services/service-conseil.webp" },
      { name: "service-conception-3d", variants: SVC_CONCEPTION_VARIANTS, file: "src/assets/images/services/service-conception-3d.webp" },
      { name: "service-projet-complet", variants: SVC_COMPLET_VARIANTS, file: "src/assets/images/services/service-projet-complet.webp" },
    ] as const;

    for (const item of squareOriginals) {
      const actualWidth = getImageDimensions(item.file).width;
      const declaredWidth = item.variants[item.variants.length - 1].width;

      expect(actualWidth, `${item.name}: real original width`).toBe(1024);
      expect(declaredWidth, `${item.name}: declared original width`).toBe(1024);
      expect(declaredWidth, `${item.name}: no false 1920 declaration`).not.toBe(1920);
    }

    const heroHomeActualWidth = getImageDimensions("src/assets/images/hero/hfconcept-hero.webp").width;
    const heroHomeDeclaredWidth = HERO_HOME_VARIANTS[HERO_HOME_VARIANTS.length - 1].width;

    expect(heroHomeActualWidth, "hero home: real original width").toBe(1920);
    expect(heroHomeDeclaredWidth, "hero home: declared original width").toBe(1920);
    expect(heroHomeDeclaredWidth, "hero home: no false 2048 declaration").not.toBe(2048);
  });
});
