import { useMemo, useState } from "react";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getImageVariants } from "@/data/image-variants";
import { cn } from "@/lib/utils";
import type { HomeProjectionContent } from "./types";

interface HomeProjection3DProps {
  content: HomeProjectionContent;
  image3d: string;
  imageResult: string;
  image3dAlt: string;
  imageResultAlt: string;
}

export function HomeProjection3D({
  content,
  image3d,
  imageResult,
  image3dAlt,
  imageResultAlt,
}: HomeProjection3DProps) {
  const [mode, setMode] = useState<"projection" | "result">("projection");

  const view = useMemo(() => {
    if (mode === "projection") {
      return {
        image: image3d,
        alt: image3dAlt,
        caption: content.captions[0],
      };
    }

    return {
      image: imageResult,
      alt: imageResultAlt,
      caption: content.captions[1],
    };
  }, [content.captions, image3d, image3dAlt, imageResult, imageResultAlt, mode]);

  return (
    <SectionFrame id="accueil-projection-3d" tone="muted" spacing="standard">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-6">
          <p className="text-eyebrow text-hf-soft">{content.eyebrow}</p>
          <h2 className="text-h1 text-balance text-hf-strong">{content.title}</h2>
          <p className="text-body-lg text-hf-soft">{content.text}</p>

          <div className="inline-flex rounded-full border border-hf-accent/20 bg-white p-1">
            <button
              type="button"
              aria-pressed={mode === "projection"}
              onClick={() => setMode("projection")}
              className={cn(
                "rounded-full px-4 py-2 text-body-sm transition",
                mode === "projection" ? "bg-hf-ink text-hf-on-dark" : "text-hf-soft hover:text-hf-strong",
              )}
            >
              {content.toggleLabels[0]}
            </button>
            <button
              type="button"
              aria-pressed={mode === "result"}
              onClick={() => setMode("result")}
              className={cn(
                "rounded-full px-4 py-2 text-body-sm transition",
                mode === "result" ? "bg-hf-ink text-hf-on-dark" : "text-hf-soft hover:text-hf-strong",
              )}
            >
              {content.toggleLabels[1]}
            </button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3">
            {content.proofs.map((proof) => (
              <li key={proof.label} className="rounded-md border border-hf-accent/20 bg-white/80 p-4">
                <p className="text-micro-label text-hf-secondary">{proof.label}</p>
                <p className="mt-1 text-h4 text-hf-strong">{proof.title}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={content.ctaHref} variant="primary" size="lg">
              {content.cta}
            </ButtonLink>
            <ButtonLink href="/realisations/cuisine-noire-chene-ilot/" variant="ghost" size="lg">
              Voir un cas concret
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-4">
          <figure className="surface-panel-light overflow-hidden rounded-xl p-2">
            <OptimizedImage
              src={view.image}
              variants={getImageVariants(view.image)}
              alt={view.alt}
              sizes="(max-width: 1024px) 100vw, 44vw"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <figcaption className="mt-3 px-2 pb-1 text-body-sm text-hf-soft">{view.caption}</figcaption>
          </figure>

          <aside className="rounded-xl border border-hf-accent/20 bg-white/80 p-5">
            <p className="text-micro-label text-hf-soft">{content.distanceBand.badge}</p>
            <h3 className="mt-2 text-h3 text-hf-strong">{content.distanceBand.title}</h3>
            <p className="mt-2 text-body-sm text-hf-soft">{content.distanceBand.description}</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <p className="text-h4 text-hf-strong">{content.distanceBand.price}</p>
              <ButtonLink href={content.distanceBand.ctaHref} variant="secondary" size="sm">
                {content.distanceBand.ctaLabel}
              </ButtonLink>
            </div>
          </aside>
        </div>
      </div>
    </SectionFrame>
  );
}

