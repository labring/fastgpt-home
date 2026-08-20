export interface AdminCategory {
  _id: string;
  name: string;
  slug?: string;
  color?: string;
}

export interface AdminCustomerCategoryValue {
  _id?: string;
  name?: string;
  slug?: string;
  color?: string;
}

export interface AdminCustomerItem {
  _id: string;
  slug?: string;
  title: string;
  description: string;
  isPublicCase?: boolean;
  imageUrl?: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  isPublished: boolean;
  categoryId?: string | AdminCustomerCategoryValue;
  categoryName?: string;
  categorySlug?: string;
  deletedAt?: string | Date | null;
  deletedSource?: 'admin' | 'agent' | null;
  likesCount?: number;
  usageCount?: number;
  helpfulCount?: number;
  unhelpfulCount?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AdminCustomerListData {
  items: AdminCustomerItem[];
  total: number;
}
