import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import { type ElementType, useRef, useCallback, type KeyboardEvent } from "react";

type ContactMethod = "email" | "telephone";

interface ContactPreferenceControlProps {
  value: ContactMethod;
  onChange: (value: ContactMethod) => void;
  id?: string;
  /** id of the visible label element — used for aria-labelledby */
  labelledBy?: string;
}

const OPTIONS: { value: ContactMethod; label: string; icon: ElementType }[] = [
  { value: "email", label: "Email", icon: Mail },
  { value: "telephone", label: "Téléphone", icon: Phone },
];

export function ContactPreferenceControl({
  value,
  onChange,
  id,
  labelledBy,
}: ContactPreferenceControlProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusAndSelect = useCallback(
    (index: number) => {
      const clamped = ((index % OPTIONS.length) + OPTIONS.length) % OPTIONS.length;
      onChange(OPTIONS[clamped].value);
      buttonRefs.current[clamped]?.focus();
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = OPTIONS.findIndex((o) => o.value === value);
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          focusAndSelect(currentIndex + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          focusAndSelect(currentIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          focusAndSelect(0);
          break;
        case "End":
          e.preventDefault();
          focusAndSelect(OPTIONS.length - 1);
          break;
        default:
          break;
      }
    },
    [value, focusAndSelect],
  );

  return (
    <div
      id={id}
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="contact-pref-control inline-flex rounded-lg border border-hf-soft/12 bg-hf-pearl/50 p-[3px] gap-[3px]"
    >
      {OPTIONS.map((opt, i) => {
        const selected = value === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              buttonRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "contact-pref-option relative inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-body-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-micro ease-out-expo",
              "focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-1",
              selected
                ? "bg-hf-surface-card text-hf-strong shadow-soft border border-hf-soft/8"
                : "text-hf-soft/70 hover:text-hf-strong border border-transparent",
            )}
          >
            <Icon
              className={cn(
                "contact-pref-option__icon w-3.5 h-3.5 shrink-0 transition-colors duration-micro",
                selected ? "text-hf-accent" : "text-hf-soft/40",
              )}
              aria-hidden="true"
            />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
