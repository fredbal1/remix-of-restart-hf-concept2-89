import { ErrorPage } from "@/components/layout/ErrorPage";
import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";

const Error500 = () => {
  const seo = requireSeoRoute("/500");

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
        code="500"
        eyebrow="Erreur serveur"
        title="Un problème est survenu"
        text="Nous nous excusons pour la gêne. Veuillez réessayer dans quelques instants."
        primaryLabel="Retour à l'accueil"
        primaryHref="/"
        secondaryLabel="Rafraîchir la page"
        onSecondaryClick={() => window.location.reload()}
      />
    </>
  );
};

export default Error500;
