export interface ApiCategory {
  id: string;
  name: string;
  enID: string;
  localImage: string;
  fileImage: string;
  items: number;
  product: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  items: T[];
}

export interface CategoryApiResponse extends ApiResponse<ApiCategory> {}
