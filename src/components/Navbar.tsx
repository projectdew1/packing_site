"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PhoneCall, Menu, X, Package, Truck, PenTool, Newspaper, BookOpen, ChevronDown } from "lucide-react";
import { NAV_LINKS, COMPANY, API_URL, API_ROUTES } from "@/lib/constants";
import { ApiCategory, CategoryApiResponse } from "@/models/category";

const iconMap = {
  Package: <Package className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  PenTool: <PenTool className="w-5 h-5" />,
  Newspaper: <Newspaper className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
};



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    fetch(API_ROUTES.categories)
      .then(res => res.json())
      .then(data => {
        if (data?.items) {
          setCategories(data.items.filter((item: ApiCategory) => item.items > 1));
        }
      })
      .catch((err) => console.log("Failed to load header categories:", err));
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass shadow-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/kms_logo.png"
              alt={COMPANY.name}
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-[#003366] tracking-tight">{COMPANY.name}</span>
              <span className="text-xs text-slate-500 font-medium tracking-widest hidden sm:block">{COMPANY.tagline}</span>
            </div>
          </Link>
          
          {/* Desktop Nav — show only on lg (1024px+) */}
          <nav className="hidden lg:flex gap-6 xl:gap-8 items-center text-sm font-semibold text-slate-600 h-full">
            {NAV_LINKS.map((link) => {
              if (link.href === "/products") {
                return (
                  <div key={link.href} className="relative group h-full flex items-center">
                    <Link href="/products" className="hover:text-[var(--color-brand-blue)] transition-colors whitespace-nowrap cursor-pointer flex items-center">
                      {link.label}
                      <ChevronDown className="w-4 h-4 ml-1 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                    </Link>
                    <div className="absolute top-full -left-20 w-[600px] xl:w-[850px] bg-white shadow-2xl rounded-2xl border border-gray-100 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 -translate-y-2 group-hover:translate-y-0">
                       <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-50">
                         <h3 className="text-[13px] font-bold text-slate-800">หมวดหมู่ผลิตภัณฑ์ ({categories.length})</h3>
                         <Link href="/products" className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                           ดูทั้งหมด <ChevronDown className="w-3 h-3 -rotate-90" />
                         </Link>
                       </div>
                       <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-0.5 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
                         {categories.map((c) => (
                           <Link key={c.id} href={`/products/${c.enID}`} className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded-lg transition-colors group/item shrink-0">
                             <div className="w-7 h-7 rounded bg-slate-50 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-50/50">
                               <img src={c.localImage ? `${API_URL}${c.localImage}` : "/product_machine_1773729790893.png"} alt={c.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover/item:scale-110 transition-transform" />
                             </div>
                             <span className="text-[10.5px] text-slate-600 font-medium line-clamp-1 leading-tight group-hover/item:text-[var(--color-brand-blue)] transition-colors">{c.name}</span>
                           </Link>
                         ))}
                       </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={link.href} href={link.href} className="hover:text-[var(--color-brand-blue)] transition-colors whitespace-nowrap h-full flex items-center">
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <a href={`tel:${COMPANY.phone}`} className="hidden xl:flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[var(--color-brand-blue)]">
              <PhoneCall className="w-4 h-4" />
              {COMPANY.phone}
            </a>
            <Link 
              href="/contact" 
              className="hidden lg:inline-flex bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-orange-500/20 transition-all active:scale-95"
            >
              ติดต่อเรา
            </Link>

            {/* Hamburger Button — show below lg */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`absolute transition-all duration-300 ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}>
                <Menu className="w-5 h-5" />
              </span>
              <span className={`absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}>
                <X className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay — show below lg */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer — show below lg */}
      <div
        className={`fixed top-0 right-0 z-[60] h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
          <span className="font-bold text-lg text-[#003366]">เมนู</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="px-4 py-6 space-y-1">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-[var(--color-brand-blue)] transition-colors font-semibold"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="text-slate-400">{iconMap[link.iconName]}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-100 space-y-4 bg-slate-50/80">
          <a
            href={`tel:${COMPANY.phone}`}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            {COMPANY.phone}
          </a>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)] text-white rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all active:scale-[0.97]"
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </>
  );
}
