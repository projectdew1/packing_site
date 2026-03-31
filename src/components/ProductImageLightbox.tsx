"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface ProductImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
}

/* ── Lightbox Modal ── */
function LightboxModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-white/70 text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 sm:left-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/20 hover:scale-110 active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 sm:right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/20 hover:scale-110 active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative z-40 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
          draggable={false}
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/10 max-w-[90vw] overflow-x-auto scrollbar-hide"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                // We need to call the parent's set index
                // Using a trick: navigating to the index
                const diff = idx - currentIndex;
                if (diff > 0) for (let i = 0; i < diff; i++) onNext();
                else if (diff < 0) for (let i = 0; i < -diff; i++) onPrev();
              }}
              className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? "border-[var(--color-brand-orange)] ring-2 ring-[var(--color-brand-orange)]/30 scale-105"
                  : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-contain bg-white/10 p-1"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Export: Clickable Image Gallery ── */
export function ProductImageGrid({
  images,
  productName,
}: {
  images: LightboxImage[];
  productName: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-square rounded-xl border border-gray-100 overflow-hidden bg-gradient-to-b from-gray-50 to-white p-3 hover:border-[var(--color-brand-blue)]/30 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 rounded-xl">
              <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                <ZoomIn className="w-3.5 h-3.5" />
                ขยายรูป
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <LightboxModal
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}

/* ── Hero Image with click to open lightbox ── */
export function ProductHeroImage({
  allImages,
  mainImageSrc,
  mainImageAlt,
  isSoldout,
  hasDiscount,
  pct,
}: {
  allImages: LightboxImage[];
  mainImageSrc: string;
  mainImageAlt: string;
  isSoldout: boolean;
  hasDiscount: boolean;
  pct: number;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <button
          onClick={() => openLightbox(activeThumb)}
          className="group relative aspect-square w-full bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center p-8 cursor-pointer hover:border-[var(--color-brand-blue)]/20 transition-all"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,26,255,0.03),transparent_70%)]" />
          {isSoldout && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-30 flex items-center justify-center">
              <span className="bg-red-500 text-white text-lg font-bold px-8 py-3 rounded-full -rotate-12 shadow-lg shadow-red-500/30">
                สินค้าหมด
              </span>
            </div>
          )}
          {hasDiscount && !isSoldout && (
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg shadow-red-500/20">
                ลด {pct}%
              </span>
            </div>
          )}
          <img
            src={allImages[activeThumb]?.src || mainImageSrc}
            alt={mainImageAlt}
            className="w-full h-full object-contain relative z-10 mix-blend-multiply"
          />
          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center gap-1.5 text-slate-600 text-xs font-semibold bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <ZoomIn className="w-3.5 h-3.5" />
              คลิกเพื่อขยาย
            </span>
          </div>
        </button>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveThumb(idx)}
                className={`aspect-square rounded-xl border-2 overflow-hidden bg-white p-2 cursor-pointer hover:border-[var(--color-brand-blue)] transition-colors ${
                  idx === activeThumb ? "border-[var(--color-brand-blue)]" : "border-gray-100"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <LightboxModal
          images={allImages}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
