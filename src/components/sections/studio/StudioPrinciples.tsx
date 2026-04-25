import { OptimizedImage } from "@/components/common/OptimizedImage";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getImageVariants } from "@/data/image-variants";
import { cn } from "@/lib/utils";

type StudioPrinciplesContent = typeof import("@/data/studio-content").STUDIO_CONTENT["principlesSection"];

interface StudioPrinciplesProps {
  content: StudioPrinciplesContent;
}

export function StudioPrinciples({ content }: StudioPrinciplesProps) {
  return (
    <SectionFrame tone="muted" spacing="standard">
      <SectionIntro eyebrow={content.eyebrow} title={content.title} align="center" />

      <div className="mt-10 space-y-6">
        {content.items.map((item) => (
          <article
            key={item.number}
            className={cn(
              "surface-panel-light rounded-xl p-4 md:p-6",
              "grid items-center gap-6 lg:grid-cols-2",
            )}
          >
            <figure className={cn(item.layout === "image-right" && "lg:order-2")}>
              <OptimizedImage
                src={item.imageSrc}
                variants={getImageVariants(item.imageSrc)}
                alt={item.imageAlt}
                sizes="(max-width: 1024px) 100vw, 44vw"
                width={960}
                height={640}
                className="aspect-[16/10] w-full rounded-lg object-cover"
              />
            </figure>

            <div className={cn("space-y-3", item.layout === "image-right" && "lg:order-1")}>
              <p className="text-micro-label text-hf-accent-deep">{item.number}</p>
              <h3 className="text-h3 text-hf-strong">{item.title}</h3>
              <p className="text-body text-hf-soft">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

