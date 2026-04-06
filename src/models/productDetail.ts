// Model for the product detail API response
// GET /api/page/idproduct?id=<base64_id>

export interface ProductDetailAPIResponse {
  status: number;
  message: string;
  items: ProductDetail;
  seo: string;
}

export interface ProductDetail {
  createDate: string;
  createUser: string;
  editDate: string;
  editUser: string;
  discount: number;
  fileImage: string;
  itemsCode: string;
  localImage: string;
  machineId: string;
  machineName: string;
  machineSeo: string;
  price: number;
  soldout: number;
  typeId: string;
  type: ProductType;
  detailTech: DetailTech[];
  detail: DetailItem[];
  explain: any; // API returns an object or null
  image: ImageItem[];
  manual: ManualItem[];
  video: VideoItem[];
}

export interface ProductType {
  categoryName: string;
  idCategory: string;
  typeName: string;
}

export interface DetailTech {
  detailTech: string;
  detailTechMachineId: string;
  techDetail: string;
  technicallyId: string;
  technicallyName: string;
}

export interface DetailItem {
  machineId: string;
  detailMachineId: string;
  id: string | null;
  detail: string;
  createDate: string | null;
  createUser: string | null;
  editDate: string | null;
  editUser: string | null;
  machine: unknown;
}

export interface ExplainItem {
  [key: string]: unknown;
}

export interface ImageItem {
  machineId: string;
  imageMachineId: string;
  fileName: string;
  local: string;
  machine: unknown;
}

export interface ManualItem {
  [key: string]: unknown;
}

export interface VideoItem {
  link: string;
  linkMap: string;
}
