import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { SectionShell } from "@/components/shell/SectionShell";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Project = typeof PROJECTS[number];

function ProjectNavCard({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={`/realisations/${project.slug}/`}
      className="group relative isolate overflow-hidden rounded-[1.65rem] border border-hf-accent-deep/12 bg-hf-ink/90 p-2 shadow-panel transition-[transform,border-color,box-shadow] duration-fast ease-out-expo hover:-translate-y-1 hover:border-hf-accent/28 hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2"
    >
      <div className="relative min-h-[16rem] overflow-hidden rounded-[1.15rem]">
        <OptimizedImage
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-fast ease-out-expo group-hover-scale-gentle"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          className={`absolute inset-0 ${
            isPrev
              ? "bg-gradient-to-r from-hf-ink/88 via-hf-ink/42 to-hf-ink/22"
              : "bg-gradient-to-l from-hf-ink/88 via-hf-ink/42 to-hf-ink/22"
          }`}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/12 via-white/3 to-transparent" aria-hidden="true" />
        <div
          className={`absolute inset-0 flex flex-col justify-end gap-3 p-5 text-hf-on-dark ${isPrev ? "items-start text-left" : "items-end text-right"}`}
        >
          <div className={`inline-flex items-center gap-2 rounded-full border border-white/14 bg-hf-ink/38 px-3 py-1 text-micro-label text-hf-on-dark/78 backdrop-blur-sm ${isPrev ? "" : "flex-row-reverse"}`}>
            <Icon className="h-3.5 w-3.5" />
            {isPrev ? "Précédent" : "Suivant"}
          </div>
          <div className="space-y-2">
            <p className="text-h4 text-hf-on-dark">
              {project.title}
            </p>
            <p className="text-body-sm text-hf-on-dark/72">
              {project.categories[0]}
              {project.location ? ` · ${project.location}` : ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProjectNav({ project }: { project: Project }) {
  const primaryCategory = project.categories[0];
  const { prev, next, categoryLabel } = useMemo(() => {
    const sameCategory = PROJECTS.filter((p) => p.categories.includes(primaryCategory));
    const pool = sameCategory.length > 1 ? sameCategory : PROJECTS;
    const label = sameCategory.length > 1 ? primaryCategory : null;
    const idx = pool.findIndex((p) => p.slug === project.slug);
    const prevIdx = idx === 0 ? pool.length - 1 : idx - 1;
    const nextIdx = idx === pool.length - 1 ? 0 : idx + 1;
    return { prev: pool[prevIdx], next: pool[nextIdx], categoryLabel: label };
  }, [project.slug, primaryCategory]);

  return (
    <div className="space-y-5">
      {categoryLabel && (
        <p className="text-center text-label text-hf-soft uppercase tracking-[0.18em]">Navigation — {categoryLabel}</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProjectNavCard project={prev} direction="prev" />
        <ProjectNavCard project={next} direction="next" />
      </div>
    </div>
  );
}

export function SimilarProjects({ project }: { project: Project }) {
  const similar = useMemo(() => {
    return PROJECTS
      .filter((p) => p.slug !== project.slug && p.categories.some((c) => project.categories.includes(c)))
      .sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      })
      .slice(0, 3);
  }, [project.slug, project.categories]);

  if (similar.length === 0) return null;

  return (
    <SectionShell surface="muted" spacing="standard">
      <SectionIntro eyebrow={project.categories[0]} title="Découvrez aussi" description="D'autres projets qui pourraient vous inspirer." align="center" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {similar.map((p) => (
          <div key={p.slug}>
            <ProjectCard title={p.title} href={`/realisations/${p.slug}/`} imageSrc={p.cover} imageAlt={p.title} variant="standard" featured={p.isFeatured} category={p.categories[0]} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
