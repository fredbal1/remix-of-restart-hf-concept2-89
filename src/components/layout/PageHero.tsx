import type { ReactNode } from "react";
import { OptimizedImage, type ResponsiveImageVariant } from "@/components/common/OptimizedImage";
import { getImageVariants } from "@/data/image-variants";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  metaLine?: string;
  image: string;
  imageAlt?: string;
  imageVariants?: ResponsiveImageVariant[];
  className?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  metaLine,
  image,
  imageAlt,
  imageVariants,
  className,
  children,
}: PageHeroProps) {
  const titleLines = title.split("\n");

  return (
    <section className={cn("surface-dark relative overflow-hidden", className)}>
      <OptimizedImage
        src={image}
        alt={imageAlt ?? ""}
        variants={imageVariants ?? getImageVariants(image)}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(0_0%_0%/0.78)_0%,hsl(0_0%_0%/0.52)_42%,hsl(0_0%_0%/0.16)_100%)]" />

      <div className="container-hf relative z-10 py-28 sm:py-32 lg:py-36">
        <div className="surface-panel-dark max-w-3xl rounded-xl p-6 sm:p-8 lg:p-10">
          {eyebrow && <p className="text-eyebrow text-hf-accent">{eyebrow}</p>}
          <h1
            className="mt-3 text-h1 whitespace-pre-line text-hf-on-dark"
            aria-label={titleLines.join(" ")}
          >
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>
          {description && <p className="mt-5 text-body text-hf-on-dark-soft">{description}</p>}
          {metaLine && <p className="mt-4 text-label text-hf-on-dark-soft/70">{metaLine}</p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}

