import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getImageVariants } from "@/data/image-variants";

interface FinalCtaSectionProps {
  eyebrow: string;
  title: string;
  text: string;
  reassurance?: string;
  ctaPrimary: string;
  ctaPrimaryHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  image: string;
  imageAlt: string;
  tone?: "light" | "muted";
  className?: string;
}

export function FinalCtaSection({
  eyebrow,
  title,
  text,
  reassurance,
  ctaPrimary,
  ctaPrimaryHref = "/contact/",
  ctaSecondary,
  ctaSecondaryHref,
  image,
  imageAlt,
  tone = "light",
  className,
}: FinalCtaSectionProps) {
  return (
    <SectionFrame tone={tone === "light" ? "light" : "muted"} spacing="cta" className={className}>
      <div className="surface-panel-light overflow-hidden rounded-2xl p-4 md:p-6">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-4">
            <p className="text-eyebrow text-hf-soft">{eyebrow}</p>
            <h2 className="text-h1 text-balance text-hf-strong">{title}</h2>
            <p className="text-body-lg text-hf-soft">{text}</p>
            {reassurance && <p className="text-label text-hf-secondary">{reassurance}</p>}
            <div className="flex flex-wrap gap-3 pt-1">
              <ButtonLink href={ctaPrimaryHref} variant="primary" size="lg">
                {ctaPrimary}
              </ButtonLink>
              {ctaSecondary && ctaSecondaryHref && (
                <ButtonLink href={ctaSecondaryHref} variant="secondary" size="lg">
                  {ctaSecondary}
                </ButtonLink>
              )}
            </div>
          </div>

          <figure className="overflow-hidden rounded-xl">
            <OptimizedImage
              src={image}
              variants={getImageVariants(image)}
              alt={imageAlt}
              sizes="(max-width: 1024px) 100vw, 42vw"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </SectionFrame>
  );
}

