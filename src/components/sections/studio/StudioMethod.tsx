import { SectionFrame } from "@/components/layout/SectionFrame";
import { SectionIntro } from "@/components/ui/SectionIntro";

type StudioMethodContent = typeof import("@/data/studio-content").STUDIO_CONTENT["methodSection"];

interface StudioMethodProps {
  content: StudioMethodContent;
}

export function StudioMethod({ content }: StudioMethodProps) {
  return (
    <SectionFrame id="methode" tone="dark" spacing="dense">
      <SectionIntro
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.intro}
        inverted
      />

      <ol className="mt-10 grid gap-5 md:grid-cols-2">
        {content.steps.map((step) => (
          <li key={step.number} className="surface-panel-dark rounded-xl p-6">
            <p className="text-micro-label text-hf-accent">{step.number}</p>
            <h3 className="mt-2 text-h4 text-hf-on-dark">{step.title}</h3>
            <p className="mt-3 text-body-sm text-hf-on-dark-soft">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}

