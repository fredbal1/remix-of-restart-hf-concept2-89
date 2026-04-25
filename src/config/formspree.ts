// Public frontend configuration chosen intentionally for this project.
// Do not replace with a VITE_* env variable unless the config model is explicitly changed everywhere.
// This endpoint is embedded at build time and must continue to work when dist/ is exported to OVH.
const raw = "https://formspree.io/f/mdawweeg".trim();

const FORMSPREE_PATTERN = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/;

export const FORMSPREE_ENDPOINT: string = raw;
export const HAS_FORMSPREE_ENDPOINT: boolean = FORMSPREE_PATTERN.test(raw);
