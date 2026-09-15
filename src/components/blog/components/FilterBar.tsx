'use client';

import { Search } from 'lucide-react';

export type BlogFilter = 'all' | 'product' | 'engineering';

type FilterBarProps = {
  activeFilter: BlogFilter;
  searchQuery: string;
  labels: Record<BlogFilter, string>;
  searchLabel: string;
  onFilterChange: (filter: BlogFilter) => void;
  onSearchChange: (query: string) => void;
};

const filters: BlogFilter[] = ['all', 'product', 'engineering'];

export default function FilterBar({
  activeFilter,
  searchQuery,
  labels,
  searchLabel,
  onFilterChange,
  onSearchChange
}: FilterBarProps) {
  return (
    <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
      <div className="w-full overflow-x-auto sm:w-auto sm:overflow-visible">
        <div className="flex h-14 w-max min-w-full rounded-full border border-neutral-300 bg-slate-50 p-1 sm:min-w-0">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => onFilterChange(filter)}
              className={`h-full min-w-max flex-1 rounded-full px-8 text-xs leading-5 transition-colors sm:flex-none ${
                activeFilter === filter
                  ? 'bg-white text-gray-700 shadow-sm'
                  : 'text-gray-400 hover:text-slate-500'
              }`}
            >
              {labels[filter]}
            </button>
          ))}
        </div>
      </div>

      <label
        className={`flex h-14 w-full shrink-0 items-center rounded-full border border-neutral-300 bg-btn-light-bg px-3 text-gray-400 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
          searchQuery.trim() ? 'sm:w-64' : 'sm:w-32 sm:focus-within:w-64'
        }`}
      >
        <Search className="h-6 w-6 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchLabel}
          aria-label={searchLabel}
          className="min-w-0 flex-1 bg-transparent px-1 text-sm leading-6 text-gray-700 outline-none placeholder:text-gray-400"
        />
      </label>
    </div>
  );
}
