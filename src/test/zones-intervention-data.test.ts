import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";
import { SERVICE_MANIFEST } from "@/data/services-manifest";
import { ZONES_INTERVENTION } from "@/data/zones-intervention";

describe("ZONES_INTERVENTION data", () => {
  it("keeps every zone enrichment complete and aligned with repo sources", () => {
    const projectSlugs = new Set(PROJECTS.map((project) => project.slug));
    const serviceHrefs = new Set(SERVICE_MANIFEST.map((service) => service.href));

    for (const zone of ZONES_INTERVENTION) {
      expect(zone.featuredProjects, `${zone.slug}: featuredProjects count`).toHaveLength(3);
      expect(zone.relatedServices, `${zone.slug}: relatedServices count`).toHaveLength(2);
      expect(zone.frequentProjectTypes.length, `${zone.slug}: frequentProjectTypes too short`).toBeGreaterThanOrEqual(4);
      expect(zone.frequentProjectTypes.length, `${zone.slug}: frequentProjectTypes too long`).toBeLessThanOrEqual(6);
      expect(zone.localProcess.length, `${zone.slug}: localProcess too short`).toBeGreaterThanOrEqual(3);
      expect(zone.localProcess.length, `${zone.slug}: localProcess too long`).toBeLessThanOrEqual(4);
      expect(zone.faq.length, `${zone.slug}: faq too short`).toBeGreaterThanOrEqual(3);
      expect(zone.faq.length, `${zone.slug}: faq too long`).toBeLessThanOrEqual(4);

      const featuredProjectSlugs = zone.featuredProjects.map((project) => project.slug);
      const relatedServiceHrefs = zone.relatedServices.map((service) => service.href);

      expect(
        new Set(featuredProjectSlugs).size,
        `${zone.slug}: duplicate featured project slugs`
      ).toBe(featuredProjectSlugs.length);
      expect(
        new Set(relatedServiceHrefs).size,
        `${zone.slug}: duplicate related service hrefs`
      ).toBe(relatedServiceHrefs.length);

      for (const slug of featuredProjectSlugs) {
        expect(projectSlugs.has(slug), `${zone.slug}: unknown project slug "${slug}"`).toBe(true);
      }

      for (const href of relatedServiceHrefs) {
        expect(serviceHrefs.has(href), `${zone.slug}: unknown service href "${href}"`).toBe(true);
      }
    }
  });
});
