"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, goNext, goPrev]);

  return (
    <>
      {/* ── Gallery Grid ── */}
      <div className="mt-14 pt-10 border-t border-slate-100">
        <h3 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-[var(--color-brand-blue)] to-sky-400 rounded-full" />
          รูปภาพประกอบ
          <span className="text-sm font-medium text-slate-400 ml-1">({images.length} รูป)</span>
        </h3>

        <div className={`grid gap-4 ${
          images.length === 2 ? "grid-cols-2" :
          images.length === 3 ? "grid-cols-2 md:grid-cols-3" :
          "grid-cols-2"
        }`}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className={`relative bg-slate-50 rounded-2xl overflow-hidden ring-1 ring-slate-100 group hover:shadow-lg transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                images.length === 3 && i === 0 ? "col-span-2 md:col-span-1 aspect-[4/3]" :
                images.length >= 4 && i === 0 ? "col-span-2 aspect-[16/9]" :
                "aspect-[4/3]"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - รูปที่ ${i + 1}`}
                fill
                className="object-contain p-4 md:p-6 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Index badge */}
              <div className="absolute top-3 left-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">
                {i + 1}
              </div>
              {/* Zoom overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                  <ZoomIn className="w-4 h-4 text-slate-700" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-3 text-center">คลิกที่รูปเพื่อดูขนาดเต็ม</p>
      </div>

      {/* ── Lightbox Modal ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-[fadeIn_200ms_ease-out]" />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-white/90 text-sm font-bold">
                  {currentIndex + 1} / {images.length}
                </span>
                <span className="text-white/40 text-sm hidden sm:block">
                  |  {title}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main image area */}
            <div className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0">
              {/* Prev button */}
              {images.length > 1 && (
                <button
                  onClick={goPrev}
                  className="absolute left-4 md:left-8 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Image */}
              <div className="relative w-full max-w-5xl h-full max-h-[80vh] mx-16">
                <Image
                  src={images[currentIndex]}
                  alt={`${title} - รูปที่ ${currentIndex + 1}`}
                  fill
                  className="object-contain animate-[fadeIn_200ms_ease-out]"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Next button */}
              {images.length > 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-4 md:right-8 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="shrink-0 flex items-center justify-center gap-2 px-6 pb-6 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-300 ${
                      i === currentIndex
                        ? "ring-2 ring-white shadow-lg scale-105"
                        : "ring-1 ring-white/20 opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-contain bg-white/10 p-1"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyframe animation for fade in */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
