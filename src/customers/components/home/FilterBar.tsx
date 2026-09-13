'use client';

import CategoryTabBar from '@customers/components/CategoryTabBar';
import SearchBar from '@customers/components/home/SearchBar';

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
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterBar({
  categories,
  currentCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: FilterBarProps) {
  return (
    <div className="relative mb-7 flex items-end gap-3 pt-1 sm:px-0">
      <div className="relative min-w-0 flex-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-surface-300/60 after:content-['']">
        <CategoryTabBar
          categories={categories}
          currentCategory={currentCategory}
          onCategoryChange={onCategoryChange}
          className="w-full"
        />
      </div>
      <div className="w-56 shrink-0 sm:w-72 lg:w-80">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </div>
  );
}
