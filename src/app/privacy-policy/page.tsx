import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-slate-50 py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/50 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8 text-[var(--color-brand-blue)]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#003366] mb-2">นโยบายความเป็นส่วนตัว</h1>
                <p className="text-slate-500 font-medium">Privacy Policy & Cookie Policy</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-slate-800 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 mb-6 space-y-6">
              <p>
                บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัดตระหนักถึงความสำคัญของข้อมูลส่วนบุคคลของท่าน 
                เราจึงจัดทำนโยบายความเป็นส่วนตัวนี้ขึ้นเพื่อชี้แจงถึงวิธีการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่าน 
                ตลอดจนสิทธิของท่านในฐานะเจ้าของข้อมูลส่วนบุคคล
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">1. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</h2>
              <p>เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน ได้แก่:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>ข้อมูลติดต่อ เช่น ชื่อ นามสกุล ที่อยู่อีเมล เบอร์โทรศัพท์</li>
                <li>ข้อมูลเกี่ยวกับบริษัท เช่น ชื่อบริษัท ที่อยู่บริษัท</li>
                <li>ข้อมูลการใช้งาน เช่น ที่อยู่ IP ประเภทเบราว์เซอร์ ประวัติการเข้าชมเว็บไซต์ (ผ่าน Cookies)</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#003366]">2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูล</h2>
              <p>เราเก็บรวบรวมข้อมูลของท่านเพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>เพื่อให้บริการของเรา รวมถึงการตอบคำถาม การให้คำปรึกษา และการจัดส่งสินค้า</li>
                <li>เพื่อปรับปรุงพัฒนาผลิตภัณฑ์และบริการ ให้สอดคล้องกับความต้องการของท่าน</li>
                <li>เพื่อติดต่อสื่อสาร แจ้งข่าวสาร โปรโมชั่น หรือข้อมูลทางการตลาด (หากท่านยินยอม)</li>
                <li>เพื่อวิเคราะห์การใช้งานเว็บไซต์ และนำไปพัฒนาประสิทธิภาพของเว็บไซต์</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#003366]">3. นโยบายการใช้คุกกี้ (Cookie Policy)</h2>
              <p>
                เว็บไซต์ของเรามีการใช้งานคุกกี้ เพื่อช่วยให้เราจดจำข้อมูลการเข้าชมของท่าน 
                ทำให้เราสามารถนำเสนอข้อมูลและฟังก์ชันต่างๆ ได้ตรงกับความสนใจของท่าน การใช้งานเว็บไซต์นี้หมายความว่าท่านยินยอมรับการใช้งานคุกกี้ตามนโยบายของเรา
                ท่านสามารถปฏิเสธหรือลบการใช้คุกกี้ได้ในการตั้งค่าเบราว์เซอร์ของท่าน
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>คุกกี้ที่จำเป็น (Strictly Necessary Cookies):</strong> จำเป็นสำหรับการทำงานของเว็บไซต์</li>
                <li><strong>คุกกี้เพื่อการวิเคราะห์ (Analytical/Performance Cookies):</strong> ช่วยให้เราเข้าใจว่าผู้เข้าชมมีปฏิสัมพันธ์กับเว็บไซต์อย่างไร</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#003366]">4. การเปิดเผยข้อมูลส่วนบุคคล</h2>
              <p>
                เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านให้กับบุคคลที่สาม เว้นแต่จะได้รับความยินยอมจากท่าน 
                หรือเป็นการปฏิบัติตามกฎหมาย อย่างไรก็ตาม เราอาจเปิดเผยข้อมูลให้แก่พันธมิตรทางธุรกิจที่ให้บริการในนามของเรา 
                เช่น บริษัทขนส่ง เพื่อให้สามารถจัดส่งสินค้าให้ท่านได้
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">5. ระยะเวลาในการเก็บรักษาข้อมูล</h2>
              <p>
                เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้นานเท่าที่จำเป็นเพื่อดำเนินการตามวัตถุประสงค์ที่ระบุไว้ในนโยบายฉบับนี้ 
                หรือตามที่กฎหมายกำหนด
              </p>

              <h2 className="text-2xl font-bold text-[#003366]">6. สิทธิของท่าน</h2>
              <p>ท่านมีสิทธิต่างๆ เกี่ยวกับข้อมูลส่วนบุคคลของท่านตามกฎหมาย เช่น สิทธิในการขอเข้าถึง สิทธิในการแก้ไข สิทธิในการขอให้ลบ หรือสิทธิในการเพิกถอนความยินยอม</p>

              <h2 className="text-2xl font-bold text-[#003366]">7. การติดต่อเรา</h2>
              <p>หากท่านมีข้อสงสัยหรือต้องการใช้สิทธิเกี่ยวกับข้อมูลส่วนบุคคล โปรดติดต่อเราที่:</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-4">
                <p className="font-bold text-slate-800">บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด</p>
                <p>เบอร์โทรศัพท์: 034-116655, 095-456-5550</p>
                <p>อีเมล: {COMPANY.email}</p>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-400">
              แก้ไขล่าสุด:  เมษายน 2568
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
