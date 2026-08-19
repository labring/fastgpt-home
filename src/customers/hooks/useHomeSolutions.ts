'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import { toast } from 'sonner';
import type { Solution } from '@/customers/components/SolutionCard';
import { buildHomeHref } from '@/customers/lib/home-routing';
import {
  applySolutionLikeState,
  buildSolutionsRequestUrl,
  getSolutionsCriteriaKey,
  isMoreCompleteSolutionsData,
  mergeFreshSolutionsPageData,
  mergeSolutionsPageData,
  normalizeSortBy,
  patchSolutionInteractionState,
  readStoredSolutionsData,
  type SolutionsPageData,
  type SolutionsPagination,
  writeStoredSolutionsData
} from '@/customers/lib/home-solutions-cache';
import { DEFAULT_PUBLIC_SOLUTION_SORT_KEY } from '@/customers/lib/solution-pagination';
import { subscribeSolutionInteractionPatches } from '@/customers/lib/solution-interaction-events';
import {
  normalizeCategoryOptions,
  type SolutionSortKey
} from '@/customers/lib/solution-search';
import { useDebouncedValue } from '@/customers/hooks/useDebouncedValue';
import { withBasePath } from '@/customers/lib/base-path';
import {
  scheduleIdlePrefetch,
  scrollToElementWithNavbarOffset,
  warmSolutionImages
} from '@/customers/lib/home-solutions-browser';

