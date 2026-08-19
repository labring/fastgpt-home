'use client';

import type { CategoryFormData } from './types';
import { hexToRgba, normalizeHexColor } from '@/customers/lib/category-color';
import { MagicWandIcon, SpinnerIcon } from '@phosphor-icons/react';

interface CategoryEditModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  isSuggestingSlug: boolean;
  formData: CategoryFormData;
  setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
  onClose: () => void;
  onSuggestSlug: () => void | Promise<void>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

export default function CategoryEditModal({
  isOpen,
  isSubmitting,
  isSuggestingSlug,
  formData,
  setFormData,
  onClose,
  onSuggestSlug,
  onSubmit
}: CategoryEditModalProps) {
  if (!isOpen) return null;

  const previewColor = normalizeHexColor(formData.color);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {formData.id ? '编辑分类' : '新建分类'}
          </h2>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              分类名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100"
              placeholder="例如：产品介绍"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between gap-3">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={onSuggestSlug}
                disabled={isSuggestingSlug || !formData.name.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
              >
                {isSuggestingSlug ? (
                  <SpinnerIcon size={14} className="animate-spin" />
                ) : (
                  <MagicWandIcon size={14} weight="bold" />
                )}
                智能匹配
              </button>
            </div>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, slug: event.target.value.toLowerCase() }))
              }
              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 font-mono"
              placeholder="例如：finance、healthcare、customer-service"
            />
            <p className="mt-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              用英文概括行业类别，仅支持小写字母、数字和连字符；生成的行业页路径为 /categories/{formData.slug || 'slug'}。
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              标签颜色
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={previewColor}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, color: event.target.value.toUpperCase() }))
                }
                className="h-11 w-14 cursor-pointer rounded-lg border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, color: event.target.value.toUpperCase() }))
                }
                className="flex-1 px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100"
                placeholder="#2563EB"
              />
            </div>
            <div className="mt-3">
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
                style={{
                  color: previewColor,
                  backgroundColor: hexToRgba(previewColor, 0.12),
                  borderColor: hexToRgba(previewColor, 0.28)
                }}
              >
                {formData.name || '标签效果预览'}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {isSubmitting ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
