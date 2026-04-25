/**
 * Source de vérité des dates lastmod pour le sitemap.
 * Format YYYY-MM-DD. Mettre à jour manuellement quand le contenu change.
 * Si une route n'est pas listée ici, aucun <lastmod> ne sera émis.
 */

const SITEMAP_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const SITEMAP_LAST_MODIFIED: Record<string, string> = {
  "/":                              "2026-04-20",
  "/studio":                       "2026-04-06",
  "/services":                     "2026-04-20",
  "/realisations":                 "2026-04-21",
  "/contact":                      "2026-04-06",
};

export function assertValidSitemapDate(value: string, context: string): string {
  if (!SITEMAP_DATE_PATTERN.test(value)) {
    throw new Error(
      `${context} must use a valid sitemap date in YYYY-MM-DD format. Received "${value}".`
    );
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(
      `${context} must use a real calendar date in YYYY-MM-DD format. Received "${value}".`
    );
  }

  return value;
}

export function requireSitemapDate(value: string | undefined, context: string): string {
  if (!value) {
    throw new Error(`${context} is missing a required sitemap date in YYYY-MM-DD format.`);
  }

  return assertValidSitemapDate(value, context);
}

