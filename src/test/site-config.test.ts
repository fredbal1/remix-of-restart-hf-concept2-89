import { describe, it, expect } from "vitest";
import { SITE_CONFIG } from "@/data/site-config";

describe("SITE_CONFIG", () => {
  it("has all required business fields", () => {
    expect(SITE_CONFIG.name).toBeTruthy();
    expect(SITE_CONFIG.tagline).toBeTruthy();
    expect(SITE_CONFIG.url).toMatch(/^https?:\/\//);
  });

  it("has valid contact info", () => {
    expect(SITE_CONFIG.contact.email).toMatch(/@/);
    expect(SITE_CONFIG.contact.phone).toMatch(/^\+\d+/);
    expect(SITE_CONFIG.contact.phoneDisplay).toBeTruthy();
  });

  it("has valid social links", () => {
    expect(SITE_CONFIG.social.instagram).toMatch(/^https:\/\//);
    expect(SITE_CONFIG.social.facebook).toMatch(/^https:\/\//);
  });

  it("has complete address", () => {
    expect(SITE_CONFIG.address.street).toBeTruthy();
    expect(SITE_CONFIG.address.city).toBeTruthy();
    expect(SITE_CONFIG.address.postalCode).toMatch(/^\d{5}$/);
    expect(SITE_CONFIG.address.country).toBe("FR");
  });
});
