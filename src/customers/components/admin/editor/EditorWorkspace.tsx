'use client';

import {
  CodeIcon,
  FileIcon,
  ImageIcon,
  LinkIcon,
  MagicWandIcon,
  PlusIcon,
  SpinnerIcon,
  TextBIcon,
  TextItalicIcon,
  XIcon
} from '@phosphor-icons/react';
import { useDeferredValue, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import DesktopToc from '@/customers/components/solution/DesktopToc';
import {
  MARKDOWN_PROSE_CLASSES,
  markdownRehypePlugins,
  markdownRemarkPlugins,
  prepareMarkdownContent
} from '@/customers/components/solution/markdownConfig';
import TocToggleButton from '@/customers/components/solution/TocToggleButton';
import { markdownComponents as MarkdownComponents } from '@/customers/components/solution/MarkdownComponents';
import ImageResizeHandle from './ImageResizeHandle';
import { getMarkdownImages, replaceImageWithWidth } from './imageMarkdown';
import { focusTextareaSelection } from './utils';
import type {
  EditorCaretPosition,
  EditorFormData,
  EditorPasteProgress,
  EditorSelectionPosition,
  EditorTocItem,
  EditorToolbarAction,
  SlashCommandItem
} from './types';

interface EditorWorkspaceProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  formData: EditorFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditorFormData>>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  mediaInputRef: React.RefObject<HTMLInputElement | null>;
  attachmentInputRef: React.RefObject<HTMLInputElement | null>;
  articleRef: React.RefObject<HTMLElement | null>;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  tocItems: EditorTocItem[];
  activeId: string;
  onTocItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  isGenerating: boolean;
  isUploadingMedia: boolean;
  isDragging: boolean;
  pasteProgress: EditorPasteProgress;
  wordCount: number;
  readingTime: number;
  caretPos: EditorCaretPosition | null;
  selectionPos: EditorSelectionPosition | null;
  showPlus: boolean;
  isPlusMenuOpen: boolean;
  setIsPlusMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showSlashMenu: boolean;
  showFloatingToolbar: boolean;
  filteredSlashCommands: SlashCommandItem[];
  groupedSlashCommands: Record<string, SlashCommandItem[]>;
  updateCaretPosition: () => void;
  handleTextareaClick: () => void;
  handlePaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void | Promise<void>;
  handleDragOver: (event: React.DragEvent<HTMLTextAreaElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLTextAreaElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLTextAreaElement>) => void | Promise<void>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleToolbarAction: (action: EditorToolbarAction) => void;
  handleSlashCommand: (command: string) => void;
  handleMediaChange: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  handleAttachmentChange: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  openAiModal: () => void;
  openAiImageModal: () => void;
  stopGenerating: () => void;
}

