import {
  Truck, CheckCircle2, Clock, Shield,
} from "lucide-react";

// export const API_URL = "https://kmspacking.com:5003";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kmspacking.com:5003";
export const IMAGE_URL = "https://kmspacking.com:5003";

export const API_PARAMS = {
  name: 'name',
  id: 'id',
}

export const API_ROUTES = {
  categories: `${API_URL}/api/page/header`,
  categoriesFindId: `${API_URL}/api/page/idHeader`,
  productsId: `${API_URL}/api/page/idproduct`,
  news: `${API_URL}/api/News/getNews`,
  newsIds: `${API_URL}/api/News/findNewsIdShow`,
  newsDetail: `${API_URL}/api/News/findNewsShow`,
  portfolio: `${API_URL}/api/Portfolio/getPortfolio`,
  addContact: `${API_URL}/api/Contact/addContact`,
  productRecommend: `${API_URL}/api/Product/getRecommend`,
  allMachineParams: `${API_URL}/api/Product/getAllMachineParams`,
};

// ===================================
// Company Information
// ===================================
export const COMPANY = {
  name: "KMS MACHINERY",
  nameThai: "บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด",
  tagline: "PACKAGING EXPERT",
  descriptionShort: "ศูนย์รวมเครื่องบรรจุภัณฑ์อุตสาหกรรม",
  descriptionFull:
    "บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด ศูนย์รวมและจัดจำหน่ายเครื่องบรรจุภัณฑ์ อุตสาหกรรม บริการด้วยใจ ซื่อสัตย์ ได้มาตรฐาน",
  phone: "034-116655",
  email: "kmsmachinery@hotmail.com",
  contacts: [
    { mobile: "095-456-5550", name: "คุณกิตติกร" },
    { mobile: "062-696-8999", name: "คุณแหม่ม" },
    { mobile: "094-349-4482", name: "คุณชมพู่" },
  ],
  address: "1/46 หมู่ที่ 6 อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74130",
  lineId: "@kmsmachinery",
  lineUrl: "https://line.me/ti/p/@kmsmachinery",
  facebookUrl: "https://www.facebook.com/kmsmachinerythailand",
  tiktokUrl: "https://www.tiktok.com/@kmsmachinery",
  youtubeUrl: "https://www.youtube.com/@kmsmachinery4363",
  workingHours: "จันทร์ - เสาร์: 08:30 - 17:30 น.",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2040244647633!2d100.3046618!3d13.7060896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e295e27d572fb9%3A0x46f8115383270857!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4hOC5gOC4reC5h-C4oeC5gOC4reC4qiDguYHguKHguIrguIrguLXguJnguYDguJnguK3guKPguLXguYgg4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1773755462401!5m2!1sth!2sth",
} as const;

// ===================================
// Navigation Links
// ===================================
export interface NavLink {
  href: string;
  label: string;
  iconName: "Package" | "Truck" | "PenTool" | "Newspaper" | "BookOpen";
}

export const NAV_LINKS: NavLink[] = [

  { href: "/products", label: "ผลิตภัณฑ์", iconName: "Truck" },
  { href: "/about", label: "เกี่ยวกับ KMS", iconName: "PenTool" },
  { href: "/delivery", label: "การจัดส่ง", iconName: "Package" },
  { href: "/blog", label: "บทความ", iconName: "BookOpen" },
  // { href: "/contact", label: "ติดต่อเรา", iconName: "Newspaper" },
];

