import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectStoryProps {
  project: Project;
}

export function ProjectStory({ project }: ProjectStoryProps) {
  const introParagraphs = [
    project.projectContext?.trim() || project.description?.trim(),
    project.projectContext?.trim() &&
    project.description?.trim() &&
    project.projectContext.trim() !== project.description.trim()
      ? project.description.trim()
      : undefined,
  ].filter((text): text is string => Boolean(text));

  const hasHighlight = Boolean(project.highlight?.trim());
  const hasFiche =
    project.categories.length > 0 ||
    !!project.location ||
    !!project.projectType ||
    !!project.relatedService ||
    !!project.relatedCategory;
  const hasLead = introParagraphs.length > 0 || hasHighlight;

  if (!hasLead && !hasFiche) return null;

  return (
    <div>
      {hasLead && hasFiche ? (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-12">
          <StoryLead project={project} introParagraphs={introParagraphs} />
          <div className="lg:justify-self-end lg:w-full lg:max-w-[30rem]">
            <FicheProjet project={project} />
          </div>
        </div>
      ) : hasLead ? (
        <div className="max-w-3xl mx-auto space-y-6">
          <StoryLead project={project} introParagraphs={introParagraphs} />
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <FicheProjet project={project} />
        </div>
      )}
    </div>
  );
}

function StoryLead({
  project,
  introParagraphs,
}: {
  project: Project;
  introParagraphs: string[];
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-eyebrow text-hf-accent-deep/80">
          Le projet en bref
        </p>
        {project.projectType && (
          <span className="inline-flex items-center rounded-full border border-hf-accent-deep/12 bg-white/56 px-3 py-1 text-micro-label text-hf-accent-deep/78">
            {project.projectType}
          </span>
        )}
      </div>
      {introParagraphs.length > 0 && (
        <div className="surface-card-featured rounded-[1.6rem] px-6 py-6 lg:px-8 lg:py-8">
          {introParagraphs.map((text, index) => (
            <p
              key={`${project.slug}-intro-${index}`}
              className={cn(
                "reading-width text-hf-soft leading-body-loose",
                index === 0 ? "text-body-lead text-hf-strong" : "mt-4 border-t border-hf-accent-deep/10 pt-4 text-body"
              )}
            >
              {text}
            </p>
          ))}
        </div>
      )}
      {project.highlight && (
        <div
          className={cn(
            "reading-width max-w-2xl rounded-[1.35rem] border border-hf-accent-deep/12 bg-white/60 px-5 py-5 shadow-soft",
            introParagraphs.length === 0 && "bg-transparent px-0 py-0 shadow-none"
          )}
        >
          <p className="text-label uppercase tracking-[0.18em] text-hf-soft">
            Point fort
          </p>
          <p className="mt-3 text-body text-hf-strong leading-body-loose">
            {project.highlight}
          </p>
        </div>
      )}
    </div>
  );
}

function FicheProjet({ project }: { project: Project }) {
  const hasMetaGrid = !!project.location || !!project.projectType;

  return (
    <div className="surface-panel-light rounded-[1.6rem] p-6 lg:p-8">
      <div className="space-y-2 border-b border-hf-accent-deep/12 pb-5">
        <p className="text-micro-label text-hf-accent-deep/72">
          Cadrage projet
        </p>
        <h3 className="text-h4 text-hf-strong">
          Fiche projet
        </h3>
        <p className="text-body-sm text-hf-soft leading-body-loose">
          Les repères utiles pour situer le lieu, la nature du projet et le niveau
          d'accompagnement le plus cohérent.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {project.categories.length > 0 && (
          <div className="rounded-[1.15rem] border border-hf-accent-deep/10 bg-white/58 p-4 space-y-3">
            <span className="text-label text-hf-soft block">Catégories</span>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="border border-hf-accent-deep/8 bg-hf-pearl/85 px-3 py-1 text-micro text-hf-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {hasMetaGrid && (
          <div className="grid gap-3 sm:grid-cols-2">
            {project.location && (
              <MetaCard
                label="Localisation"
                value={project.location}
              />
            )}
            {project.projectType && (
              <MetaCard
                label="Type de projet"
                value={project.projectType}
              />
            )}
          </div>
        )}

        {(project.relatedService || project.relatedCategory) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {project.relatedService && (
              <MetaLinkCard
                label="Accompagnement"
                href={project.relatedService.href}
                value={project.relatedService.label}
              />
            )}
            {project.relatedCategory && (
              <MetaLinkCard
                label="Catégorie liée"
                href={project.relatedCategory.href}
                value={project.relatedCategory.label}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MetaCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.15rem] border border-hf-accent-deep/10 bg-white/58 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.26)]",
        className
      )}
    >
      <span className="text-label text-hf-soft block">
        {label}
      </span>
      <p className="mt-2 text-body-sm font-medium text-hf-strong leading-body-loose">
        {value}
      </p>
    </div>
  );
}

function MetaLinkCard({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <Link
      to={href}
      className="group rounded-[1.15rem] border border-hf-accent-deep/10 bg-white/58 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] transition-[transform,border-color,background-color,box-shadow] duration-fast ease-out-expo hover:-translate-y-0.5 hover:border-hf-accent-deep/20 hover:bg-white/82 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2"
    >
      <span className="text-label text-hf-soft block">
        {label}
      </span>
      <span className="mt-2 inline-flex items-center gap-2 text-body-sm font-medium text-hf-strong leading-body-loose">
        {value}
        <ArrowUpRight
          className="w-4 h-4 text-hf-accent-deep transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

