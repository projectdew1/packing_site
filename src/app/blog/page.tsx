"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CalendarDays, Clock, ArrowRight, BookOpen, Megaphone, ChevronDown, Loader2 } from "lucide-react";
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost, API_ROUTES, IMAGE_URL } from "@/lib/constants";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<BlogCategory>("all");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchNews = async (pageNum: number, category: string, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setIsFetchingMore(true);
      } else {
        setIsLoading(true);
      }
      const res = await fetch(`${API_ROUTES.news}?pageNumber=${pageNum}&pageSize=${POSTS_PER_PAGE}&type=${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      
      const mappedPosts: BlogPost[] = (data.items || []).map((item: any) => ({
        slug: item.id,
        title: item.title,
        excerpt: item.subtitle,
        category: item.typeNews === "ข่าวสาร" ? "news" : "article",
        date: item.createDate,
        image: item.localImage ? `${IMAGE_URL}${item.localImage}` : "/product_machine_1773729790893.png",
        content: item.subtitle,
      }));

      if (isLoadMore) {
        setPosts((prev) => [...prev, ...mappedPosts]);
      } else {
        setPosts(mappedPosts);
      }
      setTotalPosts(data.totalItems || 0);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchNews(1, activeTab, false);
  }, [activeTab]);

  const handleTabChange = (tab: BlogCategory) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, activeTab, true);
  };

  const visiblePosts = posts;
  const hasMore = posts.length < totalPosts;
  const remaining = totalPosts - posts.length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004080] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[100px]" />

          <div className="container mx-auto px-4 lg:px-8 relative text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold mb-8 border border-white/10">
              <BookOpen className="w-4 h-4 text-sky-300" />
              <span className="text-blue-100">บทความ & ข่าวสาร</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] mb-6">
              ความรู้เรื่อง<span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">บรรจุภัณฑ์</span>
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-xl mx-auto">
              อัปเดตข่าวสาร บทความ เทคนิค และเทรนด์ในวงการเครื่องบรรจุภัณฑ์อุตสาหกรรม
            </p>
          </div>
        </section>

        {/* Tab Filter */}
        <section className="relative -mt-7 z-10">
          <div className="container mx-auto px-4 lg:px-8 flex justify-center">
            <div className="inline-flex bg-white rounded-2xl shadow-xl shadow-black/5 ring-1 ring-black/[0.04] p-1.5 gap-1">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleTabChange(cat.value)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === cat.value
                      ? "bg-[var(--color-brand-blue)] text-white shadow-md"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

            {/* Results count */}
            <p className="text-sm text-slate-400 font-medium mb-8 text-center">
              แสดง {visiblePosts.length} จาก {totalPosts} รายการ
            </p>

            {!isLoading && totalPosts === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">ยังไม่มีเนื้อหาในหมวดนี้</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {isLoading ? (
                    // Skeleton Cards
                    Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex flex-col h-full bg-white rounded-[1.5rem] shadow-sm ring-1 ring-black/[0.04] overflow-hidden animate-pulse">
                        <div className="aspect-[16/10] bg-slate-200 shrink-0" />
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex gap-4 mb-3">
                            <div className="h-4 bg-slate-200 rounded w-16" />
                            <div className="h-4 bg-slate-200 rounded w-16" />
                          </div>
                          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                          <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                          <div className="h-4 bg-slate-200 rounded w-5/6 mb-4" />
                          <div className="mt-auto pt-4 flex">
                            <div className="h-4 bg-slate-200 rounded w-24" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Actual Cards
                    visiblePosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full bg-white rounded-[1.5rem] shadow-sm ring-1 ring-black/[0.04] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/10] bg-slate-100 shrink-0 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                              post.category === "article"
                                ? "bg-blue-500/90 text-white"
                                : "bg-orange-500/90 text-white"
                            }`}>
                              {post.category === "article" ? (
                                <><BookOpen className="w-3 h-3" /> บทความ</>
                              ) : (
                                <><Megaphone className="w-3 h-3" /> ข่าวสาร</>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Meta */}
                          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {new Date(post.date).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                            </span>
                          </div>

                          <h2 
                            className="font-bold text-lg text-slate-800 group-hover:text-[var(--color-brand-blue)] transition-colors leading-snug mb-3 line-clamp-2"
                            title={post.title}
                          >
                            {post.title}
                          </h2>
                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>

                          <div className="mt-auto pt-4">
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] group-hover:gap-2.5 transition-all">
                              อ่านเพิ่มเติม <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                {/* Load More Button */}
                {!isLoading && hasMore && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={isFetchingMore}
                      className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-sm shadow-md ring-1 ring-black/[0.06] hover:shadow-lg transition-all active:scale-[0.97] disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {isFetchingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand-blue)]" />
                          กำลังโหลด...
                        </>
                      ) : (
                        <>
                          ดูเพิ่มเติมอีก {remaining > POSTS_PER_PAGE ? POSTS_PER_PAGE : remaining} รายการ
                          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
