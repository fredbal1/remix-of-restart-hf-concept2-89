import { AlertCircle } from "lucide-react";
import { type SubmitErrorCode } from "@/lib/contact-submit";
import { CONTACT_ERROR_BANNER_CONTENT } from "./useContactForm";

interface ContactSubmitErrorProps {
  errorCode: SubmitErrorCode;
}

export function ContactSubmitError({ errorCode }: ContactSubmitErrorProps) {
  const content = CONTACT_ERROR_BANNER_CONTENT[errorCode];
  return (
    <div role="alert" className="contact-feedback-banner contact-feedback-banner--error flex items-start gap-3 rounded-lg border border-hf-danger/20 bg-hf-danger/5 p-4">
      <AlertCircle className="w-5 h-5 text-hf-danger shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-body-sm font-medium text-hf-danger">{content.title}</p>
        <p className="text-micro text-hf-danger/80 mt-0.5">{content.text}</p>
      </div>
    </div>
  );
}
