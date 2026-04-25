import { describe, it, expect } from "vitest";
import {
  SEO_ROUTES,
  getSeoRoute,
  normalizeRoutePath,
  buildDocumentTitle,
  buildRobotsContent,
  getPrerenderRoutes,
  getDistHtmlPath,
} from "@/lib/seo/route-manifest";

/* ------------------------------------------------------------------ */
/*  Pure helpers                                                       */
/* ------------------------------------------------------------------ */

describe("buildDocumentTitle", () => {
  it("returns title as-is when it already contains HFconcept", () => {
    expect(buildDocumentTitle("Architecte d'intérieur Paris et Île-de-France | HFconcept")).toBe(
      "Architecte d'intérieur Paris et Île-de-France | HFconcept",
    );
  });

  it("appends — HFconcept suffix", () => {
    expect(buildDocumentTitle("Contact")).toBe("Contact — HFconcept");
  });
});

describe("buildRobotsContent", () => {
  it("returns index directive for indexable", () => {
    expect(buildRobotsContent(true)).toBe("index, follow, max-image-preview:large");
  });

  it("returns noindex directive for non-indexable", () => {
    expect(buildRobotsContent(false)).toBe("noindex, nofollow");
  });
});

describe("normalizeRoutePath", () => {
  it("returns / for empty string", () => {
    expect(normalizeRoutePath("")).toBe("/");
  });

  it("strips trailing slash", () => {
    expect(normalizeRoutePath("/services/")).toBe("/services");
  });

  it("strips query and hash", () => {
    expect(normalizeRoutePath("/contact?ref=home#form")).toBe("/contact");
  });

  it("keeps / as /", () => {
    expect(normalizeRoutePath("/")).toBe("/");
  });
});

describe("getDistHtmlPath", () => {
  it("returns index.html for root", () => {
    const home = getSeoRoute("/");
    expect(home).toBeDefined();
    expect(getDistHtmlPath(home!)).toBe("index.html");
  });

  it("returns nested path for non-root", () => {
    const studio = getSeoRoute("/studio");
    expect(studio).toBeDefined();
    expect(getDistHtmlPath(studio!)).toBe("studio/index.html");
  });
});

/* ------------------------------------------------------------------ */
/*  Route manifest invariants                                          */
/* ------------------------------------------------------------------ */

