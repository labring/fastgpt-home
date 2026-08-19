'use client';

import Link from 'next/link';

interface TrashToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onClearTrash: () => void;
  isClearing: boolean;
  disableClear: boolean;
}

export default function TrashToolbar({
  search,
  onSearchChange,
  onClearTrash,
  isClearing,
  disableClear
}: TrashToolbarProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">回收站</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            所有删除操作都会先进入回收站，只有在这里进行人工操作才会彻底删除。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/customers/admin/customers"
            className="flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 font-medium text-zinc-700 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
          >
            返回案例列表
          </Link>
          <button
            type="button"
            onClick={onClearTrash}
            disabled={disableClear || isClearing}
            className="flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300 dark:disabled:bg-red-900/40"
          >
            {isClearing ? '清空中...' : '清空回收站'}
          </button>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="搜索回收站中的标题或描述..."
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
        />
      </div>
    </div>
  );
}
