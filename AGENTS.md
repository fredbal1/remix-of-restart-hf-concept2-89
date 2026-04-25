# AGENTS.md

## Purpose

This file defines execution guardrails for the HFconcept repository.
It is operational, not descriptive.
If this file diverges from the live code, update the file or follow runtime truth.

## Project intent

HFconcept is a site de conception intérieure clair, accessible et visuel, orienté décision avant travaux, avec accompagnement possible sur place ou à distance.

The output must stay:
- professional
- qualitative
- clear
- accessible
- warm
- architectural
- visual
- decisive
- conversion-aware
- non-editorial

Do not drift toward:
- generic AI-looking UI
- template luxury aesthetics
- magazine-style layouts
- weak hierarchy
- overlong copy used to compensate for weak design

When in doubt, prefer clarity, hierarchy, proof, and measured sophistication.

## Source-of-truth order

Follow this order:
1. runtime code actually used
2. `src/app/*`, `src/data/*`, `src/config/*`, `src/lib/seo/*`
3. existing shared primitives, utilities, manifests, and active route/data models
4. `AGENTS.md`
5. `README.md`

Rules:
- do not invent repo states that do not exist
- do not keep outdated docs alive
- do not describe contracts or patterns absent from the repo
- if docs and runtime disagree, treat runtime as source of truth

## Execution policy

Before changing code:
1. inspect the real files involved
2. identify the active source of truth
3. reuse an existing primitive, token, utility, dataset, or manifest if it already solves the need
4. keep the scope tight
5. avoid collateral refactors unless required for correctness, stability, or source-of-truth cleanup

Do not use a local task as an excuse for broad redesign or cleanup.

## Routing, rendering, and runtime stability

This project uses React Router on the client, but production deployment relies on prerendered static HTML routes.
It is not deployed as a generic Apache SPA fallback.

Mandatory constraints:
- keep `BrowserRouter` unless explicitly requested otherwise
- keep router future flags aligned between `src/App.tsx` and `src/entry-server.tsx`
- preserve `AppShell`, skip link, main landmark, `ErrorBoundary`, `RouteErrorBoundary`, and `ScrollToTop`
- preserve `/500`, `/404`, and `*`
- keep `public/.htaccess` aligned with the current deployment model: HTTPS + canonical host + prerendered static routes + true HTTP 404
- do not reintroduce a generic Apache rewrite to `/index.html`

Current note:
- pages are currently loaded eagerly in both `src/app/AppRoutes.tsx` and `src/entry-server.tsx`
- do not change route loading strategy without revalidating hydration and prerender end to end
- do not flag eager route loading as a default audit issue
- if mentioned, classify route-level lazy loading only as an optional future optimization with real regression risk

## CSS governance

Architecture:
- `src/index.css` = minimal foundation governance
- `src/App.css` = minimal app shell layer
- `src/components/**/*.css` = component-owned local CSS

HFconcept V1 palette:
- the global visual foundation lives in `src/index.css`
- brand-facing color tokens should be expressed with `hf-*` / `brand-*`
- shadcn `--accent` stays a compatibility token, not the brand token
- target composition remains mostly light: 72% warm light backgrounds, 15% text / structure, 8% terracotta, 3% deep background, 2% brass maximum

`src/index.css` is for:
- tokens
- reset / base
- typography primitives
- accessibility primitives
- shared surfaces, overlays, CTA, motion, and utilities

Do not put in `src/index.css`:
- page-only styling
- one-off section layouts
- isolated exceptions
- single-use recipes pretending to be system rules

Rule:
- global if durable and reused
- local if specific

Do not create fake system tokens for one-off styling.
Do not rebuild the old HFconcept visual system inside `src/index.css`.
Do not create parallel global CSS token files.

## Components architecture (current)

Primary structure:
- `src/components/brand/` = logo, wordmark, marque
- `src/components/layout/` = shell, header, footer, breadcrumbs, page hero, section frame
- `src/components/ui/` = buttons, cards, chips, reusable UI atoms
- `src/components/sections/` = page sections grouped by page intent

Legacy status:
- `src/components/signature/` has been removed from active runtime
- `Signature*` components and `signature` CSS/classes are forbidden
- `champagne`, `stone` and `glass` are no longer the base vocabulary for UI tokens
- do not reintroduce a new `src/components/signature/` layer
- keep the runtime neutral and rebuild any new DA in a separate pass