export interface CategoryOption {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

interface UseHomeSolutionsInput {
  initialCategories: CategoryOption[];
  initialSolutions: Solution[];
  initialPagination: SolutionsPagination;
  initialCategorySlug?: string;
}

export function useHomeSolutions({
  initialCategories,
  initialSolutions,
  initialPagination,
  initialCategorySlug
}: UseHomeSolutionsInput) {
  const [currentCategory, setCurrentCategory] = useState(initialCategorySlug || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 220);
  const [sortBy, setSortBy] = useState<SolutionSortKey>(DEFAULT_PUBLIC_SOLUTION_SORT_KEY);
  const initialCriteriaKey = useMemo(
    () => getSolutionsCriteriaKey(initialCategorySlug || 'all', '', DEFAULT_PUBLIC_SOLUTION_SORT_KEY),
    [initialCategorySlug]
  );
  const [solutionsData, setSolutionsData] = useState<SolutionsPageData>({
    solutions: initialSolutions,
    pagination: initialPagination
  });
  const [displayedCriteriaKey, setDisplayedCriteriaKey] = useState(initialCriteriaKey);
  const [isSolutionsLoading, setIsSolutionsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [shouldPinSolutionsHash, setShouldPinSolutionsHash] = useState(false);
  const [isLocationStateReady, setIsLocationStateReady] = useState(false);
  const loadedCriteriaKeyRef = useRef(initialCriteriaKey);
  const latestSolutionsRequestRef = useRef(0);
  const forceRefreshCriteriaRef = useRef<Set<string>>(new Set());
  const hasRevalidatedInitialCriteriaRef = useRef(false);
  const solutionsCacheRef = useRef<Map<string, SolutionsPageData>>(
    new Map([[initialCriteriaKey, { solutions: initialSolutions, pagination: initialPagination }]])
  );
  const inflightSolutionsRef = useRef<Map<string, Promise<SolutionsPageData>>>(new Map());
  const warmedImageUrlsRef = useRef<Set<string>>(new Set());
  const solutionsSectionRef = useRef<HTMLElement>(null);
  const pendingScrollTimeoutRef = useRef<number | null>(null);

  const getCachedSolutionsData = useCallback((criteriaKey: string) => {
    const cachedData = solutionsCacheRef.current.get(criteriaKey) || null;
    const storedData = readStoredSolutionsData(criteriaKey);

    if (!storedData || (cachedData && !isMoreCompleteSolutionsData(storedData, cachedData))) {
      return cachedData;
    }

    solutionsCacheRef.current.set(criteriaKey, storedData);
    warmSolutionImages(storedData.solutions, warmedImageUrlsRef.current);
    return storedData;
  }, []);

  const mergeWithFreshFirstPage = useCallback((criteriaKey: string, freshData: SolutionsPageData) => {
    const cachedData = solutionsCacheRef.current.get(criteriaKey);
    const storedData = readStoredSolutionsData(criteriaKey);
    const cachedCandidates = [cachedData, storedData].filter(
      (data): data is SolutionsPageData => Boolean(data)
    );
    const mostCompleteCachedData = cachedCandidates.reduce<SolutionsPageData | null>(
      (best, data) => (
        !best || isMoreCompleteSolutionsData(data, best)
          ? data
          : best
      ),
      null
    );

    return mostCompleteCachedData && isMoreCompleteSolutionsData(mostCompleteCachedData, freshData)
      ? mergeFreshSolutionsPageData(freshData, mostCompleteCachedData)
      : freshData;
  }, []);

  const { data: rawCategories } = useSWR(withBasePath('/api/categories'), {
    fallbackData: initialCategories,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000
  });

  const categories = useMemo(() => {
    return normalizeCategoryOptions(rawCategories, initialCategories);
  }, [rawCategories, initialCategories]);

  const solutions: Solution[] = useMemo(() => {
    return solutionsData.solutions;
  }, [solutionsData.solutions]);

  const solutionsPagination = solutionsData.pagination;
  const hasMoreSolutions = solutionsPagination.page < solutionsPagination.totalPages;
  const activeCriteriaKey = useMemo(
    () => getSolutionsCriteriaKey(currentCategory, debouncedSearchQuery, sortBy),
    [currentCategory, debouncedSearchQuery, sortBy]
  );
  const isShowingStaleSolutions = isSolutionsLoading && displayedCriteriaKey !== activeCriteriaKey;
  const isLoading = isSolutionsLoading && solutions.length === 0;

  const fetchSolutionsPage = useCallback(
    (
      category: string,
      search: string,
      nextSortBy: SolutionSortKey,
      page: number,
      options: { forceFresh?: boolean } = {}
    ) => {
      const criteriaKey = getSolutionsCriteriaKey(category, search, nextSortBy);
      const cacheKey = `${criteriaKey}::page=${page}${options.forceFresh ? '::fresh' : ''}`;
      const cachedData = !options.forceFresh && page === 1
        ? getCachedSolutionsData(criteriaKey)
        : null;

      if (cachedData) {
        return Promise.resolve(cachedData);
      }

      const inflightRequest = inflightSolutionsRef.current.get(cacheKey);

      if (inflightRequest) {
        return inflightRequest;
      }

      const request = fetch(buildSolutionsRequestUrl({
        category,
        search,
        sortBy: nextSortBy,
        page
      }), { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch solutions');
          }
          return response.json() as Promise<SolutionsPageData>;
        })
        .then((data) => {
          if (page === 1) {
            const mergedData = mergeWithFreshFirstPage(criteriaKey, data);
            solutionsCacheRef.current.set(criteriaKey, mergedData);
            writeStoredSolutionsData(criteriaKey, mergedData);
            warmSolutionImages(mergedData.solutions, warmedImageUrlsRef.current);
            return mergedData;
          }

          return data;
        })
        .finally(() => {
          inflightSolutionsRef.current.delete(cacheKey);
        });

      inflightSolutionsRef.current.set(cacheKey, request);
      return request;
    },
    [getCachedSolutionsData, mergeWithFreshFirstPage]
  );

  useEffect(() => {
    warmSolutionImages(initialSolutions, warmedImageUrlsRef.current);
  }, [initialSolutions]);

  const scrollToSolutionsSection = useCallback(() => {
    scrollToElementWithNavbarOffset(solutionsSectionRef.current);
  }, []);

  useEffect(() => {
    const syncStateFromLocation = (shouldScroll: boolean) => {
      const params = new URLSearchParams(window.location.search);
      const nextCategory = initialCategorySlug || params.get('category')?.trim() || 'all';
      const nextSearch = params.get('search')?.trim() || '';
      const nextSortBy = normalizeSortBy(params.get('sortBy')?.trim());
      const hasSolutionsSection =
        window.location.hash === '#customers' || nextCategory !== 'all' || Boolean(nextSearch);

      const frameId = window.requestAnimationFrame(() => {
        setCurrentCategory(nextCategory);
        setSearchQuery(nextSearch);
        setSortBy(nextSortBy);
        setShouldPinSolutionsHash(hasSolutionsSection);
        setIsLocationStateReady(true);
      });

      if (pendingScrollTimeoutRef.current) {
        window.clearTimeout(pendingScrollTimeoutRef.current);
      }

      if (shouldScroll && hasSolutionsSection) {
        pendingScrollTimeoutRef.current = window.setTimeout(() => {
          scrollToSolutionsSection();
        }, 100);
      }

      return frameId;
    };

    const initialFrameId = syncStateFromLocation(true);
    const handlePopState = () => {
      syncStateFromLocation(window.location.hash === '#customers');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.cancelAnimationFrame(initialFrameId);
      if (pendingScrollTimeoutRef.current) {
        window.clearTimeout(pendingScrollTimeoutRef.current);
      }
      window.removeEventListener('popstate', handlePopState);
    };
  }, [initialCategorySlug, scrollToSolutionsSection]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    const nextHref = buildHomeHref({
      categorySlug: currentCategory,
      search: searchQuery,
      sortBy,
      section: shouldPinSolutionsHash ? 'customers' : null
    });
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (!initialCategorySlug && currentHref !== nextHref) {
      window.history.replaceState(window.history.state, '', withBasePath(nextHref));
    }
  }, [currentCategory, searchQuery, sortBy, shouldPinSolutionsHash, isLocationStateReady, initialCategorySlug]);

