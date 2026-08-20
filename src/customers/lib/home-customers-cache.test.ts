import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  HOME_CUSTOMERS_SESSION_CACHE_KEY,
  HOME_CUSTOMERS_SESSION_CACHE_MAX_AGE_MS,
  applyCustomerLikeState,
  buildCustomersRequestUrl,
  getCustomersCriteriaKey,
  mergeFreshCustomersPageData,
  mergeCustomersPageData,
  normalizeSortBy,
  patchCustomerInteractionState,
  readStoredCustomersData,
  writeStoredCustomersData,
  type CustomersPageData
} from './home-customers-cache';

function createData(page: number, ids: Array<string | number>): CustomersPageData {
  return {
    customers: ids.map((id) => ({
      id,
      categoryId: 'cat',
      categoryName: '分类',
      categorySlug: 'category',
      categoryColor: '#0052d9',
      title: `方案 ${id}`,
      description: 'desc',
      imageUrl: '/image.png',
      thumbnailUrl: '/thumb.png',
      likes: 1,
      usage: '100',
      rawUsageCount: 100,
      hasViewed: false,
      createdAt: '2026-01-01T00:00:00.000Z'
    })),
    pagination: {
      total: ids.length,
      page,
      limit: 9,
      totalPages: Math.max(page, 1)
    }
  };
}

describe('home customers cache helpers', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useRealTimers();
  });

  it('builds stable request URLs and criteria keys', () => {
    expect(buildCustomersRequestUrl({
      category: 'finance',
      search: ' 报告 ',
      sortBy: 'usage',
      page: 2
    })).toBe('/customers/api/customers?limit=15&page=2&sortBy=usage&category=finance&search=%E6%8A%A5%E5%91%8A');

    expect(getCustomersCriteriaKey('all', '  客服  ', 'usage')).toBe('all::客服::usage');
    expect(normalizeSortBy('usage')).toBe('usage');
    expect(normalizeSortBy('bad')).toBe('usage');
  });

  it('does not persist first-page data but persists loaded-more data', () => {
    const criteriaKey = getCustomersCriteriaKey('all', '', 'likes');
    writeStoredCustomersData(criteriaKey, createData(1, ['a']));
    expect(readStoredCustomersData(criteriaKey)).toBeNull();

    writeStoredCustomersData(criteriaKey, createData(2, ['a', 'b']));
    expect(readStoredCustomersData(criteriaKey)?.customers.map((item) => item.id)).toEqual(['a', 'b']);
  });

  it('drops invalid or expired cache payloads', () => {
    const criteriaKey = getCustomersCriteriaKey('all', '', 'likes');
    sessionStorage.setItem(HOME_CUSTOMERS_SESSION_CACHE_KEY, '{bad json');
    expect(readStoredCustomersData(criteriaKey)).toBeNull();
    expect(sessionStorage.getItem(HOME_CUSTOMERS_SESSION_CACHE_KEY)).toBeNull();

    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    sessionStorage.setItem(HOME_CUSTOMERS_SESSION_CACHE_KEY, JSON.stringify({
      entries: [{
        criteriaKey,
        data: createData(2, ['old']),
        savedAt: Date.now() - HOME_CUSTOMERS_SESSION_CACHE_MAX_AGE_MS - 1
      }]
    }));

    expect(readStoredCustomersData(criteriaKey)).toBeNull();
  });

  it('merges paginated data without duplicating existing customers', () => {
    const merged = mergeCustomersPageData(createData(1, ['a', 'b']), createData(2, ['b', 'c']));
    expect(merged.customers.map((customer) => customer.id)).toEqual(['a', 'b', 'c']);
    expect(merged.pagination.page).toBe(2);
  });

  it('keeps fresh first-page values when merging a stale multi-page cache', () => {
    const freshData = {
      ...createData(1, ['a', 'b']),
      customers: createData(1, ['a', 'b']).customers.map((customer) => (
        customer.id === 'a'
          ? { ...customer, usage: '14', rawUsageCount: 14, title: '新标题' }
          : customer
      ))
    };
    const staleCachedData = {
      ...createData(2, ['a', 'b', 'c']),
      customers: createData(2, ['a', 'b', 'c']).customers.map((customer) => (
        customer.id === 'a'
          ? { ...customer, usage: '11', rawUsageCount: 11, title: '旧标题' }
          : customer
      ))
    };

    const merged = mergeFreshCustomersPageData(freshData, staleCachedData);

    expect(merged.customers.map((customer) => customer.id)).toEqual(['a', 'b', 'c']);
    expect(merged.customers[0]).toMatchObject({
      id: 'a',
      usage: '14',
      rawUsageCount: 14,
      title: '新标题'
    });
    expect(merged.pagination.page).toBe(2);
  });

  it('applies like-once visual and server-confirmed like states', () => {
    const data = createData(1, ['a']);
    const liked = applyCustomerLikeState(data, 'a');
    expect(liked.customers[0]).toMatchObject({ isLiked: true, likes: 1 });

    const alreadyLiked = applyCustomerLikeState({
      ...data,
      customers: [{ ...data.customers[0], isLiked: true, likes: 2 }]
    }, 'a');
    expect(alreadyLiked.customers[0]).toMatchObject({ isLiked: true, likes: 2 });

    const confirmed = applyCustomerLikeState(data, 'a', { isLiked: true, likes: 12 });
    expect(confirmed.customers[0]).toMatchObject({ isLiked: true, likes: 12 });
  });

  it('patches interaction state without changing unrelated customers', () => {
    const data = createData(1, ['a', 'b']);

    const patched = patchCustomerInteractionState(data, 'a', {
      usage: '14',
      rawUsageCount: 14,
      hasViewed: true
    });

    expect(patched.customers[0]).toMatchObject({
      id: 'a',
      usage: '14',
      rawUsageCount: 14,
      hasViewed: true
    });
    expect(patched.customers[1]).toEqual(data.customers[1]);
  });
});
