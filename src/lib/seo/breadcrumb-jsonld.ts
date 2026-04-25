import { SITE_CONFIG } from "../../data/site-config";

export interface BreadcrumbItemSeed {
  label: string;
  href?: string;
}

/**
 * Pure builder for BreadcrumbList JSON-LD.
 * Shared between client (BreadcrumbBar Helmet) and SSR pre-render.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItemSeed[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_CONFIG.url}${item.href}` } : {}),
    })),
  };
}
