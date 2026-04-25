# PROJECT_STATE

## État actuel (Clean Foundation)

- Structure active propre: `components/brand`, `components/layout`, `components/ui`, `components/sections`.
- Couche `src/components/signature/` retirée du runtime.
- Composants `Signature*` supprimés de la base clean.
- `src/index.css` est la fondation globale des tokens HFconcept V1.
- HFconcept V1 is a clear, accessible and visual conception-intérieure base, oriented toward decisions before works, with on-site or remote support possible.
- Les tokens visuels hérités ont été renommés vers des noms neutres; la base UI ne dépend plus de `champagne`, `stone` ou `glass`.
- CSS shell renommés: `site-header.css`, `site-footer.css`.
- La palette HFconcept V1 reste majoritairement claire et pilotée par des tokens `hf-*`; `--accent` shadcn reste un token de compatibilité UI.

## Ce qui est clean

- Header: logique de lien actif normalisée (`/`, trailing slash, sous-routes).
- Backdrop mobile du header: décoratif et caché SR (`aria-hidden="true"`).
- Textes visibles corrigés dans les sections migrées ciblées.
- Plus d’imports applicatifs vers `src/components/signature/`.

## Legacy restant

- Quelques assets, slugs, tests et contenus de compatibilité contiennent encore `signature`.
- Ils ne doivent plus piloter la couche visuelle active.
- La nouvelle DA sera construite dans une passe séparée.

## Prochaine étape recommandée

- Passe suivante: construire la nouvelle identité visuelle sur cette base neutre, puis migrer les pages une par une si un besoin de polish apparaît.

## Fondation motion

- `gsap` + `@gsap/react` installés comme unique stack motion.
- Hooks fondation : `src/lib/motion/useReducedMotion.ts`, `src/lib/motion/useGsapReveal.ts`.
- Aucune animation visible appliquée aux pages actuelles ; fondation prête pour la future home.
- Politique d'usage détaillée dans `AGENTS.md` (section Motion / GSAP policy).

## Interdictions à conserver

- Ne pas toucher SEO/routing/prerender/sitemap/robots/.htaccess sans demande explicite.
- Ne pas supprimer de route indexable sans remplacement.
- Ne pas casser les pages légales.
- Conserver Tailwind et la structure CSS actuelle (`index.css` + CSS co-localisé).
- Ne pas réintroduire `Signature*` ni de classes `signature`.
- Ne pas ajouter d'autre librairie motion (Framer Motion, Lenis, etc.). GSAP uniquement.
