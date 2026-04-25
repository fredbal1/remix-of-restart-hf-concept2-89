import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getImageVariants } from "@/data/image-variants";
import type { HomeFinalCtaContent } from "./types";

interface HomeFinalCTAProps {
  content: HomeFinalCtaContent;
  image: string;
  imageAlt: string;
}

export function HomeFinalCTA({ content, image, imageAlt }: HomeFinalCTAProps) {
  return (
    <SectionFrame id="accueil-final-cta" tone="light" spacing="cta">
      <div className="surface-panel-light overflow-hidden rounded-2xl p-4 md:p-6">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-4">
            <p className="text-eyebrow text-hf-soft">{content.eyebrow}</p>
            <h2 className="text-h1 text-balance text-hf-strong">{content.title}</h2>
            <p className="text-body-lg text-hf-soft">{content.text}</p>
            <p className="text-label text-hf-secondary">{content.reassurance}</p>

            <div className="flex flex-wrap gap-3 pt-1">
              <ButtonLink href="/contact/" variant="primary" size="lg">
                {content.ctaPrimary}
              </ButtonLink>
              <ButtonLink href="/services/" variant="secondary" size="lg">
                {content.ctaSecondary}
              </ButtonLink>
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

