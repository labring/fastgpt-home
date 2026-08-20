'use client';

import CategoryTabBar from '@/customers/components/CategoryTabBar';
import SortDropdown from '@/customers/components/SortDropdown';
import type { AdminCategory } from './types';
import { ADMIN_SORT_OPTIONS, type AdminCustomerSortKey } from '@/customers/lib/customer-search';

type AdminCategoryTab = {
  id: string;
  name: string;
  slug?: string;
  color?: string;
};

interface CategoryTabsProps {
  categories: AdminCategory[];
  currentCategory: string;
  setCurrentCategory: (value: string) => void;
  sortBy: AdminCustomerSortKey;
  onSortChange: (value: AdminCustomerSortKey) => void;
}

export default function CategoryTabs({
  categories,
  currentCategory,
  setCurrentCategory,
  sortBy,
  onSortChange
}: CategoryTabsProps) {
  if (!categories.length) return null;

  const categoryTabs: AdminCategoryTab[] = [
    { id: 'all', name: '全部' },
    ...categories.map((category) => ({
      id: category._id,
      name: category.name,
      slug: category.slug,
      color: category.color
    }))
  ];

  const handleCategoryChange = (categoryKey: string) => {
    const selectedCategory = categoryTabs.find(
      (category) => category.id === categoryKey || category.slug === categoryKey
    );

    setCurrentCategory(selectedCategory?.slug || categoryKey);
  };

  return (
    <div className="relative flex flex-col sm:flex-row justify-between items-stretch sm:items-center min-w-0 mb-6 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-zinc-200 after:content-[''] dark:after:bg-zinc-800">
      <CategoryTabBar
        categories={categoryTabs}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
        className="flex-1"
        maskSurface="admin"
      />

      <div className="hidden sm:block w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-4 self-center" />

      <SortDropdown
        sortBy={sortBy}
        onSortChange={onSortChange}
        options={ADMIN_SORT_OPTIONS}
        align="right"
      />
    </div>
  );
}
