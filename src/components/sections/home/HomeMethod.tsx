import studioPortraitImg from "@/assets/images/hero/hero-studio.webp";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getImageVariants } from "@/data/image-variants";
import type { HomeEditorialContent } from "./types";

interface HomeMethodProps {
  editorial: HomeEditorialContent;
}

export function HomeMethod({ editorial }: HomeMethodProps) {
  return (
    <SectionFrame id="accueil-methode" tone="light" spacing="standard">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-6">
          <p className="text-eyebrow text-hf-soft">{editorial.eyebrow}</p>
          <h2 className="text-h1 text-balance text-hf-strong">{editorial.title}</h2>
          <p className="text-body-lg max-w-[58ch] text-hf-soft">{editorial.text}</p>

          <ul className="grid gap-3 sm:grid-cols-3">
            {editorial.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-md border border-hf-accent/20 bg-white/70 px-4 py-3 text-center text-body-sm text-hf-strong shadow-soft"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/studio/" variant="primary" size="lg">
              {editorial.cta}
            </ButtonLink>
            <ButtonLink href="/contact/" variant="ghost" size="lg">
              Échanger sur votre projet
            </ButtonLink>
          </div>
        </div>

        <figure className="surface-panel-light overflow-hidden rounded-xl p-2">
          <OptimizedImage
            src={studioPortraitImg}
            variants={getImageVariants(studioPortraitImg)}
            alt="Portrait studio HFconcept"
            sizes="(max-width: 1024px) 100vw, 36vw"
            width={960}
            height={1200}
            className="aspect-[4/5] w-full rounded-lg object-cover"
          />
        </figure>
      </div>
    </SectionFrame>
  );
}
