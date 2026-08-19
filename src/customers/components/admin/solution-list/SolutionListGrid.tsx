'use client';

import AdminEmptyState from '@/customers/components/admin/shared/AdminEmptyState';
import type { AdminSolutionItem } from './types';
import AdminSolutionCard from './AdminSolutionCard';

interface SolutionListGridProps {
  items: AdminSolutionItem[];
  onOpenEdit: (item: AdminSolutionItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void | Promise<void>;
  onDelete: (id: string) => void;
}

export default function SolutionListGrid({
  items,
  onOpenEdit,
  onSelectCategory,
  onTogglePublish,
  onDelete
}: SolutionListGridProps) {
  if (items.length === 0) {
    return <AdminEmptyState message="暂无解决方案数据" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <AdminSolutionCard
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
