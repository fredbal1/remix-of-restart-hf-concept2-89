import { SITE_CONFIG } from "../../data/site-config";
import { PROJECT_OG_MANIFEST } from "../../data/og-realisations-manifest";
import { PROJECT_MANIFEST } from "../../data/projects-manifest";

interface CreativeWorkJsonLdInput {
  slug: string;
  canonicalUrl: string;
  ogImageUrl: string;
  ogImageAlt: string;
}

const OG_BY_SLUG = new Map(PROJECT_OG_MANIFEST.map((entry) => [entry.slug, entry]));
const MANIFEST_BY_SLUG = new Map(PROJECT_MANIFEST.map((entry) => [entry.slug, entry]));

/**
 * CreativeWork JSON-LD — minimal, SSR-safe (no asset imports).
 * Uses the project OG image as the canonical visual reference.
 */
export function getCreativeWorkJsonLd({
  slug,
  canonicalUrl,
  ogImageUrl,
  ogImageAlt,
}: CreativeWorkJsonLdInput) {
  const og = OG_BY_SLUG.get(slug);
  const manifest = MANIFEST_BY_SLUG.get(slug);
  if (!og || !manifest) {
    throw new Error(`Unknown project slug for JSON-LD: "${slug}"`);
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#project`,
    name: og.title,
    headline: og.title,
    description: og.excerpt,
    url: canonicalUrl,
    inLanguage: "fr-FR",
    dateModified: manifest.updatedAt,
    creator: { "@id": `${SITE_CONFIG.url}/#business` },
    locationCreated: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: SITE_CONFIG.address.region,
        addressCountry: SITE_CONFIG.address.country,
      },
    },
    image: {
      "@type": "ImageObject",
      url: ogImageUrl,
      caption: ogImageAlt,
      width: 1200,
      height: 630,
    },
  };
}