export default function EditorWorkspace({
  isEditing,
  setIsEditing,
  formData,
  setFormData,
  textareaRef,
  mediaInputRef,
  attachmentInputRef,
  articleRef,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  tocItems,
  activeId,
  onTocItemClick,
  isGenerating,
  isUploadingMedia,
  isDragging,
  pasteProgress,
  wordCount,
  readingTime,
  caretPos,
  selectionPos,
  showPlus,
  isPlusMenuOpen,
  setIsPlusMenuOpen,
  showSlashMenu,
  showFloatingToolbar,
  filteredSlashCommands,
  groupedSlashCommands,
  updateCaretPosition,
  handleTextareaClick,
  handlePaste,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleKeyDown,
  handleToolbarAction,
  handleSlashCommand,
  handleMediaChange,
  handleAttachmentChange,
  openAiModal,
  openAiImageModal,
  stopGenerating
}: EditorWorkspaceProps) {
  const deferredPreviewContent = useDeferredValue(formData.content);
  const previewImages = useMemo(
    () => getMarkdownImages(deferredPreviewContent),
    [deferredPreviewContent]
  );
  const previewMarkdownComponents = useMemo<Components>(() => {
    const renderedImageCountByKey = new Map<string, number>();

    return {
      ...MarkdownComponents,
      img: ({ ...props }) => {
        const imageSrc = typeof props.src === 'string' ? props.src.trim() : '';
        const imageAlt = props.alt || '';
        const imageKey = `${imageAlt}\u0000${imageSrc}`;
        const renderedCount = renderedImageCountByKey.get(imageKey) ?? 0;
        const sameImages = previewImages.filter(
          (image) => image.src === imageSrc && image.alt === imageAlt
        );
        const matchedImage = sameImages[renderedCount] ?? sameImages[0] ?? null;
        renderedImageCountByKey.set(imageKey, renderedCount + 1);

        const focusMatchedImageAlt = () => {
          if (!matchedImage) {
            return;
          }

          const textarea = textareaRef.current;
          if (!textarea) {
            return;
          }

          focusTextareaSelection(textarea, matchedImage.lineStart, matchedImage.lineEnd);
        };

        if (!imageSrc) {
          return (
            <span className="flex flex-col items-center justify-center !my-0 w-full bg-transparent">
              <span className="flex w-full max-w-3xl items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
                {imageAlt || '图片地址为空，暂不渲染预览'}
              </span>
            </span>
          );
        }

        return (
          <span className="flex flex-col items-center justify-center !my-0 w-full bg-transparent">
            <ImageResizeHandle
              src={imageSrc}
              alt={imageAlt}
              currentWidth={typeof props.width === 'string' ? props.width : undefined}
              dataLineStart={matchedImage?.lineStart}
              onClick={focusMatchedImageAlt}
              onResize={(newWidthPercent) => {
                if (!matchedImage) return;
                setFormData((prev) => ({
                  ...prev,
                  content: replaceImageWithWidth(prev.content, matchedImage, newWidthPercent),
                }));
              }}
            />
            {imageAlt && (
              <span className="mt-2 text-center text-[13px] font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                {imageAlt}
              </span>
            )}
          </span>
        );
      }
    };
  }, [previewImages, setFormData, textareaRef]);

  return (
    <div className="w-full bg-white dark:bg-[#202124] pt-6 pb-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TocToggleButton
          onClick={() => setIsSidebarCollapsed(false)}
          isVisible={isSidebarCollapsed && !isEditing}
          className="hidden lg:flex"
        />

        <div className="flex flex-col lg:flex-row items-start relative w-full">
          <article ref={articleRef} className="min-w-0 flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex bg-[#eff0f1] dark:bg-[#2b2f36] p-1 rounded-xl ring-1 ring-[#dee0e3] dark:ring-[#373c43] shadow-sm">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                    isEditing
                      ? 'bg-white dark:bg-[#30343b] text-blue-600 dark:text-[#8ab4f8] shadow-md'
                      : 'text-[#646a73] dark:text-[#aeb4bc] hover:text-[#2b2f36] dark:hover:text-[#dfe1e5]'
                  }`}
                >
                  编辑模式
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                    !isEditing
                      ? 'bg-white dark:bg-[#30343b] text-blue-600 dark:text-[#8ab4f8] shadow-md'
                      : 'text-[#646a73] dark:text-[#aeb4bc] hover:text-[#2b2f36] dark:hover:text-[#dfe1e5]'
                  }`}
                >
                  预览模式
                </button>
              </div>

              {isEditing && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openAiModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                    disabled={isGenerating}
                  >
                    <MagicWandIcon size={16} weight="fill" />
                    AI 生成文章
                  </button>
                  <input
                    type="file"
                    ref={mediaInputRef}
                    onChange={handleMediaChange}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={attachmentInputRef}
                    onChange={handleAttachmentChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => mediaInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#646a73] bg-[#eff0f1] hover:bg-[#dee0e3] dark:text-[#dfe1e5] dark:bg-[#2b2f36] dark:hover:bg-[#30343b] rounded-lg transition-colors"
                    disabled={isUploadingMedia}
                  >
                    <ImageIcon size={16} />
                    插入图片/视频
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                <div className={`h-[calc(100vh-220px)] min-h-[800px] overflow-hidden border rounded-2xl shadow-inner relative transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                  : 'border-[#dee0e3] dark:border-[#373c43] bg-[#f7f8fa] dark:bg-[#292d33] focus-within:ring-2 focus-within:ring-blue-500/20'
              }`}>
                {pasteProgress.isActive && (
                  <div className="absolute inset-x-4 top-4 z-30 rounded-2xl border border-[#bacefd] bg-white/95 px-4 py-3 shadow-lg backdrop-blur dark:border-[#4b525c] dark:bg-[#292d33]/95">
                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <SpinnerIcon className="animate-spin" size={16} />
                      <span className="font-medium">{pasteProgress.message}</span>
                      <span className="ml-auto text-xs font-semibold tabular-nums">
                        {pasteProgress.progress}%
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950/60">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-[width] duration-300 ease-out dark:bg-blue-400"
                        style={{ width: `${pasteProgress.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <textarea
                  ref={textareaRef}
                  value={formData.content}
                  onChange={(event) => {
                    setIsPlusMenuOpen(false);
                    setFormData((prev) => ({ ...prev, content: event.target.value }));
                  }}
                  onKeyUp={updateCaretPosition}
                  onClick={handleTextareaClick}
                  onScroll={() => {
                    setIsPlusMenuOpen(false);
                    updateCaretPosition();
                  }}
                  onFocus={updateCaretPosition}
                  onSelect={updateCaretPosition}
                  onPaste={handlePaste}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onKeyDown={handleKeyDown}
                  className={`w-full h-full pr-8 pl-14 bg-transparent resize-none outline-none font-mono text-[15px] leading-relaxed text-[#2b2f36] dark:text-[#dfe1e5] focus:ring-0 rounded-2xl scrollbar-thin scrollbar-thumb-[#dee0e3] dark:scrollbar-thumb-[#4b525c] ${
                    pasteProgress.isActive ? 'pt-28 pb-8' : 'py-8'
                  }`}
                  placeholder="在此输入 Markdown 内容... (支持拖拽或粘贴图片)"
                />

                {showPlus && caretPos && (
                  <div
                    className="absolute z-10 transition-all duration-200 ease-in-out"
                    style={{
                      top: `${caretPos.top}px`,
                      left: `${Math.max(16, caretPos.left - 40)}px`,
                      transform: `translateY(calc(-50% + ${caretPos.height / 2}px))`
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
                      className={`p-1.5 rounded-full bg-white dark:bg-[#2b2f36] border border-[#dee0e3] dark:border-[#373c43] shadow-sm text-[#646a73] dark:text-[#aeb4bc] hover:text-blue-600 hover:bg-[#e8f3ff] dark:hover:bg-[#30343b] transition-all ${isPlusMenuOpen ? 'rotate-45' : ''}`}
                      title="插入内容"
                    >
                      <PlusIcon size={16} weight="bold" />
                    </button>

                    {isPlusMenuOpen && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white dark:bg-[#2b2f36] border border-[#dee0e3] dark:border-[#373c43] rounded-lg shadow-lg py-1 w-36 overflow-hidden flex flex-col z-20">
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlusMenuOpen(false);
                            mediaInputRef.current?.click();
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                        >
                          <ImageIcon size={16} />
                          <span>图片 / 视频</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlusMenuOpen(false);
                            attachmentInputRef.current?.click();
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                        >
                          <FileIcon size={16} />
                          <span>文件</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlusMenuOpen(false);
                            openAiImageModal();
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 w-full text-left"
                        >
                          <MagicWandIcon size={16} />
                          <span>AI 配图</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {showSlashMenu && caretPos && filteredSlashCommands.length > 0 && (
                  <div
                    className="absolute z-20 bg-white dark:bg-[#2b2f36] border border-[#dee0e3] dark:border-[#373c43] rounded-xl shadow-xl w-56 max-h-80 overflow-hidden flex flex-col"
                    style={{
                      top: `${caretPos.top + caretPos.height + 4}px`,
                      left: `${caretPos.left}px`
                    }}
                  >
                    <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                      {Object.entries(groupedSlashCommands).map(([groupName, commands]) => (
                        <div key={groupName} className="mb-1 last:mb-0">
                          <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur z-10">
                            {groupName}
                          </div>
                          {commands.map((command) => (
                            <button
                              key={command.id}
                              type="button"
                              onClick={() => handleSlashCommand(command.id)}
                              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                            >
                              <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400">
                                {command.icon}
                              </div>
                              <span>{command.title}</span>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showFloatingToolbar && selectionPos && (
                  <div
                    className="absolute z-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl flex items-center px-1 py-1"
                    style={{
                      top: `${Math.max(10, selectionPos.top - 48)}px`,
                      left: `${Math.max(16, selectionPos.left - 70)}px`
                    }}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <button
                      type="button"
                      onClick={() => handleToolbarAction('bold')}
                      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="加粗 (Cmd/Ctrl + B)"
                    >
                      <TextBIcon size={18} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToolbarAction('italic')}
                      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="斜体 (Cmd/Ctrl + I)"
                    >
                      <TextItalicIcon size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToolbarAction('link')}
                      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="链接 (Cmd/Ctrl + K)"
                    >
                      <LinkIcon size={18} />
                    </button>
                    <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                    <button
                      type="button"
                      onClick={() => handleToolbarAction('code')}
                      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="行内代码"
                    >
                      <CodeIcon size={18} />
                    </button>
                  </div>
                )}

                {isGenerating && (
                  <div className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
                    <SpinnerIcon className="animate-spin" size={20} />
                    <span className="text-sm font-medium">AI 正在生成内容...</span>
                    <button
                      onClick={stopGenerating}
                      className="ml-2 hover:bg-white/20 p-1.5 rounded-md transition-colors"
                      title="停止生成"
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                )}

                {!isGenerating && wordCount > 0 && (
                  <div className="fixed bottom-8 right-8 z-40 px-4 py-2.5 bg-white/90 dark:bg-[#2b2f36]/90 backdrop-blur-md text-sm text-[#646a73] dark:text-[#dfe1e5] rounded-xl shadow-lg border border-[#dee0e3] dark:border-[#373c43] pointer-events-none transition-all duration-300 opacity-60 hover:opacity-100 group-focus-within:opacity-100">
                    {wordCount} 字 · 预计阅读 {readingTime} 分钟
                  </div>
                )}
                </div>

                <div className="h-[calc(100vh-220px)] min-h-[800px] xl:sticky xl:top-6">
                  <div className="h-full rounded-2xl border border-[#dee0e3] bg-white shadow-sm dark:border-[#373c43] dark:bg-[#202124] overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#dee0e3] dark:scrollbar-thumb-gray-700">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#1f2329] dark:text-[#f1f3f5]">
                            实时预览
                          </div>
                          <div className="mt-1 text-xs text-[#646a73] dark:text-gray-400">
                            点击左侧编辑区图片链接，预览区将自动滚动到对应图片位置。
                          </div>
                        </div>
                      </div>
                      <div className={`${MARKDOWN_PROSE_CLASSES} wrap-break-word text-[14px] sm:text-[15px]`}>
                        <ReactMarkdown
                          remarkPlugins={markdownRemarkPlugins}
                          rehypePlugins={markdownRehypePlugins}
                          components={previewMarkdownComponents}
                        >
                          {prepareMarkdownContent(
                            deferredPreviewContent || '*双击此区域开始编辑正文内容...*'
                          )}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${MARKDOWN_PROSE_CLASSES} text-[15px] sm:text-base`}>
                <ReactMarkdown
                  remarkPlugins={markdownRemarkPlugins}
                  rehypePlugins={markdownRehypePlugins}
                  components={MarkdownComponents}
                >
                  {prepareMarkdownContent(formData.content || '*双击此区域开始编辑正文内容...*')}
                </ReactMarkdown>
              </div>
            )}
          </article>

          {!isEditing && tocItems.length > 0 && (
            <DesktopToc
              isCollapsed={isSidebarCollapsed}
              onCollapse={() => setIsSidebarCollapsed(true)}
              tocItems={tocItems}
              activeId={activeId}
              openModal={() => {}}
              onItemClick={onTocItemClick}
              isEditor={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
