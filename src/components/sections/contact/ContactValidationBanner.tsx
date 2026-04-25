import { type RefObject } from "react";
import { AlertCircle } from "lucide-react";
import type { ContactData } from "@/lib/contact-form";

interface OrderedError {
  field: keyof ContactData;
  label: string;
}

interface ContactValidationBannerProps {
  bannerRef: RefObject<HTMLDivElement>;
  orderedErrors: OrderedError[];
  onFocusField: (field: keyof ContactData) => void;
}

export function ContactValidationBanner({
  bannerRef,
  orderedErrors,
  onFocusField,
}: ContactValidationBannerProps) {
  return (
    <div
      ref={bannerRef}
      role="alert"
      tabIndex={-1}
      className="contact-feedback-banner contact-feedback-banner--validation flex items-start gap-3 rounded-lg border border-hf-danger/20 bg-hf-danger/5 p-4 focus:outline-none"
    >
      <AlertCircle className="w-5 h-5 text-hf-danger shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-body-sm font-medium text-hf-danger">Formulaire incomplet</p>
        <p className="text-micro text-hf-danger/80 mt-0.5">
          Merci de corriger les champs signalés avant d&apos;envoyer votre message.
        </p>
        {orderedErrors.length > 0 && (
          <ul className="mt-2 space-y-0.5">
            {orderedErrors.map(({ field, label }) => (
              <li key={field}>
                <button
                  type="button"
                  className="contact-feedback-link text-micro text-hf-danger/90 underline underline-offset-2 hover:text-hf-danger transition-colors focus-visible:outline-2 focus-visible:outline-hf-accent"
                  onClick={() => onFocusField(field)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
