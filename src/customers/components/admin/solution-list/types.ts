export interface AdminCategory {
  _id: string;
  name: string;
  slug?: string;
  color?: string;
}

export interface AdminSolutionCategoryValue {
  _id?: string;
  name?: string;
  slug?: string;
  color?: string;
}

export interface AdminSolutionItem {
  _id: string;
  slug?: string;
  title: string;
  description: string;
  contentType?: 'solution' | 'case';
  imageUrl?: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  isPublished: boolean;
  categoryId?: string | AdminSolutionCategoryValue;
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

export interface AdminSolutionListData {
  items: AdminSolutionItem[];
  total: number;
}
