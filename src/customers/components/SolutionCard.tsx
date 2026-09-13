'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';
import { withBasePath } from '@customers/lib/base-path';
import { getSolutionPublicHref } from '@customers/lib/solution-url';
import type { SolutionCardData } from '@customers/types/solution';
import CategoryBadge from '@customers/components/CategoryBadge';
import SolutionCoverImage from '@customers/components/solution/SolutionCoverImage';
import { FreeUseCardBadge, FreeUseCoverShade } from '@customers/components/solution/FreeUseAction';
import PublicCaseRibbon from '@customers/components/solution/PublicCaseRibbon';

export type Solution = SolutionCardData;

interface SolutionCardProps {
  solution: Solution;
  onCategoryClick: (categoryId: string) => void;
  index?: number;
  /** 首屏淡入延迟（秒）；undefined 表示不播放入场动画（如「加载更多」追加的卡片，应即时渲染） */
  revealDelay?: number;
}

const SolutionCard = React.memo(function SolutionCard({
  solution,
  onCategoryClick,
  index = 0,
  revealDelay
}: SolutionCardProps) {
  const detailHref = withBasePath(getSolutionPublicHref(solution));
  // content 为空时不可点击、不显示「查看详情」。
  const hasContent = Boolean(solution.hasContent);
  const animated = typeof revealDelay === 'number';

  return (
    <div
      className={`solution-card flex flex-col h-full w-full ${hasContent ? 'group' : ''} ${
        animated ? 'animate-fade-in-up' : ''
      }`}
      style={animated ? { animationDelay: `${revealDelay}s` } : undefined}
    >
      <div className="card-inner relative flex flex-col h-full w-full overflow-hidden rounded-2xl border border-surface-300 bg-white shadow-[0_1px_2px_rgba(31,35,41,0.04)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#b8c0cc] group-hover:shadow-[0_14px_32px_rgba(31,35,41,0.10)] transform-gpu">
        {hasContent && (
          <Link
            href={detailHref}
            aria-label={solution.title}
            className="absolute inset-0 z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          />
        )}
        <div className="relative h-36 sm:h-40 overflow-hidden bg-surface-100 border-b border-surface-200 img-wrapper">
          <SolutionCoverImage
            thumbnailUrl={solution.thumbnailUrl}
            imageUrl={solution.imageUrl}
            alt={solution.title}
            loading={index < 4 ? 'eager' : 'lazy'}
            fetchPriority={index < 4 ? 'high' : 'auto'}
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-white/8 to-white/28"></div>
          <FreeUseCoverShade href={solution.freeUseUrl} />
          <FreeUseCardBadge href={solution.freeUseUrl} title={solution.title} />
          {solution.contentType === 'case' && <PublicCaseRibbon />}
        </div>

        <div className="relative flex flex-1 flex-col bg-transparent p-3.5 sm:p-4 md:p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold leading-tight text-[#1f2329] transition-colors group-hover:text-brand-600 font-display line-clamp-1">
              {solution.title}
            </h3>
          </div>
          <div className="hidden items-center gap-1 sm:gap-1.5 mb-1 mt-0.5 sm:mt-1">
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-surface-200 overflow-hidden bg-white">
              <Image
                alt="FastGPT"
                src={withBasePath('/fastgpt.svg')}
                fill
                sizes="20px"
                loading="eager"
                className="object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-500">FastGPT 团队</span>
          </div>
          <p
            className="mb-3 text-xs sm:text-sm leading-relaxed text-ink-sub line-clamp-2 sm:line-clamp-3 group-hover:text-[#2b2f36] transition-colors w-full"
            title={solution.description}
          >
            {solution.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-surface-200 pt-3">
            <CategoryBadge
              label={solution.categoryName}
              color={solution.categoryColor}
              onClick={() => onCategoryClick(solution.categoryId)}
              className=""
            />
            {hasContent && (
              <div className="relative z-50">
                <Link
                  href={detailHref}
                  className="group/btn flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-brand-700 transition-all duration-300 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
                >
                  查看详情
                  <ArrowRightIcon
                    strokeWidth={2.5}
                    className="text-sm transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SolutionCard;
