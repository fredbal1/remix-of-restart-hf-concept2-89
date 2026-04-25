import { describe, expect, it } from "vitest";
import { assertValidSitemapDate, requireSitemapDate } from "@/data/sitemap-dates";

describe("sitemap date validation", () => {
  it("accepts a valid YYYY-MM-DD date", () => {
    expect(assertValidSitemapDate("2026-04-06", "test date")).toBe("2026-04-06");
  });

  it("rejects a missing required date", () => {
    expect(() => requireSitemapDate(undefined, "service updatedAt")).toThrow(
      /service updatedAt is missing a required sitemap date/
    );
  });

  it("rejects an invalid format", () => {
    expect(() => assertValidSitemapDate("2026/04/06", "service updatedAt")).toThrow(
      /must use a valid sitemap date in YYYY-MM-DD format/
    );
  });

  it("rejects impossible calendar dates", () => {
    expect(() => assertValidSitemapDate("2026-02-30", "project updatedAt")).toThrow(
      /must use a real calendar date/
    );
  });
});
