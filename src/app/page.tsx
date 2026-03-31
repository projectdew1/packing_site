import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TrustedBySection from "@/components/TrustedBySection";
import RecommendedProducts from "@/components/RecommendedProducts";
import DeliverySection from "@/components/DeliverySection";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
