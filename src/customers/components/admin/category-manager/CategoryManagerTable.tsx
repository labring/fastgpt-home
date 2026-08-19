'use client';

import { useSyncExternalStore } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import type { AdminManagedCategory } from './types';
import SortableCategoryRow, { StaticCategoryRow } from './SortableCategoryRow';

interface CategoryManagerTableProps {
  categories: AdminManagedCategory[];
  sensors: ReturnType<typeof import('@dnd-kit/core').useSensors>;
  onDragEnd: (event: DragEndEvent) => void | Promise<void>;
  onToggle: (id: string, currentStatus: boolean, index: number) => void | Promise<void>;
  onEdit: (category?: AdminManagedCategory) => void;
  onDelete: (id: string) => void;
}

export default function CategoryManagerTable({
  categories,
  sensors,
  onDragEnd,
  onToggle,
  onEdit,
  onDelete
}: CategoryManagerTableProps) {
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  const renderEmptyState = () => (
    <tr>
      <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
        暂无分类数据
      </td>
    </tr>
  );

  const renderStaticRows = () => {
    if (categories.length === 0) {
      return renderEmptyState();
    }

    return categories.map((category, index) => (
      <StaticCategoryRow
        key={category._id}
        category={category}
        index={index}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ));
  };

  const renderSortableRows = () => {
    if (categories.length === 0) {
      return renderEmptyState();
    }

    return (
      <SortableContext
        items={categories.map((category) => category._id)}
        strategy={verticalListSortingStrategy}
      >
        {categories.map((category, index) => (
          <SortableCategoryRow
            key={category._id}
            category={category}
            index={index}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {isHydrated ? (
          <DndContext
            id="admin-category-manager-dnd"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-sm border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-6 py-4 font-medium w-16">排序</th>
                  <th className="px-6 py-4 font-medium">分类名称</th>
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium">颜色</th>
                  <th className="px-6 py-4 font-medium">状态</th>
                  <th className="px-6 py-4 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {renderSortableRows()}
              </tbody>
            </table>
          </DndContext>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-sm border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 font-medium w-16">排序</th>
                <th className="px-6 py-4 font-medium">分类名称</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">颜色</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {renderStaticRows()}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
