import { PROJECT_OG_MANIFEST } from "../../data/og-realisations-manifest";
import { PROJECT_MANIFEST } from "../../data/projects-manifest";
import { PROJECT_CATEGORY_ROUTES } from "../../data/projects/categories";
import { SERVICE_MANIFEST } from "../../data/services-manifest";
import { SITE_CONFIG } from "../../data/site-config";
import { requireSitemapDate, SITEMAP_LAST_MODIFIED } from "../../data/sitemap-dates";
import { ZONES_INTERVENTION } from "../../data/zones-intervention";

export type SeoRouteKind =
  | "marketing"
  | "service"
  | "project"
  | "category"
  | "zone"
  | "conversion"
  | "legal"
  | "system";

export interface SeoRouteValidation {
  minParagraphs: number;
  minWords: number;
}

export interface SeoBreadcrumbItem {
  label: string;
  href?: string;
}

interface SeoRouteSeed {
  id: string;
  path: string;
  kind: SeoRouteKind;
  title: string;
  description: string;
  ogImagePath: string;
  ogImageAlt: string;
  ogType?: "website" | "article";
  indexable?: boolean;
  canonicalPath?: string | null;
  includeInSitemap?: boolean;
  includeLocalBusinessJsonLd?: boolean;
  includeWebSiteJsonLd?: boolean;
  includeServiceJsonLd?: { slug: string };
  includeServiceFaqJsonLd?: { slug: string };
  includeCreativeWorkJsonLd?: { slug: string };
  includeFaqJsonLd?: boolean;
  includeZoneFaqJsonLd?: { slug: string };
  breadcrumbs?: SeoBreadcrumbItem[];
  prerender?: boolean;
  validation: SeoRouteValidation;
  sitemap?: {
    priority: string;
    changefreq?: string;
    lastmod?: string;
  };
  extraOutputPaths?: string[];
}

export interface SeoRouteEntry {
  id: string;
  path: string;
  kind: SeoRouteKind;
  title: string;
  description: string;
  canonical: string | null;
  canonicalPath: string | null;
  robots: string;
  indexable: boolean;
  ogType: "website" | "article";
  ogImagePath: string;
  ogImage: string;
  ogImageAlt: string;
  twitterImageAlt: string;
  prerender: boolean;
  includeInSitemap: boolean;
  includeLocalBusinessJsonLd: boolean;
  includeWebSiteJsonLd?: boolean;
  includeServiceJsonLd?: { slug: string } | null;
  includeServiceFaqJsonLd?: { slug: string } | null;
  includeCreativeWorkJsonLd?: { slug: string } | null;
  includeFaqJsonLd?: boolean;
  includeZoneFaqJsonLd?: { slug: string } | null;
  breadcrumbs?: SeoBreadcrumbItem[];
  validation: SeoRouteValidation;
  sitemap?: {
    priority: string;
    changefreq?: string;
    lastmod?: string;
  };
  extraOutputPaths: string[];
}

const DEFAULT_OG_IMAGE_PATH = "/og-symbol.png";
const DEFAULT_OG_IMAGE_ALT = "HFconcept — studio d'architecture intérieure";

