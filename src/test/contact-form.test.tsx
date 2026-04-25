import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { renderWithProviders } from "./test-utils";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const mockSubmit = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/contact-submit", () => {
  class ContactSubmitError extends Error {
    code: string;
    constructor(code: string, message: string) {
      super(message);
      this.name = "ContactSubmitError";
      this.code = code;
    }
  }
  return {
    submitContactForm: (...args: unknown[]) => mockSubmit(...args),
    ContactSubmitError,
  };
});

describe("ContactForm integration", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockSubmit.mockReset().mockResolvedValue(undefined);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows required field errors on empty submit", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));

    expect(await screen.findByText("Merci d'indiquer votre nom.")).toBeInTheDocument();
    expect(screen.getByText("Merci d'indiquer votre email.")).toBeInTheDocument();
    expect(screen.getByText("Merci de décrire votre projet.")).toBeInTheDocument();
    expect(screen.getByText("Merci de choisir un type de besoin.")).toBeInTheDocument();
    expect(screen.getByText("Merci d'indiquer un code postal valide.")).toBeInTheDocument();
  });

  it("shows callback field when switching to telephone preference", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("radio", { name: /téléphone/i }));

    expect(screen.getByLabelText(/créneau de rappel/i)).toBeInTheDocument();
  });

  it("clears field error when user modifies the field", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));
    expect(await screen.findByText("Merci d'indiquer votre nom.")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^nom/i), {
      target: { value: "Jean" },
    });
    expect(screen.queryByText("Merci d'indiquer votre nom.")).not.toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "not-valid" },
    });
    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));

    expect(await screen.findByText("Adresse email invalide.")).toBeInTheDocument();
  });

  it("shows phone required when telephone preference is selected and submit", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("radio", { name: /téléphone/i }));
    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));

    expect(await screen.findByText("Merci d'indiquer votre numéro.")).toBeInTheDocument();
  });

  it("renders combobox for type de besoin", () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("displays the form fieldset legends", () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByText("Vos coordonnées")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Votre projet" })).toBeInTheDocument();
  });

  it("shows global validation banner on empty submit", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));

    expect(await screen.findByText("Formulaire incomplet")).toBeInTheDocument();
    expect(
      screen.getByText("Merci de corriger les champs signalés avant d'envoyer votre message."),
    ).toBeInTheDocument();
  });

  it("shows both validation banner and inline errors on invalid submit", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));

    expect(await screen.findByText("Formulaire incomplet")).toBeInTheDocument();
    expect(screen.getByText("Merci d'indiquer votre nom.")).toBeInTheDocument();
    expect(screen.getByText("Merci d'indiquer votre email.")).toBeInTheDocument();
  });

  it("focuses the validation banner on invalid submit", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));
    await screen.findByText("Formulaire incomplet");

    const banner = screen.getByRole("alert");
    expect(banner).toHaveAttribute("tabindex", "-1");
  });

  it("does not show validation banner when no validation errors", async () => {
    renderWithProviders(<ContactForm />);
    expect(screen.queryByText("Formulaire incomplet")).not.toBeInTheDocument();
  });

  // ── Postal code conditional rendering ──

  it("shows hors-IDF message when postal code is outside IDF", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/code postal/i), "69001");

    expect(screen.getByText("Projet hors Île-de-France")).toBeInTheDocument();
    expect(screen.queryByLabelText(/ville/i)).not.toBeInTheDocument();
  });

  it("does not show city or hors-IDF when postal code is incomplete", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/code postal/i), "750");

    expect(screen.queryByText("Projet hors Île-de-France")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/ville/i)).not.toBeInTheDocument();
  });

  // ── Keyboard: Enter does not submit from intermediate inputs ──

  it("does not submit the form when pressing Enter on the name input", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    const nameInput = screen.getByLabelText(/^nom/i);
    await user.type(nameInput, "Jean");
    await user.keyboard("{Enter}");

    // No validation banner should appear (form not submitted)
    expect(screen.queryByText("Formulaire incomplet")).not.toBeInTheDocument();
  });

  it("allows newlines in the message textarea", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    const textarea = screen.getByLabelText(/message/i);
    await user.type(textarea, "Ligne 1{Enter}Ligne 2");

    expect(textarea).toHaveValue("Ligne 1\nLigne 2");
  });
});

// ── Accessibility-specific tests ──

