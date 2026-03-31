import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, ArrowLeft, BookOpen, Megaphone, Share2, ChevronRight } from "lucide-react";
import { BLOG_POSTS, COMPANY } from "@/lib/constants";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return notFound();

  // Get related posts (same category, exclude current)
  const relatedPosts = BLOG_POSTS
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // All images for this post (main image + extras)
  const allImages = post.images && post.images.length > 0
    ? [post.image, ...post.images]
    : [post.image];

  // Simple markdown-like rendering: **bold** and line breaks
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, idx) => {
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return <h3 key={idx} className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight">{paragraph.replace(/\*\*/g, "")}</h3>;
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n").filter(Boolean);
        return (
          <ul key={idx} className="space-y-2.5 my-6 ml-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed text-lg">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)] shrink-0" />
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }
      // Handle inline bold
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-lg text-slate-600 leading-[1.9] mb-6">
          {parts.map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i} className="text-slate-800 font-bold">{part.replace(/\*\*/g, "")}</strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1">

        {/* ══════════════════════════════════════════
            HERO  –  Full-width with featured image
        ══════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-[#001229] via-[#002952] to-[#004080] text-white overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-[-20%] right-[5%] w-[500px] h-[500px] bg-sky-400/[0.07] rounded-full blur-[120px]" />
          <div className="absolute bottom-[-25%] left-[-5%] w-[400px] h-[400px] bg-blue-400/[0.05] rounded-full blur-[100px]" />
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <div className="container mx-auto px-4 lg:px-8 relative max-w-5xl py-16 lg:py-24">
            {/* Breadcrumb */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-300/70 hover:text-white text-sm font-medium mb-10 transition-colors duration-300 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              กลับไปหน้าบทความ
            </Link>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${
                post.category === "article"
                  ? "bg-blue-500/20 text-blue-200 ring-1 ring-blue-400/20"
                  : "bg-orange-500/20 text-orange-200 ring-1 ring-orange-400/20"
              }`}>
                {post.category === "article" ? (
                  <><BookOpen className="w-3 h-3" /> บทความ</>
                ) : (
                  <><Megaphone className="w-3 h-3" /> ข่าวสาร</>
                )}
              </span>
              <span className="inline-flex items-center gap-1.5 text-blue-200/60 text-sm">
                <CalendarDays className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-blue-200/60 text-sm">
                <Clock className="w-3.5 h-3.5" />
                อ่าน {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight max-w-4xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-blue-200/50 mt-6 max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURED IMAGE  –  Large hero image
        ══════════════════════════════════════════ */}
        <section className="relative -mt-4 z-10 mb-8 lg:mb-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="relative aspect-[16/8] md:aspect-[16/7] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 ring-1 ring-black/[0.05]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain p-8 md:p-12"
                priority
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ARTICLE CONTENT
        ══════════════════════════════════════════ */}
        <section className="py-8 lg:py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

              {/* ── Main Content ── */}
              <article className="lg:col-span-8">
                <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 p-8 md:p-12 lg:p-14">
                  {/* Content */}
                  <div className="max-w-none">
                    {renderContent(post.content)}
                  </div>

                  {/* ── Image Gallery ── */}
                  {allImages.length > 1 && (
                    <ImageGallery images={allImages} title={post.title} />
                  )}

                  {/* Divider if no gallery */}
                  {allImages.length === 1 && (
                    <div className="mt-10 pt-8 border-t border-slate-100" />
                  )}
                </div>

                {/* ── CTA Card ── */}
                <div className="mt-8 relative bg-gradient-to-br from-[#003366] to-blue-600 rounded-3xl p-8 md:p-10 text-white overflow-hidden">
                  <div className="absolute top-[-30px] right-[-30px] w-40 h-40 bg-white/[0.06] rounded-full" />
                  <div className="absolute bottom-[-20px] left-[-20px] w-28 h-28 bg-white/[0.04] rounded-full" />
                  <div className="relative">
                    <h3 className="font-extrabold text-xl md:text-2xl mb-3 tracking-tight">สนใจเครื่องจักรบรรจุภัณฑ์?</h3>
                    <p className="text-blue-200/70 text-sm md:text-base mb-7 max-w-md leading-relaxed">
                      ปรึกษาผู้เชี่ยวชาญของเราได้ฟรี ไม่มีค่าใช้จ่าย พร้อมรับใบเสนอราคาภายใน 24 ชม.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#003366] px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        ติดต่อเรา <ChevronRight className="w-4 h-4" />
                      </Link>
                      <a
                        href={COMPANY.lineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-2xl font-bold text-sm ring-1 ring-white/10 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 5.64 2 10.14c0 3.07 2.46 5.74 6.13 7.07-.24.84-.88 3.12-.92 3.33 0 0-.02.13.05.18.08.05.17.02.17.02.22-.03 2.6-1.72 3.68-2.5.93.14 1.87.21 2.89.21 5.52 0 10-3.64 10-8.14S17.52 2 12 2z"/>
                        </svg>
                        แอดไลน์
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              {/* ── Sidebar ── */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">

                  {/* Share / Info Card */}
                  <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 p-6">
                    <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                      <Share2 className="w-4 h-4" />
                      <span className="font-semibold">แชร์บทความนี้</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 bg-[#1877F2] hover:bg-[#1565C0] text-white text-xs font-bold rounded-xl transition-colors">
                        Facebook
                      </button>
                      <button className="flex-1 py-2.5 bg-[#06C755] hover:bg-[#05a648] text-white text-xs font-bold rounded-xl transition-colors">
                        LINE
                      </button>
                      <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors">
                        คัดลอก
                      </button>
                    </div>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/40 ring-1 ring-slate-100 p-6">
                      <h3 className="font-extrabold text-base text-slate-800 mb-5 tracking-tight flex items-center gap-2">
                        <span className="w-1 h-5 bg-gradient-to-b from-[var(--color-brand-blue)] to-sky-400 rounded-full" />
                        บทความที่เกี่ยวข้อง
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map((rp) => (
                          <Link
                            key={rp.slug}
                            href={`/blog/${rp.slug}`}
                            className="group flex gap-4 items-start"
                          >
                            <div className="relative w-20 h-20 bg-slate-50 rounded-xl overflow-hidden ring-1 ring-slate-100 shrink-0">
                              <Image
                                src={rp.image}
                                alt={rp.title}
                                fill
                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-slate-400 mb-1 font-medium">
                                {new Date(rp.date).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                              </p>
                              <h4 className="font-bold text-sm text-slate-700 group-hover:text-[var(--color-brand-blue)] transition-colors line-clamp-2 leading-snug">
                                {rp.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link href="/blog" className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-[var(--color-brand-blue)] transition-colors">
                        ดูบทความทั้งหมด <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}

                </div>
              </aside>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
