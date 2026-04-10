import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อสอบถามข้อมูลสินค้า ขอใบเสนอราคา หรือปรึกษาเรื่องเครื่องบรรจุภัณฑ์ เราพร้อมให้บริการด้วยทีมงานมืออาชีพ",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
