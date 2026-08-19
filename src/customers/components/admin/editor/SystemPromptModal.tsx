'use client';

import { FloppyDiskIcon, GearSixIcon, SpinnerIcon, XIcon } from '@phosphor-icons/react';

interface SystemPromptModalProps {
  isLoading: boolean;
  isSaving: boolean;
  systemPrompt: string;
  onClose: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
}

export default function SystemPromptModal({
  isLoading,
  isSaving,
  systemPrompt,
  onClose,
  onChange,
  onSave
}: SystemPromptModalProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-200 dark:border-gray-800 transform transition-all duration-300">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <GearSixIcon size={22} className="text-purple-600 dark:text-purple-400" weight="fill" />
            </div>
            系统提示词设置 (SYSTEM_PROMPT)
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <XIcon size={22} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3 mb-4 p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <p className="text-sm text-purple-800 dark:text-purple-200/80 leading-relaxed">
              调整此提示词可深度定制 AI 生成的 Markdown 排版规范、语气风格及业务逻辑。保存后将对所有后续的 AI 生成任务生效。建议由熟悉 FastGPT 社区规范的管理员进行修改。
            </p>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="w-full h-[500px] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <SpinnerIcon className="animate-spin text-purple-600 mb-3" size={32} />
                <span className="text-sm text-gray-500">正在加载系统提示词...</span>
              </div>
            ) : (
              <textarea
                value={systemPrompt}
                onChange={(event) => onChange(event.target.value)}
                className="w-full h-[500px] p-5 font-mono text-[13px] leading-relaxed border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none resize-none shadow-inner scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                placeholder="输入 SYSTEM_PROMPT..."
              />
            )}
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
            onClick={onSave}
            disabled={isSaving || isLoading || !systemPrompt.trim()}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-purple-500/20"
          >
            {isSaving ? <SpinnerIcon className="animate-spin" size={18} /> : <FloppyDiskIcon size={18} weight="bold" />}
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
