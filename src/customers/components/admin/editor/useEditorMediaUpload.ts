'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { EditorFormData, EditorPasteProgress } from './types';
import { convertPastedContentToMarkdown } from './clipboardMarkdown';
import { useUploadQueue } from '@/customers/components/providers/UploadQueueProvider';
import {
  buildUploadPlaceholder,
  decorateHtmlWithClipboardUploads,
  getClipboardFileItems,
  getMediaFileStem,
  getMediaLabel,
  getMediaSource,
  isFeishuRemoteMediaSource,
  mightContainFeishuRemoteMedia,
  parseFrontmatter,
  setElementMediaSource,
  type SupportedContentKind
} from './media/clipboard';
import {
  insertMarkdownBlockAtSelection,
  insertTextAtSelection
} from './media/insert';
import { uploadRemoteMediaToS3 } from './media/remote-upload';

interface UseEditorMediaUploadProps {
  formData: EditorFormData;
  setFormData: Dispatch<SetStateAction<EditorFormData>>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  mediaInputRef: RefObject<HTMLInputElement | null>;
  attachmentInputRef: RefObject<HTMLInputElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  draftKey: string;
}

const IDLE_PASTE_PROGRESS: EditorPasteProgress = {
  isActive: false,
  progress: 0,
  message: ''
};

async function compressImageFile(file: File) {
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp'
  };

  const compressedFile = await imageCompression(file, options);
  const newFileName = `${file.name.replace(/\.[^/.]+$/, '')}.webp`;
  return new File([compressedFile], newFileName, { type: 'image/webp' });
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

