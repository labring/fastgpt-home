export interface SolutionCardData {
  id: string | number;
  slug?: string;
  categoryId: string;
  categoryName: string;
  categorySlug?: string;
  categoryColor?: string;
  contentType?: 'solution' | 'case';
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  freeUseUrl?: string;
  likes: number;
  usage: string;
  rawUsageCount?: number;
  isLiked?: boolean;
  hasViewed?: boolean;
  createdAt: string;
  updatedAt?: string;
}
