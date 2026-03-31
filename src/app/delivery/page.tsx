"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Truck, MapPin, CheckCircle2, Clock, Shield, Phone,
  X, ChevronLeft, ChevronRight, ZoomIn, Plus, Images,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { DELIVERY_JOBS, type DeliveryJob } from "@/lib/deliveryData";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";


const PAGE_SIZE = 9;

const DELIVERY_FEATURES = [
  { icon: Truck,        title: "ทีมขนส่งมืออาชีพ",   desc: "รถขนส่งเฉพาะทางพร้อมอุปกรณ์ยกสินค้าหนัก ดูแลเครื่องจักรอย่างปลอดภัย" },
  { icon: Clock,        title: "นัดหมายเวลาได้",      desc: "สามารถนัดหมายวันและเวลาจัดส่งที่สะดวก เพื่อให้โรงงานเตรียมพร้อมรับสินค้า" },
  { icon: Shield,       title: "ประกันระหว่างขนส่ง",  desc: "เครื่องจักรทุกชิ้นมีประกันความเสียหายระหว่างการขนส่งครอบคลุมทุกจังหวัด" },
  { icon: CheckCircle2, title: "ติดตั้งและเทรนนิ่ง", desc: "ทีมวิศวกรติดตั้งเครื่องจักรพร้อมสอนการใช้งานถึงหน้าโรงงาน ไม่มีค่าใช้จ่ายเพิ่ม" },
];

