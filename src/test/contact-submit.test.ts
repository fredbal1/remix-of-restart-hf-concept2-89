import { describe, it, expect, vi, beforeEach } from "vitest";

let mockHasEndpoint = true;
let mockEndpoint = "https://formspree.io/f/xtest123";

vi.mock("@/config/formspree", () => ({
  get FORMSPREE_ENDPOINT() {
    return mockEndpoint;
  },
  get HAS_FORMSPREE_ENDPOINT() {
    return mockHasEndpoint;
  },
}));

import { submitContactForm, ContactSubmitError } from "@/lib/contact-submit";
import type { ContactData } from "@/lib/contact-form";

const validValues: ContactData = {
  name: "Marie Dupont",
  email: "marie@example.com",
  phone: "",
  postalCode: "75016",
  city: "",
  need: "conseil",
  message: "Je souhaite rénover mon salon.",
  contactPref: "email",
  callbackSlot: "",
};

const baseOptions = { honeypot: "", elapsedMs: 10_000, pageUrl: "https://example.com/contact" };

describe("submitContactForm", () => {
  beforeEach(() => {
    mockHasEndpoint = true;
    mockEndpoint = "https://formspree.io/f/xtest123";
    vi.restoreAllMocks();
  });

  it("succeeds when endpoint is valid and fetch returns ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    await expect(submitContactForm(validValues, baseOptions)).resolves.toBeUndefined();
    expect(globalThis.fetch).toHaveBeenCalledOnce();
  });

  it("throws CONFIG_MISSING when endpoint is absent", async () => {
    mockHasEndpoint = false;
    vi.spyOn(globalThis, "fetch");
    try {
      await submitContactForm(validValues, baseOptions);
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).code).toBe("CONFIG_MISSING");
    }
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("throws TOO_FAST when elapsed time < 4s", async () => {
    vi.spyOn(globalThis, "fetch");
    try {
      await submitContactForm(validValues, { ...baseOptions, elapsedMs: 2_000 });
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).code).toBe("TOO_FAST");
    }
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("returns silently when honeypot is filled, without calling fetch", async () => {
    vi.spyOn(globalThis, "fetch");
    await expect(
      submitContactForm(validValues, { ...baseOptions, honeypot: "bot-value" }),
    ).resolves.toBeUndefined();
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("throws NETWORK_ERROR when fetch rejects", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));
    try {
      await submitContactForm(validValues, baseOptions);
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).code).toBe("NETWORK_ERROR");
    }
  });

  it("throws SUBMIT_FAILED when response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Rate limited" }), { status: 429 }),
    );
    try {
      await submitContactForm(validValues, baseOptions);
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).code).toBe("SUBMIT_FAILED");
      expect((err as ContactSubmitError).message).toBe("Rate limited");
    }
  });

  it("reconstructs location from postalCode and city for IDF", async () => {
    const idfValues: ContactData = {
      ...validValues,
      postalCode: "75016",
      city: "PARIS 16",
    };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    await submitContactForm(idfValues, baseOptions);
    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string);
    expect(body.postalCode).toBe("75016");
    expect(body.city).toBe("PARIS 16");
    expect(body.location).toBe("75016 PARIS 16");
  });

  it("reconstructs location from postalCode only when city is empty", async () => {
    const outsideValues: ContactData = {
      ...validValues,
      postalCode: "69001",
      city: "",
    };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    await submitContactForm(outsideValues, baseOptions);
    const body = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string);
    expect(body.postalCode).toBe("69001");
    expect(body.city).toBe("");
    expect(body.location).toBe("69001");
  });
});
