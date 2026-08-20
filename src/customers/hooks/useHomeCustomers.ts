'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import { toast } from 'sonner';
import type { Customer } from '@/customers/components/CustomerCard';
import { buildHomeHref } from '@/customers/lib/home-routing';
import {
  applyCustomerLikeState,
  buildCustomersRequestUrl,
  getCustomersCriteriaKey,
  isMoreCompleteCustomersData,
  mergeFreshCustomersPageData,
  mergeCustomersPageData,
  normalizeSortBy,
  patchCustomerInteractionState,
  readStoredCustomersData,
  type CustomersPageData,
  type CustomersPagination,
  writeStoredCustomersData
} from '@/customers/lib/home-customers-cache';
import { DEFAULT_PUBLIC_CUSTOMER_SORT_KEY } from '@/customers/lib/customer-pagination';
import { subscribeCustomerInteractionPatches } from '@/customers/lib/customer-interaction-events';
import {
  normalizeCategoryOptions,
  type CustomerSortKey
} from '@/customers/lib/customer-search';
import { useDebouncedValue } from '@/customers/hooks/useDebouncedValue';
import { withBasePath } from '@/customers/lib/base-path';
import {
  scheduleIdlePrefetch,
  scrollToElementWithNavbarOffset,
  warmCustomerImages
} from '@/customers/lib/home-customers-browser';

