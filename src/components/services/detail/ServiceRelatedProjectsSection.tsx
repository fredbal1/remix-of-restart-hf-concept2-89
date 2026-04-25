import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionShell } from "@/components/shell/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getImageVariants } from "@/data/image-variants";
import { getProjectBySlug } from "@/data/projects";
import type { ServiceRelatedProject } from "@/types/services";

export function ServiceRelatedProjectsSection({
  serviceSlug,
  items,
}: {
  serviceSlug: string;
  items: readonly ServiceRelatedProject[];
}) {
  const relatedProjects = items.slice(0, 3).map((item) => {
    const project = getProjectBySlug(item.slug);

    if (!project) {
      throw new Error(
        `Service "${serviceSlug}" references unknown project slug "${item.slug}"`
      );
    }

    return { ...item, project };
  });

  return (
      <SectionShell surface="dark" spacing="standard">
      <div className="max-w-3xl mx-auto text-center">
        <SectionIntro
          eyebrow="Preuve contextuelle"
          title="Réalisations liées"
          description="Des projets réels qui montrent ce que cette formule permet de décider, de concevoir ou de cadrer."
          align="center"
          inverted
        />
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {relatedProjects.map(({ project, reason }) => (
          <Link
            key={project.slug}
            to={`/realisations/${project.slug}/`}
            className="group block rounded-xl overflow-hidden border border-hf-divider-on-dark surface-panel-dark transition-[transform,border-color] duration-fast ease-out-expo hover:-translate-y-0.5 hover:border-hf-accent/25"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <OptimizedImage
                src={project.cover}
                variants={getImageVariants(project.cover)}
                alt={`Vue du projet — ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-ambient ease-out-expo group-hover-scale-gentle"
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/16 to-transparent" aria-hidden="true" />
            </div>

            <div className="p-5 lg:p-6">
              <h3 className="text-h4 text-hf-on-dark mb-3">{project.title}</h3>
              <p className="text-body-sm text-hf-on-dark-soft">{reason}</p>
              <span className="inline-flex items-center gap-1.5 text-label text-hf-accent mt-5">
                Voir la réalisation
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-fast ease-out-expo group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
