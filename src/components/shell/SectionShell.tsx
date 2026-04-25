import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./section-shell.css";

type SectionSurface = "light" | "muted" | "dark";
type SectionSpacing = "standard" | "dense";

interface SectionShellProps {
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  className?: string;
  children: ReactNode;
  id?: string;
}

const surfaceClasses: Record<SectionSurface, string> = {
  light: "surface-light",
  muted: "surface-muted",
  dark: "surface-dark",
};

const surfaceFrameClasses: Record<SectionSurface, string> = {
  light: "section-shell--light",
  muted: "section-shell--muted",
  dark: "section-shell--dark",
};

const spacingClasses: Record<SectionSpacing, string> = {
  standard: "spacing-section-standard",
  dense: "spacing-section-dense",
};

export function SectionShell({
  surface = "light",
  spacing = "standard",
  className,
  children,
  id,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-shell",
        surfaceClasses[surface],
        surfaceFrameClasses[surface],
        spacingClasses[spacing],
        className
      )}
    >
      <div className="container-hf section-shell__container">
        <div className="section-shell__frame">{children}</div>
      </div>
    </section>
  );
}
