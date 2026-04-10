import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import { GoogleTagManager } from "@next/third-parties/google";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kmspacking.com"),
  title: {
    default: "KMS MACHINERY | ศูนย์รวมเครื่องบรรจุภัณฑ์และเครื่องจักรคุณภาพ",
    template: "%s | KMS MACHINERY",
  },
  description: "สินค้าได้รับมาตรฐาน บริการจริงใจ นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์ เครื่องจักรครบวงจร",
  keywords: ["เครื่องบรรจุภัณฑ์", "เครื่องจักรแปรรูปอาหาร", "เครื่องบรรจุซอง", "KMS Machinery", "บรรจุภัณฑ์อุตสาหกรรม"],
  openGraph: {
    title: "KMS MACHINERY | ศูนย์รวมเครื่องบรรจุภัณฑ์",
    description: "สินค้าได้รับมาตรฐาน บริการจริงใจ นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์",
    url: "/",
    siteName: "KMS MACHINERY",
    images: [
      {
        url: "/web_kms.png",
        width: 1200,
        height: 630,
        alt: "KMS MACHINERY Logo",
        type: "image/png",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KMS MACHINERY | ศูนย์รวมเครื่องบรรจุภัณฑ์",
    description: "สินค้าได้รับมาตรฐาน บริการจริงใจ นำเข้าและจัดจำหน่าย เครื่องบรรจุภัณฑ์",
    images: ["/web_kms.png"],
  },
  other: {
    "fb:app_id": "YOUR_FB_APP_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <GoogleTagManager gtmId="GTM-TM7H4FZ" />
      <body className={`${kanit.className} antialiased selection:bg-blue-500 selection:text-white relative`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
