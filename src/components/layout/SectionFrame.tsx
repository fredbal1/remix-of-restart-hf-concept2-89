import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "light" | "muted" | "dark";
type SectionSpacing = "hero" | "standard" | "dense" | "cta";

const TONE_CLASS: Record<SectionTone, string> = {
  light: "surface-light text-hf-strong",
  muted: "surface-muted text-hf-strong",
  dark: "surface-dark text-hf-on-dark",
};

const SPACING_CLASS: Record<SectionSpacing, string> = {
  hero: "spacing-section-hero",
  standard: "spacing-section-standard",
  dense: "spacing-section-dense",
  cta: "spacing-section-cta",
};

interface SectionFrameProps extends PropsWithChildren {
  id?: string;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  className?: string;
  containerClassName?: string;
}

export function SectionFrame({
  id,
  tone = "light",
  spacing = "standard",
  className,
  containerClassName,
  children,
}: SectionFrameProps) {
  return (
    <section id={id} className={cn("relative", TONE_CLASS[tone], SPACING_CLASS[spacing], className)}>
      <div className={cn("container-hf", containerClassName)}>{children}</div>
    </section>
  );
}

