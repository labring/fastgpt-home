'use client';

import { ImageIcon, MagicWandIcon, SpinnerIcon, XIcon } from '@phosphor-icons/react';

interface AiImageModalProps {
  imagePrompt: string;
  isSearching: boolean;
  onPromptChange: (value: string) => void;
  onClose: () => void;
  onGenerate: () => void;
}

export default function AiImageModal({
  imagePrompt,
  isSearching,
  onPromptChange,
  onClose,
  onGenerate
}: AiImageModalProps) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 dark:border-gray-800 transform transition-all duration-300 scale-100 opacity-100">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <MagicWandIcon size={22} className="text-blue-600 dark:text-blue-400" weight="fill" />
            </div>
            AI 配图
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              <XIcon size={22} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3 mb-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <ImageIcon size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200/80 leading-relaxed">
              请输入您需要的图片描述。AI 将根据您的描述自动搜索并插入符合场景的高质量图片。
            </p>
          </div>

          <div className="relative group">
            <textarea
              value={imagePrompt}
              onChange={(event) => onPromptChange(event.target.value)}
              className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none resize-none shadow-inner transition-all scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700"
              placeholder="例如：现代商务办公场景，团队协作..."
              autoFocus
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            取消
          </button>
          <button
            onClick={onGenerate}
            disabled={isSearching || !imagePrompt.trim()}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-500/20"
          >
            {isSearching ? <SpinnerIcon className="animate-spin" size={18} /> : <MagicWandIcon size={18} weight="bold" />}
            开始配图
          </button>
        </div>
      </div>
    </div>
  );
}