import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บทความและข่าวสาร",
  description: "ติดตามบทความเทคนิคการใช้เครื่องจักร ข่าวสารใหม่ๆ และสาระน่ารู้เกี่ยวกับวงการบรรจุภัณฑ์",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
