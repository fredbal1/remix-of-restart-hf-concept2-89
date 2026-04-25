/**
 * Source canonique légère des métadonnées structurelles de services.
 * Aucun import d'asset — utilisable par les scripts de build.
 *
 * Tout enrichissement métier (prix, textes, images, cartes…)
 * vit dans services-content.ts et dérive de ce manifest par clé.
 */

export interface ServiceManifestEntry {
  key: string;
  number: string;
  slug: string;
  href: string;
  title: string;
  updatedAt: string;
}

export interface ServiceLink {
  label: string;
  href: string;
}

export const SERVICE_MANIFEST: readonly ServiceManifestEntry[] = [
  { key: "conseil",           number: "01", slug: "conseil",           href: "/services/conseil/",           title: "Conseil", updatedAt: "2026-04-22" },
  { key: "conception-3d",     number: "02", slug: "conception-3d",     href: "/services/conception-3d/",     title: "Conception 3D (à domicile)", updatedAt: "2026-04-22" },
  { key: "projet-complet",    number: "03", slug: "projet-complet",    href: "/services/projet-complet/",    title: "Projet complet", updatedAt: "2026-04-22" },
  { key: "projet-a-distance", number: "04", slug: "projet-a-distance", href: "/services/projet-a-distance/", title: "Projet à distance", updatedAt: "2026-04-22" },
] as const;

export const SERVICE_LINKS: readonly ServiceLink[] = SERVICE_MANIFEST.map(
  ({ title, href }) => ({
    label: title,
    href,
  })
);

