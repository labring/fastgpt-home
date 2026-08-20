import type { AdminCustomerItem } from './types';

export function getAdminCustomerCategorySlug(item: AdminCustomerItem) {
  if (item.categorySlug) {
    return item.categorySlug;
  }

  if (typeof item.categoryId === 'string') {
    return item.categoryName || 'all';
  }

  return item.categoryId?.slug || item.categoryName || 'all';
}

export function getAdminCustomerCategoryName(item: AdminCustomerItem) {
  if (typeof item.categoryId === 'string') {
    return item.categoryName;
  }

  return item.categoryId?.name || item.categoryName;
}

export function getAdminCustomerCategoryColor(item: AdminCustomerItem) {
  if (typeof item.categoryId === 'string') {
    return undefined;
  }

  return item.categoryId?.color;
}

export function getAdminFeedbackStats(item: AdminCustomerItem) {
  const helpfulCount = item.helpfulCount || 0;
  const unhelpfulCount = item.unhelpfulCount || 0;
  const isWarning = unhelpfulCount > helpfulCount && unhelpfulCount > 0;

  return {
    helpfulCount,
    unhelpfulCount,
    isWarning
  };
}
