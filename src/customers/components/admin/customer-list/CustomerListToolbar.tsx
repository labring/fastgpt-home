'use client';

import Link from 'next/link';
import SearchBar from '@/customers/components/SearchBar';
import CreateCustomerButton from '@/customers/components/admin/CreateCustomerButton';

interface CustomerListToolbarProps {
  search: string;
  isAiSearching: boolean;
  onSearchChange: (value: string) => void;
  onSmartSearch: (query: string) => void | Promise<void>;
}

export default function CustomerListToolbar({
  search,
  isAiSearching,
  onSearchChange,
  onSmartSearch
}: CustomerListToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">解决方案管理</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">管理所有解决方案内容、状态与分类。</p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-[400px]">
          <SearchBar
            searchQuery={search}
            onSearchChange={onSearchChange}
            onSmartSearch={onSmartSearch}
            isSearching={isAiSearching}
            placeholder="搜索标题或描述..."
          />
        </div>

        <Link
          href="/customers/admin/trash"
          className="flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap h-[44px] text-zinc-700 dark:text-zinc-200 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
        >
          回收站
        </Link>

        <CreateCustomerButton
          label="新建方案"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap h-[44px]"
        />
      </div>
    </div>
  );
}
