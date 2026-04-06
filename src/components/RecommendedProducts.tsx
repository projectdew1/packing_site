"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { API_ROUTES, IMAGE_URL } from "@/lib/constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RecommendedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(API_ROUTES.productRecommend);
        const data = await res.json();
        if (data.status === 200) {
          setProducts(data.items || []);
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <section id="products" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-brand-orange)] tracking-wider uppercase mb-3"> Recommended Products </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">เครื่องบรรจุภัณฑ์ยอดนิยม</h3>
          </div>
          <div className="flex items-center gap-4">
            {/* Custom nav arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                className="swiper-prev-btn w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center transition-all active:scale-90"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="swiper-next-btn w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center transition-all active:scale-90"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-blue-300 hover:text-white font-semibold transition-colors">
              ดูผลิตภัณฑ์ทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Swiper Slider */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-slate-800/50 rounded-[1.5rem] animate-pulse flex flex-col p-6">
                <div className="aspect-square bg-slate-700/50 rounded-xl mb-4" />
                <div className="h-4 bg-slate-700/50 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-700/50 rounded w-1/2 mb-auto" />
                <div className="h-10 bg-slate-700/50 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: ".swiper-prev-btn",
              nextEl: ".swiper-next-btn",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-custom-pagination",
              bulletClass: "swiper-dot",
              bulletActiveClass: "swiper-dot-active",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={products.length >= 4} // Only loop if we have enough slides
            grabCursor={true}
            className="!overflow-hidden !pb-2"
          >
            {products.map((product, idx) => (
              <SwiperSlide key={product.id || idx} className="!h-auto">
                <Link 
                  href={`/products/${product.link}`} 
                  className="h-full flex flex-col group bg-gradient-to-b from-slate-800/80 to-slate-900/90 backdrop-blur-md border border-white/10 rounded-[1.5rem] overflow-hidden hover:border-sky-400/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] transition-all duration-500 hover:-translate-y-1.5 isolate"
                >
                  {/* Image Section */}
                  <div className="relative aspect-square w-full flex justify-center items-center bg-gradient-to-b from-white to-slate-50 shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-transparent opacity-50" />
                    <Image 
                      src={product.localImage ? `${IMAGE_URL}${product.localImage}` : "/product_machine_1773729790893.png"} 
                      alt={product.machineName}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                    />
                    {/* HOT Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg shadow-orange-500/30 ring-2 ring-white">HOT</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-sky-500/10 blur-[30px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <h4 
                      className="font-bold text-lg mb-5 line-clamp-2 leading-[1.3] text-slate-200 group-hover:text-blue-200 transition-colors drop-shadow-sm h-12"
                      title={product.machineName}
                    >
                      {product.machineName}
                    </h4>
                    
                    <div className="mt-auto">
                      <span className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/5 group-hover:bg-[var(--color-brand-orange)] border border-white/10 group-hover:border-transparent text-sm font-bold rounded-xl transition-all duration-300 w-full group-hover:shadow-[0_8px_20px_rgba(255,102,0,0.3)] text-white">
                        ดูรายละเอียด
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Custom dots pagination */}
        <div className="swiper-custom-pagination flex justify-center gap-2 mt-8" />
      </div>

      {/* Swiper custom styles */}
      <style jsx global>{`
        .swiper-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .swiper-dot-active {
          width: 32px !important;
          background: var(--color-brand-orange) !important;
        }
        .swiper-prev-btn.swiper-button-disabled,
        .swiper-next-btn.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
