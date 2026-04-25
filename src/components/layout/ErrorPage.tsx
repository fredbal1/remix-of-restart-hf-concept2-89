import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";

const TEXT_ERROR_CODE = "font-display text-[clamp(6rem,14vw,12rem)] leading-[0.85]";

interface ErrorPageProps {
  code: string;
  eyebrow?: string;
  title: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  tertiaryLabel?: string;
  onTertiaryClick?: () => void;
}

export function ErrorPage({
  code,
  eyebrow,
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  onSecondaryClick,
  tertiaryLabel,
  onTertiaryClick,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center surface-dark">
      <div className="text-center container-hf">
        <span
          className={`block ${TEXT_ERROR_CODE} text-hf-accent/15 select-none`}
          aria-hidden="true"
        >
          {code}
        </span>

        {eyebrow && (
          <span className="text-eyebrow text-hf-accent mb-4 block -mt-4">
            {eyebrow}
          </span>
        )}

        <h1 className="text-display-xl text-hf-on-dark mb-6">
          {title}
        </h1>

        <p className="text-body-lg text-hf-on-dark-soft mb-10 max-w-md mx-auto">
          {text}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={primaryHref} variant="primary">
            {primaryLabel}
          </ButtonLink>
          {secondaryLabel && onSecondaryClick && (
            <Button variant="secondary" onClick={onSecondaryClick}>
              {secondaryLabel}
            </Button>
          )}
          {tertiaryLabel && onTertiaryClick && (
            <Button variant="ghost" onClick={onTertiaryClick}>
              {tertiaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
