import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Factory, Users, Award, Handshake, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { STATS, CORE_VALUES, WHY_CHOOSE_US, COMPANY } from "@/lib/constants";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "รู้จักกับ KMS MACHINERY ผู้เชี่ยวชาญด้านเครื่องบรรจุภัณฑ์อุตสาหกรรมครบวงจร ดำเนินกิจการด้วยความซื่อสัตย์และมุ่งมั่นส่งมอบคุณภาพ",
};

const statIconMap: Record<string, ReactNode> = {
  Award: <Award className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Factory: <Factory className="w-6 h-6" />,
  Handshake: <Handshake className="w-6 h-6" />,
};

const valueIconMap: Record<string, ReactNode> = {
  Target: <Target className="w-7 h-7 text-[var(--color-brand-blue)]" />,
  Handshake: <Handshake className="w-7 h-7 text-[var(--color-brand-blue)]" />,
  TrendingUp: <TrendingUp className="w-7 h-7 text-[var(--color-brand-blue)]" />,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-[#003366] text-white py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400 rounded-full blur-[120px]" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative text-center max-w-3xl">
            <p className="text-sm font-bold text-[var(--color-brand-orange)] tracking-wider uppercase mb-4">About {COMPANY.name}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              เกี่ยวกับ <span className="text-sky-300">{COMPANY.name}</span>
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
              {COMPANY.descriptionShort}ครบวงจร ดำเนินกิจการด้วยความซื่อสัตย์ จริงใจ 
              มุ่งมั่นส่งมอบเครื่องจักรคุณภาพสูงในราคาที่เหมาะสม
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="relative -mt-10 z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg shadow-black/5 ring-1 ring-black/5 p-6 text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-[var(--color-brand-blue)]">
                    {statIconMap[stat.iconName]}
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold text-[#003366]">{stat.value}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-sm font-bold text-[var(--color-brand-orange)] tracking-wider uppercase mb-3">Our Story</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#003366] mb-6 leading-tight">
                  ผู้เชี่ยวชาญด้านเครื่องบรรจุภัณฑ์<br />ที่คุณไว้วางใจ
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-800">{COMPANY.nameThai}</strong> ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะเป็นศูนย์กลางจัดจำหน่ายเครื่องบรรจุภัณฑ์อุตสาหกรรมที่ครบวงจรที่สุดในประเทศไทย
                  </p>
                  <p>
                    เราคัดสรรเครื่องจักรคุณภาพจากผู้ผลิตชั้นนำ ทั้งเครื่องบรรจุซอง เครื่องบรรจุผง เครื่องตัดซีล เครื่องหดฟิล์ม 
                    และอุปกรณ์บรรจุภัณฑ์ที่หลากหลาย ตอบสนองทุกความต้องการในสายการผลิต
                  </p>
                  <p>
                    ด้วยทีมวิศวกรผู้เชี่ยวชาญ เราพร้อมให้คำปรึกษา ออกแบบ และปรับแต่งเครื่องจักรให้เหมาะสมกับสินค้าของท่าน 
                    พร้อมบริการหลังการขายที่ครบครัน
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/60 to-orange-50/60 rounded-3xl rotate-2" />
                <div className="relative bg-slate-100 rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden ring-1 ring-black/5 shadow-xl">
                  <Image
                    src="/about.png"
                    alt="KMS Packing Factory"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-bold text-[var(--color-brand-orange)] tracking-wider uppercase mb-3">Our Values</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#003366]">ค่านิยมของเรา</h2>
              <p className="mt-4 text-slate-500 text-lg">หลักการที่เรายึดมั่นในการดำเนินธุรกิจ</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {CORE_VALUES.map((value, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                    {valueIconMap[value.iconName]}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-bold text-[var(--color-brand-orange)] tracking-wider uppercase mb-3">Why KMS?</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#003366]">ทำไมต้องเลือก KMS?</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {WHY_CHOOSE_US.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
