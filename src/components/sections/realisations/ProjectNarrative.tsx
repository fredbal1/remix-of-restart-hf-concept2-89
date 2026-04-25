interface ProjectNarrativeProps {
  needPoints?: string[];
  constraintPoints?: string[];
  solutionPoints?: string[];
}

const CARDS: Array<{
  key: keyof ProjectNarrativeProps;
  title: string;
}> = [
  { key: "needPoints", title: "Le besoin" },
  { key: "constraintPoints", title: "Les contraintes" },
  { key: "solutionPoints", title: "Notre réponse" },
];

export function ProjectNarrative({
  needPoints,
  constraintPoints,
  solutionPoints,
}: ProjectNarrativeProps) {
  const data: Record<string, string[] | undefined> = {
    needPoints,
    constraintPoints,
    solutionPoints,
  };

  const visibleCards = CARDS.filter(
    (c) => data[c.key] && data[c.key]!.length > 0
  );

  if (visibleCards.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-1 gap-5 lg:gap-6 ${
        visibleCards.length === 1
          ? "md:grid-cols-1 max-w-lg mx-auto"
          : visibleCards.length === 2
          ? "md:grid-cols-2 max-w-3xl mx-auto"
          : "md:grid-cols-3"
      }`}
    >
      {visibleCards.map((card) => (
        <div
          key={card.key}
          className={`rounded-[1.6rem] p-6 lg:p-8 ${
            card.key === "solutionPoints" ? "surface-card-featured" : "surface-card"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-label text-hf-accent-deep/75 tabular-nums"
              aria-hidden="true"
            >
              {String(visibleCards.findIndex((entry) => entry.key === card.key) + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-hf-accent-deep/18" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-h4 text-hf-accent-deep">
            {card.title}
          </h3>
          <ul className="mt-4 space-y-3">
            {data[card.key]!.map((point, i) => (
              <li
                key={i}
                className="text-body text-hf-soft flex items-start gap-3 leading-body-loose"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hf-accent-deep/40"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

