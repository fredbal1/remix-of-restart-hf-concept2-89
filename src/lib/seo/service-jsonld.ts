import { SITE_CONFIG } from "../../data/site-config";
import { SERVICE_MANIFEST } from "../../data/services-manifest";

interface ServiceJsonLdInput {
  slug: string;
  canonicalUrl: string;
}

/**
 * Static SEO-only metadata for Service JSON-LD.
 * Kept here (and not imported from services-content.ts) to avoid pulling
 * asset imports into the SSR / build script context.
 */
const SERVICE_SEO_META: Record<
  string,
  { description: string; price?: number; priceDescription?: string }
> = {
  conseil: {
    description: "Un regard expert pour orienter vos choix d'agencement, matériaux et coloris en 1 heure.",
    price: 99,
  },
  "conception-3d": {
    description: "Visualisation 3D photoréaliste de votre intérieur avant travaux : plans, vues perspectives et matériaux.",
    price: 369,
  },
  "projet-complet": {
    description: "Conception, plans techniques, sélection des artisans, coordination de chantier — projet d'architecture intérieure clé en main.",
    priceDescription: "Sur devis",
  },
  "projet-a-distance": {
    description: "Accompagnement d'architecture intérieure à distance : visioconférence, plans, 3D et palette matériaux livrés.",
    price: 199,
  },
};

export function getServiceJsonLd({ slug, canonicalUrl }: ServiceJsonLdInput) {
  const manifest = SERVICE_MANIFEST.find((s) => s.slug === slug);
  const meta = SERVICE_SEO_META[slug];
  if (!manifest || !meta) {
    throw new Error(`Unknown service slug for JSON-LD: "${slug}"`);
  }

  const offers = meta.price
    ? {
        "@type": "Offer",
        price: meta.price.toFixed(2),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      }
    : {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          description: meta.priceDescription ?? "Sur devis",
        },
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: manifest.title,
    description: meta.description,
    serviceType: manifest.title,
    url: canonicalUrl,
    provider: { "@id": `${SITE_CONFIG.url}/#business` },
    areaServed: SITE_CONFIG.intervention.areas.map((a) => ({
      "@type": a.type,
      name: a.name,
    })),
    offers,
  };
}
