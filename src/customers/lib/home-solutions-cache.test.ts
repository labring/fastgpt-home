import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  HOME_SOLUTIONS_SESSION_CACHE_KEY,
  HOME_SOLUTIONS_SESSION_CACHE_MAX_AGE_MS,
  applySolutionLikeState,
  buildSolutionsRequestUrl,
  getSolutionsCriteriaKey,
  mergeFreshSolutionsPageData,
  mergeSolutionsPageData,
  normalizeSortBy,
  patchSolutionInteractionState,
  readStoredSolutionsData,
  writeStoredSolutionsData,
  type SolutionsPageData
} from './home-solutions-cache';

function createData(page: number, ids: Array<string | number>): SolutionsPageData {
  return {
    solutions: ids.map((id) => ({
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

describe('home solutions cache helpers', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useRealTimers();
  });

  it('builds stable request URLs and criteria keys', () => {
    expect(buildSolutionsRequestUrl({
      category: 'finance',
      search: ' 报告 ',
      sortBy: 'usage',
      page: 2
    })).toBe('/customers/api/customers?limit=15&page=2&sortBy=usage&category=finance&search=%E6%8A%A5%E5%91%8A');

    expect(getSolutionsCriteriaKey('all', '  客服  ', 'usage')).toBe('all::客服::usage');
    expect(normalizeSortBy('usage')).toBe('usage');
    expect(normalizeSortBy('bad')).toBe('usage');
  });

  it('does not persist first-page data but persists loaded-more data', () => {
    const criteriaKey = getSolutionsCriteriaKey('all', '', 'likes');
    writeStoredSolutionsData(criteriaKey, createData(1, ['a']));
    expect(readStoredSolutionsData(criteriaKey)).toBeNull();

    writeStoredSolutionsData(criteriaKey, createData(2, ['a', 'b']));
    expect(readStoredSolutionsData(criteriaKey)?.solutions.map((item) => item.id)).toEqual(['a', 'b']);
  });

  it('drops invalid or expired cache payloads', () => {
    const criteriaKey = getSolutionsCriteriaKey('all', '', 'likes');
    sessionStorage.setItem(HOME_SOLUTIONS_SESSION_CACHE_KEY, '{bad json');
    expect(readStoredSolutionsData(criteriaKey)).toBeNull();
    expect(sessionStorage.getItem(HOME_SOLUTIONS_SESSION_CACHE_KEY)).toBeNull();

    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    sessionStorage.setItem(HOME_SOLUTIONS_SESSION_CACHE_KEY, JSON.stringify({
      entries: [{
        criteriaKey,
        data: createData(2, ['old']),
        savedAt: Date.now() - HOME_SOLUTIONS_SESSION_CACHE_MAX_AGE_MS - 1
      }]
    }));

    expect(readStoredSolutionsData(criteriaKey)).toBeNull();
  });

  it('merges paginated data without duplicating existing solutions', () => {
    const merged = mergeSolutionsPageData(createData(1, ['a', 'b']), createData(2, ['b', 'c']));
    expect(merged.solutions.map((solution) => solution.id)).toEqual(['a', 'b', 'c']);
    expect(merged.pagination.page).toBe(2);
  });

  it('keeps fresh first-page values when merging a stale multi-page cache', () => {
    const freshData = {
      ...createData(1, ['a', 'b']),
      solutions: createData(1, ['a', 'b']).solutions.map((solution) => (
        solution.id === 'a'
          ? { ...solution, usage: '14', rawUsageCount: 14, title: '新标题' }
          : solution
      ))
    };
    const staleCachedData = {
      ...createData(2, ['a', 'b', 'c']),
      solutions: createData(2, ['a', 'b', 'c']).solutions.map((solution) => (
        solution.id === 'a'
          ? { ...solution, usage: '11', rawUsageCount: 11, title: '旧标题' }
          : solution
      ))
    };

    const merged = mergeFreshSolutionsPageData(freshData, staleCachedData);

    expect(merged.solutions.map((solution) => solution.id)).toEqual(['a', 'b', 'c']);
    expect(merged.solutions[0]).toMatchObject({
      id: 'a',
      usage: '14',
      rawUsageCount: 14,
      title: '新标题'
    });
    expect(merged.pagination.page).toBe(2);
  });

  it('applies like-once visual and server-confirmed like states', () => {
    const data = createData(1, ['a']);
    const liked = applySolutionLikeState(data, 'a');
    expect(liked.solutions[0]).toMatchObject({ isLiked: true, likes: 1 });

    const alreadyLiked = applySolutionLikeState({
      ...data,
      solutions: [{ ...data.solutions[0], isLiked: true, likes: 2 }]
    }, 'a');
    expect(alreadyLiked.solutions[0]).toMatchObject({ isLiked: true, likes: 2 });

    const confirmed = applySolutionLikeState(data, 'a', { isLiked: true, likes: 12 });
    expect(confirmed.solutions[0]).toMatchObject({ isLiked: true, likes: 12 });
  });

  it('patches interaction state without changing unrelated solutions', () => {
    const data = createData(1, ['a', 'b']);

    const patched = patchSolutionInteractionState(data, 'a', {
      usage: '14',
      rawUsageCount: 14,
      hasViewed: true
    });

    expect(patched.solutions[0]).toMatchObject({
      id: 'a',
      usage: '14',
      rawUsageCount: 14,
      hasViewed: true
    });
    expect(patched.solutions[1]).toEqual(data.solutions[1]);
  });
});
