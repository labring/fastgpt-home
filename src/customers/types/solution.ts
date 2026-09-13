export interface SolutionCardData {
  id: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  categoryColor: string;
  contentType: 'solution' | 'case';
  hasContent: boolean;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  freeUseUrl: string;
  createdAt: string;
  updatedAt: string;
}
