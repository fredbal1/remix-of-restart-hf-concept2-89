import type { ReactNode } from "react";

interface ContactFormFieldProps {
  label: string;
  required?: boolean;
  id: string;
  error?: string;
  errorId?: string;
  /** When provided, the <label> element receives this id — useful for aria-labelledby on custom controls */
  labelId?: string;
  children: ReactNode;
}

export function ContactFormField({
  label,
  required,
  id,
  error,
  errorId,
  labelId,
  children,
}: ContactFormFieldProps) {
  return (
    <div className="contact-form-field">
      <label htmlFor={id} id={labelId} className="contact-field-label text-label text-hf-strong block">
        <span className="contact-field-label__text">{label}</span>
        {required ? (
          <span aria-hidden="true" className="contact-field-label__required ml-0.5">
            {" "}
            *
          </span>
        ) : (
          <span className="contact-field-label__optional text-hf-soft/50 text-micro ml-1.5">(optionnel)</span>
        )}
      </label>
      {children}
      {error && errorId && (
        <p id={errorId} className="contact-field-error text-body-sm text-hf-danger mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}