export interface CategoryOption {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

interface UseHomeCustomersInput {
  initialCategories: CategoryOption[];
  initialCustomers: Customer[];
  initialPagination: CustomersPagination;
  initialCategorySlug?: string;
}

export function useHomeCustomers({
  initialCategories,
  initialCustomers,
  initialPagination,
  initialCategorySlug
}: UseHomeCustomersInput) {
  const [currentCategory, setCurrentCategory] = useState(initialCategorySlug || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 220);
  const [sortBy, setSortBy] = useState<CustomerSortKey>(DEFAULT_PUBLIC_CUSTOMER_SORT_KEY);
  const initialCriteriaKey = useMemo(
    () => getCustomersCriteriaKey(initialCategorySlug || 'all', '', DEFAULT_PUBLIC_CUSTOMER_SORT_KEY),
    [initialCategorySlug]
  );
  const [customersData, setCustomersData] = useState<CustomersPageData>({
    customers: initialCustomers,
    pagination: initialPagination
  });
  const [displayedCriteriaKey, setDisplayedCriteriaKey] = useState(initialCriteriaKey);
  const [isCustomersLoading, setIsCustomersLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [shouldPinCustomersHash, setShouldPinCustomersHash] = useState(false);
  const [isLocationStateReady, setIsLocationStateReady] = useState(false);
  const loadedCriteriaKeyRef = useRef(initialCriteriaKey);
  const latestCustomersRequestRef = useRef(0);
  const forceRefreshCriteriaRef = useRef<Set<string>>(new Set());
  const hasRevalidatedInitialCriteriaRef = useRef(false);
  const customersCacheRef = useRef<Map<string, CustomersPageData>>(
    new Map([[initialCriteriaKey, { customers: initialCustomers, pagination: initialPagination }]])
  );
  const inflightCustomersRef = useRef<Map<string, Promise<CustomersPageData>>>(new Map());
  const warmedImageUrlsRef = useRef<Set<string>>(new Set());
  const customersSectionRef = useRef<HTMLElement>(null);
  const pendingScrollTimeoutRef = useRef<number | null>(null);

  const getCachedCustomersData = useCallback((criteriaKey: string) => {
    const cachedData = customersCacheRef.current.get(criteriaKey) || null;
    const storedData = readStoredCustomersData(criteriaKey);

    if (!storedData || (cachedData && !isMoreCompleteCustomersData(storedData, cachedData))) {
      return cachedData;
    }

    customersCacheRef.current.set(criteriaKey, storedData);
    warmCustomerImages(storedData.customers, warmedImageUrlsRef.current);
    return storedData;
  }, []);

  const mergeWithFreshFirstPage = useCallback((criteriaKey: string, freshData: CustomersPageData) => {
    const cachedData = customersCacheRef.current.get(criteriaKey);
    const storedData = readStoredCustomersData(criteriaKey);
    const cachedCandidates = [cachedData, storedData].filter(
      (data): data is CustomersPageData => Boolean(data)
    );
    const mostCompleteCachedData = cachedCandidates.reduce<CustomersPageData | null>(
      (best, data) => (
        !best || isMoreCompleteCustomersData(data, best)
          ? data
          : best
      ),
      null
    );

    return mostCompleteCachedData && isMoreCompleteCustomersData(mostCompleteCachedData, freshData)
      ? mergeFreshCustomersPageData(freshData, mostCompleteCachedData)
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

  const customers: Customer[] = useMemo(() => {
    return customersData.customers;
  }, [customersData.customers]);

  const customersPagination = customersData.pagination;
  const hasMoreCustomers = customersPagination.page < customersPagination.totalPages;
  const activeCriteriaKey = useMemo(
    () => getCustomersCriteriaKey(currentCategory, debouncedSearchQuery, sortBy),
    [currentCategory, debouncedSearchQuery, sortBy]
  );
  const isShowingStaleCustomers = isCustomersLoading && displayedCriteriaKey !== activeCriteriaKey;
  const isLoading = isCustomersLoading && customers.length === 0;

  const fetchCustomersPage = useCallback(
    (
      category: string,
      search: string,
      nextSortBy: CustomerSortKey,
      page: number,
      options: { forceFresh?: boolean } = {}
    ) => {
      const criteriaKey = getCustomersCriteriaKey(category, search, nextSortBy);
      const cacheKey = `${criteriaKey}::page=${page}${options.forceFresh ? '::fresh' : ''}`;
      const cachedData = !options.forceFresh && page === 1
        ? getCachedCustomersData(criteriaKey)
        : null;

      if (cachedData) {
        return Promise.resolve(cachedData);
      }

      const inflightRequest = inflightCustomersRef.current.get(cacheKey);

      if (inflightRequest) {
        return inflightRequest;
      }

      const request = fetch(buildCustomersRequestUrl({
        category,
        search,
        sortBy: nextSortBy,
        page
      }), { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch customers');
          }
          return response.json() as Promise<CustomersPageData>;
        })
        .then((data) => {
          if (page === 1) {
            const mergedData = mergeWithFreshFirstPage(criteriaKey, data);
            customersCacheRef.current.set(criteriaKey, mergedData);
            writeStoredCustomersData(criteriaKey, mergedData);
            warmCustomerImages(mergedData.customers, warmedImageUrlsRef.current);
            return mergedData;
          }

          return data;
        })
        .finally(() => {
          inflightCustomersRef.current.delete(cacheKey);
        });

      inflightCustomersRef.current.set(cacheKey, request);
      return request;
    },
    [getCachedCustomersData, mergeWithFreshFirstPage]
  );

  useEffect(() => {
    warmCustomerImages(initialCustomers, warmedImageUrlsRef.current);
  }, [initialCustomers]);

  const scrollToCustomersSection = useCallback(() => {
    scrollToElementWithNavbarOffset(customersSectionRef.current);
  }, []);

  useEffect(() => {
    const syncStateFromLocation = (shouldScroll: boolean) => {
      const params = new URLSearchParams(window.location.search);
      const nextCategory = initialCategorySlug || params.get('category')?.trim() || 'all';
      const nextSearch = params.get('search')?.trim() || '';
      const nextSortBy = normalizeSortBy(params.get('sortBy')?.trim());
      const hasCustomersSection =
        window.location.hash === '#customers' || nextCategory !== 'all' || Boolean(nextSearch);

      const frameId = window.requestAnimationFrame(() => {
        setCurrentCategory(nextCategory);
        setSearchQuery(nextSearch);
        setSortBy(nextSortBy);
        setShouldPinCustomersHash(hasCustomersSection);
        setIsLocationStateReady(true);
      });

      if (pendingScrollTimeoutRef.current) {
        window.clearTimeout(pendingScrollTimeoutRef.current);
      }

      if (shouldScroll && hasCustomersSection) {
        pendingScrollTimeoutRef.current = window.setTimeout(() => {
          scrollToCustomersSection();
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
  }, [initialCategorySlug, scrollToCustomersSection]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    const nextHref = buildHomeHref({
      categorySlug: currentCategory,
      search: searchQuery,
      sortBy,
      section: shouldPinCustomersHash ? 'customers' : null
    });
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (!initialCategorySlug && currentHref !== nextHref) {
      window.history.replaceState(window.history.state, '', withBasePath(nextHref));
    }
  }, [currentCategory, searchQuery, sortBy, shouldPinCustomersHash, isLocationStateReady, initialCategorySlug]);

  const applyCachedCustomers = useCallback((category: string, search: string, nextSortBy: CustomerSortKey) => {
    const criteriaKey = getCustomersCriteriaKey(category, search, nextSortBy);
    const cachedData = getCachedCustomersData(criteriaKey);

    if (!cachedData) {
      return false;
    }

    loadedCriteriaKeyRef.current = criteriaKey;
    setCustomersData(cachedData);
    setDisplayedCriteriaKey(criteriaKey);
    setIsCustomersLoading(false);
    setIsLoadingMore(false);
    return true;
  }, [getCachedCustomersData]);

  const prefetchCustomers = useCallback(
    (category: string, search = '', nextSortBy = sortBy) => {
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        return;
      }

      void fetchCustomersPage(category, trimmedSearch, nextSortBy, 1).catch(() => {
        // Prefetch is opportunistic. User-visible requests surface their own errors.
      });
    },
    [fetchCustomersPage, sortBy]
  );

  const handleCategoryClick = useCallback((categoryId: string) => {
    setShouldPinCustomersHash(true);
    const selectedCategory = categories.find((category) => category.id === categoryId);
    const categorySlug = selectedCategory?.slug || categoryId;
    const criteriaKey = getCustomersCriteriaKey(categorySlug, debouncedSearchQuery, sortBy);
    forceRefreshCriteriaRef.current.add(criteriaKey);
    applyCachedCustomers(categorySlug, debouncedSearchQuery, sortBy);
    setIsCustomersLoading(true);
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
    scrollToCustomersSection();
  }, [applyCachedCustomers, categories, debouncedSearchQuery, scrollToCustomersSection, sortBy]);

  const handleCategoryPrefetch = useCallback((categoryId: string) => {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    const categorySlug = selectedCategory?.slug || categoryId;
    prefetchCustomers(categorySlug, '', sortBy);
  }, [categories, prefetchCustomers, sortBy]);

  const handleSearchChange = useCallback((query: string) => {
    const shouldResetCategory = !searchQuery.trim() && query.trim() && currentCategory !== 'all';

    setShouldPinCustomersHash(true);
    if (shouldResetCategory) {
      setCurrentCategory('all');
    }
    setSearchQuery(query);
  }, [currentCategory, searchQuery]);

  const handleSortChange = useCallback((nextSortBy: CustomerSortKey) => {
    const criteriaKey = getCustomersCriteriaKey(currentCategory, debouncedSearchQuery, nextSortBy);
    forceRefreshCriteriaRef.current.add(criteriaKey);
    applyCachedCustomers(currentCategory, debouncedSearchQuery, nextSortBy);
    setIsCustomersLoading(true);
    setIsLoadingMore(false);
    setSortBy(nextSortBy);
  }, [applyCachedCustomers, currentCategory, debouncedSearchQuery]);

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
        prefetchCustomers(categorySlug, '', sortBy);
      });
    });
  }, [categories, currentCategory, isLocationStateReady, prefetchCustomers, searchQuery, sortBy]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    if (!hasRevalidatedInitialCriteriaRef.current) {
      return;
    }

