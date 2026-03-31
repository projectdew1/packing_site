// ===================================
// Shared delivery job data
// Used by: /delivery page + DeliverySection (homepage)
// ===================================

export interface DeliveryJob {
  id: string;
  location: string;
  customer: string;
  machine: string;
  date: string;
  cover: string;
  images: string[];
}

export const DELIVERY_JOBS: DeliveryJob[] = [
  {
    id: "kk-fish",
    location: "ขอนแก่น",
    customer: "โรงงานแปรรูปปลาร้าอีสาน",
    machine: "เครื่องบรรจุซองอัตโนมัติ รุ่น OMW-200",
    date: "ก.พ. 2569",
    cover: "/product_machine_1773729790893.png",
    images: [
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
    ],
  },
  {
    id: "cm-agri",
    location: "เชียงใหม่",
    customer: "โรงงานผลิตภัณฑ์เกษตรแปรรูปภาคเหนือ",
    machine: "เครื่องซีลสูญญากาศ รุ่น VS-500",
    date: "ม.ค. 2569",
    cover: "/hero_machine_1773729765118.png",
    images: [
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
    ],
  },
  {
    id: "ryg-drink",
    location: "ระยอง",
    customer: "โรงงานเครื่องดื่ม EEC นิคมอุตสาหกรรม",
    machine: "เครื่องบรรจุของเหลวอัตโนมัติ รุ่น LF-1000",
    date: "ม.ค. 2569",
    cover: "/product_machine_1773729790893.png",
    images: [
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
    ],
  },
  {
    id: "nma-auto",
    location: "นครราชสีมา",
    customer: "โรงงานอาหารสำเร็จรูป สายการผลิตอัตโนมัติ",
    machine: "ระบบแพ็คเกจอัตโนมัติ Flow-Wrap FSK-250",
    date: "ธ.ค. 2568",
    cover: "/hero_machine_1773729765118.png",
    images: [
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
    ],
  },
  {
    id: "sk-sea",
    location: "สมุทรสาคร",
    customer: "โรงงานอาหารทะเลแช่แข็งส่งออก",
    machine: "เครื่องซีลสูญญากาศ MULTIVAC รุ่น R230",
    date: "ธ.ค. 2568",
    cover: "/product_machine_1773729790893.png",
    images: [
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
    ],
  },
  {
    id: "spk-plastic",
    location: "สมุทรปราการ",
    customer: "โรงงานผลิตภัณฑ์พลาสติกส่งออก",
    machine: "เครื่องบรรจุถุงร้อน Shrink Wrap รุ่น SW-800",
    date: "พ.ย. 2568",
    cover: "/hero_machine_1773729765118.png",
    images: [
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
    ],
  },
  {
    id: "ay-hitech",
    location: "อยุธยา",
    customer: "นิคมอุตสาหกรรมไฮเทค บางปะอิน",
    machine: "เครื่องแพ็คนิคโพลีถุงลม AirPack รุ่น AP-200",
    date: "พ.ย. 2568",
    cover: "/product_machine_1773729790893.png",
    images: [
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
    ],
  },
  {
    id: "ud-herb",
    location: "อุดรธานี",
    customer: "โรงงานสมุนไพรและผลิตภัณฑ์ธรรมชาติ",
    machine: "เครื่องบรรจุผงอัตโนมัติ Auger รุ่น AF-300",
    date: "ต.ค. 2568",
    cover: "/hero_machine_1773729765118.png",
    images: [
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
    ],
  },
  {
    id: "hkt-food",
    location: "ภูเก็ต",
    customer: "โรงงานอาหารพร้อมทานท่องเที่ยว",
    machine: "เครื่องซีลฝาถ้วย Cup Sealer รุ่น CS-500",
    date: "ต.ค. 2568",
    cover: "/product_machine_1773729790893.png",
    images: [
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
    ],
  },
  {
    id: "srt-rubber",
    location: "สุราษฎร์ธานี",
    customer: "โรงงานยางพาราแปรรูปเพื่อส่งออก",
    machine: "เครื่องแพ็คสินค้าเกษตร รุ่น AGP-150",
    date: "ก.ย. 2568",
    cover: "/hero_machine_1773729765118.png",
    images: [
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
    ],
  },
  {
    id: "cbi-milk",
    location: "ชลบุรี",
    customer: "โรงงานผลิตภัณฑ์นมและเครื่องดื่มโยเกิร์ต",
    machine: "เครื่องบรรจุซองยืน Stand-Up Pouch รุ่น SUP-600",
    date: "ก.ย. 2568",
    cover: "/product_machine_1773729790893.png",
    images: [
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
    ],
  },
  {
    id: "lp-pharma",
    location: "ลำปาง",
    customer: "โรงงานผลิตภัณฑ์สุขภาพและยาสมุนไพร",
    machine: "เครื่องบรรจุเม็ดยาอัตโนมัติ Tablet Filler รุ่น TF-200",
    date: "ส.ค. 2568",
    cover: "/hero_machine_1773729765118.png",
    images: [
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
      "/hero_machine_1773729765118.png",
      "/product_machine_1773729790893.png",
    ],
  },
];
