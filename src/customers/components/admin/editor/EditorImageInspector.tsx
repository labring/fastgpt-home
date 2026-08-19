'use client';

import type { MarkdownImageMatch } from './imageMarkdown';

interface EditorImageInspectorProps {
  image: MarkdownImageMatch | null;
  onAltChange: (nextAlt: string) => void;
}

export default function EditorImageInspector({
  image,
  onAltChange
}: EditorImageInspectorProps) {
  if (!image) {
    return (
      <div className="h-full rounded-2xl border border-dashed border-gray-200 bg-white/70 p-6 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950/40 dark:text-gray-400">
        <div className="flex h-full min-h-[280px] items-center justify-center text-center leading-6">
          将光标放到图片 Markdown 所在行，即可在这里查看图片并编辑图片说明。
        </div>
      </div>
    );
  }

  const imageSrc = image.src.trim();

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            图片属性
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            直接修改说明，底层会同步回写 Markdown 的 `alt` 文本。
          </div>
        </div>

        <div className="space-y-5 p-5">
          {/* ... imageSrc content ... */}
          {imageSrc ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={image.alt}
                className="block max-h-[420px] w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 text-center text-sm leading-6 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              当前图片地址为空，通常是图片仍在上传或 Markdown 尚未补全，暂时不展示预览。
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="editor-image-alt"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              图片说明
            </label>
            <input
              id="editor-image-alt"
              type="text"
              value={image.alt}
              onChange={(event) => onAltChange(event.target.value)}
              placeholder="请输入图片说明"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <div className="text-xs leading-5 text-gray-500 dark:text-gray-400">
              说明会展示在图片下方，建议写清图片内容、场景或结论。
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              图片地址
            </div>
            <div className="rounded-xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-500 dark:bg-gray-900 dark:text-gray-400 break-all">
              {imageSrc || '未填写'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
