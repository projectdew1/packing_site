"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ArrowRight, BookOpen, Megaphone, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { API_ROUTES, IMAGE_URL, type BlogPost } from "@/lib/constants";

export default function LatestNews() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_ROUTES.news}?pageNumber=1&pageSize=3&type=all`, {
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
          readTime: "อ่านต่อ", // API doesn't provide readTime
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const featuredPost = posts[0];
  const sidePosts = posts.slice(1);

  if (isLoading) {
    return (
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 text-center animate-pulse">
           <div className="h-4 bg-slate-100 rounded w-24 mx-auto mb-4" />
           <div className="h-10 bg-slate-100 rounded w-64 mx-auto mb-14" />
           <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-[16/10] bg-slate-50 rounded-3xl" />
              <div className="flex flex-col gap-6">
                 <div className="aspect-[21/9] bg-slate-50 rounded-2xl" />
                 <div className="aspect-[21/9] bg-slate-50 rounded-2xl" />
              </div>
           </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-brand-orange)] tracking-wider uppercase mb-3">
              News & Articles
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              ข่าวสาร & บทความล่าสุด
            </h3>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--color-brand-blue)] hover:text-[#003366] font-bold text-sm transition-colors group"
          >
            ดูบทความทั้งหมด
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured + Side layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Featured (large) Card */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group flex flex-col bg-white rounded-3xl shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-slate-50 shrink-0 overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category Badge */}
                <div className="absolute top-5 left-5">
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-sm ${
                    featuredPost.category === "article"
                      ? "bg-blue-500/90 text-white"
                      : "bg-orange-500/90 text-white"
                  }`}>
                    {featuredPost.category === "article" ? (
                      <><BookOpen className="w-3 h-3" /> บทความ</>
                    ) : (
                      <><Megaphone className="w-3 h-3" /> ข่าวสาร</>
                    )}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(featuredPost.date).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>

                <h4 className="font-extrabold text-xl md:text-2xl text-slate-800 group-hover:text-[var(--color-brand-blue)] transition-colors leading-snug mb-3 line-clamp-2 tracking-tight">
                  {featuredPost.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-5">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] group-hover:gap-2.5 transition-all">
                    อ่านเพิ่มเติม <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Side Cards (stacked) */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500 flex-1"
              >
                {/* Image */}
                <div className="relative sm:w-48 md:w-56 aspect-[16/10] sm:aspect-auto bg-slate-50 shrink-0 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm ${
                      post.category === "article"
                        ? "bg-blue-500/90 text-white"
                        : "bg-orange-500/90 text-white"
                    }`}>
                      {post.category === "article" ? (
                        <><BookOpen className="w-2.5 h-2.5" /> บทความ</>
                      ) : (
                        <><Megaphone className="w-2.5 h-2.5" /> ข่าวสาร</>
                      )}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow justify-center">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-2">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-800 group-hover:text-[var(--color-brand-blue)] transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-3">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] group-hover:gap-2.5 transition-all">
                      อ่านเพิ่มเติม <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
