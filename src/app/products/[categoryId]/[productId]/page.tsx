import { notFound } from "next/navigation";
import Link from "next/link";

if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
import {
  ChevronRight,
  Phone,
  Cpu,
  CheckCircle2,
  Package,
  PlayCircle,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGE_URL, API_ROUTES, API_PARAMS, COMPANY } from "@/lib/constants";
import { ProductDetailAPIResponse, ProductDetail } from "@/models/productDetail";
import { CategoryApiResponse } from "@/models/category";
import { CategoryProductAPIResponse } from "@/models/categoryProduct";
import { ProductHeroImage, ProductImageGrid } from "@/components/ProductImageLightbox";

/* ── Static Params for export mode ── */
export async function generateStaticParams() {
  try {
    const res = await fetch(API_ROUTES.allMachineParams);
    const data = await res.json();
    
    if (data?.items) {
      return data.items.map((item: { param: string }) => {
        const [categoryId, productId] = item.param.split("/");
        return { categoryId, productId };
      });
    }
    return [];
  } catch (err) {
    console.error("Error generating static params for products:", err);
    return [];
  }
}

/* ── Data Fetching ── */
async function getProductDetail(id: string): Promise<ProductDetailAPIResponse | undefined> {
  try {
    const url = new URL(API_ROUTES.productsId);
    url.searchParams.set(API_PARAMS.id, decodeURIComponent(id));
    const res = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });
    const data: ProductDetailAPIResponse = await res.json();
    if (data.status !== 200) return undefined;
    return data;
  } catch (err) {
    return undefined;
  }
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string; productId: string }>;
}) {
  const p = await params;
  const product = await getProductDetail(p.productId);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.items.machineName} - KMS Machinery`,
    description: product.seo || `รายละเอียดสินค้า ${product.items.machineName}`,
  };
}

/* ── Helpers ── */
function formatPrice(price: number): string {
  return price.toLocaleString("th-TH");
}

function discountPercent(price: number, discount: number): number {
  if (!price || !discount || discount >= price) return 0;
  return Math.round(((price - discount) / price) * 100);
}

function getYouTubeEmbedUrl(link: string): string {
  // handle youtu.be/xxx and youtube.com/watch?v=xxx
  const match = link.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return link;
}

/* ── Page ── */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ categoryId: string; productId: string }>;
}) {
  const p = await params;
  const data = await getProductDetail(p.productId);


  if (!data) {
    notFound();
  }

  const product = data.items;
  const hasPrice = product.price > 0;
  const hasDiscount = product.discount > 0 && product.discount < product.price;
  const isSoldout = product.soldout === 1;
  const pct = hasDiscount ? discountPercent(product.price, product.discount) : 0;

  // Build gallery: main image + additional images
  const allImages = [
    { src: `${IMAGE_URL}${product.localImage}`, alt: product.machineName },
    ...product.image.map((img) => ({
      src: `${IMAGE_URL}${img.local}`,
      alt: `${product.machineName} - ${img.imageMachineId}`,
    })),
  ];

  const decryptedCategoryId = decodeURIComponent(p.categoryId);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-slate-50 pb-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
              <Link href="/products" className="hover:text-[var(--color-brand-blue)] transition-colors">
                หมวดหมู่ทั้งหมด
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href={`/products/${decryptedCategoryId}`}
                className="hover:text-[var(--color-brand-blue)] transition-colors"
              >
                {product.type.categoryName}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-none">
                {product.machineName}
              </span>
            </div>
          </div>
        </div>

        {/* ───── Hero Section ───── */}
        <section className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left: Image Gallery — Interactive with Lightbox */}
              <ProductHeroImage
                allImages={allImages}
                mainImageSrc={`${IMAGE_URL}${product.localImage}`}
                mainImageAlt={product.machineName}
                isSoldout={isSoldout}
                hasDiscount={hasDiscount}
                pct={pct}
              />

              {/* Right: Product Info */}
              <div className="flex flex-col">
                {/* Type Badge */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <Link
                    href={`/products/${decryptedCategoryId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5 hover:bg-[var(--color-brand-blue)]/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Package className="w-3 h-3" />
                    {product.type.typeName}
                  </Link>
                
                </div>

                {/* Name */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                  {product.machineName}
                </h1>

                {/* Items Code */}
                {product.itemsCode && (
                  <p className="text-base text-slate-500 mb-6">
                    รุ่น: <span className="font-semibold text-slate-700">{product.itemsCode}</span>
                  </p>
                )}

                {/* Pricing */}
                <div className="bg-gradient-to-r from-slate-50 to-white border border-gray-100 rounded-2xl p-6 mb-6">
                  {hasPrice ? (
                    <div>
                      {hasDiscount ? (
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="text-3xl md:text-4xl font-extrabold text-[var(--color-brand-orange)]">
                              ฿{formatPrice(product.discount)}
                            </span>
                            <span className="text-lg text-gray-400 line-through">
                              ฿{formatPrice(product.price)}
                            </span>
                          </div>
                          <p className="text-sm text-green-600 font-semibold">
                            ประหยัด ฿{formatPrice(product.price - product.discount)}
                          </p>
                        </div>
                      ) : (
                        <span className="text-3xl md:text-4xl font-extrabold text-slate-800">
                          ฿{formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-blue)]/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[var(--color-brand-blue)]" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-800">สอบถามราคาพิเศษ</p>
                        <p className="text-sm text-slate-500">ติดต่อทีมขายเพื่อรับใบเสนอราคา</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Explain (Brief Intro) */}
                {product.explain?.name && (
                  <div className="mb-6">
                    <p className="text-[14.5px] text-slate-600 leading-relaxed whitespace-pre-line border-l-4 border-[var(--color-brand-blue)]/20 pl-4 py-1 italic bg-slate-50/50 rounded-r-xl">
                      {product.explain.name}
                    </p>
                  </div>
                )}

                {/* Features / Detail list */}
                {product.detail.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-orange)]" />
                       คุณสมบัติเด่น
                    </h3>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {product.detail.map((d, idx) => (
                        <li key={d.id || d.detailMachineId || idx} className="flex items-start gap-3 bg-slate-50/30 p-2.5 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-300">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-[14px] font-medium leading-relaxed">{d.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-auto space-y-3 pt-4">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)] text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
                  >
                    <Phone className="w-5 h-5" />
                    สอบถาม / สั่งซื้อ
                  </Link>
                  <a
                    href={`https://line.me/ti/p/${COMPANY.lineId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-[#06C755] hover:bg-[#05b04d] text-white font-bold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    สอบถามทาง Line {COMPANY.lineId}
                  </a>
                  <div className="text-center pt-2">
                    <p className="text-sm text-slate-400">
                      โทร:{" "}
                      {COMPANY.contacts.map((c, i) => (
                        <span key={i}>
                          <a
                            href={`tel:${c.mobile}`}
                            className="text-[var(--color-brand-blue)] hover:underline font-medium"
                          >
                            {c.mobile}
                          </a>
                          {i < COMPANY.contacts.length - 1 && " · "}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Technical Specifications ───── */}
        {product.detailTech.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-blue-dark)] flex items-center justify-center shadow-md shadow-[var(--color-brand-blue)]/20">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">สเปคเครื่อง</h2>
                  <p className="text-xs text-slate-400">Technical Specifications</p>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {product.detailTech.map((spec, idx) => (
                  <div
                    key={spec.detailTechMachineId || idx}
                    className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-6 py-4 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    } hover:bg-blue-50/30 transition-colors`}
                  >
                    <span className="text-sm font-semibold text-slate-500 sm:w-1/3 sm:flex-shrink-0">
                      {spec.technicallyName}
                    </span>
                    <span className="text-[15px] font-medium text-slate-800">{spec.detailTech}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ───── Video Section ───── */}
        {product.video.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md shadow-red-500/20">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">วิดีโอสาธิตการทำงาน</h2>
                  <p className="text-xs text-slate-400">Product Demo Videos</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.video.map((vid, idx) => (
                    <div
                      key={idx}
                      className="aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                      <iframe
                        src={getYouTubeEmbedUrl(vid.link)}
                        title={`${product.machineName} - วิดีโอ ${idx + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ───── Additional Images Gallery — Clickable with Lightbox ───── */}
        {product.image.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">รูปภาพเพิ่มเติม</h2>
                  <p className="text-xs text-slate-400">คลิกที่รูปเพื่อขยาย · {product.image.length} รูป</p>
                </div>
              </div>
              <div className="p-6">
                <ProductImageGrid
                  images={product.image.map((img) => ({
                    src: `${IMAGE_URL}${img.local}`,
                    alt: `${product.machineName}`,
                  }))}
                  productName={product.machineName}
                />
              </div>
            </div>
          </section>
        )}

        {/* ───── Bottom CTA ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-dark)] p-8 md:p-12 text-white shadow-xl shadow-[var(--color-brand-blue)]/20">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                  สนใจ {product.machineName}?
                </h3>
                <p className="text-white/70 text-base max-w-xl">
                  ทีมงาน KMS พร้อมให้คำปรึกษาและเสนอราคาพิเศษสำหรับคุณ
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/30 hover:shadow-xl hover:shadow-orange-600/40 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Phone className="w-5 h-5" />
                  ติดต่อเรา
                </Link>
                <Link
                  href={`/products/${decryptedCategoryId}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 border border-white/20 whitespace-nowrap"
                >
                  <ArrowRight className="w-5 h-5" />
                  ดูสินค้าอื่นในหมวด
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
