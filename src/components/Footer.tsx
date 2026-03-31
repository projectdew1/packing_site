import Link from "next/link";
import { COMPANY, FOOTER_MAIN_LINKS, FOOTER_SERVICE_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img
              src="/kms_logo.png"
              alt={COMPANY.name}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <span className="font-bold text-xl text-white">{COMPANY.name}</span>
          </Link>
          <p className="max-w-sm mb-6">{COMPANY.descriptionFull}</p>
          <div className="space-y-2">
            <p>โทร. {COMPANY.phone}</p>
            {COMPANY.contacts.map((c, i) => (
              <p key={i}>มือถือ: {c.mobile} ({c.name})</p>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">เมนูหลัก</h4>
          <ul className="space-y-3">
            {FOOTER_MAIN_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">บริการลูกค้า</h4>
          <ul className="space-y-3">
            {FOOTER_SERVICE_LINKS.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
        &copy; {new Date().getFullYear()} {COMPANY.nameThai} All rights reserved.
      </div>
    </footer>
  );
}
