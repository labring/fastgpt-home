import type { Solution } from '@/customers/components/SolutionCard';
import {
  DEFAULT_PUBLIC_SOLUTION_SORT_KEY,
  PUBLIC_SOLUTIONS_PAGE_SIZE
} from '@/customers/lib/solution-pagination';
import type { SolutionSortKey } from '@/customers/lib/solution-search';
import { withBasePath } from '@/customers/lib/base-path';

export interface SolutionsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SolutionsPageData {
  solutions: Solution[];
  pagination: SolutionsPagination;
}

interface StoredSolutionsCacheEntry {
  criteriaKey: string;
  data: SolutionsPageData;
  savedAt: number;
}

interface StoredSolutionsCachePayload {
  entries: StoredSolutionsCacheEntry[];
}

interface SolutionsRequestOptions {
  category: string;
  search: string;
  sortBy: SolutionSortKey;
  page: number;
}

export const HOME_SOLUTIONS_SESSION_CACHE_KEY = 'fastgpt:home-solutions-cache:v1';
export const HOME_SOLUTIONS_SESSION_CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 6;
const HOME_SOLUTIONS_SESSION_CACHE_MAX_ENTRIES = 12;

export function buildSolutionsRequestUrl({ category, search, sortBy, page }: SolutionsRequestOptions) {
  const params = new URLSearchParams({
    limit: String(PUBLIC_SOLUTIONS_PAGE_SIZE),
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

export function getSolutionsCriteriaKey(category: string, search: string, sortBy: SolutionSortKey) {
  return `${category}::${search.trim()}::${sortBy}`;
}

function getHomeSolutionsSessionStorage() {
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

function isSolution(value: unknown): value is Solution {
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

function isSolutionsPagination(value: unknown): value is SolutionsPagination {
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

export function isSolutionsPageData(value: unknown): value is SolutionsPageData {
  if (!isPlainObject(value)) {
    return false;
  }

  return Array.isArray(value.solutions) &&
    value.solutions.every(isSolution) &&
    isSolutionsPagination(value.pagination);
}

function isStoredSolutionsCacheEntry(value: unknown): value is StoredSolutionsCacheEntry {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    typeof value.criteriaKey === 'string' &&
    isSolutionsPageData(value.data) &&
    typeof value.savedAt === 'number' &&
    Number.isFinite(value.savedAt)
  );
}

export function readStoredSolutionsCacheEntries(): StoredSolutionsCacheEntry[] {
  const storage = getHomeSolutionsSessionStorage();

  if (!storage) {
    return [];
  }

  const rawPayload = storage.getItem(HOME_SOLUTIONS_SESSION_CACHE_KEY);

  if (!rawPayload) {
    return [];
  }

  try {
    const parsedPayload = JSON.parse(rawPayload) as Partial<StoredSolutionsCachePayload>;
    const entries = Array.isArray(parsedPayload.entries) ? parsedPayload.entries : [];
    const now = Date.now();

    return entries.filter((entry): entry is StoredSolutionsCacheEntry => {
      return isStoredSolutionsCacheEntry(entry) &&
        now - entry.savedAt <= HOME_SOLUTIONS_SESSION_CACHE_MAX_AGE_MS;
    });
  } catch {
    storage.removeItem(HOME_SOLUTIONS_SESSION_CACHE_KEY);
    return [];
  }
}

export function readStoredSolutionsData(criteriaKey: string) {
  return readStoredSolutionsCacheEntries().find((entry) => entry.criteriaKey === criteriaKey)?.data || null;
}

function shouldPersistSolutionsData(data: SolutionsPageData) {
  return data.pagination.page > 1;
}

export function writeStoredSolutionsData(criteriaKey: string, data: SolutionsPageData) {
  const storage = getHomeSolutionsSessionStorage();

  if (!storage) {
    return;
  }

  const entries = readStoredSolutionsCacheEntries()
    .filter((entry) => entry.criteriaKey !== criteriaKey);

  if (shouldPersistSolutionsData(data)) {
    entries.push({
      criteriaKey,
      data,
      savedAt: Date.now()
    });
  }

  try {
    storage.setItem(HOME_SOLUTIONS_SESSION_CACHE_KEY, JSON.stringify({
      entries: entries.slice(-HOME_SOLUTIONS_SESSION_CACHE_MAX_ENTRIES)
    }));
  } catch {
    // Storage can be full or unavailable in private contexts; the in-memory cache still works.
  }
}

export function isMoreCompleteSolutionsData(candidate: SolutionsPageData, current: SolutionsPageData) {
  return candidate.pagination.page > current.pagination.page ||
    (
      candidate.pagination.page === current.pagination.page &&
      candidate.solutions.length > current.solutions.length
    );
}

export function mergeFreshSolutionsPageData(
  freshData: SolutionsPageData,
  cachedData: SolutionsPageData
): SolutionsPageData {
  const freshIds = new Set(freshData.solutions.map((solution) => String(solution.id)));
  const cachedTail = cachedData.solutions.filter(
    (solution) => !freshIds.has(String(solution.id))
  );

  return {
    solutions: [...freshData.solutions, ...cachedTail],
    pagination: {
      ...freshData.pagination,
      page: Math.max(freshData.pagination.page, cachedData.pagination.page),
      limit: freshData.pagination.limit,
      total: freshData.pagination.total,
      totalPages: freshData.pagination.totalPages
    }
  };
}

export function normalizeSortBy(value: string | null | undefined): SolutionSortKey {
  return value === 'likes' || value === 'time' ? value : DEFAULT_PUBLIC_SOLUTION_SORT_KEY;
}

export function mergeSolutionsPageData(previous: SolutionsPageData, nextData: SolutionsPageData): SolutionsPageData {
  const existingIds = new Set(previous.solutions.map((solution) => String(solution.id)));
  const appendedSolutions = nextData.solutions.filter(
    (solution) => !existingIds.has(String(solution.id))
  );

  return {
    solutions: [...previous.solutions, ...appendedSolutions],
    pagination: nextData.pagination
  };
}

export function applySolutionLikeState(
  data: SolutionsPageData,
  id: string | number,
  state?: { isLiked: boolean; likes: number }
): SolutionsPageData {
  return {
    ...data,
    solutions: data.solutions.map((solution) => {
      if (solution.id !== id) {
        return solution;
      }

      if (state) {
        return {
          ...solution,
          isLiked: state.isLiked,
          likes: state.likes
        };
      }

      if (solution.isLiked) {
        return solution;
      }

      return {
        ...solution,
        isLiked: true,
        likes: solution.likes
      };
    })
  };
}

export function patchSolutionInteractionState(
  data: SolutionsPageData,
  id: string | number,
  patch: Pick<Partial<Solution>, 'usage' | 'rawUsageCount' | 'hasViewed' | 'likes' | 'isLiked'>
): SolutionsPageData {
  return {
    ...data,
    solutions: data.solutions.map((solution) => (
      String(solution.id) === String(id)
        ? { ...solution, ...patch }
        : solution
    ))
  };
}