describe("SEO route manifest — global invariants", () => {
  it("has no duplicate paths", () => {
    const paths = SEO_ROUTES.map((r) => r.path);
    const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
    expect(dupes, `Duplicate route paths: ${dupes.join(", ")}`).toHaveLength(0);
  });

  it("has no duplicate ids", () => {
    const ids = SEO_ROUTES.map((r) => r.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes, `Duplicate route ids: ${dupes.join(", ")}`).toHaveLength(0);
  });

  it("every route has non-empty title", () => {
    for (const route of SEO_ROUTES) {
      expect(route.title, `${route.id}: empty title`).toBeTruthy();
    }
  });

  it("every route has non-empty description", () => {
    for (const route of SEO_ROUTES) {
      expect(route.description, `${route.id}: empty description`).toBeTruthy();
    }
  });

  it("every indexable route has a canonical URL", () => {
    for (const route of SEO_ROUTES) {
      if (route.indexable) {
        expect(route.canonical, `${route.id}: indexable but no canonical`).toBeTruthy();
        expect(route.canonical).toMatch(/^https:\/\//);
      }
    }
  });

  it("every route has a valid robots directive", () => {
    for (const route of SEO_ROUTES) {
      expect(route.robots, `${route.id}: empty robots`).toBeTruthy();
      if (route.indexable) {
        expect(route.robots).toContain("index");
      } else {
        expect(route.robots).toContain("noindex");
      }
    }
  });

  it("every route has an ogImage URL", () => {
    for (const route of SEO_ROUTES) {
      expect(route.ogImage, `${route.id}: empty ogImage`).toMatch(/^https:\/\//);
    }
  });

  it("all prerender routes are returned by getPrerenderRoutes", () => {
    const prerenderRoutes = getPrerenderRoutes();
    const prerenderPaths = new Set(prerenderRoutes.map((r) => r.path));
    for (const route of SEO_ROUTES) {
      if (route.prerender) {
        expect(prerenderPaths.has(route.path), `${route.id} missing from prerender list`).toBe(true);
      }
    }
  });
});

/* ------------------------------------------------------------------ */
/*  Representative route checks                                        */
/* ------------------------------------------------------------------ */

describe("SEO route manifest — representative routes", () => {
  it("home route is indexable with LocalBusiness JSON-LD", () => {
    const home = getSeoRoute("/");
    expect(home).toBeDefined();
    expect(home!.indexable).toBe(true);
    expect(home!.includeLocalBusinessJsonLd).toBe(true);
    expect(home!.canonical).toMatch(/^https:\/\//);
    expect(home!.robots).toContain("index");
  });

  it("a service route stays indexable and carries both Service and service FAQ JSON-LD flags", () => {
    const route = getSeoRoute("/services/conseil");
    expect(route).toBeDefined();
    expect(route!.kind).toBe("service");
    expect(route!.indexable).toBe(true);
    expect(route!.canonical).toContain("/services/conseil");
    expect(route!.includeServiceJsonLd).toEqual({ slug: "conseil" });
    expect(route!.includeServiceFaqJsonLd).toEqual({ slug: "conseil" });
    expect(route!.validation.minParagraphs).toBeGreaterThanOrEqual(7);
    expect(route!.validation.minWords).toBeGreaterThanOrEqual(220);
    expect(route!.sitemap?.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("a project route is indexable with article og:type", () => {
    const projects = SEO_ROUTES.filter((r) => r.kind === "project");
    expect(projects.length).toBeGreaterThan(0);
    const first = projects[0];
    expect(first.indexable).toBe(true);
    expect(first.ogType).toBe("article");
    expect(first.canonical).toContain("/realisations/");
    expect(first.sitemap?.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("mentions-legales is noindex without LocalBusiness JSON-LD", () => {
    const route = getSeoRoute("/mentions-legales");
    expect(route).toBeDefined();
    expect(route!.indexable).toBe(false);
    expect(route!.robots).toContain("noindex");
    expect(route!.includeLocalBusinessJsonLd).toBe(false);
  });

  it("404 route is noindex without canonical", () => {
    const route = getSeoRoute("/404");
    expect(route).toBeDefined();
    expect(route!.indexable).toBe(false);
    expect(route!.robots).toContain("noindex");
    expect(route!.canonical).toBeNull();
    expect(route!.includeLocalBusinessJsonLd).toBe(false);
  });

  it("500 route is noindex without canonical", () => {
    const route = getSeoRoute("/500");
    expect(route).toBeDefined();
    expect(route!.indexable).toBe(false);
    expect(route!.robots).toContain("noindex");
    expect(route!.canonical).toBeNull();
  });

  it("merci route is noindex", () => {
    const route = getSeoRoute("/merci");
    expect(route).toBeDefined();
    expect(route!.indexable).toBe(false);
    expect(route!.robots).toContain("noindex");
  });
});

/* ------------------------------------------------------------------ */
/*  Guard-rail tests                                                   */
/* ------------------------------------------------------------------ */

describe("SEO guard rails", () => {
  it("no indexable route has an empty title or description", () => {
    const indexable = SEO_ROUTES.filter((r) => r.indexable);
    expect(indexable.length).toBeGreaterThan(0);
    for (const route of indexable) {
      expect(route.title.length, `${route.id}: title too short`).toBeGreaterThan(3);
      expect(route.description.length, `${route.id}: description too short`).toBeGreaterThan(20);
      expect(route.canonical, `${route.id}: missing canonical`).toBeTruthy();
    }
  });

  it("404 can never become indexable (regression guard)", () => {
    const route = getSeoRoute("/404");
    expect(route).toBeDefined();
    expect(route!.indexable).toBe(false);
    expect(route!.robots).toBe("noindex, nofollow");
    expect(route!.canonical).toBeNull();
  });

  it("system routes are never indexable", () => {
    const system = SEO_ROUTES.filter((r) => r.kind === "system");
    expect(system.length).toBeGreaterThan(0);
    for (const route of system) {
      expect(route.indexable, `${route.id} should not be indexable`).toBe(false);
    }
  });

  it("legal routes are never indexable", () => {
    const legal = SEO_ROUTES.filter((r) => r.kind === "legal");
    expect(legal.length).toBeGreaterThan(0);
    for (const route of legal) {
      expect(route.indexable, `${route.id} should not be indexable`).toBe(false);
    }
  });

  it("every indexable service route in the sitemap has a dedicated lastmod", () => {
    const services = SEO_ROUTES.filter(
      (route) => route.kind === "service" && route.indexable && route.includeInSitemap
    );
    expect(services.length).toBeGreaterThan(0);
    for (const route of services) {
      expect(route.sitemap?.lastmod, `${route.id}: missing dedicated lastmod`).toMatch(
        /^\d{4}-\d{2}-\d{2}$/
      );
    }
  });

  it("every indexable project route in the sitemap has a dedicated lastmod", () => {
    const projects = SEO_ROUTES.filter(
      (route) => route.kind === "project" && route.indexable && route.includeInSitemap
    );
    expect(projects.length).toBeGreaterThan(0);
    for (const route of projects) {
      expect(route.sitemap?.lastmod, `${route.id}: missing dedicated lastmod`).toMatch(
        /^\d{4}-\d{2}-\d{2}$/
      );
    }
  });
});
