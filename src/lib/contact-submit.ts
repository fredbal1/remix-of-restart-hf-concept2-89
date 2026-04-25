import { FORMSPREE_ENDPOINT, HAS_FORMSPREE_ENDPOINT } from "@/config/formspree";
import { NEED_OPTIONS, type ContactData } from "@/lib/contact-form";

export type SubmitErrorCode =
  | "CONFIG_MISSING"
  | "TOO_FAST"
  | "NETWORK_ERROR"
  | "SUBMIT_FAILED";

export class ContactSubmitError extends Error {
  code: SubmitErrorCode;
  constructor(code: SubmitErrorCode, message: string) {
    super(message);
    this.name = "ContactSubmitError";
    this.code = code;
  }
}

interface SubmitOptions {
  honeypot: string;
  elapsedMs: number;
  pageUrl: string;
}

const MIN_ELAPSED_MS = 4_000;

export async function submitContactForm(
  values: ContactData,
  options: SubmitOptions,
): Promise<void> {
  if (!HAS_FORMSPREE_ENDPOINT) {
    throw new ContactSubmitError(
      "CONFIG_MISSING",
      "Le formulaire n'est pas configuré correctement.",
    );
  }

  // Honeypot filled → silent success, no network call
  if (options.honeypot) {
    return;
  }

  if (options.elapsedMs < MIN_ELAPSED_MS) {
    throw new ContactSubmitError(
      "TOO_FAST",
      "Envoi trop rapide. Merci d'attendre quelques secondes avant de réessayer.",
    );
  }

  const needLabel =
    NEED_OPTIONS.find((o) => o.value === values.need)?.label ?? values.need;

  const postalCode = values.postalCode.trim();
  const city = values.city?.trim() ?? "";
  const location = city ? `${postalCode} ${city}` : postalCode;

  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone?.trim() ?? "",
    postalCode,
    city,
    location,
    need: values.need,
    needLabel,
    message: values.message.trim(),
    contactPref: values.contactPref,
    callbackSlot: values.callbackSlot?.trim() ?? "",
    _subject: `Nouveau contact HFconcept — ${needLabel}`,
    pageUrl: options.pageUrl,
    submittedAt: new Date().toISOString(),
  };

  let response: Response;
  try {
    response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ContactSubmitError(
      "NETWORK_ERROR",
      "Impossible de joindre le serveur. Vérifiez votre connexion.",
    );
  }

  if (!response.ok) {
    let detail = "";
    try {
      const body = await response.json();
      if (typeof body?.error === "string") detail = body.error;
    } catch {
      // response not parsable — ignore
    }
    throw new ContactSubmitError(
      "SUBMIT_FAILED",
      detail || "L'envoi a échoué. Veuillez réessayer.",
    );
  }
}
