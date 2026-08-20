import type { Customer } from '@/customers/components/CustomerCard';
import {
  DEFAULT_PUBLIC_CUSTOMER_SORT_KEY,
  PUBLIC_CUSTOMERS_PAGE_SIZE
} from '@/customers/lib/customer-pagination';
import type { CustomerSortKey } from '@/customers/lib/customer-search';
import { withBasePath } from '@/customers/lib/base-path';

export interface CustomersPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CustomersPageData {
  customers: Customer[];
  pagination: CustomersPagination;
}

interface StoredCustomersCacheEntry {
  criteriaKey: string;
  data: CustomersPageData;
  savedAt: number;
}

interface StoredCustomersCachePayload {
  entries: StoredCustomersCacheEntry[];
}

interface CustomersRequestOptions {
  category: string;
  search: string;
  sortBy: CustomerSortKey;
  page: number;
}

export const HOME_CUSTOMERS_SESSION_CACHE_KEY = 'fastgpt:home-customers-cache:v1';
export const HOME_CUSTOMERS_SESSION_CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 6;
const HOME_CUSTOMERS_SESSION_CACHE_MAX_ENTRIES = 12;

export function buildCustomersRequestUrl({ category, search, sortBy, page }: CustomersRequestOptions) {
  const params = new URLSearchParams({
    limit: String(PUBLIC_CUSTOMERS_PAGE_SIZE),
    page: String(page),
    sortBy
  });
  const trimmedSearchQuery = search.trim();

  if (category !== 'all') {
    params.set('category', category);
  }

  if (trimmedSearchQuery) {
    params.set('search', trimmedSearchQuery);
  }

  return withBasePath(`/api/customers?${params.toString()}`);
}

export function getCustomersCriteriaKey(category: string, search: string, sortBy: CustomerSortKey) {
  return `${category}::${search.trim()}::${sortBy}`;
}

function getHomeCustomersSessionStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isNonNegativeInteger(value: unknown) {
  return Number.isInteger(value) && Number(value) >= 0;
}

function isPositiveInteger(value: unknown) {
  return Number.isInteger(value) && Number(value) > 0;
}

function isCustomer(value: unknown): value is Customer {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    (typeof value.id === 'string' || typeof value.id === 'number') &&
    typeof value.categoryId === 'string' &&
    typeof value.categoryName === 'string' &&
    (typeof value.categorySlug === 'undefined' || typeof value.categorySlug === 'string') &&
    (typeof value.categoryColor === 'undefined' || typeof value.categoryColor === 'string') &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    typeof value.imageUrl === 'string' &&
    typeof value.thumbnailUrl === 'string' &&
    (typeof value.freeUseUrl === 'undefined' || typeof value.freeUseUrl === 'string') &&
    typeof value.likes === 'number' &&
    Number.isFinite(value.likes) &&
    typeof value.usage === 'string' &&
    (typeof value.rawUsageCount === 'undefined' || isNonNegativeInteger(value.rawUsageCount)) &&
    (typeof value.isLiked === 'undefined' || typeof value.isLiked === 'boolean') &&
    (typeof value.hasViewed === 'undefined' || typeof value.hasViewed === 'boolean') &&
    typeof value.createdAt === 'string'
  );
}

function isCustomersPagination(value: unknown): value is CustomersPagination {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    isNonNegativeInteger(value.total) &&
    isPositiveInteger(value.page) &&
    isPositiveInteger(value.limit) &&
    isNonNegativeInteger(value.totalPages)
  );
}

export function isCustomersPageData(value: unknown): value is CustomersPageData {
  if (!isPlainObject(value)) {
    return false;
  }

  return Array.isArray(value.customers) &&
    value.customers.every(isCustomer) &&
    isCustomersPagination(value.pagination);
}

function isStoredCustomersCacheEntry(value: unknown): value is StoredCustomersCacheEntry {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    typeof value.criteriaKey === 'string' &&
    isCustomersPageData(value.data) &&
    typeof value.savedAt === 'number' &&
    Number.isFinite(value.savedAt)
  );
}

