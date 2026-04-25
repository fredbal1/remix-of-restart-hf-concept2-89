import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PROJECTS } from "@/data/projects";
import { getImageVariants } from "@/data/image-variants";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import type { HomeRealisationsContent, TestimonialsContent } from "./types";

interface HomeProjectsProps {
  content: HomeRealisationsContent;
  testimonials: TestimonialsContent;
}

function ProjectTile({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-hf-surface-translucent-border bg-hf-ink/60 shadow-translucent",
        featured ? "min-h-[28rem]" : "min-h-[17.5rem]",
      )}
    >
      <OptimizedImage
        src={project.cover}
        variants={getImageVariants(project.cover)}
        alt={project.title}
        sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 30vw"}
        width={1280}
        height={960}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition duration-500 ease-out",
          "group-hover-scale-gentle",
        )}
      />
      <div className="overlay-card-bottom--strong absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-5 md:p-6">
        <p className="text-micro-label text-hf-on-dark-soft">{project.categories[0]}</p>
        <h3 className={cn("text-h2 text-hf-on-dark", featured ? "max-w-[16ch]" : "text-h3")}>
          {project.title}
        </h3>
        <p className="text-body-sm max-w-[48ch] text-hf-on-dark-soft">{project.excerpt}</p>
        <ButtonLink href={`/realisations/${project.slug}/`} variant="secondary" size="sm" className="w-fit">
          Voir le projet
        </ButtonLink>
      </div>
    </article>
  );
}

export function HomeProjects({ content, testimonials }: HomeProjectsProps) {
  const leadProject =
    PROJECTS.find((project) => project.slug === "cuisine-noire-chene-ilot") ??
    PROJECTS.find((project) => project.isFeatured) ??
    PROJECTS[0];
  const relatedProjects = PROJECTS.filter((project) => project.slug !== leadProject.slug).slice(0, 3);

  return (
    <SectionFrame id="accueil-realisations" tone="dark" spacing="standard">
      <div className="space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[68ch] space-y-3">
            <p className="text-eyebrow text-hf-on-dark-soft">{content.eyebrow}</p>
            <h2 className="text-h1 text-balance text-hf-on-dark">{content.title}</h2>
            <p className="text-body-lg text-hf-on-dark-soft">{content.selection}</p>
          </div>
          <ButtonLink href="/realisations/" variant="secondary" size="lg">
            {content.cta}
          </ButtonLink>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <ProjectTile project={leadProject} featured />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {relatedProjects.map((project) => (
              <ProjectTile key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-hf-surface-translucent-border bg-hf-surface-translucent-subtle p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="space-y-2">
              <p className="text-micro-label text-hf-on-dark-soft">{testimonials.eyebrow}</p>
              <h3 className="text-h3 text-hf-on-dark">{testimonials.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={testimonials.googleRating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-hf-surface-translucent-border bg-hf-surface-translucent-subtle px-4 py-2 text-body-sm text-hf-on-dark hover:bg-hf-surface-translucent-soft"
              >
                Google {testimonials.googleRating.score} ({testimonials.googleRating.count})
              </a>
              <a
                href={testimonials.houzzRating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-hf-surface-translucent-border bg-hf-surface-translucent-subtle px-4 py-2 text-body-sm text-hf-on-dark hover:bg-hf-surface-translucent-soft"
              >
                Houzz {testimonials.houzzRating.score} ({testimonials.houzzRating.count})
              </a>
            </div>
          </div>
          <p className="mt-4 max-w-[72ch] text-body-sm text-hf-on-dark-soft">
            {testimonials.description}
          </p>
          <Link
            to="/realisations/"
            className="mt-4 inline-flex items-center gap-2 text-body-sm font-medium text-hf-accent hover:text-hf-on-dark"
          >
            Explorer d&apos;autres transformations
          </Link>
        </aside>
      </div>
    </SectionFrame>
  );
}

