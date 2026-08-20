'use client';

import { useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/customers/components/admin/shared/ConfirmModal';
import CategoryTabs from '@/customers/components/admin/customer-list/CategoryTabs';
import CustomerListGrid from '@/customers/components/admin/customer-list/CustomerListGrid';
import CustomerListToolbar from '@/customers/components/admin/customer-list/CustomerListToolbar';
import type {
  AdminCategory,
  AdminCustomerItem,
  AdminCustomerListData
} from '@/customers/components/admin/customer-list/types';
import { useAdminCustomerList } from '@/customers/components/admin/customer-list/useAdminCustomerList';
import { buildAdminCustomerEditHref } from '@/customers/lib/admin-customer-routing';

function CustomerListContent({
  initialData,
  categories = []
}: {
  initialData: AdminCustomerListData;
  categories?: AdminCategory[];
}) {
  const router = useRouter();
  const {
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
  } = useAdminCustomerList({
    initialData
  });

  const handleOpenEdit = useCallback((item: AdminCustomerItem) => {
    router.push(buildAdminCustomerEditHref(item));
  }, [router]);

  return (
    <div className="p-4 lg:p-8">
      <CustomerListToolbar
        search={search}
        isAiSearching={isAiSearching}
        onSearchChange={onSearchChange}
        onSmartSearch={handleSmartSearch}
      />

      <CategoryTabs
        categories={categories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        sortBy={currentSortBy}
        onSortChange={setSortBy}
      />

      <CustomerListGrid
        items={filteredItems}
        onOpenEdit={handleOpenEdit}
        onSelectCategory={setCurrentCategory}
        onTogglePublish={handleTogglePublish}
        onDelete={confirmDelete}
      />

      <ConfirmModal
        isOpen={Boolean(pendingDeleteId)}
        title="移入回收站"
        subtitle="案例会先进入回收站，需人工彻底删除"
        tone="danger"
        description="确定要将该解决方案移入回收站吗？进入回收站后，仍可恢复或由人工彻底删除。"
        onClose={cancelDelete}
        actions={[
          {
            label: '取消',
            onClick: cancelDelete,
            disabled: isDeleteSubmitting
          },
          {
            label: isDeleteSubmitting ? '处理中...' : '确认移入',
            onClick: handleDeleteConfirm,
            variant: 'danger',
            disabled: isDeleteSubmitting
          }
        ]}
      />
    </div>
  );
}

export default function CustomerList(props: {
  initialData: AdminCustomerListData;
  categories?: AdminCategory[];
}) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500">加载中...</div>}>
      <CustomerListContent {...props} />
    </Suspense>
  );
}
