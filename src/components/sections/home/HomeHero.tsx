import { OptimizedImage } from "@/components/common/OptimizedImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import heroStudioImg from "@/assets/images/hero/hero-studio.webp";
import { HERO_STUDIO_VARIANTS } from "@/data/image-variants";
import type { HomeHeroContent, HomeTrustItems } from "./types";

interface HomeHeroProps {
  hero: HomeHeroContent;
  trustItems: HomeTrustItems;
}

const HERO_ANNOTATIONS = [
  { kind: "volumes", title: "Valider les volumes" },
  { kind: "materials", title: "Choisir les matières" },
  { kind: "circulation", title: "Fluidifier la circulation" },
] as const;

const HERO_PROOF_KINDS = ["experience", "plans", "distance", "price"] as const;
const REVEAL_CLASS = "animate-fade-in-up motion-reduce:animate-none";

function HeroTechnicalLines() {
  return (
    <svg
      viewBox="0 0 500 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M458 24C246 84 122 264 164 520"
        stroke="#B88A55"
        strokeWidth="1"
        opacity="0.34"
        strokeLinecap="round"
      />
      <path
        d="M420 68C230 150 162 306 210 628"
        stroke="#B88A55"
        strokeWidth="1"
        strokeDasharray="6 8"
        opacity="0.22"
        strokeLinecap="round"
      />
      <path d="M84 392H282V612H84V392Z" stroke="#8C7A68" strokeWidth="1" opacity="0.16" />
      <path d="M124 392V612M84 462H282M184 392V522" stroke="#8C7A68" strokeWidth="1" opacity="0.12" />
      <path d="M20 260H220M120 160V360" stroke="#B88A55" strokeWidth="1" opacity="0.26" />
      <path
        d="M322 228H402M322 284H448"
        stroke="#8C7A68"
        strokeWidth="1"
        opacity="0.12"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeroAnnotationIcon({
  kind,
  className = "h-4 w-4",
}: {
  kind: (typeof HERO_ANNOTATIONS)[number]["kind"];
  className?: string;
}) {
  switch (kind) {
    case "volumes":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
          <path d="M3 11.5V4.5H11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M6.5 2.75H13V9.25H6.5V2.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M6.5 6H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "materials":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
          <rect x="2.5" y="3" width="4.4" height="10" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8.2 4.25H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8.2 7.75H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8.2 11.25H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "circulation":
    default:
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
          <path d="M3 12C5.2 12 6.2 10.2 7.2 8.5C8.3 6.6 9.4 4.75 13 4.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M10.8 3.4L13.25 4.75L11.2 6.55" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 4.75H5.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
  }
}

function HeroProofIcon({
  kind,
  className = "h-4 w-4",
}: {
  kind: (typeof HERO_PROOF_KINDS)[number];
  className?: string;
}) {
  switch (kind) {
    case "experience":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
          <circle cx="8" cy="8" r="4.6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 4.25V8L10.2 9.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "plans":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
          <path d="M2.75 4H13.25V12H2.75V4Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 4V12M10 4V12M2.75 8H13.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "distance":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
          <path d="M8 13.25C8 13.25 4.5 10.1 4.5 7C4.5 5.07 6.07 3.5 8 3.5C9.93 3.5 11.5 5.07 11.5 7C11.5 10.1 8 13.25 8 13.25Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="8" cy="7" r="1.3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "price":
    default:
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
          <path d="M3 6.2L8.2 3.5L13 4.7L9.75 12.5L4.2 11.3L3 6.2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M10.5 6.1L6.5 9.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="6.3" cy="6.2" r="0.8" fill="currentColor" />
        </svg>
      );
  }
}

export function HomeHero({ hero, trustItems: _trustItems }: HomeHeroProps) {
  const titleLines = hero.title.split("\n");
  const titleForA11y = titleLines.join(" ");

  return (
    <section id="accueil-hero" className="relative overflow-hidden bg-[#F6EFE5] text-[#211713]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(184,138,85,0.14),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(183,90,61,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(246,239,229,0.98)_36%,rgba(246,239,229,1)_100%)]"
      />

      <div className="container-hf relative z-10 pt-8 sm:pt-10 lg:pt-14">
        <div className="grid gap-12 lg:min-h-[660px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="relative z-10 space-y-7 lg:pr-6 xl:pr-10">
            <p className={`${REVEAL_CLASS} text-eyebrow text-[#B88A55] [animation-delay:40ms]`}>
              {hero.eyebrow}
            </p>

            <div className="space-y-5">
              <h1
                aria-label={titleForA11y}
                className={`${REVEAL_CLASS} max-w-[10ch] font-display text-[clamp(3rem,5.2vw,5.7rem)] leading-[0.92] tracking-[-0.045em] text-[#211713] sm:max-w-[11ch] [animation-delay:120ms]`}
              >
                {titleLines.map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className={`${REVEAL_CLASS} max-w-[56ch] text-body-lg leading-[1.75] text-[#6E5F52] [animation-delay:200ms]`}>
                {hero.text}
              </p>
            </div>

            <div className={`${REVEAL_CLASS} flex flex-col gap-3 sm:flex-row [animation-delay:280ms]`}>
              <ButtonLink
                href="/contact/"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto !border-[#B75A3D] !bg-[#B75A3D] !text-[#F6EFE5] hover:!border-[#96432F] hover:!bg-[#96432F] focus-visible:!outline-[#96432F]"
              >
                {hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink
                href="/services/"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto !border-[rgba(184,138,85,0.45)] !bg-transparent !text-[#211713] !shadow-none hover:!border-[rgba(184,138,85,0.66)] hover:!bg-[rgba(184,138,85,0.08)] focus-visible:!outline-[#B88A55]"
              >
                {hero.ctaSecondary}
              </ButtonLink>
            </div>

            <p className={`${REVEAL_CLASS} max-w-[58ch] border-t border-[rgba(184,138,85,0.2)] pt-4 text-label tracking-[0.14em] text-[#6E5F52] [animation-delay:360ms]`}>
              {hero.servicesLine}
            </p>
          </div>

          <div className="relative lg:pl-4 xl:pl-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[18rem] -translate-x-1/2 lg:block xl:w-[22rem]"
            >
              <HeroTechnicalLines />
            </div>

            <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_11rem] xl:items-end">
              <figure className="relative min-h-[24rem] overflow-visible rounded-[2rem] sm:min-h-[30rem] lg:min-h-[42rem]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[2rem] border border-[rgba(184,138,85,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.12)_100%)] shadow-[0_28px_60px_-40px_rgba(33,23,19,0.32)]"
                />
                <OptimizedImage
                  src={heroStudioImg}
                  variants={HERO_STUDIO_VARIANTS}
                  alt="Plans, échantillons de matières et rendu 3D pour visualiser un projet d’intérieur avant travaux"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1279px) 100vw, 46vw"
                  width={1920}
                  height={1080}
                  className="relative block h-full rounded-[2rem] object-cover"
                  style={{
                    width: "115%",
                    maxWidth: "none",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "left bottom",
                    transform: "translateX(-6%)",
                    maskImage: "linear-gradient(to right, transparent 0%, black 14%, black 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 100%)",
                  }}
                />
              </figure>

              <aside className="hidden xl:block">
                <div className="relative py-6 pl-1">
                  <div
                    aria-hidden="true"
                    className="absolute left-[14px] top-8 bottom-8 w-px bg-[linear-gradient(180deg,rgba(184,138,85,0)_0%,rgba(184,138,85,0.3)_12%,rgba(184,138,85,0.3)_88%,rgba(184,138,85,0)_100%)]"
                  />
                  <ol className="space-y-6">
                    {HERO_ANNOTATIONS.map((item) => (
                      <li key={item.title} className="relative flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(184,138,85,0.5)] bg-[#F6EFE5] text-[#B88A55] shadow-[0_10px_20px_-14px_rgba(33,23,19,0.3)]"
                        >
                          <HeroAnnotationIcon kind={item.kind} />
                        </span>
                        <p className="pt-0.5 text-body-sm font-medium leading-snug text-[#211713]">
                          {item.title}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-3 xl:hidden">
              {HERO_ANNOTATIONS.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 rounded-[1rem] border border-[rgba(184,138,85,0.18)] bg-[rgba(255,255,255,0.42)] px-3 py-3 text-[#211713] shadow-[0_10px_20px_-18px_rgba(33,23,19,0.2)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(184,138,85,0.45)] text-[#B88A55]"
                  >
                    <HeroAnnotationIcon kind={item.kind} className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-body-sm font-medium leading-snug">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-[rgba(26,18,14,0.08)] bg-[#1A120E] text-[#F6EFE5]">
        <div className="container-hf py-5 sm:py-6">
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {hero.proofBar.map((item, index) => {
              const proofKind = HERO_PROOF_KINDS[index] ?? HERO_PROOF_KINDS[0];

              return (
                <li
                  key={item}
                  className={`${REVEAL_CLASS} flex items-start gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 shadow-[0_14px_32px_-28px_rgba(0,0,0,0.45)]`}
                  style={{ animationDelay: `${420 + index * 90}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B88A55]/38 bg-[#1A120E] text-[#B88A55]"
                  >
                    <HeroProofIcon kind={proofKind} />
                  </span>
                  <span className="text-body-sm font-medium leading-snug text-[#F6EFE5]">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
