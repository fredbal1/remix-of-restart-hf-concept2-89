import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { SEO } from "@/components/seo/SEO";
import { getProjectSeoRoute } from "@/lib/seo/route-manifest";
import { SectionShell } from "@/components/shell/SectionShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCtaSection } from "@/components/sections/common/FinalCtaSection";
import { ProjectGallery } from "@/components/sections/realisations/ProjectGallery";
import { ProjectStory } from "@/components/sections/realisations/ProjectStory";
import { ProjectNarrative } from "@/components/sections/realisations/ProjectNarrative";
import { ProjectResults } from "@/components/sections/realisations/ProjectResults";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PROJECTS } from "@/data/projects";
import heroServicesImg from "@/assets/images/hero/hero-services.webp";
import NotFound from "@/pages/NotFound";
import { ProjectNav, SimilarProjects } from "@/components/realisations/ProjectNavigation";

type ProjectRecord = (typeof PROJECTS)[number];

const PROJECT_DETAIL_FINAL_CTA_PROPS = {
  eyebrow: "À votre tour",
  title: "Votre projet mérite la même précision.",
  text: "Échangeons sur votre intérieur pour cadrer les bons choix, le bon niveau d'accompagnement et la suite du projet.",
  reassurance: "Premier échange offert — sans engagement",
  ctaPrimary: "Prendre rendez-vous",
  ctaPrimaryHref: "/contact/",
  ctaSecondary: "Découvrir nos services",
  ctaSecondaryHref: "/services/",
  image: heroServicesImg,
  imageAlt: "Intérieur contemporain neutre — HFconcept",
  tone: "muted" as const,
};

function ProjectDetailSeo({ project }: { project: ProjectRecord }) {
  const seo = getProjectSeoRoute(project.slug);
  if (!seo) return null;

  return (
    <SEO
      title={seo.title}
      description={seo.description}
      canonical={seo.canonical ?? undefined}
      ogType={seo.ogType}
      ogImage={seo.ogImage}
      ogImageAlt={seo.ogImageAlt}
      twitterImageAlt={seo.twitterImageAlt}
      noindex={!seo.indexable}
      robots={seo.robots}
    />
  );
}

function ProjectDetailBreadcrumbs({ project }: { project: ProjectRecord }) {
  return (
    <Breadcrumbs
      items={[
        { label: "Accueil", href: "/" },
        { label: "Réalisations", href: "/realisations/" },
        { label: project.title },
      ]}
    />
  );
}

function ProjectDetailFinalCta() {
  return <FinalCtaSection {...PROJECT_DETAIL_FINAL_CTA_PROPS} />;
}

