import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "var(--container-gutter-wide)",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Cormorant Garamond Fallback"', "Georgia", "serif"],
        body: ['"Inter"', '"Inter Fallback"', "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        /* HFconcept palette */
        hf: {
          page: "hsl(var(--hf-bg-page))",
          section: "hsl(var(--hf-bg-section))",
          card: "hsl(var(--hf-bg-card))",
          muted: "hsl(var(--hf-bg-muted))",
          inverse: "hsl(var(--hf-bg-inverse))",
          ink: "hsl(var(--hf-bg-inverse))",
          "text-muted": "hsl(var(--hf-text-secondary))",
          accent: "hsl(var(--hf-accent))",
          "accent-hover": "hsl(var(--hf-accent-hover))",
          "accent-soft": "hsl(var(--hf-accent-soft))",
          brass: "hsl(var(--hf-detail-brass))",
          border: "hsl(var(--hf-border-subtle))",
          "border-strong": "hsl(var(--hf-border-strong))",
          ivory: "hsl(var(--bg-ivory))",
          mist: "hsl(var(--bg-mist))",
          pearl: "hsl(var(--bg-pearl))",
          frost: "hsl(var(--surface-frost))",
          "ink-soft": "hsl(var(--bg-ink-soft))",
          strong: "hsl(var(--text-strong))",
          soft: "hsl(var(--text-soft))",
          secondary: "hsl(var(--text-secondary))",
          "on-dark": "hsl(var(--text-on-dark))",
          "on-dark-soft": "hsl(var(--text-on-dark-soft))",
          success: "hsl(var(--feedback-success))",
          warning: "hsl(var(--feedback-warning))",
          danger: "hsl(var(--feedback-danger))",
          "surface-card": "hsl(var(--surface-card))",
          "surface-muted": "hsl(var(--surface-muted))",
          overlay: "hsl(var(--overlay-backdrop))",
          "overlay-strong": "hsl(var(--overlay-backdrop-strong))",
          "divider-on-dark": "hsl(var(--divider-on-dark))",
          "border-soft": "hsl(var(--border-soft))",
          /* Overlay tiers */
          "overlay-subtle": "hsl(var(--overlay-subtle))",
          "overlay-light": "hsl(var(--overlay-light))",
          "overlay-badge": "hsl(var(--overlay-badge))",
          "overlay-medium": "hsl(var(--overlay-medium))",
          "overlay-heavy": "hsl(var(--overlay-heavy))",
          "overlay-max": "hsl(var(--overlay-max))",
          /* Translucent tiers */
          "surface-translucent-subtle": "hsl(var(--surface-translucent-subtle))",
          "surface-translucent-soft": "hsl(var(--surface-translucent-soft))",
          "surface-translucent-border": "hsl(var(--surface-translucent-border))",
          "surface-translucent-border-strong": "hsl(var(--surface-translucent-border-strong))",
          "surface-translucent-text-soft": "hsl(var(--surface-translucent-text-soft))",
          "surface-translucent-text": "hsl(var(--surface-translucent-text))",
          "accent-deep": "hsl(var(--brand-accent-deep))",
        },
        /* shadcn compat */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        base: "var(--radius-default)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        panel: "var(--shadow-panel)",
        translucent: "var(--shadow-translucent)",
        depth: "var(--shadow-depth)",
        elevated: "var(--shadow-elevated)",
        drawer: "var(--shadow-drawer)",
      },
      letterSpacing: {
        cta: "0.07em",
        "eyebrow-wide": "0.2em",
        badge: "0.16em",
        nav: "0.02em",
        "badge-sm": "0.12em",
        "badge-md": "0.08em",
        "drawer": "0.1em",
      },
      spacing: {
        gutter: "var(--container-gutter)",
        "gutter-wide": "var(--container-gutter-wide)",
        "section-hero": "var(--section-space-hero)",
        "section-standard": "var(--section-space-standard)",
        "section-dense": "var(--section-space-dense)",
        "section-cta": "var(--section-space-cta)",
        section: "var(--section-space-standard)",
      },
      transitionDuration: {
        micro: "var(--duration-micro)",
        fast: "var(--duration-fast)",
        medium: "var(--duration-medium)",
        slow: "var(--duration-slow)",
        ambient: "var(--duration-ambient)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-out-circ": "var(--ease-in-out-circ)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "hero-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "hero-scroll-dot": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
        },
        "frame-draw": {
          from: { opacity: "0", strokeDashoffset: "100" },
          to: { opacity: "1", strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s var(--ease-out-expo) both",
        "fade-in": "fade-in 0.5s var(--ease-out-expo) both",
        "hero-fade-in": "hero-fade-in 1.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-scroll-dot": "hero-scroll-dot 2.5s ease-in-out infinite",
        "frame-draw": "frame-draw 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config;
