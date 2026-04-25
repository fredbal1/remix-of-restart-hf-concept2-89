import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/data/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import logoSrc from "@/assets/logo_hfconcept.webp";
import { LOGO_HFCONCEPT_VARIANTS } from "@/data/image-variants/brand";
import { useScrollLock, useFocusTrap } from "@/hooks/useScrollLock";
import "@/components/shell/site-header.css";

function normalizePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0].trim();
  if (!pathname) return "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");
  if (collapsed === "/") return "/";
  return collapsed.replace(/\/+$/, "");
}

function isActivePath(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const mobileMenuId = "site-mobile-menu";
  const mobileMenuTitleId = "site-mobile-menu-title";

  useScrollLock(mobileOpen);
  useFocusTrap(menuRef, mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      const raf = requestAnimationFrame(() => {
        closeRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [mobileOpen]);

  const closeMobile = useCallback((restoreFocus = true) => {
    setMobileOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  }, []);

  const isHome = normalizePath(location.pathname) === "/";
  const isActive = (href: string) => isActivePath(location.pathname, href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "header-shell",
          isHome && "header-shell--home",
          scrolled && "header-shell--scrolled"
        )}
      >
        <div
          className={cn(
            "container-hf flex items-center justify-between gap-6 lg:gap-8 header-row"
          )}
        >
          <Link
            to="/"
            className="header-brand-link shrink-0 transition-opacity hover:opacity-90"
          >
            <OptimizedImage
              src={logoSrc}
              alt={SITE_CONFIG.name}
              className="header-brand-mark header-brand-mark--desktop"
              priority
              fetchPriority="high"
              sizes="(min-width: 1280px) 288px, (min-width: 1024px) 264px, 216px"
              width={960}
              height={167}
              variants={LOGO_HFCONCEPT_VARIANTS}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "header-nav-link text-nav",
                    active && "header-nav-link--active"
                  )}
                >
                  <span className="header-nav-link__label">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div
            className={cn(
              "hidden lg:block lg:pl-6 lg:border-l",
              isHome ? "lg:border-[#211713]/10" : "lg:border-hf-divider-on-dark/20"
            )}
          >
            <ButtonLink
              href="/contact/"
              variant="primary"
              size="md"
              className={cn("shrink-0", isHome && "header-home-cta")}
            >
              Parler de votre projet
            </ButtonLink>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className={cn(
              "lg:hidden drawer-hamburger -mr-2",
              mobileOpen && "drawer-hamburger--open"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-haspopup="dialog"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="drawer-hamburger-bar" aria-hidden="true" />
            <span className="drawer-hamburger-bar" aria-hidden="true" />
            <span className="drawer-hamburger-bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden header-backdrop-transition duration-medium",
          mobileOpen
            ? "bg-hf-overlay-strong backdrop-blur-md opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => closeMobile()}
        aria-hidden="true"
      />

      <div
        id={mobileMenuId}
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          "overflow-y-auto overscroll-contain mobile-menu-panel",
          "mobile-menu-motion-transition duration-medium ease-out-expo",
          mobileOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        aria-labelledby={mobileMenuTitleId}
        inert={mobileOpen ? undefined : ""}
      >
        <div className="mobile-menu-shell px-5 sm:px-6">
          <h2 id={mobileMenuTitleId} className="sr-only">
            Menu de navigation
          </h2>

          <div className="mobile-menu-top">
            <div className="mobile-menu-bar">
              <Link
                to="/"
                onClick={() => closeMobile(false)}
                className="shrink-0 transition-opacity hover:opacity-90"
              >
                <OptimizedImage
                  src={logoSrc}
                  alt={SITE_CONFIG.name}
                  className="header-brand-mark header-brand-mark--mobile h-9 w-auto"
                  sizes="208px"
                  width={960}
                  height={167}
                  variants={LOGO_HFCONCEPT_VARIANTS}
                />
              </Link>

              <button
                ref={closeRef}
                type="button"
                className="drawer-hamburger drawer-hamburger--open mobile-menu-close -mr-2 -mt-1"
                onClick={() => closeMobile()}
                aria-label="Fermer le menu"
              >
                <span className="drawer-hamburger-bar" aria-hidden="true" />
                <span className="drawer-hamburger-bar" aria-hidden="true" />
                <span className="drawer-hamburger-bar" aria-hidden="true" />
              </button>
            </div>

            <div className="mobile-menu-intro">
              <p className="mobile-menu-kicker">{SITE_CONFIG.tagline}</p>
              <p className="mobile-menu-summary">{SITE_CONFIG.descriptionShort}</p>
            </div>
          </div>

          <nav className="mobile-menu-nav" aria-label="Navigation principale">
            <ul className="mobile-menu-list">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => closeMobile(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "mobile-menu-link",
                        active && "mobile-menu-link--active"
                      )}
                    >
                      <span className="mobile-menu-link__text">{link.label}</span>
                      <span className="mobile-menu-link__arrow" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-footer-card">
              <div className="mobile-menu-meta" aria-hidden="true">
                <span>{SITE_CONFIG.intervention.zones}</span>
                <span>{SITE_CONFIG.intervention.modes}</span>
              </div>

              <ButtonLink
                href="/contact/"
                variant="primary"
                size="md"
                fullWidth
                onClick={() => closeMobile(false)}
              >
                Parler de votre projet
              </ButtonLink>

              <div className="mobile-menu-contact-row">
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="mobile-menu-contact">
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
                <p className="mobile-menu-response">{SITE_CONFIG.contact.responseDelay}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
