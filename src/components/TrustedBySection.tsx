"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const CLIENT_LOGOS = Array.from({ length: 13 }, (_, i) => ({
  src: `/customer/customer${i + 1}.png`,
  alt: `customer${i + 1}`,
}));

export default function TrustedBySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(animate); };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate for seamless scroll
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-2">
            Trusted Partners
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            ลูกค้าที่ไว้วางใจเรา
          </h3>
        </div>
      </div>

      {/* Scrolling logos */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-hidden px-8"
          style={{ scrollBehavior: "auto" }}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center w-44 md:w-52 h-28 bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative w-36 h-20">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
