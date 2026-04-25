import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useScrollLock, useFocusTrap } from "@/hooks/useScrollLock";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { getImageVariants } from "@/data/image-variants";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

/* ── Shared thumbnail button ── */

type GalleryImageButtonProps = {
  src: string;
  title: string;
  label: string;
  aspect: "video" | "4/3";
  sizes: string;
  priority?: boolean;
  buttonClassName?: string;
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ASPECT_CLASS: Record<GalleryImageButtonProps["aspect"], string> = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
};

const LIGHTBOX_CONTROL_CLASS = cn(
  "pointer-events-auto absolute z-10 flex items-center justify-center rounded-full",
  "border border-white/10 bg-hf-ink/70 text-hf-on-dark/90",
  "shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-[background-color,color,border-color] duration-fast ease-out-expo",
  "hover:bg-hf-ink/80 hover:text-hf-on-dark focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2",
  "h-11 w-11 md:h-12 md:w-12 supports-[backdrop-filter]:backdrop-blur-sm",
);

function GalleryImageButton({
  src,
  title,
  label,
  aspect,
  sizes,
  priority,
  buttonClassName,
  onOpen,
}: GalleryImageButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative isolate w-full overflow-hidden rounded-[1.45rem] border border-hf-accent-deep/12 bg-white/26 p-2 shadow-panel transition-[transform,border-color,box-shadow] duration-fast ease-out-expo hover:-translate-y-1 hover:border-hf-accent-deep/24 hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-hf-accent focus-visible:outline-offset-2",
        buttonClassName,
      )}
      aria-label={`Ouvrir ${title} — ${label}`}
    >
      <span className="pointer-events-none absolute inset-x-2 top-2 h-14 rounded-[1.05rem] bg-gradient-to-b from-white/16 via-white/3 to-transparent" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-2 bottom-2 h-24 rounded-[1.05rem] bg-gradient-to-t from-hf-ink/48 via-hf-ink/8 to-transparent opacity-90" aria-hidden="true" />
      <span className="absolute left-5 top-5 z-[2] inline-flex items-center rounded-full border border-white/16 bg-hf-ink/52 px-3 py-1 text-micro-label text-hf-on-dark/84 backdrop-blur-sm">
        {label}
      </span>
      <div className={cn("overflow-hidden rounded-[1.05rem]", ASPECT_CLASS[aspect])}>
        <OptimizedImage
          src={src}
          variants={getImageVariants(src)}
          alt={`${title} — ${label}`}
          className="h-full w-full object-cover transition-transform duration-fast ease-out-expo group-hover-scale-gentle"
          priority={priority}
          sizes={sizes}
        />
      </div>
    </button>
  );
}

/* ── Secondary image grid (shared by 3-image and 4+-image layouts) ── */

function SecondaryImageGrid({ images, title, onOpen }: LayoutProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {images.slice(1).map((src, i) => (
        <GalleryImageButton
          key={src}
          src={src}
          title={title}
          label={`vue ${i + 2}`}
          aspect="4/3"
          sizes="(max-width: 640px) 100vw, 50vw"
          onOpen={(e) => onOpen(i + 1, e.currentTarget)}
        />
      ))}
    </div>
  );
}

/* ── Lightbox ── */

