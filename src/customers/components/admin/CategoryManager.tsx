'use client';

import CategoryEditModal from '@/customers/components/admin/category-manager/CategoryEditModal';
import CategoryManagerHeader from '@/customers/components/admin/category-manager/CategoryManagerHeader';
import CategoryManagerTable from '@/customers/components/admin/category-manager/CategoryManagerTable';
import ConfirmModal from '@/customers/components/admin/shared/ConfirmModal';
import type { AdminManagedCategory } from '@/customers/components/admin/category-manager/types';
import { useCategoryDndSensors } from '@/customers/components/admin/category-manager/useCategoryDndSensors';
import { useCategoryManager } from '@/customers/components/admin/category-manager/useCategoryManager';

export default function CategoryManager({
  initialCategories
}: {
  initialCategories: AdminManagedCategory[]
}) {
  const {
    categories,
    isModalOpen,
    isSubmitting,
    isSuggestingSlug,
    formData,
    setFormData,
    setIsModalOpen,
    openModal,
    handleSubmit,
    handleSuggestSlug,
    handleToggle,
    confirmDelete,
    pendingDeleteId,
    isDeleteSubmitting,
    cancelDelete,
    handleDeleteConfirm,
    handleDragEnd
  } = useCategoryManager({
    initialCategories
  });

  const sensors = useCategoryDndSensors();

  return (
    <div className="p-4 lg:p-8">
      <CategoryManagerHeader onCreate={() => openModal()} />

      <CategoryManagerTable
        categories={categories}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onToggle={handleToggle}
        onEdit={openModal}
        onDelete={confirmDelete}
      />

      {/* 编辑弹窗 */}
      <CategoryEditModal
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        isSuggestingSlug={isSuggestingSlug}
        formData={formData}
        setFormData={setFormData}
        onClose={() => setIsModalOpen(false)}
        onSuggestSlug={handleSuggestSlug}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={Boolean(pendingDeleteId)}
        title="确认删除"
        subtitle="请先确认分类下已无关联方案"
        tone="danger"
        description="敏感操作：确认删除分类？删除前请确保分类下无解决方案。"
        onClose={cancelDelete}
        actions={[
          {
            label: '取消',
            onClick: cancelDelete,
            disabled: isDeleteSubmitting
          },
          {
            label: isDeleteSubmitting ? '删除中...' : '确定删除',
            onClick: handleDeleteConfirm,
            variant: 'danger',
            disabled: isDeleteSubmitting
          }
        ]}
      />
    </div>
  );
}