export function useEditorMediaUpload({
  formData,
  setFormData,
  fileInputRef,
  mediaInputRef,
  attachmentInputRef,
  textareaRef,
  draftKey
}: UseEditorMediaUploadProps) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pasteProgress, setPasteProgress] = useState<EditorPasteProgress>(IDLE_PASTE_PROGRESS);
  const contentRef = useRef(formData.content);
  const {
    enqueueContentUpload,
    enqueueCoverUpload,
    getDraftPendingUploadCountByKind
  } = useUploadQueue();
  const hasPendingContentUploads = useMemo(
    () => getDraftPendingUploadCountByKind(draftKey, 'content') > 0,
    [draftKey, getDraftPendingUploadCountByKind]
  );
  const hasPendingCoverUploads = useMemo(
    () => getDraftPendingUploadCountByKind(draftKey, 'cover') > 0,
    [draftKey, getDraftPendingUploadCountByKind]
  );

  useEffect(() => {
    contentRef.current = formData.content;
  }, [formData.content]);

  const updatePasteProgress = useCallback(
    async (progress: number, message: string, waitForPaint = false) => {
      setPasteProgress({
        isActive: true,
        progress,
        message
      });

      if (waitForPaint) {
        await waitForNextPaint();
      }
    },
    []
  );

  const resetPasteProgress = useCallback(() => {
    setPasteProgress(IDLE_PASTE_PROGRESS);
  }, []);

  const ensureStorageFolder = useCallback(async () => {
    return formData.storageFolder;
  }, [formData.storageFolder]);

  const rewriteFeishuRemoteMedia = useCallback(async (html: string) => {
    if (!html.trim()) {
      return {
        html,
        uploadedCount: 0,
        failedCount: 0
      };
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');
    const mediaElements = Array.from(
      document.body.querySelectorAll<HTMLElement>('img, video')
    );
    const storageFolder = await ensureStorageFolder();
    let uploadedCount = 0;
    let failedCount = 0;

    for (const [index, element] of mediaElements.entries()) {
      const source = getMediaSource(element);
      if (!isFeishuRemoteMediaSource(source)) {
        continue;
      }

      const contentKind = element.tagName.toLowerCase() === 'video' ? 'video' : 'image';
      const contentLabel = getMediaLabel(element);

      try {
        const uploadedUrl = await uploadRemoteMediaToS3({
          sourceUrl: source,
          storageFolder,
          fileStem: getMediaFileStem(contentKind, contentLabel, index)
        });
        setElementMediaSource(element, uploadedUrl);
        uploadedCount += 1;
      } catch (error) {
        console.error(error);
        failedCount += 1;
      }
    }

    return {
      html: document.body.innerHTML,
      uploadedCount,
      failedCount
    };
  }, [ensureStorageFolder]);

  const insertTextAtCursor = useCallback((textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setFormData((prev) => ({ ...prev, content: prev.content + textToInsert }));
      return;
    }

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const next = insertTextAtSelection(contentRef.current, textToInsert, startPos, endPos);

    setFormData((prev) => ({ ...prev, content: next.content }));

    setTimeout(() => {
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(next.cursor, next.cursor);
    }, 0);
  }, [setFormData, textareaRef]);

  const enqueueUploadForPlaceholder = useCallback(async ({
    file,
    placeholder,
    contentKind,
    contentLabel
  }: {
    file: File;
    placeholder: string;
    contentKind: SupportedContentKind;
    contentLabel?: string;
  }) => {
    let fileToUpload = file;

    if (contentKind === 'image') {
      try {
        fileToUpload = await compressImageFile(file);
      } catch (error) {
        console.error('Image compression failed:', error);
      }
    }

    const storageFolder = await ensureStorageFolder();
    await enqueueContentUpload({
      draftKey,
      storageFolder,
      file: fileToUpload,
      placeholder,
      contentKind,
      contentLabel
    });
  }, [draftKey, ensureStorageFolder, enqueueContentUpload]);

  const uploadFile = useCallback(async (file: File, forcedContentKind?: SupportedContentKind) => {
    const textarea = textareaRef.current;
    const scrollPos = textarea?.scrollTop;
    const insertPos = textarea ? textarea.selectionStart : contentRef.current.length;
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const contentKind: SupportedContentKind = forcedContentKind ?? (
      isImage
        ? 'image'
        : isVideo
          ? 'video'
          : 'file'
    );
    const placeholder = buildUploadPlaceholder(contentKind);

    setIsUploadingMedia(true);

    let prefix = '';
    if (textarea && insertPos > 0) {
      const previousChar = contentRef.current.charAt(insertPos - 1);
      if (previousChar !== '\n') {
        prefix = '\n';
      }
    }

    const textToInsert = `${prefix}${placeholder}\n`;
    insertTextAtCursor(textToInsert);

    try {
      await enqueueUploadForPlaceholder({
        file,
        placeholder,
        contentKind,
        contentLabel: file.name
      });

      if (textarea && scrollPos !== undefined) {
        setTimeout(() => {
          textarea.scrollTop = scrollPos;
          textarea.focus({ preventScroll: true });
        }, 0);
      }

      toast.success('已加入后台上传队列');
    } catch (error: unknown) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : '上传失败');
      setFormData((prev) => ({
        ...prev,
        content: prev.content.replace(textToInsert, '')
      }));
    } finally {
      setIsUploadingMedia(getDraftPendingUploadCountByKind(draftKey, 'content') > 0);
      if (mediaInputRef.current) mediaInputRef.current.value = '';
      if (attachmentInputRef.current) attachmentInputRef.current.value = '';
    }
  }, [
    attachmentInputRef,
    draftKey,
    enqueueUploadForPlaceholder,
    getDraftPendingUploadCountByKind,
    insertTextAtCursor,
    mediaInputRef,
    setFormData,
    textareaRef
  ]);

  const insertMarkdownBlock = useCallback((markdown: string) => {
    const textarea = textareaRef.current;
    if (!markdown.trim()) {
      return;
    }

    if (!textarea) {
      setFormData((prev) => ({
        ...prev,
        content: prev.content ? `${prev.content}\n${markdown}` : markdown
      }));
      return;
    }

    const next = insertMarkdownBlockAtSelection(
      contentRef.current,
      markdown,
      textarea.selectionStart,
      textarea.selectionEnd
    );

    setFormData((prev) => ({
      ...prev,
      content: next.content
    }));

    setTimeout(() => {
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(next.cursor, next.cursor);
    }, 0);
  }, [setFormData, textareaRef]);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    let fileToUpload = file;

    if (file.type.startsWith('image/')) {
      try {
        fileToUpload = await compressImageFile(file);
      } catch (error) {
        console.error('Cover image compression failed:', error);
      }
    }

    try {
      const storageFolder = await ensureStorageFolder();
      await enqueueCoverUpload({
        draftKey,
        storageFolder,
        file: fileToUpload
      });
      toast.success('封面图已加入后台上传队列');
    } catch (error) {
      console.error(error);
      toast.error('上传出错，请稍后重试');
    } finally {
      setIsUploadingImage(getDraftPendingUploadCountByKind(draftKey, 'cover') > 0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [
    draftKey,
    ensureStorageFolder,
    enqueueCoverUpload,
    fileInputRef,
    getDraftPendingUploadCountByKind
  ]);

  const getCaretOffsetFromPoint = useCallback((clientX: number, clientY: number) => {
    if (document.caretPositionFromPoint) {
      const position = document.caretPositionFromPoint(clientX, clientY);
      return position?.offset ?? null;
    }

    if (document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(clientX, clientY);
      return range?.startOffset ?? null;
    }

    return null;
  }, []);

  const handleMediaChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  }, [uploadFile]);

  const handleAttachmentChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file, 'file');
  }, [uploadFile]);

  const handlePaste = useCallback(async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardFiles = getClipboardFileItems(event.clipboardData.items);
    const html = event.clipboardData.getData('text/html');
    const text = event.clipboardData.getData('text/plain');
    const types = Array.from(event.clipboardData.types);
    const isCodeEditor = types.includes('vscode-editor-data') || types.includes('text/x-webstorm-clipboard');

    // 检测粘贴内容是否包含 frontmatter（--- name: xxx / description: xxx ---），
    // 如果匹配则自动提取 name/description 填写到表单，并从正文中移除该 block
    if (text.trimStart().startsWith('---')) {
      const parsed = parseFrontmatter(text);
      if (parsed) {
        event.preventDefault();
        setFormData((prev) => ({
          ...prev,
          ...(parsed.name ? { title: parsed.name } : {}),
          ...(parsed.description ? { description: parsed.description } : {}),
        }));
        if (parsed.body.trim()) {
          insertMarkdownBlock(parsed.body.trimStart());
        }
        return;
      }
    }

    // 如果是从代码编辑器复制的纯文本代码（如 VS Code），它生成的 HTML 只是语法高亮
    // 我们应该直接使用 text/plain，避免 HTML 被解析为带有过多空行的 Markdown
    if (html.trim() && !isCodeEditor) {
      event.preventDefault();

      try {
        await updatePasteProgress(10, '正在读取粘贴内容...', true);

        const transferMessage = mightContainFeishuRemoteMedia(html)
          ? '正在转存飞书图片和视频...'
          : '正在整理富文本结构...';
        await updatePasteProgress(35, transferMessage, true);

        const {
          html: htmlWithRemoteMedia,
          failedCount: remoteFailedCount
        } = await rewriteFeishuRemoteMedia(html);

        await updatePasteProgress(68, '正在转换为 Markdown...', true);
        const { html: decoratedHtml, uploadTasks } = decorateHtmlWithClipboardUploads(
          htmlWithRemoteMedia,
          clipboardFiles
        );
        const markdown = convertPastedContentToMarkdown({
          html: decoratedHtml,
          text
        });

        await updatePasteProgress(86, '正在插入正文...', false);
        if (markdown) {
          insertMarkdownBlock(markdown);
        }

        if (uploadTasks.length > 0) {
          setIsUploadingMedia(true);
          await updatePasteProgress(
            92,
            `正在加入 ${uploadTasks.length} 个媒体到后台上传队列...`,
            true
          );
        }

        const failedTasks: string[] = [];

        for (const [index, task] of uploadTasks.entries()) {
          const progress = 92 + Math.round(((index + 1) / uploadTasks.length) * 8);
          await updatePasteProgress(
            progress,
            `正在加入 ${uploadTasks.length} 个媒体到后台上传队列... (${index + 1}/${uploadTasks.length})`
          );

          try {
            await enqueueUploadForPlaceholder(task);
          } catch (error) {
            console.error(error);
            failedTasks.push(task.placeholder);
          }
        }

        if (failedTasks.length > 0) {
          setFormData((prev) => ({
            ...prev,
            content: prev.content
              .split('\n')
              .filter((line) => !failedTasks.includes(line.trim()))
              .join('\n')
          }));
          toast.error('部分飞书媒体加入上传队列失败，请重试');
        } else if (uploadTasks.length > 0) {
          toast.success(`${uploadTasks.length} 个剪贴板媒体已加入后台上传队列`);
        }

        if (remoteFailedCount > 0) {
          toast.error(`${remoteFailedCount} 个飞书外链媒体转存失败，已保留原始地址`);
        }

        await updatePasteProgress(100, '粘贴完成', false);
      } catch (error) {
        console.error('Paste processing failed:', error);
        toast.error(error instanceof Error ? error.message : '粘贴失败，请稍后重试');
        resetPasteProgress();
        return;
      }

      window.setTimeout(() => {
        resetPasteProgress();
      }, 400);

      setIsUploadingMedia(getDraftPendingUploadCountByKind(draftKey, 'content') > 0);
      return;
    }

    if (clipboardFiles.length > 0) {
      event.preventDefault();
      for (const file of clipboardFiles) {
        await uploadFile(file);
      }
    }
  }, [
    draftKey,
    enqueueUploadForPlaceholder,
    getDraftPendingUploadCountByKind,
    insertMarkdownBlock,
    resetPasteProgress,
    rewriteFeishuRemoteMedia,
    setFormData,
    updatePasteProgress,
    uploadFile
  ]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.types.includes('Files')) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast.error('仅支持拖拽上传图片或视频');
      return;
    }

    const textarea = textareaRef.current;
    if (textarea) {
      const caretOffset = getCaretOffsetFromPoint(event.clientX, event.clientY);
      if (caretOffset !== null) {
        textarea.focus();
        textarea.setSelectionRange(caretOffset, caretOffset);
      }
    }

    await uploadFile(file);
  }, [getCaretOffsetFromPoint, textareaRef, uploadFile]);

  return {
    isUploadingImage: isUploadingImage || hasPendingCoverUploads,
    isUploadingMedia: isUploadingMedia || hasPendingContentUploads,
    isDragging,
    pasteProgress,
    handleImageUpload,
    handleMediaChange,
    handleAttachmentChange,
    handlePaste,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
}
