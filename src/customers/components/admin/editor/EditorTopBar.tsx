'use client';

interface EditorTopBarProps {
  title: string;
  isEditing: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onSaveDraft: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPublish: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function EditorTopBar({
  title,
  isEditing,
  isSubmitting,
  onBack,
  onSaveDraft,
  onPublish
}: EditorTopBarProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-[#373c43] bg-white dark:bg-[#202124] shrink-0">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-[#f1f3f5]">
        {title}
      </h1>
      <div className="flex gap-3 items-center">
        {!isEditing && (
          <span className="text-sm text-zinc-500 mr-2">双击右侧区域即可编辑</span>
        )}
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-zinc-600 dark:text-[#aeb4bc] hover:bg-zinc-100 dark:hover:bg-[#30343b] rounded-lg transition-colors"
        >
          返回列表
        </button>
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSubmitting}
          className="px-4 py-2 bg-zinc-100 dark:bg-[#2b2f36] hover:bg-zinc-200 dark:hover:bg-[#30343b] text-zinc-900 dark:text-[#f1f3f5] rounded-lg transition-colors font-medium"
        >
          存为草稿
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm"
        >
          {isSubmitting ? '保存中...' : '发布上线'}
        </button>
      </div>
    </div>
  );
}
