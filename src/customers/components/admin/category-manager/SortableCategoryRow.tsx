'use client';

import type { ButtonHTMLAttributes, CSSProperties, Ref } from 'react';
import { PencilSimpleIcon, TrashIcon, ListIcon } from '@phosphor-icons/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { AdminManagedCategory } from './types';
import { hexToRgba, normalizeHexColor } from '@/customers/lib/category-color';

interface SortableCategoryRowProps {
  category: AdminManagedCategory;
  index: number;
  onToggle: (id: string, currentStatus: boolean, index: number) => void | Promise<void>;
  onEdit: (category?: AdminManagedCategory) => void;
  onDelete: (id: string) => void;
}

interface CategoryRowContentProps extends SortableCategoryRowProps {
  rowRef?: Ref<HTMLTableRowElement>;
  rowStyle?: CSSProperties;
  rowClassName?: string;
  dragHandleProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

function CategoryRowContent({
  category,
  index,
  onToggle,
  onEdit,
  onDelete,
  rowRef,
  rowStyle,
  rowClassName,
  dragHandleProps
}: CategoryRowContentProps) {
  const categoryColor = normalizeHexColor(category.color);

  return (
    <tr
      ref={rowRef}
      style={rowStyle}
      className={rowClassName}
    >
      <td className="px-6 py-4">
        <button
          {...dragHandleProps}
          className={`p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 ${dragHandleProps?.className || ''}`.trim()}
          title="拖拽排序"
          type="button"
        >
          <ListIcon size={20} />
        </button>
      </td>
      <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100 font-medium">
        {category.name}
      </td>
      <td className="px-6 py-4">
        <code className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
          {category.slug}
        </code>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            className="h-4 w-4 rounded-full border"
            style={{
              backgroundColor: categoryColor,
              borderColor: hexToRgba(categoryColor, 0.3)
            }}
          />
          <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
            {categoryColor}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onToggle(category._id, category.isActive, index)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            category.isActive ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            category.isActive ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          title="编辑"
        >
          <PencilSimpleIcon size={20} />
        </button>
        <button
          onClick={() => onDelete(category._id)}
          className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="删除"
        >
          <TrashIcon size={20} />
        </button>
      </td>
    </tr>
  );
}

export function StaticCategoryRow(props: SortableCategoryRowProps) {
  return (
    <CategoryRowContent
      {...props}
      rowClassName="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors"
      dragHandleProps={{
        type: 'button',
        className: 'cursor-default opacity-60',
        disabled: true,
        'aria-hidden': true,
        tabIndex: -1
      }}
    />
  );
}

export default function SortableCategoryRow({
  category,
  index,
  onToggle,
  onEdit,
  onDelete
}: SortableCategoryRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: category._id });

  const rowStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const
  };

  return (
    <CategoryRowContent
      category={category}
      index={index}
      onToggle={onToggle}
      onEdit={onEdit}
      onDelete={onDelete}
      rowRef={setNodeRef}
      rowStyle={rowStyle}
      rowClassName={`hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors ${isDragging ? 'bg-zinc-100 dark:bg-zinc-800 shadow-lg' : ''}`}
      dragHandleProps={{
        ...attributes,
        ...listeners,
        className: 'cursor-grab active:cursor-grabbing'
      }}
    />
  );
}
