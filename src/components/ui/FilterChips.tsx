import { cn } from "@/lib/utils";

interface FilterChipsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterChips({
  options,
  value,
  onChange,
  className,
}: FilterChipsProps) {
  return (
    <fieldset
      className={cn(
        "filter-chips m-0 flex min-w-0 max-w-full flex-wrap gap-2.5 border-0 p-0 sm:gap-3",
        className
      )}
    >
      <legend className="sr-only">Filtres par catégorie</legend>
      {options.map((option) => {
        const isActive = value === option;
        const id = `filter-chip-${option.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <label
            key={option}
            htmlFor={id}
            data-state={isActive ? "active" : "inactive"}
            className={cn(
              "inline-flex min-h-11 max-w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-full border px-4 py-2.5 text-body-sm font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hf-ink sm:px-5",
              isActive
                ? "border-hf-ink bg-hf-ink text-hf-on-dark"
                : "border-hf-border-soft bg-hf-surface-card text-hf-secondary hover:-translate-y-px hover:border-hf-ink-soft hover:bg-hf-surface-muted hover:text-hf-strong"
            )}
          >
            <input
              id={id}
              type="radio"
              name="filter-category"
              value={option}
              checked={isActive}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </fieldset>
  );
}

