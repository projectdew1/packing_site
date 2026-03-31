import { Package, Truck, PenTool } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  Package: <Package className="w-8 h-8 text-[var(--color-brand-blue)]" />,
  Truck: <Truck className="w-8 h-8 text-[var(--color-brand-blue)]" />,
  PenTool: <PenTool className="w-8 h-8 text-[var(--color-brand-blue)]" />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[var(--color-brand-orange)] tracking-wider uppercase mb-3"> Services we offer </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#003366]">บริการครบวงจรจาก KMS</h3>
          <p className="mt-4 text-slate-500 text-lg">เราดูแลตั้งแต่ต้นจนจบ เพื่อให้คุณได้เครื่องจักรที่ตรงกับความต้องการและใช้งานได้อย่างเต็มประสิทธิภาพ</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-6">
                {iconMap[service.iconName]}
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
