"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ArrowRight, Headphones, ExternalLink, ChevronRight } from "lucide-react";
import { useState } from "react";
import { COMPANY, CONTACT_INFO, CONTACT_SUBJECTS, API_ROUTES } from "@/lib/constants";
import type { ReactNode } from "react";

/* ── Icon map for dynamic rendering ── */
const contactIconMap: Record<string, ReactNode> = {
  Phone: <Phone className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
};



export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject) {
      alert("กรุณาเลือกหัวข้อการติดต่อ");
      return;
    }
    
    setIsSending(true);
    try {
      // Find the label for the selected subject
      const subjectLabel = CONTACT_SUBJECTS.find(s => s.value === formData.subject)?.label || formData.subject;

      const url = new URL(API_ROUTES.addContact);
      url.searchParams.set("name", formData.name);
      url.searchParams.set("mail", formData.email);
      url.searchParams.set("tel", formData.phone);
      url.searchParams.set("title", subjectLabel);
      url.searchParams.set("detail", formData.message);

      const res = await fetch(url.toString(), {
        method: "POST"
      });
      
      const data = await res.json();
      if (data.status === 200) {
        setIsSent(true);
      } else {
        alert("ขออภัย เกิดข้อผิดพลาดในการส่งข้อมูล: " + (data.message || "โปรดลองอีกครั้ง"));
      }
    } catch (error) {
      console.error("Error sending contact:", error);
      alert("ขออภัย ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ในขณะนี้");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004080] text-white py-24 lg:py-32 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[100px]" />
          {/* Grid dots pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold mb-8 border border-white/10">
                <Headphones className="w-4 h-4 text-sky-300" />
                <span className="text-blue-100">พร้อมให้บริการทุกวัน</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] mb-6">
                เราพร้อม<span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">รับฟัง</span>
                <br />และ<span className="bg-gradient-to-r from-[var(--color-brand-orange)] to-amber-300 bg-clip-text text-transparent">ช่วยเหลือ</span>คุณ
              </h1>
              <p className="text-lg text-blue-200/80 leading-relaxed max-w-xl mx-auto">
                ไม่ว่าจะสอบถามสินค้า ขอใบเสนอราคา หรือปรึกษาปัญหาเครื่องจักร ทีมผู้เชี่ยวชาญพร้อมรับใช้คุณ
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            QUICK CONTACT CARDS  –  Floating cards
        ══════════════════════════════════════════ */}
        <section className="relative -mt-16 z-10 mb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {CONTACT_INFO.map((info, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-6 md:p-7 shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center mb-5 text-[var(--color-brand-blue)] group-hover:scale-105 transition-transform duration-400">
                    {contactIconMap[info.iconName]}
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm mb-2.5">{info.title}</h3>
                  <div className="space-y-1.5">
                    {info.items.map((item, i) => (
                      <p key={i} className="text-[13px] text-slate-500 leading-relaxed">{item}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MAIN CONTENT  –  Form + Sidebar
        ══════════════════════════════════════════ */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">

              {/* ── Contact Form ── */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 ring-1 ring-black/[0.04] p-7 md:p-10">

                  {isSent ? (
                    /* ── Success State ── */
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-7 ring-8 ring-green-50/50">
                        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] mb-4">ส่งข้อความสำเร็จ!</h2>
                      <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับภายใน 24 ชั่วโมง</p>
                      <button
                        onClick={() => { setIsSent(false); setFormData({ name: "", phone: "", email: "", subject: "", message: "" }); }}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-sm text-slate-700 transition-all duration-300 hover:shadow-md"
                      >
                        ส่งข้อความอีกครั้ง <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* ── Form State ── */
                    <>
                      <div className="flex items-center gap-4 mb-9">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#003366] to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/25 shrink-0">
                          <MessageCircle className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-extrabold text-[#003366] tracking-tight">ส่งข้อความถึงเรา</h2>
                          <p className="text-sm text-slate-400 font-medium mt-0.5">กรอกข้อมูลด้านล่าง เราจะตอบกลับภายใน 24 ชม.</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name + Phone row */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อ - นามสกุล <span className="text-red-400">*</span></label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="กรอกชื่อของท่าน"
                              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:border-slate-300 transition-all duration-300 placeholder:text-slate-300" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">เบอร์โทรศัพท์ <span className="text-red-400">*</span></label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="0XX-XXX-XXXX"
                              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:border-slate-300 transition-all duration-300 placeholder:text-slate-300" />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">อีเมล <span className="text-red-400">*</span></label>
                          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="email@example.com"
                            className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:border-slate-300 transition-all duration-300 placeholder:text-slate-300" />
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">หัวข้อ <span className="text-red-400">*</span></label>
                          <select name="subject" required value={formData.subject} onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:border-slate-300 transition-all duration-300 text-slate-700 appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: "right 0.75rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.25em 1.25em" }}>
                            {CONTACT_SUBJECTS.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">ข้อความ <span className="text-red-400">*</span></label>
                          <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="รายละเอียดที่ต้องการสอบถาม..."
                            className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:border-slate-300 transition-all duration-300 resize-none placeholder:text-slate-300" />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#003366] to-blue-600 hover:from-[#002244] hover:to-blue-700 text-white px-9 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/25 transition-all duration-300 active:scale-[0.97] disabled:opacity-60 disabled:cursor-wait"
                        >
                          {isSending ? (
                            <>
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              กำลังส่ง...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              ส่งข้อความ
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* ── Sidebar ── */}
              <div className="lg:col-span-5 space-y-6">

                {/* ── Map Card ── */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 ring-1 ring-black/[0.04] overflow-hidden">
                  <div className="h-[220px] md:h-[260px] bg-slate-100 relative">
                    <iframe
                      src={COMPANY.googleMapsEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${COMPANY.name} Location`}
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4.5 h-4.5 text-[var(--color-brand-orange)]" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm mb-1">{COMPANY.nameThai}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{COMPANY.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── LINE Card ── */}
                <div className="relative bg-gradient-to-br from-[#06C755] to-[#04a648] rounded-3xl p-7 text-white overflow-hidden">
                  {/* Decorative */}
                  <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-white/[0.08] rounded-full" />
                  <div className="absolute bottom-[-30px] left-[-30px] w-28 h-28 bg-white/[0.08] rounded-full" />
                  <div className="absolute top-[50%] right-[20%] w-20 h-20 bg-white/[0.05] rounded-full" />

                  <div className="relative">
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-13 h-13 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center" style={{ width: 52, height: 52 }}>
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 5.64 2 10.14c0 3.07 2.46 5.74 6.13 7.07-.24.84-.88 3.12-.92 3.33 0 0-.02.13.05.18.08.05.17.02.17.02.22-.03 2.6-1.72 3.68-2.5.93.14 1.87.21 2.89.21 5.52 0 10-3.64 10-8.14S17.52 2 12 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg tracking-tight">LINE Official</h3>
                        <p className="text-green-100/80 text-sm">ตอบไวในเวลาทำการ</p>
                      </div>
                    </div>
                    <p className="text-green-50/70 text-sm mb-6 leading-relaxed">
                      แอดไลน์สอบถามสินค้า ขอใบเสนอราคา หรือนัดดูเครื่องจักรได้เลย
                    </p>
                    <a
                      href={COMPANY.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-4 bg-white hover:bg-green-50 text-[#06C755] text-center font-bold text-sm rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      เพิ่มเพื่อน {COMPANY.lineId}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* ── Quick Call Card ── */}
                <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-7 text-white overflow-hidden">
                  {/* Dot pattern */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                  {/* Glow */}
                  <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-sky-500/10 rounded-full blur-[60px]" />

                  <div className="relative">
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-[52px] h-[52px] bg-gradient-to-br from-sky-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-1 ring-white/10">
                        <Headphones className="w-6 h-6 text-sky-300" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg tracking-tight">โทรด่วน</h3>
                        <p className="text-slate-400 text-sm">รับสายจันทร์ – เสาร์ 08:30 – 17:30</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-2">
                      <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3.5 px-4 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] rounded-xl transition-all duration-300 group ring-1 ring-white/[0.06]">
                        <div className="w-9 h-9 bg-sky-500/10 rounded-lg flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                          <Phone className="w-4 h-4 text-sky-400" />
                        </div>
                        <div>
                          <span className="font-bold text-base text-white">{COMPANY.phone}</span>
                          <span className="text-sm text-slate-500 ml-2">(สำนักงาน)</span>
                        </div>
                      </a>
                      {COMPANY.contacts.map((c, i) => (
                        <a key={i} href={`tel:${c.mobile}`} className="flex items-center gap-3.5 px-4 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] rounded-xl transition-all duration-300 group ring-1 ring-white/[0.06]">
                          <div className="w-9 h-9 bg-sky-500/10 rounded-lg flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                            <Phone className="w-4 h-4 text-sky-400" />
                          </div>
                          <div>
                            <span className="font-bold text-base text-white">{c.mobile}</span>
                            <span className="text-sm text-slate-500 ml-2">({c.name})</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
