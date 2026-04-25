import { Helmet } from "react-helmet-async";
import { SITE_CONFIG } from "@/data/site-config";
import { buildDocumentTitle, buildRobotsContent } from "@/lib/seo/route-manifest";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterImageAlt?: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  robots?: string;
}

const DEFAULT_OG_IMAGE = `${SITE_CONFIG.url}/og-symbol.png`;
const DEFAULT_OG_IMAGE_ALT = "HFconcept — studio d'architecture intérieure";

export function SEO({
  title = "HFconcept — Studio d'architecture intérieure",
  description = "Conception sur mesure, visualisation 3D et accompagnement de projet.",
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  twitterImageAlt,
  noindex = false,
  ogType = "website",
  robots,
}: SEOProps) {
  const fullTitle = buildDocumentTitle(title);
  const isJpeg = ogImage.endsWith(".jpg") || ogImage.endsWith(".jpeg");
  const ogImageType = isJpeg ? "image/jpeg" : "image/png";
  const twitterAlt = twitterImageAlt ?? ogImageAlt;
  const robotsContent = robots ?? buildRobotsContent(!noindex);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={twitterAlt} />
    </Helmet>
  );
}
