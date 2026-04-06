"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Truck, Images, ArrowRight } from "lucide-react";
import { API_ROUTES, IMAGE_URL } from "@/lib/constants";

if (typeof window === "undefined") {
  if (process.env.NODE_ENV !== "production") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
}

const PREVIEW_COUNT = 3;

export default function DeliverySection() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const res = await fetch(`${API_ROUTES.portfolio}?pageNumber=1&pageSize=${PREVIEW_COUNT}`, {
          method: "GET"
        });
        const data = await res.json();
        if (data.items) {
          setJobs(data.items);
        }
      } catch (e) {
        console.error("Failed to fetch delivery previews:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreviews();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[var(--color-brand-blue)] rounded-full text-xs font-bold mb-4 border border-blue-100">
              <Truck className="w-3.5 h-3.5" />
              จัดส่งสินค้า
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] leading-tight">
              ส่งสินค้าถึงมือลูกค้า<br className="sm:hidden" />
              <span className="text-[var(--color-brand-orange)]"> ทั่วประเทศ</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-md">
              ทีมขนส่งและติดตั้งพร้อมให้บริการทุกจังหวัด ปลอดภัย ตรงเวลา
            </p>
          </div>
          <Link
            href="/delivery"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-dark)] transition-colors group"
          >
            ดูทั้งหมด
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {isLoading ? (
            Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-slate-100 animate-pulse" />
            ))
          ) : jobs.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-400">
              ไม่มีข้อมูลการจัดส่งในขณะนี้
            </div>
          ) : (
            jobs.map((job: any) => (
              <Link
                key={job.id}
                href="/delivery"
                className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <Image
                    src={job.localImage ? `${IMAGE_URL}${job.localImage}` : "/product_machine_1773729790893.png"}
                    alt={`จัดส่งสินค้า ${job.privinceTh}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* Location badge */}
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                      <MapPin className="w-3 h-3 text-[var(--color-brand-orange)]" />
                      <span className="text-xs font-bold text-slate-800">{job.privinceTh}</span>
                    </div>
                  </div>

                  {/* Photo count */}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2.5 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                      <Images className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold text-white">{job.imageList?.length || 0}</span>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-sm leading-snug line-clamp-1">{job.title}</p>
                    <p className="text-white/60 text-xs mt-0.5 line-clamp-1">{job.machineName}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/delivery"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#003366] to-blue-600 hover:from-[#002244] hover:to-blue-700 text-white font-bold rounded-full shadow-lg shadow-blue-600/20 transition-all duration-300 active:scale-[0.97] text-sm"
          >
            <Truck className="w-4 h-4" />
            ดูภาพการจัดส่งทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
