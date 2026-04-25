import { describe, it, expect } from "vitest";
import { NAV_LINKS } from "@/data/navigation";

describe("NAV_LINKS", () => {
  it("contains all required pages", () => {
    const hrefs = NAV_LINKS.map((l) => l.href);
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/studio/");
    expect(hrefs).toContain("/services/");
    expect(hrefs).toContain("/realisations/");
    expect(hrefs).toContain("/contact/");
  });

  it("every link has a non-empty label and href starting with /", () => {
    NAV_LINKS.forEach((link) => {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.href).toMatch(/^\//);
    });
  });
});
