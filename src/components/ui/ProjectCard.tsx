import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { getImageVariants } from "@/data/image-variants";
import type { EditorialSize } from "@/data/projects";
import "./project-card.css";

interface ProjectCardProps {
  title: string;
  href?: string;
  onClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  variant?: EditorialSize;
  featured?: boolean;
  category?: string;
  kicker?: string;
  metaLine?: string;
  summary?: string;
  fillHeight?: boolean;
}

const ASPECT_MAP: Record<EditorialSize, string> = {
  hero: "project-card-aspect-hero",
  tall: "project-card-aspect-tall",
  wide: "project-card-aspect-wide",
  standard: "project-card-aspect-standard",
  standardSquare: "project-card-aspect-square",
};

const IMAGE_SIZES_BY_VARIANT: Record<EditorialSize, string> = {
  hero: "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 66vw",
  wide: "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 66vw",
  tall: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  standard: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  standardSquare: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
};

export function ProjectCard({
  title,
  href,
  onClick,
  imageSrc,
  imageAlt,
  className,
  variant = "standard",
  featured = false,
  category,
  kicker,
  metaLine,
  summary,
  fillHeight = false,
}: ProjectCardProps) {
  const hasDetailContent = Boolean(kicker || metaLine || summary);
  const cardClasses = cn(
    "group relative block h-full overflow-hidden rounded-xl shadow-panel",
    "project-card-transition duration-fast ease-out-expo",
    featured
      ? "hover:-translate-y-0.5 hover:shadow-elevated"
      : "hover:-translate-y-0.5 hover:shadow-depth",
    className
  );

  const aspectClass = fillHeight ? "h-full project-card-fill-height" : ASPECT_MAP[variant];

  const inner = (
    <div
      className={cn(
        "project-card-frame relative w-full overflow-hidden border border-hf-surface-translucent-border/10 bg-hf-pearl/70",
        aspectClass
      )}
      data-variant={variant}
      data-featured={featured ? "true" : "false"}
      data-has-details={hasDetailContent ? "true" : "false"}
    >
      {imageSrc ? (
        <OptimizedImage
          src={imageSrc}
          variants={getImageVariants(imageSrc)}
          alt={imageAlt || title}
          className={cn(
            "project-card-media w-full h-full object-cover transition-transform duration-ambient ease-out-expo",
            !featured && "group-hover-scale-gentle"
          )}
          sizes={IMAGE_SIZES_BY_VARIANT[variant]}
        />
      ) : (
      <div className="w-full h-full flex items-center justify-center bg-hf-inverse">
          <div className="text-center">
            <div className="w-14 h-14 rounded-md bg-hf-accent/10 mx-auto mb-3 flex items-center justify-center">
              <span className="font-display text-body-lg text-hf-accent/60">HF</span>
            </div>
            <p className="text-meta text-hf-on-dark-soft">Photo projet</p>
          </div>
        </div>
      )}

      {category && (
        <div className={cn("absolute z-10", featured ? "left-5 top-5" : "left-4 top-4")}>
          <span className={cn(
            "project-card-badge inline-block rounded-full text-micro font-medium tracking-wide uppercase backdrop-blur-md bg-hf-overlay-badge border border-hf-divider-on-dark/80 text-hf-surface-translucent-text shadow-sm",
            featured ? "px-3 py-1.5" : "px-2.5 py-1"
          )}>
            {category}
          </span>
        </div>
      )}

      <div className="project-card-overlay absolute inset-0 overlay-card-bottom--strong" aria-hidden="true" />
      <div className="project-card-overlay-highlight absolute inset-0" aria-hidden="true" />

      <div className="project-card-panel absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-4 md:p-5 lg:p-6">
        {kicker && (
          <p className="project-card-kicker text-micro-label text-hf-accent/78">
            {kicker}
          </p>
        )}
        <h3 className={cn(
          "font-display text-hf-on-dark project-card-title",
          featured ? "text-h3" : "text-h4"
        )}>
          {title}
        </h3>
        {summary && (
          <p className="project-card-summary text-body-sm text-hf-on-dark-soft">
            {summary}
          </p>
        )}
        <div className="project-card-footer">
          {metaLine && (
            <span className="project-card-meta text-label text-hf-on-dark-soft/72">
              {metaLine}
            </span>
          )}
          <span className="project-card-cta inline-flex items-center gap-1.5 text-label text-hf-accent/95 transition-transform duration-fast ease-out-expo group-hover:translate-x-0.5">
            Découvrir
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link to={href} className={cardClasses}>{inner}</Link>;
  }

  if (onClick) {
    return <button type="button" onClick={onClick} className={cn(cardClasses, "text-left w-full")}>{inner}</button>;
  }

  return <div className={cardClasses}>{inner}</div>;
}

