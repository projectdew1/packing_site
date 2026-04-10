import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "การจัดส่งสินค้า",
  description: "ข้อมูลการจัดส่งสินค้า การรับประกัน และบริการหลังการขายจาก KMS MACHINERY",
};

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
