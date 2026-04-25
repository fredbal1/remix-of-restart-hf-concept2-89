export type HomeContent = typeof import("@/data/home-content").HOME_CONTENT;
export type HomeHeroContent = HomeContent["hero"];
export type HomeTrustItems = HomeContent["trustBand"]["items"];
export type HomeEditorialContent = HomeContent["editorial"];
export type HomeRealisationsContent = HomeContent["realisations"];
export type HomeServicesContent = HomeContent["services"];
export type HomeProjectionContent = HomeContent["visu3d"];
export type HomeFinalCtaContent = HomeContent["finalCta"];
export type TestimonialsContent = typeof import("@/data/testimonials-content").TESTIMONIALS_CONTENT;

