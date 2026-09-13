'use client';

import Link from 'next/link';
import {
  ArrowLeft as ArrowLeftIcon,
  ChevronLeft as CaretLeftIcon,
  ChevronRight as CaretRightIcon
} from 'lucide-react';
import CategoryBadge from '@customers/components/CategoryBadge';
import SolutionCoverImage from '@customers/components/solution/SolutionCoverImage';
import { FreeUseHeroButton } from '@customers/components/solution/FreeUseAction';
import { getSafeFreeUseUrl } from '@customers/lib/free-use-url';
import { getConsultationLinkProps } from '@customers/lib/consultation';
type SolutionHeroData = {
  id: string | number;
  slug?: string;
  categoryId: string;
  categoryName: string;
  categoryColor?: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  createdAt?: string;
};

type NavSolution = { title: string; href: string } | null;

export default function SolutionHero({
  solution,
  prevSolution,
  nextSolution,
  categoryHref,
  backHref
}: {
  solution: SolutionHeroData;
  prevSolution?: NavSolution;
  nextSolution?: NavSolution;
  categoryHref: string;
  backHref: string;
}) {
  const safeFreeUseUrl = getSafeFreeUseUrl(solution.freeUseUrl);
  const consultationLink = getConsultationLinkProps({
    source: 'customers_hero',
    solutionId: solution.id,
    solutionTitle: solution.title,
    solutionSlug: solution.slug
  });

  return (
    <div className="w-full bg-surface-100  border-b border-surface-300  pt-10 pb-12 relative overflow-hidden">
      {/* 上一篇导航按钮 */}
      {prevSolution && (
        <Link
          href={prevSolution.href}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/90  backdrop-blur-sm shadow-md border border-surface-300  text-ink-sub  hover:text-brand-600  hover:scale-110 hover:shadow-lg transition-all group"
          aria-label={`上一篇：${prevSolution.title}`}
        >
          <CaretLeftIcon size={20} strokeWidth={2.5} />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/85  text-white  text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            {prevSolution.title}
          </span>
        </Link>
      )}

      {/* 下一篇导航按钮 */}
      {nextSolution && (
        <Link
          href={nextSolution.href}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/90  backdrop-blur-sm shadow-md border border-surface-300  text-ink-sub  hover:text-brand-600  hover:scale-110 hover:shadow-lg transition-all group"
          aria-label={`下一篇：${nextSolution.title}`}
        >
          <CaretRightIcon size={20} strokeWidth={2.5} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/85  text-white  text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            {nextSolution.title}
          </span>
        </Link>
      )}

      {/* 右侧封面贴住视口边缘，避免宽屏下受内容容器 max-width 限制产生留白 */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[58vw] lg:w-[62vw] z-0">
        <div className="relative h-full w-full overflow-hidden">
          <SolutionCoverImage
            thumbnailUrl={solution.thumbnailUrl}
            imageUrl={solution.imageUrl}
            alt={solution.title}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-y-0 left-0 w-[min(560px,58%)] bg-gradient-to-r from-surface-100  via-surface-100/95  to-transparent"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        {/* Hero 区域 */}
        <div className="relative flex flex-col md:flex-row items-center md:min-h-[360px] lg:pl-4">
          <div className="flex-1 space-y-5 z-10 md:max-w-[48%] md:pr-12 lg:pr-10">
            <div className="flex items-center gap-2">
              <Link
                href={backHref}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-300 bg-white/80 text-ink-sub shadow-[0_1px_2px_rgba(31,35,41,0.04)] backdrop-blur-sm transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600       md:hidden"
                aria-label="返回案例中心"
              >
                <ArrowLeftIcon strokeWidth={2.5} className="h-4 w-4" />
              </Link>
              <CategoryBadge
                label={solution.categoryName}
                color={solution.categoryColor}
                href={categoryHref}
                className="font-semibold shadow-sm transform-gpu"
              />
            </div>
            <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-[#1f2329]  font-display leading-tight">
              {solution.title}
            </h1>
            <p className="text-base sm:text-lg text-ink-sub  leading-relaxed max-w-xl">
              {solution.description}
            </p>
            {solution.createdAt && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-base text-ink-sub">
                <div className="flex items-center gap-1.5 text-ink-sub text-sm font-medium">
                  <svg
                    className="w-4 h-4 opacity-70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>发布于 {solution.createdAt.split('T')[0]}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4 w-full sm:w-auto">
              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  {...consultationLink}
                  className="inline-flex h-14 w-full min-w-[9.25rem] items-center justify-center whitespace-nowrap rounded-xl bg-brand-600 px-8 text-center text-base font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:bg-brand-800 sm:w-auto cursor-pointer"
                >
                  验证该方案
                </Link>
                <FreeUseHeroButton
                  href={safeFreeUseUrl}
                  title={solution.title}
                  className="w-full sm:w-auto"
                />
              </div>
              <p className="text-xs text-ink-sub  sm:max-w-[260px]">
                1 天内联系，确认适配后最快 3 天完成免费 POC 验证。
              </p>
            </div>
          </div>

          {/* 移动端封面仍随内容流展示，避免遮挡标题与操作按钮 */}
          <div className="w-full mt-7 md:hidden shrink-0 z-0">
            <div className="relative aspect-video w-full max-h-[240px] min-h-[180px] overflow-hidden rounded-2xl border border-surface-200 bg-surface-100 shadow-[0_1px_2px_rgba(31,35,41,0.04)]  ">
              <SolutionCoverImage
                thumbnailUrl={solution.thumbnailUrl}
                imageUrl={solution.imageUrl}
                alt={solution.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
