import type { AdminSolutionItem } from './types';

export function getAdminSolutionCategoryId(item: AdminSolutionItem) {
  const categoryValue = item.categoryId;

  if (typeof categoryValue === 'string') {
    return categoryValue;
  }

  return categoryValue?._id || item.categoryName || 'all';
}

export function getAdminSolutionCategorySlug(item: AdminSolutionItem) {
  if (item.categorySlug) {
    return item.categorySlug;
  }

  if (typeof item.categoryId === 'string') {
    return item.categoryName || 'all';
  }

  return item.categoryId?.slug || item.categoryName || 'all';
}

export function getAdminSolutionCategoryName(item: AdminSolutionItem) {
  if (typeof item.categoryId === 'string') {
    return item.categoryName;
  }

  return item.categoryId?.name || item.categoryName;
}

export function getAdminSolutionCategoryColor(item: AdminSolutionItem) {
  if (typeof item.categoryId === 'string') {
    return undefined;
  }

  return item.categoryId?.color;
}

export function getAdminFeedbackStats(item: AdminSolutionItem) {
  const helpfulCount = item.helpfulCount || 0;
  const unhelpfulCount = item.unhelpfulCount || 0;
  const isWarning = unhelpfulCount > helpfulCount && unhelpfulCount > 0;

  return {
    helpfulCount,
    unhelpfulCount,
    isWarning
  };
}
