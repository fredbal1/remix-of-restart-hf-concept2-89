import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECT_OG_MANIFEST } from "@/data/og-realisations-manifest";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function publicFile(relativePath: string): string {
  return resolve(ROOT, "public", relativePath.replace(/^\//, ""));
}

describe("OG realisations assets", () => {
  it.each(PROJECT_OG_MANIFEST.map((p) => [p.slug, p]))(
    "%s — OG image exists",
    (slug) => {
      const filePath = publicFile(`og/realisations/${slug}.jpg`);
      expect(existsSync(filePath), `Missing OG image for slug "${slug}": ${filePath}`).toBe(true);
    },
  );

  it("no duplicate slugs", () => {
    const slugs = PROJECT_OG_MANIFEST.map((p) => p.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(dupes, `Duplicate slugs: ${dupes.join(", ")}`).toHaveLength(0);
  });

  it.each(PROJECT_OG_MANIFEST.map((p) => [p.slug, p]))(
    "%s — title, excerpt and ogAlt are non-empty",
    (_slug, entry) => {
      expect(entry.title, `${_slug}: empty title`).toBeTruthy();
      expect(entry.excerpt, `${_slug}: empty excerpt`).toBeTruthy();
      expect(entry.ogAlt, `${_slug}: empty ogAlt`).toBeTruthy();
    },
  );
});
