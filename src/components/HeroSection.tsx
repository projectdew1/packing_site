import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, Truck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24 lg:pt-32 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-50 blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[var(--color-brand-blue)] rounded-full text-sm font-bold mb-6 border border-blue-100">
            <CheckCircle2 className="w-4 h-4" />
            <span className="tracking-wide">สินค้าได้รับมาตรฐาน บริการจริงใจ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#003366] leading-[1.15] mb-6">
            ศูนย์รวม<span className="text-[var(--color-brand-blue)]">เครื่องบรรจุภัณฑ์</span> อุตสาหกรรม
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
            นำเข้าและจัดจำหน่ายเครื่องบรรจุภัณฑ์คุณภาพสูง ตอบโจทย์ทุกสายการผลิต เพิ่มประสิทธิภาพและลดต้นทุนให้กับธุรกิจของคุณอย่างยั่งยืน
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#products" className="inline-flex justify-center items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[#003366] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">
              ดูสินค้าทั้งหมด <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#consult" className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg transition-all hover:border-slate-300 whitespace-nowrap">
              ปรึกษาผู้เชี่ยวชาญ
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Factory className="w-5 h-5 text-green-500" />
              <span>มีเครื่องพร้อมส่ง</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-500" />
              <span>จัดส่งทั่วประเทศ</span>
            </div>
          </div>
        </div>

        <div className="relative lg:h-[600px] flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-3xl transform rotate-3 scale-105" />
          <div className="relative w-full aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white">
            <Image 
              src="/hero_machine_1773729765118.png" 
              alt="Industrial Packaging Machine"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