  const applyCachedSolutions = useCallback((category: string, search: string, nextSortBy: SolutionSortKey) => {
    const criteriaKey = getSolutionsCriteriaKey(category, search, nextSortBy);
    const cachedData = getCachedSolutionsData(criteriaKey);

    if (!cachedData) {
      return false;
    }

    loadedCriteriaKeyRef.current = criteriaKey;
    setSolutionsData(cachedData);
    setDisplayedCriteriaKey(criteriaKey);
    setIsSolutionsLoading(false);
    setIsLoadingMore(false);
    return true;
  }, [getCachedSolutionsData]);

  const prefetchSolutions = useCallback(
    (category: string, search = '', nextSortBy = sortBy) => {
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        return;
      }

      void fetchSolutionsPage(category, trimmedSearch, nextSortBy, 1).catch(() => {
        // Prefetch is opportunistic. User-visible requests surface their own errors.
      });
    },
    [fetchSolutionsPage, sortBy]
  );

  const handleCategoryClick = useCallback((categoryId: string) => {
    setShouldPinSolutionsHash(true);
    const selectedCategory = categories.find((category) => category.id === categoryId);
    const categorySlug = selectedCategory?.slug || categoryId;
    const criteriaKey = getSolutionsCriteriaKey(categorySlug, debouncedSearchQuery, sortBy);
    forceRefreshCriteriaRef.current.add(criteriaKey);
    applyCachedSolutions(categorySlug, debouncedSearchQuery, sortBy);
    setIsSolutionsLoading(true);
    setIsLoadingMore(false);
    setCurrentCategory(categorySlug);
    if (categorySlug !== 'all') {
      window.history.pushState(
        window.history.state,
        '',
        withBasePath(`/categories/${categorySlug}`)
      );
    } else {
      window.history.pushState(window.history.state, '', withBasePath('/#customers'));
    }
    scrollToSolutionsSection();
  }, [applyCachedSolutions, categories, debouncedSearchQuery, scrollToSolutionsSection, sortBy]);

  const handleCategoryPrefetch = useCallback((categoryId: string) => {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    const categorySlug = selectedCategory?.slug || categoryId;
    prefetchSolutions(categorySlug, '', sortBy);
  }, [categories, prefetchSolutions, sortBy]);

  const handleSearchChange = useCallback((query: string) => {
    const shouldResetCategory = !searchQuery.trim() && query.trim() && currentCategory !== 'all';

    setShouldPinSolutionsHash(true);
    if (shouldResetCategory) {
      setCurrentCategory('all');
    }
    setSearchQuery(query);
  }, [currentCategory, searchQuery]);

  const handleSortChange = useCallback((nextSortBy: SolutionSortKey) => {
    const criteriaKey = getSolutionsCriteriaKey(currentCategory, debouncedSearchQuery, nextSortBy);
    forceRefreshCriteriaRef.current.add(criteriaKey);
    applyCachedSolutions(currentCategory, debouncedSearchQuery, nextSortBy);
    setIsSolutionsLoading(true);
    setIsLoadingMore(false);
    setSortBy(nextSortBy);
  }, [applyCachedSolutions, currentCategory, debouncedSearchQuery]);

  useEffect(() => {
    if (!isLocationStateReady || searchQuery.trim()) {
      return;
    }

    const visibleCategoryIds = categories
      .map((category) => category.slug || category.id)
      .filter((categorySlug) => categorySlug !== currentCategory)
      .slice(0, 8);

    if (visibleCategoryIds.length === 0) {
      return;
    }

    return scheduleIdlePrefetch(() => {
      visibleCategoryIds.forEach((categorySlug) => {
        prefetchSolutions(categorySlug, '', sortBy);
      });
    });
  }, [categories, currentCategory, isLocationStateReady, prefetchSolutions, searchQuery, sortBy]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    if (!hasRevalidatedInitialCriteriaRef.current) {
      return;
    }

    const criteriaKey = getSolutionsCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const storedData = readStoredSolutionsData(criteriaKey);
    const cachedData = solutionsCacheRef.current.get(criteriaKey) || null;
    const currentData =
      displayedCriteriaKey === criteriaKey ? solutionsData : cachedData;

    if (!storedData || (currentData && !isMoreCompleteSolutionsData(storedData, currentData))) {
      return;
    }

    loadedCriteriaKeyRef.current = criteriaKey;
    solutionsCacheRef.current.set(criteriaKey, storedData);
    warmSolutionImages(storedData.solutions, warmedImageUrlsRef.current);
    setSolutionsData(storedData);
    setDisplayedCriteriaKey(criteriaKey);
    setIsSolutionsLoading(false);
    setIsLoadingMore(false);
  }, [
    currentCategory,
    debouncedSearchQuery,
    displayedCriteriaKey,
    isLocationStateReady,
    solutionsData,
    sortBy
  ]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    const criteriaKey = getSolutionsCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const shouldForceFresh =
      forceRefreshCriteriaRef.current.delete(criteriaKey) ||
      !hasRevalidatedInitialCriteriaRef.current;
    hasRevalidatedInitialCriteriaRef.current = true;

    if (criteriaKey === loadedCriteriaKeyRef.current && !shouldForceFresh) {
      return;
    }

    const cachedData = shouldForceFresh ? null : getCachedSolutionsData(criteriaKey);
    let cachedFrameId: number | null = null;

    if (cachedData) {
      loadedCriteriaKeyRef.current = criteriaKey;
      cachedFrameId = window.requestAnimationFrame(() => {
        setSolutionsData(cachedData);
        setDisplayedCriteriaKey(criteriaKey);
        setIsLoadingMore(false);
      });
    }

    const requestId = latestSolutionsRequestRef.current + 1;
    latestSolutionsRequestRef.current = requestId;
    let isRequestSettled = false;
    const loadingFrameId = window.requestAnimationFrame(() => {
      if (!isRequestSettled && latestSolutionsRequestRef.current === requestId) {
        setIsSolutionsLoading(true);
        setIsLoadingMore(false);
      }
    });

    fetchSolutionsPage(currentCategory, debouncedSearchQuery, sortBy, 1, {
      forceFresh: shouldForceFresh
    })
      .then((data) => {
        if (latestSolutionsRequestRef.current !== requestId) {
          return;
        }

        loadedCriteriaKeyRef.current = criteriaKey;
        setSolutionsData(data);
        setDisplayedCriteriaKey(criteriaKey);
      })
      .catch((error) => {
        if (latestSolutionsRequestRef.current !== requestId) {
          return;
        }

        console.error('Failed to fetch solutions', error);
        toast.error('案例加载失败，请稍后重试');
      })
      .finally(() => {
        isRequestSettled = true;
        window.cancelAnimationFrame(loadingFrameId);

        if (latestSolutionsRequestRef.current === requestId) {
          setIsSolutionsLoading(false);
        }
      });

    return () => {
      isRequestSettled = true;
      if (cachedFrameId !== null) {
        window.cancelAnimationFrame(cachedFrameId);
      }
      window.cancelAnimationFrame(loadingFrameId);
    };
  }, [
    currentCategory,
    debouncedSearchQuery,
    fetchSolutionsPage,
    getCachedSolutionsData,
    isLocationStateReady,
    sortBy
  ]);

  const refreshActiveSolutions = useCallback(async () => {
    if (!isLocationStateReady) {
      return;
    }

    const criteriaKey = getSolutionsCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const requestId = latestSolutionsRequestRef.current + 1;
    latestSolutionsRequestRef.current = requestId;

    try {
      const data = await fetchSolutionsPage(currentCategory, debouncedSearchQuery, sortBy, 1, {
        forceFresh: true
      });

      if (latestSolutionsRequestRef.current !== requestId) {
        return;
      }

      loadedCriteriaKeyRef.current = criteriaKey;
      setSolutionsData(data);
      setDisplayedCriteriaKey(criteriaKey);
    } catch (error) {
      if (latestSolutionsRequestRef.current === requestId) {
        console.warn('Failed to refresh active solutions', error);
      }
    }
  }, [
    currentCategory,
    debouncedSearchQuery,
    fetchSolutionsPage,
    isLocationStateReady,
    sortBy
  ]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        void refreshActiveSolutions();
      }
    };

    window.addEventListener('focus', refreshWhenVisible);
    window.addEventListener('online', refreshWhenVisible);
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      window.removeEventListener('focus', refreshWhenVisible);
      window.removeEventListener('online', refreshWhenVisible);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, [isLocationStateReady, refreshActiveSolutions]);

  useEffect(() => {
    return subscribeSolutionInteractionPatches(({ id, patch }) => {
      setSolutionsData((previous) => patchSolutionInteractionState(previous, id, patch));

      for (const [criteriaKey, cachedData] of solutionsCacheRef.current.entries()) {
        const updatedCachedData = patchSolutionInteractionState(cachedData, id, patch);
        solutionsCacheRef.current.set(criteriaKey, updatedCachedData);
        writeStoredSolutionsData(criteriaKey, updatedCachedData);
      }
    });
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || isSolutionsLoading || !hasMoreSolutions) {
      return;
    }

    const criteriaKey = getSolutionsCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const requestId = latestSolutionsRequestRef.current + 1;
    latestSolutionsRequestRef.current = requestId;
    setIsLoadingMore(true);

    try {
      const nextData = await fetchSolutionsPage(
        currentCategory,
        debouncedSearchQuery,
        sortBy,
        solutionsPagination.page + 1
      );

      if (
        latestSolutionsRequestRef.current !== requestId ||
        loadedCriteriaKeyRef.current !== criteriaKey
      ) {
        return;
      }

      setSolutionsData((previous) => {
        const updatedData = mergeSolutionsPageData(previous, nextData);

        solutionsCacheRef.current.set(criteriaKey, updatedData);
        writeStoredSolutionsData(criteriaKey, updatedData);
        return updatedData;
      });
      setDisplayedCriteriaKey(criteriaKey);
    } catch (error) {
      if (latestSolutionsRequestRef.current === requestId) {
        console.error('Failed to load more solutions', error);
        toast.error('加载更多失败，请稍后重试');
      }
    } finally {
      if (latestSolutionsRequestRef.current === requestId) {
        setIsLoadingMore(false);
      }
    }
  }, [
    currentCategory,
    debouncedSearchQuery,
    fetchSolutionsPage,
    hasMoreSolutions,
    isLoadingMore,
    isSolutionsLoading,
    solutionsPagination.page,
    sortBy
  ]);

  const handleLikeToggle = useCallback((id: string | number, state?: { isLiked: boolean; likes: number }) => {
    setSolutionsData((previous) => applySolutionLikeState(previous, id, state));

    const cachedData = solutionsCacheRef.current.get(displayedCriteriaKey);

    if (cachedData) {
      const updatedCachedData = applySolutionLikeState(cachedData, id, state);

      solutionsCacheRef.current.set(displayedCriteriaKey, updatedCachedData);
      writeStoredSolutionsData(displayedCriteriaKey, updatedCachedData);
    }
  }, [displayedCriteriaKey]);

  return {
    currentCategory,
    searchQuery,
    sortBy,
    categories,
    solutions,
    isLoading,
    isShowingStaleSolutions,
    hasMoreSolutions,
    isLoadingMore,
    isSolutionsLoading,
    solutionsSectionRef,
    handleCategoryClick,
    handleCategoryPrefetch,
    handleSearchChange,
    handleSortChange,
    handleLoadMore,
    handleLikeToggle,
    pinSolutionsHash: () => setShouldPinSolutionsHash(true)
  };
}
