import { pinyinIncludes } from '@/customers/lib/pinyin';
import { parseCompactCount } from '@/customers/lib/counts';
import { withBasePath } from '@/customers/lib/base-path';
import type { PublicCustomerSortKey } from '@/customers/lib/customer-pagination';
import type { CustomerCardData } from '@/customers/types/customer';

export interface CategoryOption {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

export type CustomerSortKey = PublicCustomerSortKey;
export type AdminCustomerSortKey = CustomerSortKey | 'updated' | 'draft';
export const DEFAULT_ADMIN_CUSTOMER_SORT_KEY: AdminCustomerSortKey = 'updated';

export type SortOptionIcon = 'Heart' | 'Eye' | 'Clock' | 'PencilSimple' | 'FileDashed';

export interface SortOption<TSortKey extends string = CustomerSortKey> {
  id: TSortKey;
  label: string;
  icon: SortOptionIcon;
  color: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { id: 'usage', label: '最高人气', icon: 'Eye', color: 'text-blue-500' },
  { id: 'likes', label: '最多点赞', icon: 'Heart', color: 'text-red-500' },
  { id: 'time', label: '最新上传', icon: 'Clock', color: 'text-green-500' }
];

export const ADMIN_SORT_OPTIONS: SortOption<AdminCustomerSortKey>[] = [
  { id: 'updated', label: '最近编辑', icon: 'PencilSimple', color: 'text-amber-500' },
  { id: 'time', label: '最新上传', icon: 'Clock', color: 'text-green-500' },
  { id: 'draft', label: '草稿', icon: 'FileDashed', color: 'text-zinc-500' },
  { id: 'usage', label: '最高人气', icon: 'Eye', color: 'text-blue-500' },
  { id: 'likes', label: '最多点赞', icon: 'Heart', color: 'text-red-500' }
];

export function isAdminCustomerSortKey(value: string | null | undefined): value is AdminCustomerSortKey {
  return ADMIN_SORT_OPTIONS.some((option) => option.id === value);
}

export function normalizeAdminCustomerSortBy(value: string | null | undefined): AdminCustomerSortKey {
  return isAdminCustomerSortKey(value) ? value : DEFAULT_ADMIN_CUSTOMER_SORT_KEY;
}

function getTimestamp(value: string | Date | undefined) {
  return value ? new Date(value).getTime() : 0;
}

export interface SmartSearchResult {
  matched_case: string | null;
  matched_customer?: {
    id: string;
    _id: string;
    title: string;
    categorySlug?: string;
    isPublished?: boolean;
  } | null;
  error?: string;
}

export class SmartSearchRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'SmartSearchRequestError';
    this.status = status;
  }
}

export const SMART_SEARCH_EMPTY_DESCRIPTION =
  '您可以尝试输入如“房地产”、“客服”、“金融”等词汇';

export function normalizeCategoryOptions(
  rawCategories: Array<{ id?: string; _id?: string; name: string; slug?: string; color?: string }> | undefined,
  fallbackCategories: CategoryOption[]
): CategoryOption[] {
  let normalizedList: CategoryOption[] = [];

  if (rawCategories && rawCategories.length > 0) {
    normalizedList = rawCategories.map((category) => ({
      id: category.id || category._id || '',
      name: category.name,
      slug: category.slug,
      color: category.color
    }));
  } else {
    normalizedList = fallbackCategories;
  }

  return [{ id: 'all', name: '全部' }, ...normalizedList];
}

export function matchesCustomerSearch(
  title: string,
  description: string,
  rawQuery: string
) {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  return (
    pinyinIncludes(title, query) ||
    pinyinIncludes(description, query)
  );
}

export function filterPublicCustomers(
  customers: CustomerCardData[],
  currentCategory: string,
  searchQuery: string,
  sortBy: CustomerSortKey
) {
  return customers
    .filter((customer) => {
      const matchesCategory =
        currentCategory === 'all' ||
        customer.categorySlug === currentCategory ||
        customer.categoryName === currentCategory;

      return (
        matchesCategory &&
        matchesCustomerSearch(customer.title, customer.description, searchQuery)
      );
    })
    .sort((left, right) => {
      if (sortBy === 'likes') {
        return right.likes - left.likes;
      }

      if (sortBy === 'usage') {
        return parseCompactCount(right.usage) - parseCompactCount(left.usage);
      }

      if (sortBy === 'time') {
        return (
          new Date(right.createdAt).getTime() -
          new Date(left.createdAt).getTime()
        );
      }

      return 0;
    });
}

export function filterAdminCustomers<
  T extends {
    title?: string;
    description?: string;
    categoryId?: string | { _id?: string; name?: string; slug?: string };
    categoryName?: string;
    categorySlug?: string;
    likesCount?: number;
    usageCount?: number | string;
    isPublished?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }
>(items: T[], currentCategory: string, searchQuery: string, sortBy = DEFAULT_ADMIN_CUSTOMER_SORT_KEY) {
  return items.filter((item) => {
    const itemCategoryName =
      typeof item.categoryId === 'object'
        ? item.categoryId?.name
        : item.categoryName;
    const itemCategoryId =
      typeof item.categoryId === 'string'
        ? item.categoryId
        : item.categoryId?._id;
    const itemCategorySlug =
      item.categorySlug ||
      (typeof item.categoryId === 'object' ? item.categoryId?.slug : undefined);

    const matchesCategory =
      currentCategory === 'all' ||
      itemCategorySlug === currentCategory ||
      itemCategoryId === currentCategory ||
      itemCategoryName === currentCategory;

    const matchesStatus = sortBy !== 'draft' || item.isPublished === false;

    return (
      matchesCategory &&
      matchesStatus &&
      matchesCustomerSearch(
        item.title || '',
        item.description || '',
        searchQuery
      )
    );
  }).sort((left, right) => {
    if (sortBy === 'likes') {
      return (right.likesCount || 0) - (left.likesCount || 0);
    }

    if (sortBy === 'usage') {
      const rightUsage = typeof right.usageCount === 'string' ? parseCompactCount(right.usageCount) : (right.usageCount || 0);
      const leftUsage = typeof left.usageCount === 'string' ? parseCompactCount(left.usageCount) : (left.usageCount || 0);
      return rightUsage - leftUsage;
    }

    if (sortBy === 'time') {
      return getTimestamp(right.createdAt) - getTimestamp(left.createdAt);
    }

    if (sortBy === 'updated') {
      return getTimestamp(right.updatedAt || right.createdAt) - getTimestamp(left.updatedAt || left.createdAt);
    }

    return 0;
  });
}

export async function requestSmartSearchMatch(
  query: string,
  options: { scope?: 'public' | 'admin' } = {}
) {
  const response = await fetch(withBasePath('/api/smart-search'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, scope: options.scope || 'public' })
  });

  const data = (await response.json()) as SmartSearchResult;

  if (!response.ok) {
    throw new SmartSearchRequestError(data.error || '智能搜索请求失败', response.status);
  }

  return data;
}

export async function fetchFirstMatchedCustomer<T = unknown>(search: string) {
  const response = await fetch(
    withBasePath(`/api/customers?search=${encodeURIComponent(search)}&limit=1`)
  );
  const data = await response.json();

  if (data.customers && data.customers.length > 0) {
    return data.customers[0] as T;
  }

  return null;
}