function ProjectKeyChoicesBlock({ project }: { project: ProjectRecord }) {
  if (!project.keyChoices || project.keyChoices.length === 0) return null;

  const gridClassName = project.keyChoices.length <= 3 ? "lg:grid-cols-1" : "sm:grid-cols-2";

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
      <div className="space-y-4">
        <p className="text-eyebrow text-hf-accent-deep/80">Choix clés</p>
        <h2 className="text-h2 text-hf-strong">Choix clés du projet</h2>
        <p className="measure-tight text-body text-hf-soft leading-body-loose">
          Les décisions de composition, d'usage ou de matière qui donnent sa tenue au projet.
        </p>
        {(project.projectType || project.location) && (
          <div className="rounded-[1.3rem] border border-hf-accent-deep/12 bg-hf-surface-card px-4 py-4 shadow-soft">
            <span className="text-micro-label text-hf-accent-deep/80">Cadrage rapide</span>
            <p className="mt-3 text-body-sm text-hf-strong leading-body-loose">
              {[project.projectType, project.location].filter(Boolean).join(" · ")}
            </p>
          </div>
        )}
      </div>
      <ol className={`grid grid-cols-1 gap-4 ${gridClassName}`}>
        {project.keyChoices.map((item, index) => (
          <li
            key={`${project.slug}-choice-${index}`}
            className="surface-card-featured rounded-[1.45rem] px-5 py-5 lg:px-6 lg:py-6 transition-[transform,border-color,box-shadow] duration-fast ease-out-expo hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="text-label text-hf-accent-deep/75 tabular-nums" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-hf-accent-deep/18" aria-hidden="true" />
            </div>
            <p className="mt-4 text-body text-hf-strong leading-body-loose">{item}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectClientFitBlock({ project }: { project: ProjectRecord }) {
  if (!project.clientFit || project.clientFit.length === 0) return null;

  return (
    <div className="rounded-[1.7rem] border border-hf-accent-deep/12 bg-hf-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-eyebrow text-hf-accent-deep/80">Projection</p>
          <h2 className="text-h3 text-hf-strong">Pour quel type de projet</h2>
          <p className="text-body-sm text-hf-soft leading-body-loose">
            Un repère simple pour savoir si cette réalisation répond à une situation proche de la vôtre.
          </p>
        </div>
        <ul className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {project.clientFit.map((item, index) => (
            <li
              key={`${project.slug}-fit-${index}`}
              className="rounded-[1.1rem] border border-hf-accent-deep/10 bg-hf-surface-card px-4 py-4 text-body-sm text-hf-strong leading-body-loose shadow-soft"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectLinkRail({ project }: { project: ProjectRecord }) {
  const links = [
    project.relatedService
      ? {
          eyebrow: "Service conseillé",
          href: project.relatedService.href,
          label: project.relatedService.label,
        }
      : null,
    project.relatedCategory
      ? {
          eyebrow: "Catégorie liée",
          href: project.relatedCategory.href,
          label: project.relatedCategory.label,
        }
      : null,
    {
      eyebrow: "Explorer aussi",
      href: "/realisations/",
      label: "Toutes les réalisations",
    },
  ].filter((link): link is { eyebrow: string; href: string; label: string } => Boolean(link));

  if (links.length === 0) return null;

  return (
    <div className="space-y-5 border-t border-hf-accent-deep/12 pt-8 lg:pt-10">
      <p className="text-center text-label uppercase tracking-[0.18em] text-hf-soft">
        Pour aller plus loin
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={`${project.slug}-${link.href}`}
            to={link.href}
            className="group rounded-[1.35rem] border border-hf-accent-deep/12 bg-hf-surface-card px-5 py-5 transition-[transform,border-color,box-shadow,background-color] duration-fast ease-out-expo hover:-translate-y-0.5 hover:border-hf-accent-deep/20 hover:shadow-panel focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2"
          >
            <span className="text-label text-hf-soft block">{link.eyebrow}</span>
            <span className="mt-3 inline-flex items-center gap-2 text-body font-medium text-hf-strong leading-body-loose">
              {link.label}
              <ArrowUpRight
                className="w-4 h-4 text-hf-accent-deep transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StandardDetailPage({ project }: { project: ProjectRecord }) {
  const heroMetaLine = [project.projectType, project.location].filter(Boolean).join(" · ");

  return (
    <>
      <ProjectDetailSeo project={project} />
      <PageHero
        eyebrow={project.categories.join(" · ")}
        title={project.title}
        description={project.highlight ?? project.location ?? undefined}
        metaLine={heroMetaLine || undefined}
        image={project.cover}
        imageAlt={project.title}
      />
      <div className="relative z-[3] -mt-[clamp(5.2rem,7vw,3.4rem)] pb-[clamp(1.5rem,2vw,2.2rem)]">
        <div className="container-hf">
          <div className="relative overflow-hidden isolate rounded-[clamp(1.45rem,1.1rem+0.9vw,2rem)] border border-hf-divider-on-dark/20 bg-hf-surface-card px-5 py-5 shadow-elevated backdrop-blur-md sm:px-6 lg:px-7">
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-label uppercase tracking-[0.18em] text-hf-soft">
                {project.categories.join(" · ")}
              </span>
              <Link
                to="/realisations/"
                className="inline-flex items-center gap-2 text-body-sm text-hf-soft transition-colors hover:text-hf-accent-deep focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Tous les projets
              </Link>
            </div>
            <ProjectStory project={project} />
          </div>
        </div>
      </div>
      <ProjectDetailBreadcrumbs project={project} />
      {(project.needPoints?.length || project.constraintPoints?.length || project.solutionPoints?.length) && (
        <SectionShell surface="light" spacing="dense">
          <ProjectNarrative
            needPoints={project.needPoints}
            constraintPoints={project.constraintPoints}
            solutionPoints={project.solutionPoints}
          />
        </SectionShell>
      )}
      {(project.keyChoices?.length || project.images.length > 0) && (
        <SectionShell surface="muted" spacing="standard">
          <div className="space-y-16 lg:space-y-20">
            <ProjectKeyChoicesBlock project={project} />
            {project.images.length > 0 && (
              <div className="space-y-8">
                <SectionIntro
                  eyebrow={project.categories[0]}
                  title="Galerie du projet"
                  description={project.galleryIntro ?? "Découvrez ce projet en images."}
                  align="center"
                />
                <ProjectGallery images={project.images} projectTitle={project.title} />
              </div>
            )}
          </div>
        </SectionShell>
      )}
      {(project.resultPoints?.length || project.clientFit?.length || project.relatedService || project.relatedCategory) && (
        <SectionShell surface="light" spacing="dense">
          <div className="space-y-12 lg:space-y-14">
            <ProjectResults resultPoints={project.resultPoints} categoryLabel={project.categories[0]} />
            <ProjectClientFitBlock project={project} />
            <ProjectLinkRail project={project} />
          </div>
        </SectionShell>
      )}
      <SimilarProjects project={project} />
      <ProjectDetailFinalCta />
      <SectionShell surface="light" spacing="dense">
        <ProjectNav project={project} />
      </SectionShell>
    </>
  );
}

const RealisationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = useMemo(() => PROJECTS.find((p) => p.slug === slug) ?? null, [slug]);
  if (!project) return <NotFound />;
  return <StandardDetailPage project={project} />;
};

export default RealisationDetail;
