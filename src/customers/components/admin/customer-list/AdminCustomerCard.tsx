'use client';

import Link from 'next/link';
import CategoryBadge from '@/customers/components/CategoryBadge';
import CustomerCoverImage from '@/customers/components/customer/CustomerCoverImage';
import { FreeUseCardBadge, FreeUseCoverShade } from '@/customers/components/customer/FreeUseAction';
import PublicCaseRibbon from '@/customers/components/customer/PublicCaseRibbon';
import {
  EyeIcon,
  EyeSlashIcon,
  HeartIcon,
  PencilSimpleIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TrashIcon
} from '@phosphor-icons/react';
import type { AdminCustomerItem } from './types';
import { buildAdminCustomerEditHref } from '@/customers/lib/admin-customer-routing';
import {
  getAdminFeedbackStats,
  getAdminCustomerCategoryColor,
  getAdminCustomerCategorySlug,
  getAdminCustomerCategoryName
} from './utils';

interface AdminCustomerCardProps {
  item: AdminCustomerItem;
  index: number;
  onOpenEdit: (item: AdminCustomerItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void | Promise<void>;
  onDelete: (id: string) => void;
}

export default function AdminCustomerCard({
  item,
  index,
  onOpenEdit,
  onSelectCategory,
  onTogglePublish,
  onDelete
}: AdminCustomerCardProps) {
  const { helpfulCount, unhelpfulCount, isWarning } = getAdminFeedbackStats(item);
  const categoryName = getAdminCustomerCategoryName(item);
  const categorySlug = getAdminCustomerCategorySlug(item);
  const categoryColor = getAdminCustomerCategoryColor(item);

  return (
    <div
      onClick={() => onOpenEdit(item)}
      className="customer-card flex flex-col h-full group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className={`card-inner relative h-full flex flex-col overflow-hidden rounded-2xl border bg-white dark:bg-[#292d33] backdrop-blur-sm shadow-elevation-1 dark:shadow-[0_4px_18px_rgba(0,0,0,0.24)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.015] group-hover:shadow-elevation-3 dark:group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.34)] transform-gpu ${isWarning ? 'border-red-300 dark:border-red-500/40 bg-red-50/30 dark:bg-red-500/10' : 'border-zinc-200 dark:border-[#373c43] group-hover:border-blue-300 dark:group-hover:border-[#5e8cfc]/50'}`}>
        {isWarning ? (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 z-50"></div>
        ) : (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600"></div>
        )}

        <div className="relative h-40 sm:h-44 overflow-hidden bg-zinc-100/50 dark:bg-[#2b2f36] border-b border-zinc-100/50 dark:border-[#373c43] img-wrapper">
          <CustomerCoverImage
            thumbnailUrl={item.thumbnailUrl}
            imageUrl={item.imageUrl}
            alt={item.title}
            loading={index < 4 ? 'eager' : 'lazy'}
            fetchPriority={index < 4 ? 'high' : 'auto'}
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-white/10"></div>
          <FreeUseCoverShade href={item.freeUseUrl} />

          <CategoryBadge
            label={categoryName || '未知分类'}
            color={categoryColor}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onSelectCategory(categorySlug);
            }}
            surface="onImage"
            className="absolute left-3 top-3 z-50 shadow-sm backdrop-blur-md"
          />

          {item.isPublicCase && <PublicCaseRibbon />}

          <FreeUseCardBadge href={item.freeUseUrl} title={item.title} />
        </div>

        <div className="relative z-10 flex flex-1 flex-col bg-transparent p-3.5 sm:p-4 md:p-4">
          <div className="flex items-start justify-between gap-2 mb-2 mt-1">
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold leading-tight text-blue-900 dark:text-[#f1f3f5] transition-colors group-hover:text-blue-600 dark:group-hover:text-[#8ab4f8] font-display line-clamp-1">
              {item.title}
            </h3>
          </div>

          <p
            className="mb-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-[#aeb4bc] line-clamp-2 sm:line-clamp-3 min-h-[36px] sm:min-h-[66px] group-hover:text-zinc-700 dark:group-hover:text-[#dfe1e5] transition-colors"
            title={item.description}
          >
            {item.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-zinc-200/70 dark:border-[#373c43] pt-3">
            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-[#aeb4bc]">
              <div className="inline-flex items-center gap-1.5" title="点赞数">
                <HeartIcon weight="fill" className="text-red-500 text-[18px]" />
                <span className="font-semibold">{item.likesCount?.toLocaleString()}</span>
              </div>
              <div className="inline-flex items-center gap-1.5" title="阅读量">
                <EyeIcon weight="fill" className="text-blue-500 text-[18px]" />
                <span className="font-semibold">{item.usageCount?.toLocaleString()}</span>
              </div>
              {(helpfulCount > 0 || unhelpfulCount > 0) && (
                <div className="inline-flex items-center gap-2 border-l border-zinc-200 dark:border-[#373c43] pl-4 ml-1">
                  <div className="inline-flex items-center gap-1 text-xs" title="有帮助">
                    <ThumbsUpIcon weight="fill" className="text-green-500" />
                    <span>{helpfulCount}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs" title="待改进">
                    <ThumbsDownIcon weight="fill" className={isWarning ? 'text-red-500' : 'text-zinc-400'} />
                    <span className={isWarning ? 'text-red-500 font-bold' : ''}>{unhelpfulCount}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-50 flex shrink-0 gap-1.5">
              <Link
                href={buildAdminCustomerEditHref(item)}
                onClick={(event) => event.stopPropagation()}
                className="group/btn flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-blue-100 dark:border-[#4b525c] bg-blue-50 dark:bg-[#203652] px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-[#8ab4f8] shadow-sm transition-all duration-300 hover:border-blue-600 dark:hover:border-[#8ab4f8] hover:bg-blue-600 dark:hover:bg-[#284262] hover:text-white dark:hover:text-[#dfe1e5] cursor-pointer"
              >
                <PencilSimpleIcon size={14} /> 编辑
              </Link>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onTogglePublish(item._id, item.isPublished);
                }}
                className={`flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold shadow-sm transition-colors cursor-pointer ${
                  item.isPublished
                    ? 'bg-emerald-500/90 text-white hover:bg-emerald-600'
                    : 'bg-amber-500/90 text-white hover:bg-amber-600'
                }`}
              >
                {item.isPublished ? <><EyeIcon size={14} /> 已发布</> : <><EyeSlashIcon size={14} /> 草稿</>}
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onDelete(item._id);
                }}
                className="flex shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-red-600 shadow-sm transition-all cursor-pointer hover:border-red-300 hover:bg-red-100 hover:text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/20 dark:hover:text-red-300"
                title="移入回收站"
              >
                <TrashIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
