import { SectionIntro } from "@/components/ui/SectionIntro";

interface ProjectResultsProps {
  resultPoints?: string[];
  categoryLabel: string;
}

export function ProjectResults({
  resultPoints,
  categoryLabel,
}: ProjectResultsProps) {
  if (!resultPoints || resultPoints.length === 0) return null;

  const gridClassName =
    resultPoints.length === 1
      ? "max-w-xl"
      : resultPoints.length === 2
      ? "max-w-4xl sm:grid-cols-2"
      : "max-w-5xl sm:grid-cols-2 xl:grid-cols-3";

  return (
    <>
      <SectionIntro
        eyebrow={categoryLabel}
        title="Les résultats"
        description="Les gains concrets attendus ou obtenus une fois le projet mis en œuvre."
        align="center"
      />
      <div className={`grid grid-cols-1 gap-4 lg:gap-5 mx-auto ${gridClassName}`}>
        {resultPoints.map((text, i) => (
          <div
            key={i}
            className={`h-full rounded-[1.5rem] px-5 py-5 lg:px-6 lg:py-6 ${
              i === 0 ? "surface-card-featured" : "surface-card-soft"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-label text-hf-accent-deep/75 tabular-nums"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="h-px flex-1 bg-hf-accent-deep/18"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 text-body text-hf-strong leading-body-loose">
              {text}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

