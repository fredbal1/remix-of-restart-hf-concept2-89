import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import "./contact-proof-band.css";

const TEXT_PROOF_VALUE = "font-display text-[1.5rem] font-semibold leading-none tracking-[-0.025em] sm:text-[1.875rem]";

interface ProofItem {
  value: string;
  label: string;
}

interface ContactProofBandProps {
  items: ProofItem[];
  className?: string;
}

export const ContactProofBand = forwardRef<HTMLElement, ContactProofBandProps>(
  function ContactProofBand({ items, className }, ref) {
    return (
      <section ref={ref} className={cn("proof-band relative surface-muted", className)}>
        <div className="container-hf">
          <div className="proof-band__shell">
            <div
              className={cn(
                "proof-band__grid grid",
                "grid-cols-1",
                "sm:grid-cols-2",
                "lg:grid-cols-4"
              )}
            >
            {items.map((item, i) => (
              <div
                key={i}
                className="proof-band__item flex flex-col items-center text-center"
              >
                <span className={cn(TEXT_PROOF_VALUE, "proof-band__value text-hf-accent-deep block")}>
                  {item.value}
                </span>
                <span className="proof-band__label text-body-sm text-hf-soft max-w-[22ch]">
                  {item.label}
                </span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