function Lightbox({
  images,
  projectTitle,
  openIndex,
  onClose,
  returnFocusTo,
}: {
  images: string[];
  projectTitle: string;
  openIndex: number;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
}) {
  const [current, setCurrent] = useState(openIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useScrollLock(true);
  useFocusTrap(containerRef, true);

  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const trigger = returnFocusTo;
    return () => {
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [returnFocusTo]);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, goPrev, goNext]);

  const lightbox = (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie ${projectTitle} — image ${current + 1} sur ${images.length}`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-hf-ink/95 animate-in fade-in duration-fast"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="pointer-events-none relative flex h-full w-full items-center justify-center px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la galerie"
          className={cn(
            LIGHTBOX_CONTROL_CLASS,
            "top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6",
          )}
        >
          <X className="h-5 w-5" />
        </button>
        {images.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Image précédente"
            className={cn(
              LIGHTBOX_CONTROL_CLASS,
              "left-3 top-1/2 -translate-y-1/2 sm:left-4 md:left-6",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <OptimizedImage
          src={images[current]}
          alt={`${projectTitle} — vue ${current + 1}`}
          className="pointer-events-auto max-h-[calc(100vh-7rem)] max-w-[calc(100vw-2.5rem)] rounded-md object-contain shadow-[0_32px_120px_rgba(0,0,0,0.42)] select-none sm:max-h-[calc(100vh-8.5rem)] sm:max-w-[calc(100vw-3.5rem)] lg:max-h-[calc(100vh-7rem)] lg:max-w-[calc(100vw-8rem)] xl:max-w-[1360px] 2xl:max-w-[1480px]"
          draggable={false}
          priority
          fetchPriority="high"
        />
        {images.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Image suivante"
            className={cn(
              LIGHTBOX_CONTROL_CLASS,
              "right-3 top-1/2 -translate-y-1/2 sm:right-4 md:right-6",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
        {images.length > 1 && (
          <span
            className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border border-white/10 bg-hf-ink/70 px-3 py-1.5 text-body-sm text-hf-on-dark/70 tabular-nums tracking-wide supports-[backdrop-filter]:backdrop-blur-sm sm:bottom-6"
            aria-live="polite"
            aria-atomic="true"
          >
            {current + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(lightbox, document.body);
}

/* ── Layout prop type ── */

type LayoutProps = { images: string[]; title: string; onOpen: (i: number, trigger: HTMLElement) => void };

/* ── Gallery grid ── */

export function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  if (images.length === 0) return null;

  const handleOpen = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setLightboxIndex(index);
  };

  const count = images.length;

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-hf-accent-deep/10 bg-white/44 px-4 py-3 shadow-soft">
          <span className="text-label uppercase tracking-[0.16em] text-hf-soft">
            Mise en scène du projet
          </span>
          <span className="text-body-sm text-hf-strong">
            {images.length} vue{images.length > 1 ? "s" : ""}
          </span>
        </div>
        {count === 1 && (
          <SingleImageLayout images={images} title={projectTitle} onOpen={handleOpen} />
        )}
        {count === 2 && (
          <TwoImageLayout images={images} title={projectTitle} onOpen={handleOpen} />
        )}
        {count >= 3 && (
          <PrimaryWithSecondaryGridLayout images={images} title={projectTitle} onOpen={handleOpen} />
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} projectTitle={projectTitle} openIndex={lightboxIndex} returnFocusTo={triggerRef.current} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}

/* ── 1 image ── */

function SingleImageLayout({ images, title, onOpen }: LayoutProps) {
  return (
    <GalleryImageButton
      src={images[0]}
      title={title}
      label="vue 1"
      aspect="video"
      sizes="100vw"
      priority
      onOpen={(e) => onOpen(0, e.currentTarget)}
    />
  );
}

/* ── 2 images ── */

function TwoImageLayout({ images, title, onOpen }: LayoutProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 md:gap-4">
      <GalleryImageButton
        src={images[0]}
        title={title}
        label="vue 1"
        aspect="4/3"
        sizes="(max-width: 640px) 100vw, 60vw"
        priority
        buttonClassName="sm:col-span-3"
        onOpen={(e) => onOpen(0, e.currentTarget)}
      />
      <GalleryImageButton
        src={images[1]}
        title={title}
        label="vue 2"
        aspect="4/3"
        sizes="(max-width: 640px) 100vw, 40vw"
        buttonClassName="sm:col-span-2"
        onOpen={(e) => onOpen(1, e.currentTarget)}
      />
    </div>
  );
}

/* ── 3+ images ── */

function PrimaryWithSecondaryGridLayout({ images, title, onOpen }: LayoutProps) {
  return (
    <div className="grid gap-3 md:gap-4">
      <GalleryImageButton
        src={images[0]}
        title={title}
        label="vue 1"
        aspect="video"
        sizes="100vw"
        priority
        onOpen={(e) => onOpen(0, e.currentTarget)}
      />
      <SecondaryImageGrid images={images} title={title} onOpen={onOpen} />
    </div>
  );
}