// ===================================
// Lightbox — shows all images of ONE job
// ===================================
function JobLightbox({
  job,
  onClose,
}: {
  job: DeliveryJob;
  onClose: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);

  const goPrev = useCallback(() =>
    setImgIdx((i) => (i - 1 + job.images.length) % job.images.length), [job.images.length]);
  const goNext = useCallback(() =>
    setImgIdx((i) => (i + 1) % job.images.length), [job.images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   goPrev();
      if (e.key === "ArrowRight")  goNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-[#080f1e]"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "90vh" }}
      >
        {/* ── Left: Image viewer ── */}
        <div className="relative lg:w-[60%] bg-black flex items-center justify-center" style={{ minHeight: 320 }}>
          {/* Main image */}
          <div className="relative w-full aspect-video">
            <Image
              key={imgIdx}
              src={job.images[imgIdx]}
              alt={`${job.location} — ${job.customer} รูปที่ ${imgIdx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-bold">
              {imgIdx + 1} / {job.images.length}
            </div>
          </div>

          {/* Prev/Next — only if >1 image */}
          {job.images.length > 1 && (
            <>
              <button onClick={goPrev} aria-label="ก่อนหน้า"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/10 hover:scale-110 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={goNext} aria-label="ถัดไป"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/10 hover:scale-110 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* ── Right: Info ── */}
        <div className="lg:w-[40%] flex flex-col overflow-y-auto" style={{ maxHeight: "90vh" }}>
          <div className="p-6 lg:p-8 flex flex-col gap-5 flex-1">

            {/* Close */}
            <button onClick={onClose} aria-label="ปิด"
              className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/10 z-10">
              <X className="w-4 h-4" />
            </button>

            {/* Location + date */}
            <div className="flex items-start gap-3 pt-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-orange)] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-extrabold text-xl leading-tight">{job.location}</h2>
                <span className="text-slate-400 text-sm">{job.date}</span>
              </div>
            </div>

            {/* Customer */}
            <div className="border border-white/10 rounded-2xl p-4 space-y-2.5">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">ลูกค้า / โรงงาน</p>
                <p className="text-white font-semibold text-sm leading-relaxed">{job.customer}</p>
              </div>
              <div className="border-t border-white/10 pt-2.5">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">เครื่องจักรที่จัดส่ง</p>
                <p className="text-sky-300 font-semibold text-sm leading-relaxed">{job.machine}</p>
              </div>
            </div>

            {/* Thumbnail strip */}
            {job.images.length > 1 && (
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Images className="w-3.5 h-3.5 text-slate-500" />
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    รูปทั้งหมด ({job.images.length})
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {job.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        i === imgIdx
                          ? "border-[var(--color-brand-orange)] scale-105 shadow-lg shadow-orange-500/30"
                          : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                      }`}
                    >
                      <Image src={img} alt={`รูปที่ ${i + 1}`} fill className="object-cover" sizes="56px" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <p className="text-slate-400 text-xs mb-3">สนใจเครื่องจักรหรือต้องการใบเสนอราคา</p>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)] text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-orange-500/20"
              >
                <Phone className="w-4 h-4" />
                ติดต่อสอบถาม
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================
// Main Page
// ===================================
export default function DeliveryPage() {
  const [activeJob, setActiveJob] = useState<DeliveryJob | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [newlyLoaded, setNewlyLoaded] = useState<Set<number>>(new Set());

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const nextCount = visibleCount + PAGE_SIZE;
      const newIdxs = new Set<number>();
      for (let i = visibleCount; i < Math.min(nextCount, DELIVERY_JOBS.length); i++) {
        newIdxs.add(i);
      }
      setNewlyLoaded(newIdxs);
      setVisibleCount(nextCount);
      setIsLoading(false);
      // clear highlight after animation
      setTimeout(() => setNewlyLoaded(new Set()), 800);
    }, 1200);
  };

  const visibleJobs = DELIVERY_JOBS.slice(0, visibleCount);
  const hasMore = visibleCount < DELIVERY_JOBS.length;
  const pendingCount = Math.min(PAGE_SIZE, DELIVERY_JOBS.length - visibleCount);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004d99] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold mb-8 border border-white/10">
                <Truck className="w-4 h-4 text-sky-300" />
                <span className="text-blue-100">บริการจัดส่งทั่วประเทศไทย</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] mb-6">
                จัดส่งสินค้า
                <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent"> ทั่วไทย</span>
                <br />
                <span className="bg-gradient-to-r from-[var(--color-brand-orange)] to-amber-300 bg-clip-text text-transparent">พร้อมติดตั้ง</span>
                {" "}ถึงหน้าโรงงาน
              </h1>
              <p className="text-lg text-blue-200/80 leading-relaxed max-w-xl mx-auto mb-10">
                KMS MACHINERY มีทีมขนส่งและวิศวกรติดตั้งพร้อมให้บริการทุกจังหวัดทั่วประเทศ ปลอดภัย ตรงเวลา มั่นใจได้ทุกขั้นตอน
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
                {[
                  { val: "77",     unit: "จังหวัด",  sub: "ครอบคลุมทั่วประเทศ" },
                  { val: "1,000+", unit: "เครื่อง",  sub: "จัดส่งสำเร็จแล้ว" },
                  { val: "24 ชม.", unit: "ตอบสนอง", sub: "นัดหมายจัดส่ง" },
                ].map((s) => (
                  <div key={s.unit} className="flex flex-col">
                    <span className="text-3xl md:text-4xl font-extrabold text-white">{s.val}</span>
                    <span className="text-sky-300 font-semibold text-sm">{s.unit}</span>
                    <span className="text-blue-300/60 text-xs mt-0.5">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="bg-white py-14 lg:py-20 border-b border-slate-100">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {DELIVERY_FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group flex flex-col items-start gap-4 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[var(--color-brand-blue)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1.5">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="py-14 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-[var(--color-brand-orange)] rounded-full text-xs font-bold mb-4 border border-orange-100">
                <Truck className="w-3.5 h-3.5" />
                ภาพการจัดส่งจริง
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] mb-3">
                ส่งสินค้าถึงมือลูกค้าทุกจังหวัด
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
                คลิกที่การ์ดเพื่อดูรูปภาพทั้งหมดของแต่ละงานจัดส่ง
              </p>
              <p className="text-slate-400 text-xs mt-2">
                แสดง {Math.min(visibleCount, DELIVERY_JOBS.length)} จาก {DELIVERY_JOBS.length} งาน
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {visibleJobs.map((job, idx) => (
                <button
                  key={job.id}
                  onClick={() => setActiveJob(job)}
                  className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left cursor-zoom-in
                    ${idx === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
                    ${idx === 4 ? "sm:col-span-2 lg:col-span-2" : ""}
                    ${newlyLoaded.has(idx) ? "animate-[fadeSlideUp_0.5s_ease_forwards]" : ""}
                  `}
                  style={newlyLoaded.has(idx) ? { animationDelay: `${(idx - (visibleCount - pendingCount)) * 80}ms`, opacity: 0 } : {}}
                >
                  {/* Cover image */}
                  <div className={`relative w-full overflow-hidden bg-slate-200
                    ${idx === 0 ? "h-[280px] sm:h-[320px] lg:h-full lg:min-h-[540px]" : ""}
                    ${idx === 4 ? "h-[220px] sm:h-[260px]" : ""}
                    ${idx !== 0 && idx !== 4 ? "h-[220px]" : ""}
                  `}>
                    <Image
                      src={job.cover}
                      alt={`จัดส่งสินค้า ${job.location} — ${job.customer}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Zoom icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Location badge */}
                    <div className="absolute top-3 left-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                        <MapPin className="w-3 h-3 text-[var(--color-brand-orange)]" />
                        <span className="text-xs font-bold text-slate-800">{job.location}</span>
                      </div>
                    </div>

                    {/* Photo count badge */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 px-2.5 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                        <Images className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white">{job.images.length}</span>
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-sm leading-snug line-clamp-1">
                        {job.customer}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5 line-clamp-1">
                        {job.machine}
                      </p>
                      <p className="text-white/40 text-xs mt-1">{job.date}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Skeleton cards while loading */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mt-5">
                {Array.from({ length: Math.min(pendingCount, PAGE_SIZE) }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-slate-200 animate-pulse"
                    style={{ height: 220, animationDelay: `${i * 80}ms` }}>
                    <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200
                      bg-[length:400%_100%] animate-[shimmer_1.4s_ease-in-out_infinite]" />
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && !isLoading && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-200 hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] text-slate-600 font-bold rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  ดูเพิ่มเติม ({DELIVERY_JOBS.length - visibleCount} งาน)
                </button>
              </div>
            )}

            {/* Loading spinner below grid */}
            {isLoading && (
              <div className="flex flex-col items-center gap-3 mt-10">
                <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-[var(--color-brand-blue)] animate-spin" />
                <p className="text-slate-400 text-sm font-medium">กำลังโหลด...</p>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004080] relative overflow-hidden">
          <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="container mx-auto px-4 lg:px-8 relative text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold mb-6 border border-white/10 text-blue-100">
                <Phone className="w-3.5 h-3.5 text-sky-300" />
                พร้อมจัดส่งทันที
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                ต้องการสอบถามข้อมูล<br />
                <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">การจัดส่งสินค้า?</span>
              </h2>
              <p className="text-blue-200/80 mb-10 leading-relaxed">
                ทีมงานพร้อมให้คำปรึกษาเรื่องการจัดส่ง ค่าใช้จ่าย และระยะเวลา ติดต่อเราได้เลยทุกช่องทาง
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`tel:${COMPANY.phone}`}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)] text-white font-bold rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 active:scale-95 text-sm">
                  <Phone className="w-4 h-4" />
                  โทร {COMPANY.phone}
                </a>
                <Link href="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border border-white/20 transition-all duration-300 active:scale-95 text-sm">
                  ส่งข้อความถึงเรา
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* ── Job Lightbox ── */}
      {activeJob && (
        <JobLightbox
          job={activeJob}
          onClose={() => setActiveJob(null)}
        />
      )}
    </div>
  );
}