export const FOOTER_MAIN_LINKS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/about", label: "เกี่ยวกับ KMS" },
  { href: "/products", label: "ผลิตภัณฑ์ของเรา" },
  { href: "/blog", label: "บทความ/ข่าวสาร" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export const FOOTER_SERVICE_LINKS = [
  { href: "/delivery", label: "การจัดส่งสินค้า" },
  // { href: "#", label: "เงื่อนไขการรับประกัน" },
  { href: "/contact", label: "แจ้งซ่อม" },
  { href: "/terms-of-service", label: "ข้อกำหนดและเงื่อนไข" },
  { href: "/privacy-policy", label: "นโยบายความเป็นส่วนตัว" },
];

// ===================================
// Services Data
// ===================================
export interface ServiceItem {
  iconName: "Package" | "Truck" | "PenTool";
  title: string;
  desc: string;
}

export const SERVICES: ServiceItem[] = [
  {
    iconName: "Package",
    title: "สินค้าคุณภาพราคาย่อมเยาว์",
    desc: "เครื่องจักรได้มาตรฐาน นำเข้าจากผู้ผลิตโดยตรง คุ้มค่าแก่การลงทุนทั้งระยะสั้นและระยะยาว",
  },
  {
    iconName: "Truck",
    title: "บริการจัดส่งสินค้าทั่วไทย",
    desc: "เรามีทีมงานจัดส่งพร้อมติดตั้งและเทรนนิ่งการใช้งานถึงหน้าโรงงานท่านทั่วประเทศ",
  },
  {
    iconName: "PenTool",
    title: "ปรึกษาปัญหา ออกแบบเครื่อง",
    desc: "ทีมวิศวกรผู้เชี่ยวชาญพร้อมให้คำปรึกษาและออกแบบดัดแปลงเครื่องจักรให้เหมาะสมกับสินค้า",
  },
];

// ===================================
// Products Data
// ===================================
export interface ProductItem {
  title: string;
  image: string;
}

export const RECOMMENDED_PRODUCTS: ProductItem[] = [
  {
    title: "เครื่องบรรจุซองสำเร็จรูป รุ่น OMW-200",
    image: "/product_machine_1773729790893.png",
  },
  {
    title: "เครื่องบรรจุผงแบบสกรูอัตโนมัติ รุ่น FL420",
    image: "/product_machine_1773729790893.png",
  },
  {
    title: "เครื่องบรรจุแบบกะบะ รุ่น SK-160",
    image: "/product_machine_1773729790893.png",
  },
  {
    title: "เครื่องตัดแอลซีลพร้อมอบฟิล์มหด",
    image: "/product_machine_1773729790893.png",
  },
  {
    title: "เครื่องตัดแอลซีลพร้อมอบฟิล์มหด",
    image: "/product_machine_1773729790893.png",
  },
  {
    title: "เครื่องตัดแอลซีลพร้อมอบฟิล์มหด",
    image: "/product_machine_1773729790893.png",
  },
];

// ===================================
// About Page Data
// ===================================

export interface StatItem {
  value: string;
  label: string;
  iconName: "Award" | "Users" | "Factory" | "Handshake";
}

export const STATS: StatItem[] = [
  { value: "10+", label: "ปีประสบการณ์", iconName: "Award" },
  { value: "500+", label: "ลูกค้าที่ไว้วางใจ", iconName: "Users" },
  { value: "1,000+", label: "เครื่องจักรที่จัดส่ง", iconName: "Factory" },
  { value: "100%", label: "ความพึงพอใจ", iconName: "Handshake" },
];

export interface ValueItem {
  iconName: "Target" | "Handshake" | "TrendingUp";
  title: string;
  desc: string;
}

export const CORE_VALUES: ValueItem[] = [
  {
    iconName: "Target",
    title: "คุณภาพเป็นหัวใจ",
    desc: "เราคัดสรรเครื่องจักรคุณภาพจากผู้ผลิตชั้นนำ ผ่านการตรวจสอบมาตรฐานอย่างเข้มงวดก่อนส่งถึงมือลูกค้า",
  },
  {
    iconName: "Handshake",
    title: "บริการด้วยใจ",
    desc: "ทีมงานพร้อมดูแลตั้งแต่ให้คำปรึกษา ออกแบบ ติดตั้ง จนถึงบริการหลังการขายและซ่อมบำรุง",
  },
  {
    iconName: "TrendingUp",
    title: "พัฒนาอย่างต่อเนื่อง",
    desc: "เราติดตามเทคโนโลยีใหม่ๆ อยู่เสมอ เพื่อนำเสนอโซลูชั่นที่ทันสมัยและตอบโจทย์ทุกความต้องการ",
  },
];

export const WHY_CHOOSE_US: string[] = [
  "นำเข้าจากผู้ผลิตโดยตรง ราคาแข่งขันได้",
  "การันตีคุณภาพ พร้อมรับประกันสินค้า",
  "ทีมวิศวกรพร้อมให้คำปรึกษาตลอดเวลา",
  "บริการจัดส่งและติดตั้งฟรีทั่วประเทศ",
  "อะไหล่พร้อมส่ง รองรับการซ่อมบำรุง",
  "ประสบการณ์มากกว่า 10 ปีในวงการ",
];

// ===================================
// Contact Page Data
// ===================================
export interface ContactInfoItem {
  iconName: "Phone" | "Mail" | "MapPin" | "Clock";
  title: string;
  items: string[];
}

export const CONTACT_INFO: ContactInfoItem[] = [
  {
    iconName: "Phone",
    title: "โทรศัพท์",
    items: [
      COMPANY.phone,
      ...COMPANY.contacts.map((c) => `${c.mobile} (${c.name})`),
    ],
  },
  {
    iconName: "MapPin",
    title: "ที่อยู่",
    items: [COMPANY.nameThai, COMPANY.address],
  },
  {
    iconName: "Clock",
    title: "เวลาทำการ",
    items: [COMPANY.workingHours],
  },
];

export const CONTACT_SUBJECTS = [
  { value: "", label: "เลือกหัวข้อ" },
  { value: "product", label: "สอบถามสินค้า / ขอใบเสนอราคา" },
  { value: "consult", label: "ปรึกษาการเลือกเครื่องจักร" },
  { value: "service", label: "บริการซ่อม / อะไหล่" },
  { value: "other", label: "อื่นๆ" },
];

// ===================================
// Delivery Data
// ===================================

export const DELIVERY_FEATURES = [
  { icon: Truck, title: "ทีมขนส่งมืออาชีพ", desc: "รถขนส่งเฉพาะทางพร้อมอุปกรณ์ยกสินค้าหนัก ดูแลเครื่องจักรอย่างปลอดภัย" },
  { icon: Clock, title: "นัดหมายเวลาได้", desc: "สามารถนัดหมายวันและเวลาจัดส่งที่สะดวก เพื่อให้โรงงานเตรียมพร้อมรับสินค้า" },
  { icon: Shield, title: "ประกันระหว่างขนส่ง", desc: "เครื่องจักรทุกชิ้นมีประกันความเสียหายระหว่างการขนส่งครอบคลุมทุกจังหวัด" },
  { icon: CheckCircle2, title: "ติดตั้งและเทรนนิ่ง", desc: "ทีมวิศวกรติดตั้งเครื่องจักรพร้อมสอนการใช้งานถึงหน้าโรงงาน ไม่มีค่าใช้จ่ายเพิ่ม" },
];

// ===================================
// Blog / News Data
// ===================================
export type BlogCategory = "all" | "article" | "news";

export const BLOG_CATEGORIES: { value: BlogCategory; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "article", label: "บทความ" },
  { value: "news", label: "ข่าวสาร" },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "article" | "news";
  date: string;
  readTime: string;
  image: string;
  images?: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-packaging-machine",
    title: "วิธีเลือกเครื่องบรรจุภัณฑ์ให้เหมาะกับสินค้าของคุณ",
    excerpt: "แนวทางการพิจารณาเลือกเครื่องบรรจุภัณฑ์ที่ตรงกับความต้องการ ทั้งประเภทสินค้า กำลังการผลิต และงบประมาณ",
    category: "article",
    date: "2026-03-10",
    readTime: "5 นาที",
    image: "/product_machine_1773729790893.png",
    images: ["/product_machine_1773729790893.png", "/product_machine_1773729790893.png", "/product_machine_1773729790893.png"],
    content: `
การเลือกเครื่องบรรจุภัณฑ์ที่เหมาะสมเป็นสิ่งสำคัญอย่างยิ่งสำหรับธุรกิจของคุณ ปัจจัยที่ควรพิจารณา ได้แก่:

**1. ประเภทสินค้า**
สินค้าแต่ละชนิดต้องการวิธีบรรจุที่แตกต่างกัน เช่น สินค้าแห้ง ผง เม็ด ของเหลว หรือครีม

**2. กำลังการผลิต**
พิจารณาจำนวนชิ้นต่อนาทีที่ต้องการ เพื่อเลือกเครื่องที่มีความเร็วเหมาะสม

**3. ขนาดบรรจุภัณฑ์**
เลือกเครื่องที่รองรับขนาดซองหรือถุงที่ต้องการใช้งาน

**4. งบประมาณ**
เปรียบเทียบราคาและฟีเจอร์ที่ได้ เพื่อให้คุ้มค่าการลงทุนมากที่สุด

ที่ KMS Machinery เรามีผู้เชี่ยวชาญพร้อมให้คำปรึกษาเรื่องการเลือกเครื่องจักรที่เหมาะสมกับสินค้าของท่าน ติดต่อเราได้เลย!
    `.trim(),
  },
  {
    slug: "kms-new-office-opening",
    title: "KMS Machinery เปิดโชว์รูมใหม่ พร้อมเครื่องจักรให้ทดลองใช้",
    excerpt: "เราพร้อมต้อนรับลูกค้าทุกท่านที่โชว์รูมแห่งใหม่ มีเครื่องจักรสาธิตให้ทดลองใช้งานจริง",
    category: "news",
    date: "2026-03-05",
    readTime: "3 นาที",
    image: "/product_machine_1773729790893.png",
    images: ["/product_machine_1773729790893.png", "/product_machine_1773729790893.png"],
    content: `
KMS Machinery ยินดีเปิดให้บริการโชว์รูมแห่งใหม่แล้ววันนี้!

**สิ่งที่พร้อมให้บริการ:**
- เครื่องจักรหลากหลายรุ่นให้ทดลองใช้งานจริง ก่อนตัดสินใจซื้อ
- ทีมวิศวกรพร้อมให้คำปรึกษาและสาธิตการใช้งาน
- บริเวณพื้นที่กว้างขวาง สะดวกสบาย จอดรถง่าย

เชิญเยี่ยมชมได้ทุกวันจันทร์ - เสาร์ เวลา 08:30 - 17:30 น.
    `.trim(),
  },
  {
    slug: "packaging-trends-2026",
    title: "เทรนด์บรรจุภัณฑ์ปี 2026 ที่ผู้ประกอบการต้องรู้",
    excerpt: "สรุปเทรนด์บรรจุภัณฑ์ที่น่าจับตามอง ตั้งแต่ Eco-Friendly Packaging ไปจนถึง Smart Packaging",
    category: "article",
    date: "2026-02-28",
    readTime: "7 นาที",
    image: "/product_machine_1773729790893.png",
    images: ["/product_machine_1773729790893.png", "/product_machine_1773729790893.png", "/product_machine_1773729790893.png", "/product_machine_1773729790893.png"],
    content: `
อุตสาหกรรมบรรจุภัณฑ์มีการพัฒนาอย่างต่อเนื่อง เทรนด์สำคัญในปี 2026 ได้แก่:

**1. Eco-Friendly Packaging**
บรรจุภัณฑ์ที่เป็นมิตรต่อสิ่งแวดล้อม ย่อยสลายได้ ลดการใช้พลาสติก

**2. Smart Packaging**
บรรจุภัณฑ์อัจฉริยะ ที่มี QR Code, NFC หรือเซ็นเซอร์ตรวจสอบคุณภาพ

**3. Minimalist Design**
การออกแบบที่เรียบง่าย สื่อสารชัดเจน ลดความซับซ้อน

**4. Automation**
การใช้เครื่องจักรอัตโนมัติเพิ่มประสิทธิภาพการผลิต ลดต้นทุนแรงงาน

KMS Machinery พร้อมรองรับทุกเทรนด์ด้วยเครื่องจักรที่ทันสมัย
    `.trim(),
  },
  {
    slug: "maintenance-tips",
    title: "5 เคล็ดลับดูแลรักษาเครื่องบรรจุภัณฑ์ให้ใช้งานได้ยาวนาน",
    excerpt: "วิธีดูแลและบำรุงรักษาเครื่องจักรเบื้องต้น ที่ช่วยยืดอายุการใช้งานและลดค่าซ่อม",
    category: "article",
    date: "2026-02-20",
    readTime: "4 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
การดูแลรักษาเครื่องจักรอย่างสม่ำเสมอช่วยลดปัญหาเสียหายและค่าใช้จ่ายในระยะยาว

**1. ทำความสะอาดทุกวัน**
เช็ดทำความสะอาดชิ้นส่วนที่สัมผัสกับสินค้าหลังใช้งาน

**2. หล่อลื่นชิ้นส่วนเคลื่อนที่**
ใส่น้ำมันหล่อลื่นตามจุดที่กำหนดเป็นประจำทุกสัปดาห์

**3. ตรวจสอบสายพานและซีล**
เช็คสภาพสายพาน ซีลร้อน และอุปกรณ์สิ้นเปลือง

**4. อัปเดตซอฟต์แวร์**
สำหรับเครื่องรุ่นใหม่ที่มีระบบควบคุม ควรอัปเดตให้เป็นเวอร์ชันล่าสุด

**5. เรียกช่างตรวจเช็คประจำปี**
แนะนำให้ช่างผู้เชี่ยวชาญตรวจเช็คเครื่องอย่างน้อยปีละ 1 ครั้ง
    `.trim(),
  },
  {
    slug: "food-expo-2026",
    title: "KMS Machinery ร่วมออกบูธงาน Food Pack Asia 2026",
    excerpt: "พบกับเครื่องจักรรุ่นใหม่ล่าสุดจาก KMS ในงาน Food Pack Asia 2026 ที่ไบเทค บางนา",
    category: "news",
    date: "2026-02-15",
    readTime: "2 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
KMS Machinery ร่วมจัดแสดงเครื่องจักรในงาน Food Pack Asia 2026!

**รายละเอียดงาน:**
- วันที่: 20-23 มีนาคม 2026
- สถานที่: ไบเทค บางนา ฮอลล์ 5
- บูธ: A25

**ไฮไลท์ภายในบูธ:**
- เครื่องบรรจุซองสำเร็จรูปรุ่นใหม่ OMW-300
- เครื่องบรรจุของเหลวแบบอัตโนมัติ
- โปรโมชั่นพิเศษสุดสำหรับลูกค้าที่จองเครื่องภายในงาน

แวะมาเยี่ยมชมและทดลองเครื่องจักรได้เลย พบกันที่บูธ A25!
    `.trim(),
  },
  {
    slug: "seal-type-comparison",
    title: "เปรียบเทียบระบบซีลแบบต่างๆ: Center Seal vs. 3-Side Seal vs. 4-Side Seal",
    excerpt: "ทำความเข้าใจระบบซีลแต่ละแบบ ข้อดี ข้อเสีย เพื่อเลือกใช้ให้ตรงกับสินค้า",
    category: "article",
    date: "2026-02-10",
    readTime: "6 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
การเลือกระบบซีลที่เหมาะสมกับสินค้าช่วยเพิ่มความสวยงามและรักษาคุณภาพสินค้าได้ดียิ่งขึ้น

**Center Seal (ซีลกลาง)**
- เหมาะกับ: ขนมซอง ข้าวเกรียบ ขนมปัง
- ข้อดี: ประหยัดฟิล์ม พิมพ์ลายได้เต็มหน้า

**3-Side Seal (ซีล 3 ด้าน)**
- เหมาะกับ: ซองซอส ซองเครื่องเทศ ซองยา
- ข้อดี: ซีลแน่น เหมาะกับสินค้าขนาดเล็ก

**4-Side Seal (ซีล 4 ด้าน)**
- เหมาะกับ: กาแฟซอง ซุปก้อน สินค้าพรีเมี่ยม
- ข้อดี: ซีลแน่นหนา ดูหรูหรา ป้องกันความชื้นได้ดี

สอบถามเพิ่มเติมเกี่ยวกับเครื่องจักรแต่ละระบบได้ที่ KMS Machinery
    `.trim(),
  },

  {
    slug: "automation-in-packaging",
    title: "ยกระดับโรงงานด้วยระบบแพ็คสินค้าอัตโนมัติ (Automation)",
    excerpt: "ไขข้อข้องใจ ทำไมโรงงานยุคใหม่ถึงเปลี่ยนมาใช้ระบบบรรจุภัณฑ์อัตโนมัติ 100% และความคุ้มค่าของการลงทุน",
    category: "article",
    date: "2026-02-05",
    readTime: "8 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
การนำระบบแพ็คสินค้าอัตโนมัติมาใช้ในอุตสาหกรรม

**ข้อดีของการใช้ระบบอัตโนมัติ**
- **ลดต้นทุน:** ลดการพึ่งพาแรงงานคน ซึ่งเป็นปัจจัยที่มีต้นทุนสูงและผันผวน
- **เพิ่มความรวดเร็ว:** เครื่องจักรสามารถทำงานได้ต่อเนื่อง 24 ชั่วโมง โดยไม่มีเหนื่อยล้า
- **เพิ่มคุณภาพและมาตรฐาน:** เครื่องบรรจุสามารถควบคุมน้ำหนักและขนาดของบรรจุภัณฑ์ได้อย่างแม่นยำ ทุกชิ้นได้มาตรฐานเดียวกัน
- **ลดข้อผิดพลาด:** ระบบอัตโนมัติช่วยลด Error จากคน (Human Error) ที่อาจเกิดขึ้น

ลงทุนวันนี้ เริ่มประหยัดในระยะยาวกับ KMS Machinery
    `.trim(),
  },
  {
    slug: "green-packaging-solutions",
    title: "บรรจุภัณฑ์รักษ์โลก (Green Packaging) เทรนด์ที่ต้องตามให้ทัน",
    excerpt: "รวมวัสดุบรรจุภัณฑ์ที่เป็นมิตรกับสิ่งแวดล้อม และเครื่องจักรที่รองรับวัสดุเหล่านี้",
    category: "article",
    date: "2026-02-01",
    readTime: "5 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
Green Packaging ไม่ใช่แค่ทางเลือก แต่คือทางรอดของธุรกิจ

**วัสดุที่เป็นมิตรกับสิ่งแวดล้อม:**
1. กระดาษและกระดาษแข็งรีไซเคิล
2. พลาสติกชีวภาพ (Bioplastic) ที่ย่อยสลายได้
3. บรรจุภัณฑ์ที่สามารถนำกลับมาใช้ใหม่ได้ (Reusable)

**เครื่องจักรของ KMS พัฒนาขึ้นเพื่อรองรับเทรนด์นี้:**
- รองรับการซีลฟิล์มบางพิเศษ ลดการใช้พลาสติก
- ระบบควบคุมอุณหภูมิซีลที่แม่นยำ ไม่ทำลายวัสดุชีวภาพ
    `.trim(),
  },
  {
    slug: "new-product-launch-vfs-1000",
    title: "เปิดตัวเครื่องบรรจุแนวตั้งรุ่นใหม่ VFS-1000 ความเร็วสูง 120 ซอง/นาที",
    excerpt: "KMS ฝ่าขีดจำกัดความเร็วด้วยเครื่องบรรจุแนวตั้งรุ่นใหม่ล่าสุด รองรับการผลิตระดับอุตสาหกรรมใหญ่",
    category: "news",
    date: "2026-01-28",
    readTime: "3 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
ข่าวดีสำหรับโรงงานที่ต้องการเร่งกำลังการผลิต! ขอแนะนำ VFS-1000

จุดเด่นของรุ่น VFS-1000:
- **ความเร็ว:** 120 ซองต่อนาที
- **ความแม่นยำ:** หัวชั่งน้ำหนักอัจฉริยะ 14 หัว
- **ความทนทาน:** โครงสร้างสแตนเลส 304 ทั้งตัว
- **หน้าจอควบคุม:** Touch Screen 10 นิ้ว รองรับภาษาไทย

ติดต่อฝ่ายขายของเราวันนี้เพื่อรับราคาพิเศษในช่วงเปิดตัว!
    `.trim(),
  },
  {
    slug: "vacuum-packaging-benefits",
    title: "ทำไมอาหารสดต้องใช้เครื่องซีลสูญญากาศ? เจาะลึกประโยชน์ 5 ข้อ",
    excerpt: "การซีลสูญญากาศ (Vacuum Sealing) ช่วยรักษาความสดใหม่และยืดอายุอาหารได้อย่างไร?",
    category: "article",
    date: "2026-01-20",
    readTime: "4 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
เครื่องซีลสูญญากาศคือพระเอกของวงการอาหาร!

1. ยืดอายุการเก็บรักษา (Shelf Life) ได้นานกว่าเดิม 3-5 เท่า
2. คงความสดใหม่ สีสัน และรสชาติของอาหาร
3. ป้องกันปัญหาความชื้นและแบคทีเรีย
4. ประหยัดพื้นที่จัดเก็บและขนส่ง
5. เพิ่มมูลค่าและภาพลักษณ์ให้กับสินค้า ดูพรีเมียมและสะอาด

สนใจเครื่องซีลสูญญากาศ รุ่นระดับอุตสาหกรรม? KMS มีให้เลือกหลายรุ่น!
    `.trim(),
  },
  {
    slug: "customer-success-story-bakery",
    title: "Case Study: เพิ่มกำไรให้ธุรกิจเบเกอรี่ด้วยเครื่องบรรจุอัตโนมัติ",
    excerpt: "ลูกค้าที่เปลี่ยนจากการแพ็คด้วยมือมาเป็นเครื่องอัตโนมัติ สร้างยอดขายเพิ่มขึ้น 300% ได้อย่างไร",
    category: "article",
    date: "2026-01-15",
    readTime: "7 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
เรื่องราวความสำเร็จจากร้าน "สยามเบเกอรี่"

ปัญหาเดิม:
แพ็คขนมปังด้วยมือ ใช้พนักงาน 10 คน ได้แค่วันละ 2,000 ซอง ซีลแตกบ่อย อาหารเสียง่าย

ทางแก้จาก KMS:
เราแนะนำเครื่องบรรจุแนวนอน Flow-Wrap รุ่น FSK-250

ผลลัพธ์:
- พนักงานเหลือเพียง 2 คนคุมเครื่อง
- ยอดการผลิตพุ่งเป็น 10,000 ซองต่อวัน
- แพ็คเกจสวยงาม ซีลแน่น ลมไม่เข้า ขนมอยู่ได้นานขึ้น
- ได้รับคำสั่งซื้อจากร้านสะดวกซื้อ (Convenience Store) ทันที
    `.trim(),
  },
  {
    slug: "maintenance-service-update",
    title: "KMS ประกาศขยายทีมช่างบริการ (Service Team) สู่ภาคอีสาน",
    excerpt: "ข่าวดี! เรามีทีมช่างประจำพื้นที่เพื่อให้บริการลูกค้าในภาคตะวันออกเฉียงเหนือได้รวดเร็วยิ่งขึ้น",
    category: "news",
    date: "2026-01-10",
    readTime: "2 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
บริการหลังการขายคือหัวใจของเรา

KMS Machinery ยินดีประกาศขยายศูนย์บริการช่างซ่อมบำรุงในส่วนของ **ภาคอีสาน** อย่างเป็นทางการ!
ลูกค้าในพื้นที่ ขอนแก่น, โคราช, อุดรธานี และจังหวัดใกล้เคียง จะได้รับบริการ:
- เข้าตรวจเช็คหน้างาน ภายใน 24 ชั่วโมง
- บริการอะไหล่ด่วน ไม่ต้องรอส่งจากกรุงเทพ
- ทีมวิศวกรผู้เชี่ยวชาญให้คำแนะนำถึงโรงงาน

เราไม่เคยทิ้งลูกค้า!
    `.trim(),
  },
  {
    slug: "liquid-filling-machine-guide",
    title: "คู่มือเลือกซื้อเครื่องบรรจุของเหลว (Liquid Filling Machine)",
    excerpt: "สิ่งที่ต้องรู้ก่อนซื้อเครื่องบรรจุของเหลว ไม่ว่าจะเป็นน้ำดื่ม ซอส สบู่ หรือเครื่องสำอาง",
    category: "article",
    date: "2026-01-05",
    readTime: "6 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
ความหนืดของของเหลวมีผลต่อการเลือกเครื่องจักร

**1. ของเหลวไหลง่าย (น้ำดื่ม, น้ำหวาน)**
แนะนำ: เครื่องบรรจุแบบอาศัยแรงโน้มถ่วง (Gravity Filler)

**2. ของเหลวข้น / มีชิ้นเนื้อ (น้ำจิ้มสุกี้, ซอส)**
แนะนำ: เครื่องบรรจุแบบลูกสูบชัก (Piston Filler)

**3. ของเหลวที่มีฟอง (แชมพู, สบู่เหลว)**
แนะนำ: เครื่องบรรจุแบบกันฟอง (Bottom-up filling mode) ลดการเกิดฟองระหว่างเติม
    `.trim(),
  },
  {
    slug: "cost-saving-in-packaging",
    title: "3 เทคนิคตัดลดต้นทุนวัสดุบรรจุภัณฑ์ โดยไม่ลดคุณภาพ",
    excerpt: "ผู้ประกอบการควรรู้! เทคนิคการออกแบบปรับแต่งเครื่องจักรและวัสดุแพ็คเกจ ให้ประหยัดต้นทุนมากที่สุด",
    category: "article",
    date: "2025-12-28",
    readTime: "4 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
ประหยัดต้นทุน แค่รู้เทคนิคเหล่านี้

1. **ปรับลดขนาดริมการซีล (Sealing Margin)**
ลดพื้นที่ของขอบซีลลงเพียงด้านละ 0.5 ซม. สามารถประหยัดฟิล์มได้มหาศาลหากผลิตวันละหลักหมื่นซอง

2. **ใช้ฟิล์มบางลงแต่ผสมโพลิเมอร์เกรดพิเศษ**
เทคโนโลยีฟิล์มยุคใหม่บางลงแต่แข็งแรงเท่าเดิม ช่วยประหยัดน้ำหนักและต้นทุนการสั่งพิมพ์

3. **ปรับเปลี่ยนทรงซองเป็น Pillow Bag**
ทรงซองมาตรฐานนี้มีต้นทุนการผลิซองต่ำที่สุดเมื่อเทียบกับทรงก้นตั้ง (Stand-up Pouch)
    `.trim(),
  },
  {
    slug: "iso-9001-certification",
    title: "KMS Machinery ได้รับการรับรองมาตรฐาน ISO 9001:2015 🏆",
    excerpt: "ตอกย้ำความเป็นผู้นำและการบริหารงานคุณภาพเพื่อลูกค้าอย่างยั่งยืน",
    category: "news",
    date: "2025-12-20",
    readTime: "2 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
ความภูมิใจของชาว KMS!

เราได้รับการรับรองมาตรฐานสากลด้านระบบบริหารงานคุณภาพ ISO 9001:2015 ซึ่งเป็นเครื่องยืนยันว่า:
- เครื่องจักรทุกเครื่องผ่านกระบวนการตรวจสอบ (QC) เข้มงวด
- การจัดส่ง มีความเป็นระบบ ตรงต่อเวลา
- การบริการลูกค้า สามารถแก้ไขปัญหา ติดตามผลได้อย่างมืออาชีพ

ลูกค้าจึงสามารถมั่นใจได้ 100% ในทุกสินค้าและบริการจากเรา
    `.trim(),
  },
  {
    slug: "powder-packaging-tips",
    title: "ปัญหาฝุ่นคลุ้งจากการแพ็คผงกาแฟ/แป้ง แก้ไขอย่างไร?",
    excerpt: "เทคนิคการตั้งค่า และระบบเสริมเพื่อป้องกันปัญหาเครื่องบรรจุผงอุดตันและฝุ่นกระจายในโรงงาน",
    category: "article",
    date: "2025-12-10",
    readTime: "5 นาที",
    image: "/product_machine_1773729790893.png",
    content: `
ปัญหาใหญ่ของโรงงานแป้ง, กาแฟ, เครื่องเทศ คือ "ฝุ่น"

**ผลกระทบของฝุ่น**
- ซีลซองไม่ติด เพราะฝุ่นเกาะที่รอยซีล
- ระบบเซนเซอร์พัง รวนบ่อย
- เสียสุขภาพพนักงานในไลน์

**ทางแก้ไขโดยวิศวกร KMS**
- **เครื่องบรรจุระบบ Auger (เกลียวลำเลียง):** ลดการฟุ้งกระจายของผง
- **ติดตั้งระบบดูดฝุ่น (Dust Extractor):** ที่จุดปล่อยผง ช่วยดูดเศษผงที่ลอยในอากาศกลับไปในระบบ
- **การป้อนแบบจุ่มลง (Diving Nozzle):** ปล่อยผงจากก้นซอง
    `.trim(),
  },
];
