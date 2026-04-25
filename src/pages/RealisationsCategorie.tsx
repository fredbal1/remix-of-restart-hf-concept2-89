import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/seo/SEO";
import { requireSeoRoute } from "@/lib/seo/route-manifest";
import { buildFaqJsonLd } from "@/lib/seo/faq-jsonld";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionShell } from "@/components/shell/SectionShell";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectsGrid } from "@/components/ui/ProjectsGrid";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import {
  PROJECTS,
  PROJECT_CATEGORY_ROUTES,
  getProjectBySlug,
  getCategoryRouteBySlug,
  type Project,
} from "@/data/projects";
import NotFound from "@/pages/NotFound";
import heroRealisationsImg from "@/assets/images/hero/hero-realisations.webp";
import { getImageVariants, HERO_REALS_VARIANTS } from "@/data/image-variants";
import heroServicesImg from "@/assets/images/hero/hero-services.webp";

function SelectionProofCard({
  project,
  label,
  title,
  description,
}: {
  project: Project;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={`/realisations/${project.slug}/`}
      className="group block min-w-0 overflow-hidden rounded-xl border border-hf-divider-on-dark surface-panel-dark shadow-panel h-full transition-[transform,box-shadow,border-color] duration-fast ease-out-expo hover:-translate-y-0.5 hover:border-hf-accent/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <OptimizedImage
          src={project.cover}
          variants={getImageVariants(project.cover)}
          alt={`Vue du projet — ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-ambient ease-out-expo group-hover-scale-gentle"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/16 to-transparent" aria-hidden="true" />
        <div className="absolute left-0 right-0 bottom-0 p-4 lg:p-5">
          <span className="inline-flex items-center rounded-full border border-hf-divider-on-dark/80 bg-hf-overlay-badge px-3 py-1 text-micro-label font-medium tracking-wide text-hf-surface-translucent-text">
            {label}
          </span>
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <p className="text-micro-label text-hf-accent/80 mb-2.5">{project.title}</p>
        <h3 className="text-h4 text-hf-on-dark mb-3 max-w-[18ch]">{title}</h3>
        <p className="text-body-sm text-hf-on-dark-soft max-w-[32ch]">{description}</p>
        <span className="inline-flex items-center gap-1.5 text-label text-hf-accent mt-5">
          Voir le projet
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-fast ease-out-expo group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

const RealisationsCategorie = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryRoute = slug ? getCategoryRouteBySlug(slug) : undefined;

  if (!categoryRoute) {
    return <NotFound />;
  }

  const seo = requireSeoRoute(`/realisations/categorie/${categoryRoute.slug}`);
  const projects = PROJECTS.filter((p) => p.categories.includes(categoryRoute.category));
  const otherCategories = PROJECT_CATEGORY_ROUTES.filter((r) => r.slug !== categoryRoute.slug);
  const proofHighlights = categoryRoute.proofHighlights.flatMap((proof) => {
    const project = getProjectBySlug(proof.projectSlug);
    return project ? [{ ...proof, project }] : [];
  });

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
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(buildFaqJsonLd(categoryRoute.faq))}</script>
      </Helmet>

      <PageHero
        eyebrow="Réalisations"
        title={categoryRoute.title}
        description={categoryRoute.heroDescription}
        image={heroRealisationsImg}
        imageVariants={HERO_REALS_VARIANTS}
      />
      <Breadcrumbs
        tone="dark"
        items={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/realisations/" },
          { label: categoryRoute.title },
        ]}
      />

      <SectionShell surface="dark" spacing="dense">
        <div className="mb-8 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <nav aria-label="Autres catégories" className="flex min-w-0 flex-wrap gap-2.5">
              <Link
                to="/realisations/"
                className="min-h-11 inline-flex items-center px-5 py-2.5 rounded-full text-body-sm font-medium surface-panel-dark text-hf-on-dark-soft border border-hf-divider-on-dark hover:text-hf-on-dark hover:border-hf-accent/25 transition-colors"
              >
                Tous les projets
              </Link>
              {otherCategories.map((other) => (
                <Link
                  key={other.slug}
                  to={`/realisations/categorie/${other.slug}/`}
                  className="min-h-11 inline-flex items-center px-5 py-2.5 rounded-full text-body-sm font-medium surface-panel-dark text-hf-on-dark-soft border border-hf-divider-on-dark hover:text-hf-on-dark hover:border-hf-accent/25 transition-colors"
                >
                  {other.category}
                </Link>
              ))}
            </nav>
            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full surface-panel-dark border border-hf-divider-on-dark text-body-sm font-medium text-hf-on-dark-soft tabular-nums">
              <span className="text-hf-accent">{projects.length}</span>
              projet{projects.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="max-w-3xl min-w-0">
          <SectionIntro
            title={categoryRoute.introTitle}
            description={categoryRoute.introParagraphs[0]}
            inverted
          />
          {categoryRoute.introParagraphs.slice(1).map((paragraph) => (
            <p key={paragraph} className="text-body text-hf-on-dark-soft mt-5">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {categoryRoute.editorialCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7"
            >
              <h3 className="text-h5 text-hf-on-dark mb-4">{card.title}</h3>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-sm text-hf-on-dark-soft">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-hf-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 lg:mt-12 pt-9 lg:pt-10 border-t border-hf-divider-on-dark grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-10">
          <section aria-labelledby="project-types-title">
            <h2 id="project-types-title" className="text-h4 text-hf-on-dark mb-5">
              Projets concernés
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {categoryRoute.projectTypes.map((projectType) => (
                <li
                  key={projectType}
                  className="min-h-11 inline-flex items-center px-5 py-2.5 rounded-full text-body-sm font-medium surface-panel-dark text-hf-on-dark-soft border border-hf-divider-on-dark"
                >
                  {projectType}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="related-services-title">
            <h2 id="related-services-title" className="text-h4 text-hf-on-dark mb-5">
              Services associés
            </h2>
            <ul className="space-y-2.5">
              {categoryRoute.relatedServices.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-hf-on-dark-soft hover:text-hf-accent transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {proofHighlights.length > 0 && (
          <section
            aria-labelledby="selection-proof-title"
            className="mt-10 lg:mt-12 pt-9 lg:pt-10 border-t border-hf-divider-on-dark"
          >
            <h2 id="selection-proof-title" className="text-h3 text-hf-on-dark max-w-2xl">
              À retenir de cette sélection
            </h2>
            <p className="text-body-sm text-hf-on-dark-soft max-w-2xl mt-4">
              Des exemples concrets tirés des projets affichés sur cette page.
            </p>
            <div className="mt-7 lg:mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {proofHighlights.map((item) => (
                <SelectionProofCard
                  key={`${item.project.slug}-${item.label}`}
                  project={item.project}
                  label={item.label}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 lg:mt-12 pt-9 lg:pt-10 border-t border-hf-divider-on-dark">
          <ProjectsGrid projects={projects} isEditorial={false} />
        </div>

        <div
          className="mt-14 lg:mt-16 pt-10 lg:pt-12 border-t border-hf-divider-on-dark"
          aria-labelledby="category-faq-title"
        >
          <h2 id="category-faq-title" className="text-h4 text-hf-on-dark mb-8">
            Questions fréquentes
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {categoryRoute.faq.map((item) => (
              <article
                key={item.question}
                className="rounded-xl border border-hf-divider-on-dark surface-panel-dark p-6 lg:p-7"
              >
                <h3 className="text-h5 text-hf-on-dark mb-3">{item.question}</h3>
                <p className="text-body-sm text-hf-on-dark-soft">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-14 lg:mt-16">
          <ButtonLink href="/realisations/" variant="secondary">
            Voir tous nos projets
          </ButtonLink>
        </div>
      </SectionShell>

      <FinalCtaSection
        eyebrow="À votre tour"
        title="Le vôtre peut commencer ici."
        text="À partir de vos usages, de votre lieu et de votre niveau d'exigence, nous posons une direction claire avant d'aller plus loin."
        reassurance="Premier échange offert — sans engagement"
        ctaPrimary="Parler de votre projet"
        ctaPrimaryHref="/contact/"
        ctaSecondary="Découvrir les services"
        ctaSecondaryHref="/services/"
        image={heroServicesImg}
        imageAlt="Réalisation HFconcept — conduite de projet"
        tone="muted"
      />
    </>
  );
};

export default RealisationsCategorie;


