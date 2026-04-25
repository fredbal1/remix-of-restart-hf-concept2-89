import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ContactPreferenceControl } from "./ContactPreferenceControl";
import { ContactFormField } from "./ContactFormField";
import { ContactValidationBanner } from "./ContactValidationBanner";
import { ContactSubmitError } from "./ContactSubmitError";
import { useContactForm } from "./useContactForm";
import { type KeyboardEvent, type RefCallback } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { NEED_OPTIONS } from "@/lib/contact-form";

const inputCls = "contact-input text-body-sm";
const inputErr = "contact-input--error";
const selectCls = "contact-input contact-input--select text-body-sm";

interface ContactFormProps {
  className?: string;
}

/** Prevent Enter from submitting the form on text inputs */
function preventEnterSubmit(e: KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}

export function ContactForm({ className }: ContactFormProps) {
  const {
    values, errors, status, errorCode,
    showValidationBanner, preferPhone,
    isIDF, isOutsideIDF, availableCities, orderedErrors,
    honeypot, setHoneypot,
    updateField, handlePostalCodeChange, handleSubmit,
    setFieldRef, validationBannerRef, focusField,
    fid, eid, lid,
  } = useContactForm();

  return (
    <div className={cn("contact-form-shell", className)}>
      {/* ── Integrated header ── */}
      <div className="contact-form-header">
        <div className="contact-form-header-top">
          <span className="text-eyebrow text-hf-accent-deep">Votre projet</span>
          <span className="contact-form-header-line" aria-hidden="true" />
        </div>
        <h2 className="text-h3 text-hf-strong mt-3">Décrivez-nous votre besoin</h2>
        <p className="text-body-sm text-hf-soft mt-2">Tous les champs marqués * sont requis.</p>
      </div>

      <form className="contact-form-layout space-y-8" onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"}>
        {/* Honeypot — offscreen, hors parcours utilisateur */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={fid("website")}>Ne pas remplir</label>
          <input
            id={fid("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* ── Validation banner ── */}
        {showValidationBanner && (
          <ContactValidationBanner
            bannerRef={validationBannerRef}
            orderedErrors={orderedErrors}
            onFocusField={focusField}
          />
        )}

        {/* ── Identité ── */}
        <fieldset className="contact-form-panel space-y-6">
          <legend className="contact-legend">
            Vos coordonnées
          </legend>

          {/* Ligne 1 : Nom | Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ContactFormField label="Nom" required id={fid("name")} error={errors.name} errorId={eid("name")}>
              <input
                ref={setFieldRef("name")}
                id={fid("name")}
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                onKeyDown={preventEnterSubmit}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? eid("name") : undefined}
                className={cn(inputCls, errors.name && inputErr)}
                placeholder="Votre nom complet"
              />
            </ContactFormField>
            <ContactFormField label="Email" required id={fid("email")} error={errors.email} errorId={eid("email")}>
              <input
                ref={setFieldRef("email")}
                id={fid("email")}
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                onKeyDown={preventEnterSubmit}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? eid("email") : undefined}
                className={cn(inputCls, errors.email && inputErr)}
                placeholder="votre@email.com"
              />
            </ContactFormField>
          </div>

          {/* Ligne 2 : Téléphone | Code postal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="order-1 sm:order-2">
              <ContactFormField
                label="Téléphone"
                required={preferPhone}
                id={fid("phone")}
                error={errors.phone}
                errorId={eid("phone")}
              >
                <input
                  ref={setFieldRef("phone")}
                  id={fid("phone")}
                  type="tel"
                  autoComplete="tel"
                  required={preferPhone}
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onKeyDown={preventEnterSubmit}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? eid("phone") : undefined}
                  className={cn(inputCls, errors.phone && inputErr)}
                  placeholder={SITE_CONFIG.contact.phoneDisplay}
                />
              </ContactFormField>
            </div>
            <div className="order-2 sm:order-1">
              <ContactFormField
                label="Code postal"
                required
                id={fid("postalCode")}
                error={errors.postalCode}
                errorId={eid("postalCode")}
              >
                <input
                  ref={setFieldRef("postalCode")}
                  id={fid("postalCode")}
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  value={values.postalCode}
                  onChange={(e) => handlePostalCodeChange(e.target.value)}
                  onKeyDown={preventEnterSubmit}
                  aria-invalid={!!errors.postalCode}
                  aria-describedby={errors.postalCode ? eid("postalCode") : undefined}
                  className={cn(inputCls, errors.postalCode && inputErr)}
                  placeholder="91100"
                />
              </ContactFormField>
            </div>
          </div>

          {/* Zone conditionnelle pleine largeur */}
          {isIDF && availableCities.length > 0 && (
            <ContactFormField
              label="Ville"
              required
              id={fid("city")}
              labelId={lid("city")}
              error={errors.city}
              errorId={eid("city")}
            >
              <div className="contact-select-shell">
                <select
                  ref={setFieldRef("city") as RefCallback<HTMLSelectElement>}
                  id={fid("city")}
                  required
                  value={values.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  aria-invalid={!!errors.city}
                  aria-required="true"
                  aria-describedby={errors.city ? eid("city") : undefined}
                  className={cn(
                    selectCls,
                    !values.city && "text-hf-soft/70",
                    errors.city && inputErr,
                  )}
                >
                  <option value="">Choisir une ville</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <span className="contact-select-icon" aria-hidden="true">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </div>
            </ContactFormField>
          )}

          {isOutsideIDF && (
            <div className="contact-context-note rounded-md border border-hf-accent/15 bg-hf-pearl/30 p-4">
              <p className="text-body-sm font-medium text-hf-strong">
                Projet hors Île-de-France
              </p>
              <p className="text-micro text-hf-soft mt-1">
                HFconcept intervient à domicile à Paris et en Île-de-France. Pour les autres localisations, nous étudions les demandes dans le cadre d'un accompagnement à distance.
              </p>
            </div>
          )}
        </fieldset>

        {/* ── Séparateur subtil ── */}
        <div className="contact-separator" aria-hidden="true" />

        {/* ── Projet ── */}
        <fieldset className="contact-form-panel space-y-6">
          <legend className="contact-legend">
            Votre projet
          </legend>

          <ContactFormField
            label="Type de besoin"
            required
            id={fid("need")}
            labelId={lid("need")}
            error={errors.need}
            errorId={eid("need")}
          >
            <div className="contact-select-shell">
              <select
                ref={setFieldRef("need") as RefCallback<HTMLSelectElement>}
                id={fid("need")}
                required
                value={values.need}
                onChange={(e) => updateField("need", e.target.value)}
                aria-invalid={!!errors.need}
                aria-required="true"
                aria-describedby={errors.need ? eid("need") : undefined}
                className={cn(
                  selectCls,
                  !values.need && "text-hf-soft/70",
                  errors.need && inputErr,
                )}
              >
                <option value="">Choisir un type de besoin</option>
                {NEED_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="contact-select-icon" aria-hidden="true">
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </ContactFormField>

          <ContactFormField label="Message" required id={fid("message")} error={errors.message} errorId={eid("message")}>
            <textarea
              ref={setFieldRef("message") as RefCallback<HTMLTextAreaElement>}
              id={fid("message")}
              rows={5}
              required
              value={values.message}
              onChange={(e) => updateField("message", e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? eid("message") : undefined}
              className={cn(inputCls, "resize-y min-h-[140px]", errors.message && inputErr)}
              placeholder="Décrivez votre espace, vos envies, vos contraintes, et ce que vous aimeriez transformer."
            />
          </ContactFormField>
        </fieldset>

        {/* ── Séparateur subtil ── */}
        <div className="contact-separator" aria-hidden="true" />

        {/* ── Préférence de contact ── */}
        <div className="contact-form-panel contact-form-panel--compact space-y-4">
          <span id={lid("contactPref")} className="text-label text-hf-strong mb-2.5 block">Préférence de contact</span>
          <ContactPreferenceControl
            value={values.contactPref}
            labelledBy={lid("contactPref")}
            onChange={(v) => {
              updateField("contactPref", v);
              if (v === "email") updateField("callbackSlot", "");
            }}
          />

          {preferPhone && (
            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 duration-fast">
              <ContactFormField
                label="Créneau de rappel souhaité"
                id={fid("callback")}
                error={errors.callbackSlot}
                errorId={eid("callback")}
              >
                <input
                  ref={setFieldRef("callbackSlot")}
                  id={fid("callback")}
                  type="text"
                  value={values.callbackSlot}
                  onChange={(e) => updateField("callbackSlot", e.target.value)}
                  onKeyDown={preventEnterSubmit}
                  className={cn(inputCls, errors.callbackSlot && inputErr)}
                  placeholder="Ex. : en semaine après 18h, mardi matin…"
                />
              </ContactFormField>
            </div>
          )}
        </div>

        {/* ── Error banner ── */}
        {errorCode && <ContactSubmitError errorCode={errorCode} />}

        {/* ── Submit ── */}
        <div className="contact-submit-zone">
          <div className="contact-submit-shell">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
              icon={status === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : undefined}
            >
              {status === "submitting" ? "Envoi en cours…" : status === "error" ? "Réessayer" : "Envoyer le message"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

