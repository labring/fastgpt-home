import { ArrowDownIcon } from '@phosphor-icons/react';
import SolutionCard, { type Solution } from '@/customers/components/SolutionCard';
import EmptyState from '@/customers/components/home/EmptyState';
import FilterBar from '@/customers/components/home/FilterBar';
import type { SolutionSortKey } from '@/customers/lib/solution-search';

interface CategoryOption {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

interface SolutionsSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  categories: CategoryOption[];
  currentCategory: string;
  sortBy: SolutionSortKey;
  solutions: Solution[];
  isLoading: boolean;
  isShowingStaleSolutions: boolean;
  hasMoreSolutions: boolean;
  isLoadingMore: boolean;
  isSolutionsLoading: boolean;
  onCategoryChange: (categoryId: string) => void;
  onCategoryPrefetch: (categoryId: string) => void;
  onSortChange: (sortBy: SolutionSortKey) => void;
  onLikeToggle: (id: string | number, state?: { isLiked: boolean; likes: number }) => void;
  onLoadMore: () => void;
  onOpenModal: (context?: import('@/customers/lib/cta').CtaModalContext) => void;
}

function SolutionsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[284px] animate-pulse rounded-2xl border border-surface-200 bg-white/80 shadow-[0_1px_2px_rgba(31,35,41,0.04)] dark:border-[#373c43] dark:bg-[#292d33]"
        >
          <div className="h-36 rounded-t-2xl bg-surface-100 dark:bg-[#2b2f36]" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-2/3 rounded bg-surface-200 dark:bg-[#373c43]" />
            <div className="h-3 w-full rounded bg-surface-200 dark:bg-[#373c43]" />
            <div className="h-3 w-5/6 rounded bg-surface-200 dark:bg-[#373c43]" />
            <div className="mt-6 h-px bg-surface-200 dark:bg-[#373c43]" />
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded bg-surface-200 dark:bg-[#373c43]" />
              <div className="h-4 w-16 rounded bg-surface-200 dark:bg-[#373c43]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SolutionsSection({
  sectionRef,
  categories,
  currentCategory,
  sortBy,
  solutions,
  isLoading,
  isShowingStaleSolutions,
  hasMoreSolutions,
  isLoadingMore,
  isSolutionsLoading,
  onCategoryChange,
  onCategoryPrefetch,
  onSortChange,
  onLikeToggle,
  onLoadMore,
  onOpenModal
}: SolutionsSectionProps) {
  return (
    <section id="customers" ref={sectionRef} className="scroll-mt-[84px]">
      <FilterBar
        categories={categories}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
        onCategoryPrefetch={onCategoryPrefetch}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      {isLoading ? (
        <SolutionsSkeleton />
      ) : solutions.length === 0 ? (
        <EmptyState onOpenModal={onOpenModal} />
      ) : (
        <>
          <div className="relative">
            <div
              className={`absolute left-0 right-0 -top-3 z-10 h-0.5 overflow-hidden rounded-full bg-brand-100 transition-opacity duration-200 dark:bg-[#203652] ${
                isShowingStaleSolutions ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              <div className="h-full w-1/3 animate-[shimmer_1.2s_infinite] rounded-full bg-brand-500 dark:bg-[#8ab4f8]" />
            </div>
            <div
              className={`grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-200 ${
                isShowingStaleSolutions ? 'opacity-70' : 'opacity-100'
              }`}
              aria-busy={isShowingStaleSolutions}
            >
              {solutions.map((solution, index) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  index={index}
                  onLikeToggle={onLikeToggle}
                  onCategoryClick={onCategoryChange}
                />
              ))}
            </div>
          </div>

          {hasMoreSolutions && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onLoadMore}
                disabled={isLoadingMore || isSolutionsLoading}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-surface-300 bg-white px-6 py-2.5 text-sm font-bold text-[#1f2329] shadow-[0_1px_2px_rgba(31,35,41,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 hover:shadow-[0_8px_20px_rgba(31,35,41,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-100 disabled:pointer-events-none disabled:opacity-70 dark:border-[#373c43] dark:bg-[#292d33] dark:text-[#f1f3f5] dark:shadow-[0_4px_16px_rgba(0,0,0,0.20)] dark:hover:border-[#5e6673] dark:hover:bg-[#203652] dark:hover:text-[#8ab4f8] dark:focus-visible:ring-brand-300/60 dark:focus-visible:ring-offset-[#202124]"
              >
                {isLoadingMore ? (
                  <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon
                    weight="bold"
                    className="text-base transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                )}
                <span>{isLoadingMore ? '加载中...' : '加载更多案例'}</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
