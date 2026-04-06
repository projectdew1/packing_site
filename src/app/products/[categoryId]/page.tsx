import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Layers, Tag, Phone, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGE_URL, API_ROUTES, API_PARAMS } from "@/lib/constants";
import { ApiCategory, CategoryApiResponse } from "@/models/category";
import { CategoryProductAPIResponse, Item, Machine } from "@/models/categoryProduct";

async function getCategory(id: string): Promise<ApiCategory | undefined> {
  try {
    const res = await fetch(API_ROUTES.categories, {
      next: { revalidate: 3600 }
    });
    const data: CategoryApiResponse = await res.json();
    return data?.items?.find((c) => c.enID === decodeURIComponent(id));
  } catch (err) {
    return undefined;
  }
}

async function getCategoryProducts(id: string): Promise<CategoryProductAPIResponse | undefined> {
  try {
     const url = new URL(API_ROUTES.categoriesFindId);
      url.searchParams.set(API_PARAMS.name, decodeURIComponent(id)); 
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },   
    });
    const data: CategoryProductAPIResponse = await res.json();

return data;
  } catch (err) {
    return undefined;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(API_ROUTES.categories);
    const data: CategoryApiResponse = await res.json();
    return (data?.items || []).map((category) => ({
      categoryId: category.enID,
    }));
  } catch (err) {
    console.error("Error generating static params for categories:", err);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ categoryId: string }> }) {
  const p = await params;
  const category = await getCategory(p.categoryId);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} - KMS Machinery`,
    description: `หมวดหมู่สินค้า ${category.name}`,
  };
}

/* ── helpers ── */
function formatPrice(price: number): string {
  return price.toLocaleString("th-TH");
}

function discountPercent(price: number, discount: number): number {
  if (!price || !discount || discount >= price) return 0;
  return Math.round(((price - discount) / price) * 100);
}

function totalMachines(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.machine.length, 0);
}

/* ── Machine Card ── */
function MachineCard({ machine, categoryId }: { machine: Machine; categoryId: string }) {
  const hasPrice = machine.price > 0;
  const hasDiscount = machine.discount > 0 && machine.discount < machine.price;
  const isSoldout = machine.soldout === 1;
  const pct = hasDiscount ? discountPercent(machine.price, machine.discount) : 0;

  return (
    <Link
      href={`/products/${categoryId}/${machine.id}`}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--color-brand-blue)]/20 transition-all duration-500 hover:-translate-y-1 flex flex-col"
    >
      {/* Soldout overlay */}
      {isSoldout && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-30 flex items-center justify-center">
          <span className="bg-red-500 text-white text-sm font-bold px-6 py-2 rounded-full -rotate-12 shadow-lg shadow-red-500/30">
            สินค้าหมด
          </span>
        </div>
      )}

      {/* Discount badge */}
      {hasDiscount && !isSoldout && (
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg shadow-red-500/20">
            <Tag className="w-3 h-3" />
            ลด {pct}%
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,26,255,0.03),transparent_70%)]" />
        <img
          src={machine.localImage ? `${IMAGE_URL}${machine.localImage}` : "/product_machine_1773729790893.png"}
          alt={machine.machineName}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out relative z-10 mix-blend-multiply"
        />
        {/* Hover quick-view */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-4">
          <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
            <Eye className="w-3.5 h-3.5" />
            ดูรายละเอียด
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow border-t border-gray-50">

        {/* Name */}
        <h4 className="font-bold text-[15px] text-slate-800 leading-snug mb-4 line-clamp-2 group-hover:text-[var(--color-brand-blue)] transition-colors duration-300">
          {machine.machineName}
        </h4>

        <div className="mt-auto">
          {/* Pricing */}
          {hasPrice ? (
            <div className="mb-4">
              {hasDiscount ? (
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl font-extrabold text-[var(--color-brand-orange)]">
                    ฿{formatPrice(machine.discount)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ฿{formatPrice(machine.price)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-extrabold text-slate-800">
                  ฿{formatPrice(machine.price)}
                </span>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-blue)]">
                <Phone className="w-3.5 h-3.5" />
                สอบถามราคา
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 group-hover:bg-[var(--color-brand-orange)] text-slate-600 group-hover:text-white text-sm font-bold rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/20">
            สอบถาม / สั่งซื้อ
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Main Page ── */
export default async function CategoryProductsPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const p = await params;
  const category = await getCategory(p.categoryId);
  const categoryProducts = await getCategoryProducts(p.categoryId);
  const decryptId = decodeURIComponent(p.categoryId);

  if (!category || !categoryProducts) {
    notFound();
  }

  const machineCount = totalMachines(categoryProducts.items);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-slate-50 pb-16">
      {/* Category Hero Block */}
      <section className="bg-white border-b border-gray-100 shadow-sm mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link 
            href="/products"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> กลับไปหน้าหมวดหมู่ทั้งหมด
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-xl overflow-hidden shadow-sm bg-gray-100 p-6 flex items-center justify-center">
              <img 
                src={category.localImage ? `${IMAGE_URL}${category.localImage}` : "/product_machine_1773729790893.png"} 
                alt={category.name} 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-outfit">
                {category.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-8 bg-slate-50 border border-gray-100 rounded-xl p-4 w-fit">
                 <div className="flex flex-col items-center px-4">
                   <span className="font-bold text-xl text-slate-700">{categoryProducts.items.length || 0}</span>
                   <span className="text-xs text-slate-500 font-medium tracking-wide">ประเภท</span>
                 </div>
                 <div className="w-px h-10 bg-slate-200"></div>
                 <div className="flex flex-col items-center px-4">
                   <span className="font-bold text-xl text-[var(--color-brand-orange)]">{machineCount}</span>
                   <span className="text-xs text-slate-500 font-medium tracking-wide">สินค้า</span>
                 </div>
              </div>

              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                ดูรายละเอียดเครื่องจักรทั้งหมดในหมวดหมู่นี้
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product List — grouped by typeName */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            รุ่นสินค้าในหมวดหมู่นี้{" "}
            <span className="text-gray-400 font-normal text-lg">
              ({categoryProducts.items.length} ประเภท · {machineCount} รายการ)
            </span>
          </h2>
        </div>

        {categoryProducts.items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">ยังไม่มีข้อมูลสินค้าในหมวดหมู่นี้</p>
            <p className="text-gray-400 text-sm mt-1">กำลังรออัปเดตข้อมูล</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {categoryProducts.items.map((typeGroup: Item, groupIdx: number) => (
              <div key={groupIdx}>
                {/* ── Type Group Header ── */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Index pill */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-blue-dark)] flex items-center justify-center shadow-md shadow-[var(--color-brand-blue)]/20">
                    <span className="text-white font-bold text-sm">{String(groupIdx + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 truncate">
                      {typeGroup.typeName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {typeGroup.machine.length} รุ่น
                    </p>
                  </div>
                  {/* Divider line */}
                  <div className="hidden sm:block flex-grow h-px bg-gradient-to-r from-gray-200 to-transparent" />
                </div>

                {/* ── Machine Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {typeGroup.machine.map((machine: Machine) => (
                    <MachineCard key={machine.machineId} machine={machine} categoryId={decryptId} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-blue-dark)] p-8 md:p-12 text-white shadow-xl shadow-[var(--color-brand-blue)]/20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">สนใจสินค้า? ปรึกษาเราได้เลย</h3>
              <p className="text-white/70 text-base max-w-xl">ทีมงาน KMS พร้อมให้คำปรึกษาและแนะนำเครื่องจักรที่เหมาะสมกับธุรกิจของคุณ</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-hover)] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/30 hover:shadow-xl hover:shadow-orange-600/40 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Phone className="w-5 h-5" />
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
