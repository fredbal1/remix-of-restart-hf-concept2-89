import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/data/site-config";
import { SERVICE_LINKS } from "@/data/services-manifest";
import { ZONES_INTERVENTION } from "@/data/zones-intervention";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import logoSrc from "@/assets/logo_hfconcept.webp";
import { LOGO_HFCONCEPT_VARIANTS } from "@/data/image-variants/brand";
import "@/components/shell/site-footer.css";

/** Compile-time constant injected by Vite define — guarantees zero SSR/hydration mismatch */
const BUILD_YEAR = __BUILD_YEAR__;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: SITE_CONFIG.social.instagram,
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: SITE_CONFIG.social.facebook,
    icon: Facebook,
  },
] as const;

export const SiteFooter = forwardRef<HTMLElement>(function SiteFooter(_, ref) {
  const currentYear = BUILD_YEAR;

  return (
    <footer ref={ref} className="site-footer-shell">
      <div className="container-hf pt-20 pb-12 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16">
        <div className="grid site-footer-grid gap-12 sm:gap-8 lg:gap-14">
          <div className="site-footer-brand-column">
            <Link
              to="/"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <OptimizedImage
                src={logoSrc}
                alt={SITE_CONFIG.name}
                className="h-7 w-auto"
                sizes="112px"
                variants={LOGO_HFCONCEPT_VARIANTS}
              />
            </Link>

            <p className="text-body-lg text-hf-on-dark mt-5 site-footer-brand-copy font-display italic">
              {SITE_CONFIG.taglineShort}
            </p>
            <p className="text-body-sm text-hf-on-dark-soft mt-3.5 site-footer-contact-copy">
              {SITE_CONFIG.descriptionShort}
            </p>
            <p className="text-micro text-hf-on-dark-soft/50 mt-3">
              {SITE_CONFIG.intervention.zones}
            </p>
            <address className="not-italic text-label text-hf-on-dark-soft/60 mt-4 leading-relaxed">
              <span className="block">
                {SITE_CONFIG.address.city} · {SITE_CONFIG.address.region}
              </span>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="block py-1 hover:text-hf-on-dark transition-colors"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="block py-1 hover:text-hf-on-dark transition-colors break-all"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </address>
          </div>

          <div className="site-footer-nav-column">
            <h3 className="text-eyebrow text-hf-accent mb-4 lg:mb-5">
              Navigation
            </h3>
            <ul className="space-y-3.5 sm:space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-body-sm text-hf-on-dark-soft hover:text-hf-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer-services-column site-footer-stack">
            <h3 className="text-eyebrow text-hf-accent mb-4 lg:mb-5">
              Services
            </h3>
            <ul className="space-y-3.5 sm:space-y-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-body-sm text-hf-on-dark-soft hover:text-hf-on-dark transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="site-footer-social-block">
              <h3 className="text-eyebrow text-hf-accent mb-4 lg:mb-5">
                Suivre
              </h3>
              <ul className="space-y-3.5 sm:space-y-3">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-body-sm text-hf-on-dark-soft hover:text-hf-on-dark transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4 shrink-0" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container-hf">
        <div className="site-footer-divider" aria-hidden="true" />
      </div>

      <div className="container-hf">
        <nav
          aria-label="Zones d'intervention"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 py-5 text-center"
        >
          <span className="text-label text-hf-on-dark-soft/50">
            Zones d'intervention :
          </span>
          <ul className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5">
            {ZONES_INTERVENTION.map((zone, idx) => (
              <li key={zone.slug} className="inline-flex items-center">
                <Link
                  to={`/zones-intervention/${zone.slug}/`}
                  className="inline-block py-1.5 text-label text-hf-on-dark-soft/70 hover:text-hf-on-dark transition-colors"
                >
                  Architecte d'intérieur {zone.name}
                </Link>
                {idx < ZONES_INTERVENTION.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-label text-hf-on-dark-soft/30 ml-3"
                  >
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-hf">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 py-7 sm:py-6">
          <p className="text-label text-hf-on-dark-soft/60 text-center sm:text-left">
            © {currentYear} {SITE_CONFIG.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              to="/mentions-legales/"
              className="text-label text-hf-on-dark-soft/60 hover:text-hf-on-dark transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-de-confidentialite/"
              className="text-label text-hf-on-dark-soft/60 hover:text-hf-on-dark transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>

      <div
        className="container-hf relative h-12 sm:h-16 lg:h-24 select-none pointer-events-none pb-2 lg:pb-4"
        aria-hidden="true"
      >
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 site-footer-badge-offset site-footer-brand-mark">
          {SITE_CONFIG.name}
        </span>
      </div>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";
