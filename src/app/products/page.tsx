import React from "react";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGE_URL, API_ROUTES } from "@/lib/constants";
import { ApiCategory, CategoryApiResponse } from "@/models/category";

export const metadata = {
  title: "ผลิตภัณฑ์ - KMS Machinery",
  description: "หมวดหมู่ผลิตภัณฑ์เครื่องบรรจุภัณฑ์อุตสาหกรรม จาก KMS Machinery",
};

export default async function ProductsPage() {
  let categories: ApiCategory[] = [];
  try {
    const res = await fetch(API_ROUTES.categories, {
      next: { revalidate: 3600 }
    });
    const data: CategoryApiResponse = await res.json();
    if (data && data.items )  {
      categories = data.items.filter((item) => item.product > 1);
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 pb-16">
        {/* Header Section */}
      <section className="relative bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004080] text-white py-24 lg:py-32 overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 lg:px-8 relative text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold mb-8 border border-white/10">
            <Package className="w-4 h-4 text-sky-300" />
            <span className="text-blue-100">รายการผลิตภัณฑ์</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] mb-6">
            หมวดหมู่<span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">เครื่องจักร</span>
          </h1>
          <p className="text-lg text-blue-200/80 leading-relaxed max-w-xl mx-auto">
            เลือกดูเครื่องจักรที่เหมาะสมกับอุตสาหกรรมของคุณ 
            เรามีเครื่องบรรจุภัณฑ์คุณภาพสูงที่ตอบโจทย์ทุกความต้องการ
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products/${category.enID}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative aspect-square bg-slate-50 overflow-hidden p-6 flex items-center justify-center">
                <img
                  src={category.localImage ? `${IMAGE_URL}${category.localImage}` : "/product_machine_1773729790893.png"}
                  alt={category.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-grow text-center border-t border-gray-50 bg-white">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 md:group-hover:text-[var(--color-brand-blue)] transition-colors h-10 sm:h-12 flex items-center justify-center">
                  {category.name}
                </h2>
                <div className="mt-2 text-xs text-slate-500 mx-auto flex gap-4 text-center justify-center">
                   <div className="flex flex-col items-center">
                     <span className="font-bold text-slate-700">{category.items || 0}</span>
                     <span className="text-[10px] text-slate-400">ประเภท</span>
                   </div>
                   <div className="w-px h-8 bg-slate-200"></div>
                   <div className="flex flex-col items-center">
                     <span className="font-bold text-[var(--color-brand-orange)]">{category.product || 0}</span>
                     <span className="text-[10px] text-slate-400">สินค้า</span>
                   </div>
                </div>
                <div className="mt-4 text-[11px] sm:text-[12px] font-bold text-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5 group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors rounded-xl py-2 px-4 mx-auto flex items-center justify-center gap-1 w-full border border-[var(--color-brand-blue)]/10 group-hover:border-[var(--color-brand-blue)] shadow-sm">
                  ดูรายละเอียด <ChevronRight className="w-3.5 h-3.5 relative top-[0.5px]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
