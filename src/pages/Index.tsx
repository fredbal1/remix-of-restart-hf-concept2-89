import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import {
  HomeHero,
  HomeMethod,
  HomeProjects,
  HomeServices,
  HomeProjection3D,
  HomeFinalCTA,
} from "@/components/sections/home";
import { HOME_CONTENT } from "@/data/home-content";
import { TESTIMONIALS_CONTENT } from "@/data/testimonials-content";

import finalCtaImg from "@/assets/images/hero/hfconcept-hero.webp";
import cuisineNoireCheneHero from "@/assets/images/projects/cuisine-noire-chene-ilot/hfconcept-cuisine-noire-chene-01.webp";
import cuisine3dImg from "@/assets/images/projects/cuisine-noire-chene-ilot/hfconcept-cuisine-3d-1.webp";


const Index = () => {
  const c = HOME_CONTENT;
  const seo = requireSeoRoute("/");

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical ?? undefined}
        ogImage={seo.ogImage}
        ogImageAlt={seo.ogImageAlt}
        twitterImageAlt={seo.twitterImageAlt}
        noindex={!seo.indexable}
        ogType={seo.ogType}
        robots={seo.robots}
      />

      <HomeHero hero={c.hero} trustItems={c.trustBand.items} />
      <HomeMethod editorial={c.editorial} />
      <HomeProjects content={c.realisations} testimonials={TESTIMONIALS_CONTENT} />
      <HomeServices content={c.services} />
      <HomeProjection3D
        content={c.visu3d}
        image3d={cuisine3dImg}
        image3dAlt="Projection 3D photoréaliste de la cuisine transformée — HFconcept"
        imageResult={cuisineNoireCheneHero}
        imageResultAlt="Cuisine réalisée après travaux — HFconcept"
      />
      <HomeFinalCTA
        content={c.finalCta}
        image={finalCtaImg}
        imageAlt="Intérieur contemporain lumineux — HFconcept"
      />
    </>
  );
};

export default Index;

