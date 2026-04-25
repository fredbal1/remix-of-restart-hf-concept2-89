import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";

interface ProjectsGridProps {
  projects: Project[];
  isEditorial?: boolean;
  className?: string;
  cardClassName?: string;
  showProjectMeta?: boolean;
}

function getEditorialGridPlacement(index: number) {
  const pos = index % 5;
  switch (pos) {
    case 0: return "md:col-span-2 md:row-span-2";
    case 1: return "md:col-span-1 md:row-span-1";
    case 2: return "md:col-span-1 md:row-span-1";
    case 3: return "md:col-span-1 md:row-span-1";
    case 4: return "md:col-span-2 md:row-span-1";
    default: return "";
  }
}

function getEditorialVariant(index: number, project: Project) {
  const pos = index % 5;
  if (pos === 0) return "hero" as const;
  if (pos === 4) return "wide" as const;
  return project.editorialSize || "standard" as const;
}

export function ProjectsGrid({
  projects,
  isEditorial = false,
  className,
  cardClassName,
  showProjectMeta = false,
}: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-body-lg text-hf-soft py-16">
        Aucun projet dans cette catégorie pour le moment.
      </p>
    );
  }

  if (isEditorial) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 auto-rows-auto", className)}>
        {projects.map((project, i) => {
          const placement = getEditorialGridPlacement(i);
          const variant = getEditorialVariant(i, project);
          const isFeaturedCard = i % 5 === 0;
          const displayCategory = project.categories.find(c => c !== "Tous") || undefined;

          return (
            <div key={project.slug} className={cn(placement, "h-full")}>
              <ProjectCard
                title={project.title}
                href={`/realisations/${project.slug}/`}
                imageSrc={project.cover}
                imageAlt={project.title}
                variant={variant}
                featured={isFeaturedCard}
                category={displayCategory}
                kicker={showProjectMeta ? project.projectType : undefined}
                metaLine={showProjectMeta ? project.location : undefined}
                summary={showProjectMeta ? project.excerpt : undefined}
                className={cardClassName}
                fillHeight
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6", className)}>
      {projects.map((project) => {
        const displayCategory = project.categories.find(c => c !== "Tous") || undefined;

        return (
          <div key={project.slug}>
            <ProjectCard
              title={project.title}
              href={`/realisations/${project.slug}/`}
              imageSrc={project.cover}
              imageAlt={project.title}
              variant={project.editorialSize || "standard"}
              category={displayCategory}
              kicker={showProjectMeta ? project.projectType : undefined}
              metaLine={showProjectMeta ? project.location : undefined}
              summary={showProjectMeta ? project.excerpt : undefined}
              className={cardClassName}
            />
          </div>
        );
      })}
    </div>
  );
}