describe("ContactForm accessibility", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockSubmit.mockReset().mockResolvedValue(undefined);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // 1) Native required attributes
  it("has required attribute on name, email, postalCode, message inputs", () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByLabelText(/^nom/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/code postal/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toBeRequired();
  });

  it("has required on phone only when telephone preference is selected", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    // Default: email pref → phone not required
    expect(screen.getByLabelText(/téléphone/i)).not.toBeRequired();

    // Switch to telephone → phone required
    await user.click(screen.getByRole("radio", { name: /téléphone/i }));
    expect(screen.getByLabelText(/téléphone/i)).toBeRequired();
  });

  // 2) aria-required on Select triggers
  it("has aria-required on need combobox", () => {
    renderWithProviders(<ContactForm />);

    const combobox = screen.getByRole("combobox", { name: /type de besoin/i });
    expect(combobox).toHaveAttribute("aria-required", "true");
  });

  it("has aria-required on city combobox only when IDF cities are shown", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    // No city select initially
    expect(screen.queryByRole("combobox", { name: /ville/i })).not.toBeInTheDocument();

    // Type IDF postal code with multiple cities
    await user.type(screen.getByLabelText(/code postal/i), "75001");

    const cityCombobox = screen.getByRole("combobox", { name: /ville/i });
    expect(cityCombobox).toHaveAttribute("aria-required", "true");
  });

  // 3) Banner contains clickable error summary
  it("banner contains clickable links to invalid fields", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));
    await screen.findByText("Formulaire incomplet");

    const banner = screen.getByRole("alert");
    const summaryButtons = within(banner).getAllByRole("button");
    expect(summaryButtons.length).toBeGreaterThanOrEqual(4); // name, email, postalCode, need, message

    // Each button should have a field label text
    const buttonTexts = summaryButtons.map((b) => b.textContent);
    expect(buttonTexts).toContain("Nom");
    expect(buttonTexts).toContain("Email");
    expect(buttonTexts).toContain("Code postal");
    expect(buttonTexts).toContain("Message");
    expect(buttonTexts).toContain("Type de besoin");
  });

  it("clicking a banner summary button focuses the corresponding field", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));
    await screen.findByText("Formulaire incomplet");

    const banner = screen.getByRole("alert");
    const emailButton = within(banner).getByRole("button", { name: "Email" });

    // Mock scrollIntoView
    const emailInput = screen.getByLabelText(/email/i);
    emailInput.scrollIntoView = vi.fn();

    await user.click(emailButton);

    // The field should have been scrolled into view
    expect(emailInput.scrollIntoView).toHaveBeenCalled();
  });

  // 4) Inline errors do NOT have role="alert"
  it("inline error messages do not have role='alert'", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));
    await screen.findByText("Formulaire incomplet");

    const nameError = screen.getByText("Merci d'indiquer votre nom.");
    expect(nameError).not.toHaveAttribute("role", "alert");

    const emailError = screen.getByText("Merci d'indiquer votre email.");
    expect(emailError).not.toHaveAttribute("role", "alert");
  });

  // 5) Radiogroup linked to visible label
  it("radiogroup is linked to its visible label via aria-labelledby", () => {
    renderWithProviders(<ContactForm />);

    const radiogroup = screen.getByRole("radiogroup");
    const labelledBy = radiogroup.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();

    // The referenced element should contain the visible label text
    const labelEl = document.getElementById(labelledBy!);
    expect(labelEl).toBeTruthy();
    expect(labelEl!.textContent).toContain("Préférence de contact");
  });

  it("radiogroup does not use aria-label (uses aria-labelledby instead)", () => {
    renderWithProviders(<ContactForm />);

    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).not.toHaveAttribute("aria-label");
  });

  // 6) Keyboard navigation on radiogroup
  it("arrow keys change radio selection", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    // Default is "email" — focus the selected radio
    const emailRadio = screen.getByRole("radio", { name: /email/i });
    expect(emailRadio).toHaveAttribute("aria-checked", "true");
    expect(emailRadio).toHaveAttribute("tabindex", "0");

    const phoneRadio = screen.getByRole("radio", { name: /téléphone/i });
    expect(phoneRadio).toHaveAttribute("tabindex", "-1");

    // Focus email radio and press ArrowRight → should select telephone
    emailRadio.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("radio", { name: /téléphone/i })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: /email/i })).toHaveAttribute("aria-checked", "false");
  });

  it("Home/End keys navigate to first/last radio option", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    // Switch to telephone first
    await user.click(screen.getByRole("radio", { name: /téléphone/i }));

    const phoneRadio = screen.getByRole("radio", { name: /téléphone/i });
    phoneRadio.focus();

    // Home → should go to email
    await user.keyboard("{Home}");
    expect(screen.getByRole("radio", { name: /email/i })).toHaveAttribute("aria-checked", "true");

    // End → should go to telephone
    await user.keyboard("{End}");
    expect(screen.getByRole("radio", { name: /téléphone/i })).toHaveAttribute("aria-checked", "true");
  });

  // 7) Selects are findable by role + name
  it("need select is findable by role combobox with accessible name", () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByRole("combobox", { name: /type de besoin/i })).toBeInTheDocument();
  });
});

