import { z } from "zod";

export const NEED_OPTIONS = [
  { value: "conseil", label: "Conseil & accompagnement" },
  { value: "conception-3d", label: "Conception 3D" },
  { value: "projet-complet", label: "Projet complet" },
  { value: "projet-a-distance", label: "Projet à distance" },
  { value: "rdv-showroom", label: "Rendez-vous showroom Ceranova" },
  { value: "autre", label: "Autre" },
] as const;

export function buildSchema(preferPhone: boolean) {
  return z.object({
    name: z.string().trim().min(1, "Merci d'indiquer votre nom.").max(100),
    email: z.string().trim().min(1, "Merci d'indiquer votre email.").email("Adresse email invalide.").max(255),
    phone: preferPhone
      ? z.string().trim().min(1, "Merci d'indiquer votre numéro.").max(30)
      : z.string().trim().max(30).optional().or(z.literal("")),
    postalCode: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "Merci d'indiquer un code postal valide."),
    city: z.string().trim().max(100).optional().or(z.literal("")),
    need: z.string().min(1, "Merci de choisir un type de besoin."),
    message: z.string().trim().min(1, "Merci de décrire votre projet.").max(2000),
    contactPref: z.enum(["email", "telephone"]),
    callbackSlot: z.string().trim().max(200).optional().or(z.literal("")),
  });
}

export type ContactData = z.infer<ReturnType<typeof buildSchema>>;

export const INITIAL_CONTACT_VALUES: ContactData = {
  name: "",
  email: "",
  phone: "",
  postalCode: "",
  city: "",
  need: "",
  message: "",
  contactPref: "email",
  callbackSlot: "",
};
