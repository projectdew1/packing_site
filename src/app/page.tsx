import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าหลัก", // Will be templated to "หน้าหลัก | KMS MACHINERY"
  description: "KMS MACHINERY ศูนย์รวมเครื่องบรรจุภัณฑ์ เครื่องจักรอาหาร และอุปกรณ์อุตสาหกรรมครบวงจร บริการด้วยใจ คุณภาพมาตรฐาน",
};

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TrustedBySection from "@/components/TrustedBySection";
import RecommendedProducts from "@/components/RecommendedProducts";
import DeliverySection from "@/components/DeliverySection";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KMS MACHINERY",
    "alternateName": "บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด",
    "url": "https://kmspacking.com",
    "logo": "https://kmspacking.com/kms_logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-34-116655",
      "contactType": "customer service",
      "areaServed": "TH",
      "availableLanguage": "Thai"
    },
    "sameAs": [
      "https://www.facebook.com/kmsmachinerythailand",
      "https://line.me/ti/p/@kmsmachinery"
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <TrustedBySection />
        <RecommendedProducts />
        <DeliverySection />
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}