## Design guardrails

Do not solve design problems with more text.
Do not flatten the interface in the name of elegance.
Do not weaken contrast, rhythm, or CTA visibility.
Do not default to neutral section formulas everywhere.
Do not treat the old DA as a reference point.

Preferred direction:
- strong hierarchy
- concise high-signal copy
- warm, controlled surfaces
- visible service clarity
- clear conversion paths
- motion only when it materially improves quality or understanding

## Shared primitives

Treat these as sensitive:
- `Button`
- `ButtonLink`
- `SectionFrame`
- `SectionIntro`
- `SiteHeader`
- `SiteFooter`
- `PageHero`
- `Breadcrumbs`
- `ContactForm`
- `useContactForm`
- `OptimizedImage`
- `SEO`
- `ErrorBoundary`
- `RouteErrorBoundary`

Rules:
- do not change shared APIs casually
- do not add variants unless the need is durable and multi-use
- do not push composition-specific styling into shared primitives
- if a shared primitive is adjusted for polish, verify the impact everywhere it is used

## Data, SEO, metadata, and prerender

Main sources of truth:
- `src/data/site-config.ts`
- `src/lib/seo/route-manifest.ts`
- `src/components/seo/SEO.tsx`
- `src/data/services-manifest.ts`
- `src/data/projects-manifest.ts`
- `src/data/og-realisations-manifest.ts`
- `scripts/prerender-routes.ts`
- `scripts/validate-dist-seo.ts`

Rules:
- do not hardcode route SEO locally when the manifest already owns it
- do not add OG assets without wiring them to the real manifest flow
- do not ship routes that should be indexable without checking title, description, canonical, OG, and sitemap behavior
- do not break prerender output structure
- do not treat runtime Helmet output alone as the production SEO source of truth

## Forms and config

Current state:
- no runtime env variable is required by the repo
- the Formspree endpoint is intentionally centralized in `src/config/formspree.ts`
- this endpoint is treated as a public frontend config value, not as a server secret
- the production build embeds it directly into the generated client assets
- exporting `dist/` to OVH does not require an extra env step for the contact form

Rules:
- do not duplicate config in components
- do not invent env variables or config contracts that the repo does not currently use
- do not recommend `VITE_FORMSPREE_ENDPOINT` by default on this repo
- do not flag the hardcoded Formspree endpoint as a defect unless the project explicitly decides to change config model
- if the config model changes, update `README.md`, `.env.example`, and the real code together

## Quality bar

Changes must keep these commands passing when relevant:
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`

Build expectations:
- prerender completes
- SEO validation passes
- bundle budget check passes

Do not relax bundle budgets casually.
If the thresholds change, the reason should be explicit and the impact should be revalidated.

## Deployment assumptions

Current target is Apache / OVH.

Do not:
- remove or break `.htaccess`
- assume server-side routing support on the host
- reintroduce a generic SPA fallback for unknown routes
- introduce deploy requirements that are not documented by the repo

## Responsive image generation policy

No maintained in-repo responsive image generation workflow is active at this stage.

## Motion / GSAP policy

GSAP (`gsap`, `@gsap/react`) is the only allowed animation library on this repo.
Do not introduce Framer Motion, React Spring, Anime.js, Lenis, Locomotive Scroll, or any other animation / smooth-scroll library.

Foundation lives in `src/lib/motion/`:
- `useReducedMotion` — SSR-safe `prefers-reduced-motion` hook
- `useGsapReveal` — locally-scoped reveal hook built on `@gsap/react`

Rules:
- never run GSAP during React render; use `useGSAP()` from `@gsap/react`
- never read `window`, `document`, or `matchMedia` during render
- always honor `prefers-reduced-motion: reduce` (skip the animation, render the final state)
- always scope animations with a local ref; no global selectors
- no SSR/hydration mismatch caused by motion code
- no scroll hijacking, no aggressive pinning, no heavy parallax, no forced scroll snap
- no permanent decorative animations
- lighten effects on mobile

GSAP is allowed for animations that aid comprehension: plan lines, soft reveals, projection layers, micro-transitions. It is forbidden for gimmicks, scroll hijacking, heavy parallax, permanent loops, or anything that slows navigation.

## Documentation rule

`README.md` explains how to run and understand the repo.
`AGENTS.md` defines execution constraints.

Neither file should become long-form project prose.
If a section is explanatory but not operational, cut it.