const STATIC_ROUTE_SEEDS: SeoRouteSeed[] = [
  {
    id: "home",
    path: "/",
    kind: "marketing",
    title: "Architecture intérieure à Paris | HFconcept",
    description:
      "HFconcept, architecte d'intérieur à Paris et en Île-de-France. Conception sur mesure, rénovation, 3D photoréaliste et suivi de projet.",
    ogImagePath: "/og/og-home.jpg",
    ogImageAlt:
      "Intérieur contemporain sur mesure — HFconcept, architecte d'intérieur",
    includeInSitemap: true,
    includeWebSiteJsonLd: true,
    sitemap: {
      priority: "1.0",
      changefreq: "weekly",
      lastmod: SITEMAP_LAST_MODIFIED["/"],
    },
    validation: { minParagraphs: 4, minWords: 180 },
  },
  {
    id: "studio",
    path: "/studio",
    kind: "marketing",
    title: "Studio d'architecture intérieure | HFconcept",
    description:
      "HFconcept, architecte d'intérieur en Île-de-France : méthode claire, regard sensible, conception sur mesure et accompagnement rigoureux.",
    ogImagePath: "/og/og-studio.jpg",
    ogImageAlt:
      "Studio d'architecture intérieure HFconcept — méthode, matériaux et conception",
    includeInSitemap: true,
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Le Studio" },
    ],
    sitemap: {
      priority: "0.8",
      changefreq: "monthly",
      lastmod: SITEMAP_LAST_MODIFIED["/studio"],
    },
    validation: { minParagraphs: 4, minWords: 160 },
  },
  {
    id: "services",
    path: "/services",
    kind: "marketing",
    title: "Services d'architecture intérieure | HFconcept",
    description:
      "Conseil, conception 3D, projet complet ou à distance : découvrez les services HFconcept en architecture intérieure à Paris et en Île-de-France.",
    ogImagePath: "/og/og-services.jpg",
    ogImageAlt:
      "Les formules HFconcept — conseil, conception 3D, projet complet et à distance",
    includeInSitemap: true,
    includeFaqJsonLd: true,
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Services" },
    ],
    sitemap: {
      priority: "0.8",
      changefreq: "monthly",
      lastmod: SITEMAP_LAST_MODIFIED["/services"],
    },
    validation: { minParagraphs: 3, minWords: 130 },
  },
  {
    id: "realisations",
    path: "/realisations",
    kind: "marketing",
    title: "Réalisations d'architecture intérieure | HFconcept",
    description:
      "Cuisines, salles de bain, séjours, chambres et aménagements sur mesure : découvrez les réalisations HFconcept en Île-de-France.",
    ogImagePath: "/og/og-realisations.jpg",
    ogImageAlt:
      "Réalisation d'architecture intérieure HFconcept — finition et qualité d'exécution",
    includeInSitemap: true,
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Réalisations" },
    ],
    sitemap: {
      priority: "0.8",
      changefreq: "weekly",
      lastmod: SITEMAP_LAST_MODIFIED["/realisations"],
    },
    validation: { minParagraphs: 2, minWords: 70 },
  },
  {
    id: "contact",
    path: "/contact",
    kind: "marketing",
    title: "Contact architecte d'intérieur Paris | HFconcept",
    description:
      "Contactez HFconcept, architecte d'intérieur à Paris et en Île-de-France, pour échanger sur votre projet d'architecture intérieure.",
    ogImagePath: "/og/og-contact.jpg",
    ogImageAlt:
      "Échangeons sur votre projet — HFconcept, premier rendez-vous offert",
    includeInSitemap: true,
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Contact" },
    ],
    sitemap: {
      priority: "0.7",
      changefreq: "monthly",
      lastmod: SITEMAP_LAST_MODIFIED["/contact"],
    },
    validation: { minParagraphs: 3, minWords: 90 },
  },
  {
    id: "merci",
    path: "/merci",
    kind: "conversion",
    title: "Merci",
    description:
      "Votre message a bien été reçu. HFconcept revient vers vous sous 24h ouvrées pour faire un premier point sur votre projet.",
    ogImagePath: "/og/og-contact.jpg",
    ogImageAlt: "Échange sur projet d'architecture intérieure — HFconcept",
    indexable: false,
    includeLocalBusinessJsonLd: false,
    validation: { minParagraphs: 4, minWords: 60 },
  },
  {
    id: "mentions-legales",
    path: "/mentions-legales",
    kind: "legal",
    title: "Mentions légales",
    description:
      "Informations légales relatives à l'édition, l'hébergement et la propriété intellectuelle du site HFconcept.",
    ogImagePath: DEFAULT_OG_IMAGE_PATH,
    ogImageAlt: DEFAULT_OG_IMAGE_ALT,
    indexable: false,
    includeLocalBusinessJsonLd: false,
    validation: { minParagraphs: 6, minWords: 180 },
  },
  {
    id: "politique-de-confidentialite",
    path: "/politique-de-confidentialite",
    kind: "legal",
    title: "Politique de confidentialité",
    description:
      "Politique de confidentialité du site HFconcept relative au traitement des données personnelles et aux droits des visiteurs.",
    ogImagePath: DEFAULT_OG_IMAGE_PATH,
    ogImageAlt: DEFAULT_OG_IMAGE_ALT,
    indexable: false,
    includeLocalBusinessJsonLd: false,
    validation: { minParagraphs: 8, minWords: 260 },
  },
  {
    id: "error-500",
    path: "/500",
    kind: "system",
    title: "Erreur serveur",
    description:
      "Un problème est survenu. Nous nous excusons pour la gêne et vous invitons à réessayer dans quelques instants.",
    ogImagePath: DEFAULT_OG_IMAGE_PATH,
    ogImageAlt: DEFAULT_OG_IMAGE_ALT,
    indexable: false,
    canonicalPath: null,
    includeLocalBusinessJsonLd: false,
    validation: { minParagraphs: 1, minWords: 10 },
  },
  {
    id: "error-404",
    path: "/404",
    kind: "system",
    title: "Page introuvable",
    description:
      "La page que vous recherchez n'existe pas ou a été déplacée. Revenez à l'accueil pour poursuivre votre navigation.",
    ogImagePath: DEFAULT_OG_IMAGE_PATH,
    ogImageAlt: DEFAULT_OG_IMAGE_ALT,
    indexable: false,
    canonicalPath: null,
    includeLocalBusinessJsonLd: false,
    validation: { minParagraphs: 1, minWords: 10 },
    extraOutputPaths: ["404.html"],
  },
];

