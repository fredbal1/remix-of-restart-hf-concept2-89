import { forwardRef } from "react";
import "./contact-info.css";
import { Mail, Phone, Gift, Clock, MapPin, Gem, Instagram, Facebook, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { Link } from "react-router-dom";

const REASSURANCE = [
  { icon: Gift, text: "Premier échange gratuit & sans engagement" },
  { icon: Clock, text: "Réponse sous 24h ouvrées" },
  { icon: MapPin, text: "Intervention à domicile — Paris & Île-de-France" },
  { icon: Gem, text: "Accompagnement sur-mesure de A à Z" },
] as const;

export const ContactInfo = forwardRef<HTMLDivElement>(
  function ContactInfo(_props, ref) {
    const { contact, social } = SITE_CONFIG;

    return (
      <div ref={ref} className="contact-info-panel space-y-5">
        {/* ── Bloc 1 : Coordonnées directes ── */}
        <div className="contact-info-block contact-info-block--primary">
          <div className="contact-info-block-head">
            <h3 className="contact-info-block-title">Coordonnées</h3>
            <span className="contact-info-block-rule" aria-hidden="true" />
          </div>
          <div className="contact-info-stack">
            <a
              href={`mailto:${contact.email}`}
              className="contact-info-row group flex items-center gap-3.5 rounded-md transition-colors duration-micro"
            >
              <div className="contact-info-icon-box">
                <Mail className="contact-info-panel-icon text-hf-accent" aria-hidden="true" />
              </div>
              <div className="contact-info-row-copy">
                <span className="contact-info-row-label">Email</span>
                <span className="contact-info-row-value text-body-sm text-hf-strong font-medium group-hover:text-hf-accent-deep transition-colors duration-micro">
                  {contact.email}
                </span>
              </div>
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="contact-info-row group flex items-center gap-3.5 rounded-md transition-colors duration-micro"
            >
              <div className="contact-info-icon-box">
                <Phone className="contact-info-panel-icon text-hf-accent" aria-hidden="true" />
              </div>
              <div className="contact-info-row-copy">
                <span className="contact-info-row-label">Téléphone</span>
                <span className="contact-info-row-value text-body-sm text-hf-strong font-medium group-hover:text-hf-accent-deep transition-colors duration-micro">
                  {contact.phoneDisplay}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* ── Bloc 2 : Engagements ── */}
        <div className="contact-info-block">
          <div className="contact-info-block-head">
            <h3 className="contact-info-block-title">Nos engagements</h3>
            <span className="contact-info-block-rule" aria-hidden="true" />
          </div>
          <ul className="contact-info-commitments" aria-label="Nos engagements">
            {REASSURANCE.map(({ icon: Icon, text }) => (
              <li key={text} className="contact-info-commitment flex items-start gap-3">
                <span className="contact-info-commitment-icon" aria-hidden="true">
                  <Icon className="w-4 h-4 text-hf-accent-deep/70 shrink-0" aria-hidden="true" />
                </span>
                <span className="text-body-sm text-hf-soft">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bloc 3 : Citation + CTA ── */}
        <div className="contact-info-block contact-info-block--quote">
          <div className="contact-info-block-head">
            <h3 className="contact-info-block-title">Le studio</h3>
            <span className="contact-info-block-rule" aria-hidden="true" />
          </div>
          <blockquote className="contact-info-quote">
            <p>Un intérieur réussi commence toujours par une conversation juste.</p>
            <cite>— Le studio HFconcept</cite>
          </blockquote>

          <div className="mt-5">
            <Link
              to="/realisations/"
              className="group inline-flex items-center gap-2 text-body-sm font-medium text-hf-accent-deep hover:text-hf-accent transition-colors duration-micro"
            >
              Voir nos réalisations
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-micro group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ── Réseaux sociaux ── */}
        <div className="contact-info-block contact-info-block--social">
          <div className="contact-info-block-head">
            <h3 className="contact-info-block-title">Réseaux</h3>
            <span className="contact-info-block-rule" aria-hidden="true" />
          </div>
          <div className="contact-info-social-grid">
          {[
            { href: social.instagram, icon: Instagram, label: "Instagram" },
            { href: social.facebook, icon: Facebook, label: "Facebook" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} — ouvre dans un nouvel onglet`}
              className="contact-info-panel-chip group inline-flex items-center gap-2.5 rounded-full border border-hf-accent/14 duration-micro"
            >
              <Icon
                className="contact-info-panel-icon text-hf-secondary/60 group-hover:text-hf-accent transition-colors duration-micro"
                aria-hidden="true"
              />
              <span className="text-body-sm text-hf-strong/80 group-hover:text-hf-accent-deep transition-colors duration-micro">
                {label}
              </span>
            </a>
          ))}
          </div>
        </div>
      </div>
    );
  }
);


