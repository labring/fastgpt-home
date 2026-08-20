'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  clearTrash,
  deleteCustomerFromTrash,
  restoreCustomerFromTrash
} from '@/app/customers/admin/actions/customers';
import { filterAdminCustomers } from '@/customers/lib/customer-search';
import type { AdminCustomerListData } from '@/customers/components/admin/customer-list/types';

interface UseTrashCustomerListProps {
  initialData: AdminCustomerListData;
}

export function useTrashCustomerList({ initialData }: UseTrashCustomerListProps) {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [restoringId, setRestoringId] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState('');
  const [isClearing, setIsClearing] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  const filteredItems = useMemo(
    () => filterAdminCustomers(data.items, 'all', search, 'time'),
    [data.items, search]
  );

  const handleRestore = useCallback(async (id: string) => {
    setRestoringId(id);
    const result = await restoreCustomerFromTrash(id);
    setRestoringId('');

    if (!result.success) {
      toast.error(result.error || '恢复失败');
      return;
    }

    toast.success('已从回收站恢复');
    setData((prev) => ({
      items: prev.items.filter((item) => item._id !== id),
      total: Math.max(prev.total - 1, 0)
    }));
  }, []);

  const confirmDeletePermanently = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const cancelDeletePermanently = useCallback(() => {
    if (deletingId) {
      return;
    }

    setPendingDeleteId('');
  }, [deletingId]);

  const handleDeletePermanently = useCallback(async () => {
    if (!pendingDeleteId) {
      return;
    }

    setDeletingId(pendingDeleteId);
    const result = await deleteCustomerFromTrash(pendingDeleteId);
    setDeletingId('');

    if (!result.success) {
      toast.error(result.error || '彻底删除失败');
      return;
    }

    toast.success('已彻底删除案例');
    setData((prev) => ({
      items: prev.items.filter((item) => item._id !== pendingDeleteId),
      total: Math.max(prev.total - 1, 0)
    }));
    setPendingDeleteId('');
  }, [pendingDeleteId]);

  const openClearConfirm = useCallback(() => {
    if (data.total === 0 || isClearing) {
      return;
    }

    setIsClearConfirmOpen(true);
  }, [data.total, isClearing]);

  const closeClearConfirm = useCallback(() => {
    if (isClearing) {
      return;
    }

    setIsClearConfirmOpen(false);
  }, [isClearing]);

  const handleClearTrash = useCallback(async () => {
    setIsClearing(true);
    const result = await clearTrash();
    setIsClearing(false);

    if (!result.success) {
      toast.error(result.error || '清空回收站失败');
      return;
    }

    toast.success(`已清空 ${result.deletedCount} 条案例`);
    setData({ items: [], total: 0 });
    setIsClearConfirmOpen(false);
  }, []);

  return {
    data,
    search,
    filteredItems,
    restoringId,
    deletingId,
    pendingDeleteId,
    isClearing,
    isClearConfirmOpen,
    setSearch,
    handleRestore,
    confirmDeletePermanently,
    cancelDeletePermanently,
    handleDeletePermanently,
    openClearConfirm,
    closeClearConfirm,
    handleClearTrash
  };
}
