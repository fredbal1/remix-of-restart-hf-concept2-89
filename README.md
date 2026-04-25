# HFconcept

Site de conception intérieure clair, accessible et visuel, orienté décision avant travaux, avec accompagnement possible sur place ou à distance.
Stack principale : React, Vite, TypeScript, Tailwind CSS, React Router, prerender HTML build-time.

Le repo est en `Clean Foundation`:
- aucune ancienne direction artistique ne doit servir de référence
- `src/index.css` porte la gouvernance globale des tokens HFconcept V1
- les anciens noms visuels `champagne`, `stone` et `glass` ne sont plus la base du code UI
- les composants et classes `Signature*` sont interdits
- la nouvelle identité visuelle sera construite dans une passe séparée

La palette HFconcept V1 reste claire et orientée décision: les composants consomment les tokens `hf-*` / `brand-*`, tandis que le token shadcn `--accent` reste en compatibilité UI.

Ce fichier décrit le fonctionnement réel du repo.
Pour les règles d’exécution, les garde-fous de modification et les arbitrages intentionnels à respecter, voir `AGENTS.md`.

## Objectif

Le site doit rester :
- professionnel
- qualitatif
- clair
- accessible
- chaleureux
- architectural
- visuel
- rassurant
- orienté conversion
- compatible France et international via le service à distance

À éviter :
- rendu template ou générique
- dérive éditoriale type magazine
- sections trop bavardes
- hiérarchie faible
- CTA dilués

## Stack

- React 18
- TypeScript 5
- Vite 7
- Tailwind CSS 3
- React Router 6 avec future flags v7
- `react-helmet-async`
- Zod
- Vitest
- ESLint 9
- `gsap` + `@gsap/react` (unique stack motion ; voir `AGENTS.md` § Motion / GSAP policy et `src/lib/motion/`)

## Prérequis

- Node.js >= 20
- npm >= 10

## Installation

```bash
npm ci
npm run dev
```

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Développement local |
| `npm run typecheck` | Vérification TypeScript |
| `npm run lint` | Lint strict |
| `npm run test` | Tests Vitest |
| `npm run build` | Typecheck + build client + build SSR temporaire + prerender HTML + validation SEO + contrôle budget bundle |
| `npm run build:dev` | Variante build en mode development pour vérifications locales |
| `npm run check:bundle-budget` | Contrôle isolé du poids des bundles |
| `npm run preview` | Prévisualisation du build |
| `npm run check` | Typecheck + lint + build |
| `npm run test:ci` | Typecheck + lint + test + build |

## Source de vérité

En cas de doute, suivre cet ordre :

1. runtime réellement exécuté
2. `src/app/*`, `src/data/*`, `src/config/*`, `src/lib/seo/*`
3. primitives, composants et manifests effectivement utilisés
4. `AGENTS.md`
5. `README.md`

Si la documentation diverge du code, le code gagne.

## Fichiers clés

- `src/main.tsx` : entrée runtime client, hydration guard, gestion `vite:preloadError`
- `src/App.tsx` : bootstrap applicatif client
- `src/entry-server.tsx` : rendu SSR build-time utilisé pour le prerender
- `src/app/routePaths.ts` : chemins source de vérité
- `src/app/routeDefinitions.ts` : mapping routes → pages
- `src/app/AppRoutes.tsx` : arbre de routes client
- `src/app/AppShell.tsx` : shell persistant, boundaries, skip link, scroll, toaster
- `src/data/site-config.ts` : données business et configuration site
- `src/lib/seo/route-manifest.ts` : manifest SEO central
- `src/config/formspree.ts` : configuration Formspree centralisée
- `src/index.css` : gouvernance CSS globale
- `vite.config.ts` : orchestration build et plugins SEO
- `scripts/prerender-routes.ts` : écrit le HTML prerender dans `dist/`
- `scripts/validate-dist-seo.ts` : valide le HTML SEO final
- `scripts/check-bundle-budget.ts` : contrôle le poids des bundles
- `public/.htaccess` : règles Apache / OVH pour canonicalisation, cache, sécurité et vraie 404 HTTP

## Structure

```text
src/
├── app/            # Shell, routes, chemins
├── components/     # brand, layout, ui, sections, realisations, seo
├── config/         # Configuration runtime
├── data/           # Contenus, manifests, constantes
├── hooks/          # Hooks partagés
├── lib/            # Utilitaires et logique métier
├── pages/          # Pages de routes
├── test/           # Tests Vitest
├── types/          # Types partagés
├── App.tsx
├── App.css
├── entry-server.tsx
├── index.css
└── main.tsx

public/
├── .htaccess
├── fonts/
├── og/
└── favicons + manifest

scripts/
├── prerender-routes.ts
├── validate-dist-seo.ts
├── check-bundle-budget.ts
├── generate-sitemap.ts
├── generate-robots.ts
├── vite-plugin-seo-files.ts
└── vite-plugin-site-url.ts
```

## Routing

