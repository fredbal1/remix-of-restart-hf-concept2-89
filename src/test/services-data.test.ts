import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "@/data/projects";
import { SERVICE_FAQ_BY_SLUG, getServiceFaqBySlug } from "@/data/service-faq";
import { SERVICE_OFFERS } from "@/data/services-content";
import { getServiceFaqEntries } from "@/lib/seo/faq-jsonld";

describe("SERVICE_OFFERS detail data", () => {
  it("keeps the four service detail pages fully enriched", () => {
    expect(SERVICE_OFFERS).toHaveLength(4);

    for (const service of SERVICE_OFFERS) {
      const serviceSlug = service.slug as keyof typeof SERVICE_FAQ_BY_SLUG;
      const canonicalFaq = getServiceFaqBySlug(service.slug);

      expect(service.detailIntro.length, `${service.slug}: intro paragraphs`).toBeGreaterThanOrEqual(2);
      expect(service.detailIntro.length, `${service.slug}: intro paragraphs`).toBeLessThanOrEqual(3);
      expect(service.scope, `${service.slug}: scope groups`).toHaveLength(3);
      expect(service.useCases, `${service.slug}: use cases`).toHaveLength(4);
      expect(service.process, `${service.slug}: process steps`).toHaveLength(4);
      expect(service.relatedProjects, `${service.slug}: related projects`).toHaveLength(3);
      expect(service.faq, `${service.slug}: faq`).toHaveLength(4);
      expect(service.faq, `${service.slug}: canonical faq map reference`).toBe(
        SERVICE_FAQ_BY_SLUG[serviceSlug]
      );
      expect(service.faq, `${service.slug}: canonical faq helper reference`).toBe(canonicalFaq);
      expect(getServiceFaqEntries(service.slug), `${service.slug}: seo faq helper reference`).toBe(
        canonicalFaq
      );
      expect(service.availabilityNote, `${service.slug}: availability note`).toBeTruthy();
      expect(service.comparison.otherOptions, `${service.slug}: comparison options`).toHaveLength(3);

      const relatedProjectSlugs = service.relatedProjects.map((item) => item.slug);

      expect(
        new Set(relatedProjectSlugs).size,
        `${service.slug}: duplicate related project slugs`
      ).toBe(relatedProjectSlugs.length);

      for (const projectSlug of relatedProjectSlugs) {
        expect(
          getProjectBySlug(projectSlug),
          `${service.slug}: unknown related project slug "${projectSlug}"`
        ).toBeDefined();
      }
    }
  });
});
