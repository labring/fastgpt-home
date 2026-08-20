'use client';

import ConfirmModal from '@/customers/components/admin/shared/ConfirmModal';
import AdminEmptyState from '@/customers/components/admin/shared/AdminEmptyState';
import type { AdminCustomerListData } from '@/customers/components/admin/customer-list/types';
import TrashCustomerCard from '@/customers/components/admin/trash/TrashCustomerCard';
import TrashToolbar from '@/customers/components/admin/trash/TrashToolbar';
import { useTrashCustomerList } from '@/customers/components/admin/trash/useTrashCustomerList';

interface TrashListProps {
  initialData: AdminCustomerListData;
}

export default function TrashList({ initialData }: TrashListProps) {
  const {
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
  } = useTrashCustomerList({ initialData });

  return (
    <div className="p-4 lg:p-8">
      <TrashToolbar
        search={search}
        onSearchChange={setSearch}
        onClearTrash={openClearConfirm}
        isClearing={isClearing}
        disableClear={data.total === 0}
      />

      {filteredItems.length === 0 ? (
        <AdminEmptyState message={search ? '未找到匹配的回收站案例' : '回收站为空'} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <TrashCustomerCard
              key={item._id}
              item={item}
              onRestore={handleRestore}
              onDeletePermanently={confirmDeletePermanently}
              isRestoring={restoringId === item._id}
              isDeleting={deletingId === item._id}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(pendingDeleteId)}
        title="彻底删除案例"
        subtitle="该操作只能在回收站执行"
        description="彻底删除后会同步清理该案例的存储资源，且无法恢复。"
        tone="danger"
        onClose={cancelDeletePermanently}
        actions={[
          {
            label: '取消',
            onClick: cancelDeletePermanently,
            disabled: Boolean(deletingId)
          },
          {
            label: deletingId ? '删除中...' : '彻底删除',
            onClick: handleDeletePermanently,
            variant: 'danger',
            disabled: Boolean(deletingId)
          }
        ]}
      />

      <ConfirmModal
        isOpen={isClearConfirmOpen}
        title="清空回收站"
        subtitle="该操作只允许人工执行"
        description="清空后会彻底删除当前回收站中的全部案例及其关联存储资源，无法撤销。"
        tone="danger"
        onClose={closeClearConfirm}
        actions={[
          {
            label: '取消',
            onClick: closeClearConfirm,
            disabled: isClearing
          },
          {
            label: isClearing ? '清空中...' : '确认清空',
            onClick: handleClearTrash,
            variant: 'danger',
            disabled: isClearing
          }
        ]}
      />
    </div>
  );
}
