import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { getImageVariants } from "@/data/image-variants";

type StudioAboutContent = typeof import("@/data/studio-content").STUDIO_CONTENT["aboutUs"];

interface StudioAboutProps {
  content: StudioAboutContent;
  imageSrc: string;
}

export function StudioAbout({ content, imageSrc }: StudioAboutProps) {
  return (
    <SectionFrame tone="light" spacing="standard">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-5">
          <p className="text-eyebrow text-hf-soft">{content.eyebrow}</p>
          <h2 className="text-h1 whitespace-pre-line text-hf-strong">{content.title}</h2>
          {content.description.map((paragraph) => (
            <p key={paragraph} className="text-body text-hf-soft">
              {paragraph}
            </p>
          ))}

          <aside className="rounded-xl border border-hf-accent/20 bg-white/75 p-6">
            <p className="text-body-lead text-hf-strong">{content.manifesto.lead}</p>
            <p className="mt-3 text-label text-hf-secondary">{content.manifesto.tagline}</p>
          </aside>
        </div>

        <figure className="surface-panel-light overflow-hidden rounded-xl p-2">
          <OptimizedImage
            src={imageSrc}
            variants={getImageVariants(imageSrc)}
            alt={content.imageAlt}
            sizes="(max-width: 1024px) 100vw, 40vw"
            width={960}
            height={1200}
            className="aspect-[4/5] w-full rounded-lg object-cover"
          />
        </figure>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {content.facts.map((fact) => (
          <li
            key={fact.label}
            className="rounded-lg border border-hf-accent/20 bg-white/70 p-5 text-center shadow-soft"
          >
            <p className="text-h3 text-hf-accent-deep">{fact.value}</p>
            <p className="mt-1 text-body-sm text-hf-soft">{fact.label}</p>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}

