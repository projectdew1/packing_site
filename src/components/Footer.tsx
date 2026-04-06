import Link from "next/link";
import { COMPANY, FOOTER_MAIN_LINKS, FOOTER_SERVICE_LINKS } from "@/lib/constants";
import { Facebook, Youtube, MessageCircle, Phone, Mail, MapPin, ArrowRight, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* ── Main Footer Header ── */}
      <div className="border-b border-white/5 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3">
                <img
                  src="/kms_logo.png"
                  alt={COMPANY.name}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <span className="font-extrabold text-2xl text-white tracking-tight">{COMPANY.name}</span>
              </Link>
              <p className="max-w-md text-slate-500 leading-relaxed">
                {COMPANY.descriptionFull}
              </p>
            </div>
            
            {/* ── Social Icons ── */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em] w-full md:w-auto mb-2 md:mb-0">Follow Us</span>
              {[
                { icon: Facebook, href: COMPANY.facebookUrl, color: "hover:bg-blue-600 hover:text-white" },
                { icon: MessageCircle, href: COMPANY.lineUrl, color: "hover:bg-green-500 hover:text-white" },
                { icon: Youtube, href: COMPANY.youtubeUrl, color: "hover:bg-red-600 hover:text-white" },
                { icon: () => (
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                     <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 5.47 6.78V5.07a8.66 8.66 0 0 0 3.76 1.62z"/>
                   </svg>
                ), href: COMPANY.tiktokUrl, color: "hover:bg-slate-800 hover:text-white" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 text-slate-400 transition-all duration-300 ${social.color} hover:border-transparent hover:shadow-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Contact Detail */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--color-brand-blue)]" /> ติดต่อเรา
            </h4>
            <div className="space-y-4 text-sm">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-brand-blue)]/20 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="group-hover:text-white transition-colors">{COMPANY.phone} (สำนักงาน)</span>
              </a>
              {COMPANY.contacts.map((c, i) => (
                <a key={i} href={`tel:${c.mobile}`} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-brand-blue)]/20 transition-colors">
                     <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="group-hover:text-white transition-colors">{c.mobile} ({c.name})</span>
                </a>
              ))}
              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                 </div>
                 <p className="leading-relaxed">{COMPANY.address}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">แผนผังเว็บไซต์</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_MAIN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-white transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)] scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">การสนับสนุน</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_SERVICE_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-white transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-orange)] scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter or Map */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">เวลาทำการ</h4>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                     <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                     <p className="text-white font-bold text-xs uppercase tracking-wider">Email Us</p>
                     <a href={`mailto:${COMPANY.email}`} className="text-sm hover:text-white truncate block">{COMPANY.email}</a>
                  </div>
               </div>
               <div className="text-sm">
                  <p className="text-slate-500 mb-1">Open Hours:</p>
                  <p className="text-slate-300 font-medium">{COMPANY.workingHours}</p>
               </div>
            </div>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--color-brand-orange)] font-bold text-sm bg-[var(--color-brand-orange)]/10 px-4 py-2 rounded-xl border border-[var(--color-brand-orange)]/20 hover:bg-[var(--color-brand-orange)] hover:text-white transition-all duration-300"
            >
              ติดต่อพูดคุยกับเรา <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Copyright Footer ── */}
      <div className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} <span className="text-white font-bold">{COMPANY.nameThai}</span> All rights reserved.</p>
          <div className="flex items-center gap-6">
             <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
