import { ErrorPage } from "@/components/layout/ErrorPage";
import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";

const NotFound = () => {
  const seo = requireSeoRoute("/404");

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        ogImage={seo.ogImage}
        ogImageAlt={seo.ogImageAlt}
        twitterImageAlt={seo.twitterImageAlt}
        noindex={!seo.indexable}
        ogType={seo.ogType}
        robots={seo.robots}
      />
      <ErrorPage
        code="404"
        eyebrow="Erreur 404"
        title="Page introuvable"
        text="La page que vous recherchez n'existe pas ou a été déplacée."
        primaryLabel="Retour à l'accueil"
        primaryHref="/"
      />
    </>
  );
};

export default NotFound;
