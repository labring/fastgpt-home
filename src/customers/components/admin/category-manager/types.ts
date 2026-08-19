export interface AdminManagedCategory {
  _id: string;
  name: string;
  slug: string;
  order: number;
  color: string;
  isActive: boolean;
}

export interface CategoryFormData {
  id: string;
  name: string;
  slug: string;
  order: number;
  color: string;
}
