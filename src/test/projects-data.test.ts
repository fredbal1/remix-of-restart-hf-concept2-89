import { describe, it, expect } from "vitest";
import { PROJECTS } from "@/data/projects";

describe("PROJECTS data", () => {
  it("has at least one project", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
  });

  it("every project has required fields", () => {
    PROJECTS.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.categories.length).toBeGreaterThan(0);
      expect(p.cover).toBeTruthy();
    });
  });

  it("all slugs are unique", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("slugs are URL-safe", () => {
    PROJECTS.forEach((p) => {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });
});
