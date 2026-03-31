"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // Delay showing for a smoother page load experience
      const timer = setTimeout(() => {
        setShowConsent(true);
        requestAnimationFrame(() => setIsAnimating(true));
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setShowConsent(false), 400);
  };

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    handleClose();
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    handleClose();
  };

  if (!showConsent) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[100] sm:max-w-[420px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isAnimating
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5 overflow-hidden">
        {/* Top accent gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-brand-blue)] via-sky-400 to-[var(--color-brand-orange)]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
          aria-label="ปิด"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl flex items-center justify-center shadow-inner">
              <Cookie className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">
                เว็บไซต์นี้ใช้คุกกี้
              </h3>
              <p className="text-xs text-slate-400 font-medium">Cookie Consent</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed mb-5">
            เราใช้คุกกี้เพื่อวิเคราะห์การเข้าชมและปรับปรุงประสบการณ์การใช้งานเว็บไซต์ของท่าน
            อ่านเพิ่มเติมที่{" "}
            <Link
              href="/privacy-policy"
              className="text-[var(--color-brand-blue)] font-semibold hover:underline underline-offset-2"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </p>

          {/* Cookie types indicator */}
          <div className="flex items-center gap-4 mb-5 p-3 bg-slate-50 rounded-xl text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>คุกกี้ที่จำเป็น</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
              <span>คุกกี้วิเคราะห์</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2.5">
            <button
              onClick={declineCookies}
              className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-xl transition-colors"
            >
              ปฏิเสธ
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[var(--color-brand-blue)] to-blue-600 hover:from-[#003366] hover:to-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.97]"
            >
              ยอมรับทั้งหมด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