const SERVICE_ROUTE_SEO: Record<
  string,
  Pick<SeoRouteSeed, "title" | "description" | "ogImagePath" | "ogImageAlt">
> = {
  conseil: {
    title: "Conseil en architecture intérieure | HFconcept",
    description:
      "Une séance de conseil avec un architecte d'intérieur pour clarifier l'agencement, les matériaux, les couleurs et les priorités du projet.",
    ogImagePath: "/og/og-service-conseil.jpg",
    ogImageAlt:
      "Séance de conseil en architecture intérieure HFconcept — matières, plans et écoute",
  },
  "conception-3d": {
    title: "Conception 3D d'intérieur | HFconcept",
    description:
      "Visualisez votre projet d'architecture intérieure avant travaux : plans, rendus 3D photoréalistes et palette matériaux validés en amont.",
    ogImagePath: "/og/og-service-conception-3d.jpg",
    ogImageAlt: "Visualisation 3D photoréaliste d'un intérieur — HFconcept",
  },
  "projet-complet": {
    title: "Projet complet d'architecture intérieure | HFconcept",
    description:
      "De la conception au chantier : architecte d'intérieur, plans techniques, matériaux, artisans et coordination complète du projet.",
    ogImagePath: "/og/og-service-projet-complet.jpg",
    ogImageAlt:
      "Projet complet d'architecture intérieure — de la conception à la réalisation par HFconcept",
  },
  "projet-a-distance": {
    title: "Architecture intérieure à distance | HFconcept",
    description:
      "Un accompagnement à distance avec architecte d'intérieur : visio, plans, 3D, matériaux et arbitrages, partout en France et à l'international.",
    ogImagePath: "/og/og-service-projet-a-distance.jpg",
    ogImageAlt:
      "Projet d'intérieur à distance — accompagnement premium HFconcept",
  },
};

function buildCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path === "/" ? "/" : path}`;
}

function buildAbsoluteUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

function buildCanonicalPath(path: string): string {
  return path === "/" ? "/" : `${normalizeRoutePath(path)}/`;
}

export function buildDocumentTitle(title: string): string {
  return title.includes("HFconcept") ? title : `${title} — HFconcept`;
}

export function buildRobotsContent(indexable: boolean): string {
  return indexable ? "index, follow, max-image-preview:large" : "noindex, nofollow";
}

function createRoute(seed: SeoRouteSeed): SeoRouteEntry {
  const canonicalPath =
    seed.canonicalPath === undefined ? buildCanonicalPath(seed.path) : seed.canonicalPath;
  const indexable = seed.indexable ?? true;

  return {
    id: seed.id,
    path: seed.path,
    kind: seed.kind,
    title: seed.title,
    description: seed.description,
    canonical: canonicalPath ? buildCanonicalUrl(canonicalPath) : null,
    canonicalPath,
    robots: buildRobotsContent(indexable),
    indexable,
    ogType: seed.ogType ?? "website",
    ogImagePath: seed.ogImagePath,
    ogImage: buildAbsoluteUrl(seed.ogImagePath),
    ogImageAlt: seed.ogImageAlt,
    twitterImageAlt: seed.ogImageAlt,
    prerender: seed.prerender ?? true,
    includeInSitemap: seed.includeInSitemap ?? false,
    includeLocalBusinessJsonLd: seed.includeLocalBusinessJsonLd ?? indexable,
    includeWebSiteJsonLd: seed.includeWebSiteJsonLd ?? false,
    includeServiceJsonLd: seed.includeServiceJsonLd ?? null,
    includeServiceFaqJsonLd: seed.includeServiceFaqJsonLd ?? null,
    includeCreativeWorkJsonLd: seed.includeCreativeWorkJsonLd ?? null,
    includeFaqJsonLd: seed.includeFaqJsonLd ?? false,
    includeZoneFaqJsonLd: seed.includeZoneFaqJsonLd ?? null,
    breadcrumbs: seed.breadcrumbs ?? [],
    validation: seed.validation,
    sitemap: seed.sitemap,
    extraOutputPaths: seed.extraOutputPaths ?? [],
  };
}

const SERVICE_ROUTE_ENTRIES: SeoRouteEntry[] = SERVICE_MANIFEST.map((service) => {
  const meta = SERVICE_ROUTE_SEO[service.slug];
  if (!meta) {
    throw new Error(`Missing SEO route metadata for service slug "${service.slug}"`);
  }

  return createRoute({
    id: `service-${service.slug}`,
    path: normalizeRoutePath(service.href),
    kind: "service",
    title: meta.title,
    description: meta.description,
    ogImagePath: meta.ogImagePath,
    ogImageAlt: meta.ogImageAlt,
    includeInSitemap: true,
    includeServiceJsonLd: { slug: service.slug },
    includeServiceFaqJsonLd: { slug: service.slug },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Services", href: "/services/" },
      { label: service.title },
    ],
    sitemap: {
      priority: "0.7",
      changefreq: "monthly",
      lastmod: requireSitemapDate(
        service.updatedAt,
        `Service route "${service.href}" updatedAt`
      ),
    },
    validation: { minParagraphs: 7, minWords: 220 },
  });
});

const projectOgBySlug = new Map(PROJECT_OG_MANIFEST.map((entry) => [entry.slug, entry]));

const PROJECT_ROUTE_ENTRIES: SeoRouteEntry[] = PROJECT_MANIFEST.map(({ slug, updatedAt }) => {
  const project = projectOgBySlug.get(slug);
  if (!project) {
    throw new Error(`Missing PROJECT_OG_MANIFEST entry for slug "${slug}"`);
  }

  return createRoute({
    id: `project-${slug}`,
    path: `/realisations/${slug}`,
    kind: "project",
    title: `${project.title} — Réalisation Île-de-France | HFconcept`,
    description: project.excerpt,
    ogImagePath: `/og/realisations/${slug}.jpg`,
    ogImageAlt: project.ogAlt,
    ogType: "article",
    includeInSitemap: true,
    includeCreativeWorkJsonLd: { slug },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Réalisations", href: "/realisations/" },
      { label: project.title },
    ],
    sitemap: {
      priority: "0.5",
      changefreq: "monthly",
      lastmod: requireSitemapDate(
        updatedAt,
        `Project route "/realisations/${slug}" updatedAt`
      ),
    },
    validation: { minParagraphs: 5, minWords: 130 },
  });
});

const CATEGORY_ROUTE_ENTRIES: SeoRouteEntry[] = PROJECT_CATEGORY_ROUTES.map((cat) =>
  createRoute({
    id: `category-${cat.slug}`,
    path: `/realisations/categorie/${cat.slug}`,
    kind: "category",
    title: cat.metaTitle,
    description: cat.metaDescription,
    ogImagePath: cat.ogImagePath,
    ogImageAlt: cat.ogImageAlt,
    includeInSitemap: true,
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Réalisations", href: "/realisations/" },
      { label: cat.title },
    ],
    sitemap: {
      priority: "0.7",
      changefreq: "monthly",
      lastmod: requireSitemapDate(
        cat.updatedAt,
        `Category route "/realisations/categorie/${cat.slug}" updatedAt`
      ),
    },
    validation: { minParagraphs: 1, minWords: 30 },
  })
);

const ZONE_ROUTE_ENTRIES: SeoRouteEntry[] = ZONES_INTERVENTION.map((zone) =>
  createRoute({
    id: `zone-${zone.slug}`,
    path: `/zones-intervention/${zone.slug}`,
    kind: "zone",
    title: zone.metaTitle,
    description: zone.metaDescription,
    ogImagePath: zone.ogImagePath,
    ogImageAlt: zone.ogImageAlt,
    includeInSitemap: true,
    includeZoneFaqJsonLd: { slug: zone.slug },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Zones d'intervention" },
      { label: zone.name },
    ],
    sitemap: {
      priority: "0.7",
      changefreq: "monthly",
      lastmod: requireSitemapDate(
        zone.updatedAt,
        `Zone route "/zones-intervention/${zone.slug}" updatedAt`
      ),
    },
    validation: { minParagraphs: 2, minWords: 120 },
  })
);

export const SEO_ROUTES: readonly SeoRouteEntry[] = [
  ...STATIC_ROUTE_SEEDS.map(createRoute),
  ...SERVICE_ROUTE_ENTRIES,
  ...CATEGORY_ROUTE_ENTRIES,
  ...ZONE_ROUTE_ENTRIES,
  ...PROJECT_ROUTE_ENTRIES,
];

const ROUTE_BY_PATH = new Map(SEO_ROUTES.map((route) => [route.path, route]));

export function normalizeRoutePath(path: string): string {
  if (!path) return "/";
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getSeoRoute(path: string): SeoRouteEntry | undefined {
  return ROUTE_BY_PATH.get(normalizeRoutePath(path));
}

export function requireSeoRoute(path: string): SeoRouteEntry {
  const route = getSeoRoute(path);
  if (!route) {
    throw new Error(`Unknown SEO route: ${path}`);
  }
  return route;
}

export function getServiceSeoRoute(slug: string): SeoRouteEntry | undefined {
  return getSeoRoute(`/services/${slug}`);
}

export function getProjectSeoRoute(slug: string): SeoRouteEntry | undefined {
  return getSeoRoute(`/realisations/${slug}`);
}

export function getPrerenderRoutes(): SeoRouteEntry[] {
  return SEO_ROUTES.filter((route) => route.prerender);
}

export function getDistHtmlPath(route: SeoRouteEntry): string {
  if (route.path === "/") {
    return "index.html";
  }

  return `${route.path.slice(1)}/index.html`;
}
