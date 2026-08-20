'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { preloadPinyinMatch } from '@/customers/lib/pinyin';
import {
  DEFAULT_ADMIN_CUSTOMER_SORT_KEY,
  type AdminCustomerSortKey,
  fetchFirstMatchedCustomer,
  filterAdminCustomers,
  normalizeAdminCustomerSortBy,
  requestSmartSearchMatch,
  SmartSearchRequestError,
  SMART_SEARCH_EMPTY_DESCRIPTION
} from '@/customers/lib/customer-search';
import {
  moveCustomerToTrash,
  toggleCustomerPublish
} from '@/app/customers/admin/actions/customers';
import { buildAdminCustomerEditHref } from '@/customers/lib/admin-customer-routing';
import { trackRybbitEvent } from '@/customers/lib/rybbit';
import type { AdminCustomerItem, AdminCustomerListData } from './types';

interface UseAdminCustomerListProps {
  initialData: AdminCustomerListData;
}

export function useAdminCustomerList({
  initialData
}: UseAdminCustomerListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<AdminCustomerListData>(initialData);
  const [search, setSearch] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState('');
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false);

  // 从 URL 初始化分类
  const currentCategory = searchParams.get('category') || 'all';
  const currentSortBy = normalizeAdminCustomerSortBy(searchParams.get('sortBy'));

  const pushListState = useCallback((params: URLSearchParams) => {
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  }, [pathname, router]);

  const setCurrentCategory = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }

    pushListState(params);
  }, [pushListState, searchParams]);

  const setSortBy = useCallback((value: AdminCustomerSortKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === DEFAULT_ADMIN_CUSTOMER_SORT_KEY) {
      params.delete('sortBy');
    } else {
      params.set('sortBy', value);
    }

    pushListState(params);
  }, [pushListState, searchParams]);

  const onSearchChange = useCallback((value: string) => {
    const shouldResetCategory = !search.trim() && value.trim() && currentCategory !== 'all';

    setSearch(value);
    if (shouldResetCategory) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('category');
      pushListState(params);
    }

    if (value) {
      preloadPinyinMatch();
    }
  }, [currentCategory, pushListState, search, searchParams]);

  const handleSmartSearch = useCallback(async (query: string) => {
    setIsAiSearching(true);

    try {
      const result = await requestSmartSearchMatch(query, { scope: 'admin' });

      if (!result.matched_case) {
        // Rybbit 上报：AI 搜索未匹配
        trackRybbitEvent('search', {
          keyword: query,
          result_count: 0,
          search_type: 'ai'
        });

        toast.info('抱歉，未能匹配到相关智能应用，请换个说法试试~', {
          description: SMART_SEARCH_EMPTY_DESCRIPTION
        });
        return;
      }

      let matchedCustomer =
        result.matched_customer ||
        data.items.find((item) => item.title === result.matched_case) || null;

      if (!matchedCustomer) {
        try {
          matchedCustomer = await fetchFirstMatchedCustomer<AdminCustomerItem>(
            result.matched_case
          );
        } catch (error) {
          console.error('Failed to fetch matched customer detail', error);
        }
      }

      if (!matchedCustomer) {
        // Rybbit 上报：AI 搜索未匹配（二次确认失败）
        trackRybbitEvent('search', {
          keyword: query,
          result_count: 0,
          search_type: 'ai'
        });

        toast.info('抱歉，未能匹配到相关智能应用，请换个说法试试~', {
          description: SMART_SEARCH_EMPTY_DESCRIPTION
        });
        return;
      }

      // Rybbit 上报：AI 搜索匹配成功
      trackRybbitEvent('search', {
        keyword: query,
        result_count: 1,
        search_type: 'ai'
      });

      router.push(buildAdminCustomerEditHref(matchedCustomer));
      toast.success(`为您找到匹配案例：${matchedCustomer.title}`);
    } catch (error) {
      console.error('智能搜索请求失败', error);
      if (error instanceof SmartSearchRequestError) {
        if (error.status === 401) {
          toast.error('登录状态已失效，请重新登录后台');
          return;
        }

        if (error.status === 404) {
          toast.error('智能搜索接口未在后台服务中放行，请刷新后重试');
          return;
        }
      }

      toast.error('AI 搜索请求失败，请检查配置或稍后重试');
    } finally {
      setIsAiSearching(false);
    }
  }, [data.items, router]);

  const handleTogglePublish = useCallback(async (
    id: string,
    currentStatus: boolean
  ) => {
    const nextStatus = !currentStatus;
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item._id === id ? { ...item, isPublished: nextStatus } : item
      )
    }));

    const result = await toggleCustomerPublish(id, nextStatus);
    if (result.success) {
      toast.success(nextStatus ? '已发布' : '已转为草稿');
      return;
    }

    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item._id === id ? { ...item, isPublished: currentStatus } : item
      )
    }));
    toast.error(result.error || '操作失败');
  }, []);

  const confirmDelete = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const cancelDelete = useCallback(() => {
    if (isDeleteSubmitting) {
      return;
    }
    setPendingDeleteId('');
  }, [isDeleteSubmitting]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!pendingDeleteId) {
      return;
    }

    setIsDeleteSubmitting(true);
    const result = await moveCustomerToTrash(pendingDeleteId);
    setIsDeleteSubmitting(false);

    if (result.success) {
      toast.success('已移入回收站');
      setData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item._id !== pendingDeleteId),
        total: prev.total - 1
      }));
      setPendingDeleteId('');
    } else {
      toast.error(result.error || '删除失败');
    }
  }, [pendingDeleteId]);

  const filteredItems = useMemo(
    () => filterAdminCustomers(data.items || [], currentCategory, search, currentSortBy),
    [currentCategory, data.items, search, currentSortBy]
  );

  return {
    data,
    search,
    currentCategory,
    currentSortBy,
    isAiSearching,
    filteredItems,
    setCurrentCategory,
    setSortBy,
    onSearchChange,
    handleSmartSearch,
    handleTogglePublish,
    confirmDelete,
    pendingDeleteId,
    isDeleteSubmitting,
    cancelDelete,
    handleDeleteConfirm
  };
}