export function readStoredCustomersCacheEntries(): StoredCustomersCacheEntry[] {
  const storage = getHomeCustomersSessionStorage();

  if (!storage) {
    return [];
  }

  const rawPayload = storage.getItem(HOME_CUSTOMERS_SESSION_CACHE_KEY);

  if (!rawPayload) {
    return [];
  }

  try {
    const parsedPayload = JSON.parse(rawPayload) as Partial<StoredCustomersCachePayload>;
    const entries = Array.isArray(parsedPayload.entries) ? parsedPayload.entries : [];
    const now = Date.now();

    return entries.filter((entry): entry is StoredCustomersCacheEntry => {
      return isStoredCustomersCacheEntry(entry) &&
        now - entry.savedAt <= HOME_CUSTOMERS_SESSION_CACHE_MAX_AGE_MS;
    });
  } catch {
    storage.removeItem(HOME_CUSTOMERS_SESSION_CACHE_KEY);
    return [];
  }
}

export function readStoredCustomersData(criteriaKey: string) {
  return readStoredCustomersCacheEntries().find((entry) => entry.criteriaKey === criteriaKey)?.data || null;
}

function shouldPersistCustomersData(data: CustomersPageData) {
  return data.pagination.page > 1;
}

export function writeStoredCustomersData(criteriaKey: string, data: CustomersPageData) {
  const storage = getHomeCustomersSessionStorage();

  if (!storage) {
    return;
  }

  const entries = readStoredCustomersCacheEntries()
    .filter((entry) => entry.criteriaKey !== criteriaKey);

  if (shouldPersistCustomersData(data)) {
    entries.push({
      criteriaKey,
      data,
      savedAt: Date.now()
    });
  }

  try {
    storage.setItem(HOME_CUSTOMERS_SESSION_CACHE_KEY, JSON.stringify({
      entries: entries.slice(-HOME_CUSTOMERS_SESSION_CACHE_MAX_ENTRIES)
    }));
  } catch {
    // Storage can be full or unavailable in private contexts; the in-memory cache still works.
  }
}

export function isMoreCompleteCustomersData(candidate: CustomersPageData, current: CustomersPageData) {
  return candidate.pagination.page > current.pagination.page ||
    (
      candidate.pagination.page === current.pagination.page &&
      candidate.customers.length > current.customers.length
    );
}

export function mergeFreshCustomersPageData(
  freshData: CustomersPageData,
  cachedData: CustomersPageData
): CustomersPageData {
  const freshIds = new Set(freshData.customers.map((customer) => String(customer.id)));
  const cachedTail = cachedData.customers.filter(
    (customer) => !freshIds.has(String(customer.id))
  );

  return {
    customers: [...freshData.customers, ...cachedTail],
    pagination: {
      ...freshData.pagination,
      page: Math.max(freshData.pagination.page, cachedData.pagination.page),
      limit: freshData.pagination.limit,
      total: freshData.pagination.total,
      totalPages: freshData.pagination.totalPages
    }
  };
}

export function normalizeSortBy(value: string | null | undefined): CustomerSortKey {
  return value === 'likes' || value === 'time' ? value : DEFAULT_PUBLIC_CUSTOMER_SORT_KEY;
}

export function mergeCustomersPageData(previous: CustomersPageData, nextData: CustomersPageData): CustomersPageData {
  const existingIds = new Set(previous.customers.map((customer) => String(customer.id)));
  const appendedCustomers = nextData.customers.filter(
    (customer) => !existingIds.has(String(customer.id))
  );

  return {
    customers: [...previous.customers, ...appendedCustomers],
    pagination: nextData.pagination
  };
}

export function applyCustomerLikeState(
  data: CustomersPageData,
  id: string | number,
  state?: { isLiked: boolean; likes: number }
): CustomersPageData {
  return {
    ...data,
    customers: data.customers.map((customer) => {
      if (customer.id !== id) {
        return customer;
      }

      if (state) {
        return {
          ...customer,
          isLiked: state.isLiked,
          likes: state.likes
        };
      }

      if (customer.isLiked) {
        return customer;
      }

      return {
        ...customer,
        isLiked: true,
        likes: customer.likes
      };
    })
  };
}

export function patchCustomerInteractionState(
  data: CustomersPageData,
  id: string | number,
  patch: Pick<Partial<Customer>, 'usage' | 'rawUsageCount' | 'hasViewed' | 'likes' | 'isLiked'>
): CustomersPageData {
  return {
    ...data,
    customers: data.customers.map((customer) => (
      String(customer.id) === String(id)
        ? { ...customer, ...patch }
        : customer
    ))
  };
}
