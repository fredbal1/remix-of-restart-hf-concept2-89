import postalCodeToCities from "@/data/postal-code-to-cities.fr.json";

const ILE_DE_FRANCE_DEPARTMENT_PREFIXES = new Set([
  "75",
  "77",
  "78",
  "91",
  "92",
  "93",
  "94",
  "95",
]);

type PostalCodeToCities = Record<string, string[]>;

export type PostalCodeContext =
  | "incomplete"
  | "ile-de-france"
  | "outside-ile-de-france";

function normalizePostalCode(postalCode: string): string {
  return postalCode.replace(/\D/g, "").slice(0, 5);
}

export function getNormalizedPostalCode(postalCode: string): string {
  return normalizePostalCode(postalCode);
}


export function isIleDeFrancePostalCode(postalCode: string): boolean {
  const normalized = normalizePostalCode(postalCode);

  if (!/^\d{5}$/.test(normalized)) {
    return false;
  }

  return ILE_DE_FRANCE_DEPARTMENT_PREFIXES.has(normalized.slice(0, 2));
}

export function getPostalCodeContext(postalCode: string): PostalCodeContext {
  const normalized = normalizePostalCode(postalCode);

  if (normalized.length < 5) {
    return "incomplete";
  }

  return isIleDeFrancePostalCode(normalized)
    ? "ile-de-france"
    : "outside-ile-de-france";
}


export function getCitiesByPostalCode(postalCode: string): string[] {
  const normalized = normalizePostalCode(postalCode);

  if (!isIleDeFrancePostalCode(normalized)) {
    return [];
  }

  const data = postalCodeToCities as PostalCodeToCities;
  return data[normalized] ?? [];
}
