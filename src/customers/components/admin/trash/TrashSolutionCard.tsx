'use client';

import { ArrowCounterClockwiseIcon, ClockCounterClockwiseIcon, TrashIcon } from '@phosphor-icons/react';
import CategoryBadge from '@/customers/components/CategoryBadge';
import SolutionCoverImage from '@/customers/components/solution/SolutionCoverImage';
import type { AdminSolutionItem } from '@/customers/components/admin/solution-list/types';
import {
  getAdminSolutionCategoryColor,
  getAdminSolutionCategoryName
} from '@/customers/components/admin/solution-list/utils';

interface TrashSolutionCardProps {
  item: AdminSolutionItem;
  onRestore: (id: string) => void;
  onDeletePermanently: (id: string) => void;
  isRestoring: boolean;
  isDeleting: boolean;
}

function formatDeletedSource(source: AdminSolutionItem['deletedSource']) {
  if (source === 'agent') {
    return 'Agent 删除';
  }

  if (source === 'admin') {
    return '人工删除';
  }

  return '未知来源';
}

function formatDateTime(value: AdminSolutionItem['deletedAt']) {
  if (!value) {
    return '未知时间';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '未知时间';
  }

  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function TrashSolutionCard({
  item,
  onRestore,
  onDeletePermanently,
  isRestoring,
  isDeleting
}: TrashSolutionCardProps) {
  const categoryName = getAdminSolutionCategoryName(item);
  const categoryColor = getAdminSolutionCategoryColor(item);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-elevation-1 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative h-40 overflow-hidden border-b border-zinc-100 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
        <SolutionCoverImage
          thumbnailUrl={item.thumbnailUrl}
          imageUrl={item.imageUrl}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-zinc-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <ClockCounterClockwiseIcon size={14} />
          {formatDateTime(item.deletedAt)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{formatDeletedSource(item.deletedSource)}</p>
          </div>
          <CategoryBadge
            label={categoryName || '未知分类'}
            color={categoryColor}
            className="shrink-0"
          />
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span>点赞 {item.likesCount?.toLocaleString() || 0}</span>
          <span>阅读 {item.usageCount?.toLocaleString() || 0}</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onRestore(item._id)}
            disabled={isRestoring || isDeleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 dark:disabled:bg-blue-900/40"
          >
            <ArrowCounterClockwiseIcon size={16} />
            {isRestoring ? '恢复中...' : '恢复案例'}
          </button>

          <button
            type="button"
            onClick={() => onDeletePermanently(item._id)}
            disabled={isRestoring || isDeleting}
            className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
            title="彻底删除"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
