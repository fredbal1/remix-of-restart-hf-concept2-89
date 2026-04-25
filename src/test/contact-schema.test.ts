import { describe, it, expect } from "vitest";
import { buildSchema } from "@/lib/contact-form";

const validData = {
  name: "Marie Dupont",
  email: "marie@example.com",
  phone: "",
  postalCode: "75016",
  city: "",
  need: "conseil",
  message: "Je souhaite rénover mon salon.",
  contactPref: "email" as const,
  callbackSlot: "",
};

describe("Contact form schema", () => {
  it("accepts valid data with email preference", () => {
    expect(buildSchema(false).safeParse(validData).success).toBe(true);
  });

  it("requires phone when preferPhone is true", () => {
    expect(buildSchema(true).safeParse({ ...validData, phone: "" }).success).toBe(false);
  });

  it("accepts phone when preferPhone is true and phone provided", () => {
    expect(
      buildSchema(true).safeParse({ ...validData, phone: "06 12 34 56 78", contactPref: "telephone" }).success
    ).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(buildSchema(false).safeParse({ ...validData, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects empty name", () => {
    expect(buildSchema(false).safeParse({ ...validData, name: "" }).success).toBe(false);
  });

  it("rejects empty message", () => {
    expect(buildSchema(false).safeParse({ ...validData, message: "" }).success).toBe(false);
  });

  it("rejects message over 2000 chars", () => {
    expect(buildSchema(false).safeParse({ ...validData, message: "a".repeat(2001) }).success).toBe(false);
  });

  it("rejects invalid postal code (not 5 digits)", () => {
    expect(buildSchema(false).safeParse({ ...validData, postalCode: "123" }).success).toBe(false);
    expect(buildSchema(false).safeParse({ ...validData, postalCode: "abcde" }).success).toBe(false);
  });

  it("accepts valid postal code", () => {
    expect(buildSchema(false).safeParse({ ...validData, postalCode: "91100" }).success).toBe(true);
  });

  it("accepts empty city at schema level (conditional validation is in component)", () => {
    expect(buildSchema(false).safeParse({ ...validData, city: "" }).success).toBe(true);
    expect(buildSchema(false).safeParse({ ...validData, city: "PARIS 16" }).success).toBe(true);
  });
});
