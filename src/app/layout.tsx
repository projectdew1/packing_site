import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KMS MACHINERY | ศูนย์รวมเครื่องบรรจุภัณฑ์",
  description: "สินค้าได้รับมาตรฐาน บริการจริงใจ นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${kanit.className} antialiased selection:bg-blue-500 selection:text-white relative`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
