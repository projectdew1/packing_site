import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "ข้อกำหนดและเงื่อนไข - KMS Machinery",
  description: "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์และบริการของ KMS Machinery",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-slate-50 py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/50 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-8 h-8 text-[var(--color-brand-blue)]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#003366] mb-2">ข้อกำหนดและเงื่อนไข</h1>
                <p className="text-slate-500 font-medium">Terms of Service</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-slate-800 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 mb-6 space-y-6">
              <p>
                ยินดีต้อนรับเข้าสู่เว็บไซต์ของ **บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด** (ต่อไปนี้จะเรียกว่า "บริษัท" หรือ "เรา") 
                การเข้าใช้งานเว็บไซต์นี้ถือว่าท่านยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขดังต่อไปนี้:
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">1. การใช้งานเว็บไซต์</h2>
              <p>
                ท่านตกลงที่จะใช้งานเว็บไซต์นี้เพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมายเท่านั้น 
                และจะไม่กระทำการใดๆ ที่เป็นการละเมิดสิทธิของผู้อื่น หรือขัดขวางการใช้งานเว็บไซต์ของผู้อื่น
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">2. ทรัพย์สินทางปัญญา</h2>
              <p>
                เนื้อหาทั้งหมดที่ปรากฏบนเว็บไซต์นี้ เช่น ข้อความ รูปภาพ โลโก้ เครื่องหมายการค้า และซอฟต์แวร์ 
                ถือเป็นทรัพย์สินของบริษัทหรือผู้ได้รับอนุญาต และได้รับการคุ้มครองตามกฎหมายทรัพย์สินทางปัญญา ห้ามมิให้ผู้ใดคัดลอก ดัดแปลง หรือนำไปเผยแพร่โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากบริษัท
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">3. ข้อมูลผลิตภัณฑ์และราคา</h2>
              <p>
                บริษัทพยายามอย่างเต็มที่ที่จะให้ข้อมูลผลิตภัณฑ์และราคาบนเว็บไซต์มีความถูกต้องและเป็นปัจจุบัน อย่างไรก็ตาม บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อมูลราคา รายละเอียดผลิตภัณฑ์ หรือระงับการจำหน่ายผลิตภัณฑ์ใดๆ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า 
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>ข้อมูลทางเทคนิคของเครื่องจักรอาจมีการเปลี่ยนแปลงตามการพัฒนาของผู้ผลิต</li>
                <li>ราคาสินค้าที่แสดงบนเว็บไซต์ (ถ้ามี) อาจเป็นราคาก่อนรวมภาษีมูลค่าเพิ่ม หรือค่าจัดส่ง</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#003366]">4. ข้อจำกัดความรับผิดชอบ</h2>
              <p>
                บริษัทจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดขึ้นจากการเข้าใช้งานเว็บไซต์นี้ หรือการไม่สามารถเข้าใช้งานเว็บไซต์ได้ 
                รวมถึงความเสียหายที่เกิดจากไวรัสคอมพิวเตอร์ หรือความผิดพลาดทางเทคนิคอื่นๆ
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">5. ลิงก์ไปยังเว็บไซต์ของบุคคลที่สาม</h2>
              <p>
                เว็บไซต์นี้อาจมีการเชื่อมต่อไปยังเว็บไซต์อื่นๆ เพื่อความสะดวกของผู้ใช้งาน 
                บริษัทไม่มีส่วนเกี่ยวข้องและไม่รับผิดชอบต่อเนื้อหาหรือนโยบายความเป็นส่วนตัวของเว็บไซต์เหล่านั้น
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">6. การเปลี่ยนแปลงข้อกำหนด</h2>
              <p>
                บริษัทขอสงวนสิทธิ์ในการแก้ไขปรับปรุงข้อกำหนดและเงื่อนไขเหล่านี้ได้ทุกเมื่อ โดยจะแจ้งให้ทราบผ่านทางหน้าเว็บไซต์ 
                การที่ท่านใช้งานเว็บไซต์ต่อไปถือว่าท่านยอมรับในการเปลี่ยนแปลงดังกล่าว
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">7. กฎหมายที่ใช้บังคับ</h2>
              <p>
                ข้อกำหนดและเงื่อนไขนี้อยู่ภายใต้บังคับและการตีความตามกฎหมายของราชอาณาจักรไทย
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-10">
                <p className="font-bold text-slate-800 mb-2">สอบถามข้อมูลเพิ่มเติมเกี่ยวกับข้อกำหนด:</p>
                <p>ฝ่ายกฎหมายและบริหารจัดการ: {COMPANY.email}</p>
                <p>โทร: {COMPANY.phone}</p>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-400">
              อัปเดตล่าสุด: เมษายน 2568
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
