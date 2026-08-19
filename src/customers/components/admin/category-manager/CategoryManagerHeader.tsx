'use client';

import { PlusIcon } from '@phosphor-icons/react';

interface CategoryManagerHeaderProps {
  onCreate: () => void;
}

export default function CategoryManagerHeader({
  onCreate
}: CategoryManagerHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">分类管理</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          管理前台展示的解决方案分类及排序（支持拖拽排序）。
        </p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
      >
        <PlusIcon size={20} />
        新建分类
      </button>
    </div>
  );
}