    const criteriaKey = getCustomersCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const storedData = readStoredCustomersData(criteriaKey);
    const cachedData = customersCacheRef.current.get(criteriaKey) || null;
    const currentData =
      displayedCriteriaKey === criteriaKey ? customersData : cachedData;

    if (!storedData || (currentData && !isMoreCompleteCustomersData(storedData, currentData))) {
      return;
    }

    loadedCriteriaKeyRef.current = criteriaKey;
    customersCacheRef.current.set(criteriaKey, storedData);
    warmCustomerImages(storedData.customers, warmedImageUrlsRef.current);
    setCustomersData(storedData);
    setDisplayedCriteriaKey(criteriaKey);
    setIsCustomersLoading(false);
    setIsLoadingMore(false);
  }, [
    currentCategory,
    debouncedSearchQuery,
    displayedCriteriaKey,
    isLocationStateReady,
    customersData,
    sortBy
  ]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    const criteriaKey = getCustomersCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const shouldForceFresh =
      forceRefreshCriteriaRef.current.delete(criteriaKey) ||
      !hasRevalidatedInitialCriteriaRef.current;
    hasRevalidatedInitialCriteriaRef.current = true;

    if (criteriaKey === loadedCriteriaKeyRef.current && !shouldForceFresh) {
      return;
    }

    const cachedData = shouldForceFresh ? null : getCachedCustomersData(criteriaKey);
    let cachedFrameId: number | null = null;

    if (cachedData) {
      loadedCriteriaKeyRef.current = criteriaKey;
      cachedFrameId = window.requestAnimationFrame(() => {
        setCustomersData(cachedData);
        setDisplayedCriteriaKey(criteriaKey);
        setIsLoadingMore(false);
      });
    }

    const requestId = latestCustomersRequestRef.current + 1;
    latestCustomersRequestRef.current = requestId;
    let isRequestSettled = false;
    const loadingFrameId = window.requestAnimationFrame(() => {
      if (!isRequestSettled && latestCustomersRequestRef.current === requestId) {
        setIsCustomersLoading(true);
        setIsLoadingMore(false);
      }
    });

    fetchCustomersPage(currentCategory, debouncedSearchQuery, sortBy, 1, {
      forceFresh: shouldForceFresh
    })
      .then((data) => {
        if (latestCustomersRequestRef.current !== requestId) {
          return;
        }

        loadedCriteriaKeyRef.current = criteriaKey;
        setCustomersData(data);
        setDisplayedCriteriaKey(criteriaKey);
      })
      .catch((error) => {
        if (latestCustomersRequestRef.current !== requestId) {
          return;
        }

        console.error('Failed to fetch customers', error);
        toast.error('案例加载失败，请稍后重试');
      })
      .finally(() => {
        isRequestSettled = true;
        window.cancelAnimationFrame(loadingFrameId);

        if (latestCustomersRequestRef.current === requestId) {
          setIsCustomersLoading(false);
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
    fetchCustomersPage,
    getCachedCustomersData,
    isLocationStateReady,
    sortBy
  ]);

  const refreshActiveCustomers = useCallback(async () => {
    if (!isLocationStateReady) {
      return;
    }

    const criteriaKey = getCustomersCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const requestId = latestCustomersRequestRef.current + 1;
    latestCustomersRequestRef.current = requestId;

    try {
      const data = await fetchCustomersPage(currentCategory, debouncedSearchQuery, sortBy, 1, {
        forceFresh: true
      });

      if (latestCustomersRequestRef.current !== requestId) {
        return;
      }

      loadedCriteriaKeyRef.current = criteriaKey;
      setCustomersData(data);
      setDisplayedCriteriaKey(criteriaKey);
    } catch (error) {
      if (latestCustomersRequestRef.current === requestId) {
        console.warn('Failed to refresh active customers', error);
      }
    }
  }, [
    currentCategory,
    debouncedSearchQuery,
    fetchCustomersPage,
    isLocationStateReady,
    sortBy
  ]);

  useEffect(() => {
    if (!isLocationStateReady) {
      return;
    }

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        void refreshActiveCustomers();
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
  }, [isLocationStateReady, refreshActiveCustomers]);

  useEffect(() => {
    return subscribeCustomerInteractionPatches(({ id, patch }) => {
      setCustomersData((previous) => patchCustomerInteractionState(previous, id, patch));

      for (const [criteriaKey, cachedData] of customersCacheRef.current.entries()) {
        const updatedCachedData = patchCustomerInteractionState(cachedData, id, patch);
        customersCacheRef.current.set(criteriaKey, updatedCachedData);
        writeStoredCustomersData(criteriaKey, updatedCachedData);
      }
    });
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || isCustomersLoading || !hasMoreCustomers) {
      return;
    }

    const criteriaKey = getCustomersCriteriaKey(currentCategory, debouncedSearchQuery, sortBy);
    const requestId = latestCustomersRequestRef.current + 1;
    latestCustomersRequestRef.current = requestId;
    setIsLoadingMore(true);

    try {
      const nextData = await fetchCustomersPage(
        currentCategory,
        debouncedSearchQuery,
        sortBy,
        customersPagination.page + 1
      );

      if (
        latestCustomersRequestRef.current !== requestId ||
        loadedCriteriaKeyRef.current !== criteriaKey
      ) {
        return;
      }

      setCustomersData((previous) => {
        const updatedData = mergeCustomersPageData(previous, nextData);

        customersCacheRef.current.set(criteriaKey, updatedData);
        writeStoredCustomersData(criteriaKey, updatedData);
        return updatedData;
      });
      setDisplayedCriteriaKey(criteriaKey);
    } catch (error) {
      if (latestCustomersRequestRef.current === requestId) {
        console.error('Failed to load more customers', error);
        toast.error('加载更多失败，请稍后重试');
      }
    } finally {
      if (latestCustomersRequestRef.current === requestId) {
        setIsLoadingMore(false);
      }
    }
  }, [
    currentCategory,
    debouncedSearchQuery,
    fetchCustomersPage,
    hasMoreCustomers,
    isLoadingMore,
    isCustomersLoading,
    customersPagination.page,
    sortBy
  ]);

  const handleLikeToggle = useCallback((id: string | number, state?: { isLiked: boolean; likes: number }) => {
    setCustomersData((previous) => applyCustomerLikeState(previous, id, state));

    const cachedData = customersCacheRef.current.get(displayedCriteriaKey);

    if (cachedData) {
      const updatedCachedData = applyCustomerLikeState(cachedData, id, state);

      customersCacheRef.current.set(displayedCriteriaKey, updatedCachedData);
      writeStoredCustomersData(displayedCriteriaKey, updatedCachedData);
    }
  }, [displayedCriteriaKey]);

  return {
    currentCategory,
    searchQuery,
    sortBy,
    categories,
    customers,
    isLoading,
    isShowingStaleCustomers,
    hasMoreCustomers,
    isLoadingMore,
    isCustomersLoading,
    customersSectionRef,
    handleCategoryClick,
    handleCategoryPrefetch,
    handleSearchChange,
    handleSortChange,
    handleLoadMore,
    handleLikeToggle,
    pinCustomersHash: () => setShouldPinCustomersHash(true)
  };
}
