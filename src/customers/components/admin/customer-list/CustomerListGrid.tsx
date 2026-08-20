'use client';

import AdminEmptyState from '@/customers/components/admin/shared/AdminEmptyState';
import type { AdminCustomerItem } from './types';
import AdminCustomerCard from './AdminCustomerCard';

interface CustomerListGridProps {
  items: AdminCustomerItem[];
  onOpenEdit: (item: AdminCustomerItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void | Promise<void>;
  onDelete: (id: string) => void;
}

export default function CustomerListGrid({
  items,
  onOpenEdit,
  onSelectCategory,
  onTogglePublish,
  onDelete
}: CustomerListGridProps) {
  if (items.length === 0) {
    return <AdminEmptyState message="暂无解决方案数据" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <AdminCustomerCard
          key={item._id}
          item={item}
          index={index}
          onOpenEdit={onOpenEdit}
          onSelectCategory={onSelectCategory}
          onTogglePublish={onTogglePublish}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
