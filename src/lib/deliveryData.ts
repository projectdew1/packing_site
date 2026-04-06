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
  link: string | null;
  images: string[];
}