Routes publiques :

- `/`
- `/studio`
- `/services`
- `/services/:slug`
- `/realisations`
- `/realisations/categorie/:slug`
- `/realisations/:slug`
- `/contact`
- `/zones-intervention/:slug`
- `/merci`
- `/mentions-legales`
- `/politique-de-confidentialite`
- `/500`
- `/404`
- `*`

Contraintes :
- runtime client basé sur `BrowserRouter`
- future flags router alignés entre `src/App.tsx` et `src/entry-server.tsx`
- shell persistant autour des routes
- `ErrorBoundary`, `RouteErrorBoundary` et `ScrollToTop` à préserver
- le déploiement production repose sur des routes HTML pré-rendues dans `dist/`, pas sur un fallback générique vers `/index.html`
- `public/.htaccess` doit rester cohérent avec ce modèle : HTTPS + host canonique + vraie 404 HTTP + aucune réécriture des routes inconnues vers `/index.html`

## CSS

Le repo suit une logique simple :

- `src/index.css` = foundation globale minimale
- `src/App.css` = shell minimal de l’application
- `src/components/**/*.css` = styles co-localisés propres aux composants

Règle :
- global si c’est durable et réutilisé
- local si c’est spécifique à un composant ou une section

`src/index.css` doit rester court, neutre et lisible.
Il ne doit pas redevenir un ancien design system déguisé.

## État UI de transition

Structure cible déjà active :
- `src/components/brand/`
- `src/components/layout/`
- `src/components/ui/`
- `src/components/sections/`

Règles de base :
- ne pas réintroduire de composants `Signature*`
- ne pas réintroduire de classes `signature`
- ne pas traiter l’ancienne DA comme source de vérité visuelle
- garder les pages et le socle technique, puis reconstruire la DA proprement dans une passe suivante

Le nettoyage peut encore laisser des assets ou contenus de compatibilité tant qu’ils ne sont pas utilisés par la couche visuelle active.

## SEO / build

Le build de production ne se limite pas à `vite build`.

`npm run build` enchaîne :
1. typecheck
2. build client
3. build SSR temporaire
4. prerender HTML des routes
5. validation SEO du `dist`
6. contrôle budget bundle

Sources SEO principales :
- `src/components/seo/SEO.tsx`
- `src/data/site-config.ts`
- `src/lib/seo/route-manifest.ts`
- `scripts/prerender-routes.ts`
- `scripts/validate-dist-seo.ts`

## Environnement

Aucune variable d’environnement runtime n’est requise actuellement.

État réel du repo :
- `.env.example` ne documente aucune variable obligatoire
- l’endpoint Formspree est volontairement centralisé en dur dans `src/config/formspree.ts`
- cet endpoint est une configuration frontend publique, pas un secret serveur
- le build l’embarque automatiquement dans les assets générés
- l’export du contenu de `dist/` vers OVH ne nécessite aucun paramétrage d’env supplémentaire pour le formulaire

Règle de repo :
- ne pas proposer `VITE_FORMSPREE_ENDPOINT` ou une autre env var par défaut sur ce projet
- ne pas signaler l’endpoint Formspree hardcodé comme une anomalie tant que ce modèle reste en place
- si le modèle change un jour, mettre à jour ensemble `src/config/formspree.ts`, `README.md`, `AGENTS.md` et `.env.example`

## Déploiement

Cible actuelle : hébergement Apache / OVH.

Procédure simple :
1. lancer `npm run build`
2. uploader le contenu de `dist/` sur l’hébergement
3. conserver `.htaccess` dans le build publié
4. vérifier les redirections canoniques HTTPS + www
5. vérifier les pages clés, les metas, le sitemap et la vraie 404 HTTP

Important :
- ce déploiement attend que les routes publiques utiles existent réellement dans `dist/`
- une URL inconnue doit tomber en vraie 404 HTTP via `/404.html`
- ce repo n’est pas documenté comme un site reposant sur un fallback SPA Apache vers `/index.html`

## Arbitrages intentionnels

### Chargement eager des routes client

Le chargement eager des modules de route côté client est **intentionnel** sur ce projet.
Il est conservé pour protéger la stabilité SSR, prerender, hydration et export.

Règle :
- ne pas traiter le route-level lazy loading comme une recommandation d’audit par défaut
- ne considérer ce sujet que comme une optimisation future éventuelle, et uniquement s’il existe un problème de performance mesuré et actuel

### Génération responsive d’images

Aucun workflow maintenu de génération responsive d’images n’est actif dans le repo.

## Points d’attention

- le bundle JS principal reste relativement lourd ; surveiller le sujet si la base grossit
- ne pas relâcher les budgets bundle sans raison claire et revalidation complète
- ne pas casser l’alignement client / SSR / prerender
- ne pas contourner les sources de vérité SEO ou routing avec du hardcode local
- ne pas laisser la documentation dériver par rapport au runtime
- ne pas transformer le README en documentation métier détaillée