/**
 * Error banner tests — bypass Zod validation by mocking buildSchema
 * so that submission always reaches submitContactForm.
 */
describe("ContactForm error banners", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockSubmit.mockReset().mockResolvedValue(undefined);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  async function submitForm() {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/^nom/i), "Jean Dupont");
    await user.type(screen.getByLabelText(/email/i), "jean@example.com");
    await user.type(screen.getByLabelText(/code postal/i), "69001");
    await user.type(screen.getByLabelText(/message/i), "Mon projet.");

    await user.click(screen.getByRole("button", { name: /envoyer le message/i }));
    return user;
  }

  it("shows TOO_FAST banner", async () => {
    const contactForm = await import("@/lib/contact-form");
    const originalBuildSchema = contactForm.buildSchema;
    vi.spyOn(contactForm, "buildSchema").mockImplementation(() => {
      const schema = originalBuildSchema(false);
      return {
        ...schema,
        safeParse: () => ({ success: true, data: {} }),
      } as unknown as ReturnType<typeof originalBuildSchema>;
    });

    const { ContactSubmitError } = await import("@/lib/contact-submit");
    mockSubmit.mockRejectedValueOnce(new ContactSubmitError("TOO_FAST", "too fast"));

    await submitForm();

    expect(await screen.findByText("Envoi trop rapide")).toBeInTheDocument();
    expect(screen.getByText(/attendre quelques secondes/)).toBeInTheDocument();
  });

  it("shows CONFIG_MISSING banner", async () => {
    const contactForm = await import("@/lib/contact-form");
    const originalBuildSchema = contactForm.buildSchema;
    vi.spyOn(contactForm, "buildSchema").mockImplementation(() => {
      const schema = originalBuildSchema(false);
      return {
        ...schema,
        safeParse: () => ({ success: true, data: {} }),
      } as unknown as ReturnType<typeof originalBuildSchema>;
    });

    const { ContactSubmitError } = await import("@/lib/contact-submit");
    mockSubmit.mockRejectedValueOnce(new ContactSubmitError("CONFIG_MISSING", "missing"));

    await submitForm();

    expect(await screen.findByText("Formulaire non configuré")).toBeInTheDocument();
    expect(screen.getByText(/pas configuré correctement/)).toBeInTheDocument();
  });

  it("shows NETWORK_ERROR banner", async () => {
    const contactForm = await import("@/lib/contact-form");
    const originalBuildSchema = contactForm.buildSchema;
    vi.spyOn(contactForm, "buildSchema").mockImplementation(() => {
      const schema = originalBuildSchema(false);
      return {
        ...schema,
        safeParse: () => ({ success: true, data: {} }),
      } as unknown as ReturnType<typeof originalBuildSchema>;
    });

    const { ContactSubmitError } = await import("@/lib/contact-submit");
    mockSubmit.mockRejectedValueOnce(new ContactSubmitError("NETWORK_ERROR", "network"));

    await submitForm();

    expect(await screen.findByText("Connexion interrompue")).toBeInTheDocument();
    expect(screen.getByText(/erreur réseau/)).toBeInTheDocument();
  });

  it("shows SUBMIT_FAILED banner for unknown errors", async () => {
    const contactForm = await import("@/lib/contact-form");
    const originalBuildSchema = contactForm.buildSchema;
    vi.spyOn(contactForm, "buildSchema").mockImplementation(() => {
      const schema = originalBuildSchema(false);
      return {
        ...schema,
        safeParse: () => ({ success: true, data: {} }),
      } as unknown as ReturnType<typeof originalBuildSchema>;
    });

    mockSubmit.mockRejectedValueOnce(new Error("unexpected"));

    await submitForm();

    expect(await screen.findByText("L'envoi a échoué")).toBeInTheDocument();
    expect(screen.getByText(/Réessayez dans quelques instants/)).toBeInTheDocument();
  });

  it("does not show error banner on success", async () => {
    const contactForm = await import("@/lib/contact-form");
    const originalBuildSchema = contactForm.buildSchema;
    vi.spyOn(contactForm, "buildSchema").mockImplementation(() => {
      const schema = originalBuildSchema(false);
      return {
        ...schema,
        safeParse: () => ({ success: true, data: {} }),
      } as unknown as ReturnType<typeof originalBuildSchema>;
    });

    mockSubmit.mockResolvedValueOnce(undefined);

    await submitForm();

    expect(screen.queryByText("L'envoi a échoué")).not.toBeInTheDocument();
    expect(screen.queryByText("Envoi trop rapide")).not.toBeInTheDocument();
    expect(screen.queryByText("Formulaire non configuré")).not.toBeInTheDocument();
    expect(screen.queryByText("Connexion interrompue")).not.toBeInTheDocument();
    expect(screen.queryByText("Formulaire incomplet")).not.toBeInTheDocument();
  });

  it("shows submit error banner without validation banner", async () => {
    const contactForm = await import("@/lib/contact-form");
    const originalBuildSchema = contactForm.buildSchema;
    vi.spyOn(contactForm, "buildSchema").mockImplementation(() => {
      const schema = originalBuildSchema(false);
      return {
        ...schema,
        safeParse: () => ({ success: true, data: {} }),
      } as unknown as ReturnType<typeof originalBuildSchema>;
    });

    const { ContactSubmitError } = await import("@/lib/contact-submit");
    mockSubmit.mockRejectedValueOnce(new ContactSubmitError("NETWORK_ERROR", "network"));

    await submitForm();

    expect(await screen.findByText("Connexion interrompue")).toBeInTheDocument();
    expect(screen.queryByText("Formulaire incomplet")).not.toBeInTheDocument();
  });
});

