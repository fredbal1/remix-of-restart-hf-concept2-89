import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "lg" | "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "border-hf-ink bg-hf-ink text-hf-on-dark shadow-[0_16px_32px_-24px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 hover:bg-hf-ink-soft hover:border-hf-ink-soft",
  secondary:
    "border-hf-border-soft bg-hf-surface-card text-hf-strong shadow-[0_12px_24px_-18px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:border-hf-ink-soft hover:bg-hf-surface-muted",
  ghost:
    "border-transparent bg-transparent text-hf-secondary hover:-translate-y-0.5 hover:bg-hf-surface-muted hover:text-hf-strong",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  lg: "min-h-12 px-6 text-[0.95rem]",
  md: "min-h-11 px-5 text-sm",
  sm: "min-h-10 px-4 text-[0.8125rem]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-[0.01em] transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hf-ink disabled:pointer-events-none disabled:opacity-60",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
