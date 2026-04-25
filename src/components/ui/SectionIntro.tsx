import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className,
}: SectionIntroProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  const titleTone = inverted ? "text-hf-on-dark" : "text-hf-strong";
  const bodyTone = inverted ? "text-hf-on-dark-soft" : "text-hf-soft";
  const eyebrowTone = inverted ? "text-hf-accent" : "text-hf-soft";

  return (
    <header className={cn("max-w-3xl space-y-3", alignClass, className)}>
      {eyebrow && <p className={cn("text-eyebrow", eyebrowTone)}>{eyebrow}</p>}
      <h2 className={cn("text-h2 whitespace-pre-line text-balance", titleTone)}>{title}</h2>
      {description && <p className={cn("text-body-lg", bodyTone)}>{description}</p>}
    </header>
  );
}