// ── NEED_OPTIONS: rdv-showroom option ──

describe("NEED_OPTIONS — rdv-showroom", () => {
  it("contains exactly 6 options", async () => {
    const { NEED_OPTIONS } = await import("@/lib/contact-form");
    expect(NEED_OPTIONS).toHaveLength(6);
  });

  it("contains rdv-showroom with correct label", async () => {
    const { NEED_OPTIONS } = await import("@/lib/contact-form");
    const option = NEED_OPTIONS.find((o) => o.value === "rdv-showroom");
    expect(option).toBeDefined();
    expect(option!.label).toBe("Rendez-vous showroom Ceranova");
  });

  it("preserves all existing options", async () => {
    const { NEED_OPTIONS } = await import("@/lib/contact-form");
    const values = NEED_OPTIONS.map((o) => o.value);
    expect(values).toContain("conseil");
    expect(values).toContain("conception-3d");
    expect(values).toContain("projet-complet");
    expect(values).toContain("projet-a-distance");
    expect(values).toContain("autre");
  });

  it("preserves existing option labels", async () => {
    const { NEED_OPTIONS } = await import("@/lib/contact-form");
    const byValue = Object.fromEntries(NEED_OPTIONS.map((o) => [o.value, o.label]));
    expect(byValue["conseil"]).toBe("Conseil & accompagnement");
    expect(byValue["conception-3d"]).toBe("Conception 3D");
    expect(byValue["projet-complet"]).toBe("Projet complet");
    expect(byValue["projet-a-distance"]).toBe("Projet à distance");
    expect(byValue["autre"]).toBe("Autre");
  });
});

// ── Prefill rdv-showroom from URL ──

describe("ContactForm prefill rdv-showroom", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockSubmit.mockReset().mockResolvedValue(undefined);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("prefills need field from ?need=rdv-showroom", async () => {
    renderWithProviders(<ContactForm />, {
      routerProps: { initialEntries: ["/contact?need=rdv-showroom"] },
    });

    const combobox = screen.getByRole("combobox", { name: /type de besoin/i });
    expect(combobox).toHaveValue("rdv-showroom");
    expect(
      (screen.getByRole("option", { name: "Rendez-vous showroom Ceranova" }) as HTMLOptionElement)
        .selected,
    ).toBe(true);
  });
});

