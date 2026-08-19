import CategoryTabBar from "@/customers/components/CategoryTabBar";
import SortDropdown from "@/customers/components/SortDropdown";
import type { SolutionSortKey } from "@/customers/lib/solution-search";

interface Category {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

interface FilterBarProps {
  categories: Category[];
  currentCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onCategoryPrefetch?: (categoryId: string) => void;
  sortBy: SolutionSortKey;
  onSortChange: (sortBy: SolutionSortKey) => void;
}

export default function FilterBar({
  categories,
  currentCategory,
  onCategoryChange,
  onCategoryPrefetch,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="relative mb-7 flex items-center justify-between gap-3 px-1 pt-1 sm:px-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-surface-300/60 after:content-[''] dark:after:bg-[#373c43]/70">
      <CategoryTabBar
        categories={categories}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
        onCategoryPrefetch={onCategoryPrefetch}
        className="flex-1"
        maskSurface="admin"
      />

      <div className="hidden sm:block w-px h-5 bg-surface-300 dark:bg-[#373c43] self-center" />

      <SortDropdown sortBy={sortBy} onSortChange={onSortChange} align="right" compactOnMobile />
    </div>
  );
}
