import { useState, useRef, useId, useCallback, useEffect, useMemo, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { buildSchema, NEED_OPTIONS, INITIAL_CONTACT_VALUES, type ContactData } from "@/lib/contact-form";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { submitContactForm, ContactSubmitError, type SubmitErrorCode } from "@/lib/contact-submit";
import { getPostalCodeContext, getCitiesByPostalCode, getNormalizedPostalCode } from "@/lib/postalCodeLookup";
import { SITE_CONFIG } from "@/data/site-config";

/** Ordered list of fields matching DOM order for scroll/focus logic */
const FIELD_ORDER: (keyof ContactData)[] = [
  "name", "email", "phone", "postalCode", "city", "need", "message", "callbackSlot",
];

/** Human-readable labels for banner summary */
const FIELD_LABELS: Partial<Record<keyof ContactData, string>> = {
  name: "Nom",
  email: "Email",
  phone: "Téléphone",
  postalCode: "Code postal",
  city: "Ville",
  need: "Type de besoin",
  message: "Message",
  callbackSlot: "Créneau de rappel",
};

type FieldErrors = Partial<Record<keyof ContactData, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

export const CONTACT_ERROR_BANNER_CONTENT: Record<SubmitErrorCode, { title: string; text: string }> = {
  TOO_FAST: {
    title: "Envoi trop rapide",
    text: "Merci d'attendre quelques secondes avant de réessayer.",
  },
  CONFIG_MISSING: {
    title: "Formulaire non configuré",
    text: `Le formulaire n'est pas configuré correctement. Vous pouvez nous écrire à ${SITE_CONFIG.contact.email}.`,
  },
  NETWORK_ERROR: {
    title: "Connexion interrompue",
    text: "Une erreur réseau est survenue. Vérifiez votre connexion puis réessayez.",
  },
  SUBMIT_FAILED: {
    title: "L'envoi a échoué",
    text: `Une erreur est survenue. Réessayez dans quelques instants. Si le problème persiste, écrivez-nous à ${SITE_CONFIG.contact.email}.`,
  },
};

export function useContactForm() {
  const uid = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mountedAtRef = useRef(Date.now());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorCode, setErrorCode] = useState<SubmitErrorCode | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState<ContactData>({ ...INITIAL_CONTACT_VALUES });
  const [honeypot, setHoneypot] = useState("");
  const [showValidationBanner, setShowValidationBanner] = useState(false);

  // Pre-fill "need" from query param (e.g. /contact/?need=conception-3d)
  useEffect(() => {
    const needParam = searchParams.get("need");
    if (needParam && NEED_OPTIONS.some((o) => o.value === needParam)) {
      setValues((prev) => ({ ...prev, need: needParam }));
    }
  }, [searchParams]);

  const fieldRefs = useRef<Partial<Record<keyof ContactData, HTMLElement | null>>>({});
  const validationBannerRef = useRef<HTMLDivElement>(null);

  const setFieldRef = useCallback(
    (field: keyof ContactData) => (el: HTMLElement | null) => {
      fieldRefs.current[field] = el;
    },
    [],
  );

  const preferPhone = values.contactPref === "telephone";

  // Postal code context
  const postalContext = useMemo(
    () => getPostalCodeContext(values.postalCode),
    [values.postalCode],
  );
  const isIDF = postalContext === "ile-de-france";
  const isOutsideIDF = postalContext === "outside-ile-de-france";
  const availableCities = useMemo(
    () => (isIDF ? getCitiesByPostalCode(values.postalCode) : []),
    [isIDF, values.postalCode],
  );

  function updateField(field: keyof ContactData, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  // Handle postal code changes with smart city clearing
  function handlePostalCodeChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 5);
    const normalized = getNormalizedPostalCode(digits);
    const newContext = getPostalCodeContext(normalized);

    setValues((prev) => {
      const next = { ...prev, postalCode: digits };

      if (newContext === "incomplete" || newContext === "outside-ile-de-france") {
        next.city = "";
      } else if (newContext === "ile-de-france" && prev.city) {
        const cities = getCitiesByPostalCode(normalized);
        if (!cities.includes(prev.city)) {
          next.city = "";
        }
      }

      if (newContext === "ile-de-france") {
        const cities = getCitiesByPostalCode(normalized);
        if (cities.length === 1) {
          next.city = cities[0];
        }
      }

      if (newContext === "outside-ile-de-france" && !prev.need) {
        next.need = "projet-a-distance";
      }

      return next;
    });

    if (errors.postalCode) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.postalCode;
        return next;
      });
    }
    if (errors.city) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.city;
        return next;
      });
    }
  }

  /** Fallback: scroll and focus first invalid field */
  function scrollAndFocusFirstError(fieldErrors: FieldErrors) {
    const firstErrorField = FIELD_ORDER.find((f) => fieldErrors[f]);
    if (!firstErrorField) return;
    const el = fieldRefs.current[firstErrorField];
    if (!el) return;
    const offset = 100;
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top >= offset && rect.bottom <= window.innerHeight;
    if (!isVisible) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    }
    requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
  }

  /** Focus a field by key — used by banner summary links */
  function focusField(field: keyof ContactData) {
    const el = fieldRefs.current[field];
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = buildSchema(preferPhone).safeParse(values);
    const fieldErrors: FieldErrors = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
    }

    // Conditional city validation for IDF
    if (isIDF && !fieldErrors.postalCode) {
      if (availableCities.length === 0) {
        fieldErrors.postalCode = "Ce code postal n'est pas reconnu en Île-de-France.";
      } else if (!values.city) {
        fieldErrors.city = "Merci de sélectionner une ville.";
      } else if (!availableCities.includes(values.city)) {
        fieldErrors.city = "Merci de sélectionner une ville valide.";
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setShowValidationBanner(true);
      requestAnimationFrame(() => {
        if (validationBannerRef.current) {
          validationBannerRef.current.focus({ preventScroll: false });
        } else {
          scrollAndFocusFirstError(fieldErrors);
        }
      });
      return;
    }

    setErrors({});
    setErrorCode(null);
    setShowValidationBanner(false);
    setStatus("submitting");
    try {
      await submitContactForm(values, {
        honeypot,
        elapsedMs: Date.now() - mountedAtRef.current,
        pageUrl: window.location.href,
      });
      setStatus("success");
      toast.success("Votre message a bien été envoyé.");
      navigate("/merci/");
    } catch (err) {
      const code: SubmitErrorCode = err instanceof ContactSubmitError ? err.code : "SUBMIT_FAILED";
      const content = CONTACT_ERROR_BANNER_CONTENT[code];
      toast.error(content.title);
      setErrorCode(code);
      setStatus("error");
    }
  }

  const fid = (n: string) => `${uid}-${n}`;
  const eid = (n: string) => `${uid}-${n}-err`;
  const lid = (n: string) => `${uid}-${n}-label`;

  /** Ordered list of current field errors for banner summary */
  const orderedErrors = useMemo(
    () =>
      FIELD_ORDER.filter((f) => errors[f]).map((f) => ({
        field: f,
        label: FIELD_LABELS[f] || f,
      })),
    [errors],
  );

  return {
    values,
    errors,
    status,
    errorCode,
    showValidationBanner,
    preferPhone,
    isIDF,
    isOutsideIDF,
    availableCities,
    orderedErrors,
    honeypot,
    setHoneypot,
    updateField,
    handlePostalCodeChange,
    handleSubmit,
    setFieldRef,
    validationBannerRef,
    focusField,
    fid,
    eid,
    lid,
  };
}
