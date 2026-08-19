'use client';

import { useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/customers/components/admin/shared/ConfirmModal';
import CategoryTabs from '@/customers/components/admin/solution-list/CategoryTabs';
import SolutionListGrid from '@/customers/components/admin/solution-list/SolutionListGrid';
import SolutionListToolbar from '@/customers/components/admin/solution-list/SolutionListToolbar';
import type {
  AdminCategory,
  AdminSolutionItem,
  AdminSolutionListData
} from '@/customers/components/admin/solution-list/types';
import { useAdminSolutionList } from '@/customers/components/admin/solution-list/useAdminSolutionList';
import { buildAdminSolutionEditHref } from '@/customers/lib/admin-solution-routing';

function SolutionListContent({
  initialData,
  categories = []
}: {
  initialData: AdminSolutionListData;
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
  } = useAdminSolutionList({
    initialData
  });

  const handleOpenEdit = useCallback((item: AdminSolutionItem) => {
    router.push(buildAdminSolutionEditHref(item));
  }, [router]);

  return (
    <div className="p-4 lg:p-8">
      <SolutionListToolbar
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

      <SolutionListGrid
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

export default function SolutionList(props: {
  initialData: AdminSolutionListData;
  categories?: AdminCategory[];
}) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500">加载中...</div>}>
      <SolutionListContent {...props} />
    </Suspense>
  );
}
