import { ArrowDown as ArrowDownIcon } from 'lucide-react';
import SolutionCard, { type Solution } from '@customers/components/SolutionCard';
import EmptyState from '@customers/components/home/EmptyState';
import FilterBar from '@customers/components/home/FilterBar';
import { PUBLIC_SOLUTIONS_PAGE_SIZE } from '@customers/lib/solution-pagination';

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
  solutions: Solution[];
  hasMoreSolutions: boolean;
  onCategoryChange: (categoryId: string) => void;
  onLoadMore: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SolutionsSection({
  sectionRef,
  categories,
  currentCategory,
  solutions,
  hasMoreSolutions,
  onCategoryChange,
  onLoadMore,
  searchQuery,
  onSearchChange
}: SolutionsSectionProps) {
  return (
    <section id="customers" ref={sectionRef} className="scroll-mt-[84px]">
      <FilterBar
        categories={categories}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      {solutions.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
                revealDelay={
                  index < PUBLIC_SOLUTIONS_PAGE_SIZE ? Math.min(index, 5) * 0.05 : undefined
                }
                onCategoryClick={onCategoryChange}
              />
            ))}
          </div>

          {hasMoreSolutions && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onLoadMore}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-surface-300 bg-white px-6 py-2.5 text-sm font-bold text-[#1f2329] shadow-[0_1px_2px_rgba(31,35,41,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 hover:shadow-[0_8px_20px_rgba(31,35,41,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-100"
              >
                <ArrowDownIcon
                  strokeWidth={2.5}
                  className="text-base transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
                <span>加载更多案例</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
